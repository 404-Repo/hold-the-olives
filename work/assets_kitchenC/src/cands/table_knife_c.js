  // DIFFERENT BREAKDOWN: a turned lathe handle (round, swelling toward the end) laid along z and flattened, a blade with a scalloped serrated edge as an extruded outline, a ring bolster; lying flat
  const body = grp(g);
  const st = metal(C.steel, 0.25);
  const hg = lathe([[0, 0], [0.07, 0.0], [0.09, 0.06], [0.1, 0.4], [0.13, 0.8], [0.12, 0.92], [0.06, 0.98], [0, 0.99]], 14);
  add(hg, st, [0, 0.07, 0.0], body, [PI / 2, 0, 0], [1.25, 1, 0.55]);
  add(new THREE.TorusGeometry(0.075, 0.03, 6, 14), st, [0, 0.065, 0.0], body, null, [1.2, 0.8, 1]);
  const b = new THREE.Shape(); b.moveTo(-0.1, 0); b.lineTo(0.08, 0);
  for (let i = 0; i < 9; i++) { const y = -0.12 - i * 0.1; b.quadraticCurveTo(0.14, y + 0.05, 0.11, y - 0.05); }
  b.quadraticCurveTo(0.11, -1.22, -0.03, -1.24); b.quadraticCurveTo(-0.13, -1.05, -0.12, -0.7); b.closePath();
  add(slab(b, 0.035, 0.01, 0.0, 6), st, [0, 0.03, 0.0], body);
  fitD(body, 2.3);
