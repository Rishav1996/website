from PIL import Image
import os

img_path = 'website/public/assets/watches/kc_watch.jpg'
out_dir = 'website/public/assets/watches/elements'
os.makedirs(out_dir, exist_ok=True)

img = Image.open(img_path)
w, h = img.size
print(f"Loaded image: {w}x{h}")

# High-interest 240x240 macro crops centered on key horological elements
crops = {
    'element_balance_wheel.jpg': (180, 320, 420, 560),    # Exposed balance organ & ruby pivot
    'element_gear_train.jpg': (280, 260, 520, 500),       # Skeleton gear train, brass pinions & bridges
    'element_chapter_ring.jpg': (230, 180, 470, 420),     # Cream railroad track, Kenneth Cole logo & baton hands
    'element_crown_case.jpg': (440, 300, 680, 540),       # Matte mocha IP steel case, bezel & fluted crown
    'element_leather_strap.jpg': (230, 640, 470, 880),    # Stitched brown calfskin leather band
}

for name, box in crops.items():
    cropped = img.crop(box)
    # Upscale with Lanczos for retina sharpness
    hi_res = cropped.resize((480, 480), Image.Resampling.LANCZOS)
    target = os.path.join(out_dir, name)
    hi_res.save(target, quality=95)
    print(f"Saved {target} with size {hi_res.size}")

print("All elements extracted successfully.")
