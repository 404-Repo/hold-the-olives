# Portrait blind pairs at phone size: A | B, side shuffled, key written OUTSIDE the critic folder.
import sys, json, random, glob, os
from PIL import Image, ImageDraw, ImageFont
mine, ref, out, key = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
M = sorted(glob.glob(mine)); R = sorted(glob.glob(ref)); n = min(len(M), len(R))
random.seed(int(sys.argv[5]) if len(sys.argv) > 5 else 7); random.shuffle(R)
os.makedirs(out, exist_ok=True); K = {}
font = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 34)
def fit(p):
    im = Image.open(p).convert('RGB'); w, h = im.size; t = 390 / 844
    if w / h > t: nw = int(h * t); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
    else: nh = int(w / t); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
    return im.resize((585, 1266))
for i in range(n):
    a, b = (M[i], R[i]) if random.random() < 0.5 else (R[i], M[i])
    c = Image.new('RGB', (585 * 2 + 30, 1266 + 60), (18, 18, 18)); d = ImageDraw.Draw(c)
    c.paste(fit(a), (0, 60)); c.paste(fit(b), (615, 60)); d.text((10, 10), 'A', fill='white', font=font); d.text((625, 10), 'B', fill='white', font=font)
    c.save(f'{out}/pair_{i+1:02d}.png'); K[f'pair_{i+1:02d}'] = {'A': os.path.basename(a), 'B': os.path.basename(b), 'mine': 'A' if a in M else 'B'}
json.dump(K, open(key, 'w'), indent=1); print(n, 'pairs')
