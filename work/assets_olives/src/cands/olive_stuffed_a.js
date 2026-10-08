  // A: primitives. Sphere body, the pimento a squashed red sphere in a dark lip ring on top.
  const o = olive({ H: 0.33, col: 0x8aa52e, expr: 'surprised', legH: 0.03 }, 'prim');
  const top = o.y0 + o.Hb, red = M(0xe03a2a, { r: 0.25 });
  add(new THREE.TorusGeometry(o.W * 0.16, o.W * 0.035, 6, 14), o.dark, [0, top - o.W * 0.03, 0], g, [PI / 2, 0, 0]);
  add(new THREE.SphereGeometry(o.W * 0.17, 12, 8), red, [0, top + o.W * 0.0, 0], g, null, [1, 0.62, 0.95]);
  add(new THREE.TorusGeometry(o.W * 0.07, o.W * 0.03, 5, 10), M(0xb82a1e, { r: 0.3 }), [0, top + o.W * 0.1, 0], g, [PI / 2, 0, 0]);
