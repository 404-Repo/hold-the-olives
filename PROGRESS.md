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
