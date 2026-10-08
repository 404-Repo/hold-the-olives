# Textures

1024 x 1024 jpg, quality 85, tileable. Generated 2026-10-08 with `tools/atlas_img.py fast` (Gemini 3.1 Flash Lite Image, 1376 x 768),
then made seamless by `work/art_scratch/make_tex.py`. Every file was checked as a 2 x 2 mosaic (`work/art_scratch/mosaic/`).

**Seam method.** I did not use the mirrored half-offset blend from the brief. It ghosts strong patterns, and I could see that on the first floor and linen attempts. Instead I used a wrap cross-fade: take a source window of S + b px, then blend the first b px with the b px just past S, so the right edge runs into the left and the bottom into the top. For grids (tiles, gingham, end grain) the window is a whole number of pattern periods, cropped on detected edges, so both blended strips are the same pattern phase and nothing ghosts.

| file | use | made with | seam fix |
|---|---|---|---|
| butcher_block.jpg | counter tops (stage 1, boss) | `tex-butcher_block` | organic: centre square + 96 px wrap cross-fade |
| cutting_board.jpg | the big board on stage 1 | `tex-cutting_board` | periodic: crop on detected square edges, 8 x 8 squares (x 410..962, y 61..579), 20 px phase-aligned wrap fade |
| sage_tile.jpg | backsplash, 4 x 4 tiles per repeat | `tex-sage_tile-retry` | periodic: crop grout-centre to grout-centre, 4 columns x 2 rows, 60 px fade, stacked twice vertically to 4 x 4 tiles, squared to 1024 |
| marble.jpg | sink counter (stage 3) | `tex-marble` | organic: centre square + 96 px wrap cross-fade |
| stove_enamel.jpg | stovetop (stage 2) | `tex-stove_enamel-retry3` | organic: centre square + 96 px wrap cross-fade |
| table_linen.jpg | Sunday Lunch tablecloth (stage 4) | `tex-table_linen-retry` | periodic: autocorrelation period 156 x 143 px, 4 x 4 periods, 96 px phase-aligned fade |
| walnut.jpg | bar cart, knife block, table (stage 5) | `tex-walnut` | organic: centre square + 96 px wrap cross-fade |
| tile_floor.jpg | kitchen floor | `tex-tile_floor` | periodic: crop on detected tile edges, 10 x 10 tiles (x 1..685, y 58..703), 10 px phase-aligned fade |

## Prompts (verbatim, from atlas_calls.jsonl)

- **butcher_block** (`tex-butcher_block`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: a butcher block kitchen countertop made of long glued strips of warm honey oak and maple wood, parallel strips running horizontally, gentle grain, satin oiled finish, warm golden tan colour
- **cutting_board** (`tex-cutting_board`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: a light maple end-grain cutting board, small square end-grain blocks in a checker of pale cream and light honey tones with fine growth rings, clean and bright
- **sage_tile** (`tex-sage_tile-retry`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: a flat wall of large square glossy ceramic tiles, all the same soft sage green colour (hex 86b8a8) with only very slight glaze variation, uniform even brightness on every tile, thin straight cream grout lines forming a perfectly regular square grid, about four tiles tall in the frame, viewed straight on
- **marble** (`tex-marble`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: a white Carrara marble kitchen countertop, bright white with soft grey veins, polished
- **stove_enamel** (`tex-stove_enamel-retry3`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: smooth glossy cream porcelain enamel, warm off-white, very fine subtle speckle, uniform and even everywhere
- **table_linen** (`tex-table_linen-retry`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: a perfectly regular blue and white gingham tablecloth, crisp square checks of cornflower blue, light blue and white in an exact even grid, about twelve checks across the frame, soft cotton weave texture, perfectly flat, no folds, no wrinkles
- **walnut** (`tex-walnut`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: dark walnut wood planks with rich chocolate brown grain, satin finish, planks running horizontally
- **tile_floor** (`tex-tile_floor`): Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours: a kitchen floor of terracotta and cream square tiles in a checkerboard pattern, warm red-orange terracotta and cream tiles, thin grout lines, slightly worn matte surface

## Notes
- sage_tile: the first take had 6 x 3 tiles with uneven shading, so I regenerated it once. Its tiles were slightly wider than tall (232 x 195 px) and become square when the crop is resized to 1024. Two of its four rows repeat, which is hard to see at this tile uniformity.
- stove_enamel: the first take had a dark vertical band. Two retries returned HTTP 500 and the third worked. A very faint horizontal brightness drift remains.
- table_linen: the first take had a glitch row and an irregular weave, so I regenerated it. The new take is a regular blue gingham with two blues.
- cutting_board: the source rows are irregular, and some rows have little light/dark contrast. That reads as end grain. The crop avoids one sliver row.
- butcher_block reads more like staggered floorboards than continuous glued strips. It is usable, but a regenerate could fix it if it bothers anyone.
- These are colour (albedo) maps only, with no normal or roughness maps.
