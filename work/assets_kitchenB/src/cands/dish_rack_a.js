  // PRIMITIVES: sage plastic tray (rounded box + darker recessed floor), wire basket of thin steel rods (bottom grid, two rails, perimeter uprights,
  // two rows of plate tines), three upright plates (dinner-plate lathe turned on its side), two mugs upside down on pegs
  const body = grp(g);
  const tray = M(0x8fbcab, { r: 0.4 }), trayD = M(0x86b8a8, { r: 0.45 }), st = metal(C.steel, 0.25), cer = M(C.cream, { r: 0.2 }), sage = M(C.sage, { r: 0.3 });
  const W = 4.4, D = 3.0, y0 = 0.32, rh = 1.3, wr = 0.04;
  add(rbox(W + 0.4, 0.3, D + 0.4, 0.1), tray, [0, 0, 0], body);
  add(new THREE.BoxGeometry(W, 0.02, D), trayD, [0, 0.3, 0], body);
  for (let i = 0; i <= 8; i++) { const z = -D / 2 + D * i / 8; rod([-W / 2, y0, z], [W / 2, y0, z], wr, st, body, 5); }
  for (let i = 0; i <= 6; i++) { const x = -W / 2 + W * i / 6; rod([x, y0 + 0.04, -D / 2], [x, y0 + 0.04, D / 2], wr, st, body, 5); }
  for (const y of [y0 + 0.6, y0 + rh]) { rod([-W / 2, y, -D / 2], [W / 2, y, -D / 2], 0.05, st, body, 6); rod([-W / 2, y, D / 2], [W / 2, y, D / 2], 0.05, st, body, 6); rod([-W / 2, y, -D / 2], [-W / 2, y, D / 2], 0.05, st, body, 6); rod([W / 2, y, -D / 2], [W / 2, y, D / 2], 0.05, st, body, 6); }
  for (let i = 0; i <= 12; i++) { const x = -W / 2 + W * i / 12; for (const z of [-D / 2, D / 2]) rod([x, y0, z], [x, y0 + rh, z], wr, st, body, 5); }
  for (let i = 0; i <= 8; i++) { const z = -D / 2 + D * i / 8; for (const x of [-W / 2, W / 2]) rod([x, y0, z], [x, y0 + rh, z], wr, st, body, 5); }
  for (let i = 0; i < 9; i++) { const x = -1.9 + i * 0.22; for (const z of [-0.75, 0.75]) rod([x, y0, z], [x, y0 + 0.65, z], wr, st, body, 5); }
  const pg = lathe([[0, 0.12], [0.85, 0.12], [0.95, 0.13], [1.0, 0.16], [1.12, 0.205], [1.3, 0.235], [1.345, 0.245], [1.35, 0.23], [1.32, 0.205], [1.1, 0.16], [0.95, 0.07], [0.82, 0.045], [0.8, 0], [0.7, 0], [0.68, 0.04], [0, 0.04]].reverse(), 20);
  for (let i = 0; i < 3; i++) { const p = grp(body, [-1.68 + i * 0.44, y0 + 1.0, 0], null, [0, 0, -PI / 2 + 0.08]); p.scale.setScalar(0.74); add(pg, cer, [0, 0, 0], p); add(new THREE.TorusGeometry(1.21, 0.02, 4, 28), sage, [0, 0.23, 0], p, [PI / 2, 0, 0]); }
  const mug = lathe([[0.3, 0], [0.36, 0], [0.38, 0.03], [0.38, 0.85], [0.35, 0.88], [0.32, 0.86], [0.32, 0.06], [0, 0.06]], 20);
  for (const z of [-0.65, 0.65]) {
    const m = grp(body, [1.3, y0 + 0.95, z], null, [PI, 0, 0]);
    add(mug, M(C.cream, { r: 0.2, ds: true }), [0, 0, 0], m);
    add(new THREE.TorusGeometry(0.22, 0.06, 6, 12, PI), cer, [0.38, 0.45, 0], m, [0, 0, -PI / 2]);
    rod([1.3, y0, z], [1.3, y0 + 0.5, z], 0.05, st, body, 6);
  }
  fitAll(body, 2.4);
