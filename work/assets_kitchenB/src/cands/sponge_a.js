  // PRIMITIVES: yellow rounded box with a grip groove (two narrower boxes form the waist), green scrub pad rounded box on top
  const body = grp(g);
  const yel = M(0xf5cd2a, { r: 0.85 }), yd = M(0xe0b31a, { r: 0.9 }), grn = M(0x2f7a32, { r: 0.95, name: 'fabric' });
  add(rbox(0.75, 0.12, 1.15, 0.05), yel, [0, 0, 0], body);
  add(rbox(0.62, 0.08, 1.1, 0.03), yd, [0, 0.11, 0], body);
  add(rbox(0.75, 0.12, 1.15, 0.05), yel, [0, 0.18, 0], body);
  add(rbox(0.75, 0.14, 1.15, 0.04), grn, [0, 0.29, 0], body);
  for (let i = 0; i < 16; i++) { const x = ((i * 37) % 13) / 13 - 0.5, z = ((i * 53) % 17) / 17 - 0.5; add(new THREE.SphereGeometry(0.03, 5, 3), yd, [x * 0.76, 0.05 + (i % 2) * 0.17, z * 1.16 * (i % 3 === 0 ? 1 : 0) + (i % 3 ? (i % 2 ? 0.575 : -0.575) : 0)], body); }
  fitAll(body, 0.45);
