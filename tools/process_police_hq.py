import os
from collections import deque
import numpy as np
from PIL import Image

output_dir = 'website/public/assets/watches/police'
elements_dir = os.path.join(output_dir, 'elements')
cuts_dir = 'website/public/assets/watches/cuts'

os.makedirs(output_dir, exist_ok=True)
os.makedirs(elements_dir, exist_ok=True)
os.makedirs(cuts_dir, exist_ok=True)

def isolate_watch_with_floodfill(src_path, dest_transparent, dest_jpg=None, padding_pct=0.03):
    print(f"Processing {src_path}...")
    img = Image.open(src_path).convert('RGB')
    arr = np.array(img)
    h, w, _ = arr.shape

    # 1. Flood fill from 4 borders to find pure studio white background
    is_bg = np.zeros((h, w), dtype=bool)
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()

    # Border seeds
    for x in range(w):
        if arr[0, x].min() > 238:
            queue.append((0, x))
            visited[0, x] = True
        if arr[h - 1, x].min() > 238:
            queue.append((h - 1, x))
            visited[h - 1, x] = True
    for y in range(h):
        if arr[y, 0].min() > 238:
            queue.append((y, 0))
            visited[y, 0] = True
        if arr[y, w - 1].min() > 238:
            queue.append((y, w - 1))
            visited[y, w - 1] = True

    while queue:
        y, x = queue.popleft()
        is_bg[y, x] = True
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx]:
                visited[ny, nx] = True
                if arr[ny, nx].min() > 238:
                    queue.append((ny, nx))

    # 2. Compute smooth alpha channel
    alpha = np.full((h, w), 255, dtype=np.uint8)
    alpha[is_bg] = 0

    # Soft 1-pixel anti-aliasing on background boundary
    # Find boundary pixels in the watch that touch background

    # Simple 4-neighbor boundary softening
    bg_dilated = np.zeros_like(is_bg)
    bg_dilated[:-1, :] |= is_bg[1:, :]
    bg_dilated[1:, :] |= is_bg[:-1, :]
    bg_dilated[:, :-1] |= is_bg[:, 1:]
    bg_dilated[:, 1:] |= is_bg[:, :-1]
    boundary_mask = bg_dilated & (~is_bg)

    # For boundary pixels with light color, soften edge
    light_boundary = boundary_mask & (arr.min(axis=2) > 210)
    for y, x in zip(*np.where(light_boundary)):
        mean_c = arr[y, x].mean()
        if mean_c > 220:
            factor = (mean_c - 220) / 30.0
            alpha[y, x] = int(255 * (1.0 - min(1.0, factor * 0.7)))

    # Assemble RGBA
    rgba = np.dstack((arr, alpha))
    result_img = Image.fromarray(rgba, 'RGBA')

    # 3. Find true bounding box of watch (non-zero alpha)
    ys, xs = np.where(alpha > 0)
    if len(xs) == 0:
        print(f"Warning: No watch pixels found in {src_path}")
        return

    min_x, max_x = xs.min(), xs.max()
    min_y, max_y = ys.min(), ys.max()
    watch_w = max_x - min_x
    watch_h = max_y - min_y

    pad_x = int(watch_w * padding_pct) + 20
    pad_y = int(watch_h * padding_pct) + 25

    crop_x1 = max(0, min_x - pad_x)
    crop_y1 = max(0, min_y - pad_y)
    crop_x2 = min(w, max_x + pad_x)
    crop_y2 = min(h, max_y + pad_y)

    cropped_rgba = result_img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    cropped_rgba.save(dest_transparent, 'PNG', optimize=True)
    print(f"Saved {dest_transparent}: size={cropped_rgba.size}, bbox=({min_x},{min_y}) to ({max_x},{max_y})")

    if dest_jpg:
        # Create solid dark studio backdrop or clean white for master JPG
        # Clean RGB crop on dark plinth background
        bg_rgb = Image.new('RGB', cropped_rgba.size, (15, 19, 26))
        bg_rgb.paste(cropped_rgba, mask=cropped_rgba.split()[3])
        bg_rgb.save(dest_jpg, 'JPEG', quality=95)
        print(f"Saved {dest_jpg}: size={bg_rgb.size}")

# Process Angle 1 (Front View - Primary)
angle1_src = os.path.join(output_dir, 'police_angle_1.png')
dest_trans1 = os.path.join(output_dir, 'police_watch_transparent.png')
dest_jpg1 = os.path.join(output_dir, 'police_watch.jpg')
isolate_watch_with_floodfill(angle1_src, dest_trans1, dest_jpg1, padding_pct=0.03)

# Process Angle 2 (3/4 Dynamic View)
angle2_src = os.path.join(output_dir, 'police_angle_2.png')
dest_trans2 = os.path.join(output_dir, 'police_angle_2_transparent.png')
isolate_watch_with_floodfill(angle2_src, dest_trans2, None, padding_pct=0.02)

# Process Angle 3 (Sculpted Flank & Knurled Crown View)
angle3_src = os.path.join(output_dir, 'police_angle_3.png')
dest_trans3 = os.path.join(output_dir, 'police_angle_3_transparent.png')
isolate_watch_with_floodfill(angle3_src, dest_trans3, None, padding_pct=0.02)

# Verify dial center of primary watch
check_img = Image.open(dest_trans1)
check_arr = np.array(check_img)
ch_h, ch_w, _ = check_arr.shape
center_crop = check_arr[int(ch_h*0.4):int(ch_h*0.6), int(ch_w*0.35):int(ch_w*0.65)]
dial_alpha = center_crop[:, :, 3]
print(f"Primary watch dial opacity verification: min={dial_alpha.min()}, max={dial_alpha.max()}, mean={dial_alpha.mean():.2f}")
print("Image isolation and tight cropping completed successfully!")
