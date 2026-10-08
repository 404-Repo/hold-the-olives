  // PRIMITIVES: cream carcass box, two shaker doors each = a back slab + four rounded-box frame pieces around a recessed panel, copper bar handles on
  // standoffs near the bottom inner corners, a three-step crown of rounded boxes, a thin bottom rail; flat back to the wall
  const body = grp(g); g.userData.mounts = 'back';
  const cr = enamel(C.cream, 0.3), crd = M(0xe6dcc6, { r: 0.35 }), cu = M(C.copper, { r: 0.3, m: 0.5, name: 'metal' });
  const W = 4.0, H = 7.0, D = 3.2, ch = 0.4, bt = 0.12;
  add(rbox(W - 0.1, H - ch - bt, D - 0.25, 0.04), cr, [0, bt, -0.125], body);
  add(rbox(W - 0.06, bt, D - 0.2, 0.03), crd, [0, 0, -0.1], body);
  const dh = H - ch - bt - 0.16, dw = (W - 0.18) / 2;
  for (const s of [-1, 1]) {
    const dx = s * (dw / 2 + 0.03), dz = D / 2 - 0.18, yc = bt + 0.08 + dh / 2;
    add(rpanel(dw, dh, 0.08, 0.02), crd, [dx, yc, dz], body);
    add(rpanel(0.32, dh, 0.1, 0.035), cr, [dx - dw / 2 + 0.16, yc, dz + 0.05], body);
    add(rpanel(0.32, dh, 0.1, 0.035), cr, [dx + dw / 2 - 0.16, yc, dz + 0.05], body);
    add(rpanel(dw - 0.64, 0.38, 0.1, 0.035), cr, [dx, yc + dh / 2 - 0.19, dz + 0.05], body);
    add(rpanel(dw - 0.64, 0.38, 0.1, 0.035), cr, [dx, yc - dh / 2 + 0.19, dz + 0.05], body);
    const hx = dx - s * (dw / 2 - 0.2);
    rod([hx, 0.75, dz + 0.1], [hx, 0.75, dz + 0.24], 0.04, cu, body, 8); rod([hx, 1.75, dz + 0.1], [hx, 1.75, dz + 0.24], 0.04, cu, body, 8);
    rod([hx, 0.62, dz + 0.24], [hx, 1.88, dz + 0.24], 0.055, cu, body, 10);
  }
  add(rbox(W - 0.04, 0.14, D - 0.15, 0.04), cr, [0, H - ch, -0.075], body);
  add(rbox(W, 0.12, D - 0.06, 0.04), crd, [0, H - ch + 0.13, -0.03], body);
  add(rbox(W, 0.15, D, 0.05), cr, [0, H - 0.15, 0], body);
  fitWHD(body, 4.0, 7.0, 3.2);
