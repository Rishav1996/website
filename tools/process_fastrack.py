import urllib.request
import os
from PIL import Image

output_dir = 'website/public/assets/watches/fastrack'
os.makedirs(output_dir, exist_ok=True)
elements_dir = os.path.join(output_dir, 'elements')
os.makedirs(elements_dir, exist_ok=True)

# Titan master catalog URLs for 3315KM01
base_url = "https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw2c78f78e/images/Fastrack/Catalog/"

images = {
    'fastrack_watch_raw.jpg': f"{base_url}3315KM01_1.jpg?sw=1200&sh=1200",
    'fastrack_angle_2.jpg': f"{base_url}3315KM01_2.jpg?sw=1200&sh=1200",
    'fastrack_angle_3.jpg': f"{base_url}3315KM01_3.jpg?sw=1200&sh=1200",
}

headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

for fname, url in images.items():
    dest = os.path.join(output_dir, fname)
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp, open(dest, 'wb') as f:
            f.write(resp.read())
        print(f"Downloaded {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Error downloading {fname}: {e}")

# Check downloaded raw image
raw_path = os.path.join(output_dir, 'fastrack_watch_raw.jpg')
if os.path.exists(raw_path):
    img = Image.open(raw_path)
    w, h = img.size
    print(f"Loaded master image: {w}x{h}")

    # Generate transparent or clean presentation image
    rgba = img.convert('RGBA')
    datas = rgba.getdata()
    newData = []
    for item in datas:
        if item[0] > 242 and item[1] > 242 and item[2] > 242:
            newData.append((255, 255, 255, 0))
        elif item[0] > 230 and item[1] > 230 and item[2] > 230:
            alpha = int(255 * (1.0 - (sum(item[:3])/3 - 230) / 12.0))
            newData.append((item[0], item[1], item[2], max(0, min(255, alpha))))
        else:
            newData.append(item)
    rgba.putdata(newData)
    transparent_path = os.path.join(output_dir, 'fastrack_watch_transparent.png')
    rgba.save(transparent_path, "PNG")
    print(f"Saved transparent PNG: {transparent_path}")

    img.save(os.path.join(output_dir, 'fastrack_watch.jpg'), quality=95)

    crops = {
        'element_sun_moon.jpg': (420, 360, 780, 720),       # Sun & Moon phase celestial disc
        'element_crimson_pusher.jpg': (720, 340, 1060, 680), # Crimson 2 o'clock start/stop pusher & fluted crown
        'element_subdials.jpg': (380, 520, 780, 920),       # Multi-level 3D chronograph registers
        'element_hands_indices.jpg': (440, 440, 760, 760),  # White-tipped skeleton hands & baton hour markers
        'element_bracelet_links.jpg': (400, 820, 800, 1180) # Solid anthracite metal link bracelet
    }

    for name, box in crops.items():
        cropped = img.crop(box)
        hi_res = cropped.resize((480, 480), Image.Resampling.LANCZOS)
        target = os.path.join(elements_dir, name)
        hi_res.save(target, quality=95)
        print(f"Saved {target} ({hi_res.size})")

print("Processing complete!")
