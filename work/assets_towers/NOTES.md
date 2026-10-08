# Tower parts and props (asset agent), 2026-10-08

16 finals in game/assets/ (+ .expect.json), all built by `node build.mjs --final <asset> <x>` from src/cands/<asset>_<x>.js
with src/lib.js inlined. Verify: finals_check/ = 16/16 clean. Picks and reasons: receipts/candidates/PICKS_towers.md.

| final | pick | tris |
|---|---|---|
| layer_bread | c | 2232 |
| layer_lettuce | b | 2628 |
| layer_tomato | b | 2784 |
| layer_cheese | b | 1152 |
| layer_bacon | c | 2448 |
| head_ballista | b | 1540 |
| head_pickle | b | 2916 |
| head_mustard | b | 2084 |
| head_pepper | c | 1136 |
| head_grater | a | 2600 (171 meshes; merges by material on load) |
| head_toaster | c | 704 |
| flag_club | a | 1208 |
| pad_coaster | a | 760 |
| club_sandwich | d | 11564 |
| dinner_plate | b | 2016 |
| spatula | c | 1608 |

## Things the game depends on
- game.js loads parts with ASSET(..., {height}) and stacks by bbox x 0.92, so every part's bbox height is fitted
  exactly to the game's partH (bread 0.16, lettuce/tomato 0.12, cheese 0.07, bacon 0.09, coaster 0.09). Cheese droop is
  therefore inside 0.07 (slab ~0.035, droop ~0.035).
- Thicknesses follow the brief (0.12/0.12/0.07/0.09), not STYLE_LOCK's 0.08/0.08/0.04/0.06, because game.js uses the brief's.
- Fillings deliberately overhang the 1.1 m bread (lettuce 1.5, tomato 1.26, bacon 1.38, cheese corners 1.54 diagonal):
  in the stack test at 45 deg they were invisible under the top slice at 1.0 to 1.1 m.
- club_sandwich: userData.layers l1..l9 (l1 top bread ... l9 bottom bread), each a named Group; picks are in l1.
  Checked through game/assetlib ASSET({keepHierarchy:true}): all 9 keys resolve, height 3.0.
  After the lead's in-game note the halves STAND on their crust (cut faces with every layer face +Z and up);
  the stack runs sideways, so l1 is the outer bread of BOTH halves and hiding l1, l2, ... eats inward from the outsides.
  Footprint ~3.05 x 2.85 m: fits the 1.45x plate (3.9 m) but overhangs its well a little.
- Heads face +Z (bolt, pickle muzzle, mustard nozzle, toaster tilted forward). Mustard is 1.33 m deep because the
  bottle tips forward; ballista 1.29 m wide (bow), both wider than the 1.1 bread.

## Weak / unverified
- Grater steel and the plate render greyish under my no-envmap scratch light; the lead says the plate reads in game.
- Lettuce edges are a little jagged/shaggy close up; fine at 6 to 18 m.
- Sandwich d: lettuce and cheese droop sideways now (they were authored flat); not visible at game angle.
- Not seen inside the running game by me: only the verifier and my look.mjs renders (looks/*.png).
- Picks in d pierce the cut face near the top back; if the lead wants them at the very top corner, move pz in d.

## Credits
Atlas: 5 x text-to-image fast (ref/sheet1-5.png) = 230 credits held of 600.

## Tools here
build.mjs (inline lib, candidates and finals), look.mjs (scratch puppeteer renderer, stacking like the game),
looks/assetcheck.mjs (loads through game/assetlib with keepHierarchy).
