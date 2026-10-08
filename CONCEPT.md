# HOLD THE OLIVES

A phone-first 3D tower defense set on the counters and tables of one real house. Ben's premise: "a
club sandwich tower defense, and olives are the enemies" (from the Google Labs Playground launch
trailer, 2026-10-07, where it is a 2.5D illustration on a kitchen counter). Ours is a real 3D world.

## The pitch in three lines

- The olives have escaped the jar and they are coming for lunch: one tall club sandwich on a plate at
  the end of every counter. Every olive that reaches it takes a bite, and you watch the sandwich lose
  its layers.
- Your towers are sandwiches too. You put down a slice of bread, choose its weapon (toothpick
  ballista, pickle cannon, mustard squeezer, pepper mill, cheese grater, toaster), and **every upgrade
  is a layer you choose and stack**: lettuce for reach, tomato for punch, cheese for speed, bacon for
  burn. A tower crowned with three different layers becomes a CLUB and gets a bonus. The sandwich you
  build is your build, and you can read it from across the room.
- Five stages across the house, morning to midnight, each with its own kitchen gadget you can fire
  with a tap, and an endless Midnight Snack mode with a best score.

## What nobody else in jam 001 tried (checked against all 25 entry files)

No entry is a tower defense, and none makes the upgrade tree a physical object you build up. The
stack is the find: height, colour and layer order are the tower's stats, visible at phone size.

## Why it should be sticky (MOONPULL lost on "over in 6 minutes, nothing to come back for")

- **Small wins every few seconds**: olives pop with a squelch and crumbs fly to the counter; the
  crumbs are your money and you spend them the moment they land.
- **A decision every 10 to 20 seconds**: which pad, which weapon, which layer, call the next wave early
  for a bonus or not, when to fire the gadget.
- **Escalation**: 8 to 12 waves per stage, new olive types announced with a card, a boss at the end of
  stages 2, 4 and 5.
- **Score, stars and a reason to replay**: 1 to 3 stars per stage from bites left, a score with an
  early-call and no-bite bonus, a best score per stage on the device, stars unlock weapons and layers,
  the endless mode keeps escalating until the sandwich is gone.

## Why it should look good from frame one (BLOOMFIRE lost on grey early frames)

Every stage is fully coloured from the first frame: sunlit morning wood and sage tile, saturated
food colours, olives as glossy characters with big eyes. No grey state, no fog of war.

## Scale and camera

World scale is 10x: one world metre is 10 cm of kitchen. An olive is 0.35 m, a slice of bread 1.1 m, a
toaster 2 m, the upper cabinets start 5 m above the counter. The field is a 10 x 16 m strip of
counter seen along its long axis (portrait-friendly), with the backsplash, window, cabinets and big
appliances towering around it. The camera is a perspective tilt-zoom over the counter: one finger
pans, pinch zooms, two fingers tilt between a near-overhead plan view and a low counter-top view.
The default framing shows the whole field. Immersion comes from scale, light and moments: each
stage opens on a human-eye shot of the room and dives to the counter; a boss gets an entrance shot.

## Stages (one house, a day)

| # | stage | time | the field | gadget (tap) | new olives | boss |
|---|---|---|---|---|---|---|
| 1 | The Cutting Board | morning | the counter by the window, a big board, bread bin, kettle | the Spatula swat | green, kalamata | none |
| 2 | The Stovetop | late morning | between four burners, pans, a kettle | light a burner: a fire ring roasts what is on it | stuffed (splits), ring | THE JAR |
| 3 | The Sink | noon | the drainboard, a dish rack bridge, the sink | open the tap: a wash sweeps a lane back | martini knight (armoured) | none |
| 4 | Sunday Lunch | afternoon | the dining table: plates, cutlery, a bread basket | the pepper storm | castelvetrano brute, greaser | THE OIL BOTTLE |
| 5 | Cocktail Hour | evening | the bar cart and side table, warm lamps | the ice bucket avalanche | everything | THE MARTINI |
| E | Midnight Snack | night | the counter by fridge light | all | all, forever | every 10 waves |

## Olives (personality is the point)

| olive | job | personality |
|---|---|---|
| Green olive | the basic | waddles, determined frown |
| Kalamata | fast, in packs | purple, sly grin |
| Stuffed olive | splits: the pimento runs on | surprised; the pimento is a tiny red runt |
| Olive ring | a sliced black olive that rolls like a wheel, fast, hard to hit | dizzy |
| Martini knight | armoured, a cocktail pick as a lance; toothpicks bounce off | pompous |
| Castelvetrano | big bright green brute, slow, lots of HP | grumpy |
| Greaser | leaves an oil slick that speeds olives behind it | smug |
| Bosses | THE JAR (unscrews, spits olives), THE OIL BOTTLE (slicks the path), THE MARTINI (sloshes, flings its olive) | |

## Towers (weapon on a slice of bread, then up to three layers)

| weapon | does | unlock |
|---|---|---|
| Toothpick ballista | fast single shots | start |
| Pickle cannon | lobbed pickle slices, splash | start |
| Mustard squeezer | sticky slow in a cone | stage 2 |
| Pepper mill | a sneeze cloud, damage over time in an area | stage 3 |
| Cheese grater | shreds armour off what it hits | stage 4 |
| Toaster | pops toast high, huge splash, slow | stage 5 |

Layers: lettuce +range, tomato +damage, cheese +fire rate, bacon adds burn. Three different layers =
CLUB (+25% to everything, a frilled toothpick flag). Sell for 70%.

## Scope fallback

If time runs short: stage 3 folds into 2 (no sink), the oil bottle boss goes, and the grater and
toaster become stage 4 and 5 unlocks of what exists. The endless mode stays: it is the replay.
