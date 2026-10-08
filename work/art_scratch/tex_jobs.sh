#!/bin/zsh
cd /Users/atlas/astrocade-game6
T="Seamless tileable texture, flat top-down orthographic view straight down, filling the entire frame edge to edge, evenly and softly lit with no shadows, no vignette, no perspective, no objects, no text, no logos, stylised but realistic game texture with saturated true colours:"
typeset -A P
P[butcher_block]="$T a butcher block kitchen countertop made of long glued strips of warm honey oak and maple wood, parallel strips running horizontally, gentle grain, satin oiled finish, warm golden tan colour"
P[cutting_board]="$T a light maple end-grain cutting board, small square end-grain blocks in a checker of pale cream and light honey tones with fine growth rings, clean and bright"
P[sage_tile]="$T a kitchen backsplash of glossy square ceramic tiles in soft sage green, exactly four rows and four columns of square tiles filling the frame, thin cream grout lines, slight glaze variation per tile, soft gloss"
P[marble]="$T a white Carrara marble kitchen countertop, bright white with soft grey veins, polished"
P[stove_enamel]="$T a smooth cream enamel stovetop surface, warm off-white glossy porcelain enamel with very subtle speckle and soft sheen, uniform"
P[table_linen]="$T a blue and white gingham checked cotton tablecloth, even checks of medium blue and white with visible woven fabric texture, flat and smooth"
P[walnut]="$T dark walnut wood planks with rich chocolate brown grain, satin finish, planks running horizontally"
P[tile_floor]="$T a kitchen floor of terracotta and cream square tiles in a checkerboard pattern, warm red-orange terracotta and cream tiles, thin grout lines, slightly worn matte surface"
names=(butcher_block cutting_board sage_tile marble stove_enamel table_linen walnut tile_floor)
i=0
for n in $names; do
  python3 tools/atlas_img.py fast work/art_scratch/tex_raw/$n.png tex-$n "$P[$n]" > work/art_scratch/tex_$n.log 2>&1 &
  i=$((i+1)); if (( i % 2 == 0 )); then wait; fi
done
wait
