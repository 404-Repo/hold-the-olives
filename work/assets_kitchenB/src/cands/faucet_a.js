  // PRIMITIVES: round base plate + collar, column cylinder, a half-torus gooseneck arc, a short drop cylinder and aerator; lever = hub cylinder + angled rod with a ball end
  const body = grp(g);
  const st = metal(C.steel, 0.25), dk = M(0x2a2a2a, { r: 0.6 });
  add(new THREE.CylinderGeometry(0.55, 0.6, 0.12, 28), st, [0, 0.06, 0], body);
  add(new THREE.CylinderGeometry(0.3, 0.38, 0.35, 24), st, [0, 0.28, 0], body);
  add(new THREE.CylinderGeometry(0.2, 0.22, 4.2, 18), st, [0, 2.4, 0], body);
  const Ra = 1.25; // arc centre at (0, 4.5, Ra)
  add(new THREE.TorusGeometry(Ra, 0.2, 12, 24, PI), st, [0, 4.5, Ra], body, [0, PI / 2, 0]);
  add(new THREE.CylinderGeometry(0.2, 0.2, 0.5, 18), st, [0, 4.25, 2 * Ra], body);
  add(new THREE.CylinderGeometry(0.23, 0.23, 0.18, 18), st, [0, 3.97, 2 * Ra], body);
  add(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 14), dk, [0, 3.87, 2 * Ra], body);
  add(new THREE.CylinderGeometry(0.22, 0.22, 0.4, 16), st, [0.3, 1.2, 0], body, [0, 0, PI / 2]);
  rod([0.5, 1.2, 0], [0.75, 1.9, 0], 0.07, st, body, 10, 0.05);
  add(new THREE.SphereGeometry(0.09, 10, 8), st, [0.77, 1.95, 0], body);
  fitAll(body, 6.0);
