# Critic 1 verdict: "does it look like a made thing?"

Judged on pixels only, at phone size, as a jaded AAA art director. I did not open any key or the other folders on disk.

## Podium (portrait, 8 pairs)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | A | clear | A: warm oak floor with real grain, a cutting board inset, toaster, fruit bowl, paper towel, coffee cup and tea towel all grounded with contact shadows; reads as a dressed set. B: camera sits inside the geometry, a huge untextured stone wall slab fills the centre, flat grey-green void bottom right, character half hidden behind a rail. |
| 02 | A | slight | A: a readable hero character (red coat, bottom centre), wood deck vs cobble material break, lantern, a real value range from dark deck to pale stone. Hurt by a rope cutting diagonally through the frame. B: pale cream counter fills about 60% of the frame with almost no value change; ghost "WAVE 2 / Stuffed olives pop..." text at ~30% opacity sits over the towers mid board and reads as a render bug. |
| 03 | A | slight | A: close character, chunky low-poly stone and a crate, but it has a lit side and a shadow side and a clear focal point. B: near-white marble, dish rack top left is the only dense object, a dozen identical cookie pads, olives tiny; ghost text again overlaps the dish rack and towers. Bleached. |
| 04 | A | decisive | A: a confident art direction (golden-hour sky, dithered pixel filter, CRT bezel, period dashboard HUD) where every element agrees. B: the blue gingham cloth is high-frequency noise across the whole frame, the cream path has almost no contrast against it, olives at y~450 are barely legible. |
| 05 | A | slight | A: dark walnut floor, deepest values of any sandwich frame, warm highlights on the brass at the edges, dense enemy column at mid frame with health bars. Ghost text still overlaps. B: decent desert character, but voxel statue, flat grey floor tiles and a blank grey lower third. |
| 06 | B | slight | B: character mid-stride in the lower half, sky, cliff and gate give depth and scale. A: cream counter again; wave 8 has more towers but they are thumbnail sized; the large flat cream areas at lower left and lower right carry nothing. |
| 07 | B | clear | B: dusk sky gradient, stone lantern silhouette, cherry trees, red pillar framing the right edge; a mood. A: same cream board; the boss jar at centre is the only new read and is small. |
| 08 | A | clear | A: night purple sky, headlight bloom, smoke puffs around the car, controlled palette. B: near-white marble with a dish rack; the only colour is the green splat and tokens. |

## Floor (portrait, 6 pairs)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | A | decisive | A: dressed oak kitchen, props, grain, shadows, styled HUD. B: grey primitives on a flat white slab, red-white checker path drawn as a texture, placeholder HUD text, brown void around the table. |
| 02 | A | decisive | A: pans, stove grates, oven mitt, consistent toy material. B: same programmer-art slab; "WAVE 3" in default bold over the board. |
| 03 | A | decisive | A: dish rack, plates, sponge, coffee; despite bleaching it is authored. B: identical placeholder board. |
| 04 | B | decisive | B: gingham is too busy but it is a dressed scene with a candlestick, bread basket, glasses. A: placeholder slab. |
| 05 | B | decisive | B: dark walnut board, brass, dense enemy column. A: placeholder slab. |
| 06 | B | decisive | B: cream board with full tower set. A: placeholder slab, purple sprite noise at the enemy head. |

## Concept (landscape, 6 pairs)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | B | decisive | B: low three-quarter camera, sandwich towers are tall layered stacks taking 30% of frame height, olive conga line with big eyes, window key light with warm falloff and depth of field. A: top-down, towers are flat toast squares, olives are specks, flat even light. |
| 02 | A | decisive | A: copper pan, kettle, stove grates in big scale, specular on copper, olives as characters. B: pale cream board, objects small, ghost text top centre. |
| 03 | A | decisive | A: steel sink, wire rack, jars, a soft window light. B: near-white marble, the only bold read is the overlaid "Martini Knights" banner. |
| 04 | A | decisive | A: blue gingham works there because it is shot at grazing angle with soft light and depth of field, so the check recedes. B: same check viewed straight down at full contrast; it fights the path. |
| 05 | B | decisive | B: moody bar, lamp practicals, warm vs teal contrast, chrome. A: dark wood board is the closest match of all, but still flat lighting and a top-down camera. |
| 06 | A | decisive | A: hero villain (angry olive jar), crossbow toast towers, hero sandwich in foreground. B: oak board is good but small objects, a tutorial line across the lower third. |

## Summary

**Constant game, my guess (fairly confident):** the sandwich/olive tower defence with rounded HUD pills and yellow SWAT button. Podium: A in 01, 05, 06, 07; B in 02, 03, 04, 08. Floor: A in 01 to 03, B in 04 to 06 (the crude checker board is the floor reference). Concept: the in-game side is A in 01, 05; B in 02, 03, 04, 06.

**Counts for the constant game:**
- Podium: won 2 of 8 (01 oak, 05 walnut), lost 6.
- Floor: won 6 of 6.
- Concept: won 0 of 6.

**Change first: the board's value and lighting, so the ground is a mid-dark, warm, textured surface lit by one directional key with real shadow.** All six podium losses are cream, marble or gingham boards. Both wins are the oak and the walnut boards. Bleached counters put the median near white, flatten every object against the ground and make tiny towers vanish on a phone. Retheming the four bright boards to darker wood or stone with a raking key light would plausibly flip 3 to 4 of the 6 losses, as 02, 03, 06 were slight.

**Next two:**
2. **Camera and object scale.** Lower the pitch from near top-down to around 50 to 60 degrees and make towers 2 to 3x taller (layered stacks, as in the concept). That is the entire gap in the concept folder and makes olives readable as characters.
3. **Kill the ghost wave-intro text overlay.** The semi-transparent "WAVE 2 / Martini Knights..." text over the playfield is in almost every frame and reads as a bug. Put it in a solid banner or fade it before play starts. Also thin out the 12 to 18 identical cookie-pad build slots, which are the densest repeating element and add noise, not design.

## Measurement critique

- **Saturated share >= 0.30:** rewards the wrong thing. The gingham frames (podium 04, concept 04) pass easily on blue check noise while looking worse. The HUD (yellow buttons, maroon panel) also adds saturation that is not the scene. Keep only with the HUD masked out and the board excluded from the count, or replace with a check for saturation on the objects of interest.
- **Flat share <= 0.40:** half right. It correctly punishes cream and marble. But high-frequency texture (gingham, checker) beats it without being detail. The floor reference's checker path would help it pass. Change it to a structure measure at object scale, not pixel scale.
- **Warm food hue share >= 0.13:** reject as a "made thing" test. The oak board passes it from wood, not food; the walnut and bar frames pass it for the same reason. It measures palette match to the concept, not craft. Fine as a style check only.
- **Luma p98 minus p2 >= 178:** easy to cheat. A bleached cream board with black stove grates and a white plate passes it (black grates at p2, cream at p98) while looking washed out. It measures the extreme tails. Use p90 minus p10, or the share of pixels in the midtone band, which is what is actually missing.
- **Median luma <= 155:** the most useful of the five; it lines up with my wins and losses on podium better than anything else. Risk: it punishes a deliberately bright level (snow, beach). Keep it, paired with a local-contrast check.
- **What is missing:** nothing measures object scale in frame, character readability, overlapping text, or camera angle, which decided the concept folder 6 to 0. Mask the HUD out of every metric.
