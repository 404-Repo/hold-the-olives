  // DIFFERENT READING: a low open rack: a deep sage tray, a short wire basket (one top rail loop, sparse uprights) with the plates leaning back in a fan
  // against a tall rear rail, and the two mugs hung upside down on a steel peg tree standing at one end
  const body = grp(g);
  const tray = M(0x9cc7b4, { r: 0.4 }), trayD = M(0x86b8a8, { r: 0.45 }), st = metal(C.steel, 0.25), cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  const W = 4.6, D = 3.0, y0 = 0.38;
  add(rbox(W + 0.3, 0.38, D + 0.3, 0.14), tray, [0, 0, 0], body);
  add(new THREE.BoxGeometry(W - 0.1, 0.02, D - 0.1), trayD, [0, 0.38, 0], body);
  const loop = (w, d, r, y) => { const pts = []; for (let i = 0; i < 4; i++) { const cx = (i === 0 || i === 3 ? 1 : -1) * (w / 2 - r), cz = (i < 2 ? 1 : -1) * (d / 2 - r); for (let k = 0; k <= 3; k++) { const a = (i * 0.5 + k / 6) * PI; pts.push([cx + r * Math.cos(a), y, cz + r * Math.sin(a)]); } } return pts; };
  tube(loop(W - 0.2, D - 0.2, 0.3, y0 + 0.7), 0.055, st, body, 48, 6, true);
  tube(loop(W - 0.2, D - 0.2, 0.3, y0 + 0.05), 0.05, st, body, 48, 6, true);
  for (let i = 0; i <= 9; i++) { const x = -W / 2 + 0.3 + (W - 0.6) * i / 9; for (const z of [-(D / 2 - 0.1), D / 2 - 0.1]) rod([x, y0 + 0.05, z], [x, y0 + 0.7, z], 0.04, st, body, 6); }
  for (let i = 0; i < 6; i++) { const x = -2.0 + i * 0.3; rod([x, y0 + 0.05, -D / 2 + 0.1], [x, y0 + 1.6, -D / 2 + 0.1], 0.045, st, body, 6); }
  rod([-2.1, y0 + 1.6, -D / 2 + 0.1], [-0.4, y0 + 1.6, -D / 2 + 0.1], 0.055, st, body, 6);
  for (let i = 0; i < 9; i++) rod([-2.0 + i * 0.2, y0 + 0.05, 0.7], [-2.0 + i * 0.2, y0 + 0.45, 0.7], 0.04, st, body, 6);
  const pg = lathe([[0, 0.12], [0.85, 0.12], [0.95, 0.13], [1.0, 0.16], [1.12, 0.205], [1.3, 0.235], [1.345, 0.245], [1.35, 0.23], [1.32, 0.205], [1.1, 0.16], [0.95, 0.07], [0.82, 0.045], [0.8, 0], [0.7, 0], [0.68, 0.04], [0, 0.04]], 28);
  for (let i = 0; i < 3; i++) { const p = grp(body, [-1.7 + i * 0.5, y0 + 0.98, -0.1 - i * 0.05], null, [-0.35 + i * 0.1, 0, -PI / 2 + 0.05]); p.rotation.order = 'YXZ'; p.scale.setScalar(0.74); add(pg, cer, [0, 0, 0], p); add(new THREE.TorusGeometry(1.21, 0.02, 4, 28), sage, [0, 0.23, 0], p, [PI / 2, 0, 0]); }
  rod([1.5, y0, 0], [1.5, y0 + 1.5, 0], 0.06, st, body, 8);
  const mug = lathe([[0.3, 0], [0.36, 0], [0.38, 0.03], [0.38, 0.85], [0.35, 0.88], [0.32, 0.86], [0.32, 0.06], [0, 0.06]], 20);
  for (const s of [-1, 1]) {
    rod([1.5, y0 + 1.3, 0], [1.5, y0 + 1.2, s * 0.55], 0.04, st, body, 6);
    const m = grp(body, [1.5, y0 + 1.25, s * 0.75], null, [PI - s * 0.5, 0, 0]);
    add(mug, M(C.cream, { r: 0.2, ds: true }), [0, 0, 0], m);
    add(new THREE.TorusGeometry(0.22, 0.06, 6, 12, PI), cer, [0.38, 0.45, 0], m, [0, 0, -PI / 2]);
  }
  fitAll(body, 2.4);
