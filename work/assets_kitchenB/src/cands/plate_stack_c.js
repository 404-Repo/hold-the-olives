  // DIFFERENT READING: thick diner plates (chunky lathe, wide flat rim with a rolled edge), stacked a little askew and fanned so each rim shows,
  // sage line painted as a raised band on the rim top
  const body = grp(g);
  const cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  const pg = lathe([[0, 0.06], [0.8, 0.06], [0.9, 0.1], [0.98, 0.17], [1.3, 0.2], [1.36, 0.19], [1.37, 0.16], [1.32, 0.14], [1.0, 0.11], [0.88, 0.03], [0.78, 0], [0, 0]], 36);
  const sg = new THREE.TorusGeometry(1.15, 0.022, 4, 36);
  for (let i = 0; i < 5; i++) {
    const a = i * 1.3, p = grp(body, [Math.cos(a) * 0.06, i * 0.19, Math.sin(a) * 0.06], null, [0.02 * Math.sin(a), a, 0.02 * Math.cos(a)]);
    add(pg, cer, [0, 0, 0], p); add(sg, sage, [0, 0.195, 0], p, [PI / 2, 0, 0], [1, 1, 0.5]);
  }
  fitAll(body, 1.0);
