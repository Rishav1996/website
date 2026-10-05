from PIL import Image
import os

kc_path = 'website/public/assets/watches/kc_watch.jpg'
fastrack_path = 'website/public/assets/watches/fastrack/fastrack_watch.jpg'
out_dir = 'website/public/assets/watches/cuts'
os.makedirs(out_dir, exist_ok=True)

# 1. Kenneth Cole Crops (from 720x960 image)
if os.path.exists(kc_path):
    kc_img = Image.open(kc_path)
    w, h = kc_img.size
    print(f"KC master: {w}x{h}")
    kc_crops = {
        'cut_kc_escapement.jpg': (220, 360, 380, 520),    # Ruby pallet lever & hairspring close-up
        'cut_kc_brass_pinion.jpg': (300, 300, 460, 460),  # Golden brass gear teeth
        'cut_kc_chapter_track.jpg': (200, 200, 360, 360), # Cream minute railroad track with baton
        'cut_kc_bezel_lug.jpg': (400, 240, 560, 400),     # Mocha IP beveled bezel & lug chamfer
    }
    for name, box in kc_crops.items():
        c = kc_img.crop(box).resize((360, 360), Image.Resampling.LANCZOS)
        c.save(os.path.join(out_dir, name), quality=95)
        print(f"Saved {name}")

# 2. Fastrack Crops (from 1200x1200 image)
if os.path.exists(fastrack_path):
    ft_img = Image.open(fastrack_path)
    w, h = ft_img.size
    print(f"Fastrack master: {w}x{h}")
    ft_crops = {
        'cut_ft_sun_disc.jpg': (450, 420, 680, 650),       # Golden sun face & lunar arc
        'cut_ft_red_pusher.jpg': (820, 380, 1020, 580),    # Crimson anodized trigger close-up
        'cut_ft_3d_texture.jpg': (420, 650, 650, 880),     # Knurled carbon 3D dial pyramid texture
        'cut_ft_lume_hands.jpg': (480, 480, 720, 720),     # Skeletonized luminous hour & minute hands
    }
    for name, box in ft_crops.items():
        c = ft_img.crop(box).resize((360, 360), Image.Resampling.LANCZOS)
        c.save(os.path.join(out_dir, name), quality=95)
        print(f"Saved {name}")

print("Additional cuts extracted successfully!")
