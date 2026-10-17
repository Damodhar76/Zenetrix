#!/usr/bin/env python3
"""Drop your real images/videos in ./incoming (names = target file names, e.g. hero.png, p-gi-rolling-shutter.jpg, hero-car-gate.mp4)
then run:  python3 media-kit/import_media.py
Images -> 1280x800 WebP in public/images. Videos -> MP4+WebM+poster in public/videos (needs ffmpeg)."""
import os, shutil, subprocess, sys
from PIL import Image
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
inc = os.path.join(root, 'incoming'); os.makedirs(inc, exist_ok=True)
img_dir = os.path.join(root, 'public/images'); vid_dir = os.path.join(root, 'public/videos')
known = {f[:-5] for f in os.listdir(img_dir) if f.endswith('.webp')}
vknown = {f[:-4] for f in os.listdir(vid_dir) if f.endswith('.mp4')}
ff = shutil.which('ffmpeg'); n = 0
for f in sorted(os.listdir(inc)):
    stem, ext = os.path.splitext(f); ext = ext.lower(); src = os.path.join(inc, f)
    if ext in ('.png', '.jpg', '.jpeg', '.webp'):
        if stem not in known: print('SKIP (unknown name):', f); continue
        im = Image.open(src).convert('RGB'); W, H = 1280, 800
        r = max(W/im.width, H/im.height); im = im.resize((round(im.width*r), round(im.height*r)), Image.LANCZOS)
        l, t = (im.width-W)//2, (im.height-H)//2
        im = im.crop((l, t, l+W, t+H)); im.save(os.path.join(img_dir, stem+'.webp'), quality=80, method=6)
        im.resize((640, 400), Image.LANCZOS).save(os.path.join(img_dir, stem+'-640.webp'), quality=78, method=6)
        print('image OK:', stem); n += 1
    elif ext in ('.mp4', '.mov', '.webm'):
        if stem not in vknown: print('SKIP (unknown name):', f); continue
        if not ff: print('ffmpeg missing, install it for videos'); continue
        o = os.path.join(vid_dir, stem)
        vf = 'scale=1280:-2'
        subprocess.run([ff,'-y','-i',src,'-an','-vf',vf,'-c:v','libx264','-crf','27','-preset','slow','-movflags','+faststart',o+'.mp4'],check=True)
        subprocess.run([ff,'-y','-i',src,'-an','-vf',vf,'-c:v','libvpx-vp9','-crf','36','-b:v','0',o+'.webm'],check=True)
        subprocess.run([ff,'-y','-i',src,'-vf',vf,'-frames:v','1',o+'-poster.png'],check=True)
        Image.open(o+'-poster.png').convert('RGB').save(o+'-poster.webp',quality=80); os.remove(o+'-poster.png')
        print('video OK:', stem); n += 1
print('Done,', n, 'files updated. Now run: npm run build')
