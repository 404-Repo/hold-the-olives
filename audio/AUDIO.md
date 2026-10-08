# Audio

Generated 2026-10-08 with `tools/atlas_audio.py` (ElevenLabs SFX v2 + MiniMax Music 3 instrumental), converted
with ffmpeg. Music: stereo 128 kbps, loudnorm to about -18 LUFS. SFX: mono 96 kbps, lead silence trimmed,
peak-normalised to about -1.5 dBFS. **Nobody has listened to these.** I cannot hear; I only measured
duration and loudness with ffmpeg (volumedetect, ebur128). An ear check is still owed.

## Music

| file | dur (s) | for | notes |
|---|---|---|---|
| music_menu.mp3 | 13.4 | title / menu loop | asked for 60 s |
| music_stage_a.mp3 | 14.7 | stages 1 to 4, daytime, bouncy | asked for 90 s |
| music_stage_a_alt.mp3 | 12.6 | second take of stage A, alternate with it | asked for 90 s; starts near silent |
| music_stage_b.mp3 | 40.8 | stage 5 Cocktail Hour, evening lounge | asked for 90 s; loudest peak (-0.9 dBTP) |
| music_boss.mp3 | 14.3 | boss fights | asked for 60 s |
| music_boss_alt.mp3 | 15.2 | second boss take, alternate with it | asked for 60 s |
| music_victory.mp3 | 6.8 | stage clear sting (play once) | asked for 8 s |

**The music node ignores the requested length.** Every take came back at 13 to 15 s, except stage B at
41 s. A retry for stage A and boss that put "a full 90 second piece" in the prompt made no difference.
Most tracks fade to silence in the last 0.5 s (tail mean -54 to -57 dB), so they are not clean loops.
Stage A's tail (-42 dB) and stage B's tail (-37 dB) end less faded. The game should cross-fade 1 to 2 s
at the loop point, or alternate the A and alt takes, to avoid a gap every 15 s.

## SFX

| file | dur (s) | for |
|---|---|---|
| sfx_pop.mp3 | 0.52 | olive bursts (wet squelch pop) |
| sfx_chomp.mp3 | 0.80 | an olive bites the sandwich |
| sfx_wave_ding.mp3 | 1.20 | wave starts (kitchen timer ding) |
| sfx_jar_lid.mp3 | 1.48 | THE JAR boss unscrews and spits |
| sfx_collect.mp3 | 0.60 | crumbs (money) collected |
| sfx_thwip.mp3 | 0.48 | toothpick ballista shot |
| sfx_cannon.mp3 | 0.60 | pickle cannon shot |
| sfx_splurt.mp3 | 0.59 | mustard squeezer |
| sfx_grinder.mp3 | 0.80 | pepper mill sneeze cloud |
| sfx_toaster.mp3 | 0.80 | toaster tower pop |
| sfx_defeat.mp3 | 2.00 | sandwich eaten, sad trombone |
| sfx_layer_plop.mp3 | 0.60 | a layer is stacked onto a tower (extra) |
| sfx_place.mp3 | 0.60 | a tower is placed on a coaster (extra); also stands in for the spatula slap |

Missing: **sfx_slap (spatula swat)**. Both takes came back as near silence (peaks -57 and -40 dBFS, no
transient in the envelope), so I did not ship it. Use sfx_place pitched up, or synthesize a slap.

Raw downloads (unconverted) are in `work/art_scratch/audio_raw/`.
