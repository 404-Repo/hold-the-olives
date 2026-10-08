  // DIFFERENT READING: a rounded-rectangle woven tray basket: walls of interlaced vertical stakes (boxes) and horizontal weavers (rounded rect tubes), two cut-out end handles, a linen napkin draped as a sheet, three oblong rolls (capsules) with diagonal slashes and two round rolls
  const body = grp(g);
  const w1 = M(0xc08a48, { r: 0.75 }), w2 = M(0xa8743a, { r: 0.8 });
  const L = 3.0, D = 2.0, H = 0.8;
  add(rbox(L, 0.1, D, 0.04), w2, [0, 0, 0], body);
  const per = []; for (let i = 0; i < 14; i++) { const t = i / 14; per.push(t); }
  for (let k = 0; k < 5; k++) { const y = 0.16 + k * 0.15, sh = new THREE.Shape(); rrect(L + 0.04 * (k % 2), D + 0.04 * (k % 2), 0.5, sh); sh.holes.push(rrectPath(L - 0.12, D - 0.12, 0.45));
    add(slab(sh, 0.12, 0.02, 0.0, 4), k % 2 ? w1 : w2, [0, y - 0.06, 0], body); }
  for (let i = 0; i < 12; i++) { const x = -L / 2 + 0.3 + i * (L - 0.6) / 11; for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.06, H, 0.05), w2, [x, H / 2, s * (D / 2 - 0.01)], body); }
  for (let i = 0; i < 7; i++) { const z = -D / 2 + 0.3 + i * (D - 0.6) / 6; for (const s of [-1, 1]) add(new THREE.BoxGeometry(0.05, H, 0.06), w2, [s * (L / 2 - 0.01), H / 2, z], body); }
  for (const s of [-1, 1]) add(new THREE.TorusGeometry(0.28, 0.06, 6, 12, PI), w1, [s * (L / 2 + 0.02), H, 0], body, [0, PI / 2, 0]);
  const N = 14, pos = [], idx = [];
  for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) { const u = i / N - 0.5, v = j / N - 0.5, x = u * 3.6, z = v * 3.0, ins = Math.abs(x) < L / 2 - 0.2 && Math.abs(z) < D / 2 - 0.2;
    const ox = Math.max(0, Math.abs(x) - (L / 2)), oz = Math.max(0, Math.abs(z) - (D / 2)); const y = ins ? 0.5 : 0.84 - (ox + oz) * 1.4; pos.push(x * (ox + oz > 0 ? 0.94 : 1), Math.max(0.15, y + 0.025 * Math.sin(i * 2.1 + j * 1.3)), z * (ox + oz > 0 ? 0.94 : 1)); }
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) { const a = i * (N + 1) + j, b = a + 1, c = a + N + 1, d = c + 1; idx.push(a, b, d, a, d, c); }
  const ng = new THREE.BufferGeometry(); ng.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); ng.setIndex(idx); ng.computeVertexNormals();
  add(ng, M(0xe9e2d0, { r: 0.85, ds: true, name: 'fabric' }), [0, 0, 0], body, [0, 0.3, 0]);
  const crust = M(C.crust, { r: 0.45 }), score = M(0xe8c27a, { r: 0.6 });
  for (const [x, z, ry] of [[-0.75, 0.0, 0.2], [0.0, 0.1, -0.1], [0.75, 0.0, 0.15]]) { const R = grp(body, [x, 0.82, z], null, [0, ry, PI / 2]);
    add(new THREE.CapsuleGeometry(0.3, 0.6, 4, 12), crust, [0, 0, 0], R, null, [0.8, 1, 1]);
    for (const k of [-0.25, 0, 0.25]) add(new THREE.BoxGeometry(0.06, 0.04, 0.3), score, [-0.24, k, 0], R, [0.6, 0, 0]); }
  for (const [x, z] of [[-0.4, -0.55], [0.45, -0.5]]) add(new THREE.SphereGeometry(0.34, 12, 8), crust, [x, 0.78, z], body, null, [1, 0.7, 1]);
  fitAll(body, 1.2);
