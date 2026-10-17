# Video prompts (Veo / Runway / Kling / Pika)

Use IMAGE-TO-VIDEO: upload the matching photo from public/images as the first frame, then paste the prompt.
Save as `<name>.mp4` (exact name), drop in `incoming/`, run `python3 media-kit/import_media.py`.

## Settings that keep the site fast (no performance hit)
- Length 5-6 s, 16:9, no audio, 720p or 1080p. Static camera or very slow push-in only.
- No people close to camera, no fast motion, no smoke/rain/particles. Simple motion compresses to a tiny file.
- Importer outputs MP4 + WebM + poster (1280 wide). Target: each clip under 400 KB. If bigger, trim to 5 s.
- The site already lazy-loads clips, shows a poster first, skips video on phones / Save-Data / reduced-motion, and always has a Pause button. Do not add autoplay on more than one clip per screen.

Add to every prompt: `photorealistic, real footage look, natural daylight, steady locked-off camera, no text, no logos, no people looking at camera`

| File | Prompt |
|---|---|
| hero-car-gate.mp4 | White SUV waits at a black sliding villa gate in Hyderabad, the gate slides open smoothly, the car drives in slowly, golden hour |
| swing-gate.mp4 | Dual swing gate at an apartment entrance opens inwards by itself, a hatchback drives in, gate closes behind it |
| boom-barrier.mp4 | Boom barrier arm lifts smoothly as a car stops at a parking entry, security cabin beside it, car passes, arm lowers |
| rolling-shutter.mp4 | Metal rolling shutter of a shop front rises steadily into its box, lit shop interior revealed |
| sectional-door.mp4 | Wooden-finish sectional garage door of a villa rises panel by panel, a car parked inside |
| high-speed-door.mp4 | High-speed blue fabric door at a factory opens fast for a forklift carrying pallets, forklift passes, door closes |
| dock-leveller.mp4 | Truck reversed to a loading bay, dock door opens, blue dock leveller lip lowers onto the truck bed |
| automatic-glass-door.mp4 | Person walks toward an automatic sliding glass door at an office lobby, the doors part, person enters, doors close |

Optional repair clips (new, for the Services pages): `repair-gate.mp4` technician tightens a sliding gate motor and the gate then glides; `repair-glass-door.mp4` technician adjusts a glass door sensor and the doors then open smoothly.
