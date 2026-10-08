  // b: lathe. Glass with a waisted profile and thick base (a fluted 10-sided lathe), salt filling the lower half, a
  // lathe dome cap with a rolled skirt.
  const glass = M(0xd8eef0, 0.05, 0, undefined, { transparent: true, opacity: 0.42, depthWrite: false, side: DS });
  const salt = M(0xf8f8f4, 0.9), steel = M(C.steel, 0.3, 0.55, 'metal'), hole = M(0x333333, 0.8);
  add(lathe([[0, 0], [0.28, 0], [0.31, 0.04], [0.29, 0.3], [0.27, 0.5], [0.26, 0.6], [0.24, 0.62]], 10), glass);
  add(lathe([[0, 0.06], [0.26, 0.06], [0.27, 0.3], [0.255, 0.4], [0, 0.42]], 10), salt);
  add(sLathe([[0.26, 0.58], [0.27, 0.6], [0.27, 0.7], [0.24, 0.8], [0.15, 0.87], [0.0, 0.89]], 18, 2), steel);
  for (let i = 0; i < 7; i++) { const a = i / 6 * Math.PI * 2, r = i ? 0.1 : 0; add(sph(0.025, 6, 4), hole, Math.cos(a) * r, 0.88 - r * 0.15, Math.sin(a) * r); }
  finish(HEIGHT);
