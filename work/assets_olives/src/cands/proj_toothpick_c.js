  // C: a different reading. A flat-sided birch pick (like the reference): a box squeezed to points at both ends by
  // moving its vertices, with a darker bevel stripe, lying along Z.
  const wood = M(0xe8cfa0, { r: 0.6, name: 'timber' }), L = 0.6, w = 0.04, h = 0.022;
  const geo = new THREE.BoxGeometry(w, h, L, 2, 2, 16), pa = geo.attributes.position;
  for (let i = 0; i < pa.count; i++) { const z = pa.getZ(i), u = Math.abs(z) / (L / 2), k = u < 0.7 ? 1 : Math.max(0.03, (1 - u) / 0.3); pa.setX(i, pa.getX(i) * k); pa.setY(i, pa.getY(i) * Math.max(0.25, k)); }
  geo.computeVertexNormals(); add(geo, wood, [0, h / 2, 0]);
  add(new THREE.BoxGeometry(w * 0.3, h * 0.2, L * 0.62), M(0xcfae78, { r: 0.7, name: 'timber' }), [0, h * 1.0, 0]);
