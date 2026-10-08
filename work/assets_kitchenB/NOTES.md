# Kitchen B props (stovetop, sink, architecture), asset agent, 2026-10-08

16 finals are in game/assets/, each with a .expect.json. They are built by `./finalize.sh`, which runs `node build.mjs --final <asset> <x>` with src/lib.js inlined. The lib is a copy of the towers lib plus rbox/rpanel/enamel/glass/fitWHD.
All 16 pass the gate together (finals_check/verify.txt, 16/16 clean). Picks and reasons: receipts/candidates/PICKS_kitchenB.md.
References: 7 Atlas fast sheets (ref/sheetA-G.png), 322 credits max hold. There were 3 independent candidates per asset (48 in all).

| final | pick | tris |
|---|---|---|
| stove_burner | b | 2932 |
| stove_knob | b | 788 |
| frying_pan | a | 1998 |
| saucepan | b | 2068 |
| wooden_spoon | c | 740 |
| oven_mitt | c | 2796 |
| pepper_shaker | a | 996 |
| range_hood | a | 1028 (mounts back) |
| faucet | c | 2308 |
| dish_rack | a | 5320 (100 meshes, merges on load) |
| sponge | b | 448 |
| dish_soap | b | 984 |
| plate_stack | b | 5040 |
| drying_glass | b | 1156 |
| upper_cabinet | a | 3028 (mounts back, exact 4 x 7 x 3.2) |
| window_frame | a | 2076 (mounts back, exact 9.5 x 5 x 0.6, no glass) |

## Things the game should know
- Pan and saucepan handles point along +X. Spoon and mitt lie flat with their long axis on Z. The faucet spout reaches toward +Z.
- The range hood is 6.06 wide and 4.7 deep. Its chimney sits against the back wall.
- Metalness is 0.5, not the towers lib's 0.85. The game has no environment map, and at 0.85 steel rendered near-black (the faucet looked black in the first set render). Cast iron is its own dark material.
- Painted cream and white (cabinet, window, knob, hood band) are left unnamed, like dinner_plate.

## Found outside my files (not fixed, not mine)
- **game/assets/dinner_plate.js renders see-through in the look renderer.** Its lathe profile is wound so that the faces point inward, and with FrontSide you see the underside. This is visible in receipts/candidates/set_test_kitchenB.png. Reversing the profile array fixes it, which I applied in plate_stack and dish_rack. The fix for dinner_plate is the same one-line `.reverse()`.

## Weak / unverified
- Glass (drying_glass, pepper shaker) only reads as glass against a busy background. On flat colour the pepper reads dark grey, not black.
- The dish rack's plates are 0.74 x dinner-plate size so they fit under 2.4 m.
- Not checked in the real game camera or game lighting, only in look.mjs (sunny counter rig) and verify sheets.
