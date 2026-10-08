  // a: primitives. Sage crock (cylinder + rim torus + interior), wooden spoon, steel whisk, steel ladle, wooden spatula.
  const sage = M(C.sage, 0.45), sageIn = M(0x6e9a8b, 0.6, 0, undefined, { side: DS }), wood = M(C.block, 0.55, 0, 'timber'), steel = M(C.steel, 0.3, 0.55, 'metal');
  add(cyl(0.6, 0.58, 1.3, 20, true), M(C.sage, 0.45, 0, undefined, { side: DS }), 0, 0.65, 0);
  add(cyl(0.58, 0.58, 0.04, 20), sage, 0, 0.02, 0);
  add(new THREE.TorusGeometry(0.6, 0.06, 6, 20), sage, 0, 1.3, 0, Math.PI / 2);
  add(cyl(0.55, 0.55, 0.04, 20), M(0x3b2a20, 0.9), 0, 1.0, 0);
  // spoon
  const sp = grp(-0.25, 0.95, 0.1, 0.12, 0, 0.28);
  add(cyl(0.05, 0.06, 1.3, 8), wood, 0, 0.65, 0, 0, 0, 0, sp);
  add(sph(0.2, 10, 8), wood, 0, 1.45, 0, 0, 0, 0, sp).scale.set(1, 1.35, 0.4);
  // whisk
  const wh = grp(-0.05, 0.95, -0.2, -0.1, 0, 0.1);
  add(cyl(0.06, 0.06, 0.8, 8), steel, 0, 0.4, 0, 0, 0, 0, wh);
  for (let i = 0; i < 4; i++) add(new THREE.TorusGeometry(0.2, 0.015, 4, 16), steel, 0, 1.1, 0, 0, i * Math.PI / 4, 0, wh).scale.set(1, 1.7, 1);
  // ladle
  const la = grp(0.2, 0.95, -0.1, -0.08, 0, -0.2);
  add(cyl(0.04, 0.04, 1.3, 8), steel, 0, 0.65, 0, 0, 0, 0, la);
  add(new THREE.SphereGeometry(0.24, 12, 6, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), M(C.steel, 0.3, 0.55, 'metal', { side: DS }), 0, 1.5, 0.12, -Math.PI / 2, 0, 0, la);
  // spatula
  const st = grp(0.3, 0.95, 0.25, 0.15, 0, -0.35);
  add(cyl(0.05, 0.05, 0.9, 8), wood, 0, 0.45, 0, 0, 0, 0, st);
  add(rbox(0.36, 0.55, 0.06, 0.03), wood, 0, 1.15, 0, 0, 0, 0, st);
  finish(HEIGHT);
