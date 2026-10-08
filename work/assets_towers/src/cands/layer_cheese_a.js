  // PRIMITIVES: a flat box diamond over the bread and four triangular prism flaps hinged down at the corners
  const body = grp(g, [0, 0, 0], null, [0, PI / 4, 0]);
  const ch = M(C.cheese, { r: 0.35 });
  add(new THREE.BoxGeometry(0.82, 0.035, 0.82), ch, [0, 0.0525, 0], body);
  for (let i = 0; i < 4; i++) {
    const a = i * PI / 2, o = grp(body, [0, 0.07, 0], null, [0, a, 0]);
    // edge strip and a corner wedge hanging down
    const f = grp(o, [0.41, 0, 0], null, [0, 0, -0.22]);
    add(new THREE.BoxGeometry(0.17, 0.035, 0.82), ch, [0.085, -0.0175, 0], f);
  }
  fitH(body, 0.07);
