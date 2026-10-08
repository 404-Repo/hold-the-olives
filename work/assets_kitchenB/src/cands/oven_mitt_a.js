  // PRIMITIVES: palm = flattened sphere stretched, thumb = flattened capsule angled out, cuff = rounded box in cream, loop = torus; quilting = thin dark rods in a diamond
  const body = grp(g);
  const red = M(C.red, { r: 0.85, name: 'fabric' }), rd = M(0xb33a2f, { r: 0.9, name: 'fabric' }), cuff = M(0xe9e2d0, { r: 0.85, name: 'fabric' });
  add(new THREE.SphereGeometry(1, 20, 10), red, [0, 0.15, 0.25], body, null, [0.75, 0.15, 1.15]);
  add(new THREE.CapsuleGeometry(0.22, 0.55, 4, 10), red, [-0.68, 0.13, -0.05], body, [PI / 2, 0, -0.0], [1, 1, 0.55]).rotation.set(PI / 2, 0, 0.55);
  add(rbox(1.25, 0.28, 0.5, 0.12), cuff, [0, 0.0, -1.05], body);
  add(new THREE.TorusGeometry(0.12, 0.035, 6, 12), cuff, [0.45, 0.25, -1.32], body, [PI / 2, 0, 0]);
  for (let i = -3; i <= 3; i++) for (const s of [-1, 1]) {
    const a = [i * 0.3 - 0.9 * s * 0.6, 0.29, -0.6], b = [i * 0.3 + 0.9 * s * 0.6, 0.29, 1.1];
    const len = 1.7, cx = (a[0] + b[0]) / 2; if (Math.abs(cx) > 0.55) continue;
    rod([cx - s * 0.35, 0.285, -0.45], [cx + s * 0.35, 0.285, 0.9], 0.018, rd, body, 4);
  }
  fitAll(body, 0.3);
