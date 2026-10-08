  // PRIMITIVES: a pick with pointed ends, a red cuff, and a tuft of torus-arc curls radiating out and drooping
  const body = grp(g);
  const pick = M(C.pick, { r: 0.55 }), fr = M(C.frill, { r: 0.12, ds: true });
  add(new THREE.CylinderGeometry(0.022, 0.022, 0.7, 8), pick, [0, 0.4, 0], body);
  add(new THREE.ConeGeometry(0.022, 0.06, 8), pick, [0, 0.02, 0], body, [PI, 0, 0]);
  add(new THREE.CylinderGeometry(0.035, 0.03, 0.1, 10), fr, [0, 0.73, 0], body);
  for (let i = 0; i < 14; i++) {
    const a = i / 14 * TAU, up = 0.78 + (i % 3) * 0.015;
    const o = grp(body, [0, up, 0], null, [0, -a, 0]);
    add(new THREE.TorusGeometry(0.065 + (i % 2) * 0.02, 0.009, 4, 10, PI * 1.2), fr, [0.06, 0.03, 0], o, [0, 0, -0.3]);
  }
  fitAll(body, 0.9);
