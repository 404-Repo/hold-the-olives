  // EXTRUDE: the bread outline swept up with a soft bevel for the crust, a raised bevelled crumb face inset on top
  const body = grp(g);
  const bs = 0.035;
  add(slab(breadShape(1.1 - 2 * bs, 1.1 - 2 * bs), 0.15, 0.035, bs, 8, 3), M(C.crust, { r: 0.55 }), [0, 0, 0], body);
  add(slab(breadShape(0.92, 0.9), 0.03, 0.012, 0.012, 8, 2), M(C.crumb, { r: 0.85 }), [0, 0.13, 0.005], body);
  // a toasted band just inside the rim so the crust reads as a ring from above
  add(slab(breadShape(1.0, 0.99), 0.022, 0.008, 0.01, 8, 1), M(0xd99a4c, { r: 0.6 }), [0, 0.128, 0.002], body);
  fitH(body, 0.16);
