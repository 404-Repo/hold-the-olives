// Inlines src/lib.js into each candidate body and writes self-contained modules.
// usage: node build.mjs [assetPrefix...]
import fs from 'fs';
import path from 'path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const lib = fs.readFileSync(path.join(HERE, 'src/lib.js'), 'utf8');
export const EXPECT = {
  olive_green: { height: 0.35, tolerance: 0.1 },
  olive_kalamata: { height: 0.30, tolerance: 0.1 },
  olive_stuffed: { height: 0.36, tolerance: 0.12 },
  pimento_runner: { height: 0.18, tolerance: 0.15 },
  olive_ring: { height: 0.32, width: 0.32, tolerance: 0.12 },
  olive_knight: { height: 0.42, depth: 0.9, tolerance: 0.2 },
  olive_brute: { height: 0.55, tolerance: 0.1 },
  olive_greaser: { height: 0.36, tolerance: 0.1 },
  boss_jar: { height: 2.4, tolerance: 0.08 },
  boss_oil_bottle: { height: 3.2, tolerance: 0.08 },
  boss_martini: { height: 3.6, tolerance: 0.08 },
  proj_toothpick: { depth: 0.6, tolerance: 0.1 },
  proj_pickle: { width: 0.35, tolerance: 0.12 },
  proj_toast: { width: 0.9, tolerance: 0.12 },
  proj_mustard: { height: 0.25, tolerance: 0.1 },
};
const only = process.argv.slice(2);
const srcDir = path.join(HERE, 'src/cands');
for (const f of fs.readdirSync(srcDir).filter((f) => f.endsWith('.js')).sort()) {
  const name = f.replace(/\.js$/, ''), asset = name.replace(/_[abcdz]\d?$/, '');
  if (only.length && !only.some((o) => name.startsWith(o))) continue;
  const body = fs.readFileSync(path.join(srcDir, f), 'utf8');
  const out = `// ${asset} (HOLD THE OLIVES), candidate ${name}. Generated as Three.js code, 404 recipe path B.\n` +
    `export default function (THREE) {\n  const g = new THREE.Group();\n${lib}\n  // ---- this object ----\n${body}\n  placeOnGround();\n  return g;\n}\n`;
  const dir = path.join(HERE, 'cands', asset);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.js`), out);
  if (EXPECT[asset]) fs.writeFileSync(path.join(dir, `${name}.expect.json`), JSON.stringify(EXPECT[asset]) + '\n');
  console.log('built', name);
}
