  // B: lathe. A squat swept teardrop body, the curl a torus arc springing off the crown, tiny eyes and legs.
  const red = M(0xe03a2a, { r: 0.25 }), dk = M(0xb02a1e, { r: 0.3 });
  const r = (y) => { const u = (y - 0.025) / 0.125; return u <= 0 || u >= 1 ? 0 : 0.062 * Math.pow(Math.sin(PI * Math.pow(u, 0.8)), 0.8); };
  add(lathe(sampleProfile(r, 0.025, 0.15, 12), 14), red);
  add(new THREE.TorusGeometry(0.03, 0.016, 7, 12, PI * 1.4), red, [0, 0.165, -0.012], g, [0, PI / 2, 0.3]);
  for (const sd of [-1, 1]) {
    eye(g, surf(r, 0.098, sd * 0.38), 0.019, { sink: 0.35 });
    add(new THREE.CapsuleGeometry(0.009, 0.02, 2, 6), dk, [sd * 0.024, 0.02, 0], g);
    add(new THREE.SphereGeometry(0.014, 8, 5), dk, [sd * 0.025, 0.007, 0.008], g, null, [1, 0.6, 1.4]);
    add(new THREE.CapsuleGeometry(0.007, 0.025, 2, 6), dk, [sd * 0.064, 0.075, 0.0], g, [0, 0, sd * 0.8]);
  }
  arc(g, surf(r, 0.066, 0), 0.012, 0.0035, 2.2, PI, 0x5a0e0a);
