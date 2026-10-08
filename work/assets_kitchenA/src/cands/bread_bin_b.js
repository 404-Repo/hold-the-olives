  // b: extruded side profile (back straight, flat top, big curved front) swept along x; door as an extruded arc band.
  const cream = M(C.cream, 0.32), wood = M(C.block, 0.6, 0, 'timber'), shade = M(0xe0d5bc, 0.4);
  const D = 2.2, Hb = 2.1, R = 1.25, W = 3.3, pts = [];
  pts.push([-D / 2, 0], [D / 2, 0], [D / 2, Hb - R]);
  for (let i = 1; i <= 10; i++) { const a = (i / 10) * Math.PI / 2; pts.push([D / 2 - R + Math.cos(a) * R, Hb - R + Math.sin(a) * R]); }
  pts.push([-D / 2, Hb]);
  add(ext(pts, W, 0.12), cream, 0, 0, 0, 0, -Math.PI / 2, 0);
  // door band: arc outline of thickness t, from y=0.35 up over the curve to the top
  const t = 0.07, o = [], inn = [];
  o.push([D / 2 + t, 0.38]); inn.push([D / 2 - 0.0, 0.38]);
  for (let i = 0; i <= 10; i++) { const a = (i / 10) * Math.PI / 2; o.push([D / 2 - R + Math.cos(a) * (R + t), Hb - R + Math.sin(a) * (R + t)]); inn.push([D / 2 - R + Math.cos(a) * R, Hb - R + Math.sin(a) * R]); }
  add(ext(o.concat(inn.reverse()), W - 0.36, 0.02), M(0xf6efe0, 0.28), 0, 0, 0, 0, -Math.PI / 2, 0);
  add(rbox(W - 0.3, 0.13, 0.2, 0.06), shade, 0, 0.36, D / 2 + 0.06);
  add(sph(0.2, 12, 10), wood, 0, 0.7, D / 2 + 0.2).scale.set(1, 1, 0.75);
  add(rbox(W + 0.04, 0.1, D + 0.04, 0.05), shade, 0, 0.05, 0);
  finish(HEIGHT);
