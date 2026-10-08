  // B: extrude + lathe. A square, round-cornered bottle body extruded upward (like the reference), a swept shoulder and
  // neck, golden oil as a smaller extrusion, the cork a named group pivoting at its base, a flat band around the square
  // body with stern eyes on the front and an olive branch on the back, stubby feet.
  const glass = M(0xd8eef0, { t: 0.32, r: 0.05 }), glassRim = M(0xd8eef0, { t: 0.5, r: 0.05 }), oil = M(0xd9b23a, { t: 0.7, r: 0.08 });
  const cork = M(0xc9a06a, { r: 0.85 }), leaf = M(0x86b84a, { r: 0.35 }), limb = M(0x7f9a2a, { r: 0.28 });
  const rr = (w, r) => { const s = new THREE.Shape(), h = w / 2; s.moveTo(-h + r, -h); s.lineTo(h - r, -h); s.quadraticCurveTo(h, -h, h, -h + r); s.lineTo(h, h - r); s.quadraticCurveTo(h, h, h - r, h); s.lineTo(-h + r, h); s.quadraticCurveTo(-h, h, -h, h - r); s.lineTo(-h, -h + r); s.quadraticCurveTo(-h, -h, -h + r, -h); return s; };
  const W = 1.05, y0 = 0.3, yS = 2.0, Rn = 0.2, yN = 2.95;
  const bodyG = new THREE.ExtrudeGeometry(rr(W, 0.2), { depth: yS - y0, bevelEnabled: false, curveSegments: 4 }); bodyG.rotateX(-PI / 2);
  add(bodyG, glass, [0, y0, 0]);
  const oilG = new THREE.ExtrudeGeometry(rr(W - 0.08, 0.17), { depth: yS - y0 - 0.06, bevelEnabled: false, curveSegments: 4 }); oilG.rotateX(-PI / 2);
  add(oilG, oil, [0, y0 + 0.04, 0]);
  add(lathe([[0.72, 0], [0.5, 0.22], [0.3, 0.4], [Rn, 0.52], [Rn, 0.95], [Rn + 0.05, 0.97], [Rn + 0.05, 1.0]], 18), glass, [0, yS, 0], g, null, [1, 1, 1]);
  add(lathe([[0, 0], [0.68, 0], [0.45, 0.2], [0.26, 0.36], [0, 0.36]], 18), oil, [0, yS - 0.01, 0]);
  add(new THREE.TorusGeometry(Rn + 0.03, 0.035, 6, 20), glassRim, [0, yN, 0], g, [PI / 2, 0, 0]);
  const bandG = new THREE.ExtrudeGeometry(rr(W + 0.05, 0.22), { depth: 0.5, bevelEnabled: false, curveSegments: 4 }); bandG.rotateX(-PI / 2);
  add(bandG, M(0x4f7a2a, { r: 0.35 }), [0, 1.2, 0]);
  for (const sd of [-1, 1]) { const e = grp(g, [sd * 0.22, 1.47, (W + 0.05) / 2 + 0.005]); add(new THREE.SphereGeometry(0.15, 14, 10), M(0xffffff, { r: 0.2 }), [0, 0, 0], e, null, [1, 0.55, 0.2]); add(new THREE.SphereGeometry(0.075, 12, 8), M(0x161616, { r: 0.2 }), [sd * -0.015, -0.01, 0.025], e, null, [1, 1, 0.25]); add(new THREE.SphereGeometry(0.02, 6, 4), M(0xffffff, { e: 0xffffff, ei: 0.6 }), [-0.035, 0.02, 0.04], e); const b = add(new THREE.BoxGeometry(0.34, 0.06, 0.03), M(0x1f2a12, { r: 0.4 }), [0, 0.085, 0.02], e); b.rotation.z = sd * 0.18; }
  // the olive branch: on the back and both sides of the band
  for (const [face, rot] of [[[0, -1], PI], [[1, 0], PI / 2], [[-1, 0], -PI / 2]]) {
    const fg = grp(g, [face[0] * ((W + 0.05) / 2 + 0.01), 1.45, face[1] * ((W + 0.05) / 2 + 0.01)]); fg.rotation.y = rot;
    add(new THREE.CylinderGeometry(0.018, 0.018, 0.75, 5), M(0x6b4a32, { r: 0.6 }), [0, 0, 0], fg, [0, 0, PI / 2 - 0.15]);
    for (let i = 0; i < 6; i++) { const x = -0.3 + i * 0.12, lf = grp(fg, [x, 0.04 * (x / 0.3) * -1, 0]); lf.rotation.z = (i % 2 ? 1 : -1) * 0.8; add(new THREE.SphereGeometry(0.09, 8, 5), leaf, [0, 0.07, 0.01], lf, null, [0.38, 1, 0.2]); }
    add(new THREE.SphereGeometry(0.055, 8, 6), M(0x2a3a1a, { r: 0.25 }), [0.12, -0.09, 0.03], fg, null, [0.85, 1, 0.6]);
  }
  const ck = grp(g, [0, yN - 0.1, 0], 'cork'); g.userData.cork = ck; g.userData.joints = { cork: ck };
  add(lathe([[0, 0], [Rn - 0.02, 0], [Rn + 0.04, 0.3], [Rn + 0.05, 0.34], [Rn + 0.03, 0.37], [0, 0.375]], 16), cork, [0, 0, 0], ck);
  for (const sd of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.14, 0.16, 0.3, 12), limb, [sd * 0.28, 0.17, 0]);
    add(new THREE.SphereGeometry(0.2, 12, 6, 0, TAU, 0, PI / 2), limb, [sd * 0.3, 0, 0.08], g, null, [1, 0.75, 1.35]);
  }
