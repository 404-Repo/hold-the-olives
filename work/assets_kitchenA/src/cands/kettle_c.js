  // c: different reading: a wide squat pebble kettle with a big C-shaped cream handle at the back
  // and a long S-curve gooseneck spout at the front (concept 01 silhouette).
  const red = M(C.red, 0.3), cream = M(C.cream, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal');
  const body = add(sph(1.0, 24, 14), red, 0, 0.78, 0); body.scale.set(1.12, 0.8, 1.12);
  add(cyl(0.95, 0.9, 0.18, 24), red, 0, 0.09, 0);
  add(cyl(0.45, 0.5, 0.18, 20), red, 0, 1.55, 0);
  add(sph(0.16, 12, 8), cream, 0, 1.72, 0);
  add(tube([[0, 0.55, 0.95], [0, 0.85, 1.35], [0, 1.25, 1.45], [0, 1.45, 1.65]], 0.11, 16, 8), red);
  add(tube([[0, 1.45, -0.55], [0, 2.25, -0.75], [0, 2.3, -1.25], [0, 1.6, -1.45], [0, 0.85, -1.1]], 0.12, 24, 8), cream);
  add(new THREE.TorusGeometry(0.5, 0.03, 6, 20), steel, 0, 1.47, 0, Math.PI / 2);
  finish(HEIGHT);
