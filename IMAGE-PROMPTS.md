# Photoreal / 3D image replacement guide

Every image on the site is a file in `public/images/`. To replace one, save your new image with the SAME file name
(1280x800 px, 16:10, WebP or convert with squoosh.app). No code change is needed.

Already real/3D (done): all hero, gallery (g-*), industry (ind-*), category and most product (p-*) images now use photoreal renders. Every image also has a 640px twin (name-640.webp) used by srcSet on phones: re-run `python3 media-kit/import_media.py` after replacing an image.
Still placeholder illustrations: p-curtain-and-blinds-automation, p-swing-window-automation, p-bi-folding-gate-automation, p-trackless-bi-folding-gate-automation, p-folding-boom-barrier, p-inflatable-dock-shelters, p-glass-swing-door-automation, ind-airports, g-shutter-night, rolling/other category svgs.
Still illustrations (replace with 3D/real): the files below. Paste the prompt into your image tool (ChatGPT/Gemini/Midjourney).

Style line to add to every prompt:
"photorealistic 3D render, premium architectural photography, Hyderabad India, golden hour, sharp detail, no text, no logos, 16:10"

| File | Prompt |
|---|---|
| hero.webp, hero-poster.webp | Modern villa entrance in Hyderabad with a sleek black sliding gate opening for a white SUV |
| gate-automation.webp | Automatic sliding gate with motor and rack visible, gated community entrance |
| automatic-doors.webp | Frameless automatic sliding glass doors at a modern corporate lobby |
| sectional-doors.webp | Wooden-finish sectional garage door on a luxury villa |
| rolling-shutters.webp | Industrial rolling shutter half open at a warehouse, steel slats |
| high-speed-doors-dock.webp | High-speed fabric door and dock leveller with a truck at a logistics warehouse |
| service.webp | Technician installing a gate motor, uniform, tools, close-up |
| p-skylight-roof-shutter.webp | Motorised skylight roof shutter opening on a villa terrace, blue sky |
| p-sliding-pvc-doors / p-sliding-glass-doors / p-sliding-wooden-doors | The named door type in a real interior |
| g-*.webp (gallery) | Night/day scenes of gate, barrier, shutter, lobby, dock |
| ind-*.webp | One scene per industry (apartments, hospital, mall, school, hotel, factory, airport...) |

Rights: use only images you generated or own. Do not copy photos from DEA, Autozon or other brands.


## Service pages
Each service page now has its own image `svc-<service-slug>.webp`. Prompts are in `media-kit/SERVICE-IMAGE-PROMPTS.md`.

## V12 additions (replace the edited placeholders with real or generated photos, same file names)
| File | Prompt |
|---|---|
| p-polycarbonate-glass-sectional-doors.webp | Sectional door with frosted translucent opal polycarbonate panels in aluminium frames, modern showroom or villa, daylight |
| p-pvc-glass-sectional-doors.webp | White insulated PVC sectional door with one clear vision strip, modern building |
| p-garage-sectional-doors.webp | Graphite grey steel sectional garage door on a modern villa |
| p-cantilever-trackless-gate-automation.webp | Cantilever sliding gate hanging above the ground with no floor track, motor and counterbalance tail visible, villa entrance |
