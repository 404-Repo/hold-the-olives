# Critic 4 verdict: "does it look like a made thing?"

Judged on pixels only, as a phone-screen AAA art director. Margins: slight / clear / decisive.

**Constant game under test (guess, high confidence):** the top-down kitchen tower defense (sandwich on a plate at the path end, olives as enemies, SWAT button, coin / sandwich / WAVE / score HUD). It appears in every pair of every folder.

## Podium (portrait)

| Pair | Winner | Margin | What decided it (location) |
|---|---|---|---|
| 01 | B (kitchen TD) | clear | A: three opaque teal UI panels cover the top third and a stray dark diagonal line (rope?) cuts the whole frame top right to bottom left. B: warm lit, cohesive wood floor, props grounded with shadows. |
| 02 | A (kitchen TD) | clear | B: floor in the bottom half is flat grey with visible grid seams (placeholder ground); cliffs are faceted untextured low-poly. A: complete lit tabletop, props everywhere. |
| 03 | A (racer) | clear | A: one committed style (pixel CRT, dusk palette, LED HUD baked into the frame), big hero car mid-bottom. B: stove level is dim and brown, enemies are 10 px specks along the path, no focal subject except the plate. |
| 04 | B (kitchen TD) | slight | A: good hero character and gate, but grey grid floor again (bottom half). B: wave banner and HUD look shipped, but the stove level is still murky. |
| 05 | A (racer) | decisive | A: golden-hour sky, layered tree lines, readable car, stylised road. B: marble level is washed grey-green, olives tiny, path is a faint smear; reads as a board, not a world. |
| 06 | B (kitchen TD) | decisive | A: half the frame is an empty pale void; an untextured flat green shape and broken trunk geometry right side; character small mid-left. |
| 07 | B (kitchen TD) | clear | A: closer, nicer character, but flat grey walls and a blocky crate fill the bottom. B: gingham table, candle, bread basket: dressed set. |
| 08 | B (racer) | clear | B: torii, stone lantern, sakura and the "course out" banner sell a place. A: gingham at this density is visual noise; towers and olives get lost in it. |

Constant game: **won 5 (01, 02, 04, 06, 07), lost 3 (03 clear, 05 decisive, 08 clear).** All three losses are to the same racer.

## Floor (portrait)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | A (kitchen TD) | decisive | B: flat red-white checker tiles as path, primitive cylinders for towers, flat discs for slots, bare tile wall. Prototype art. |
| 02 | A (kitchen TD) | decisive | Same reference; A has lighting, wave card, dressed props. |
| 03 | A (kitchen TD) | decisive | Same; B also shows a greyed-out tower bar. |
| 04 | B (kitchen TD) | decisive | A: same primitive reference. |

Constant game: **won 4, lost 0.**

## Concept (landscape; reference = rendered concept art of the same game)

| Pair | Winner | Margin | What decided it |
|---|---|---|---|
| 01 | B (concept) | decisive | Concept: low camera, big stacked club sandwiches with toothpick flags, olives with eyes as a readable conga line. Game (A): high camera, olives are specks, path is a fuzzy white flat decal. |
| 02 | A (concept) | decisive | Concept: chunky stacked-sandwich crossbow towers, olive train on a drawn line. Game (B): dim stove, towers small and dark, enemies invisible. |
| 03 | A (concept) | decisive | Concept: sink, dish rack, olive conga crossing a rack bridge. Game (B): flat marble, blue path smear, two towers, one visible olive. |
| 04 | A (concept) | decisive | Concept: soft window light, depth of field, eye-level. Game (B): flat orange overexposed tint, gingham noise, enemies under 10 px. |
| 05 | B (concept) | decisive | Concept: moody bar, lamp glow, characters fill the frame. Game (A): towers rendered flat salmon pink (lighting lost), enemies clumped in a yellow blob top centre. |

Constant game: **won 0, lost 5, all decisive.**

## The fix list for the constant game

**1. Camera and cast scale (change first).** The camera sits so high and far that the cast (olives, towers) is 8 to 15 px tall on a phone. The only readable object is the goal sandwich plate, which is the same leaning wedge in every level. Every loss is to a frame with a large, readable hero subject (the racer car, the concept's stacked sandwiches and eyed olives). Drop the camera to a 35 to 45 degree three-quarter view, tighten the frame on the active path, and scale olives and towers 2 to 3x so faces, eyes and crossbows read. This flips the concept pairs from "board game" toward "the concept", and is the most plausible lever on the racer pairs (03, 05, 08), because the TD then has a subject.

**2. The path.** A soft flat decal (fuzzy white flour, orange smear, blue water smear) reads as a placeholder overlay rather than an object. Make it a physical thing in the world: a skewer line, a sauce trail with thickness and specular, a cloth runner, all with a contact shadow. The concept does this with a drawn line plus a crowd of characters.

**3. Per-level lighting and grade.** The wood level works. The stove (podium 03/04, concept 02) is murky, marble (podium 05, concept 03) is washed grey-green, gingham (concept 04) is blown orange, and the bar (concept 05) flattens towers to unlit pink. Give each level a key light, a warm or cool rim, and one shadow direction, and stop the bloom crushing midtones.

## Bugs and placeholders seen

- **Landscape HUD cropped:** the bottom bar ("WAVE 2 / n olives") and the action buttons are cut off at the bottom edge in all five concept frames; the button icons render without their labels.
- **Bar level (concept 05):** towers render flat salmon pink with no shading, which looks like a stuck placement/selection tint or missing material.
- **Goal sandwich is identical across all levels** and leans at the same angle; with its plate it is the largest object in every frame, so the reuse is obvious.
- **Health bars wider than the olives** (podium 05/06, stove): the UI reads before the enemy does.
- **Gingham level:** a glass pitcher top left renders as a near-invisible ghost; clipped plates at the right edge.
- **Marble level:** the dish-rack tower overlaps the path start; podium 06 shows a tower stacked directly on the goal sandwich.
