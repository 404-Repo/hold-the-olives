  // a: primitives. Octagonal glass body, white salt column inside, steel collar and dome cap with hole dots.
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.4, depthWrite: false, side: DS });
  const salt = M(0xf8f8f4, 0.9), steel = M(C.steel, 0.3, 0.55, 'metal'), hole = M(0x333333, 0.8);
  add(cyl(0.27, 0.3, 0.6, 8, true), glass, 0, 0.32, 0);
  add(cyl(0.3, 0.3, 0.04, 8), glass, 0, 0.02, 0);
  add(cyl(0.24, 0.26, 0.38, 8), salt, 0, 0.23, 0);
  add(cyl(0.25, 0.25, 0.1, 18), steel, 0, 0.66, 0);
  add(new THREE.SphereGeometry(0.25, 18, 6, 0, Math.PI * 2, 0, Math.PI / 2), steel, 0, 0.7, 0).scale.set(1, 0.7, 1);
  for (let i = 0; i < 7; i++) { const a = i / 6 * Math.PI * 2, r = i ? 0.1 : 0; add(cyl(0.025, 0.025, 0.02, 6), hole, Math.cos(a) * r, 0.87 - r * 0.25, Math.sin(a) * r); }
  finish(HEIGHT);
