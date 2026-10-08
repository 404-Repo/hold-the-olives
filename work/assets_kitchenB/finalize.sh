#!/bin/bash
# builds my 16 finals into game/assets and a copy into finals_check
cd /Users/atlas/astrocade-game6/work/assets_kitchenB
PICKS="stove_burner:b stove_knob:b frying_pan:a saucepan:b wooden_spoon:c oven_mitt:c pepper_shaker:a range_hood:a faucet:c dish_rack:a sponge:b dish_soap:b plate_stack:b drying_glass:b upper_cabinet:a window_frame:a"
rm -rf finals_check; mkdir finals_check
for p in $PICKS; do a=${p%:*}; x=${p#*:}; node build.mjs --final $a $x; cp /Users/atlas/astrocade-game6/game/assets/$a.js /Users/atlas/astrocade-game6/game/assets/$a.expect.json finals_check/; done
