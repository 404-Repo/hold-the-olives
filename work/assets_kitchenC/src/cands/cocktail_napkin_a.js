  // PRIMITIVES: a thin bevelled square of linen, a sage border band inset just proud of the surface, a faint quarter-fold crease cross
  const body = grp(g);
  add(rbox(1.3, 0.04, 1.3, 0.015), linen(0xf4efe2), [0, 0, 0], body);
  const ring = new THREE.Shape(); rrect(1.16, 1.16, 0.03, ring); ring.holes.push(rrectPath(1.0, 1.0, 0.02));
  add(slab(ring, 0.006), M(C.sage, { r: 0.8, name: 'fabric' }), [0, 0.04, 0], body);
  for (const r of [0, PI / 2]) add(new THREE.BoxGeometry(1.0, 0.004, 0.012), linen(0xe2dac6), [0, 0.042, 0], body, [0, r, 0]);
  fitAll(body, 0.05);
