  // c: different breakdown: half-drum (half cylinder lying along x) on a flat plinth, the whole front half is
  // the roll door with three ribs, end discs as caps; wooden knob low on the door.
  const cream = M(C.cream, 0.32), wood = M(C.block, 0.6, 0, 'timber'), shade = M(0xe0d5bc, 0.4);
  const W = 3.3, R = 1.25;
  const drum = new THREE.CylinderGeometry(R, R, W, 24, 1, false, -Math.PI / 2, Math.PI); drum.rotateZ(Math.PI / 2);
  add(drum, cream, 0, 0.5, 0).scale.set(1, 1.35, 0.9);
  add(rbox(W, 0.55, 2 * R * 0.9, 0.12), cream, 0, 0.27, 0);
  for (const x of [-W / 2, W / 2]) { const e = add(cyl(R + 0.05, R + 0.05, 0.1, 24), shade, x, 0.5, 0, 0, 0, Math.PI / 2); e.scale.set(1.35, 1, 0.92); }
  for (const a of [0.35, 0.75, 1.15]) add(new THREE.TorusGeometry(R + 0.01, 0.025, 4, 18, Math.PI / 2 - 0.2), shade, 0, 0.5, 0, 0, Math.PI / 2, 0).scale.set(1, 1.35, 0.9 * (1 + 0 * a));
  add(sph(0.2, 12, 10), wood, 0, 0.75, R * 0.9 + 0.15);
  add(rbox(W + 0.2, 0.1, 2 * R * 0.9 + 0.2, 0.05), shade, 0, 0.05, 0);
  finish(HEIGHT);
