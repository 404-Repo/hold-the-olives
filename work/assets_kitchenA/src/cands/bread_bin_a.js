  // a: primitives. Box base + quarter-cylinder top front, roll-top door as a proud shell with a lip, end cheeks, wooden knob.
  const cream = M(C.cream, 0.32), wood = M(C.block, 0.6, 0, 'timber'), shade = M(0xe2d8c0, 0.4);
  const W = 3.3, D = 2.2, R = 1.2, Hb = 2.15;
  add(rbox(W, Hb - R, D, 0.12), cream, 0, (Hb - R) / 2, 0);                    // lower box
  add(rbox(W, R, D - R, 0.12), cream, 0, Hb - R / 2, -R / 2);                    // back upper block
  const q = new THREE.CylinderGeometry(R, R, W - 0.02, 20, 1, false, 0, Math.PI / 2); q.rotateZ(Math.PI / 2);
  add(q, cream, 0, Hb - R, D / 2 - R, 0, 0, 0).rotation.set(-Math.PI / 2, 0, 0);
  // door shell (slightly proud), covers curved front plus front face down to lip
  const dq = new THREE.CylinderGeometry(R + 0.05, R + 0.05, W - 0.4, 20, 1, true, 0, Math.PI / 2); dq.rotateZ(Math.PI / 2);
  add(dq, M(C.cream, 0.3, 0, undefined, { side: DS }), 0, Hb - R, D / 2 - R).rotation.set(-Math.PI / 2, 0, 0);
  add(rbox(W - 0.4, Hb - R - 0.35, 0.06, 0.03), cream, 0, (Hb - R) / 2 + 0.2, D / 2 + 0.03);
  add(rbox(W - 0.3, 0.14, 0.16, 0.06), shade, 0, 0.28, D / 2 + 0.05);           // lip
  for (const x of [-(W / 2), W / 2]) add(rbox(0.1, Hb - 0.05, D + 0.04, 0.05), shade, x, Hb / 2, 0);
  add(sph(0.2, 12, 10), wood, 0, 0.6, D / 2 + 0.2).scale.set(1, 1, 0.75);
  add(cyl(0.07, 0.07, 0.15, 8), wood, 0, 0.6, D / 2 + 0.08, Math.PI / 2);
  for (const x of [-1.4, 1.4]) for (const z of [-0.9, 0.9]) add(cyl(0.08, 0.08, 0.06, 8), shade, x, 0.0, z);
  finish(HEIGHT);
