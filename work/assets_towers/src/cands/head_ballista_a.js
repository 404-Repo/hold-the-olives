  // PRIMITIVES: wooden turntable, post and yoke, a box stock along +Z, a bent cocktail-pick bow, string, a loaded toothpick bolt
  const body = grp(g);
  const wood = timber(C.wood), dark = timber(0xa8784a), pick = M(C.pick, { r: 0.55 }), str = M(0xf4efe4, { r: 0.8 }), frill = M(C.frill, { r: 0.2 });
  add(new THREE.CylinderGeometry(0.4, 0.43, 0.1, 28), wood, [0, 0.05, 0], body);
  add(new THREE.CylinderGeometry(0.3, 0.32, 0.05, 28), dark, [0, 0.125, 0], body);
  add(new THREE.CylinderGeometry(0.08, 0.1, 0.22, 14), wood, [0, 0.26, 0], body);
  add(new THREE.BoxGeometry(0.26, 0.08, 0.16), dark, [0, 0.4, 0], body);
  for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.05, 0.16, 0.14), dark, [s * 0.11, 0.48, 0], body);
  const aim = grp(body, [0, 0.5, 0], null, [-0.12, 0, 0]);       // pitched slightly UP (negative x rotation lifts the front)
  add(new THREE.BoxGeometry(0.15, 0.1, 0.86), wood, [0, 0.0, 0.02], aim);
  add(new THREE.BoxGeometry(0.17, 0.14, 0.12), dark, [0, 0.0, 0.4], aim);             // bow block
  add(new THREE.BoxGeometry(0.13, 0.16, 0.18), dark, [0, -0.05, -0.36], aim);         // butt
  // bow: a bent pick across X at the front, bulging toward +Z
  const by = 0.03, bz = 0.42;
  tube([[-0.5, by, bz - 0.2], [-0.28, by, bz - 0.02], [0, by, bz + 0.06], [0.28, by, bz - 0.02], [0.5, by, bz - 0.2]], 0.028, pick, aim, 24, 8);
  for (const s of [-1, 1]) add(new THREE.ConeGeometry(0.05, 0.12, 8), frill, [s * 0.52, by, bz - 0.22], aim, [0, 0, -s * PI / 2]);
  // string from the tips back to the nut
  for (const s of [-1, 1]) rod([s * 0.5, by, bz - 0.2], [0, by + 0.02, -0.12], 0.008, str, aim, 5);
  // bolt: a toothpick with pointed ends along +Z
  add(new THREE.CylinderGeometry(0.022, 0.022, 0.7, 8), pick, [0, 0.075, 0.16], aim, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.022, 0.1, 8), pick, [0, 0.075, 0.56], aim, [PI / 2, 0, 0]);
  add(new THREE.ConeGeometry(0.022, 0.08, 8), pick, [0, 0.075, -0.23], aim, [-PI / 2, 0, 0]);
  fitAll(body, 0.75);
