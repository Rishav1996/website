import os
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

output_dir = "website/public/assets/watches/d1milano"
elements_dir = os.path.join(output_dir, "elements")
cuts_dir = "website/public/assets/watches/cuts"
backgrounds_dir = "website/public/assets/watches/backgrounds"

os.makedirs(output_dir, exist_ok=True)
os.makedirs(elements_dir, exist_ok=True)
os.makedirs(cuts_dir, exist_ok=True)
os.makedirs(backgrounds_dir, exist_ok=True)


def build_radial_bg_model(arr):
    """Fit smooth radial studio background from raw_angle_1 outer margins (shared across all studio shots)."""
    h, w, _ = arr.shape
    cy, cx = h * 0.48, w * 0.50
    yy, xx = np.mgrid[0:h, 0:w]
    rr = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)

    # Sample guaranteed background regions in raw_angle_1: outer 22% margins
    bg_mask = (xx < 280) | (xx > 1000) | (yy < 330) | (yy > 1390)
    r_vals = rr[bg_mask]
    rgb_vals = arr[bg_mask].astype(np.float32)

    # Fit degree-3 polynomial per channel vs normalized radius
    r_max = np.sqrt(cx ** 2 + cy ** 2) + 1.0
    r_norm_sample = r_vals / r_max
    r_norm_full = rr / r_max

    bg_model = np.zeros_like(arr, dtype=np.float32)
    for c in range(3):
        coeffs = np.polyfit(r_norm_sample, rgb_vals[:, c], deg=3)
        bg_model[:, :, c] = np.polyval(coeffs, r_norm_full)

    return np.clip(bg_model, 0, 255)


def compute_gradient(arr):
    """Compute local RGB edge magnitude to act as a barrier during BFS flood fill."""
    f = arr.astype(np.float32)
    gx = np.zeros((f.shape[0], f.shape[1]), dtype=np.float32)
    gy = np.zeros((f.shape[0], f.shape[1]), dtype=np.float32)
    gx[:, 1:-1] = np.linalg.norm(f[:, 2:] - f[:, :-2], axis=2) * 0.5
    gy[1:-1, :] = np.linalg.norm(f[2:, :] - f[:-2, :], axis=2) * 0.5
    return np.hypot(gx, gy)


