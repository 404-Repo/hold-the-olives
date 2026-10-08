  // c: different reading: a cream crock with a sage band, utensils fanned wide like a bouquet (more silhouette from above).
  const cream = M(C.cream, 0.45, 0, undefined, { side: DS }), sage = M(C.sage, 0.45), wood = M(C.block, 0.55, 0, 'timber'), steel = M(C.steel, 0.3, 0.55, 'metal');
  add(sLathe([[0, 0.02], [0.52, 0.0], [0.58, 0.06], [0.6, 1.2], [0.64, 1.3], [0.56, 1.32], [0.54, 1.0], [0, 1.0]], 20, 2), cream);
  add(cyl(0.615, 0.615, 0.28, 20, true), M(C.sage, 0.45, 0, undefined, { side: DS }), 0, 0.85, 0);
  const fan = [[-0.55, 0.15, 'spoon'], [-0.2, -0.25, 'whisk'], [0.15, 0.2, 'spoon'], [0.3, -0.2, 'ladle'], [0.55, 0.1, 'spat']];
  fan.forEach(([lean, zz, kind], i) => {
    const u = grp(lean * 0.4, 0.95, zz * 0.8, zz * 0.5, 0, -lean * 0.6);
    if (kind === 'spoon') { add(cyl(0.05, 0.06, 1.25, 8), wood, 0, 0.62, 0, 0, 0, 0, u); add(sph(0.19, 10, 8), wood, 0, 1.4, 0, 0, 0, 0, u).scale.set(1, 1.4, 0.45); }
    if (kind === 'whisk') { add(cyl(0.06, 0.06, 0.75, 8), steel, 0, 0.38, 0, 0, 0, 0, u);
      for (let k = 0; k < 3; k++) add(new THREE.TorusGeometry(0.2, 0.016, 4, 16), steel, 0, 1.05, 0, 0, k * Math.PI / 3, 0, u).scale.set(1, 1.7, 1); }
    if (kind === 'ladle') { add(cyl(0.04, 0.04, 1.35, 8), steel, 0, 0.67, 0, 0, 0, 0, u);
      add(sph(0.24, 12, 6), steel, 0, 1.45, 0.1, 0, 0, 0, u).scale.set(1, 0.6, 1); }
    if (kind === 'spat') { add(cyl(0.05, 0.05, 0.9, 8), wood, 0, 0.45, 0, 0, 0, 0, u); add(rbox(0.36, 0.55, 0.06, 0.03), M(C.black, 0.5), 0, 1.15, 0, 0, 0, 0, u); }
  });
  finish(HEIGHT);
