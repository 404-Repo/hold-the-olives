  // C: a different reading. A squat, bulbous toy jar (glass sphere body, short wide neck), packed with olives, a fat
  // ribbed lid (named group, pivot at its base centre), the band low and wide with big painted eyes, short thick legs.
  const glass = M(0xd8eef0, { t: 0.35, r: 0.05 }), glassRim = M(0xd8eef0, { t: 0.55, r: 0.05 }), brine = M(0xc6cf7a, { t: 0.28, r: 0.1 });
  const steel = M(0xbcc3c9, { r: 0.3, m: 0.65, name: 'metal' }), limb = M(0x7f9a2a, { r: 0.28 });
  const R = 0.95, cy = 1.2;
  const body = new THREE.SphereGeometry(R, 28, 18, 0, TAU, 0.55, PI - 0.55 - 0.35); add(body, glass, [0, cy, 0], g, null, [1, 0.92, 1]);
  add(new THREE.CylinderGeometry(R * Math.sin(0.35) + 0.02, R * Math.sin(0.35) + 0.02, 0.06, 28), glassRim, [0, cy - R * 0.92 * Math.cos(0.35), 0]);
  const neckR = R * Math.sin(0.55), neckY = cy + R * 0.92 * Math.cos(0.55);
  add(new THREE.CylinderGeometry(neckR, neckR, 0.22, 28, 1, true), glassRim, [0, neckY + 0.1, 0]);
  add(new THREE.SphereGeometry(R - 0.05, 22, 12, 0, TAU, 0.75, PI - 0.75 - 0.4), brine, [0, cy - 0.02, 0], g, null, [1, 0.9, 1]);
  let k = 0; for (const [yy, n, rr] of [[0.6, 5, 0.42], [0.95, 8, 0.6], [0.95, 2, 0.2], [1.35, 8, 0.6], [1.35, 2, 0.2], [1.72, 5, 0.4]]) for (let i = 0; i < n; i++) { const a = i / n * TAU + yy * 3; k++; miniOlive(g, [Math.sin(a) * rr, yy, Math.cos(a) * rr], 0.38, [(k * 1.3) % 1.6 - 0.8, k, (k * 0.7) % 1.2]); }
  // the band follows the bulge: a short wide open cylinder at the equator
  add(new THREE.CylinderGeometry(R + 0.02, R + 0.02, 0.5, 30, 1, true), M(0x5b7a26, { r: 0.35, ds: true }), [0, cy - 0.02, 0]);
  for (const sd of [-1, 1]) bandEye(g, R + 0.04, cy - 0.02, sd * 0.34, 0.2, sd);
  const lid = grp(g, [0, neckY + 0.2, 0], 'lid'); g.userData.lid = lid; g.userData.joints = { lid };
  for (let i = 0; i < 24; i++) { const a = i / 24 * TAU; add(new THREE.CapsuleGeometry(0.035, 0.22, 2, 4), steel, [Math.sin(a) * (neckR + 0.06), 0.16, Math.cos(a) * (neckR + 0.06)], lid); }
  add(new THREE.CylinderGeometry(neckR + 0.06, neckR + 0.06, 0.3, 32), steel, [0, 0.15, 0], lid);
  add(new THREE.SphereGeometry(neckR + 0.06, 32, 6, 0, TAU, 0, 0.45), steel, [0, 0.3 - (neckR + 0.06) * Math.cos(0.45), 0], lid);
  for (const sd of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.2, 0.22, 0.4, 14), limb, [sd * 0.42, 0.22, 0]);
    add(new THREE.SphereGeometry(0.27, 14, 8, 0, TAU, 0, PI / 2), limb, [sd * 0.44, 0, 0.1], g, null, [1, 0.7, 1.3]);
    add(new THREE.CapsuleGeometry(0.12, 0.36, 4, 10), limb, [sd * (R + 0.1), 1.05, 0.1], g, [0.2, 0, sd * 0.4]);
  }