def isolate_watch_with_radial_bfs(
    src_path,
    bg_model,
    dest_transparent,
    dest_jpg=None,
    padding_pct=0.03,
    extra_seeds=None,
    color_thresh=16.0,
    grad_thresh=14.0,
):
    print(f"Processing {src_path}...")
    img = Image.open(src_path).convert("RGB")
    arr = np.array(img)
    h, w, _ = arr.shape

    diff = np.linalg.norm(arr.astype(np.float32) - bg_model, axis=2)
    grad = compute_gradient(arr)

    # Candidate background pixels: close to fitted studio vignette & low gradient
    is_bg_candidate = (diff < color_thresh) & (grad < grad_thresh)

    is_bg = np.zeros((h, w), dtype=bool)
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()

    # Seed 4 borders (inset by 6px to skip JPEG edge ringing) and outer perimeter
    for x in range(w):
        for y in (0, 6, h - 7, h - 1):
            if not visited[y, x] and diff[y, x] < color_thresh * 1.6:
                queue.append((y, x))
                visited[y, x] = True
    for y in range(h):
        for x in (0, 6, w - 7, w - 1):
            if not visited[y, x] and diff[y, x] < color_thresh * 1.6:
                queue.append((y, x))
                visited[y, x] = True

    # Optional interior loop seeds (e.g., inside bracelet loop on 3/4 angle)
    if extra_seeds:
        for sy, sx in extra_seeds:
            if 0 <= sy < h and 0 <= sx < w and not visited[sy, sx] and diff[sy, sx] < color_thresh:
                queue.append((sy, sx))
                visited[sy, sx] = True

    while queue:
        y, x = queue.popleft()
        is_bg[y, x] = True
        for dy, dx in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                visited[ny, nx] = True
                if is_bg_candidate[ny, nx]:
                    queue.append((ny, nx))

    # Build alpha channel with 1px feathered anti-aliased edge
    alpha = np.full((h, w), 255, dtype=np.uint8)
    alpha[is_bg] = 0

    bg_dilated = np.zeros_like(is_bg)
    bg_dilated[:-1, :] |= is_bg[1:, :]
    bg_dilated[1:, :] |= is_bg[:-1, :]
    bg_dilated[:, :-1] |= is_bg[:, 1:]
    bg_dilated[:, 1:] |= is_bg[:, :-1]
    boundary = bg_dilated & (~is_bg)

    for y, x in zip(*np.where(boundary)):
        d = diff[y, x]
        if d < color_thresh * 1.35:
            # Smoothly feather boundary pixels similar to backdrop
            factor = max(0.0, min(1.0, (d - 4.0) / (color_thresh * 1.1)))
            alpha[y, x] = int(255 * factor)

    # Strip outer 12px JPEG compression frame artifacts after feathering
    alpha[:12, :] = 0
    alpha[-12:, :] = 0
    alpha[:, :12] = 0
    alpha[:, -12:] = 0

    rgba = np.dstack((arr, alpha))
    result_img = Image.fromarray(rgba, "RGBA")

    ys, xs = np.where(alpha > 20)
    if len(xs) == 0:
        print(f"Warning: No watch pixels found in {src_path}")
        return

    min_x, max_x = int(xs.min()), int(xs.max())
    min_y, max_y = int(ys.min()), int(ys.max())
    watch_w = max_x - min_x
    watch_h = max_y - min_y

    pad_x = int(watch_w * padding_pct) + 20
    pad_y = int(watch_h * padding_pct) + 25

    crop_x1 = max(0, min_x - pad_x)
    crop_y1 = max(0, min_y - pad_y)
    crop_x2 = min(w, max_x + pad_x)
    crop_y2 = min(h, max_y + pad_y)

    cropped_rgba = result_img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    cropped_rgba.save(dest_transparent, "PNG", optimize=True)
    print(f"Saved {dest_transparent}: size={cropped_rgba.size}, bbox=({min_x},{min_y}) to ({max_x},{max_y})")

    if dest_jpg:
        bg_rgb = Image.new("RGB", cropped_rgba.size, (18, 21, 22))
        bg_rgb.paste(cropped_rgba, mask=cropped_rgba.split()[3])
        bg_rgb.save(dest_jpg, "JPEG", quality=95)
        print(f"Saved {dest_jpg}: size={bg_rgb.size}")

    return cropped_rgba


# 1. Fit studio background model from raw_angle_1
front_src = os.path.join(output_dir, "raw_angle_1.jpg")
front_img = Image.open(front_src).convert("RGB")
front_arr = np.array(front_img)
bg_model = build_radial_bg_model(front_arr)

# 2. Isolate Front View (Angle 1)
front_trans = os.path.join(output_dir, "d1milano_watch_transparent.png")
front_jpg = os.path.join(output_dir, "d1milano_watch.jpg")
isolated_front = isolate_watch_with_radial_bfs(
    front_src, bg_model, front_trans, front_jpg, padding_pct=0.04, color_thresh=18.0, grad_thresh=14.0
)

# Verify dial center opacity == 255
if isolated_front is not None:
    check_arr = np.array(isolated_front)
    ch_h, ch_w, _ = check_arr.shape
    center_crop = check_arr[int(ch_h * 0.35):int(ch_h * 0.55), int(ch_w * 0.35):int(ch_w * 0.65)]
    dial_alpha = center_crop[:, :, 3]
    print(f"Dial opacity check: min={dial_alpha.min()}, max={dial_alpha.max()}, mean={dial_alpha.mean():.2f}")

