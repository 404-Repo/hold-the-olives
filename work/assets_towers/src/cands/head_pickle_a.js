  // PRIMITIVES: a capsule pickle studded with sphere warts, pale cut face at the muzzle, cork box carriage, four bottle-cap wheels
  const body = grp(g);
  const skin = M(C.pickleSkin, { r: 0.28 }), wart = M(C.pickle, { r: 0.3 }), flesh = M(0xc6cf72, { r: 0.3 }), seedm = M(0xe8e2a8, { r: 0.4 });
  const cork = M(C.cork, { r: 0.9 }), cap = M(C.red, { r: 0.3, m: 0.3 }), crimp = metal(0xc9ccd0);
  const P = grp(body, [0, 0.42, 0.02], null, [-0.42, 0, 0]);   // barrel axis = local +Z, pitched up
  add(new THREE.CapsuleGeometry(0.17, 0.5, 6, 16), skin, [0, 0, 0], P, [PI / 2, 0, 0]);
  for (let i = 0; i < 34; i++) { const a = i * 2.4, z = -0.3 + (i * 0.618 % 1) * 0.6; add(new THREE.SphereGeometry(0.035, 6, 4), wart, [Math.cos(a) * 0.165, Math.sin(a) * 0.165, z], P); }
  add(new THREE.CylinderGeometry(0.15, 0.15, 0.02, 18), flesh, [0, 0, 0.39], P, [PI / 2, 0, 0]);
  for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; add(new THREE.SphereGeometry(0.022, 6, 4), seedm, [Math.cos(a) * 0.07, Math.sin(a) * 0.07, 0.4], P, null, [1, 1, 0.4]); }
  // carriage: two cork cheeks and a block
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.08, 0.26, 0.5), cork, [s * 0.17, 0.27, -0.02], body);
  add(new THREE.BoxGeometry(0.34, 0.12, 0.56), cork, [0, 0.18, -0.02], body);
  for (const s of [-1, 1]) for (const z of [-0.2, 0.18]) {
    add(new THREE.CylinderGeometry(0.11, 0.11, 0.05, 21), cap, [s * 0.25, 0.11, z], body, [0, 0, PI / 2]);
    add(new THREE.TorusGeometry(0.11, 0.015, 4, 21), crimp, [s * 0.25, 0.11, z], body, [0, PI / 2, 0]);
    add(new THREE.CylinderGeometry(0.035, 0.035, 0.06, 8), crimp, [s * 0.27, 0.11, z], body, [0, 0, PI / 2]);
  }
  fitAll(body, 0.8);
