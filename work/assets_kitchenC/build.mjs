// Inlines src/lib.js into each candidate body and writes self-contained modules (copied from assets_towers pattern).
// usage: node build.mjs [prefix...]  -> cands/<asset>/<asset>_<x>.js (+ .expect.json)
//        node build.mjs --final <asset> <x> -> game/assets/<asset>.js (+ .expect.json)
import fs from 'fs'; import path from 'path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const lib = fs.readFileSync(path.join(HERE, 'src/lib.js'), 'utf8');
export const EXPECT = {
  wine_glass: { height: 2.2, tolerance: 0.06 },
  water_jug: { height: 3.0, tolerance: 0.06 },
  candle_holder: { height: 3.4, tolerance: 0.06 },
  bread_basket: { height: 1.2, tolerance: 0.08 },
  fork: { height: 0.12, depth: 2.0, tolerance: 0.15 },
  table_knife: { height: 0.12, depth: 2.3, tolerance: 0.15 },
  salad_bowl: { height: 1.2, tolerance: 0.08 },
  napkin_folded: { height: 0.5, tolerance: 0.1 },
  roast_chicken: { height: 2.6, tolerance: 0.06 },
  flower_vase: { height: 4.2, tolerance: 0.06 },
  dining_chair: { height: 10.0, tolerance: 0.05 },
  table_lamp: { height: 9.0, tolerance: 0.05 },
  cocktail_shaker: { height: 3.0, tolerance: 0.06 },
  ice_bucket: { height: 2.6, tolerance: 0.06 },
  liquor_bottle: { height: 4.4, tolerance: 0.06 },
  coupe_glass: { height: 1.8, tolerance: 0.06 },
  olive_bowl: { height: 0.7, tolerance: 0.08 },
  cocktail_napkin: { height: 0.05, tolerance: 0.25 },
  bar_shelf: { width: 12.0, height: 16.0, depth: 3.0, tolerance: 0.05 },
};
const wrap = (asset, tag, body) => `// ${asset} (HOLD THE OLIVES), candidate ${tag}. Three.js code, 404 recipe path B. 10x world scale, metres.\n` +
  `export default function (THREE) {\n  const g = new THREE.Group();\n${lib}\n  // ---- this object ----\n${body}\n  placeOnGround();\n  return g;\n}\n`;
const args = process.argv.slice(2), srcDir = path.join(HERE, 'src/cands');
if (args[0] === '--final') {
  const [, asset, x] = args, out = '/Users/atlas/astrocade-game6/game/assets';
  fs.writeFileSync(path.join(out, `${asset}.js`), wrap(asset, `${asset}_${x} (final)`, fs.readFileSync(path.join(srcDir, `${asset}_${x}.js`), 'utf8')));
  fs.writeFileSync(path.join(out, `${asset}.expect.json`), JSON.stringify(EXPECT[asset]) + '\n');
  console.log('final', asset, '<-', x);
} else {
  for (const f of fs.readdirSync(srcDir).filter((f) => f.endsWith('.js')).sort()) {
    const name = f.replace(/\.js$/, ''), asset = name.replace(/_[a-z]\d?$/, '');
    if (args.length && !args.some((o) => name.startsWith(o))) continue;
    const dir = path.join(HERE, 'cands', asset); fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${name}.js`), wrap(asset, name, fs.readFileSync(path.join(srcDir, f), 'utf8')));
    fs.writeFileSync(path.join(dir, `${name}.expect.json`), JSON.stringify(EXPECT[asset]) + '\n');
  }
  console.log('built');
}
