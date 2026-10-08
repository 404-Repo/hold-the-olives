  // C: a different reading. A crumpled pepper strip: a chain of overlapping spheres spiralling up into a curl, legs splayed.
  const red = M(0xe03a2a, { r: 0.25 }), dk = M(0xb02a1e, { r: 0.3 });
  const n = 9;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1), a = t * PI * 1.25, rr = 0.058 * (1 - t * 0.55);
    const p = [Math.sin(t * 5) * 0.006, 0.07 + Math.sin(a) * 0.06 + t * 0.015, -Math.sin(a * 0.5) * 0.06 * t + (1 - Math.cos(a)) * -0.02];
    add(new THREE.SphereGeometry(rr, 10, 7), i % 2 ? dk : red, p, g, null, [1.05, 0.9, 1]);
  }
  for (const sd of [-1, 1]) {
    eye(g, { p: V(sd * 0.024, 0.09, 0.048), n: V(sd * 0.35, 0.25, 1).normalize() }, 0.019, { sink: 0.35 });
    add(new THREE.CapsuleGeometry(0.008, 0.03, 2, 6), dk, [sd * 0.03, 0.024, 0.005], g, [0, 0, sd * -0.25]);
    add(new THREE.SphereGeometry(0.014, 8, 5), dk, [sd * 0.036, 0.007, 0.012], g, null, [1, 0.6, 1.4]);
  }
  arc(g, { p: V(0, 0.06, 0.054), n: V(0, -0.1, 1).normalize() }, 0.012, 0.0035, 2.2, PI, 0x5a0e0a);
