// Inlines src/lib.js into each candidate body and writes self-contained modules (copied from assets_towers pattern).
// usage: node build.mjs [prefix...]  -> cands/<asset>/<asset>_<x>.js (+ .expect.json)
//        node build.mjs --final <asset> <x> -> game/assets/<asset>.js (+ .expect.json)
import fs from 'fs'; import path from 'path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const lib = fs.readFileSync(path.join(HERE, 'src/lib.js'), 'utf8');
export const EXPECT = {
  stove_burner: { width: 2.4, height: 0.3, depth: 2.4, tolerance: 0.06 },
  stove_knob: { height: 0.35, tolerance: 0.06 },
  frying_pan: { height: 0.6, tolerance: 0.06 },
  saucepan: { height: 1.4, tolerance: 0.06 },
  wooden_spoon: { height: 0.2, depth: 3.0, tolerance: 0.1 },
  oven_mitt: { height: 0.3, tolerance: 0.1 },
  pepper_shaker: { height: 0.9, tolerance: 0.06 },
  range_hood: { height: 7.0, tolerance: 0.06 },
  faucet: { height: 6.0, tolerance: 0.06 },
  dish_rack: { height: 2.4, tolerance: 0.06 },
  sponge: { height: 0.45, tolerance: 0.08 },
  dish_soap: { height: 2.2, tolerance: 0.06 },
  plate_stack: { height: 1.0, tolerance: 0.06 },
  drying_glass: { height: 1.6, tolerance: 0.06 },
  upper_cabinet: { width: 4.0, height: 7.0, depth: 3.2, tolerance: 0.05 },
  window_frame: { width: 9.5, height: 5.0, depth: 0.6, tolerance: 0.08 },
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
