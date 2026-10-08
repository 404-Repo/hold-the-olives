  // b: lathe. The loaf is a revolved oval profile laid along x and squashed to a flat-bottomed bloomer; slash ridges are
  // short lathe ribs; the cut end is a crumb disc; slices are thin lathes (crust ring) with crumb faces.
  const crust = M(C.crust, 0.65), crumb = M(C.crumb, 0.85), slash = M(0xe6bf72, 0.7);
  const loaf = grp(-0.25, 0, 0);
  const prof = [[0, -1.0], [0.25, -0.98], [0.45, -0.85], [0.55, -0.55], [0.58, 0], [0.58, 0.95], [0.0, 0.95]];
  const lg = sLathe(prof.slice(0, 6), 18, 3); const L = add(lg, crust, 0, 0.0, 0, 0, 0, -Math.PI / 2, loaf); L.scale.set(1, 1, 1);
  L.position.y = 0.45; loaf.scale.set(1, 0.82, 1.0);
  add(new THREE.CircleGeometry(0.56, 18), crumb, 0.955, 0.45, 0, 0, Math.PI / 2, 0, loaf);
  for (let i = 0; i < 4; i++) add(cyl(0.07, 0.07, 0.8, 6), slash, -0.62 + i * 0.4, 1.0, 0, Math.PI / 2, 0.5, 0, loaf).scale.set(1, 1, 0.5);
  const slice = (x, y, z, rx, ry) => { const s = grp(x, y, z, rx, ry, 0);
    add(cyl(0.55, 0.55, 0.12, 18, true), M(C.crust, 0.65, 0, undefined, { side: DS }), 0, 0, 0, 0, 0, 0, s).scale.set(1, 1, 0.82);
    add(cyl(0.53, 0.53, 0.12, 18), crumb, 0, 0, 0, 0, 0, 0, s).scale.set(1, 1, 0.82); };
  slice(1.25, 0.07, 0.25, 0, 0.3); slice(1.55, 0.2, 0.4, 0.0, 0.5);
  finish(HEIGHT);
