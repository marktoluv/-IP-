# EIRA visual asset prompts

The seven final images in `public/media` were made with Codex's built-in **imagegen** tool. The canonical portrait was generated first; every other image used that portrait as an identity reference. Final PNGs were converted to WebP with Pillow (`quality=88`, `method=6`). The source PNGs remain in the local Codex generated-images folder and are not required by the website.

## Shared character and art direction

- **EIRA / 亦岚:** an original adult East Asian digital storytelling artist with a soft oval face, defined jaw, straight dark brows, almond dark-brown eyes, a small beauty mark below the left eye, warm natural skin, and a precise chin-length center-parted black bob. A fine champagne-gold ear cuff and sculptural clothing recur across the series.
- **Visual language:** photorealistic luxury fashion editorial meets contemporary art exhibition; near-black, warm off-white, charcoal, and restrained champagne gold. Preserve realistic skin, fabric, glass, ceramic, and architectural texture.
- **Common exclusions:** no words, logos, watermarks, celebrity likeness, cyberpunk neon, HUD graphics, plastic skin, glowing eyes, or extra people. Later prompts explicitly asked imagegen to preserve EIRA's facial proportions, beauty mark, hair, and ear cuff from the source portrait.

The original PNGs were saved in the creator's local Codex generated-images folder. That machine-specific folder is intentionally omitted from this public project; the final WebP files below are the website's source assets.

| Final asset and use | English prompt summary | Original PNG |
| --- | --- | --- |
| `hero-eira.webp` — wide desktop Hero, with live text placed over dark space at left | "Place the same EIRA in a monumental minimal dark gallery, waist-up in the right third; reserve the left two thirds as clean black negative space. Add one warm-white light plane and a restrained champagne reflection. Photorealistic cinematic fashion editorial." | `exec-97341dbe-4241-4959-a08f-1b88ad8ad1a1.png` |
| `origin-portrait.webp` — canonical face and vertical mobile/Hero crop source | "Create EIRA as a believable, androgynous East Asian digital storytelling artist, mid-torso portrait in a near-black high-collar garment. Direct, calm gaze; charcoal gallery backdrop; soft warm key and champagne rim light. Preserve natural skin detail and the distinct beauty mark, bob, and ear cuff." | `exec-e78dbe7b-623f-4dd1-a134-b3e7711add0c.png` |
| `after-light.webp` — architectural narrative gallery work | "Keep EIRA's exact identity. Place her in a vast dark architectural passage at blue hour, near an opening to a slate-blue horizon. Tailored black coat, three-quarter view, poetic stillness, warm-white face light and subtle champagne reflections." | `exec-e1d60cc8-980c-4786-b251-aa30b58b4bc9.png` |
| `soft-machines.webp` — tactile installation gallery work | "Keep EIRA's exact identity. Let her explore monumental smooth warm-white ceramic forms in a dark contemporary art museum, one hand resting naturally on a form. Vertical fashion-art composition, warm museum spots, detailed ceramic and fabric texture." | `exec-e237e00c-d334-4bda-bfa0-e3d0af42f9b7.png` |
| `motion-01.webp` — film poster and video thumbnail | "Keep EIRA's exact identity. Freeze a moment from an art-film performance on a near-black stage: she moves in dark clothing while one continuous ivory silk fabric sweeps in a graceful arc. Her face stays sharp; warm spotlight and subtle gold edge light; cinematic wide frame." | `exec-fc097b82-d10a-4dba-94b8-9e2f17c40c22.png` |
| `aura-objects.webp` — collectible/object campaign work | "Keep EIRA's exact identity. Frame her from the shoulders beside one hand-blown smoky-amber glass orb on a black plinth. Make the orb refract a warm light line and champagne glint. Square, intimate luxury editorial still with believable glass reflections." | `exec-2c87294a-539e-4e84-8cf9-c932579478ec.png` |
| `atelier-zero.webp` — creative studio/campaign work | "Keep EIRA's exact identity. Dress her in a warm-ivory sculptural jacket in a refined atelier of matte-paper planes, dark metal frames, and one champagne reflective panel. She studies a blank print; diffused daylight, tactile surfaces, portrait composition." | `exec-20f78304-9887-45dc-99f2-c4dd0ae9354d.png` |

To reproduce a derivative, provide `origin-portrait.webp` as the imagegen reference image and adapt the relevant English summary above into a full prompt. Keep the shared character constraints and exclusions explicit.

## Motion study

`scripts/generate-motion.mjs` turns `motion-01.webp`, `after-light.webp`, and `soft-machines.webp` into both `eira-motion.webm` (VP9) and `eira-motion.mp4` (H.264). It applies a very slow push/pan to each still and joins them with two half-second dissolves. Both files are silent, eight-second, 1280 × 720, 24 fps visual samples, not claims of a commissioned video project.

Run `node scripts/generate-motion.mjs` with `ffmpeg` on `PATH`, or set `FFMPEG_PATH` to an FFmpeg executable first. The FFmpeg tool is used at build time only; the website serves the finished WebM and MP4 without requiring FFmpeg at runtime.
