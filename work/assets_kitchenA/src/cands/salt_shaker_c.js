  // c: different reading: a round-bellied glass shaker (sphere body, short neck) with a flat-topped steel cylinder cap.
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.4, depthWrite: false, side: DS });
  const salt = M(0xf8f8f4, 0.9), steel = M(C.steel, 0.3, 0.55, 'metal'), hole = M(0x333333, 0.8);
  add(sph(0.33, 16, 12), glass, 0, 0.33, 0);
  add(new THREE.SphereGeometry(0.3, 16, 8, 0, Math.PI * 2, Math.PI * 0.45, Math.PI * 0.55), salt, 0, 0.34, 0);
  add(cyl(0.18, 0.18, 0.14, 16, true), glass, 0, 0.68, 0);
  add(cyl(0.2, 0.2, 0.18, 18), steel, 0, 0.8, 0);
  for (let i = 0; i < 7; i++) { const a = i / 6 * Math.PI * 2, r = i ? 0.09 : 0; add(cyl(0.02, 0.02, 0.01, 6), hole, Math.cos(a) * r, 0.895, Math.sin(a) * r); }
  finish(HEIGHT);
