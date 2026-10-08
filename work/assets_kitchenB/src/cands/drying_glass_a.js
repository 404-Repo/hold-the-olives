  // PRIMITIVES: an upside-down tumbler: outer and inner open cylinders (DoubleSide, transparent), a thick base disc on top, a rim torus at the bottom;
  // inside: a few water droplets on the inner wall and a little puddle ring at the mouth
  const body = grp(g);
  const gl = M(0xd8eef0, { r: 0.05, t: 0.38, ds: true }), gth = M(0xcfe8ec, { r: 0.05, t: 0.55 }), wat = M(0xbfe3ef, { r: 0.05, t: 0.7 });
  add(new THREE.CylinderGeometry(0.4, 0.5, 1.6, 24, 1, true), gl, [0, 0.8, 0], body);
  add(new THREE.CylinderGeometry(0.36, 0.45, 1.4, 24, 1, true), gl, [0, 0.7, 0], body);
  add(new THREE.CylinderGeometry(0.4, 0.38, 0.22, 24), gth, [0, 1.49, 0], body);
  add(new THREE.TorusGeometry(0.475, 0.03, 6, 24), gth, [0, 0.02, 0], body, [PI / 2, 0, 0]);
  for (let i = 0; i < 7; i++) { const a = i * 2.4, y = 0.25 + (i * 0.37 % 1) * 0.9, r = 0.45 - y * 0.06; add(new THREE.SphereGeometry(0.045, 8, 6), wat, [Math.cos(a) * r * 0.97, y, Math.sin(a) * r * 0.97], body, null, [1, 1.4, 1]); }
  add(new THREE.TorusGeometry(0.44, 0.035, 6, 24), wat, [0, 0.03, 0], body, [PI / 2, 0, 0], [1, 1, 0.6]);
  fitAll(body, 1.6);
