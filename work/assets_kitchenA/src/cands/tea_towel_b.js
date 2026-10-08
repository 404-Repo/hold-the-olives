  // b: extrude. The folded cross-section (an S-fold: base layer, fold-over with a soft bulge, top layer that runs
  // forward and droops to the counter) swept along x in segments that alternate linen and blue: the stripes are real bands.
  const lin = M(C.linen, 0.9, 0, 'fabric'), blu = M(C.stripe, 0.85, 0, 'fabric');
  // section in (z, y)
  const sec = [];
  const T = 0.035;
  sec.push([-0.62, 0], [0.55, 0], [0.62, 0.02]);
  for (let i = 0; i <= 6; i++) { const a = -Math.PI / 2 + i / 6 * Math.PI; sec.push([0.6 + Math.cos(a) * 0.045, 0.045 + Math.sin(a) * 0.045]); }
  sec.push([-0.5, 0.09], [-0.6, 0.095]);
  for (let i = 0; i <= 5; i++) { const a = Math.PI / 2 + i / 5 * Math.PI; sec.push([-0.6 + Math.cos(a) * 0.03, 0.115 + Math.sin(a) * 0.0]); }
  // top layer
  const top = [[-0.62, 0.09], [0.4, 0.09], [0.62, 0.075], [0.72, 0.03], [0.85, 0.0], [1.0, 0.0], [1.0, T], [0.86, T], [0.74, 0.065], [0.63, 0.11], [0.4, 0.12], [-0.62, 0.12], [-0.66, 0.105]];
  const bands = [[-0.95, -0.66, lin], [-0.66, -0.58, blu], [-0.58, -0.5, lin], [-0.5, -0.42, blu], [-0.42, 0.42, lin], [0.42, 0.5, blu], [0.5, 0.58, lin], [0.58, 0.66, blu], [0.66, 0.95, lin]];
  for (const [x0, x1, m] of bands) {
    add(ext(sec, x1 - x0, 0), lin, (x0 + x1) / 2, 0, 0, 0, -Math.PI / 2, 0);
    add(ext(top, x1 - x0, 0), m, (x0 + x1) / 2, 0, 0, 0, -Math.PI / 2, 0);
  }
  finish(HEIGHT);
