  // b: lathe profile for body and lid in one swept silhouette, tube spout curving up, tube handle arch.
  const red = M(C.red, 0.3), redD = M(C.red, 0.3, 0, undefined, { side: DS }), cream = M(C.cream, 0.45), steel = M(C.steel, 0.3, 0.55, 'metal');
  add(sLathe([[0, 0], [0.92, 0], [1.02, 0.08], [1.04, 0.35], [0.95, 0.85], [0.7, 1.18], [0.5, 1.28], [0.5, 1.33]], 24), red);
  add(sLathe([[0.53, 1.30], [0.5, 1.38], [0.3, 1.45], [0.1, 1.48], [0, 1.48]], 20), red);
  add(lathe([[0, 1.47], [0.06, 1.47], [0.06, 1.52], [0.14, 1.56], [0.14, 1.64], [0.08, 1.69], [0, 1.7]], 12), cream);
  add(new THREE.TorusGeometry(1.03, 0.035, 6, 24), steel, 0, 0.06, 0, Math.PI / 2);
  // spout: tapering lathe swept along a bent path built from two segments
  // spout: a fat curved tube rising forward from the lower body, with a flared tip
  add(tube([[0, 0.45, 0.7], [0, 0.62, 1.05], [0, 0.95, 1.3], [0, 1.22, 1.5]], 0.13, 12, 10), red);
  add(lathe([[0.1, 0], [0.14, 0.0], [0.17, 0.12], [0.13, 0.12]], 12), redD, 0, 1.18, 1.47, 0.55);
  add(tube([[0, 1.36, -0.72], [0, 1.95, -0.6], [0, 2.18, 0], [0, 1.95, 0.6], [0, 1.36, 0.72]], 0.12, 24, 8), cream);
  for (const z of [-0.72, 0.72]) add(sph(0.08, 8, 6), steel, 0, 1.32, z * 0.95);
  finish(HEIGHT);
