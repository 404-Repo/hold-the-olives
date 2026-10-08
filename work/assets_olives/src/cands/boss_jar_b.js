  // B: lathe. One swept glass profile (base heel, wall, shoulder, neck threads), a swept brine fill, a swept lid with a
  // knurled skirt (named group, pivot at its base centre), olives in a spiral, swept band, swept boots and arms.
  const glass = M(0xd8eef0, { t: 0.35, r: 0.05 }), glassRim = M(0xd8eef0, { t: 0.55, r: 0.05 }), brine = M(0xc6cf7a, { t: 0.28, r: 0.1 });
  const steel = M(0xbcc3c9, { r: 0.3, m: 0.65, name: 'metal' }), limb = M(0x7f9a2a, { r: 0.28 });
  const prof = [[0, 0.3], [0.7, 0.3], [0.8, 0.34], [0.83, 0.42], [0.84, 1.5], [0.82, 1.68], [0.76, 1.82], [0.68, 1.9], [0.65, 1.94], [0.65, 1.96], [0.675, 1.97], [0.65, 1.99], [0.65, 2.02], [0.675, 2.03], [0.65, 2.05], [0.64, 2.08]];
  add(lathe(prof, 28), glass);
  add(lathe([[0, 0.3], [0.7, 0.3], [0.8, 0.34], [0.83, 0.42], [0.83, 0.46], [0, 0.46]], 28), glassRim);
  add(lathe([[0, 0.34], [0.78, 0.34], [0.8, 1.5], [0.77, 1.66], [0.7, 1.76], [0, 1.76]], 22), brine);
  for (let i = 0; i < 20; i++) { const t = i / 20, a = t * TAU * 3.1, rr = 0.5 - (i % 3) * 0.14; miniOlive(g, [Math.sin(a) * rr, 0.62 + t * 1.0, Math.cos(a) * rr], 0.36, [Math.sin(i) * 0.8, i * 0.9, Math.cos(i * 1.3) * 0.8]); }
  add(lathe([[0.85, 0.96], [0.87, 0.98], [0.87, 1.46], [0.85, 1.48]], 28), M(0x5b7a26, { r: 0.35 }));
  for (const sd of [-1, 1]) bandEye(g, 0.885, 1.22, sd * 0.36, 0.17, sd);
  const lid = grp(g, [0, 2.06, 0], 'lid'); g.userData.lid = lid; g.userData.joints = { lid };
  const lg = lathe([[0, 0], [0.72, 0], [0.73, 0.02], [0.73, 0.26], [0.7, 0.3], [0.6, 0.33], [0.3, 0.345], [0, 0.35]], 56), la = lg.attributes.position;
  for (let i = 0; i < la.count; i++) { const x = la.getX(i), z = la.getZ(i), y = la.getY(i); if (y < 0.03 || y > 0.25) continue; const k2 = 1 + 0.02 * Math.cos(Math.atan2(x, z) * 28); la.setX(i, x * k2); la.setZ(i, z * k2); }
  lg.computeVertexNormals(); add(lg, steel, [0, 0, 0], lid);
  for (const sd of [-1, 1]) {
    add(lathe([[0, 0], [0.24, 0], [0.26, 0.06], [0.2, 0.16], [0.17, 0.2], [0.16, 0.36], [0, 0.36]], 14), limb, [sd * 0.4, 0, 0.0], g, null, [1, 1, 1.2]);
    add(new THREE.CapsuleGeometry(0.11, 0.42, 4, 10), limb, [sd * 0.95, 1.0, 0.05], g, [0, 0, sd * 0.32]);
    add(new THREE.SphereGeometry(0.15, 10, 8), limb, [sd * 1.05, 0.72, 0.08]);
  }
