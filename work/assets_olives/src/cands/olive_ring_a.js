  // A: primitives. A torus squashed into a thick ring, flat cut faces from ring discs, spiral eyes on the +Z face.
  // userData.wheel is the hub pivot: spin it about local Z to roll (yaw the model 90 deg so it faces sideways along its path).
  const skin = M(0x221c22, { r: 0.25 }), cut = M(0x3a2f36, { r: 0.35 }), pit = M(0x161216, { r: 0.6 });
  const Ro = 0.16, Ri = 0.056, T = 0.12, w = grp(g, [0, Ro, 0], 'wheel'); g.userData.wheel = w; g.userData.rollAxis = 'z';
  const tr = (Ro + Ri) / 2, tt = (Ro - Ri) / 2;
  add(new THREE.TorusGeometry(tr, tt, 12, 28), skin, [0, 0, 0], w, null, [1, 1, (T / 2) / tt]);
  for (const sd of [-1, 1]) add(new THREE.RingGeometry(Ri + 0.012, Ro - 0.016, 28, 1), cut, [0, 0, sd * T * 0.47], w, [0, sd > 0 ? 0 : PI, 0]);
  add(new THREE.CylinderGeometry(Ri + 0.004, Ri + 0.004, T * 0.9, 20, 1, true), M(0x2c2228, { r: 0.4, ds: true }), [0, 0, 0], w, [PI / 2, 0, 0]);
  spiralEyes(w, T * 0.47);
  function spiralEyes(par, z) {
    for (const sd of [-1, 1]) {
      const c = [sd * 0.066, 0.06, z];
      add(new THREE.SphereGeometry(0.036, 12, 8), M(0xffffff, { r: 0.18 }), c, par, null, [1, 1, 0.45]);
      const pts = []; for (let i = 0; i <= 40; i++) { const t = i / 40, a = t * PI * 4.2 * sd; pts.push(V(c[0] + Math.cos(a) * 0.031 * (0.15 + 0.85 * t), c[1] + Math.sin(a) * 0.031 * (0.15 + 0.85 * t), z + 0.017)); }
      add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 40, 0.0042, 4, false), M(0x161616, { r: 0.3 }), [0, 0, 0], par);
    }
    const mp = []; for (let i = 0; i <= 12; i++) { const t = i / 12; mp.push(V(-0.04 + 0.08 * t, -0.095 + Math.sin(t * PI * 3) * 0.008, z + 0.004)); }
    add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mp), 16, 0.006, 4, false), M(0x0e0a0c, { r: 0.4 }), [0, 0, 0], par);
  }
