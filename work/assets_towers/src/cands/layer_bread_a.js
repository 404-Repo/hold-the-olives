  // PRIMITIVES: a box for the lower slice, a squashed cylinder for the dome, the crumb face as thinner copies on top
  const body = grp(g);
  const crust = M(C.crust, { r: 0.6 }), crumb = M(C.crumb, { r: 0.85 });
  const part = (sx, h, y, mat) => {
    add(new THREE.BoxGeometry(1.1 * sx, h, 0.62 * sx), mat, [0, y + h / 2, 0.24 * sx], body);
    add(new THREE.CylinderGeometry(0.55 * sx, 0.55 * sx, h, 28), mat, [0, y + h / 2, -0.1 * sx], body, null, [1, 1, 0.82]);
    for (const s of [-1, 1]) add(new THREE.CylinderGeometry(0.16 * sx, 0.16 * sx, h, 14), mat, [s * 0.44 * sx, y + h / 2, -0.12 * sx], body);
  };
  part(1, 0.15, 0, crust);
  part(0.86, 0.02, 0.14, crumb);
  // rounded bottom edge read: a slightly smaller darker base
  part(0.97, 0.02, -0.01, M(0xb57a34, { r: 0.6 }));
  fitH(body, 0.16);
