// 程序化像素美术：人物、车辆（无外部素材）
(function (Y) {
  const S = Y.sprites = {};
  const cache = {};
  function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  S.cv = cv;
  function px(g, col, x, y, w, h) { g.fillStyle = col; g.fillRect(x, y, w || 1, h || 1); }

  function drawChar(g, p, d, f) {
    const hair = p.hair, skin = p.skin, shirt = p.shirt, pants = p.pants, shoes = p.shoes || '#111';
    px(g, 'rgba(0,0,0,0.28)', 4, 14, 8, 2);
    // 腿
    const lA = f === 1 ? 1 : 0, lB = f === 2 ? 1 : 0;
    if (d === 'left' || d === 'right') {
      px(g, pants, 6, 12, 4, 2);
      if (f === 0) { px(g, pants, 6, 14 - 0, 2, 1); px(g, shoes, 6, 15, 3, 1); px(g, pants, 8, 14, 2, 1); }
      else if (f === 1) { px(g, pants, 5, 13, 2, 2); px(g, shoes, 4, 15, 3, 1); px(g, pants, 9, 13, 2, 1); px(g, shoes, 9, 14, 2, 1); }
      else { px(g, pants, 9, 13, 2, 2); px(g, shoes, 9, 15, 3, 1); px(g, pants, 5, 13, 2, 1); px(g, shoes, 5, 14, 2, 1); }
    } else {
      px(g, pants, 5, 12, 2, 2 + (lA ? 0 : 1)); px(g, pants, 9, 12, 2, 2 + (lB ? 0 : 1));
      px(g, shoes, 5, 14 + (lA ? -1 : 0) + 0, 2, 1); px(g, shoes, 9, 14 + (lB ? -1 : 0), 2, 1);
      if (!lA) px(g, shoes, 5, 15, 2, 1); else px(g, shoes, 5, 14, 2, 1);
      if (!lB) px(g, shoes, 9, 15, 2, 1); else px(g, shoes, 9, 14, 2, 1);
    }
    // 身体
    px(g, shirt, 4, 8, 8, 4);
    if (p.jacket) { px(g, p.jacket, 4, 8, 3, 4); px(g, p.jacket, 9, 8, 3, 4); if (d === 'up') px(g, p.jacket, 4, 8, 8, 4); }
    if (p.dress) px(g, p.dress, 4, 10, 8, 3);
    // 手臂
    const arm = p.jacket || shirt;
    const swing = (f === 1 ? 1 : f === 2 ? -1 : 0);
    if (d === 'down' || d === 'up') {
      px(g, arm, 3, 8 + Math.max(0, swing), 1, 3); px(g, skin, 3, 11 + Math.max(0, swing), 1, 1);
      px(g, arm, 12, 8 + Math.max(0, -swing), 1, 3); px(g, skin, 12, 11 + Math.max(0, -swing), 1, 1);
    } else {
      const ax = d === 'left' ? 7 + swing : 8 - swing;
      px(g, arm, ax, 9, 1, 2); px(g, skin, ax, 11, 1, 1);
    }
    // 头
    px(g, skin, 5, 2, 6, 6);
    // 头发
    px(g, hair, 4, 1, 8, 2);
    if (p.long) { px(g, hair, 4, 2, 1, 7); px(g, hair, 11, 2, 1, 7); }
    if (d === 'up') { px(g, hair, 4, 1, 8, 6); if (p.long) px(g, hair, 4, 2, 8, 7); }
    else if (d === 'left') { px(g, hair, 8, 2, 4, 3); px(g, hair, 4, 2, 1, 1); }
    else if (d === 'right') { px(g, hair, 4, 2, 4, 3); px(g, hair, 11, 2, 1, 1); }
    else { px(g, hair, 4, 2, 1, 2); px(g, hair, 11, 2, 1, 2); px(g, hair, 5, 2, 3, 1); }
    // 五官
    const eye = '#1b1b1b';
    if (d === 'down') {
      if (p.glasses) { px(g, '#222', 5, 4, 6, 1); px(g, '#9fd3ff', 6, 4, 1, 1); px(g, '#9fd3ff', 9, 4, 1, 1); }
      else { px(g, eye, 6, 4, 1, 1); px(g, eye, 9, 4, 1, 1); }
      px(g, p.lip || '#c4776a', 7, 6, 2, 1);
    } else if (d === 'left') {
      px(g, eye, 5, 4, 1, 1); if (p.glasses) px(g, '#222', 5, 4, 3, 1);
    } else if (d === 'right') {
      px(g, eye, 10, 4, 1, 1); if (p.glasses) px(g, '#222', 8, 4, 3, 1);
    }
    if (p.accent) px(g, p.accent, 7, 8, 2, 1);
  }

  // 返回 {down:[3帧], left, right, up}，每帧 16x16
  S.char = function (p) {
    const key = 'c' + JSON.stringify(p);
    if (cache[key]) return cache[key];
    const out = {};
    for (const d of ['down', 'left', 'right', 'up']) {
      out[d] = [];
      for (let f = 0; f < 3; f++) { const c = cv(16, 16); drawChar(c.getContext('2d'), p, d, f); out[d].push(c); }
    }
    return (cache[key] = out);
  };

  S.car = function (color) {
    const key = 'car' + color; if (cache[key]) return cache[key];
    const out = {};
    for (const d of ['down', 'left', 'right', 'up']) {
      const c = cv(20, 20), g = c.getContext('2d');
      const horiz = d === 'left' || d === 'right';
      g.save();
      if (!horiz) { g.translate(20, 0); g.rotate(Math.PI / 2); }
      // 车身（朝右绘制）
      px(g, 'rgba(0,0,0,0.3)', 1, 13, 18, 3);
      px(g, '#111', 3, 4, 3, 2); px(g, '#111', 14, 4, 3, 2); px(g, '#111', 3, 14, 3, 2); px(g, '#111', 14, 14, 3, 2);
      px(g, color, 1, 6, 18, 8); px(g, color, 2, 5, 16, 10);
      px(g, '#bfe6ff', 10, 6, 4, 8); px(g, '#8fc4e8', 5, 7, 3, 6);
      px(g, '#fff6b0', 18, 6, 1, 2); px(g, '#fff6b0', 18, 12, 1, 2);
      px(g, '#d33', 1, 6, 1, 2); px(g, '#d33', 1, 12, 1, 2);
      g.restore();
      let fc = c;
      if (d === 'left' || d === 'up') { const c2 = cv(20, 20), g2 = c2.getContext('2d'); g2.translate(20, 20); g2.rotate(Math.PI); g2.drawImage(c, 0, 0); fc = c2; }
      out[d] = fc;
    }
    return (cache[key] = out);
  };

  // 随机路人外观
  S.randomLook = function (rand, gender) {
    const skins = ['#f1c9a5', '#e8b98f', '#c99a6e', '#8d5a3b', '#f5d6b8', '#e0ac7e'];
    const hairs = ['#1b1b1b', '#3b2416', '#7a4a24', '#c9a24b', '#a83a2a', '#e8d8a0', '#555'];
    const shirts = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#ecf0f1', '#e84393', '#16a085', '#34495e'];
    const pants = ['#2c3e50', '#34495e', '#7f8c8d', '#1e272e', '#6d4c41', '#3d5a80'];
    const pick = a => a[Math.floor(rand() * a.length)];
    const look = { skin: pick(skins), hair: pick(hairs), shirt: pick(shirts), pants: pick(pants), shoes: '#222' };
    if (gender === 'f') { look.long = rand() < 0.75; if (rand() < 0.5) look.dress = look.shirt; look.lip = '#d6587a'; }
    return look;
  };
})(window.YXRS);
