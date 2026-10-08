# HOLD THE OLIVES progress

Lead: Claude (Opus 5.5) as a jam entrant, running GAME.md's prompt from ~/404-game-recipe @ 4effad3 VERBATIM as
operating instructions ("I want you to build a club sandwich tower defense, and olives are the enemies, at the level
of the most recent AAA games in its genre ... Fan out sub-agents ... /loop ... harsh critic ... compare them side by
side blind ... Do this in ThreeJS."), with the jam rules (/tmp/jamrepo_chk/README.md). Repo: ~/astrocade-game6.
Serve: :8798 (`python3 -m http.server 8798` in `game/`), cloudflared quick tunnel URL in `work/tunnel.log`.
Images and audio: Atlas via tools/atlas_img.py and tools/atlas_audio.py, every call in atlas_calls.jsonl, cap 5,000 credits.

## Milestone 1: concept and scope (2026-10-08)

**HOLD THE OLIVES**, a phone-first 3D tower defense across one house. Olives escaped the jar and march on lunch:
a tall club sandwich on a plate at the end of every counter, which loses a layer you can see for every few bites.
Towers are sandwiches: a weapon on a slice of bread (toothpick ballista, pickle cannon, mustard squeezer, pepper
mill, cheese grater, toaster), and every upgrade is a layer you choose and stack (lettuce range, tomato damage,
cheese rate, bacon burn); three different layers make a CLUB with a bonus. Full pitch: `CONCEPT.md`. Style lock:
`STYLE_LOCK.md` (10x world scale: one world metre is 10 cm of kitchen).

Why this shape (reasons, not taste):
- **Stickiness, MOONPULL's loss** ("over in about 6 minutes, nothing to come back for"): a kill every second or
  two, a spend decision every 10 to 20 s, 8 to 12 escalating waves per stage, five stages, stars, score, a best
  score per stage, unlocks from stars, and an endless Midnight Snack mode with a best wave and score.
- **Look from frame one, BLOOMFIRE's loss** (grey early frames): no grey state. Every stage is fully coloured
  food and kitchen in daylight or lamplight from the first frame.
- **Ben's notes**: expansive (five authored stages across the kitchen, sink, dining table and bar cart, the
  counter's edge dropping to a floor 9 m below), scale (a toaster is 2 m, cabinets start 5 m up), a whole-field
  tilt-zoom camera (TIMBER's lesson: planning needs the overview), phone-first touch (tap pads, pinch, drag).
- **What nobody else tried** (20 of 100): no jam 001 entry is a tower defense; the tower's upgrade tree is a
  physical stack you can read from across the room.

Scope: 5 stages (Cutting Board, Stovetop, Sink, Sunday Lunch, Cocktail Hour) + endless; 7 olive types + 3 bosses
(the Jar, the Oil Bottle, the Martini); 6 weapons x 4 layers; 2 tap gadgets per stage (the spatula everywhere, a
stage gadget: burner, tap, pepper storm, ice). Fallback: fold the Sink into the Stovetop, drop the Oil Bottle.

Running in parallel (3 sub-agents, each told not to spawn its own): the floor (one agent, one pass, `floor/`);
art direction (6 concept frames, claims + tools/claims.py, the podium bar set, 8 tileable textures, music and SFX);
the olive and boss assets through the 404 loop. I am building the engine (`game/src/`).

## Milestone 2: a playable vertical slice (2026-10-08)

Serving at **:8798** (`game/`, static, always the working tree); tunnel URL in `work/tunnel.log`.
The whole loop works from a real tap: title, PLAY, an opening shot that drops from human eye height to the counter,
tap a glowing coaster, build a sandwich tower, START, olives waddle down the flour, crumbs, stack layers (a CLUB at
three different), call waves early for crumbs, gadgets, a boss with an entrance shot and an enrage at 40%, the end
card with stars, score, best and three orders, the house screen with all five stages and the endless Midnight Snack.

**Measured by my own driver** (`tools/bot.mjs`: real touch taps on coasters, menu items and buttons, at 3x game
speed; Metal GPU, 390x844 @2x; the bot never uses gadgets):

| stage | result | bites left | olives popped | towers / layers | peak draws |
|---|---|---|---|---|---|
| 1 Cutting Board (early calls on) | win, 3 stars | 20 of 20 | 166 | 6 / 7 | 269 |
| 2 Stovetop, real olives + THE JAR | win, 3 stars | 19 | 447 | 8 / 17 | 420 |
| 3 Sink (placeholder olives) | win, 2 stars | 13 | 339 | 8 / 18 | 296 |
| 5 Cocktail Hour (before tuning, early calls) | lost at wave 6 | 0 | 78 | 7 / 0 | 95 |

Bot results swing between runs (stage 2 went from 1 star to 3 across two runs with only small tuning between), so
these are a sanity check on difficulty, not a balance verdict.

**Jam gate on the engine** (local, before the real assets): PASS, ready 2.4 s, 4.2 MB, moved 3.4 m under a real
finger on `#look`, 58 draws. Not yet re-run with the full asset set.

**Assets through the 404 loop so far: 47 modules**, every one 3 candidates, the verify sheet, a pick by eye:
16 tower and sandwich parts (agent), 16 stove, sink and architecture props (agent), 15 olives, bosses and
projectiles. Loader regression (the ~/404_assetlib triangle-retention method, run on Metal, not swiftshader): 16 of
16 at 100% when run; to be re-run on the full set.

Decisions and fixes worth knowing:
- **Loader.** ~/404_assetlib/assetlib.js is the older manifest/GLB variant, without `bakeStatic` or `keepHierarchy`,
  and the game failed to load with it. I use the recipe's `harness/assetlib.js` (its descendant, same InstancedMesh and
  colour-attribute fixes; MOONPULL and BLOOMFIRE used it too) and ran the 404_assetlib regression against it.
- **Camera.** Portrait: a 56 degree lens over the long axis of the counter, fitted to the whole field (TIMBER's lesson).
  Landscape (and laptops): the camera turns 90 degrees to look across the counter at the backsplash and window, which
  is the concept frames' composition. Pinch zoom, two-finger tilt, one-finger pan, a nudge that keeps the tapped
  coaster above the build menu and puts the view back after.
- **Readability.** The authored field is compacted to 0.82 and olives drawn at 1.55x (jumbo) because the first build
  had 12 px olives; coasters are placed automatically (most path within reach, spaced a thumb apart, off the board's
  edges, clear of props) after hand placement overlapped.
- **Look.** No environment map made steel black (kitchen B agent's catch); added one, and Neutral tone mapping after
  ACES washed the frames out. Each stage's route has its own material: flour, amber oil, rinse water, a linen runner,
  sugar.
- **Sticky systems:** combo pops with bonus crumbs, olive quips ("For the jar!", "Extra virgin RAGE!"), next-wave
  preview on the button, three orders per stage, best scores, stars, unlocks.

Honest gaps:
- **Two asset agents hung.** The olive agent and the counter-kit agent stopped writing files for over an hour and did
  not answer a status message; I cannot stop them from here. I made the olive picks myself from that agent's verified
  candidates (receipts/candidates/PICKS_olives.md). The stage 1 counter kit (kettle, toaster, bread bin, the spilled
  jar where olives come from...) does not exist yet, so stage 1 is the barest stage right now.
- The dining and bar kit agent is running. Music takes are 13 to 41 s, chained with crossfades; nobody has listened.
- No critic round yet. That is next.
