#!/usr/bin/env python3
"""
Zenitrix media generator (no network needed).
Renders illustrative scenes (gates, doors, barriers, shutters, dock) to WebP stills and short MP4/WebM loops.
These are ILLUSTRATIVE visuals. Replace with real project photos/videos when the client supplies them (Blueprint 6.4).

Usage (from repo root):  python3 tools/media/gen_media.py            # everything
                          python3 tools/media/gen_media.py images     # stills only
                          python3 tools/media/gen_media.py videos     # videos only
Requires: Pillow, numpy, ffmpeg.
"""
import math, os, random, subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
IMG_DIR = os.path.join(ROOT, 'public', 'images')
VID_DIR = os.path.join(ROOT, 'public', 'videos')
W, H = 1280, 720

# ---------------------------------------------------------------- palettes
def hx(c):
    c = c.lstrip('#'); return tuple(int(c[i:i + 2], 16) for i in (0, 2, 4))

PAL = {
    'dusk': dict(sky=[(0, '#0B1E3A'), (.55, '#1E4E9A'), (1, '#F4A261')], far='#17325f', near='#10284d', ground='#111a2a', drive='#1b2740',
                 wall='#22324f', wall_top='#34496f', facade='#2b3d60', win='#FFD66B', winp=.75, lamp=True, ink='#0B1220', accent='#00B2FF', glass='#9bd7ff'),
    'day': dict(sky=[(0, '#3B8FEA'), (1, '#D6ECFF')], far='#9fb9d9', near='#7f9dc2', ground='#667180', drive='#8591a0',
                 wall='#e7ecf3', wall_top='#c5d0de', facade='#dfe6f0', win='#8fbfe8', winp=.35, lamp=False, ink='#0B1220', accent='#0A84FF', glass='#bfe4ff'),
    'night': dict(sky=[(0, '#040912'), (1, '#0E2A52')], far='#0b1a33', near='#08142a', ground='#0a0f18', drive='#131c2d',
                  wall='#162033', wall_top='#243350', facade='#1b2842', win='#FFD66B', winp=.55, lamp=True, ink='#0B1220', accent='#00B2FF', glass='#7cc6f5'),
}

def ss(u, a, b):
    """smoothstep of u between a and b"""
    if b == a: return 1.0 if u >= b else 0.0
    t = min(1, max(0, (u - a) / (b - a))); return t * t * (3 - 2 * t)

def lerp(a, b, t): return a + (b - a) * t

# ---------------------------------------------------------------- canvas
class C:
    def __init__(self, S, base=None):
        self.S = S
        self.img = base.copy() if base is not None else Image.new('RGBA', (int(W * S), int(H * S)), (0, 0, 0, 255))
        self.d = ImageDraw.Draw(self.img, 'RGBA')
    def _p(self, pts): return [(x * self.S, y * self.S) for x, y in pts]
    def rect(self, x0, y0, x1, y1, fill, r=0):
        if x1 < x0 or y1 < y0: return
        b = [x0 * self.S, y0 * self.S, x1 * self.S, y1 * self.S]
        if r: self.d.rounded_rectangle(b, radius=r * self.S, fill=fill)
        else: self.d.rectangle(b, fill=fill)
    def poly(self, pts, fill): self.d.polygon(self._p(pts), fill=fill)
    def ell(self, cx, cy, rx, ry, fill): self.d.ellipse([(cx - rx) * self.S, (cy - ry) * self.S, (cx + rx) * self.S, (cy + ry) * self.S], fill=fill)
    def line(self, pts, fill, w=2): self.d.line(self._p(pts), fill=fill, width=max(1, int(w * self.S)))
    def alpha_rect(self, x0, y0, x1, y1, rgb, a):
        ov = Image.new('RGBA', self.img.size, (0, 0, 0, 0)); ImageDraw.Draw(ov).rectangle([x0 * self.S, y0 * self.S, x1 * self.S, y1 * self.S], fill=hx(rgb) + (int(a * 255),))
        self.img.alpha_composite(ov); self.d = ImageDraw.Draw(self.img, 'RGBA')
    def glow(self, cx, cy, r, color, a=.8):
        n = max(4, int(2 * r * self.S)); yy, xx = np.mgrid[0:n, 0:n]; d = np.hypot(xx - n / 2, yy - n / 2) / (n / 2)
        al = (np.clip(1 - d, 0, 1) ** 2 * a * 255).astype(np.uint8)
        arr = np.zeros((n, n, 4), np.uint8); arr[..., 0], arr[..., 1], arr[..., 2] = hx(color); arr[..., 3] = al
        sp = Image.fromarray(arr, 'RGBA'); ox, oy = int(cx * self.S - n / 2), int(cy * self.S - n / 2)
        iw, ih = self.img.size; x0, y0, x1, y1 = max(ox, 0), max(oy, 0), min(ox + n, iw), min(oy + n, ih)
        if x1 <= x0 or y1 <= y0: return
        self.img.alpha_composite(sp.crop((x0 - ox, y0 - oy, x1 - ox, y1 - oy)), (x0, y0))
    def gradient_rect(self, x0, y0, x1, y1, top, bot):
        w, h = max(1, int((x1 - x0) * self.S)), max(1, int((y1 - y0) * self.S))
        t = np.linspace(0, 1, h)[:, None, None]; a, b = np.array(hx(top)), np.array(hx(bot))
        arr = (a + (b - a) * t).astype(np.uint8); arr = np.repeat(arr, w, axis=1)
        self.img.paste(Image.fromarray(arr, 'RGB'), (int(x0 * self.S), int(y0 * self.S)))
    def out(self, size=(W, H)): return self.img.convert('RGB').resize(size, Image.LANCZOS)

