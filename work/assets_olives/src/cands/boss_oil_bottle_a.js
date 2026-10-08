  // A: primitives. A round cylinder bottle with a sphere-cap shoulder and cylinder neck, golden oil inside, the cork a
  // named group pivoting at its base, an olive-branch colour band (leaf ellipsoids + two olives) with stern eyes, feet.
  const glass = M(0xd8eef0, { t: 0.32, r: 0.05 }), glassRim = M(0xd8eef0, { t: 0.5, r: 0.05 }), oil = M(0xd9b23a, { t: 0.7, r: 0.08 });
  const cork = M(0xc9a06a, { r: 0.85 }), band = M(0x4f7a2a, { r: 0.35 }), leaf = M(0x86b84a, { r: 0.35 }), limb = M(0x7f9a2a, { r: 0.28 });
  const R = 0.58, y0 = 0.3, yS = 2.05, Rn = 0.2, yN = 2.95;
  add(new THREE.CylinderGeometry(R, R, yS - y0, 26, 1, true), glass, [0, (y0 + yS) / 2, 0]);
  add(new THREE.CylinderGeometry(R, R, 0.1, 26), glassRim, [0, y0 + 0.05, 0]);
  add(new THREE.CylinderGeometry(Rn, R, 0.5, 26, 1, true), glass, [0, yS + 0.25, 0]);
  add(new THREE.CylinderGeometry(Rn, Rn, yN - yS - 0.5, 18, 1, true), glass, [0, (yS + 0.5 + yN) / 2, 0]);
  add(new THREE.TorusGeometry(Rn + 0.02, 0.04, 6, 20), glassRim, [0, yN - 0.03, 0], g, [PI / 2, 0, 0]);
  add(new THREE.CylinderGeometry(R - 0.04, R - 0.04, yS - y0 - 0.1, 24), oil, [0, (y0 + yS) / 2, 0]);
  add(new THREE.CylinderGeometry(Rn + 0.06, R - 0.04, 0.35, 24), oil, [0, yS + 0.175, 0]);
  add(new THREE.CylinderGeometry(R + 0.02, R + 0.02, 0.55, 26, 1, true), M(0x4f7a2a, { r: 0.35, ds: true }), [0, 1.45, 0]);
  for (const sd of [-1, 1]) bandEye(g, R + 0.03, 1.47, sd * 0.42, 0.15, sd, { h: 0.55, browTilt: 0.18, browY: 0.5 });
  // the olive branch wraps the back of the band: a stem tube with leaves and two dark olives
  const stem = []; for (let i = 0; i <= 12; i++) { const a = PI * 0.45 + i / 12 * PI * 1.1; stem.push(V(Math.sin(a) * (R + 0.04), 1.45 + Math.sin(i * 0.9) * 0.08, Math.cos(a) * (R + 0.04))); }
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(stem), 30, 0.02, 4, false), M(0x6b4a32, { r: 0.6 }));
  for (let i = 1; i < 12; i += 1.5) { const p = stem[Math.floor(i)], a = Math.atan2(p.x, p.z), lf = grp(g, [p.x * 1.01, p.y, p.z * 1.01]); lf.rotation.set(0, a, (i % 3 ? 1 : -1) * 0.9); add(new THREE.SphereGeometry(0.1, 8, 5), leaf, [0, 0.07, 0.01], lf, null, [0.38, 1, 0.2]); }
  for (const i of [4, 9]) { const p = stem[i]; add(new THREE.SphereGeometry(0.06, 8, 6), M(0x2a3a1a, { r: 0.25 }), [p.x * 1.04, p.y - 0.08, p.z * 1.04], g, null, [0.85, 1, 0.85]); }
  const ck = grp(g, [0, yN - 0.12, 0], 'cork'); g.userData.cork = ck; g.userData.joints = { cork: ck };
  add(new THREE.CylinderGeometry(Rn + 0.05, Rn - 0.02, 0.36, 18), cork, [0, 0.18, 0], ck);
  add(new THREE.CylinderGeometry(Rn + 0.05, Rn + 0.05, 0.015, 18), M(0xa77d4c, { r: 0.9 }), [0, 0.36, 0], ck);
  for (const sd of [-1, 1]) {
    add(new THREE.CylinderGeometry(0.14, 0.16, 0.3, 12), limb, [sd * 0.28, 0.17, 0]);
    add(new THREE.SphereGeometry(0.2, 12, 6, 0, TAU, 0, PI / 2), limb, [sd * 0.3, 0, 0.08], g, null, [1, 0.75, 1.35]);
  }
