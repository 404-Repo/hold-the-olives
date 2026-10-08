  // PRIMITIVES: each layer of each half a 3-sided cylinder squashed into a right triangle prism; lettuce as rows of flattened spheres along
  // the edges; tomatoes as cylinders; bacon as tilted box links; cheese as a bigger thin prism with hanging box flaps. Two halves in a V.
  const root = grp(g);
  const S = 1.25, L = S * Math.SQRT2, D = L / 2, ri = S * (2 - Math.SQRT2) / 2;
  const R = L / Math.sqrt(3);   // circumradius of the source equilateral triangle; squash z by 1/sqrt(3) for a right angle at the apex
  // a right-triangle prism: hypotenuse front (+z) at z = 0, apex back at z = -D; grow = outward growth in metres
  const prism = (h, mat, o, y, grow = 0) => {
    const k = 1 + grow / ri, m = add(new THREE.CylinderGeometry(R * k, R * k, h, 3), mat, [0, y + h / 2, -ri + (-(D / 3) * 0 + 0)], o, [0, PI, 0], [1, 1, 1 / Math.sqrt(3)]);
    // re-centre: the squashed prism's centroid sits at z = -(D/2)*... place its base edge at z = 0 relative to the incentre
    m.position.z = -D + (R * k) / Math.sqrt(3) + 0 - (k - 1) * (ri - D / 3) * 0; return m;
  };
  const toastM = M(C.toast, { r: 0.7 }), crumbM = M(C.crumb, { r: 0.85 }), turkeyM = M(C.turkey, { r: 0.5 }), turkey2 = M(0xd9aa86, { r: 0.55 });
  const letM = M(C.lettuce, { r: 0.32 }), let2 = M(C.lettuce2, { r: 0.35 }), tomM = M(C.tomato, { r: 0.12 }), tomFl = M(C.tomatoFl, { r: 0.14 });
  const baconM = M(C.bacon, { r: 0.28 }), fatM = M(C.fat, { r: 0.3 }), cheeseM = M(C.cheese, { r: 0.28 });
  const H = { l1: 0.4, l2: 0.28, l3: 0.17, l4: 0.22, l5: 0.38, l6: 0.2, l7: 0.12, l8: 0.17, l9: 0.4 };
  const halves = [{ x: -0.85, yaw: -0.35 }, { x: 0.85, yaw: 0.35 }];
  const edgePts = (n, grow) => { const k = 1 + grow / ri, P = [[-L / 2, 0], [L / 2, 0], [0, -D]].map(([x, z]) => [x * k, -ri + (z + ri) * k]), out = [];
    for (let i = 0; i < 3; i++) for (let j = 0; j < n; j++) { const A = P[i], B = P[(i + 1) % 3], t = (j + 0.5) / n; out.push([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, Math.atan2(B[1] - A[1], B[0] - A[0])]); } return out; };
  const build = {
    toast: (o, h) => { prism(h, toastM, o, 0); add(new THREE.BoxGeometry(L * 0.74, h * 0.72, 0.012), crumbM, [0, h / 2, 0.006], o); },
    turkey: (o, h) => { for (let i = 0; i < 3; i++) prism(h / 3, i % 2 ? turkey2 : turkeyM, o, i * h / 3, 0.03 - i * 0.01); },
    lettuce: (o, h) => { prism(h * 0.5, let2, o, h * 0.25, -0.02);
      edgePts(7, 0.08).forEach(([x, z, a], i) => add(new THREE.SphereGeometry(0.17, 10, 5), i % 2 ? letM : let2, [x, h * 0.5 + (i % 3) * 0.02, z], o, [0.2 * Math.sin(i), -a, 0.15 * Math.cos(i * 1.7)], [1.1, 0.28, 0.7])); },
    tomato: (o, h) => { prism(h, tomFl, o, 0, -0.06);
      for (const [x, z] of [[-0.48, -0.03], [0.48, -0.03], [0, -0.05], [-0.26, -0.47], [0.26, -0.47], [0, -0.75]]) {
        add(new THREE.CylinderGeometry(0.22, 0.22, h * 0.9, 14), tomM, [x, h * 0.45, z], o); add(new THREE.CylinderGeometry(0.18, 0.18, 0.01, 14), tomFl, [x, h * 0.9 + 0.003, z], o); } },
    bacon: (o, h) => { prism(h * 0.5, baconM, o, h * 0.2, -0.04);
      edgePts(6, 0.03).forEach(([x, z, a], i) => { const l = grp(o, [x, h * 0.45 + (i % 2 ? 0.03 : -0.03), z], null, [0, -a, (i % 2 ? 0.25 : -0.25)]);
        add(new THREE.BoxGeometry(0.26, h * 0.3, 0.12), baconM, [0, 0, 0], l); add(new THREE.BoxGeometry(0.27, h * 0.1, 0.1), fatM, [0, 0.0, 0.015], l); }); },
    cheese: (o, h) => { prism(h * 0.6, cheeseM, o, h * 0.4, 0.06);
      edgePts(2, 0.1).forEach(([x, z, a], i) => { const f = grp(o, [x, h * 0.7, z], null, [0, -a, 0]); add(new THREE.BoxGeometry(0.3, h * 0.5, 0.18), cheeseM, [0, -0.04, 0.03], f, [-0.5, 0, 0]); }); },
  };
  const kinds = { l1: 'toast', l2: 'turkey', l3: 'lettuce', l4: 'tomato', l5: 'toast', l6: 'bacon', l7: 'cheese', l8: 'lettuce', l9: 'toast' };
  const layers = {}; let y = 0;
  for (const k of ['l9', 'l8', 'l7', 'l6', 'l5', 'l4', 'l3', 'l2', 'l1']) {
    const LG = grp(root, [0, y, 0], k); layers[k] = LG;
    for (const hf of halves) build[kinds[k]](grp(LG, [hf.x, 0, 0], null, [0, hf.yaw, 0]), H[k]);
    y += H[k];
  }
  const pickM = M(C.pick, { r: 0.55 }), frM = M(C.frill, { r: 0.12 });
  for (const hf of halves) {
    const o = grp(layers.l1, [hf.x, 0, 0], null, [0, hf.yaw, 0]);
    add(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 8), pickM, [0, H.l1 - 0.45, -ri], o);
    for (let i = 0; i < 10; i++) { const a = i / 10 * TAU; add(new THREE.ConeGeometry(0.035, 0.22, 5), frM, [Math.cos(a) * 0.07, H.l1 + 0.45, -ri + Math.sin(a) * 0.07], o, [Math.sin(a) * 0.9, 0, -Math.cos(a) * 0.9]); }
    add(new THREE.SphereGeometry(0.07, 10, 6), frM, [0, H.l1 + 0.4, -ri], o);
  }
  g.userData.layers = layers;
  fitAll(root, 3.0);
