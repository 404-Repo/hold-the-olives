  // PRIMITIVES: three stacked rounded linen layers, each a little offset, with rolled fold edges (half cylinders) on the left; the blue stripe = two thin bands laid across the top layer that wrap down over the fold
  const body = grp(g);
  const lin = linen(), bl = stripe();
  const W = 1.5, D = 2.0;
  for (let i = 0; i < 3; i++) { const y = i * 0.15, o = i * 0.03; add(rbox(W - o, 0.13, D - o * 2, 0.05), lin, [o / 2, y, -o], body);
    add(new THREE.CylinderGeometry(0.075, 0.075, D - o * 2, 10), lin, [-(W - o) / 2 + 0.02 + o / 2, y + 0.075, -o], body, [PI / 2, 0, 0]); }
  for (const z of [0.5, 0.68]) { add(new THREE.BoxGeometry(W - 0.06, 0.012, z === 0.5 ? 0.1 : 0.04), bl, [0.03, 0.45, z - 0.06], body); add(new THREE.CylinderGeometry(0.081, 0.081, z === 0.5 ? 0.1 : 0.04, 10), bl, [-(W - 0.06) / 2 + 0.05, 0.38, z - 0.06], body, [PI / 2, 0, 0]); }
  fitAll(body, 0.5);
