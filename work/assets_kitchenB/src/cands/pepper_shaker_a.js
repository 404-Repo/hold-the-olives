  // PRIMITIVES: 8-sided glass cylinder body with a thick base, pepper = dark 8-sided cylinder inside, steel collar cylinder + sphere-cap dome with dark hole dots
  const body = grp(g);
  const gl = glass(0.4), pep = M(0x2e2824, { r: 0.95 }), pepL = M(0x6a5a48, { r: 0.95 }), st = metal(C.steel, 0.3), hole = M(0x1a1a1a, { r: 0.8 });
  add(new THREE.CylinderGeometry(0.27, 0.3, 0.6, 8), gl, [0, 0.3, 0], body);
  add(new THREE.CylinderGeometry(0.3, 0.3, 0.06, 8), M(0xd8eef0, { r: 0.05, t: 0.6 }), [0, 0.03, 0], body);
  add(new THREE.CylinderGeometry(0.235, 0.255, 0.4, 8), pep, [0, 0.27, 0], body);
  for (let i = 0; i < 14; i++) { const a = i * 2.4, y = 0.1 + (i % 7) * 0.05; add(new THREE.SphereGeometry(0.02, 4, 3), pepL, [Math.cos(a) * 0.245, y, Math.sin(a) * 0.245], body); }
  add(new THREE.CylinderGeometry(0.27, 0.27, 0.12, 20), st, [0, 0.66, 0], body);
  add(new THREE.SphereGeometry(0.27, 20, 8, 0, TAU, 0, PI / 2), st, [0, 0.72, 0], body, null, [1, 0.65, 1]);
  for (let i = 0; i < 7; i++) { const a = i / 6 * TAU, r = i === 6 ? 0 : 0.11; add(new THREE.CylinderGeometry(0.022, 0.022, 0.02, 6), hole, [Math.cos(a) * r, 0.885 - (r ? 0.015 : 0), Math.sin(a) * r], body); }
  fitAll(body, 0.9);
