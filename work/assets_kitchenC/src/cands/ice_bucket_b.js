  // PRIMITIVES: bucket = open tapered cylinder (double-sided) on a base disc with rim and base tori; ring handles = tori on small cylinder lugs; ice = bevelled boxes; tongs = two thin boxes in a V with a cylinder hinge
  const body = grp(g);
  const st = M(C.steel, { r: 0.25, m: 0.55, name: 'metal', ds: true });
  add(new THREE.CylinderGeometry(1.12, 0.88, 1.75, 32, 1, true), st, [0, 0.95, 0], body);
  add(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 32), st, [0, 0.12, 0], body);
  add(new THREE.TorusGeometry(1.12, 0.07, 8, 36), st, [0, 1.82, 0], body, [PI / 2, 0, 0]);
  add(new THREE.TorusGeometry(0.88, 0.06, 8, 32), st, [0, 0.08, 0], body, [PI / 2, 0, 0]);
  for (const s of [-1, 1]) { add(new THREE.CylinderGeometry(0.1, 0.1, 0.16, 10), st, [s * 1.1, 1.4, 0], body, [0, 0, PI / 2]); add(new THREE.TorusGeometry(0.28, 0.055, 8, 18), st, [s * 1.2, 1.15, 0], body, [0, PI / 2, 0]); }
  const ice = M(0xe6f6fa, { r: 0.08, t: 0.7 });
  for (let i = 0; i < 15; i++) { const a = i * 2.39996, k = Math.sqrt((i + 0.5) / 15); add(new THREE.BoxGeometry(0.4, 0.4, 0.4), ice, [Math.cos(a) * 0.75 * k, 1.55 + 0.25 * (1 - k * k), Math.sin(a) * 0.75 * k], body, [i * 0.7, i * 1.3, 0]); }
  const T = grp(body, [0.3, 1.7, 0.1], null, [0.2, 0, -0.7]);
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.1, 1.5, 0.05), st, [s * 0.1, 0.75, 0], T, [0, 0, -s * 0.1]);
  add(new THREE.CylinderGeometry(0.1, 0.1, 0.12, 10), st, [0, 0, 0], T, [PI / 2, 0, 0]);
  fitAll(body, 2.6);
