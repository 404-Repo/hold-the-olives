  // LATHE + EXTRUDE: each slice a lathe with a rounded glossy rim; teardrop seed pockets extruded with bevels; seeds as dots
  const body = grp(g);
  const skin = M(C.tomato, { r: 0.18 }), flesh = M(C.tomatoFl, { r: 0.2 }), seed = M(C.seed, { r: 0.12 }), pip = M(0xfbe3a0, { r: 0.3 });
  const prof = lathe([[0, 0], [0.3, 0], [0.322, 0.012], [0.33, 0.032], [0.322, 0.052], [0.3, 0.062], [0.27, 0.062], [0, 0.064]], 24);
  const drop = new THREE.Shape(); drop.moveTo(0, 0.02); drop.bezierCurveTo(0.05, 0.03, 0.06, 0.11, 0, 0.14); drop.bezierCurveTo(-0.06, 0.11, -0.05, 0.03, 0, 0.02);
  const dropG = slab(drop, 0.012, 0.004, 0.004, 5, 1);
  const slice = (x, z, y, rot) => {
    const o = grp(body, [x, y, z], null, rot);
    add(prof, skin, [0, 0, 0], o);
    add(new THREE.CylinderGeometry(0.27, 0.27, 0.004, 24), flesh, [0, 0.062, 0], o);
    add(new THREE.CylinderGeometry(0.05, 0.05, 0.006, 10), M(0xf7a088, { r: 0.25 }), [0, 0.064, 0], o);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * TAU, p = grp(o, [0, 0.058, 0], null, [0, a, 0]);
      add(dropG, seed, [0, 0, 0], p, null, [1.35, 1, -1.25]);
    }
  };
  slice(0, -0.25, 0, [0.04, 0.3, 0]); slice(-0.23, 0.15, 0.025, [0, 1.1, 0.06]); slice(0.23, 0.15, 0.05, [-0.03, 2.0, -0.07]);
  fitH(body, 0.12);
