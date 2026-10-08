  // DIFFERENT BREAKDOWN: a crust RING (outline with the crumb outline as a hole) and a puffy crumb PILLOW sitting in it
  const body = grp(g);
  const bs = 0.03, outer = breadShape(1.1 - 2 * bs, 1.1 - 2 * bs);
  outer.holes.push(breadShape(0.9, 0.89, new THREE.Path()));
  add(slab(outer, 0.16, 0.03, bs, 8, 3), M(C.crust, { r: 0.55 }), [0, 0, 0], body);
  // the pillow: heavy bevel so the crumb domes softly up to just under the rim
  add(slab(breadShape(0.86, 0.85), 0.145, 0.04, 0.03, 8, 4), M(C.crumb, { r: 0.85 }), [0, 0.005, 0.003], body);
  fitH(body, 0.16);
