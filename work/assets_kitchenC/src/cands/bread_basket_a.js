  // PROFILES: oval wicker wall = open lathe deformed with an over-under weave bump (rows offset), scaled 1.4 on x; rope rim torus; napkin = a draped square sheet (grid deformed to sag in and fall over the rim at the corners); five rolls = deformed spheres with score grooves
  const body = grp(g), O = grp(body, [0, 0, 0], null, null); O.scale.set(1.4, 1, 1);
  const wick = M(0xc08a48, { r: 0.75 }), wick2 = M(0xa8743a, { r: 0.8 });
  const wall = deform(lathe([[0, 0], [0.95, 0], [1.0, 0.05], [1.12, 0.35], [1.22, 0.7], [1.26, 0.82], [1.18, 0.82], [1.14, 0.7], [1.04, 0.35], [0.92, 0.1], [0, 0.1]], 40), (v) => {
    const r = Math.hypot(v.x, v.z); if (r < 0.9 || v.y < 0.04 || v.y > 0.78) return; const th = Math.atan2(v.z, v.x), row = Math.floor(v.y / 0.14);
    const k = 1 + 0.035 * Math.sin(th * 20 + row * PI); v.x *= k; v.z *= k; });
  add(wall, wick, [0, 0, 0], O);
  add(new THREE.TorusGeometry(1.24, 0.07, 6, 40), wick2, [0, 0.82, 0], O, [PI / 2, 0, 0]);
  const S = 3.4, N = 16, pos = [], idx = [];
  for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) {
    const x = (i / N - 0.5) * S, z = (j / N - 0.5) * S, ex = x / 1.4, d = Math.hypot(ex, z) / 1.25, c = Math.max(Math.abs(x) / (S / 2), Math.abs(z) / (S / 2));
    let y = d < 1 ? 0.58 + 0.12 * d * d : 0.86 - (d - 1) * 1.3; y = Math.max(y, 0.12 + 0.05 * c);
    pos.push(x * (d > 1 ? 0.92 : 1), y + 0.03 * Math.sin(i * 1.7 + j), z * (d > 1 ? 0.92 : 1));
  }
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const a = i * (N + 1) + j, b = a + 1, c = a + N + 1, d = c + 1; idx.push(a, b, d, a, d, c); }
  const ng = new THREE.BufferGeometry(); ng.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); ng.setIndex(idx); ng.computeVertexNormals();
  add(ng, M(0xe9e2d0, { r: 0.85, ds: true, name: 'fabric' }), [0, 0, 0], body, [0, PI / 4, 0]);
  const crust = M(C.crust, { r: 0.45 }), score = M(0xe8c27a, { r: 0.6 });
  const rollG = deform(new THREE.SphereGeometry(0.42, 16, 10), (v) => { v.y *= 0.72; if (v.y < -0.12) v.y = -0.12 + (v.y + 0.12) * 0.3; });
  for (const [x, z, ry] of [[-0.6, 0.25, 0.3], [0.05, 0.38, 1.2], [0.65, 0.18, 2.0], [-0.3, -0.35, 2.6], [0.4, -0.38, 0.9]]) {
    const R = grp(body, [x, 0.82, z], null, [0.1 * x, ry, 0.1 * z]);
    add(rollG, crust, [0, 0, 0], R);
    add(new THREE.BoxGeometry(0.5, 0.03, 0.05), score, [0, 0.28, 0.08], R, [0, 0.4, 0]);
    add(new THREE.BoxGeometry(0.5, 0.03, 0.05), score, [0, 0.28, -0.08], R, [0, 0.4, 0]);
  }
  fitAll(body, 1.2);
