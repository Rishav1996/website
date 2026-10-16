import os
import urllib.request
import io
from PIL import Image, ImageDraw, ImageFilter

output_dir = 'website/public/assets/watches/police'
elements_dir = os.path.join(output_dir, 'elements')
cuts_dir = 'website/public/assets/watches/cuts'
backgrounds_dir = 'website/public/assets/watches/backgrounds'

os.makedirs(output_dir, exist_ok=True)
os.makedirs(elements_dir, exist_ok=True)
os.makedirs(cuts_dir, exist_ok=True)
os.makedirs(backgrounds_dir, exist_ok=True)

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# 1. Download official high-resolution studio shots (1920x2173)
base_shopify_url = "https://cdn.shopify.com/s/files/1/0634/3888/1014/files/PEWJM0081301"

images = {}
for i in range(1, 6):
    dest = os.path.join(output_dir, f'police_angle_{i}.png')
    url = f"{base_shopify_url}_0{i}.png"
    if not os.path.exists(dest) or os.path.getsize(dest) == 0:
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
                f.write(resp.read())
            print(f"Downloaded angle {i} -> {dest} ({os.path.getsize(dest)} bytes)")
        except Exception as e:
            print(f"Error downloading angle {i}: {e}")
    else:
        print(f"Angle {i} already present: {dest}")

# 2. Process primary front-facing image (Angle 1)
front_path = os.path.join(output_dir, 'police_angle_1.png')
if os.path.exists(front_path):
    img = Image.open(front_path).convert('RGB')
    w, h = img.size
    print(f"Master front image loaded: {w}x{h}")

    # Save high-quality RGB master
    master_jpg = os.path.join(output_dir, 'police_watch.jpg')
    img.save(master_jpg, quality=95)
    print(f"Saved master image: {master_jpg}")

    # Generate transparent PNG with anti-aliased alpha thresholding
    rgba = img.convert('RGBA')
    datas = rgba.getdata()
    newData = []
    # Clean white background matting
    for item in datas:
        # Pure white background
        if item[0] > 245 and item[1] > 245 and item[2] > 245:
            newData.append((255, 255, 255, 0))
        # Soft anti-aliased edge
        elif item[0] > 230 and item[1] > 230 and item[2] > 230:
            alpha = int(255 * (1.0 - (sum(item[:3])/3 - 230) / 16.0))
            newData.append((item[0], item[1], item[2], max(0, min(255, alpha))))
        else:
            newData.append(item)
    rgba.putdata(newData)
    transparent_path = os.path.join(output_dir, 'police_watch_transparent.png')
    rgba.save(transparent_path, "PNG")
    print(f"Saved transparent cutout: {transparent_path}")

    # 3. Crop 5 authentic macro elements from 1920x2173 master image
    # Watch dial center is roughly around x=960, y=1086
    # Tonneau case spans approx x: 450 to 1470, y: 350 to 1820
    crops = {
        # 1. Silver Cranium Skull openwork motif with crystal stone hour plots
        'element_cranium_skull.jpg': (650, 780, 1270, 1400),
        # 2. Bolted Tonneau top bezel with 4-corner hex socket anchors
        'element_bolted_bezel.jpg': (500, 480, 1420, 1400),
        # 3. Calibre 05-203A Quartz transmission & center hands
        'element_quartz_movement.jpg': (750, 850, 1170, 1270),
        # 4. Heavy-duty black silicone strap with grip grooves
        'element_silicone_strap.jpg': (680, 1450, 1240, 2010),
        # 5. Fluted industrial steel setting crown
        'element_fluted_crown.jpg': (1320, 960, 1580, 1220)
    }

    for name, box in crops.items():
        cropped = img.crop(box)
        hi_res = cropped.resize((480, 480), Image.Resampling.LANCZOS)
        target = os.path.join(elements_dir, name)
        hi_res.save(target, quality=95)
        print(f"Saved macro element: {target} ({hi_res.size})")

    # 4. Generate 2 cuts for the vault marquee background
    marquee_cuts = {
        'cut_pc_cranium_dial.jpg': (720, 840, 1200, 1320),
        'cut_pc_bolted_bezel.jpg': (560, 560, 1100, 1100)
    }
    for name, box in marquee_cuts.items():
        cropped = img.crop(box)
        hi_res = cropped.resize((360, 360), Image.Resampling.LANCZOS)
        target = os.path.join(cuts_dir, name)
        hi_res.save(target, quality=95)
        print(f"Saved marquee cut: {target} ({hi_res.size})")

# 5. Generate dark atmospheric backdrop for the exhibition
bg_path = os.path.join(backgrounds_dir, 'bg_urban_rebel.jpg')
if not os.path.exists(bg_path):
    bg_img = Image.new('RGB', (1920, 1080), color=(8, 10, 14))
    draw = ImageDraw.Draw(bg_img)
    # Subtle diagonal industrial steel gradient and grit
    for y in range(1080):
        factor = y / 1080.0
        r = int(8 + 8 * factor)
        g = int(9 + 10 * factor)
        b = int(13 + 18 * factor)
        draw.line([(0, y), (1920, y)], fill=(r, g, b))
    # Subtle radial highlight at center-left
    for radius in range(500, 0, -10):
        alpha_val = int((1.0 - radius / 500.0) * 16)
        highlight = (24 + alpha_val, 28 + alpha_val, 40 + alpha_val)
        draw.ellipse([500 - radius, 540 - radius, 500 + radius, 540 + radius], outline=highlight)
    bg_img = bg_img.filter(ImageFilter.GaussianBlur(radius=8))
    bg_img.save(bg_path, quality=92)
    print(f"Generated atmospheric backdrop: {bg_path}")

print("Police Cranium asset processing completed successfully!")
