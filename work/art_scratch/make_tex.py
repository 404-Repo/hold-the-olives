"""Turn a raw 16:9 texture into a 1024 square tileable jpg.
Periodic patterns: crop a whole number of pattern periods (autocorrelation), so wrap is phase-aligned.
Then wrap cross-fade: take a source window S+b, blend the first b px with the b px just past S, so the
right edge flows into the left edge (and bottom into top). For periodic crops the blended strips are
the same pattern phase, so no ghosting."""
import sys, numpy as np
from PIL import Image
def period(profile, lo=45, hi=500):
    p = profile - profile.mean(); n = len(p)
    ac = np.array([np.dot(p[:n-k], p[k:]) / (n-k) for k in range(n//2)])
    ac /= ac[0]; k = lo + np.argmax(ac[lo:min(hi, len(ac))]); return int(k), float(ac[k])
def wrapfade(a, S, b, axis):
    a = np.moveaxis(a, axis, 0).astype(np.float32)
    out = a[:S].copy(); w = np.linspace(0, 1, b, endpoint=False)[:, None, None]
    out[:b] = a[S:S+b] * (1 - w) + a[:b] * w
    return np.moveaxis(out, 0, axis)
def make(src, dst, periodic, x0=None, y0=None, b=96, rows=None):
    im = np.asarray(Image.open(src).convert('RGB')).astype(np.float32); H, W, _ = im.shape
    g = im.mean(2)
    if periodic:
        px, cx = period(g.mean(0)); py, cy = period(g.mean(1))
        print(f'  period x {px} (ac {cx:.2f})  y {py} (ac {cy:.2f})')
        # choose n periods per axis so the window (plus b) fits and the result is near square
        best = None
        for ny in range(1, 40):
            Sy = ny * py
            if Sy + min(b, py) > H: break
            nx = max(1, round(Sy / px)); Sx = nx * px
            if Sx + min(b, px) > W: continue
            if best is None or Sy > best[1]: best = (Sx, Sy)
        Sx, Sy = best; bx, by = min(b, px - 1, W - Sx), min(b, py - 1, H - Sy)
    else:
        Sy = H - b; Sx = Sy; bx = by = b
    x0 = (W - Sx - bx) // 2 if x0 is None else x0; y0 = (H - Sy - by) // 2 if y0 is None else y0
    a = im[y0:y0+Sy+by, x0:x0+Sx+bx]
    a = wrapfade(a, Sx, bx, 1); a = wrapfade(a, Sy, by, 0)
    out = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8)).resize((1024, 1024), Image.LANCZOS)
    out.save(dst, quality=85); print(f'  {src} -> {dst}: window {Sx}x{Sy} at ({x0},{y0}), fade {bx}/{by}')
    return out
def mosaic(path, out):
    t = Image.open(path); m = Image.new('RGB', (2048, 2048))
    for i in range(2):
        for j in range(2): m.paste(t, (i*1024, j*1024))
    m.resize((1024, 1024)).save(out, quality=80)
if __name__ == '__main__':
    src, dst, mode = sys.argv[1:4]; kw = {}
    for a in sys.argv[4:]: k, v = a.split('='); kw[k] = int(v)
    make(src, dst, mode == 'periodic', **kw)
