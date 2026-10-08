  // TUBES AND PROFILES: tray = extruded rounded rectangle with a raised rim (annulus slab) and a spout; the basket = closed rounded-rectangle wire loops
  // (TubeGeometry) at three heights, U-shaped cross wires running down one side, under and up the other, a sine-wave plate divider;
  // plates and mugs as lathes
  const body = grp(g);
  const tray = M(0x9cc7b4, { r: 0.4 }), st = metal(C.steel, 0.25), cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  const W = 4.4, D = 3.0, y0 = 0.36, rh = 1.3, wr = 0.045;
  add(slab(rrect(W + 0.2, D + 0.2, 0.4), 0.12, 0.04, 0.04, 6), tray, [0, 0, 0], body);
  const rim = rrect(W + 0.5, D + 0.5, 0.5); rim.holes.push(rrectPath(W + 0.1, D + 0.1, 0.35));
  add(slab(rim, 0.3, 0.05, 0.04, 6), tray, [0, 0, 0], body);
  add(rbox(0.5, 0.12, 0.4, 0.05), tray, [W / 2 + 0.35, 0.12, D / 2 - 0.5], body);
  const loop = (w, d, r, y) => { const pts = []; for (let i = 0; i < 4; i++) { const cx = (i === 0 || i === 3 ? 1 : -1) * (w / 2 - r), cz = (i < 2 ? 1 : -1) * (d / 2 - r); for (let k = 0; k <= 3; k++) { const a = (i * 0.5 + k / 6) * PI; pts.push([cx + r * Math.cos(a), y, cz + r * Math.sin(a)]); } } return pts; };
  for (const y of [y0, y0 + 0.65, y0 + rh]) tube(loop(W, D, 0.3, y), 0.055, st, body, 48, 6, true);
  for (let i = 0; i <= 10; i++) { const x = -W / 2 + 0.2 + (W - 0.4) * i / 10; tube([[x, y0 + rh, -D / 2], [x, y0 + 0.1, -D / 2], [x, y0 - 0.04, -D / 2 + 0.25], [x, y0 - 0.04, D / 2 - 0.25], [x, y0 + 0.1, D / 2], [x, y0 + rh, D / 2]], wr, st, body, 20, 5); }
  for (let i = 0; i <= 5; i++) { const z = -D / 2 + 0.25 + (D - 0.5) * i / 5; for (const s of [-1, 1]) tube([[s * W / 2, y0 + rh, z], [s * W / 2, y0 + 0.1, z], [s * (W / 2 - 0.25), y0 - 0.02, z]], wr, st, body, 8, 5); }
  for (const z of [-0.75, 0.75]) { const pts = []; for (let i = 0; i <= 40; i++) { const x = -2.0 + 2.0 * i / 40; pts.push([x, y0 + 0.35 + 0.3 * Math.cos(i / 40 * PI * 10), z]); } tube(pts, wr, st, body, 80, 5); }
  const pg = lathe([[0, 0.12], [0.85, 0.12], [0.95, 0.13], [1.0, 0.16], [1.12, 0.205], [1.3, 0.235], [1.345, 0.245], [1.35, 0.23], [1.32, 0.205], [1.1, 0.16], [0.95, 0.07], [0.82, 0.045], [0.8, 0], [0.7, 0], [0.68, 0.04], [0, 0.04]], 28);
  for (let i = 0; i < 3; i++) { const p = grp(body, [-1.6 + i * 0.4, y0 + 1.0, 0], null, [0, 0, -PI / 2 + 0.1]); p.scale.setScalar(0.74); add(pg, cer, [0, 0, 0], p); add(new THREE.TorusGeometry(1.21, 0.02, 4, 28), sage, [0, 0.23, 0], p, [PI / 2, 0, 0]); }
  const mug = lathe([[0.3, 0], [0.36, 0], [0.38, 0.03], [0.38, 0.85], [0.35, 0.88], [0.32, 0.86], [0.32, 0.06], [0, 0.06]], 20);
  for (const z of [-0.65, 0.65]) {
    const m = grp(body, [1.3, y0 + 0.95, z], null, [PI, 0, 0]);
    add(mug, M(C.cream, { r: 0.2, ds: true }), [0, 0, 0], m);
    add(new THREE.TorusGeometry(0.22, 0.06, 6, 12, PI), cer, [0.38, 0.45, 0], m, [0, 0, -PI / 2]);
    rod([1.3, y0, z], [1.3, y0 + 0.55, z], 0.05, st, body, 6);
  }
  fitAll(body, 2.4);
