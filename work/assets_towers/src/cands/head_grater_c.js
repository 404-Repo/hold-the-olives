  // DIFFERENT READING: a chunky toy grater, rounded frustum (8-sided bevel), the faces as instanced raised cone-bumps, a big rubber cap handle
  const body = grp(g);
  const steel = metal(C.steel, 0.3), blk = M(0x1d1d1f, { r: 0.45 }), base = metal(0x9aa1a7, 0.35);
  add(new THREE.CylinderGeometry(0.4, 0.43, 0.08, 28), base, [0, 0.04, 0], body);
  const H = 0.6, rb = 0.37, rt = 0.27, y0 = 0.08;
  add(new THREE.CylinderGeometry(rt, rb, H, 8, 1, false), steel, [0, y0 + H / 2, 0], body, [0, PI / 8, 0], [1, 1, 1]);
  const cone = new THREE.ConeGeometry(0.022, 0.05, 6); cone.rotateX(PI / 2 - 0.5);
  const hole = new THREE.CircleGeometry(0.02, 6);
  const N = 4 * 6 * 4, cones = new THREE.InstancedMesh(cone, steel, N), holes = new THREE.InstancedMesh(hole, M(0x1f2225, { r: 0.7 }), N);
  const ab = rb * Math.cos(PI / 8), at = rt * Math.cos(PI / 8), tilt = Math.atan2(ab - at, H), mt = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  let k = 0;
  for (let f = 0; f < 4; f++) for (let i = 0; i < 6; i++) for (let j = 0; j < 4; j++) {
    const y = y0 + 0.08 + i / 5 * (H - 0.16), a = ab + (at - ab) * (y - y0) / H, x = (-0.75 + j * 0.5) * a * 0.55 + (i % 2) * 0.03, yaw = f * PI / 2;
    e.set(tilt, yaw, 0, 'YXZ'); q.setFromEuler(e);
    const P = V(x, y, a + 0.012).applyAxisAngle(V(0, 1, 0), yaw);
    mt.compose(P, q, V(1, 1, 1)); cones.setMatrixAt(k, mt);
    mt.compose(V(x, y + 0.02, a + 0.002).applyAxisAngle(V(0, 1, 0), yaw), q, V(1, 0.6, 1)); holes.setMatrixAt(k, mt); k++;
  }
  body.add(cones, holes);
  add(new THREE.CylinderGeometry(rt * 0.95, rt, 0.06, 8), blk, [0, y0 + H + 0.03, 0], body, [0, PI / 8, 0]);
  add(new THREE.TorusGeometry(0.13, 0.045, 8, 16, PI), blk, [0, y0 + H + 0.06, 0], body);
  fitAll(body, 0.9);
