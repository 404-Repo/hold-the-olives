  // DIFFERENT READING: a field gun: a fat short pickle mortar on a wine-cork trail, two BIG bottle-cap wheels at the sides
  const body = grp(g);
  const skin = M(C.pickleSkin, { r: 0.26 }), wart = M(C.pickle, { r: 0.3 }), flesh = M(0xc6cf72, { r: 0.3 });
  const cork = M(C.cork, { r: 0.9 }), corkEnd = M(0xd7b07a, { r: 0.9 }), cap = M(C.red, { r: 0.3, m: 0.3 }), crimp = metal(0xc9ccd0);
  add(new THREE.CylinderGeometry(0.14, 0.14, 0.75, 16), cork, [0, 0.14, -0.12], body, [PI / 2 - 0.25, 0, 0]);   // the trail, a cork lying back to the ground
  add(new THREE.CylinderGeometry(0.141, 0.141, 0.01, 16), corkEnd, [0, 0.05, -0.48], body, [PI / 2 - 0.25, 0, 0]);
  add(new THREE.BoxGeometry(0.42, 0.14, 0.26), cork, [0, 0.27, 0.1], body);
  const P = grp(body, [0, 0.44, 0.1], null, [-0.75, 0, 0]);
  add(new THREE.CapsuleGeometry(0.2, 0.36, 6, 16), skin, [0, 0, 0.05], P, [PI / 2, 0, 0]);
  for (let i = 0; i < 26; i++) { const a = i * 2.4, z = -0.17 + (i * 0.618 % 1) * 0.4; add(new THREE.SphereGeometry(0.04, 6, 4), wart, [Math.cos(a) * 0.195, Math.sin(a) * 0.195, z], P); }
  add(new THREE.CylinderGeometry(0.18, 0.18, 0.02, 18), flesh, [0, 0, 0.43], P, [PI / 2, 0, 0]);
  for (const s of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.23, 0.23, 0.06, 24), cap, [s * 0.27, 0.23, 0.1], body, [0, 0, PI / 2]);
    add(new THREE.TorusGeometry(0.23, 0.025, 4, 24), crimp, [s * 0.27, 0.23, 0.1], body, [0, PI / 2, 0]);
    add(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 12), crimp, [s * 0.3, 0.23, 0.1], body, [0, 0, PI / 2]);
  }
  fitAll(body, 0.8);
