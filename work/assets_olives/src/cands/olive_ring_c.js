  // C: extrude. A circle with a hole extruded and bevelled (bevel subtracted from the drawn size), domed eye lenses, a wobbly grin.
  const skin = M(0x221c22, { r: 0.25 });
  const Ro = 0.16, Ri = 0.056, T = 0.12, bv = 0.022, w = grp(g, [0, Ro, 0], 'wheel'); g.userData.wheel = w; g.userData.rollAxis = 'z';
  const sh = new THREE.Shape(); sh.absarc(0, 0, Ro - bv, 0, TAU, false);
  const hole = new THREE.Path(); hole.absarc(0, 0, Ri + bv, 0, TAU, true); sh.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(sh, { depth: T - bv * 2, bevelEnabled: true, bevelThickness: bv, bevelSize: bv, bevelSegments: 3, curveSegments: 18 });
  geo.translate(0, 0, -(T - bv * 2) / 2);
  add(geo, skin, [0, 0, 0], w);
  for (const sd of [-1, 1]) {
    const c = [sd * 0.066, 0.06, T / 2];
    add(new THREE.SphereGeometry(0.038, 12, 8), M(0xffffff, { r: 0.18 }), c, w, null, [1, 1, 0.42]);
    for (const [rr, tb] of [[0.026, 0.0045], [0.014, 0.0045]]) add(new THREE.TorusGeometry(rr, tb, 4, 16, PI * 1.6), M(0x161616, { r: 0.3 }), [c[0], c[1], c[2] + 0.014], w, [0, 0, sd * rr * 40]);
    add(new THREE.SphereGeometry(0.006, 6, 4), M(0x161616), [c[0], c[1], c[2] + 0.016], w);
  }
  const mp = []; for (let i = 0; i <= 12; i++) { const t = i / 12; mp.push(V(-0.045 + 0.09 * t, -0.098 + Math.sin(t * PI * 3) * 0.008 - Math.sin(t * PI) * 0.008, T / 2 + 0.002)); }
  add(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(mp), 16, 0.0065, 4, false), M(0x0e0a0c, { r: 0.4 }), [0, 0, 0], w);
  // back face: the cut flesh ring, slightly lighter, so the back is not blank
  add(new THREE.RingGeometry(Ri + 0.02, Ro - 0.03, 28, 1), M(0x3a2f36, { r: 0.35 }), [0, 0, -T / 2 - 0.001], w, [0, PI, 0]);
