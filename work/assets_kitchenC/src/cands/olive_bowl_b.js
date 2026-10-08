  // PRIMITIVES: bowl = open hemisphere (outer) + inner hemisphere flipped + rim torus + foot cylinder; olives = capsules piled in a mound; cocktail pick = cylinder with a red ball head
  const body = grp(g);
  const cer = ceramic(C.sage, 0.3);
  add(new THREE.SphereGeometry(0.66, 24, 8, 0, TAU, PI / 2, PI / 2), cer, [0, 0.42, 0], body, null, [1, 0.6, 1]);
  const inn = new THREE.SphereGeometry(0.6, 24, 8, 0, TAU, PI / 2, PI / 2); inn.scale(-1, 1, 1);
  add(inn, cer, [0, 0.42, 0], body, null, [1, 0.55, 1]);
  add(new THREE.TorusGeometry(0.63, 0.035, 6, 28), cer, [0, 0.42, 0], body, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(0.32, 0.34, 0.06, 20), cer, [0, 0.03, 0], body);
  const ol = M(0x8aa52e, { r: 0.25 }), og = new THREE.CapsuleGeometry(0.13, 0.1, 4, 10);
  const spots = [[0, 0.42, 0], [0.25, 0.36, 0.08], [-0.24, 0.36, 0.12], [0.08, 0.36, -0.26], [-0.18, 0.35, -0.2], [0.24, 0.34, -0.16], [0.02, 0.34, 0.27], [0.1, 0.55, 0.05]];
  spots.forEach(([x, y, z], i) => add(og, ol, [x, y, z], body, [PI / 2 + 0.4 * Math.sin(i), i * 1.1, 0.3 * Math.cos(i)]));
  const pick = grp(body, [0.1, 0.55, 0.05], null, [0.2, 0, -0.3]);
  rod([0, -0.1, 0], [0, 0.4, 0], 0.014, M(C.pick, { r: 0.6 }), pick, 6);
  add(new THREE.SphereGeometry(0.05, 10, 8), M(C.frill, { r: 0.3 }), [0, 0.42, 0], pick);
  fitAll(body, 0.7);
