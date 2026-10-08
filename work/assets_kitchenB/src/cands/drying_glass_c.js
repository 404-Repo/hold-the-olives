  // DIFFERENT READING: a faceted bistro tumbler (Picardie style): a 10-sided lathe whose lower half (the top, upside down) is faceted and upper half smooth,
  // a thick rolled mouth ring, the thick base visible as a darker glass disc, a trickle of water running down inside
  const body = grp(g);
  const gl = M(0xd8eef0, { r: 0.05, t: 0.38, ds: true }), gth = M(0xc6e2e8, { r: 0.05, t: 0.55 }), wat = M(0xbfe3ef, { r: 0.05, t: 0.7 });
  add(lathe([[0.48, 0.06], [0.5, 0.5], [0.46, 0.85], [0.46, 1.5], [0.42, 1.6], [0, 1.6]], 10), gl, [0, 0, 0], body);
  add(new THREE.CylinderGeometry(0.505, 0.505, 0.12, 24), gth, [0, 0.06, 0], body);
  add(new THREE.CylinderGeometry(0.43, 0.43, 0.2, 10), gth, [0, 1.48, 0], body);
  tube([[0.4, 1.3, 0.1], [0.43, 1.0, 0.16], [0.45, 0.7, 0.12], [0.47, 0.4, 0.15], [0.48, 0.15, 0.13]], 0.025, wat, body, 12, 5);
  add(new THREE.SphereGeometry(0.05, 8, 6), wat, [0.48, 0.14, 0.13], body);
  fitAll(body, 1.6);
