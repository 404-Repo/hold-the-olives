// Inlines src/lib.js into each candidate body; writes self-contained modules to cands/<asset>/.
// Candidate body must end by calling finish(H) itself (H from EXPECT, available as const HEIGHT).
import fs from 'fs'; import path from 'path';
const HERE = path.dirname(new URL(import.meta.url).pathname);
const lib = fs.readFileSync(path.join(HERE, 'src/lib.js'), 'utf8');
export const EXPECT = {
  olive_jar_spill: { height: 1.5 }, bread_bin: { height: 2.2 }, knife_block: { height: 2.6 }, coffee_maker: { height: 3.4 },
  kettle: { height: 2.4 }, toaster: { height: 2.0 }, utensil_crock: { height: 2.6 }, herb_pot: { height: 1.8 },
  fruit_bowl: { height: 1.2 }, bread_loaf: { height: 0.9 }, lemon: { height: 0.55 }, mug: { height: 1.0 },
  salt_shaker: { height: 0.9 }, butter_dish: { height: 0.6 }, tea_towel: { height: 0.12 }, paper_towel: { height: 2.8 },
};
const only = process.argv.slice(2);
const srcDir = path.join(HERE, 'src/cands');
for (const f of fs.readdirSync(srcDir).filter((f) => f.endsWith('.js')).sort()) {
  const name = f.replace(/\.js$/, ''), asset = name.replace(/_[abc]$/, '');
  if (only.length && !only.includes(asset)) continue;
  const exp = EXPECT[asset]; if (!exp) { console.error('no EXPECT for', asset); continue; }
  const body = fs.readFileSync(path.join(srcDir, f), 'utf8');
  const out = `// ${asset} (HOLD THE OLIVES), candidate ${name}. Three.js code, 404 recipe path B. 10x world scale, metres.\n` +
    `export default function (THREE) {\n  const g = new THREE.Group();\n  const HEIGHT = ${exp.height};\n${lib}\n  // ---- this object ----\n${body}\n  return g;\n}\n`;
  const dir = path.join(HERE, 'cands', asset); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${name}.js`), out);
  fs.writeFileSync(path.join(dir, `${name}.expect.json`), JSON.stringify({ ...exp, tolerance: 0.1 }) + '\n');
}
console.log('built', only.join(' ') || 'all');
