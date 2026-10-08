# Floor build: club sandwich tower defense (one pass, no loop)

Time: about 12 minutes wall clock (04:10 to 04:22 CEST, 2026-10-08), well under the 60 to 90 minute box.

## What it has
- `game/index.html`, single file, three.js 0.169 from the jsdelivr importmap, primitives plus canvas textures. No images generated.
- Marble kitchen counter, tiled backsplash, checked placemat runner as the olive path, olive jar spawn, cutting board and knife, mug, tomato.
- Club sandwich on a plate at the path end; it squashes as it loses HP (20 HP, black olives cost 3).
- Olives: green with pimento (normal), kalamata (fast), black (tanky). Googly eyes, rolling, health bars. Waves auto-start, HP scales by wave.
- Towers on 14 glowing pads: toothpick cup (fast single shot), pepper grinder (splash), salt shaker (slow). Tap a tower button, then tap near a pad (nearest pad within 2 m).
- Start screen, game over screen with retry, cash and wave HUD.
- `window.__READY__`, `window.__START__`, `window.__GAME__` {pos (lead olive, else last tap), fps from real time, speed (lead olive), score, over, draws, tris, plus wave/hp/cash/towers/olives}. Test helper `window.__PADS__()` returns pad screen coords.

## Capture
- Port 8811 was already held by another process (`node platform/server/index.mjs`, not mine, left alone), so I served on **8812**.
- Puppeteer with Metal and real `touchscreen.tap` for start and every tower. Frames f1 to f6 (390x844 @2x) over about 2 minutes, waves 2 to 5, 3 to 8 towers. l1, l2 at 844x390. 60 fps in every frame, 81 to 194 draws, at most about 16k tris. From the final run I looked at f1 and l2. f4, f6 and l1 I only saw from earlier runs of the same script. None were blank.

## Fixed during the pass
- The runner checker texture's repeat axes were swapped, so it rendered as stripes.
- The landscape camera cut off the sandwich, so I widened the FOV.

## Broken or weak
- Too easy: the sandwich never lost HP in 2 minutes. Balance is untested.
- Seen from above, the sandwich reads as a flat square, so the "tower" of the club sandwich does not come across.
- In landscape the toolbar overlaps the bottom of the board and the sandwich, and the board is small.
- No sound, no upgrades or selling, no win state.
- One console 404, most likely favicon.ico.
- Not tested on a real phone.
