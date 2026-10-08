  // EXTRUDE: each layer of each triangular half is an extruded rounded right triangle (bevelled), with a pale crumb plate on every bread cut face,
  // ruffled lettuce ribbons swept round the outline, glossy tomato slices poking out, wavy bacon, drooping cheese. Two halves in a V.
  const root = grp(g);
  const S = 1.25, L = S * Math.SQRT2, D = L / 2, ri = S * (2 - Math.SQRT2) / 2, IC = [0, -ri];     // incentre (x, z)
  // triangle in shape space (x, y = -z): hypotenuse on y = 0 (front, +z), apex at y = D (back). k scales about the incentre
  const tri = (k = 1, r = 0.1) => {
    const P = [[-L / 2, 0], [L / 2, 0], [0, D]].map(([x, y]) => [x * k, ri + (y - ri) * k]), sh = new THREE.Shape();
    const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
    for (let i = 0; i < 3; i++) {
      const A = P[i], B = P[(i + 1) % 3], Cc = P[(i + 2) % 3], lab = Math.hypot(B[0] - A[0], B[1] - A[1]), lbc = Math.hypot(Cc[0] - B[0], Cc[1] - B[1]);
      const p0 = lerp(A, B, r * k / lab * 2.2), p1 = lerp(A, B, 1 - r * k / lab * 2.2), p2 = lerp(B, Cc, r * k / lbc * 2.2);
      if (i === 0) sh.moveTo(p0[0], p0[1]); else sh.lineTo(p0[0], p0[1]);
      sh.lineTo(p1[0], p1[1]); sh.quadraticCurveTo(B[0], B[1], p2[0], p2[1]);
    }
    sh.closePath(); return sh;
  };
  const kIn = (d) => 1 - d / ri, kOut = (d) => 1 + d / ri;
  // outline sample: perimeter points of the triangle scaled by k (local x, z)
  const outline = (k, n) => {
    const P = [[-L / 2, 0], [L / 2, 0], [0, -D]].map(([x, z]) => [x * k, -ri + (z + ri) * k]), per = [];
    const lens = [0, 1, 2].map((i) => Math.hypot(P[(i + 1) % 3][0] - P[i][0], P[(i + 1) % 3][1] - P[i][1])), tot = lens[0] + lens[1] + lens[2];
    for (let j = 0; j < n; j++) { let s = j / n * tot, i = 0; while (s > lens[i]) { s -= lens[i]; i++; } const A = P[i], B = P[(i + 1) % 3], t = s / lens[i]; per.push([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t]); }
    return per;
  };
  // a ruffled ribbon from the inner outline (k0, y=0) out to the outer outline (k1) with a wavy outer edge
  const ruffle = (k0, k1, amp, waves, n = 132, droop = 0.03) => {
    const a = outline(k0, n), b = outline((k0 + k1) / 2, n), c = outline(k1, n), pos = [], idx = [];
    for (let j = 0; j < n; j++) {
      const w = Math.sin(j / n * TAU * waves), w2 = Math.sin(j / n * TAU * waves * 2.3 + 1);
      pos.push(a[j][0], 0, a[j][1], b[j][0], amp * 0.35 * w2, b[j][1], c[j][0] + 0.03 * w2 * (c[j][0] - IC[0]), -droop + amp * w, c[j][1] + 0.03 * w2 * (c[j][1] - IC[1]));
    }
    for (let j = 0; j < n; j++) { const J = (j + 1) % n; for (let r = 0; r < 2; r++) { const p = j * 3 + r, q = J * 3 + r; idx.push(p, q, q + 1, p, q + 1, p + 1); } }
    const geo = new THREE.BufferGeometry(); geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); geo.setIndex(idx); geo.computeVertexNormals(); return geo;
  };
  const toastM = M(C.toast, { r: 0.7 }), crustM = M(C.crust, { r: 0.65 }), crumbM = M(C.crumb, { r: 0.85 }), turkeyM = M(C.turkey, { r: 0.5 }), turkey2 = M(0xd9aa86, { r: 0.55 });
  const letM = M(C.lettuce, { r: 0.32, ds: true }), let2 = M(C.lettuce2, { r: 0.35, ds: true }), tomM = M(C.tomato, { r: 0.12 }), tomFl = M(C.tomatoFl, { r: 0.14 }), seedM = M(C.seed, { r: 0.1 });
  const baconM = M(C.bacon, { r: 0.28 }), fatM = M(C.fat, { r: 0.3 }), cheeseM = M(C.cheese, { r: 0.28 });
  const H = { l1: 0.4, l2: 0.28, l3: 0.17, l4: 0.22, l5: 0.38, l6: 0.2, l7: 0.12, l8: 0.17, l9: 0.4 };
  const halves = [{ x: -0.85, z: 0, yaw: -0.35 }, { x: 0.85, z: 0, yaw: 0.35 }];
  const layers = {}; let y = 0;
  const build = {
    toast: (o, h) => {
      add(slab(tri(kIn(0.03)), h, 0.05, 0.03, 6, 3), toastM, [0, 0, 0], o);
      add(new THREE.BoxGeometry(L * 0.74, h * 0.72, 0.012), crumbM, [0, h / 2, 0.004], o);
      add(slab(tri(kIn(0.012), 0.1), 0.012, 0, 0, 6), crustM, [0, h * 0.5, 0], o, null, [1.002, 1, 1.002]);
    },
    turkey: (o, h) => {
      for (let i = 0; i < 3; i++) { const t = h / 3; add(slab(tri(kOut(0.02 - i * 0.015)), t * 1.02, 0.03, 0.02, 6, 2), i % 2 ? turkey2 : turkeyM, [0.01 * (i - 1), i * t, 0.012 * (1 - i)], o); }
    },
    lettuce: (o, h) => {
      add(slab(tri(kIn(0.02)), h * 0.5, 0.02, 0.01), let2, [0, h * 0.2, 0], o);
      add(ruffle(kIn(0.05), kOut(0.17), 0.06, 13), letM, [0, h * 0.55, 0], o);
      add(ruffle(kIn(0.05), kOut(0.11), 0.045, 17, 132, 0.0), let2, [0, h * 0.35, 0], o, [0, 0.05, 0]);
    },
    tomato: (o, h) => {
      add(slab(tri(kIn(0.06)), h, 0.03, 0.02), tomFl, [0, 0, 0], o);
      const spots = [[-0.48, -0.03], [0.48, -0.03], [0, -0.05], [-0.26, -0.47], [0.26, -0.47], [0, -0.75]];
      for (const [x, z] of spots) {
        const s = grp(o, [x, 0, z]);
        add(new THREE.CylinderGeometry(0.22, 0.22, h * 0.9, 20), tomM, [0, h * 0.45, 0], s);
        add(new THREE.CylinderGeometry(0.19, 0.19, 0.01, 20), tomFl, [0, h * 0.9 + 0.003, 0], s);
        for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; add(new THREE.SphereGeometry(0.045, 6, 3), seedM, [Math.cos(a) * 0.1, h * 0.9 + 0.004, Math.sin(a) * 0.1], s, [0, -a, 0], [1.3, 0.25, 0.7]); }
      }
    },
    bacon: (o, h) => {
      add(slab(tri(kIn(0.05)), h * 0.5, 0.02, 0.01), baconM, [0, h * 0.2, 0], o);
      const wave = (len, ph) => deform(new THREE.BoxGeometry(len, h * 0.32, 0.12, 20, 1, 1), (v) => { v.y += h * 0.22 * Math.sin(v.x * 11 + ph); });
      const edges = [[[0, 0.02], 0, L * 0.92], [[-L / 4 - 0.01, -D / 2 - 0.01], PI / 4, S * 0.86], [[L / 4 + 0.01, -D / 2 - 0.01], -PI / 4, S * 0.86]];
      edges.forEach(([[x, z], yaw, len], i) => {
        const e = grp(o, [x, h * 0.45, z], null, [0, yaw, 0]);
        add(wave(len, i * 2), baconM, [0, 0, 0.0], e);
        add(wave(len * 0.98, i * 2), fatM, [0, h * 0.06, 0.035], e, null, [1, 0.35, 0.4]);
        add(wave(len * 0.98, i * 2), fatM, [0, -h * 0.07, 0.035], e, null, [1, 0.3, 0.4]);
      });
    },
    cheese: (o, h) => {
      const geo = slab(tri(kOut(0.1), 0.06), h * 0.7, 0.012, 0.008, 6);
      deform(geo, (v) => { const dx = v.x - IC[0], dz = v.z - IC[1], r = Math.hypot(dx, dz), d = Math.max(0, r - 0.55); v.y -= 0.5 * d * d; });
      add(geo, cheeseM, [0, h * 0.3, 0], o);
    },
  };
  const kinds = { l1: 'toast', l2: 'turkey', l3: 'lettuce', l4: 'tomato', l5: 'toast', l6: 'bacon', l7: 'cheese', l8: 'lettuce', l9: 'toast' };
  for (const k of ['l9', 'l8', 'l7', 'l6', 'l5', 'l4', 'l3', 'l2', 'l1']) {
    const L_ = grp(root, [0, y, 0], k); layers[k] = L_;
    for (const hf of halves) build[kinds[k]](grp(L_, [hf.x, 0, hf.z], null, [0, hf.yaw, 0]), H[k]);
    y += H[k];
  }
  // a big frilled cocktail pick through each half, attached to the top layer
  const pickM = M(C.pick, { r: 0.55 }), frM = M(C.frill, { r: 0.12, ds: true });
  for (const hf of halves) {
    const o = grp(layers.l1, [hf.x, 0, hf.z], null, [0, hf.yaw, 0]);
    const px = 0, pz = -ri, top = H.l1;
    add(new THREE.CylinderGeometry(0.035, 0.035, 1.5, 8), pickM, [px, top - 0.45, pz], o);
    add(new THREE.CylinderGeometry(0.055, 0.045, 0.14, 10), frM, [px, top + 0.37, pz], o);
    for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; const f = grp(o, [px, top + 0.44 + (i % 3) * 0.02, pz], null, [0, -a, 0]);
      add(new THREE.TorusGeometry(0.1 + (i % 2) * 0.03, 0.014, 4, 10, PI * 1.2), frM, [0.09, 0.04, 0], f, [0, 0, -0.3]); }
  }
  g.userData.layers = layers;
  fitAll(root, 3.0);
