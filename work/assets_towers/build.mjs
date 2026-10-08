// Inlines src/lib.js into each candidate body and writes self-contained modules.
// usage: node build.mjs [assetPrefix...]         -> cands/<asset>/<asset>_<x>.js (+ .expect.json)
//        node build.mjs --final <asset> <x>       -> game/assets/<asset>.js (+ .expect.json)
import fs from 'fs';
import path from 'path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const lib = fs.readFileSync(path.join(HERE, 'src/lib.js'), 'utf8');
export const EXPECT = {
  layer_bread: { width: 1.1, height: 0.16, depth: 1.1, tolerance: 0.08 },
  layer_lettuce: { width: 1.4, height: 0.12, tolerance: 0.12 },
  layer_tomato: { height: 0.12, width: 1.3, tolerance: 0.12 },
  layer_cheese: { height: 0.07, width: 1.55, tolerance: 0.12 },
  layer_bacon: { height: 0.09, width: 1.35, tolerance: 0.12 },
  head_ballista: { height: 0.75, tolerance: 0.06 },
  head_pickle: { height: 0.8, tolerance: 0.06 },
  head_mustard: { height: 1.0, tolerance: 0.06 },
  head_pepper: { height: 1.0, tolerance: 0.06 },
  head_grater: { height: 0.9, tolerance: 0.06 },
  head_toaster: { height: 0.95, tolerance: 0.06 },
  flag_club: { height: 0.9, tolerance: 0.06 },
  pad_coaster: { width: 1.3, height: 0.09, depth: 1.3, tolerance: 0.06 },
  club_sandwich: { height: 3.0, tolerance: 0.06 },
  dinner_plate: { width: 2.7, height: 0.25, depth: 2.7, tolerance: 0.06 },
  spatula: { depth: 3.5, tolerance: 0.06 },
};
const wrap = (asset, tag, body) => `// ${asset} (HOLD THE OLIVES), candidate ${tag}. Three.js code, 404 recipe path B.\n` +
  `export default function (THREE) {\n  const g = new THREE.Group();\n${lib}\n  // ---- this object ----\n${body}\n  placeOnGround();\n  return g;\n}\n`;
const args = process.argv.slice(2);
const srcDir = path.join(HERE, 'src/cands');
if (args[0] === '--final') {
  const [, asset, x] = args;
  const body = fs.readFileSync(path.join(srcDir, `${asset}_${x}.js`), 'utf8');
  const out = '/Users/atlas/astrocade-game6/game/assets';
  fs.writeFileSync(path.join(out, `${asset}.js`), wrap(asset, `${asset}_${x} (final)`, body));
  fs.writeFileSync(path.join(out, `${asset}.expect.json`), JSON.stringify(EXPECT[asset]) + '\n');
  console.log('final', asset, '<-', x);
} else {
  for (const f of fs.readdirSync(srcDir).filter((f) => f.endsWith('.js')).sort()) {
    const name = f.replace(/\.js$/, ''), asset = name.replace(/_[a-z]\d?$/, '');
    if (args.length && !args.some((o) => name.startsWith(o))) continue;
    const dir = path.join(HERE, 'cands', asset);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${name}.js`), wrap(asset, name, fs.readFileSync(path.join(srcDir, f), 'utf8')));
    if (EXPECT[asset]) fs.writeFileSync(path.join(dir, `${name}.expect.json`), JSON.stringify(EXPECT[asset]) + '\n');
    console.log('built', name);
  }
}
