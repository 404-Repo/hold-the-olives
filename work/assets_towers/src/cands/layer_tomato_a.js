  // PRIMITIVES: three red cylinders, a lighter flesh disc on top, seed pockets as squashed spheres, a pale core
  const body = grp(g);
  const skin = M(C.tomato, { r: 0.22 }), flesh = M(C.tomatoFl, { r: 0.2 }), seed = M(C.seed, { r: 0.15 }), core = M(0xf59a80, { r: 0.25 });
  const slice = (x, z, y, tilt) => {
    const o = grp(body, [x, y, z], null, [tilt[0], 0, tilt[1]]);
    add(new THREE.CylinderGeometry(0.32, 0.32, 0.06, 28), skin, [0, 0.03, 0], o);
    add(new THREE.CylinderGeometry(0.275, 0.275, 0.006, 28), flesh, [0, 0.062, 0], o);
    add(new THREE.CylinderGeometry(0.07, 0.07, 0.008, 12), core, [0, 0.064, 0], o);
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; add(new THREE.SphereGeometry(0.06, 10, 5), seed, [Math.cos(a) * 0.165, 0.064, Math.sin(a) * 0.165], o, [0, -a, 0], [1.3, 0.12, 0.7]); }
  };
  slice(0, -0.25, 0, [0.04, 0]); slice(-0.23, 0.15, 0.025, [0, 0.06]); slice(0.23, 0.15, 0.05, [-0.03, -0.07]);
  fitH(body, 0.12);
