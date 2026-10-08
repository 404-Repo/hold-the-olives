  // DIFFERENT READING: a turned handle (lathe with a collar and a knob end, laid flat) and a deep scooped bowl from a deformed sphere
  const body = grp(g);
  const wd = timber(C.wood, 0.6), wdk = timber(0xb5844f, 0.6);
  const h = add(lathe([[0, 0], [0.07, 0.0], [0.1, 0.05], [0.1, 0.12], [0.075, 0.18], [0.08, 1.6], [0.1, 1.68], [0.1, 1.74], [0.075, 1.8], [0.07, 1.95], [0, 1.95]], 10), wd, [0, 0.1, -1.5], body, [PI / 2, 0, 0]);
  const bowl = deform(new THREE.SphereGeometry(0.4, 18, 12), (v) => { if (v.y > 0.05) v.y = 0.05 - (v.y - 0.05) * 0.5; v.y *= 0.55; });
  add(bowl, M(C.wood, { r: 0.6, name: 'timber' }), [0, 0.2, 0.95], body, null, [0.9, 1, 1.25]);
  add(new THREE.TorusGeometry(0.1, 0.02, 6, 12), wdk, [0, 0.1, 0.12], body);
  fitWHD(body, 0.72, 0.2, 3.0);
