  // A: lathe. A swept teardrop, round belly, the tip pulled up and curled over a little (vertex bend).
  const mus = M(0xf2b705, { r: 0.25 });
  const pts = []; for (let i = 0; i <= 16; i++) { const t = i / 16, y = t * 0.25; const r = t < 0.42 ? 0.1 * Math.sqrt(Math.max(0, 1 - Math.pow((0.42 - t) / 0.42, 2))) : 0.1 * Math.pow(1 - (t - 0.42) / 0.58, 1.25); pts.push([i === 16 ? 0 : (i === 0 ? 0 : Math.max(0.002, r)), y]); }
  const geo = lathe(pts, 18), pa = geo.attributes.position;
  for (let i = 0; i < pa.count; i++) { const y = pa.getY(i), k = Math.max(0, (y - 0.15) / 0.1); pa.setZ(i, pa.getZ(i) - k * k * 0.035); }
  geo.computeVertexNormals(); add(geo, mus);
  add(new THREE.SphereGeometry(0.06, 10, 6, 0, TAU, 0, PI / 2), M(0xf8c93a, { r: 0.2 }), [0.0, 0.0, 0.0], g, null, [2.1, 0.12, 2.1]);
