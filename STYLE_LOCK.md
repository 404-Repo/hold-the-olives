# HOLD THE OLIVES: the locked style

> Appetising stylised kitchen things built as chunky, slightly exaggerated toy-like forms with soft
> rounded edges and generous bevels, in saturated true food and kitchen colours with gentle roughness
> (glossy where food is wet, satin ceramic, brushed steel), lit like a sunny kitchen; olives are
> characters with big simple eyes; no text, glyphs, labels or logos anywhere.

Hand this file, unchanged, to every agent that generates anything.

## World scale: 10x

**One world metre is 10 cm of real kitchen.** Model every object at 10x its real size, in metres, so
an olive (3.5 cm real) is 0.35 m. The verifier's plausible range is 5 cm to 300 m, which this keeps
everything inside. Do not model at real size.

## Palette: food

| role | hex | where it belongs |
|---|---|---|
| green olive | `0x8aa52e` | green olives' bodies; roughness 0.25 (glossy, wet) |
| castelvetrano | `0xa6c93a` | the brute: brighter, yellower green |
| kalamata | `0x5a2a4e` | kalamata bodies, purple-black, roughness 0.25 |
| black olive | `0x221c22` | olive rings, the martini knight's olive is green |
| pimento | `0xe03a2a` | pimento stuffing, the pimento runner |
| oil gold | `0xd9b23a` | olive oil, the greaser's drip, the oil bottle's contents (transparent 0.7) |
| bread crumb | `0xf3ddb0` | the soft inside of bread slices |
| bread crust | `0xc88a3e` | crusts, toast edges |
| toast | `0xdca55a` | toasted faces |
| lettuce | `0x6cc23a` | lettuce leaves (ruffled edge), herbs |
| tomato | `0xe2432f` | tomato slices (seed pockets `0xf6a23c`) |
| cheese | `0xf7c534` | cheese slices, holes optional |
| bacon | `0xb4432c` | bacon lean, fat stripes `0xf2cfa8` |
| turkey | `0xedcaa6` | turkey slices |
| pickle | `0x7c9c2c` | pickles, darker skin `0x4f6b1e` |
| mustard | `0xf2b705` | mustard, the squeezer bottle body |
| eye white / pupil | `0xffffff` / `0x161616` | every olive's eyes: two spheres, a pupil each, a white glint |

## Palette: kitchen

| role | hex | where it belongs |
|---|---|---|
| butcher block | `0xc99a64` | counter tops, cutting boards, wooden spoons (`timber`) |
| dark walnut | `0x6b4a32` | knife block, table, bar cart wood (`timber`) |
| sage tile | `0x86b8a8` | backsplash tiles, one accent colour across the house (`tile`) |
| cream enamel | `0xf2ead8` | cabinets, the bread bin, plates, mugs (`plaster` for walls) |
| tomato red enamel | `0xd5473a` | the kettle, the toaster, a stand mixer: the house's accent appliance colour |
| copper | `0xc8773e` | pans, the pepper mill's fittings (`metal`) |
| steel | `0xbcc3c9` | sink, taps, knives, cutlery, grater (`metal`) |
| glass | `0xd8eef0` | glasses, jars, the martini; transparent 0.35 to 0.5, roughness 0.05 |
| linen | `0xe9e2d0` | tea towels, napkins (stripes `0x3f6fae`) (`fabric`) |
| toothpick | `0xe8cfa0` | toothpicks and cocktail picks; frills `0xe23a3a`, `0x3a7fe2`, `0xf2c12e` |
| basil | `0x3f8a3a` | herb pots' leaves (`foliage`) |
| terracotta | `0xc0603a` | herb pots |

## Fixed decisions

- Metres at 10x. Olive 0.35 m tall; kalamata 0.30; olive ring 0.32 across; castelvetrano 0.55;
  pimento runner 0.18; martini knight 0.35 olive on a 0.9 m pick. Boss jar 2.4 m; oil bottle 3.2 m;
  martini glass 3.6 m.
- Bread slice 1.1 x 1.1 m, 0.16 m thick. Lettuce layer 0.08, tomato 0.08, cheese 0.04, bacon 0.06
  thick, each about 1.0 m across. Tower weapon heads 0.6 to 1.0 m tall. Build pad (a coaster or saucer)
  1.3 m across, 0.08 m tall. The club sandwich (the thing you defend) 3.0 m tall on a 3.6 m plate.
- Kitchen: toaster 2.0 m tall; kettle 2.4; knife block 2.6; bread bin 2.2; mug 1.0; jar 1.4;
  wine glass 2.2; dinner plate 2.7 across; upper cabinets start 5.0 m above the counter;
  backsplash tile 0.75 m square; burner grate 2.4 m across; sink basin 5 x 4 m.
- Base at y = 0, centred on x and z, front faces +Z. Olive characters face +Z with their eyes.
- Flat colours with sensible roughness; surfaces are applied at load time. Name materials with the
  contract's list: `plaster`, `stone`, `timber`, `tile`, `metal`, `fabric`, `foliage`, `ground`.
  Food and glass stay unnamed.
- Silhouette first: the game is seen from 6 to 18 m away, from above at 35 to 70 degrees, on a phone.
  Big simple shapes, chunky rims, thick bevels, eyes large enough to read. Tiny detail does not read.
- Budget: olives under 2k triangles (there are many), bosses under 10k, tower parts under 3k,
  kitchen props under 6k, big appliances under 12k. Low segment counts; no decimation.
- No text, glyphs, labels or logos anywhere, including on jars and bottles: carry them as colour bands.
