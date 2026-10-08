  // B: primitives. A sphere belly with a cone point, a small flattened splat skirt at the base.
  const mus = M(0xf2b705, { r: 0.25 });
  add(new THREE.SphereGeometry(0.095, 16, 12), mus, [0, 0.095, 0]);
  add(new THREE.ConeGeometry(0.068, 0.17, 16, 1, true), mus, [0, 0.165 + 0.0, 0]);
  add(new THREE.SphereGeometry(0.12, 16, 6, 0, TAU, 0, PI / 2), mus, [0, 0, 0], g, null, [1, 0.25, 1]);
