  // C: a different reading. Bean body with arms; the pimento bursts out as a curled red tongue over the back.
  const o = olive({ H: 0.33, col: 0x8aa52e, expr: 'surprised', legH: 0.04, wr: 0.74 }, 'bean');
  const top = o.y0 + o.Hb, W = o.W, red = M(0xe03a2a, { r: 0.25 });
  add(new THREE.TorusGeometry(W * 0.15, W * 0.035, 6, 14), o.dark, [0, top - W * 0.035, 0], g, [PI / 2, 0, 0]);
  const curve = new THREE.CatmullRomCurve3([V(0, top - W * 0.06, 0), V(0, top + W * 0.08, -W * 0.02), V(W * 0.03, top + W * 0.15, -W * 0.14), V(W * 0.02, top + W * 0.1, -W * 0.27), V(0, top + W * 0.0, -W * 0.3)]);
  add(new THREE.TubeGeometry(curve, 16, W * 0.1, 10, false), red);
  add(new THREE.SphereGeometry(W * 0.1, 10, 7), red, [0, top + W * 0.0, -W * 0.3]);
