#!/bin/sh
# Regenerate game/src/assets_list.js from the asset modules and textures that exist,
# so the game never requests a missing file (a 404 fails the jam gate).
cd "$(dirname "$0")/../game" || exit 1
{
  printf 'export const AVAILABLE = [\n'
  for f in assets/*.js; do [ -e "$f" ] || continue; printf "  '%s',\n" "$(basename "$f" .js)"; done
  printf '];\nexport const TEX = [\n'
  for f in tex/*.jpg; do [ -e "$f" ] || continue; printf "  '%s',\n" "$(basename "$f" .jpg)"; done
  printf '];\nexport const AUDIO = [\n'
  for f in audio/*.mp3; do [ -e "$f" ] || continue; printf "  '%s',\n" "$(basename "$f" .mp3)"; done
  printf '];\n'
} > src/assets_list.js
echo "assets $(ls assets/*.js 2>/dev/null | wc -l | tr -d ' ') tex $(ls tex/*.jpg 2>/dev/null | wc -l | tr -d ' ') audio $(ls audio/*.mp3 2>/dev/null | wc -l | tr -d ' ')"
