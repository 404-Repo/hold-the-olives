  // DIFFERENT READING: a pillow mitt: the outline as a polar sheet top + mirrored bottom puffed by a dome function, each quilted cell a raised bump
  // (golden grid of flattened spheres), a rolled cream cuff (torus-ish tube) and a red hanging tab
  const body = grp(g);
  const red = M(C.red, { r: 0.85, name: 'fabric' }), rd = M(0xc24236, { r: 0.85, name: 'fabric' }), cuff = M(0xe9e2d0, { r: 0.85, name: 'fabric' });
  const s = new THREE.Shape();
  s.moveTo(-0.58, 0.9); s.lineTo(-0.6, 0.0); s.bezierCurveTo(-0.95, -0.05, -1.05, -0.55, -0.85, -0.7); s.bezierCurveTo(-0.7, -0.8, -0.6, -0.55, -0.55, -0.4);
  s.bezierCurveTo(-0.6, -1.2, -0.3, -1.45, 0.02, -1.45); s.bezierCurveTo(0.4, -1.45, 0.62, -1.15, 0.62, -0.6); s.lineTo(0.6, 0.9); s.closePath();
  add(slab(s, 0.16, 0.07, 0.05, 10, 2), rd, [0, 0, 0], body);
  const bg = new THREE.SphereGeometry(0.16, 8, 5);
  for (let ix = -2; ix <= 2; ix++) for (let iz = -3; iz <= 2; iz++) {
    const x = ix * 0.24 + (iz % 2 ? 0.12 : 0), z = iz * 0.24 + 0.15; if (Math.abs(x) > 0.48 || z < -0.7) continue;
    if (Math.hypot(x / 0.55, (z - 0.5) / 0.95) > 1.05 && z > 0.4) continue;
    add(bg, red, [x, 0.13, z], body, [0, PI / 4, 0], [1, 0.55, 1]);
  }
  add(bg, red, [-0.78, 0.12, 0.5], body, null, [1, 0.5, 1.2]);
  tube([[-0.62, 0.14, -1.0], [0, 0.18, -1.02], [0.62, 0.14, -1.0]], 0.15, cuff, body, 8, 10);
  add(rbox(1.24, 0.24, 0.3, 0.1), cuff, [0, 0.0, -1.0], body);
  add(new THREE.TorusGeometry(0.12, 0.04, 6, 12), red, [0.5, 0.2, -1.25], body, [PI / 2, 0, 0]);
  fitAll(body, 0.3);