# ---------------------------------------------------------------- shared backdrops
def sky_array(S, stops):
    h, w = int(H * S), int(W * S); t = np.linspace(0, 1, h)
    ch = []
    for k in range(3):
        xs = [s[0] for s in stops]; ys = [hx(s[1])[k] for s in stops]; ch.append(np.interp(t, xs, ys))
    arr = np.stack(ch, axis=1)[:, None, :]; return np.repeat(arr, w, axis=1).astype(np.uint8)

_BG = {}
def backdrop(S, pal, horizon=470, seed=7, towers=True):
    key = (S, pal, horizon, seed, towers)
    if key not in _BG: _BG[key] = _backdrop(S, pal, horizon, seed, towers)
    return C(S, _BG[key])

def _backdrop(S, pal, horizon, seed, towers):
    p = PAL[pal]; cv = C(S, Image.fromarray(sky_array(S, p['sky']), 'RGB').convert('RGBA'))
    rnd = random.Random(seed)
    if pal == 'night':
        for _ in range(70): cv.ell(rnd.randint(0, W), rnd.randint(0, 260), .8, .8, '#cfe8ff')
        cv.ell(1040, 110, 26, 26, '#e8f3ff'); cv.glow(1040, 110, 90, '#8cc8ff', .35)
    elif pal == 'dusk':
        cv.glow(250, horizon, 380, '#ffb26b', .45)
    else:
        cv.glow(1050, 90, 170, '#ffffff', .6); cv.ell(1050, 90, 34, 34, '#fffbe8')
    for layer, col, hmin, hmax, wmin, wmax in (('far', p['far'], 70, 210, 38, 80), ('near', p['near'], 40, 150, 50, 110)):
        x = -20
        while x < W:
            w = rnd.randint(wmin, wmax); h = rnd.randint(hmin, hmax) if towers else rnd.randint(hmin // 2, hmax // 2)
            cv.rect(x, horizon - h, x + w, horizon + 10, col)
            if layer == 'near':
                for wy in range(int(horizon - h + 12), int(horizon - 6), 22):
                    for wx in range(int(x + 8), int(x + w - 12), 18):
                        if rnd.random() < p['winp']: cv.rect(wx, wy, wx + 8, wy + 11, p['win'] if rnd.random() > .15 else '#bfe0ff')
            x += w + rnd.randint(-6, 8)
    return cv.img

def ground(cv, pal, y0=560, perspective=(300, 980, 400, 880)):
    p = PAL[pal]; cv.gradient_rect(0, y0, W, H, p['ground'], p['drive'])
    x0, x1, g0, g1 = perspective
    cv.poly([(g0, y0), (g1, y0), (x1, H), (x0, H)], p['drive'])
    mx0, mx1 = (g0 + g1) / 2, (x0 + x1) / 2
    for k in range(5):
        t0, t1 = k / 5 + .02, k / 5 + .12
        yA, yB = lerp(y0, H, t0), lerp(y0, H, t1)
        wA, wB = lerp(5, 14, t0), lerp(5, 14, t1)
        cv.poly([(lerp(mx0, mx1, t0) - wA / 2, yA), (lerp(mx0, mx1, t0) + wA / 2, yA), (lerp(mx0, mx1, t1) + wB / 2, yB), (lerp(mx0, mx1, t1) - wB / 2, yB)], '#e8eef7' if pal == 'day' else '#7e8ca6')

def lamp(cv, x, y, pal):
    p = PAL[pal]; cv.rect(x - 3, y, x + 3, y + 90, p['ink']); cv.rect(x - 12, y - 6, x + 12, y + 4, p['ink'], r=3)
    if p['lamp']: cv.glow(x, y + 8, 90, '#ffd9a0', .55); cv.ell(x, y + 5, 10, 4, '#fff1cc')

# ---------------------------------------------------------------- vehicles / people
def car_rear(cv, cx, by, s, body='#e5e7eb', lights=1.0):
    X = lambda dx: cx + dx * s; Y = lambda dy: by + dy * s
    cv.ell(cx, by, 190 * s, 18 * s, (0, 0, 0, 110))
    cv.rect(X(-150), Y(-34), X(-104), Y(0), '#0b0f18', r=6 * s); cv.rect(X(104), Y(-34), X(150), Y(0), '#0b0f18', r=6 * s)
    cv.rect(X(-172), Y(-98), X(172), Y(-26), body, r=24 * s)
    cv.poly([(X(-132), Y(-96)), (X(-96), Y(-166)), (X(96), Y(-166)), (X(132), Y(-96))], body)
    cv.poly([(X(-114), Y(-100)), (X(-84), Y(-156)), (X(84), Y(-156)), (X(114), Y(-100))], '#0b1830')
    cv.rect(X(-172), Y(-62), X(172), Y(-54), '#cbd5e1' if body != '#0f172a' else '#1e293b')
    if lights > 0:
        cv.glow(X(-138), Y(-78), 70 * s, '#ff2d3d', .6 * lights); cv.glow(X(138), Y(-78), 70 * s, '#ff2d3d', .6 * lights)
    cv.rect(X(-168), Y(-90), X(-110), Y(-66), '#ff3b4a' if lights > 0 else '#7a1b24', r=8 * s); cv.rect(X(110), Y(-90), X(168), Y(-66), '#ff3b4a' if lights > 0 else '#7a1b24', r=8 * s)
    cv.rect(X(-34), Y(-60), X(34), Y(-42), '#f8fafc', r=3 * s)

def car_side(cv, x, by, s=1.0, body='#e5e7eb'):
    X = lambda dx: x + dx * s; Y = lambda dy: by + dy * s
    cv.ell(X(150), by, 175 * s, 12 * s, (0, 0, 0, 110))
    cv.rect(X(0), Y(-70), X(300), Y(-18), body, r=22 * s)
    cv.poly([(X(52), Y(-68)), (X(92), Y(-120)), (X(212), Y(-120)), (X(256), Y(-68))], body)
    cv.poly([(X(66), Y(-72)), (X(98), Y(-112)), (X(146), Y(-112)), (X(146), Y(-72))], '#0b1830'); cv.poly([(X(154), Y(-72)), (X(154), Y(-112)), (X(206), Y(-112)), (X(240), Y(-72))], '#0b1830')
    for wx in (62, 238):
        cv.ell(X(wx), Y(-18), 28 * s, 28 * s, '#0a0e16'); cv.ell(X(wx), Y(-18), 14 * s, 14 * s, '#94a3b8')
    cv.rect(X(286), Y(-56), X(302), Y(-44), '#fff2b0', r=4 * s); cv.glow(X(310), Y(-50), 60 * s, '#fff2b0', .5)

def person_rear(cv, cx, by, s, t, shirt='#0A84FF'):
    X = lambda dx: cx + dx * s; Y = lambda dy: by + dy * s
    sw = math.sin(t * math.pi * 8) * 6
    cv.ell(cx, by, 38 * s, 7 * s, (0, 0, 0, 90))
    cv.rect(X(-16 + sw), Y(-90), X(-2 + sw), Y(0), '#1e293b', r=5 * s); cv.rect(X(2 - sw), Y(-90), X(16 - sw), Y(0), '#1e293b', r=5 * s)
    cv.rect(X(-24), Y(-170), X(24), Y(-80), shirt, r=14 * s); cv.ell(cx, Y(-190), 17 * s, 19 * s, '#e2b28f'); cv.ell(cx, Y(-196), 17 * s, 15 * s, '#1f2937')

# ---------------------------------------------------------------- scene: sliding / swing gate
def gate_frame(cv, pal, u, kind, variant):
    p = PAL[pal]; wallY, top = 560, 440
    # house behind the wall
    cv.rect(560, 250, 1120, 470, p['facade']); cv.poly([(530, 252), (840, 160), (1150, 252)], p['wall_top'])
    for i in range(4):
        cv.rect(600 + i * 125, 300, 660 + i * 125, 372, p['win'] if pal != 'day' else p['glass']); 
        if p['lamp']: cv.glow(630 + i * 125, 336, 70, '#ffcf70', .35)
    cv.rect(780, 380, 860, 470, '#142138' if pal != 'day' else '#7c8ea8')
    # trees
    for tx in (120, 1200): cv.ell(tx, 420, 80, 90, '#0f3d2a' if pal != 'day' else '#2f7d4f'); cv.rect(tx - 7, 470, tx + 7, 560, '#2a1d12')
    # inner driveway
    cv.poly([(560, 470), (720, 470), (900, 560), (380, 560)], p['drive'])
    gx0, gx1 = 380, 900
    # gate leaves
    gate = '#0f2f5f' if variant.get('tone') != 'wood' else '#6b4423'; edge = p['accent'] if variant.get('tone') != 'wood' else '#d6a56b'
    def slats(x0, x1, y0, y1):
        cv.rect(x0, y0, x1, y1, gate, r=4); cv.rect(x0, y0, x1, y0 + 8, edge); cv.rect(x0, y1 - 8, x1, y1, edge)
        n = max(2, int((x1 - x0) / 26))
        for k in range(n): cv.rect(x0 + 10 + k * ((x1 - x0 - 20) / n), y0 + 18, x0 + 16 + k * ((x1 - x0 - 20) / n), y1 - 18, '#cfe9ff' if variant.get('tone') != 'wood' else '#a9743f')
    o = ss(u, .14, .34) - ss(u, .72, .88)
    t1, t2 = ss(u, 0, .3), ss(u, .3, .76)
    car_by = lerp(lerp(780, 690, t1), 500, t2); car_s = lerp(lerp(.95, .9, t1), .36, t2)
    def draw_car(): car_rear(cv, 640, car_by, car_s, body=variant.get('body', '#e5e7eb'), lights=1.0)
    car_on = variant.get('car', True) and 0 < u < .985
    car_front = car_on and car_by >= 556
    if car_on and not car_front: draw_car()
    if kind == 'sliding':
        # leaf slides left behind left wall
        off = -(gx1 - gx0 - 8) * o
        slats(gx0 + 8 + off, gx1 - 8 + off, 450, 556)
    else:
        th = math.radians(78 * o); wl = (gx1 - gx0) / 2 - 10
        wcos = max(.12, math.cos(th)); far = 1 - .22 * math.sin(th)
        # left leaf hinged at gx0, right at gx1; opening inward (foreshortened and shorter at free edge)
        for side in (-1, 1):
            hx0 = gx0 + 6 if side == -1 else gx1 - 6; fx = hx0 + side * -1 * 0  # hinge
            fx = hx0 + (wl * wcos) * (1 if side == -1 else -1)
            hh = 106 * far
            cv.poly([(hx0, 450), (fx, 450 + (106 - hh) / 2), (fx, 556 - (106 - hh) / 2), (hx0, 556)], gate)
            cv.line([(hx0, 450), (fx, 450 + (106 - hh) / 2)], edge, 4)
            for k in range(1, 7):
                t = k / 7; xx = lerp(hx0, fx, t); hh2 = lerp(106, hh, t); cv.rect(xx - 2, 556 - (106 - hh2) / 2 - hh2 + 14, xx + 2, 556 - (106 - hh2) / 2 - 14, '#cfe9ff' if variant.get('tone') != 'wood' else '#a9743f')
    # car front pass drawn after leaves
    if car_front: draw_car()
    # walls and pillars
    cv.rect(0, 440, gx0 - 6, wallY, p['wall']); cv.rect(0, 440, gx0 - 6, 452, p['wall_top']); cv.rect(gx1 + 6, 440, W, wallY, p['wall']); cv.rect(gx1 + 6, 440, W, 452, p['wall_top'])
    for k in range(0, int(gx0 - 6), 70): cv.rect(k + 4, 482, k + 60, 548, p['wall_top'], r=3)
    for k in range(int(gx1 + 14), W, 70): cv.rect(k, 482, k + 56, 548, p['wall_top'], r=3)
    for px in (gx0 - 28, gx1 - 2):
        cv.rect(px, 420, px + 34, wallY, p['wall_top']); cv.rect(px - 4, 412, px + 38, 424, p['wall']); 
        cv.rect(px + 8, 452, px + 26, 464, p['accent'] if o > .05 or (u % .2) < .1 else '#3b6aa8', r=3)
        if p['lamp']: cv.glow(px + 17, 404, 55, '#ffe2a8', .55); cv.ell(px + 17, 404, 9, 7, '#fff4d6')
    cv.rect(gx0 + 4, wallY - 6, gx1 - 4, wallY, '#0a0e16')

def scene_gate(S, pal, u, variant, kind='sliding'):
    cv = backdrop(S, pal, 470); ground(cv, pal, 560)
    lamp(cv, 120, 400, pal); lamp(cv, 1160, 400, pal)
    gate_frame(cv, pal, u, kind, variant); return cv

# ---------------------------------------------------------------- scene: boom barrier
def scene_boom(S, pal, u, variant):
    p = PAL[pal]; cv = backdrop(S, pal, 440, seed=11); ground(cv, pal, 470, (-200, 1500, 200, 1100))
    cv.rect(0, 440, W, 470, p['wall'])
    for k in range(0, W, 90): cv.rect(k + 6, 450, k + 78, 462, p['wall_top'])
    # security booth
    cv.rect(110, 330, 330, 560, p['facade'], r=6); cv.rect(96, 316, 344, 340, p['wall_top'], r=4)
    cv.rect(140, 360, 300, 450, p['glass'] if pal == 'day' else '#2a4d7a'); 
    if p['lamp']: cv.glow(220, 405, 120, '#ffd88a', .3)
    cv.rect(150, 372, 290, 380, '#ffffff22' if False else '#bfe0ff')
    # barrier post + arm
    px, py = 410, 470
    cv.rect(px - 36, py - 40, px + 36, py + 110, '#e9eef6' if pal != 'night' else '#c5d0de', r=8); cv.rect(px - 36, py + 20, px + 36, py + 40, '#f59e0b')
    o = ss(u, .18, .36) - ss(u, .66, .82); ang = math.radians(86 * o)
    L = 640; x0, y0 = px + 20, py - 18
    x1, y1 = x0 + L * math.cos(ang), y0 - L * math.sin(ang)
    nx, ny = -math.sin(ang), -math.cos(ang)
    t = 11
    cv.poly([(x0 + nx * t, y0 + ny * t), (x1 + nx * t, y1 + ny * t), (x1 - nx * t, y1 - ny * t), (x0 - nx * t, y0 - ny * t)], '#f8fafc')
    n = 9
    for k in range(0, n, 2):
        a, b = k / n, (k + 1) / n
        cv.poly([(lerp(x0, x1, a) + nx * t, lerp(y0, y1, a) + ny * t), (lerp(x0, x1, b) + nx * t, lerp(y0, y1, b) + ny * t), (lerp(x0, x1, b) - nx * t, lerp(y0, y1, b) - ny * t), (lerp(x0, x1, a) - nx * t, lerp(y0, y1, a) - ny * t)], '#e11d2e')
    cv.glow(x1, y1, 40, '#ff5a5a', .6 if o > .02 else .25)
    # car side view passes right after lifting
    cu = ss(u, .34, .72)
    if u < .98: car_side(cv, lerp(-380, 1320, cu), 628, 1.15, body=variant.get('body', '#dbe4f0'))
    cv.rect(px - 36, py - 40, px + 36, py - 4, '#e9eef6' if pal != 'night' else '#c5d0de', r=8); cv.rect(px - 10, py - 30, px + 10, py - 20, p['accent'], r=3)
    lamp(cv, 1150, 330, pal); lamp(cv, 560, 360, pal)
    return cv

# ---------------------------------------------------------------- scene: rolling / sectional / dock / high-speed doors
def interior(cv, kind, x0, y0, x1, y1, pal):
    warm = pal != 'day'
    if kind == 'garage':
        cv.gradient_rect(x0, y0, x1, y1, '#ffe7b0' if warm else '#f3ead2', '#b7803f' if warm else '#a8895b'); car_rear(cv, (x0 + x1) / 2, y1 - 8, .66, body='#cbd5e1', lights=.0)
    elif kind == 'shop':
        cv.gradient_rect(x0, y0, x1, y1, '#fff1c9', '#c99555')
        for k in range(3): cv.rect(x0 + 20, y0 + 30 + k * 62, x1 - 20, y0 + 36 + k * 62, '#8b5e34')
        for k in range(3):
            for j in range(9):
                cv.rect(x0 + 30 + j * ((x1 - x0 - 70) / 9), y0 + 8 + k * 62, x0 + 30 + j * ((x1 - x0 - 70) / 9) + 24, y0 + 30 + k * 62, ['#0A84FF', '#f59e0b', '#16a34a', '#e11d48'][(j + k) % 4], r=3)
    else:  # warehouse / dock
        cv.gradient_rect(x0, y0, x1, y1, '#9fb0c7', '#3d4a60'); 
        for k in range(4):
            bx = x0 + 24 + k * ((x1 - x0 - 60) / 4); cv.rect(bx, y1 - 70 - (k % 2) * 40, bx + 70, y1, '#c28a4b'); cv.rect(bx, y1 - 70 - (k % 2) * 40, bx + 70, y1 - 60 - (k % 2) * 40, '#e0aa6a')
        cv.rect(x0, y1 - 10, x1, y1, '#f2c200')

def scene_roller(S, pal, u, variant):
    p = PAL[pal]; typ = variant.get('type', 'roller'); inner = variant.get('inner', 'shop')
    cv = backdrop(S, pal, 430, seed=variant.get('seed', 3), towers=False); ground(cv, pal, 560, (200, 1080, 300, 980))
    ox0, ox1, oy0, oy1 = variant.get('open', (360, 920, 290, 560)); 
    fx0, fx1 = ox0 - 190, ox1 + 190
    cv.rect(fx0, 150 if inner != 'garage' else 130, fx1, 560, variant.get('facade', p['facade']))
    if inner == 'garage': cv.poly([(fx0 - 30, 134), ((fx0 + fx1) / 2, 40), (fx1 + 30, 134)], p['wall_top']); 
    cv.rect(fx0, 150, fx1, 176, p['wall_top']) if inner != 'garage' else None
    if inner == 'dock':
        for k in range(int(fx0), int(fx1), 34): cv.rect(k, 176, k + 3, 560, p['wall_top'])
        cv.rect(ox0 - 60, 300, ox0 - 20, 380, '#f2c200'); cv.rect(ox1 + 20, 300, ox1 + 60, 380, '#f2c200')
    elif inner == 'garage':
        for wx in (fx0 + 40, fx1 - 130):
            cv.rect(wx, 180, wx + 90, 260, p['glass'] if pal == 'day' else p['win']); cv.line([(wx + 45, 180), (wx + 45, 260)], p['facade'], 4)
            if p['lamp']: cv.glow(wx + 45, 220, 90, '#ffcf70', .3)
    else:
        cv.rect(ox0 + 40, 184, ox1 - 40, 252, '#0b1220', r=8); cv.rect(ox0 + 46, 190, ox1 - 46, 246, p['accent'], r=6)
        if p['lamp']: cv.glow((ox0 + ox1) / 2, 220, 200, p['accent'], .25)
    interior(cv, inner, ox0, oy0, ox1, oy1, pal)
    o = ss(u, variant.get('o0', .16), variant.get('o1', .4)) - ss(u, variant.get('c0', .68), variant.get('c1', .9))
    Hh = oy1 - oy0; yb = oy0 + Hh * (1 - o)
    col = variant.get('color', '#cfd8e4'); hi = variant.get('hi', '#eef2f7'); sh = variant.get('sh', '#9aa8bb')
    if yb > oy0 + 2:
        cv.rect(ox0, oy0, ox1, yb, col)
        if typ in ('sectional', 'dock'):
            ph = Hh / 5; k = 0
            while yb - k * ph > oy0 + 2:
                y1p = yb - k * ph; y0p = max(oy0, y1p - ph)
                if variant.get('glass') and k == 3: cv.rect(ox0 + 14, y0p + 8, ox1 - 14, y1p - 8, variant.get('glass'))
                else:
                    cv.rect(ox0 + 4, y0p + 4, ox1 - 4, y1p - 4, hi if not variant.get('wood') else '#b9803f', r=3)
                    if variant.get('wood'):
                        for g in range(int(ox0 + 20), int(ox1 - 10), 36): cv.rect(g, y0p + 8, g + 2, y1p - 8, '#8b5a2b')
                cv.rect(ox0, y1p - 3, ox1, y1p + 1, sh); k += 1
            cv.rect((ox0 + ox1) / 2 - 22, yb - 40, (ox0 + ox1) / 2 + 22, yb - 34, '#475569', r=2)
        elif typ == 'speed':
            cv.rect(ox0, oy0, ox1, yb, variant.get('color', '#1f6feb'))
            cv.rect(ox0 + 40, oy0 + 40, ox1 - 40, min(yb - 6, oy0 + 120), '#9bd7ff') if yb > oy0 + 130 else None
            for k in range(int(ox0), int(ox1), 40): cv.poly([(k, yb - 26), (k + 20, yb - 26), (k + 40, yb), (k + 20, yb)], '#f2c200') if k + 40 <= ox1 else None
        else:
            sl = variant.get('slat', 12); k = 0
            while yb - k * sl > oy0 + 1:
                y1p = yb - k * sl; cv.rect(ox0, max(oy0, y1p - sl), ox1, y1p - 1, col if k % 2 == 0 else hi); k += 1
            if variant.get('poly'): cv.alpha_rect(ox0, oy0, ox1, yb, '#7de0ff', .35)
        cv.rect(ox0 - 4, yb - 10, ox1 + 4, yb, '#334155', r=3)
        if variant.get('badge'): cv.rect(ox0 + 20, oy0 + 16, ox0 + 120, oy0 + 44, '#b91c1c', r=4)
    # drum / header and guides
    cv.rect(ox0 - 14, oy0 - 34, ox1 + 14, oy0, '#1e293b', r=6); cv.rect(ox0 - 14, oy0 - 8, ox1 + 14, oy0, '#334155')
    cv.rect(ox0 - 14, oy0, ox0, oy1, '#334155'); cv.rect(ox1, oy0, ox1 + 14, oy1, '#334155')
    cv.rect(ox1 + 30, oy0 + 60, ox1 + 44, oy0 + 74, '#16a34a' if o > .05 else p['accent'], r=7)
    cv.glow(ox1 + 37, oy0 + 67, 24, '#7dffa6' if o > .05 else p['accent'], .7)
    if inner == 'dock':  # leveller lip
        lw = ss(u, .3, .5) - ss(u, .66, .8); cv.poly([(ox0 + 20, oy1), (ox1 - 20, oy1), (ox1 - 20 + 16, oy1 + 18 + 18 * lw), (ox0 + 20 - 16, oy1 + 18 + 18 * lw)], '#f2c200')
    lamp(cv, 150, 360, pal); lamp(cv, 1130, 360, pal)
    return cv

# ---------------------------------------------------------------- scene: automatic glass sliding door
def scene_autodoor(S, pal, u, variant):
    p = PAL[pal]; cv = backdrop(S, pal, 430, seed=5); ground(cv, pal, 560, (260, 1020, 330, 950))
    fx0, fx1, ty = 120, 1160, 170
    cv.rect(fx0, ty, fx1, 560, p['facade']); cv.rect(fx0, ty, fx1, ty + 54, '#0B1220'); cv.rect(fx0 + 20, ty + 10, fx1 - 20, ty + 44, p['accent'], r=6)
    cv.glow((fx0 + fx1) / 2, ty + 27, 240, p['accent'], .22)
    ox0, ox1, oy0, oy1 = 350, 930, 260, 560
    # side glass panels
    for sx0, sx1 in ((fx0 + 30, ox0 - 20), (ox1 + 20, fx1 - 30)):
        cv.rect(sx0, oy0, sx1, oy1, p['glass'] if pal == 'day' else '#244a78'); cv.line([((sx0 + sx1) / 2, oy0), ((sx0 + sx1) / 2, oy1)], p['wall_top'], 4)
    # interior lobby
    cv.gradient_rect(ox0, oy0, ox1, oy1, '#fff4d6', '#b99560'); cv.rect(ox0, oy1 - 40, ox1, oy1, '#d9c7a2')
    for k in range(5): cv.rect(ox0 + 40 + k * 108, oy0 + 40, ox0 + 70 + k * 108, oy1 - 40, '#f7e2b0' if k % 2 else '#e9cf95')
    # person
    pu = ss(u, .18, .8)
    if u < .985: person_rear(cv, 640, lerp(690, 548, pu), lerp(1.45, .78, pu), pu, shirt=variant.get('shirt', '#0A84FF'))
    o = ss(u, .14, .3) - ss(u, .76, .9); mid = (ox0 + ox1) / 2; half = (ox1 - ox0) / 2
    for side in (-1, 1):
        shift = side * (half - 8) * o
        a, b = (ox0, mid) if side == -1 else (mid, ox1)
        a2, b2 = a + shift * 1.0, b + shift * 1.0
        # leaves slide into side panels (clipped visually by drawing over with facade strips)
        cv.alpha_rect(a2 + 4, oy0, b2 - 4, oy1, p['glass'], .55 if pal == 'day' else .38)
        cv.rect(a2, oy0, a2 + 6, oy1, '#aab6c6'); cv.rect(b2 - 6, oy0, b2, oy1, '#aab6c6'); cv.rect(a2, oy0, b2, oy0 + 6, '#aab6c6'); cv.rect(a2, oy1 - 6, b2, oy1, '#aab6c6')
    # cover leaf travel with side frames
    cv.rect(fx0 + 30, oy0 - 4, ox0, oy0, p['wall_top']); 
    cv.rect(ox0 - 16, oy0 - 18, ox1 + 16, oy0, '#1e293b', r=4); cv.rect((ox0 + ox1) / 2 - 20, oy0 - 14, (ox0 + ox1) / 2 + 20, oy0 - 6, '#16a34a' if o > .05 else p['accent'], r=3)
    lamp(cv, 70, 380, pal); lamp(cv, 1210, 380, pal)
    return cv

SCENES = {
    'sliding': lambda S, pal, u, v: scene_gate(S, pal, u, v, 'sliding'),
    'swing': lambda S, pal, u, v: scene_gate(S, pal, u, v, 'swing'),
    'boom': scene_boom, 'roller': scene_roller, 'autodoor': scene_autodoor,
}

# ---------------------------------------------------------------- variants
GARAGE = dict(inner='garage', open=(430, 850, 300, 560), type='sectional')
SHOP = dict(inner='shop', open=(330, 950, 300, 560), type='roller')
DOCK = dict(inner='dock', open=(430, 850, 290, 560), type='dock', color='#8d9bb0', hi='#d7dee8', sh='#8896ab', o0=.2, o1=.45)
SPEED = dict(inner='dock', open=(400, 880, 280, 560), type='speed', color='#1f6feb', o0=.2, o1=.26, c0=.7, c1=.76, facade='#3b4a63')

def V(base, **kw): d = dict(base); d.update(kw); return d

# (file name, scene, palette, variant, u)
IMAGES = [
    # category + hero stills
    ('hero', 'sliding', 'dusk', {}, .46), ('gate-automation', 'sliding', 'dusk', {}, .5), ('automatic-doors', 'autodoor', 'day', {}, .5),
    ('boom-barriers', 'boom', 'dusk', {}, .52), ('sectional-doors', 'roller', 'day', V(GARAGE, color='#d7dde6'), .55), ('rolling-shutters', 'roller', 'day', V(SHOP, slat=12, color='#9aa8bb', hi='#c3cdd9'), .52),
    ('high-speed-doors-dock', 'roller', 'day', V(SPEED), .5), ('service', 'swing', 'dusk', {}, .55),
    # industries
    ('ind-apartments', 'boom', 'day', {}, .55), ('ind-villas', 'sliding', 'day', {}, .5), ('ind-it-parks', 'boom', 'dusk', {'body': '#cbd5e1'}, .5),
    ('ind-warehouses', 'roller', 'day', V(DOCK), .5), ('ind-hospitals', 'autodoor', 'day', {'shirt': '#16a34a'}, .55), ('ind-malls', 'autodoor', 'dusk', {'shirt': '#f59e0b'}, .55),
    ('ind-factories', 'roller', 'day', V(SPEED, seed=9), .52), ('ind-parking', 'boom', 'night', {}, .5), ('ind-default', 'sliding', 'dusk', {}, .55),
    ('ind-schools', 'sliding', 'day', {'body': '#fde68a'}, .5), ('ind-hotels', 'swing', 'dusk', {'car': True}, .6), ('ind-cold-storage', 'roller', 'day', V(SPEED, color='#38bdf8'), .5),
    ('ind-showrooms', 'autodoor', 'night', {'shirt': '#e11d48'}, .55), ('ind-airports', 'boom', 'day', {'body': '#fef3c7'}, .5), ('ind-data-centres', 'roller', 'night', V(SPEED, color='#0f2f5f'), .5), ('ind-government', 'boom', 'day', {'body': '#e2e8f0'}, .6),
    # products (slug -> look)
    ('p-sliding-gate-automation', 'sliding', 'dusk', {}, .5), ('p-swing-gate-automation', 'swing', 'day', {}, .55), ('p-trackless-bi-folding-gate-automation', 'swing', 'dusk', {'tone': 'wood'}, .5),
    ('p-telescopic-gate-automation', 'sliding', 'day', {'tone': 'wood'}, .55), ('p-bi-folding-gate-automation', 'swing', 'night', {}, .6),
    ('p-sliding-glass-doors', 'autodoor', 'day', {}, .55), ('p-sliding-pvc-doors', 'autodoor', 'day', {'shirt': '#f97316'}, .6), ('p-sliding-wooden-doors', 'autodoor', 'dusk', {'shirt': '#a16207'}, .6),
    ('p-glass-swing-door-automation', 'autodoor', 'night', {}, .45), ('p-folding-door-automation', 'autodoor', 'dusk', {'shirt': '#8b5cf6'}, .5), ('p-swing-window-automation', 'swing', 'day', {'car': False}, .6),
    ('p-vertical-window-automation', 'roller', 'day', V(GARAGE, glass='#9bd7ff', color='#c9d3df'), .6), ('p-curtain-and-blinds-automation', 'roller', 'dusk', V(SHOP, slat=20, color='#a78bfa', hi='#c4b5fd'), .5),
    ('p-folding-boom-barrier', 'boom', 'dusk', {}, .5), ('p-fence-boom-barrier', 'boom', 'day', {}, .5), ('p-telescopic-boom-barrier', 'boom', 'night', {}, .5), ('p-arm-out-boom-barrier', 'boom', 'dusk', {'body': '#fca5a5'}, .55), ('p-advertising-boom-barrier', 'boom', 'day', {'body': '#bae6fd'}, .5),
    ('p-residential-sectional-doors', 'roller', 'day', V(GARAGE, color='#e5e7eb'), .55), ('p-full-vision-glass-sectional-doors', 'roller', 'dusk', V(GARAGE, glass='#9bd7ff'), .55),
    ('p-garage-sectional-doors', 'roller', 'night', V(GARAGE, color='#94a3b8'), .6), ('p-wooden-finish-sectional-doors', 'roller', 'day', V(GARAGE, wood=True, color='#8b5a2b'), .55),
    ('p-pvc-glass-sectional-doors', 'roller', 'day', V(GARAGE, glass='#d9f0ff', color='#ffffff', hi='#f8fafc'), .6), ('p-polycarbonate-glass-sectional-doors', 'roller', 'dusk', V(GARAGE, glass='#7de0ff', color='#e2e8f0'), .55),
    ('p-industrial-sectional-doors', 'roller', 'day', V(DOCK, inner='dock', type='sectional'), .5),
    ('p-aluminium-rolling-shutter', 'roller', 'day', V(SHOP, slat=12, color='#aab6c6', hi='#dfe6ee'), .55), ('p-gi-rolling-shutter', 'roller', 'dusk', V(SHOP, slat=12, color='#64748b', hi='#7b8aa0'), .55),
    ('p-fire-rated-double-wall-galvalume-rolling-shutter', 'roller', 'day', V(SHOP, slat=14, color='#7b8798', hi='#97a3b6', badge=True), .55), ('p-wind-resistance-rolling-shutter', 'roller', 'night', V(SHOP, slat=9, color='#475569', hi='#5b6b82'), .55),
    ('p-polycarbonate-rolling-shutter', 'roller', 'day', V(SHOP, slat=12, color='#9ee7ff', hi='#c7f3ff', poly=True), .55),
    ('p-high-speed-doors', 'roller', 'day', V(SPEED), .5), ('p-dock-leveller', 'roller', 'day', V(DOCK), .55), ('p-dock-shelters', 'roller', 'dusk', V(DOCK, color='#334155', hi='#475569'), .55),
    ('p-retractable-dock-shelters', 'roller', 'day', V(DOCK, color='#1e3a8a', hi='#2c4fb3'), .6), ('p-inflatable-dock-shelters', 'roller', 'day', V(DOCK, color='#0f766e', hi='#14a396'), .6), ('p-dock-seals', 'roller', 'night', V(DOCK), .55),
    # gallery-only extras
    ('g-gate-night', 'sliding', 'night', {}, .5), ('g-gate-day', 'swing', 'day', {}, .5), ('g-barrier-dusk', 'boom', 'dusk', {}, .55), ('g-garage-dusk', 'roller', 'dusk', V(GARAGE), .6),
    ('g-shutter-night', 'roller', 'night', V(SHOP, slat=12, color='#8795aa', hi='#aab6c6'), .6), ('g-dock-day', 'roller', 'day', V(DOCK), .6), ('g-lobby-night', 'autodoor', 'night', {}, .55), ('g-factory-dusk', 'roller', 'dusk', V(SPEED), .5),
]

# (file name, scene, palette, variant, seconds)
VIDEOS = [
    ('hero-car-gate', 'sliding', 'dusk', {}, 9), ('swing-gate', 'swing', 'dusk', {'car': False}, 6), ('boom-barrier', 'boom', 'dusk', {}, 7),
    ('sectional-door', 'roller', 'day', V(GARAGE, color='#d7dde6'), 6), ('rolling-shutter', 'roller', 'day', V(SHOP, slat=12, color='#9aa8bb', hi='#c3cdd9'), 6),
    ('dock-leveller', 'roller', 'day', V(DOCK), 7), ('automatic-glass-door', 'autodoor', 'day', {}, 7), ('high-speed-door', 'roller', 'day', V(SPEED), 5),
]

def render(scene, pal, var, u, S):
    return SCENES[scene](S, pal, u, var)

def make_images():
    os.makedirs(IMG_DIR, exist_ok=True)
    for name, scene, pal, var, u in IMAGES:
        cv = render(scene, pal, var, u, 2)
        im = cv.out((W, H)).crop((64, 0, W - 64, H)).resize((1152, 720), Image.LANCZOS)  # 16:10
        im.save(os.path.join(IMG_DIR, f'{name}.webp'), 'WEBP', quality=80, method=6)
        if name == 'hero': im.resize((1152, 720)).save(os.path.join(IMG_DIR, 'hero-poster.webp'), 'WEBP', quality=70, method=6)
        print('image', name)

def make_video(name, scene, pal, var, secs, fps=24, S=1.5, size=(1280, 720)):
    os.makedirs(VID_DIR, exist_ok=True); n = int(secs * fps)
    mp4, webm, poster = (os.path.join(VID_DIR, f'{name}.mp4'), os.path.join(VID_DIR, f'{name}.webm'), os.path.join(VID_DIR, f'{name}-poster.webp'))
    base = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{size[0]}x{size[1]}', '-r', str(fps), '-i', '-']
    p1 = subprocess.Popen(base + ['-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4], stdin=subprocess.PIPE)
    for i in range(n):
        u = i / (n - 1); cv = render(scene, pal, var, u, S); fr = cv.out(size); p1.stdin.write(fr.tobytes())
        if i == int(n * .5): fr.save(poster, 'WEBP', quality=70, method=6)
    p1.stdin.close(); p1.wait()
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp4, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', '-an', webm], check=True)
    print('video', name, os.path.getsize(mp4) // 1024, 'KB mp4', os.path.getsize(webm) // 1024, 'KB webm')

if __name__ == '__main__':
    what = sys.argv[1] if len(sys.argv) > 1 else 'all'
    if what in ('all', 'images'): make_images()
    if what in ('all', 'videos'):
        only = sys.argv[2:] if len(sys.argv) > 2 else None
        for v in VIDEOS:
            if only and v[0] not in only: continue
            make_video(*v)
