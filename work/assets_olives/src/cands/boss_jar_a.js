  // A: primitives. Cylinder glass jar with a sphere-cap shoulder, cylinder neck, a ribbed screw lid (named, pivot at
  // the lid's base centre), brine as an inner cylinder, ~18 olives inside, an olive-green band with painted angry eyes,
  // stubby legs and arms.
  const glass = M(0xd8eef0, { t: 0.35, r: 0.05 }), glassRim = M(0xd8eef0, { t: 0.55, r: 0.05 }), brine = M(0xc6cf7a, { t: 0.28, r: 0.1 });
  const steel = M(0xbcc3c9, { r: 0.3, m: 0.65, name: 'metal' }), band = M(0x5b7a26, { r: 0.35 }), limb = M(0x7f9a2a, { r: 0.28 });
  const R = 0.82, y0 = 0.32, yS = 1.72, yN = 2.02, Rn = 0.66;
  add(new THREE.CylinderGeometry(R, R * 0.97, yS - y0, 28, 1, true), glass, [0, (y0 + yS) / 2, 0]);
  add(new THREE.CylinderGeometry(R * 0.97, R * 0.97, 0.08, 28), glassRim, [0, y0 + 0.04, 0]);
  add(new THREE.SphereGeometry(R, 28, 6, 0, TAU, 0, 0.62), glass, [0, yS - Math.cos(0.62) * R + 0.0, 0]);
  const shTop = yS - Math.cos(0.62) * R + R * Math.cos(0.62);
  add(new THREE.CylinderGeometry(Rn, Rn, yN - shTop + 0.02, 28, 1, true), glassRim, [0, (shTop + yN) / 2, 0]);
  for (let i = 0; i < 2; i++) add(new THREE.TorusGeometry(Rn + 0.01, 0.025, 4, 28), glassRim, [0, yN - 0.06 - i * 0.08, 0], g, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(R - 0.04, R - 0.05, yS - y0 - 0.12, 24), brine, [0, (y0 + yS) / 2 - 0.02, 0]);
  // olives inside, three loose layers
  let k = 0;
  for (const [yy, n, rr] of [[0.6, 7, 0.5], [0.6, 1, 0], [1.05, 7, 0.48], [1.05, 1, 0], [1.5, 6, 0.45], [1.5, 1, 0]]) for (let i = 0; i < n; i++) { const a = i / n * TAU + yy * 2; k++; miniOlive(g, [Math.sin(a) * rr, yy + (k % 3) * 0.04, Math.cos(a) * rr], 0.36, [(k * 1.7) % 1.4 - 0.7, k, (k * 2.3) % 1.6 - 0.8]); }
  // the band and its painted eyes
  add(new THREE.CylinderGeometry(R + 0.015, R + 0.015, 0.5, 28, 1, true), M(0x5b7a26, { r: 0.35, ds: true }), [0, 1.22, 0]);
  for (const sd of [-1, 1]) bandEye(g, R + 0.03, 1.2, sd * 0.36, 0.17, sd);
  // the lid: a named group pivoting at the lid's base centre
  const lid = grp(g, [0, yN, 0], 'lid'); g.userData.lid = lid; g.userData.joints = { lid };
  const lc = new THREE.CylinderGeometry(Rn + 0.06, Rn + 0.06, 0.3, 56, 1, false), la = lc.attributes.position;
  for (let i = 0; i < la.count; i++) { const x = la.getX(i), z = la.getZ(i), r = Math.hypot(x, z); if (r < Rn) continue; const k2 = 1 + 0.018 * Math.cos(Math.atan2(x, z) * 28); la.setX(i, x * k2); la.setZ(i, z * k2); }
  lc.computeVertexNormals();
  add(lc, steel, [0, 0.15, 0], lid);
  add(new THREE.CylinderGeometry(Rn - 0.02, Rn + 0.04, 0.06, 40), steel, [0, 0.32, 0], lid);
  add(new THREE.TorusGeometry(Rn + 0.04, 0.03, 6, 40), steel, [0, 0.3, 0], lid, [PI / 2, 0, 0]);
  // legs and arms
  for (const sd of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.17, 0.19, 0.3, 14), limb, [sd * 0.38, 0.17, 0]);
    add(new THREE.SphereGeometry(0.24, 14, 8, 0, TAU, 0, PI / 2), limb, [sd * 0.4, 0.0, 0.08], g, null, [1, 0.75, 1.3]);
    add(new THREE.CapsuleGeometry(0.11, 0.42, 4, 10), limb, [sd * (R + 0.12), 1.0, 0.05], g, [0, 0, sd * 0.32]);
  }