# 3. Isolate 3/4 Emotional Clasp Angle (Angle 5) — note inner gap between case and clasp around (x=725, y=680)
angle5_src = os.path.join(output_dir, "raw_angle_5.jpg")
angle5_trans = os.path.join(output_dir, "d1milano_angle_2_transparent.png")
isolate_watch_with_radial_bfs(
    angle5_src,
    bg_model,
    angle5_trans,
    None,
    padding_pct=0.04,
    extra_seeds=[(680, 725), (620, 730), (850, 720)],
    color_thresh=16.0,
    grad_thresh=13.0,
)

# 4. Isolate Caseback Angle (Angle 3) — inner gap between caseback & bracelet around (x=680, y=680)
angle3_src = os.path.join(output_dir, "raw_angle_3.jpg")
angle3_trans = os.path.join(output_dir, "d1milano_angle_3_transparent.png")
isolate_watch_with_radial_bfs(
    angle3_src,
    bg_model,
    angle3_trans,
    None,
    padding_pct=0.04,
    extra_seeds=[(620, 690), (850, 700)],
    color_thresh=16.0,
    grad_thresh=13.0,
)

# 5. Slice 5 Macro Element Crops (480x480) from high-res studio shots
side_img = Image.open(os.path.join(output_dir, "raw_angle_4.jpg")).convert("RGB")
clasp_img = Image.open(os.path.join(output_dir, "raw_angle_5.jpg")).convert("RGB")

macro_specs = [
    # (source_image, filename, crop_box)
    (front_img, "element_camo_bezel.jpg", (375, 515, 885, 1025)),       # Full Octagonal Urban Camo Bezel
    (front_img, "element_matte_dial.jpg", (450, 595, 810, 955)),        # Matte Grey Brass Dial & Baton Indices
    (side_img, "element_ar_crystal_hands.jpg", (270, 380, 810, 920)),   # Blue AR Mineral Crystal & 3-Hand Profile
    (front_img, "element_camo_bracelet.jpg", (415, 965, 845, 1395)),    # Integrated Urban Camo Polycarbonate Bracelet
    (clasp_img, "element_butterfly_clasp.jpg", (580, 680, 960, 1060)),  # Concealed 316L Stainless Steel Butterfly Clasp
]

for src_im, fname, box in macro_specs:
    cropped = src_im.crop(box).resize((480, 480), Image.Resampling.LANCZOS)
    target = os.path.join(elements_dir, fname)
    cropped.save(target, "JPEG", quality=95)
    print(f"Saved macro element: {target} ({cropped.size})")

# 6. Slice 2 Wall-of-Fame Circular Loupe Cuts (360x360)
cuts_specs = [
    (front_img, "cut_d1_camo_bezel.jpg", (385, 525, 875, 1015)),
    (front_img, "cut_d1_matte_dial.jpg", (465, 610, 795, 940)),
]

for src_im, fname, box in cuts_specs:
    cropped = src_im.crop(box).resize((360, 360), Image.Resampling.LANCZOS)
    target = os.path.join(cuts_dir, fname)
    cropped.save(target, "JPEG", quality=95)
    print(f"Saved marquee cut: {target} ({cropped.size})")

# 7. Process generated Milanese backdrop to exact 1920x1080 JPEG
gen_bg = r"C:\Users\risha\.gemini\antigravity\brain\56ae074b-62ba-4772-a4b8-fb8c7c4f34e0\bg_milanese_camo_1795781114316.jpg"
dest_bg = os.path.join(backgrounds_dir, "bg_milanese_camo.jpg")
if os.path.exists(gen_bg):
    bg_im = Image.open(gen_bg).convert("RGB")
    bg_resized = bg_im.resize((1920, 1080), Image.Resampling.LANCZOS)
    bg_resized.save(dest_bg, "JPEG", quality=92)
    print(f"Saved atmospheric backdrop: {dest_bg} ({bg_resized.size})")

print("D1 Milano PCBJ37 asset processing completed successfully!")
