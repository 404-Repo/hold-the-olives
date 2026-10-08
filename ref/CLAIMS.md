# HOLD THE OLIVES: claims from the concept frames

Measured with `python3 tools/claims.py <png|dir>` (numpy + PIL + scipy). Each frame is centre-cropped to
390:844 portrait, resampled to 390x844, and measured inside the band y = 6% to 86% (full width) so the
top HUD strip and the bottom tower tray stay out. All figures below come from that 390x844 shape.

Sources measured on 2026-10-08:
- **concept**: `ref/concept/01..06*.png` (Atlas std renders, 2752x1536 landscape, centre strip cropped)
- **floor**: `floor/_frames/f1..f6.png` (780x1688 portrait phone captures of the one-pass floor build).
  `l1.png` and `l2.png` are landscape captures and were left out of the separation test.
- **bar** (for information only, not used to set thresholds): `ref/bar/*.png`

## The claims

| id | claim | threshold | concept | floor |
|---|---|---|---|---|
| C1 | Saturated colour carries the frame: share of pixels with S >= 0.35, V >= 0.25 | >= 0.30 | 0.22 to 0.85 (5/6 pass) | 0.13 (0/6) |
| C2 | No large flat empty surfaces: share of pixels in 7x7 patches with luma std < 2.0 | <= 0.40 | 0.11 to 0.31 (6/6) | 0.54 (0/6) |
| C3 | Food warmth: share of saturated warm food hues (hue 0 to 60 deg, S >= 0.45, V >= 0.35) | >= 0.13 | 0.15 to 0.67 (6/6) | 0.09 (0/6) |
| C4 | Full value range: luma p98 minus p2 | >= 178 | 184 to 219 (6/6) | 166 to 170 (0/6) |
| C5 | Not washed out: median luma | <= 155 | 74 to 147 (6/6) | 165 to 166 (0/6) |

Separation (frames on the expected side, concept plus floor, 12 frames): C1 92%, C2 to C5 100%.
All five clear the 70% rule.

### Gameable by
- **C1**: tinting everything (fog colour, a saturated counter material, a colour-grade pass) lifts the
  share without adding a single readable food object. Judge whether the saturation sits on the
  sandwiches, olives and appliances, not on the ground.
- **C2**: a noise or grain texture on the counter (or film grain in post) defeats the flat-patch test
  while the field stays empty. The intent is "the counter is loaded with things", not "the counter has
  texture".
- **C3**: an orange or red ground plane (the floor's own checkered path already scores 0.09 alone),
  or a warm grade, passes it with no food. Check it is lettuce/tomato/cheese/bread that is warm.
- **C4**: a few black pixels (a HUD edge, a hard shadow under one prop) and one blown highlight
  satisfy p2/p98. Check that the shadows sit under objects and the highlights sit on wet food and
  glossy enamel.
- **C5**: darkening the whole frame (lower exposure, heavy vignette) passes it and makes the game
  worse. The concept frames are mid-toned because they are full of coloured objects, not because they
  are dark.

## Dropped (they did not separate concept from floor)
- **Hue families** (number of 30-degree hue bins each holding >= 3% of saturated pixels): concept 2 to 3,
  floor 3. Food reads as one warm hue family plus green, so the count is low for the concept too.
- **Dark accents** (p5 luma <= 45): concept 22 to 49, floor 45. No separation.
- **Upper surround detail** (edge density in the top third): concept 0.18 to 0.34, floor 0.23. The
  floor's checkered path fills its top third with edges. No separation.
- **Distinct saturated objects** (connected saturated blobs per hue): concept 3 to 24, floor 85 to 90,
  because each checker square counts as a blob. Inverted, so dropped.
- **Large-scale light variation** (std of blurred luma): concept 22 to 44, floor 32. No separation.

## Caveats (read before trusting a number)
- **Thresholds were set after seeing both sets** (roughly at the midpoint of the gap). That is fitting,
  not prediction. Re-check them against the first real round.
- **One floor sample**: the six floor frames come from one run and are nearly identical (one camera,
  waves 2 to 5). The docs ask for two runs before believing a column.
- **Shape mismatch**: the concept frames are 16:9 landscape renders. The portrait centre strip covers
  far less world than the game's portrait camera does, and the concept camera is lower than the
  game's planned 35 to 70 degree tilt. The blind pairs judged by eye carry the verdict; these numbers
  only steer.
- **The floor is very weak** (pale flat counter, tiny props), so most statistics separate. This test
  says more about the floor than about the claims. A second control (an earlier round of our own
  build) is the better filter once it exists.
- **The podium bar fails several claims** (night and indoor frames from Bellkeeper and SUNDRIFT fail C1,
  C3 or C4). These are claims about *this* game's look, not universal quality, so do not tune them to
  the podium.
- Eye checks with no number: "olives read as characters (eyes visible) at phone size" and "the
  sandwich towers read as stacks of distinct layers". Both decide the concept frames and neither is
  counted here.
