#!/bin/bash
# builds my 19 finals into game/assets and a copy into finals_check
cd /Users/atlas/astrocade-game6/work/assets_kitchenC
PICKS="wine_glass:a water_jug:a candle_holder:a bread_basket:b fork:b table_knife:a salad_bowl:a napkin_folded:b roast_chicken:c flower_vase:a dining_chair:c table_lamp:c cocktail_shaker:a ice_bucket:b liquor_bottle:a coupe_glass:a olive_bowl:c cocktail_napkin:c bar_shelf:c"
rm -rf finals_check; mkdir finals_check
for p in $PICKS; do a=${p%:*}; x=${p#*:}; node build.mjs --final $a $x >/dev/null; cp /Users/atlas/astrocade-game6/game/assets/$a.js /Users/atlas/astrocade-game6/game/assets/$a.expect.json finals_check/; done
