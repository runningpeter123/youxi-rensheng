// 俯视角瓦片地图：每座城市按 layout（cities.js）生成独立的道路网、水域、街区和像素地标
(function (Y) {
  const T = { GRASS: 0, ROAD: 1, WATER: 2, TREE: 3, BUILD: 4, DOCK: 5, RUNWAY: 6, PLAZA: 7, SAND: 8, FLOWER: 9, SHIP: 10, LANDMARK: 11, BRIDGE: 12 };
  const TS = 16;
  const SOLID = new Set([T.WATER, T.TREE, T.BUILD, T.SHIP, T.LANDMARK]);
  const SIZES = { home: [5, 5], hq: [9, 7], bank: [8, 6], airport: [7, 6], cafe: [5, 5], garage: [6, 5], club: [5, 5], lab: [9, 6], harbor: [6, 4] };
  const ORDER = ['airport', 'hq', 'lab', 'bank', 'garage', 'home', 'cafe', 'club'];
  const LM_MIN = { clocktower: [5, 6], garagehouse: [6, 4], ferris: [7, 7], palms: [6, 4], skyline: [7, 6], needle: [5, 7], market: [7, 4], tvtower: [5, 7], bund: [8, 5], tower101: [5, 7], nightmarket: [7, 4], redtower: [5, 7], torii: [5, 4], pagoda: [5, 7], archbridge: [7, 4], bigclock: [5, 7], stadium: [8, 5], warehouse: [7, 4], palace: [8, 5], bean: [6, 4], dome: [7, 6], obelisk: [4, 7] };
  const ICON = { home: '🏠', hq: '🏢', bank: '🏦', airport: '✈️', cafe: '☕', garage: '🚗', club: '🍸', lab: '🔬', harbor: '🛳️' };
  const ROOF = { home: '#b0503c', hq: '#2f4f6f', bank: '#8a6d2f', airport: '#4a6a8a', cafe: '#7a4a2a', garage: '#555', club: '#6a2f6a', lab: '#2f6f5f', harbor: '#2f5f8f' };
  const LM_ICON = { clocktower: '🕰️', garagehouse: '🔧', ferris: '🎡', palms: '🌴', skyline: '🏙️', needle: '🗼', market: '🐟', tvtower: '📡', bund: '🏛️', tower101: '🏙️', nightmarket: '🏮', redtower: '🗼', torii: '⛩️', statue: '🗽', pagoda: '🛕', archbridge: '🌉', bigclock: '🕰️', stadium: '🏟️', warehouse: '🧱', palace: '🏰', bean: '🫘', dome: '🏛️', obelisk: '🗿' };

  function generate(city, celeb) {
    const L = city.layout, W = L.W, H = L.H;
    const rand = Y.rng(city.seed * 7919 + 13);
    const tiles = new Uint8Array(W * H).fill(T.GRASS);
    const set = (x, y, t) => { if (x >= 0 && y >= 0 && x < W && y < H) tiles[y * W + x] = t; };
    const get = (x, y) => (x < 0 || y < 0 || x >= W || y >= H) ? T.WATER : tiles[y * W + x];
    const sepRow = new Set(), sepCol = new Set();
    const vRoads = L.v.slice();
    // 水域
    if (L.water === 'bottom') { for (let y = H - 6; y < H; y++) { sepRow.add(y); for (let x = 0; x < W; x++) set(x, y, y >= H - 5 ? T.WATER : T.SAND); } }
    if (L.water === 'right') { for (let x = W - 6; x < W; x++) { sepCol.add(x); for (let y = 0; y < H; y++) set(x, y, x >= W - 5 ? T.WATER : T.SAND); } vRoads.push(W - 8); }
    if (L.water === 'river') { for (let y = L.ry; y < L.ry + 3; y++) { sepRow.add(y); for (let x = 0; x < W; x++) set(x, y, T.WATER); } }
    // 道路
    for (const r of L.h) for (const y of [r, r + 1]) { sepRow.add(y); for (let x = 0; x < W; x++) { if (L.water === 'right' && x >= W - 6) continue; set(x, y, T.ROAD); } }
    for (const c of vRoads) for (const x of [c, c + 1]) { sepCol.add(x); for (let y = 0; y < H; y++) { if (L.water === 'bottom' && y >= H - 6) continue; set(x, y, get(x, y) === T.WATER ? T.BRIDGE : T.ROAD); } }
    const isRoad = t => t === T.ROAD || t === T.BRIDGE;
    // 街区
    const runs = (n, sep) => { const a = []; let s = -1; for (let i = 0; i <= n; i++) { if (i < n && !sep.has(i)) { if (s < 0) s = i; } else if (s >= 0) { a.push([s, i - 1]); s = -1; } } return a; };
    const blocks = [];
    for (const [y0, y1] of runs(H, sepRow)) for (const [x0, x1] of runs(W, sepCol)) {
      if (y1 + 1 >= H) continue;
      let ok = true; for (let x = x0; x <= x1; x++) if (!isRoad(get(x, y1 + 1))) ok = false;
      if (!ok || y1 - y0 + 1 < 4 || x1 - x0 + 1 < 5) continue;
      const coastal = (L.water === 'bottom' && y1 + 1 === H - 8) || (L.water === 'right' && x1 + 1 === W - 8) || (L.water === 'river' && y1 + 1 === L.ry - 2);
      blocks.push({ x0, y0, x1, y1, w: x1 - x0 + 1, h: y1 - y0 + 1, cursor: x0 + 1, used: false, coastal });
    }
    // 打乱（每城不同）
    for (let i = blocks.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [blocks[i], blocks[j]] = [blocks[j], blocks[i]]; }
    const buildings = [], landmarks = [];
    let runwayMid = -1;
    const MODE_LABELS = { athlete: { hq: '训练基地', lab: '康复中心', club: '球员俱乐部' }, politician: { hq: '竞选办公室', lab: '政策智库', club: '议员俱乐部' } };
    const label = type => {
      const ml = celeb && MODE_LABELS[celeb.mode];
      if (ml && ml[type]) return ml[type];
      return (type === 'hq' && celeb && city.id === celeb.homeCity) ? '你的公司总部' : city.labels[type];
    };
    function place(type, b, minW) {
      const [bw, bh] = SIZES[type];
      const fitW = Math.min(bw, b.x1 - b.cursor), fitH = Math.min(bh, b.h);
      if (fitW < (minW || 5) || fitH < 4) return false;
      const x = b.cursor, y = b.y1 - fitH + 1;
      for (let yy = y; yy <= b.y1; yy++) for (let xx = x; xx < x + fitW; xx++) set(xx, yy, T.BUILD);
      const door = { x: x + Math.floor(fitW / 2), y: b.y1 };
      b.cursor += fitW + 1; b.used = true;
      const pal = city.palette.wall;
      const bd = { type, x, y, w: fitW, h: fitH, label: label(type), icon: ICON[type], door, wall: pal[buildings.length % pal.length], roof: ROOF[type] };
      buildings.push(bd);
      if (type === 'airport' && b.x1 - b.cursor >= 3) {
        const ry0 = Math.max(b.y0, b.y1 - 5);
        for (let yy = ry0; yy <= b.y1; yy++) for (let xx = b.cursor; xx <= b.x1; xx++) set(xx, yy, T.RUNWAY);
        runwayMid = Math.floor((ry0 + b.y1) / 2); bd.runway = { x0: b.cursor, x1: b.x1, y0: ry0, y1: b.y1 };
        b.cursor = b.x1 + 2;
      }
      return true;
    }
    const space = b => b.x1 - b.cursor;
    // 1) 码头：必须临水
    const hb = blocks.filter(b => b.coastal).sort((a, b) => space(b) - space(a))[0];
    if (!hb || !place('harbor', hb)) throw new Error(city.id + ': no coastal block for harbor');
    // 2) 地标：占用整块空街区
    for (const lm of L.landmarks.filter(l => !l.decor)) {
      const [mw, mh] = LM_MIN[lm.type] || [5, 5];
      const b = blocks.filter(b => !b.used && b.w >= mw + 2 && b.h >= mh).sort((a, c) => (a.w * a.h) - (c.w * c.h))[0];
      if (!b) continue;
      b.used = true; b.lm = true; b.cursor = b.x1 + 2;
      const r = { type: lm.type, label: lm.label, icon: LM_ICON[lm.type], x0: b.x0 + 1, x1: b.x1 - 1, y0: b.y0, y1: b.y1 };
      for (let yy = r.y0; yy <= r.y1; yy++) for (let xx = r.x0; xx <= r.x1; xx++) set(xx, yy, T.LANDMARK);
      r.door = { x: Math.floor((r.x0 + r.x1) / 2), y: r.y1 };
      landmarks.push(r);
    }
    // 3) 其余建筑
    for (const type of ORDER) {
      const want = SIZES[type][0];
      let cands = blocks.filter(b => !b.lm && space(b) >= Math.min(want, 5));
      if (type === 'airport') cands.sort((a, b) => space(b) - space(a));
      else cands.sort((a, b) => (a.used - b.used) || (space(b) - space(a)) * (rand() < 0.5 ? 1 : -1));
      let ok = false;
      for (const b of cands) if (place(type, b)) { ok = true; break; }
      if (!ok) for (const b of blocks.filter(b => !b.lm)) if (place(type, b, 4)) { ok = true; break; }
      if (!ok) throw new Error(city.id + ': no room for ' + type);
    }
    // 装饰型地标（水中雕像）
    for (const lm of L.landmarks.filter(l => l.decor)) {
      let r;
      if (L.water === 'bottom') r = { x0: 3, x1: 5, y0: H - 4, y1: H - 2 };
      else if (L.water === 'right') r = { x0: W - 4, x1: W - 2, y0: 2, y1: 4 };
      else r = { x0: 2, x1: 4, y0: L.ry, y1: L.ry + 2 };
      for (let yy = r.y0; yy <= r.y1; yy++) for (let xx = r.x0; xx <= r.x1; xx++) set(xx, yy, T.LANDMARK);
      landmarks.push(Object.assign({ type: lm.type, label: lm.label, icon: LM_ICON[lm.type], decor: true }, r));
    }
    // 栈桥与邮轮
    const harbor = buildings.find(b => b.type === 'harbor');
    let ship = null;
    const freeWater = (x, y) => get(x, y) === T.WATER;
    if (L.water === 'bottom') {
      for (let y = H - 6; y <= H - 3; y++) for (const x of [harbor.door.x, harbor.door.x + 1]) set(x, y, T.DOCK);
      let sx = harbor.door.x + 3; if (sx + 11 > W - 1) sx = harbor.door.x - 13;
      ship = { x: sx, y: H - 4, w: 11, h: 3, vertical: false };
    } else if (L.water === 'right') {
      const dy = harbor.y + 1;
      for (let x = W - 6; x <= W - 3; x++) for (const y of [dy, dy + 1]) set(x, y, T.DOCK);
      let sy = dy + 3; if (sy + 9 > H - 1) sy = dy - 11;
      ship = { x: W - 4, y: Math.max(0, sy), w: 3, h: 9, vertical: true };
    } else {
      for (let y = L.ry; y <= L.ry + 1; y++) for (const x of [harbor.door.x, harbor.door.x + 1]) if (get(x, y) === T.WATER) set(x, y, T.DOCK);
      const fits = sx => { for (let x = sx; x < sx + 9; x++) for (let y = L.ry; y < L.ry + 3; y++) if (!freeWater(x, y)) return false; return true; };
      let sx = null;
      for (let d = 3; d < W && sx == null; d++) { if (fits(harbor.door.x + d)) sx = harbor.door.x + d; else if (fits(harbor.door.x - d - 8)) sx = harbor.door.x - d - 8; }
      if (sx != null) ship = { x: sx, y: L.ry, w: 9, h: 3, vertical: false };
    }
    if (ship) for (let y = ship.y; y < ship.y + ship.h; y++) for (let x = ship.x; x < ship.x + ship.w; x++) if (get(x, y) === T.WATER) set(x, y, T.SHIP);
    // 公园、树木、花
    const fountains = [];
    for (const b of blocks) {
      if (b.used || b.lm) continue;
      if (rand() < (L.parks || 0.2)) {
        for (let y = b.y0; y <= b.y1; y++) for (let x = b.x0; x <= b.x1; x++) set(x, y, T.PLAZA);
        fountains.push({ x: Math.floor((b.x0 + b.x1) / 2), y: Math.floor((b.y0 + b.y1) / 2) });
        b.park = true;
      }
    }
    for (const f of fountains) set(f.x, f.y, T.LANDMARK);
    const nearDoor = (x, y) => buildings.concat(landmarks).some(b => b.door && Math.abs(b.door.x - x) <= 2 && y >= b.door.y && y <= b.door.y + 3);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const t = get(x, y);
      if (t === T.PLAZA) { if (rand() < 0.06 && !fountains.some(f => Math.abs(f.x - x) <= 1 && Math.abs(f.y - y) <= 1)) set(x, y, T.FLOWER); continue; }
      if (t !== T.GRASS || nearDoor(x, y)) continue;
      let adj = false;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { const n = get(x + dx, y + dy); if (isRoad(n) || n === T.BUILD || n === T.LANDMARK || n === T.RUNWAY) adj = true; }
      const r = rand();
      if (!adj && r < 0.16) set(x, y, T.TREE); else if (r > 0.94) set(x, y, T.FLOWER);
    }
    const hq = buildings.find(b => b.type === 'hq'), ap = buildings.find(b => b.type === 'airport');
    const lamps = [];
    for (const r of L.h) for (const c of vRoads) if (isRoad(get(c, r))) lamps.push({ x: (c + 1) * TS, y: (r + 1) * TS });
    const lanes = [];
    for (const r of L.h) { const xmax = L.water === 'right' ? (W - 6) * TS : W * TS; lanes.push({ y: r * TS + 8, dir: -1, xmax }, { y: (r + 1) * TS + 8, dir: 1, xmax }); }
    return { W, H, TS, tiles, buildings, landmarks, city, get, ship, fountains, lamps, lanes, runwayMid,
      hRows: new Set(L.h.flatMap(r => [r, r + 1])), vCols: new Set(vRoads.flatMap(c => [c, c + 1])), hStarts: new Set(L.h), vStarts: new Set(vRoads),
      spawn: { x: hq.door.x * TS + 8, y: (hq.door.y + 1) * TS + 8 }, airportSpawn: { x: ap.door.x * TS + 8, y: (ap.door.y + 1) * TS + 8 },
      isSolid: (x, y) => SOLID.has(get(x, y)), isRoad, lights: [] };
  }

  // ---------------- 渲染 ----------------
  function render(map) {
    const P = map.city.palette, W = map.W, H = map.H;
    const c = Y.sprites.cv(W * TS, H * TS), g = c.getContext('2d');
    const rand = Y.rng(map.city.seed * 31 + 7);
    const px = (col, x, y, w, h) => { g.fillStyle = col; g.fillRect(Math.round(x), Math.round(y), Math.round(w || 1), Math.round(h || 1)); };
    const light = (x, y, w, h) => map.lights.push([x, y, w, h]);
    for (let ty = 0; ty < H; ty++) for (let tx = 0; tx < W; tx++) {
      const t = map.tiles[ty * W + tx], x = tx * TS, y = ty * TS;
      const grass = () => { px(P.grass, x, y, TS, TS); for (let i = 0; i < 6; i++) px(P.grass2, x + Math.floor(rand() * 15), y + Math.floor(rand() * 14), 1, 2); };
      switch (t) {
        case T.GRASS: case T.BUILD: case T.LANDMARK: grass(); break;
        case T.FLOWER: (map.get(tx, ty) === T.FLOWER && isPlazaNear(map, tx, ty) ? px(P.plaza, x, y, TS, TS) : grass()); for (let i = 0; i < 4; i++) { const fx = x + 2 + Math.floor(rand() * 11), fy = y + 2 + Math.floor(rand() * 11); px(['#ff6b9a', '#ffd93b', '#fff', '#b388ff'][i % 4], fx, fy, 2, 2); px('#3c7a2f', fx, fy + 2, 1, 2); } break;
        case T.TREE: grass(); px('rgba(0,0,0,0.25)', x + 3, y + 12, 11, 3); px('#6b4226', x + 7, y + 9, 3, 5); px('#2e7d32', x + 2, y + 2, 12, 8); px('#388e3c', x + 4, y + 0, 8, 11); px('#4caf50', x + 5, y + 2, 4, 3); break;
        case T.ROAD: case T.BRIDGE: {
          if (t === T.BRIDGE) { px(P.water, x, y, TS, TS); px('#8a8a90', x, y, TS, TS); }
          px(P.road, x + (t === T.BRIDGE && map.vCols.has(tx) && !map.vCols.has(tx - 1) ? 2 : 0), y, TS - (t === T.BRIDGE && map.vCols.has(tx) && !map.vCols.has(tx + 1) ? 2 : 0), TS);
          const inH = map.hRows.has(ty), inV = map.vCols.has(tx);
          if (inH && inV) { if (map.hStarts.has(ty)) for (let i = 1; i < 16; i += 4) px('rgba(255,255,255,0.35)', x + i, y + 1, 2, 3); }
          else if (inH && map.hStarts.has(ty)) { for (let i = 0; i < 16; i += 8) px('#f4d03f', x + i, y + 15, 5, 1); }
          else if (inV && map.vStarts.has(tx)) { for (let i = 0; i < 16; i += 8) px('#f4d03f', x + 15, y + i, 1, 5); }
          break; }
        case T.WATER: case T.SHIP: px(P.water, x, y, TS, TS); for (let i = 0; i < 3; i++) px('rgba(255,255,255,0.18)', x + Math.floor(rand() * 12), y + Math.floor(rand() * 14), 4, 1); break;
        case T.SAND: px(P.sand, x, y, TS, TS); for (let i = 0; i < 5; i++) px('rgba(0,0,0,0.08)', x + Math.floor(rand() * 15), y + Math.floor(rand() * 15)); break;
        case T.DOCK: px(P.water, x, y, TS, TS); px('#8d6e4a', x, y, TS, TS); for (let i = 0; i < 16; i += 4) px('#6d4e2a', x, y + i, TS, 1); break;
        case T.RUNWAY: px('#555a60', x, y, TS, TS); if (ty === map.runwayMid) px('#fff', x + 3, y + 15, 9, 2); break;
        case T.PLAZA: px(P.plaza, x, y, TS, TS); px('rgba(0,0,0,0.08)', x, y, TS, 1); px('rgba(0,0,0,0.08)', x, y, 1, TS); break;
      }
    }
    // 喷泉底座（动画在 game.js）
    for (const f of map.fountains) { const x = f.x * TS, y = f.y * TS; px(P.plaza, x, y, TS, TS); px('#9e9e9e', x + 1, y + 3, 14, 12); px('#4fc3f7', x + 3, y + 5, 10, 8); }
    // 邮轮
    if (map.ship) drawShip(px, map.ship);
    // 建筑
    for (const b of map.buildings) {
      const x = b.x * TS, y = b.y * TS, w = b.w * TS, h = b.h * TS;
      px('rgba(0,0,0,0.3)', x + 3, y + 4, w, h);
      px(b.wall, x, y, w, h);
      px(b.roof, x, y, w, 10); px('rgba(255,255,255,0.15)', x, y, w, 2);
      for (let wy = y + 28; wy < y + h - 14; wy += 12) for (let wx = x + 6; wx < x + w - 8; wx += 12) {
        if (Math.abs(wx + 4 - (b.door.x * TS + 8)) < 10 && wy > y + h - 30) continue;
        px('#5d7d9a', wx, wy, 8, 7); px('#a8d8ff', wx + 1, wy + 1, 6, 5); px('rgba(255,255,255,0.6)', wx + 1, wy + 1, 2, 2); light(wx + 1, wy + 1, 6, 5);
      }
      if (b.type === 'airport') { px('#cfd8dc', x + w - 26, y - 14, 14, 16); px('#4fc3f7', x + w - 25, y - 12, 12, 5); }
      if (b.type === 'garage') { px('#777', x + 8, y + h - 14, w - 16, 14); for (let i = 0; i < 14; i += 3) px('#666', x + 8, y + h - 14 + i, w - 16, 1); }
      if (b.type === 'cafe' || b.type === 'club') { for (let i = 0; i < w; i += 8) px(i % 16 ? '#fff' : (b.type === 'cafe' ? '#c0392b' : '#8e44ad'), x + i, y + h - 26, 8, 5); }
      const dx = b.door.x * TS, dy = b.door.y * TS;
      px('#3e2723', dx + 2, dy + 2, 12, 14); px('#5d4037', dx + 3, dy + 3, 10, 13); px('#ffd54f', dx + 11, dy + 9, 1, 2);
      px('rgba(20,20,30,0.85)', x + 4, y + 12, w - 8, 12);
    }
    // 地标
    for (const lm of map.landmarks) { const X = lm.x0 * TS, Yy = lm.y0 * TS, Wd = (lm.x1 - lm.x0 + 1) * TS, Hd = (lm.y1 - lm.y0 + 1) * TS; (LM_DRAW[lm.type] || LM_DRAW.generic)(px, X, Yy, Wd, Hd, light, map.city.palette); }
    return c;
  }
  function isPlazaNear(map, x, y) { return [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([a, b]) => map.get(x + a, y + b) === T.PLAZA); }

  function drawShip(px, s) {
    const x = s.x * TS, y = s.y * TS, w = s.w * TS, h = s.h * TS;
    if (!s.vertical) {
      px('rgba(0,0,0,0.25)', x + 6, y + 10, w - 8, h - 12);
      px('#f5f5f5', x + 4, y + 6, w - 8, h - 12); px('#1f3a5f', x + 4, y + h - 14, w - 8, 6); px('#f5f5f5', x, y + 10, 6, h - 22);
      px('#e0e0e0', x + 24, y - 2, w - 64, 14); for (let i = 0; i < (w - 70) / 10; i++) px('#4fc3f7', x + 30 + i * 10, y + 2, 5, 4);
      px('#c62828', x + w - 34, y - 10, 10, 18); px('#222', x + w - 34, y - 10, 10, 3);
    } else {
      px('rgba(0,0,0,0.25)', x + 8, y + 6, w - 10, h - 8);
      px('#f5f5f5', x + 6, y + 4, w - 12, h - 8); px('#1f3a5f', x + w - 12, y + 4, 6, h - 8);
      px('#e0e0e0', x + 10, y + 20, w - 22, h - 60); for (let i = 0; i < (h - 70) / 10; i++) px('#4fc3f7', x + 14, y + 26 + i * 10, 4, 5);
      px('#c62828', x + 12, y + h - 34, 14, 10);
    }
  }

  // 像素地标（通用造型，无商标/无真实名称）
  const LM_DRAW = {
    generic(px, X, Y0, W, H) { px('#999', X, Y0, W, H); },
    clocktower(px, X, Y0, W, H, light) {
      const cx = X + W / 2; px('#cfc6b0', X + 4, Y0 + H - 40, W - 8, 40); for (let i = X + 10; i < X + W - 14; i += 14) px('#6b5d4a', i, Y0 + H - 24, 8, 24);
      px('#e6dcc4', cx - 14, Y0 + 26, 28, H - 66); px('#b0503c', cx - 18, Y0 + 26, 36, 6);
      for (let i = 0; i < 18; i++) px('#8a3b2c', cx - 18 + i, Y0 + 26 - i, 36 - i * 2, 1);
      px('#fff', cx - 9, Y0 + 40, 18, 18); px('#333', cx - 1, Y0 + 42, 2, 8); px('#333', cx - 1, Y0 + 48, 7, 2);
      for (let y = Y0 + 66; y < Y0 + H - 50; y += 14) { px('#5d7d9a', cx - 4, y, 8, 9); light(cx - 4, y, 8, 9); }
    },
    garagehouse(px, X, Y0, W, H, light) {
      const by = Y0 + H - 44; px('#f2e2c4', X + 4, by, W - 30, 44); for (let i = 0; i < 16; i++) px('#9c4a3a', X + 4 + i, by - i, W - 30 - i * 2, 1);
      px('#8d8d8d', X + 12, by + 16, 34, 28); for (let i = 0; i < 28; i += 4) px('#777', X + 12, by + 16 + i, 34, 1);
      px('#5d7d9a', X + 52, by + 12, 10, 10); light(X + 52, by + 12, 10, 10);
      px('#2e7d32', X + W - 22, by + 4, 16, 18); px('#6b4226', X + W - 16, by + 22, 4, 18); px('#1565c0', X + W - 30, by + 30, 6, 6); px('#555', X + W - 28, by + 36, 2, 8);
    },
    ferris(px, X, Y0, W, H) {
      const cx = X + W / 2, r = Math.min(W, H) / 2 - 10, cy = Y0 + r + 6;
      px('#8d6e4a', X, Y0 + H - 14, W, 14); for (let i = 0; i < W; i += 6) px('#6d4e2a', X + i, Y0 + H - 14, 1, 14);
      for (let i = 0; i < 2 * r; i++) { px('#78909c', cx - r / 2 + i / 4 - 2, cy + i / 2 + 2, 3, 1); px('#78909c', cx + r / 2 - i / 4, cy + i / 2 + 2, 3, 1); }
      for (let a = 0; a < 64; a++) { const t = a / 64 * Math.PI * 2; px('#eceff1', cx + Math.cos(t) * r, cy + Math.sin(t) * r, 2, 2); }
      for (let s = 0; s < 8; s++) { const t = s / 8 * Math.PI * 2; for (let k = 0; k < r; k += 2) px('#b0bec5', cx + Math.cos(t) * k, cy + Math.sin(t) * k, 1, 1); px(['#e53935', '#fdd835', '#43a047', '#1e88e5'][s % 4], cx + Math.cos(t) * r - 4, cy + Math.sin(t) * r, 8, 7); }
      px('#455a64', cx - 3, cy - 3, 6, 6);
    },
    palms(px, X, Y0, W, H) {
      px('#e6d4b0', X, Y0 + H - 18, W, 18);
      for (let x = X + 8; x < X + W - 8; x += 22) { const ty = Y0 + 10 + ((x / 22) % 2) * 8; px('#8d6e4a', x + 6, ty + 10, 4, Y0 + H - ty - 14); for (let i = 0; i < 4; i++) { px('#2e7d32', x - 4 + i * 2, ty + 4 + i, 12, 2); px('#43a047', x + 6 + i * 2, ty + 4 + i, 10, 2); } px('#388e3c', x + 2, ty, 12, 6); }
    },
    skyline(px, X, Y0, W, H, light) {
      const cols = ['#78909c', '#90a4ae', '#607d8b', '#8d8f9e', '#a1887f'];
      let x = X;
      for (let i = 0; x < X + W - 12; i++) {
        const w = 18 + (i * 7 % 12), h = Math.round(H * (0.55 + ((i * 37) % 45) / 100)), y = Y0 + H - h;
        px(cols[i % cols.length], x, y, w, h); px('rgba(255,255,255,0.15)', x, y, 2, h);
        if (i % 2) { px('#555', x + w / 2 - 1, y - 8, 2, 8); }
        for (let wy = y + 6; wy < Y0 + H - 6; wy += 7) for (let wx = x + 3; wx < x + w - 4; wx += 5) { px('#b3d9f2', wx, wy, 3, 4); light(wx, wy, 3, 4); }
        x += w + 3;
      }
    },
    needle(px, X, Y0, W, H, light) {
      const cx = X + W / 2;
      for (let i = 0; i < H - 40; i++) { const sp = 3 + (i / (H - 40)) * 14; px('#eceff1', cx - sp, Y0 + 40 + i, 3, 1); px('#eceff1', cx + sp - 3, Y0 + 40 + i, 3, 1); }
      px('#cfd8dc', cx - 3, Y0 + 30, 6, H - 30);
      px('#b0bec5', cx - 24, Y0 + 24, 48, 6); px('#eceff1', cx - 20, Y0 + 18, 40, 6); px('#ff7043', cx - 18, Y0 + 30, 36, 3);
      for (let i = -16; i < 16; i += 6) { px('#fff59d', cx + i, Y0 + 20, 3, 3); light(cx + i, Y0 + 20, 3, 3); }
      px('#cfd8dc', cx - 1, Y0 + 2, 2, 16);
    },
    market(px, X, Y0, W, H, light) {
      const y = Y0 + H - 40;
      px('#8d6e4a', X, y + 20, W, 20);
      for (let x = X + 2; x < X + W - 20; x += 26) { for (let i = 0; i < 24; i += 6) px(i % 12 ? '#fff' : '#c62828', x + i, y, 6, 10); px('#5d4037', x + 1, y + 10, 2, 14); px('#5d4037', x + 21, y + 10, 2, 14); px('#4fc3f7', x + 4, y + 22, 16, 6); px('#cfd8dc', x + 6, y + 23, 4, 2); px('#cfd8dc', x + 12, y + 24, 5, 2); light(x + 4, y + 12, 16, 4); }
      px('rgba(20,20,30,0.85)', X + W / 2 - 30, Y0 + 4, 60, 12); px('#ff7043', X + W / 2 - 26, Y0 + 8, 52, 4);
    },
    tvtower(px, X, Y0, W, H, light) {
      const cx = X + W / 2;
      for (const dx of [-12, 0, 12]) px('#b0bec5', cx + dx - 2, Y0 + 30, 4, H - 30);
      const ball = (y, r, c) => { for (let i = -r; i <= r; i++) { const w = Math.round(Math.sqrt(r * r - i * i)); px(c, cx - w, y + i, w * 2, 1); } px('rgba(255,255,255,0.35)', cx - r / 2, y - r / 2, r / 2, r / 3); };
      ball(Y0 + H - 46, 18, '#ec407a'); ball(Y0 + 38, 11, '#ec407a'); ball(Y0 + H - 12, 8, '#f48fb1');
      px('#cfd8dc', cx - 2, Y0 + 2, 4, 26); px('#ff5252', cx - 1, Y0, 2, 3);
      light(cx - 14, Y0 + H - 50, 28, 4); light(cx - 8, Y0 + 36, 16, 3);
    },
    bund(px, X, Y0, W, H, light) {
      const n = 3, bw = Math.floor((W - 8) / n);
      for (let i = 0; i < n; i++) {
        const x = X + 4 + i * bw, h = H - 14 - (i === 1 ? 0 : 16), y = Y0 + H - h;
        px('#d7ccb7', x, y, bw - 4, h); px('#bfae90', x, y, bw - 4, 6);
        for (let c = x + 4; c < x + bw - 8; c += 8) px('#efe6d3', c, y + h - 26, 4, 26);
        for (let wy = y + 12; wy < y + h - 32; wy += 12) for (let wx = x + 4; wx < x + bw - 10; wx += 9) { px('#6d8aa6', wx, wy, 5, 7); light(wx, wy, 5, 7); }
        if (i === 1) { px('#bfae90', x + bw / 2 - 10, y - 18, 16, 18); px('#fff', x + bw / 2 - 6, y - 14, 8, 8); px('#8d7c5d', x + bw / 2 - 12, y - 22, 20, 5); }
      }
    },
    tower101(px, X, Y0, W, H, light) {
      const cx = X + W / 2, segs = 8, sh = (H - 30) / segs;
      px('#6d8f8a', cx - 22, Y0 + H - 18, 44, 18);
      for (let s = 0; s < segs; s++) {
        const y = Y0 + 24 + s * sh;
        for (let i = 0; i < sh; i++) { const w = 12 + i * 0.6; px('#4f8f86', cx - w, y + i, w * 2, 1); }
        px('#9be7d8', cx - 12, y + 2, 24, 2); light(cx - 10, y + 5, 20, 3);
      }
      px('#b0bec5', cx - 2, Y0 + 2, 4, 22); px('#ff5252', cx - 1, Y0, 2, 3);
    },
    nightmarket(px, X, Y0, W, H, light) {
      px('#b0a58f', X, Y0 + H - 30, W, 30);
      for (let x = X + 2; x < X + W - 18; x += 22) { px(['#e53935', '#fb8c00', '#fdd835', '#43a047'][Math.floor(x / 22) % 4], x, Y0 + H - 34, 20, 8); px('#6d4c41', x + 2, Y0 + H - 26, 16, 12); px('#fff', x + 6, Y0 + H - 40, 2, 4); }
      for (let x = X + 4; x < X + W - 4; x += 10) { const y = Y0 + 10 + Math.sin(x / 15) * 3; px('#5d4037', x, y - 2, 10, 1); px('#e53935', x + 2, y, 6, 7); px('#ffcc80', x + 4, y + 2, 2, 3); light(x + 2, y, 6, 7); }
    },
    redtower(px, X, Y0, W, H, light) {
      const cx = X + W / 2, h = H - 6;
      for (let i = 0; i < h; i++) { const sp = 2 + (i / h) * (W / 2 - 6); const band = Math.floor(i / 14) % 2 ? '#fafafa' : '#e53935'; px(band, cx - sp, Y0 + i, 3, 1); px(band, cx + sp - 3, Y0 + i, 3, 1); if (i % 7 === 0) px(band, cx - sp, Y0 + i, sp * 2, 1); }
      px('#e53935', cx - 14, Y0 + h * 0.55, 28, 8); px('#fff59d', cx - 12, Y0 + h * 0.55 + 2, 24, 3); light(cx - 12, Y0 + h * 0.55 + 2, 24, 3);
      px('#fafafa', cx - 8, Y0 + h * 0.3, 16, 5);
    },
    torii(px, X, Y0, W, H, light) {
      const cx = X + W / 2, by = Y0 + H;
      px('#bdbdbd', cx - 6, Y0 + 10, 12, H - 10);
      px('#8d6e63', cx - 18, Y0 + 2, 36, 20); px('#5d4037', cx - 22, Y0, 44, 5);
      px('#d32f2f', cx - 26, by - 44, 52, 5); px('#b71c1c', cx - 30, by - 48, 60, 4); px('#d32f2f', cx - 22, by - 36, 44, 3);
      px('#d32f2f', cx - 20, by - 44, 5, 44); px('#d32f2f', cx + 15, by - 44, 5, 44);
      for (const dx of [-W / 2 + 8, W / 2 - 14]) { px('#9e9e9e', cx + dx, by - 18, 6, 18); px('#fff59d', cx + dx + 1, by - 15, 4, 4); light(cx + dx + 1, by - 15, 4, 4); }
    },
    pagoda(px, X, Y0, W, H, light) {
      const cx = X + W / 2, lv = 6, lh = (H - 16) / lv;
      px('#8d8d7a', cx - 22, Y0 + H - 10, 44, 10);
      for (let i = 0; i < lv; i++) {
        const y = Y0 + 14 + i * lh, w = 10 + i * 2.4;
        px('#c9a36b', cx - w, y + 4, w * 2, lh - 4); px('#7b3f2a', cx - w - 6, y, w * 2 + 12, 4); px('#5d2e1f', cx - w - 8, y + 2, 4, 3); px('#5d2e1f', cx + w + 4, y + 2, 4, 3);
        px('#4a3426', cx - 3, y + 7, 6, lh - 9); light(cx - 3, y + 7, 6, lh - 9);
      }
      px('#d4af37', cx - 1, Y0, 3, 14);
    },
    archbridge(px, X, Y0, W, H, light, P) {
      const by = Y0 + H - 6;
      px(P.water, X, by - 14, W, 20); for (let i = 0; i < W; i += 8) px('rgba(255,255,255,0.3)', X + i, by - 4, 4, 1);
      for (let i = 0; i < W; i++) { const t = (i / W) * Math.PI, y = by - 16 - Math.sin(t) * 20; px('#d7ccc8', X + i, y, 1, 6); px('#a1887f', X + i, y + 6, 1, 2); }
      const cx = X + W / 2; for (let i = -14; i <= 14; i++) { const r = Math.sqrt(Math.max(0, 196 - i * i)); px('#5d4037', cx + i, by - 14 - r * 0.8, 1, 1); }
      px('#2e7d32', X + 2, Y0 + 4, 12, 14); px('#388e3c', X + W - 16, Y0 + 2, 14, 16); px('#6b4226', X + 7, Y0 + 18, 2, 10); px('#6b4226', X + W - 10, Y0 + 18, 2, 10);
    },
    bigclock(px, X, Y0, W, H, light) {
      const cx = X + W / 2;
      px('#c8b38a', cx - 12, Y0 + 30, 24, H - 30); for (let y = Y0 + 64; y < Y0 + H - 6; y += 10) { px('#8d7a55', cx - 10, y, 20, 2); px('#5d7d9a', cx - 6, y + 3, 4, 5); px('#5d7d9a', cx + 2, y + 3, 4, 5); light(cx - 6, y + 3, 12, 5); }
      px('#b39b6e', cx - 15, Y0 + 30, 30, 34); px('#fffde7', cx - 10, Y0 + 36, 20, 20); light(cx - 10, Y0 + 36, 20, 20); px('#333', cx - 1, Y0 + 38, 2, 9); px('#333', cx - 1, Y0 + 45, 7, 2);
      for (let i = 0; i < 22; i++) px('#556b2f', cx - 12 + i / 2, Y0 + 30 - i, 24 - i, 1);
      px('#d4af37', cx - 1, Y0 + 2, 2, 8);
    },
    stadium(px, X, Y0, W, H, light, P) {
      const y = Y0 + 10, h = H - 14;
      px('#cfd8dc', X + 2, y, W - 4, h); px('#b0bec5', X + 2, y, W - 4, 6); px('#b0bec5', X + 2, y + h - 6, W - 4, 6);
      px('#43a047', X + 12, y + 12, W - 24, h - 24); for (let i = 0; i < W - 24; i += 12) px('#388e3c', X + 12 + i, y + 12, 6, h - 24);
      px('#fff', X + W / 2, y + 12, 1, h - 24); px('#fff', X + 12, y + 12, W - 24, 1); px('#fff', X + 12, y + h - 13, W - 24, 1);
      for (let r = 0; r < 10; r++) { const a = r / 10 * Math.PI * 2; px('#fff', X + W / 2 + Math.cos(a) * 8, y + h / 2 + Math.sin(a) * 8, 1, 1); }
      const sc = P && P.accent ? P.accent : '#c62828'; for (let i = X + 6; i < X + W - 6; i += 4) px(sc, i, y + 7, 2, 3);
      for (const dx of [4, W - 8]) { px('#78909c', X + dx, Y0, 3, 14); px('#fffde7', X + dx - 2, Y0, 7, 4); light(X + dx - 2, Y0, 7, 4); }
    },
    warehouse(px, X, Y0, W, H, light) {
      const y = Y0 + H - 46;
      px('#8d4b3a', X + 2, y, W - 4, 46); for (let r = 0; r < 46; r += 4) px('#7a3f30', X + 2, y + r, W - 4, 1);
      for (let x = X + 8; x < X + W - 10; x += 12) { px('#3e4a56', x, y + 8, 6, 10); px('#3e4a56', x, y + 26, 6, 10); light(x, y + 8, 6, 10); }
      px('#5d4037', X + W - 24, y - 26, 8, 26); px('#9e9e9e', X + W - 24, y - 30, 8, 4);
    },
    palace(px, X, Y0, W, H, light) {
      const y = Y0 + 16, h = H - 18;
      px('#f5f0e6', X + 2, y, W - 4, h); px('#d8cfbd', X + 2, y, W - 4, 5); px('#d8cfbd', X + 2, y + h - 6, W - 4, 6);
      for (let x = X + 6; x < X + W - 8; x += 8) { px('#5d7d9a', x, y + 10, 4, 8); px('#5d7d9a', x, y + 24, 4, 8); light(x, y + 10, 4, 8); }
      const cx = X + W / 2; px('#f5f0e6', cx - 10, Y0 + 4, 20, 14); px('#c9b37e', cx - 12, Y0, 24, 5);
      px('#7b8c3a', X + 4, y + h - 2, W - 8, 2);
    },
    bean(px, X, Y0, W, H, light) {
      const cx = X + W / 2, cy = Y0 + H - 22, rx = Math.min(W / 2 - 6, 30), ry = 14;
      px('#cfc6b0', X, Y0 + H - 8, W, 8);
      for (let i = -ry; i <= ry; i++) { const w = Math.round(rx * Math.sqrt(1 - (i * i) / (ry * ry))); const c = i < -ry / 3 ? '#eceff1' : i < ry / 3 ? '#b0bec5' : '#78909c'; px(c, cx - w, cy + i, w * 2, 1); }
      px('#fff', cx - rx / 2, cy - ry + 3, rx / 2, 2); light(cx - rx / 2, cy - ry + 3, rx / 2, 2);
      px('#455a64', cx - 6, cy + ry - 4, 12, 4);
    },
    dome(px, X, Y0, W, H, light) {
      const cx = X + W / 2, by = Y0 + H - 4;
      px('#f5f5f5', X + 4, by - 26, W - 8, 26); for (let x = X + 8; x < X + W - 8; x += 7) px('#e0e0e0', x, by - 24, 3, 22);
      px('#eeeeee', cx - 18, by - 40, 36, 14); for (let x = cx - 16; x < cx + 16; x += 6) px('#d6d6d6', x, by - 38, 2, 12);
      const r = 16; for (let i = 0; i <= r; i++) { const w = Math.round(Math.sqrt(r * r - (r - i) * (r - i))); px('#fafafa', cx - w, by - 40 - r + i, w * 2, 1); }
      px('#e0e0e0', cx - 3, by - 62, 6, 8); px('#bdbdbd', cx - 1, by - 68, 2, 6);
      light(cx - 12, by - 22, 24, 4);
    },
    obelisk(px, X, Y0, W, H, light) {
      const cx = X + W / 2, h = H - 8;
      px('#cfc6b0', X, Y0 + H - 8, W, 8);
      for (let i = 0; i < h; i++) { const w = 4 + (i / h) * 5; px(i < 12 ? '#e0e0e0' : '#f5f5f5', cx - w, Y0 + i, w * 2, 1); }
      px('#d6d6d6', cx, Y0 + 12, 1, h - 12); px('#ff5252', cx - 1, Y0 + 2, 2, 2); light(cx - 1, Y0 + 2, 2, 2);
      for (const dx of [-W / 2 + 4, W / 2 - 8]) { px('#c62828', cx + dx, Y0 + H - 26, 4, 3); px('#78909c', cx + dx + 1, Y0 + H - 24, 1, 16); }
    },
    statue(px, X, Y0, W, H, light, P) {
      px(P.sand, X, Y0 + H - 14, W, 14); px('#9e9e9e', X + 10, Y0 + H - 26, W - 20, 14);
      const cx = X + W / 2; px('#4db6ac', cx - 6, Y0 + 10, 12, H - 36); px('#4db6ac', cx - 3, Y0 + 4, 6, 7);
      px('#4db6ac', cx + 5, Y0 - 6, 3, 18); px('#ffb300', cx + 4, Y0 - 12, 5, 6); light(cx + 4, Y0 - 12, 5, 6);
      for (let i = -4; i <= 4; i += 2) px('#80cbc4', cx + i, Y0 + 1, 1, 3);
    }
  };

  Y.map = { T, TS, generate, render, ICON, SIZES };
})(window.YXRS);
