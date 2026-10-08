  // a: primitives. Wooden disc base, dowel with ball knob, white roll with visible core, a hanging loose sheet.
  const wood = M(C.block, 0.55, 0, 'timber'), paper = M(0xfbfaf4, 0.85, 0, 'fabric'), core = M(0xb8956a, 0.8), paperD = M(0xfbfaf4, 0.85, 0, 'fabric', { side: DS });
  add(cyl(0.8, 0.85, 0.16, 22), wood, 0, 0.08, 0);
  add(cyl(0.08, 0.08, 2.55, 10), wood, 0, 1.4, 0);
  add(sph(0.15, 10, 8), wood, 0, 2.7, 0);
  add(cyl(0.62, 0.62, 2.3, 22), paper, 0, 1.33, 0);
  add(cyl(0.2, 0.2, 2.32, 14), core, 0, 1.33, 0);
  for (const y of [0.6, 1.2, 1.8]) add(new THREE.TorusGeometry(0.625, 0.008, 3, 22), M(0xe4e0d4, 0.9), 0, y, 0, Math.PI / 2);
  // loose sheet: a curved panel peeling off the front and hanging down
  const sheet = new THREE.CylinderGeometry(0.64, 0.64, 1.9, 8, 1, true, 0, Math.PI / 2.5);
  add(sheet, paperD, 0, 1.38, 0, 0, -0.3, 0);
  add(rbox(0.7, 1.3, 0.02, 0.01), paper, 0.28, 0.9, 0.7, -0.12, 0.35, 0);
  finish(HEIGHT);
