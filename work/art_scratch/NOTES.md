# Art direction and reference agent: notes (2026-10-08)

## Credits
I made 36 Atlas calls: 8 std images, 13 fast images and 15 audio. At max hold that is **1,859 credits**
against my budget of 1,900. The two HTTP 500 failures (46 each) are counted in that figure, so the cost
is 1,767 if they were not billed. The shared log stood at 2,043 when I finished; the other 184 credits
are olives_sheet1..4, which belong to another agent.

## Made
- ref/concept/01_cutting_board, 02_stovetop, 03_sink, 04_sunday_lunch, 05_cocktail_hour, 06_boss_jar
  (.png, 2752x1536), title.png, and game/img/title.jpg (1600x893, q85).
- ref/bar/: 8 podium frames (Bellkeeper 3, Farseek 2, SUNDRIFT 3), 4 MOONPULL frames, SOURCES.md.
- ref/CLAIMS.md + tools/claims.py: 5 claims, all separating concept from floor on 92 to 100% of frames.
- game/tex/: 8 tileable 1024 jpgs + TEXTURES.md. Mosaic checks are in mosaic/.
- game/audio/: 7 music + 13 SFX mp3s + AUDIO.md.

## What failed or is weak
- Concept frame 01 (first take) had "The Cutting Board" engraved on the board, because the stage names
  in the prompts leaked in as text. I regenerated it with no stage name, so the stage name is out of the
  prompt. The retry has no text but shows **two** sandwiches and a lower camera. That was its one retry,
  so I kept it.
- All concept frames are 16:9 (the node only does 16:9). Their cameras sit lower (about 30 to 40 deg) than
  the 45 to 55 asked for, and frame 06 is lowest. Burger patties appear in some sandwiches. Frames 02
  to 06 had no visible text when I inspected them.
- **Music lengths are ignored by the node.** Takes came back at 13 to 15 s (stage B 41 s) against 60 to
  90 s asked. One retry each for stage A and boss came back short again; they ship as `_alt` takes.
- The spatula slap SFX came back as silence twice and was not shipped.
- stove_enamel: two HTTP 500s before a good take.
- I did not use the brief's mirrored-offset seam fix. A wrap cross-fade on whole pattern periods
  ghosted less; the reason is in TEXTURES.md.
- A first audio launch failed before making any calls (zsh did not word-split `$A`). It cost 0 credits.

## Unverified
- No audio was listened to; I measured duration and loudness only.
- Claims thresholds were set after seeing both sets. The floor is one run of six near-identical frames,
  and the concept frames are landscape centre strips (a shape mismatch). See the caveats in CLAIMS.md.
- I checked the textures as 2x2 mosaics by eye at reduced size and at one zoom; I have not seen them in
  engine.

No browser was launched.
