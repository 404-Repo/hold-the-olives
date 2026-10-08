  // B: lathe. Swept olive, a swept dome helmet with a brim, visor slots and a little frill plume, a swept pick with
  // tapered ends through its right side, a swept cellophane tuft (a flared cone, frilled) near the back end.
  const o = olive({ H: 0.35, col: 0x8aa52e, expr: 'pompous', legH: 0.035, arms: true, mouthY: 0.42 }, 'lathe');
  const top = o.y0 + o.Hb, W = o.W, steel = M(0xbcc3c9, { r: 0.3, m: 0.6, name: 'metal' }), pickM = M(0xe8cfa0, { r: 0.55 }), red = M(0xe03a2a, { r: 0.25 });
  const hg = grp(g, [0, top - o.Hb * 0.2, 0]); hg.rotation.set(-0.12, 0, 0.1);
  const hp = [[W * 0.49, -0.005], [W * 0.5, 0.012], [W * 0.43, 0.02], [W * 0.43, 0.05], [W * 0.38, 0.085], [W * 0.27, 0.11], [W * 0.12, 0.124], [0, 0.127]];
  add(lathe(hp, 22), steel, [0, 0, 0], hg, null, [1, 1, o.zk]);
  for (let i = -1; i <= 1; i++) add(new THREE.BoxGeometry(0.008, 0.035, 0.01), M(0x2a2e33, { r: 0.5 }), [i * 0.022, 0.06, W * 0.4 * o.zk], hg, [-0.5, i * 0.25, 0]);
  add(new THREE.ConeGeometry(0.02, 0.06, 8), M(0xe23a3a, { r: 0.2 }), [0, 0.15, -0.01], hg, [-0.3, 0, 0]);
  add(new THREE.SphereGeometry(W * 0.14, 12, 8), red, [0, o.y0 + o.Hb * 0.2, o.D * 0.5 * 0.88], g, null, [1, 1, 0.45]);
  const pg = grp(g, [W * 0.56, o.y0 + o.Hb * 0.36, 0.14]); pg.rotation.x = PI / 2 - 0.17;
  add(lathe([[0, -0.45], [0.012, -0.41], [0.015, -0.38], [0.015, 0.36], [0.012, 0.4], [0, 0.47]], 8), pickM, [0, 0, 0], pg);
  const fp = []; for (let i = 0; i <= 8; i++) { const t = i / 8; fp.push([0.016 + t * 0.03, -0.36 + t * 0.06]); }
  const fr = lathe(fp, 16), fa = fr.attributes.position;
  for (let i = 0; i < fa.count; i++) { const x = fa.getX(i), z = fa.getZ(i), y = fa.getY(i), th = Math.atan2(x, z), k = 1 + (y + 0.36) / 0.06 * 0.25 * Math.cos(th * 8); fa.setX(i, x * k); fa.setZ(i, z * k); }
  fr.computeVertexNormals();
  add(fr, M(0xe23a3a, { r: 0.15, ds: true }), [0, 0, 0], pg);
