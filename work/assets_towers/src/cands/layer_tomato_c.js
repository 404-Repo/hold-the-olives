  // DIFFERENT BREAKDOWN: the flesh as one extruded disc with five wedge HOLES (the walls), glossy jelly pockets sunk inside, a skin band
  const body = grp(g);
  const skin = M(C.tomato, { r: 0.18 }), flesh = M(0xec5a44, { r: 0.22 }), jelly = M(C.seed, { r: 0.08 }), pip = M(0xfbe3a0, { r: 0.3 });
  const disc = new THREE.Shape(); disc.absarc(0, 0, 0.27, 0, TAU, false);
  const n = 5;
  for (let i = 0; i < n; i++) {
    const a0 = i / n * TAU + 0.14, a1 = (i + 1) / n * TAU - 0.14, h = new THREE.Path();
    h.moveTo(Math.cos(a0) * 0.08, Math.sin(a0) * 0.08);
    h.absarc(0, 0, 0.21, a0 + 0.05, a1 - 0.05, false);
    h.lineTo(Math.cos(a1) * 0.08, Math.sin(a1) * 0.08); h.closePath(); disc.holes.push(h);
  }
  const fleshG = slab(disc, 0.055, 0.01, 0.01, 10, 2);
  const slice = (x, z, y, rot) => {
    const o = grp(body, [x, y, z], null, rot);
    add(new THREE.CylinderGeometry(0.33, 0.33, 0.05, 30, 1, true), M(C.tomato, { r: 0.18, ds: true }), [0, 0.03, 0], o);
    add(new THREE.TorusGeometry(0.31, 0.022, 6, 30), skin, [0, 0.055, 0], o, [PI / 2, 0, 0]);
    add(new THREE.CylinderGeometry(0.32, 0.32, 0.02, 30), skin, [0, 0.01, 0], o);
    add(fleshG, flesh, [0, 0.005, 0], o);
    add(new THREE.CylinderGeometry(0.22, 0.22, 0.03, 30), jelly, [0, 0.03, 0], o);
    for (let i = 0; i < n; i++) { const a = (i + 0.5) / n * TAU; for (const r of [0.12, 0.17]) add(new THREE.SphereGeometry(0.014, 6, 4), pip, [Math.cos(a) * r, 0.048, Math.sin(a) * r], o); }
  };
  slice(0, -0.25, 0, [0.04, 0.3, 0]); slice(-0.23, 0.15, 0.025, [0, 1.1, 0.06]); slice(0.23, 0.15, 0.05, [-0.03, 2.0, -0.07]);
  fitH(body, 0.12);
