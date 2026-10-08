# Critic 3 verdict: "does it look like a made thing?"

Judged on pixels only, as on a phone. Only `pair_*.png` in podium, floor and concept were opened.

**Game under test (guess):** the olive tower-defense game (sandwich on a plate, olives marching along a winding path through kitchen props, SWAT / 2x HUD). It appears in every pair in all three folders.

## Podium (portrait, vs other podium games)

| Pair | Winner | Margin | What decided it (location) |
|---|---|---|---|
| 01 | A (olive TD) | clear | A: warm, consistent lighting and contact shadows across all props (whole frame), so it reads as one authored scene. B: hard faceted low-poly cliff (right third) against voxel statue (centre) against a flat grey grid floor (bottom half). Three art languages. |
| 02 | B (racer) | clear | B: strong art direction. Golden-hour palette, CRT curvature and scanline grade, and a bespoke segmented-LCD HUD (top and bottom) give it identity. A: evenly lit, generic casual look, and a ghosted half-opacity "Too quick!" string floating over the path (top centre). |
| 03 | A (olive TD) | clear | B: the camera is jammed into a wall, the character is pressed against it, and a big untextured box fills the bottom third. A: readable layout. The muddy brown floor flattens it, but it still reads as made. |
| 04 | B (olive TD) | decisive | A: dangling tree-trunk geometry, flat green planes clipping through the wall (right), and a huge empty pale void (left and bottom). It looks unfinished. B: a coherent stovetop with a wave banner. |
| 05 | B (racer) | clear | B: dusk grade with a pagoda lantern, pink foliage and a bilingual banner (centre), so the mood is authored. A: a grey marble floor under flat, shadowless-looking light. The dish-rack olives are illegible. |
| 06 | A (racer) | slight | A: purple-dusk palette and HUD identity. Its dust puffs are a ring of identical white blobs around the car (lower third) that look like a placeholder. B: the same flat marble. The olive enemies are specks with health bars (centre right). |
| 07 | B (olive TD) | slight | B: the gingham table is dense, the path is clearly authored with a stitched runner, and the props are rich. A: decent back-view hero, but the cliff faceting and voxel statue clash again. The gingham moirés on a phone. |
| 08 | A (olive TD) | clear | B: the wooden deck fills half the frame, a stray rope line cuts diagonally across it, and three stacked UI panels cover the top. A: a full, readable table scene. |

Olive TD record in Podium: **5 wins, 3 losses** (02 clear, 05 clear, 06 slight). All three losses are to the racer.

## Floor (portrait, vs a floor-tier TD)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | A (olive TD) | decisive | B is a programmer-art board: a flat red/white checker path, primitive cylinders for towers, a plain tiled wall and a blank brown HUD bar. A has lit, modelled props and a bespoke HUD. |
| 02 | B (olive TD) | decisive | Same reasons. A's enemies are black blobs and its toothpick/pepper/salt towers are grey cylinders. |
| 03 | A (olive TD) | decisive | Same reasons. |
| 04 | B (olive TD) | decisive | Same reasons. The gingham level has the richest set dressing. |

Olive TD record in Floor: **4 wins, 0 losses**. Every win is decisive.

## Concept (landscape, game vs its own concept renders; pairs are unlabelled, so "left" and "right" are used)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | right (concept) | decisive | Concept: low 3/4 camera, hero sandwiches at about 40% of frame height, olives with readable eyes, warm window key light with depth-of-field falloff. Game: top-down, every character tiny, flat even light. The bottom HUD is cropped off the frame edge. |
| 02 | left (concept) | decisive | Same scale and light gap. Game: the sandwich plate floats on a grey shadow blob (left), and the dark brown floor dominates. |
| 03 | left (concept) | decisive | Concept: steel sink, glints, glassware. Game: the marble reads as a texture on a plane. The olives in the dish rack are noise. |
| 04 | left (concept) | decisive | Concept: sunlit dining room with bokeh. Game: a translucent pitcher is clipped by the camera near plane (bottom left), and the gingham moirés. |
| 05 | right (concept) | decisive | Concept: moody bar with practical lamp light. Game: the olive horde is a clump of floating health bars (top centre), and a gold vase floats with no context. |

Olive TD record in Concept: **0 wins, 5 losses**. All five losses are decisive.

## Summary

### First change: lighting and grade

**Give every level one motivated key light with real falloff, plus a per-level colour grade and vignette.** Each level's lighting is currently uniform, bright and fill-heavy, which looks like engine defaults.

- Every loss in Podium and Concept is to a frame with an authored light mood: the racer's golden hour and dusk, or the concept's window light and bar lamps.
- The olive TD's props are already modelled well enough. What makes them read as "assets on a plane" rather than "a place" is the flat light.
- This alone plausibly flips Podium 06 and contests 02 and 05. It also narrows every Concept gap, though it will not flip those.

### Second change: camera and character scale

Lower the camera toward a 3/4 view and make the olives and towers about 2x bigger.

- On a phone the enemies are specks with health bars, so the game's actual characters are invisible.
- The concept frames win largely because the cast is the subject.

### Third change: path material

Replace the fuzzy crumb ribbon (wood and stove levels) and the pale-blue water smear (marble level) with an authored surface. The stitched runner in the gingham level is the model to copy.

- Today the path reads as a debug spline decal.

### Bugs and placeholders

- **Ghost text:** a half-opacity "Too quick!" string sits over the path. Podium 02 and Floor 01, top centre.
- **Landscape layout:** the bottom HUD bar is cropped off the frame edge, and the hero sandwich hovers tilted above its plate. Concept 01 to 05.
- **Shadow blob:** a grey blob sits under the plate. Concept 02.
- **Near-plane clipping:** a translucent pitcher is cut by the camera. Concept 04.
- **Stray metal discs:** discs flank the sandwich plate on the stove level. Podium 03 and 04, bottom.
- **Repeated tower slots:** identical cracker/pancake discs are repeated, which looks like a placeholder.
- **Moire:** the gingham pattern moirés at phone resolution.
