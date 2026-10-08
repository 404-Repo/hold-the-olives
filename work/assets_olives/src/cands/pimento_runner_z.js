  // A: a swept tube. The escaped pimento as one fat curled strip (a J that curls over its back), a round belly, tiny eyes and legs.
  const red = M(0xe03a2a, { r: 0.25 }), dk = M(0xb02a1e, { r: 0.3 });
  add(new THREE.SphereGeometry(0.058, 14, 10), red, [0, 0.082, 0.005], g, null, [1, 1, 0.85]);
  const curve = new THREE.CatmullRomCurve3([V(0, 0.07, -0.01), V(0.005, 0.13, -0.012), V(0.0, 0.165, -0.045), V(-0.004, 0.15, -0.085), V(0, 0.115, -0.09)]);
  add(new THREE.TubeGeometry(curve, 18, 0.03, 10, false), red);
  add(new THREE.SphereGeometry(0.03, 10, 7), red, [0, 0.115, -0.09]);
  for (const sd of [-1, 1]) {
    eye(g, { p: V(sd * 0.024, 0.1, 0.046), n: V(sd * 0.35, 0.25, 1).normalize() }, 0.019, { sink: 0.35 });
    add(new THREE.CapsuleGeometry(0.009, 0.03, 2, 6), dk, [sd * 0.025, 0.026, 0], g);
    add(new THREE.SphereGeometry(0.014, 8, 5), dk, [sd * 0.026, 0.008, 0.008], g, null, [1, 0.6, 1.4]);
    add(new THREE.CapsuleGeometry(0.007, 0.025, 2, 6), dk, [sd * 0.062, 0.075, 0.005], g, [0, 0, sd * 0.8]);
  }
  arc(g, { p: V(0, 0.068, 0.051), n: V(0, -0.1, 1).normalize() }, 0.012, 0.0035, 2.2, PI, 0x5a0e0a);
