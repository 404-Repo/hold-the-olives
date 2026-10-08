#!/bin/zsh
cd /Users/atlas/astrocade-game6
A() { python3 tools/atlas_audio.py game6 work/art_scratch/audio_raw "$@"; }
J="Instrumental only, no vocals. Playful jazzy kitchen comedy for a cartoon cooking game: pizzicato strings, brushed drums, upright bass,"
A menu "Wet cartoon squelch pop of a juicy olive bursting, short and satisfying, comedic" 0.6 "$J accordion and vibraphone melody, warm, cheeky and inviting, medium tempo, seamless loop, ends where it begins" 60 > work/art_scratch/a_menu.log 2>&1 &
A stageA "Big cartoon chomp, a single loud bite into a crunchy toasted sandwich, comedic" 0.8 "$J bright vibraphone and whistle-like flute, sunny morning, light and bouncy, upbeat swing, steady energy for gameplay, seamless loop" 90 > work/art_scratch/a_stageA.log 2>&1 &
A stageB "Kitchen timer ding, a single bright bell ring of a mechanical egg timer" 1.2 "$J evening lounge jazz for cocktail hour, muted trumpet, soft piano, vibraphone, relaxed but playful swing, warm and smoky, seamless loop" 90 > work/art_scratch/a_stageB.log 2>&1 &
wait
A boss "A glass jar lid unscrewing with squeaky turns then a loud pop as it opens" 1.5 "$J urgent comic big band, brassy stabs, fast walking bass, driving drums, cartoon danger and suspense but still funny, seamless loop" 60 > work/art_scratch/a_boss.log 2>&1 &
A victory "Sparkly collect sound of crumbs and coins being picked up, bright twinkling chime" 0.6 "$J short triumphant comic victory fanfare, brass and xylophone flourish with a final button chord" 8 > work/art_scratch/a_victory.log 2>&1 &
A sfx_thwip "A quick toothpick shot, a light whippy thwip of a tiny crossbow firing" 0.5 "short tick" 1 > work/art_scratch/a_thwip.log 2>&1 &
wait
A sfx_cannon "A pickle cannon firing, a soft round cartoon thunk with a wet plop" 0.6 "short tick" 1 > work/art_scratch/a_cannon.log 2>&1 &
A sfx_splurt "A plastic squeeze bottle squirting mustard, a wet comedic splurt" 0.6 "short tick" 1 > work/art_scratch/a_splurt.log 2>&1 &
A sfx_grinder "A wooden pepper grinder twisting, a short crunchy grinding crackle" 0.8 "short tick" 1 > work/art_scratch/a_grinder.log 2>&1 &
wait
A sfx_toaster "A pop-up toaster popping, a springy metallic clunk-pop as the toast jumps" 0.8 "short tick" 1 > work/art_scratch/a_toaster.log 2>&1 &
A sfx_slap "A flat rubber spatula slapping down hard on a wooden counter, a comedic smack" 0.5 "short tick" 1 > work/art_scratch/a_slap.log 2>&1 &
A sfx_defeat "A sad cartoon defeat sound, a descending wah wah wah wah slide trombone" 2 "short tick" 1 > work/art_scratch/a_defeat.log 2>&1 &
wait
