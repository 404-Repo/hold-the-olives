# Kitchen C props (Sunday Lunch + Cocktail Hour), asset agent, 2026-10-08

19 finals are in game/assets/, each with a .expect.json. `./finalize.sh` builds them (`node build.mjs --final <asset> <x>`, src/lib.js inlined; lib = kitchenB lib + kitchenC helpers).
Gate: finals_check/verify.txt, 19/19 clean. Picks and reasons: receipts/candidates/PICKS_kitchenC.md; per-asset receipts (3 candidates, reference, sheet, why) in receipts/candidates/<asset>/.
References: 6 Atlas fast sheets (ref/sheetA-F.png), 276 credits max hold of 350. Cocktail napkin had no sheet of its own (sheet D linen napkin used). 57 candidates.

| final | pick | tris |
|---|---|---|
| wine_glass | a | 1568 |
| water_jug | a | 2848 |
| candle_holder | a | 2196 |
| bread_basket | b | 5004 |
| fork | b | 1440 |
| table_knife | a | 664 |
| salad_bowl | a | 3820 |
| napkin_folded | b | 1560 |
| roast_chicken | c | 5176 |
| flower_vase | a | 4918 |
| dining_chair | c | 3464 |
| table_lamp | c | 1724 |
| cocktail_shaker | a | 1560 |
| ice_bucket | b | 2180 |
| liquor_bottle | a | 1984 |
| coupe_glass | a | 2144 |
| olive_bowl | c | 2524 |
| cocktail_napkin | c | 1372 |
| bar_shelf | c | 10012 (mounts back, exact 12 x 16 x 3) |

## Things the game should know
- Metalness is 0.55 everywhere (brass, steel), under the 0.6 cap.
- Lathe winding: tested numerically (three r184): profile counter-clockwise in (r, y) faces out. `vessel()` in src/lib.js builds every glass, bowl and bucket as one closed profile wound that way, so none is see-through.
- Glass is FrontSide, opacity 0.35 to 0.42, roughness 0.05, always with a fill. The bottle liquid is OPAQUE: a transparent fill under transparent glass read beige. The water stays transparent.
- Emissive: candle flame (two lathes), lamp bulb sphere, lamp shade has a faint warm emissive (0.35). The bar shelf's mirrored back has a very faint warm emissive (0.08).
- Fork and knife lie flat with the long axis on Z, tines/blade toward -Z. The water jug's spout points +X, handle -X.
- The roast chicken platter is 5.2 x 7.4 m (long axis Z). The dining chair seat cushion top sits at about 48% of height (the wooden seat at 45%).
- The bar shelf is one module of 91 meshes (bottles, glasses). It merges by material on load.

## Weak / unverified
- liquor_bottle: the amber reads brownish-pink rather than whisky gold under the glass, even after making the fill opaque and taking the glass to 0.35. It is the weakest final.
- Steel renders mid-grey in the verifier and look rig (no env map there). It is not checked under the game's environment map or lights, only in look.mjs (looks/set.png, sunny rig) and the verify sheets.
- The bread basket's napkin corners are flat curved flaps. They read at a distance, but up close they look stiff.
- table_knife_c was built wrong (blade extruded back into the handle). It was rejected, not fixed.
