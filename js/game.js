// 游戏人生 · 主逻辑：状态、时间、效果、地图漫游、对话、存档
(function (Y) {
  'use strict';
  const TS = 16, SC = 2;
  let VW = 960, VH = 640; // 窄屏会改成竖向视口，见初始化
  const SAVE_KEY = 'yxrs_pixel_save_v2';
  const STATS = { cash: '资产', fame: '名气', charm: '魅力', energy: '精力', rel: '人际' };
  const TYPE_NAME = { fashion: '时尚达人', passerby: '路人', investor: '投资人', reporter: '记者', fan: '粉丝', engineer: '工程师', contact: '关键人物' };
  const CARS = [
    { name: '{pr_civic}', price: 1, color: '#7f8c8d' },
    { name: '{pr_benz}', price: 12, color: '#2c3e50' },
    { name: '{pr_mclaren}', price: 100, color: '#e67e22' },
    { name: '{co_tesla} {pr_roadster}', price: 10, color: '#c0392b', req: (s, api) => api.has('evco') && Math.floor(s.month / 12) >= 2008, reqText: '需拥有{co_tesla}且 2008 年后' },
    { name: '{co_tesla} {pr_models}', price: 8, color: '#ecf0f1', req: s => Math.floor(s.month / 12) >= 2012, reqText: '2012 年后上市' }
  ];

  let canvas, ctx, state = null, celeb = null, world = null, mapCanvas = null, npcs = [];
  const keys = {}; let modal = null; let hudTimer = 0; let walkAnim = 0;
  let clickPath = null, tutoring = false, inputLock = 0, cam = { x: 0, y: 0 };
  let guide = null, lastDistrict = '';
  const $ = s => document.querySelector(s);
  const t = s => Y.t(s); // 名称替换：所有显示文字都经过 names.js
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const R = () => Math.random();
  const pick = a => a[Math.floor(R() * a.length)];

  // ---------------- 状态 API（数据文件里的函数会拿到它） ----------------
  const api = {
    get: id => state.companies.find(c => c.id === id && c.status === 'active'),
    has: id => !!api.get(id),
    done: id => !!(state.nodes[id] && state.nodes[id].status === 'done'),
    activeCompanies: () => state.companies.filter(c => c.status === 'active'),
    ventures: () => state.companies.filter(c => c.status === 'active' && c.type !== 'holding'),
    holdings: () => state.companies.filter(c => c.status === 'active' && c.type === 'holding'),
    netWorth: () => state.cash + api.activeCompanies().reduce((a, c) => a + c.value * c.stake, 0),
    year: () => Math.floor(state.month / 12),
    mulAll: m => api.activeCompanies().forEach(c => { c.value *= m; }),
    growthAll: a => api.ventures().forEach(c => { c.growth += a; }),
    main: () => api.ventures().sort((a, b) => b.value * b.stake - a.value * a.stake)[0],
    mulMain: m => { const c = api.main(); if (c) c.value *= m; },
    growthMain: a => { const c = api.main(); if (c) c.growth += a; },
    // 支付一笔钱：现金不够时按比例出让持股补足（用于捐赠、投资等史实节点）
    pay: amount => {
      if (!(amount > 0)) return;
      let need = amount - Math.max(0, state.cash);
      state.cash -= amount;
      if (need <= 0) return;
      for (const c of api.activeCompanies().slice().sort((a, b) => b.value * b.stake - a.value * a.stake)) {
        const mine = c.value * c.stake; if (mine <= 0) continue;
        const take = Math.min(need, mine * 0.9);
        c.stake *= 1 - take / mine; state.cash += take; need -= take;
        if (need <= 0) break;
      }
    },
    addHolding: (id, amount, name, growth, vol) => {
      if (!(amount > 0)) return;
      const inv = Y.investments.find(i => i.id === id) || {};
      const hid = 'h_' + id;
      const ex = api.get(hid);
      if (ex) { ex.value += amount; return; }
      state.companies.push({ id: hid, name: name || inv.name || id, value: amount, stake: 1, growth: growth != null ? growth : (inv.growth || 0.08), vol: vol != null ? vol : (inv.vol || 0.4), status: 'active', type: 'holding', since: api.year() });
    }
  };

  function year() { return Math.floor(state.month / 12); }
  function monthOf() { return state.month % 12 + 1; }
  function age() { return year() - celeb.birthYear; }
  function city() { return Y.cities[state.city]; }

  // ---------------- 效果系统 ----------------
  function snapshot() { return { cash: state.cash, fame: state.fame, charm: state.charm, energy: state.energy, rel: state.rel, nw: api.netWorth() }; }
  function diffText(b) {
    const out = [];
    for (const k of ['fame', 'charm', 'energy', 'rel']) { const d = Math.round(state[k] - b[k]); if (d) out.push({ t: `${STATS[k]} ${d > 0 ? '+' : ''}${d}`, good: d > 0 }); }
    const dc = state.cash - b.cash; if (Math.abs(dc) >= 0.01) out.push({ t: `现金 ${dc > 0 ? '+' : ''}${Y.fmtMoney(dc)}`, good: dc > 0 });
    const dn = api.netWorth() - b.nw; if (Math.abs(dn) >= 0.5 && Math.abs(dn - dc) > 0.5) out.push({ t: `身家 ${dn > 0 ? '+' : ''}${Y.fmtMoney(dn)}`, good: dn > 0 });
    return out;
  }
  function addStat(k, v) {
    if (k === 'cash') { state.cash += v; return; }
    state[k] = clamp(state[k] + v, 0, 100);
  }
  function addCompany(spec) {
    const ex = api.get(spec.id); if (ex) { ex.status = 'merged'; }
    state.companies.push(Object.assign({ stake: 1, growth: 0.1, vol: 0.5 }, spec, { status: 'active', type: spec.type || 'company', since: year() }));
    logEv(`创立/入股「${spec.name}」`);
  }
  function modCompany(m) {
    const c = api.get(m.id); if (!c) return;
    if (m.name) c.name = m.name;
    if (m.value != null) c.value = m.value;
    if (m.mul != null) c.value *= m.mul;
    if (m.stake != null) c.stake = m.stake;
    if (m.stakeMul != null) c.stake *= m.stakeMul;
    if (m.growth != null) c.growth = m.growth;
    if (m.growthAdd != null) c.growth += m.growthAdd;
    if (m.vol != null) c.vol = m.vol;
  }
  function sellCompany(x) {
    if (typeof x === 'string') x = { id: x };
    const c = api.get(x.id); if (!c) return 0;
    const v = x.cash != null ? x.cash : c.value * c.stake * (x.mul != null ? x.mul : 1);
    state.cash += v; c.status = 'sold';
    logEv(`出售「${c.name}」，获得 ${Y.fmtMoney(v)}`);
    return v;
  }
  function applyEffects(e) {
    if (!e) return [];
    const b = snapshot();
    if (typeof e === 'function') e = e(state, api) || {};
    for (const k of Object.keys(STATS)) if (e[k]) addStat(k, e[k]);
    if (e.add) addCompany(e.add);
    (e.mod || []).forEach(modCompany);
    (e.sell || []).forEach(sellCompany);
    (e.close || []).forEach(id => { const c = api.get(id); if (c) { c.status = 'closed'; logEv(`「${c.name}」关闭了`); } });
    if (e.flags) Object.assign(state.flags, e.flags);
    if (e.car) { state.car = e.car; state.carColor = (CARS.find(c => c.name === e.car) || { color: '#e67e22' }).color; }
    return diffText(b);
  }
  function resolveChoice(ch) {
    let eff = ch.effects, res = ch.result, luck = null;
    if (ch.chance) {
      const p = typeof ch.chance.p === 'function' ? ch.chance.p(state, api) : ch.chance.p;
      const ok = R() < p; const o = ok ? ch.chance.ok : ch.chance.fail;
      eff = o.effects; res = o.result; luck = { ok, p };
    }
    const changes = applyEffects(eff);
    if (typeof res === 'function') res = res(state, api);
    return { res: res || '', changes, luck };
  }
  function logEv(text) { if (!state) return; state.log.push({ y: year(), m: monthOf(), text }); if (state.log.length > 300) state.log.shift(); }

  // ---------------- 时间推进 ----------------
  function advance(n) {
    const y0 = year();
    for (let i = 0; i < n; i++) {
      state.month++;
      for (const c of api.activeCompanies()) {
        c.value *= 1 + c.growth / 12 + (R() * 2 - 1) * c.vol * 0.05;
        if (c.value < 0.5 && c.type !== 'holding') { c.status = 'closed'; logEv(`「${c.name}」破产了`); toast(`💥「${c.name}」破产了`); }
      }
      state.energy = clamp(state.energy + 2, 0, 100);
      if (state.month % 12 === 0) yearTick();
    }
    if (year() !== y0) Y.audio.sfx('chime'), toast(`🎂 ${year()} 年，${celeb.short} ${age()} 岁`);
    save();
  }
  function allEvents() { return Y.events.concat(celeb.events || []); }
  function yearTick() {
    const y = year();
    for (const c of api.holdings()) c.growth = Math.max(0.05, c.growth * 0.9);
    for (const c of api.ventures()) if (c.growth > 0.2) c.growth = Math.max(0.12, c.growth * 0.97);
    // 时代事件不再突然弹窗，改到咖啡馆的「时代新闻」里，由玩家自己打开。
  }
  function checkNodes() { refreshGuide(false); }
  function processQueue() {
    const q = state.queue.shift(); if (!q) return;
    if (q.kind === 'ending') { state.ended = true; save(); showEnding(); }
  }

  // ---------------- 对话框 ----------------
  function dialog(o) {
    closeDialog(true);
    inputLock = performance.now() + 320;
    const root = $('#modal'); root.innerHTML = '';
    const box = document.createElement('div'); box.className = 'box ' + (o.cls || '');
    if (o.tag) { const t = document.createElement('div'); t.className = 'tag'; t.textContent = Y.t(o.tag); box.appendChild(t); }
    if (o.title) { const h = document.createElement('h2'); h.textContent = t(o.title); box.appendChild(h); }
    if (o.text) { const p = document.createElement('div'); p.className = 'text'; p.textContent = t(o.text); box.appendChild(p); }
    if (o.html) { const p = document.createElement('div'); p.className = 'html'; p.innerHTML = t(o.html); box.appendChild(p); }
    if (o.changes && o.changes.length) {
      const c = document.createElement('div'); c.className = 'chips';
      o.changes.forEach(x => { const s = document.createElement('span'); s.className = 'chip ' + (x.good ? 'good' : 'bad'); s.textContent = t(x.t); c.appendChild(s); });
      box.appendChild(c);
    }
    const list = document.createElement('div'); list.className = 'choices';
    const choices = (o.choices || []).slice();
    if (o.closable !== false) choices.push({ label: o.closeLabel || '离开', fn: null, ghost: true });
    choices.forEach((ch, i) => {
      const b = document.createElement('button'); b.className = 'choice' + (ch.ghost ? ' ghost' : '') + (ch.hist ? ' hist' : '');
      b.disabled = !!ch.disabled; b.dataset.i = i;
      b.innerHTML = `<span class="num">${i + 1}</span><span class="lbl"></span>` + (ch.sub ? `<span class="sub"></span>` : '');
      b.querySelector('.lbl').textContent = t(ch.label); if (ch.sub) b.querySelector('.sub').textContent = t(ch.sub);
      b.onclick = () => {
        if (b.disabled) return;
        if (ch.danger) { openConfirm(ch); return; }
        Y.audio.sfx('select'); closeDialog(); if (ch.fn) ch.fn();
      };
      b.onmouseenter = () => focusChoice(i, false);
      list.appendChild(b);
    });
    box.appendChild(list);
    root.appendChild(box); root.classList.add('show');
    modal = { o, choices, focus: -1 };
    if (choices.length === 1 && !choices[0].danger && !choices[0].disabled) focusChoice(0, false);
    Object.keys(keys).forEach(k => keys[k] = false);
  }
  function focusChoice(i, wrap) {
    if (!modal) return;
    const btns = [...document.querySelectorAll('#modal .choice')];
    const usable = btns.map((b, idx) => b.disabled ? -1 : idx).filter(idx => idx >= 0);
    if (!usable.length) return;
    let next = i;
    if (btns[i] && btns[i].disabled) next = usable[0];
    if (wrap) {
      const pos = usable.indexOf(modal.focus);
      next = usable[(pos + (i >= modal.focus ? 1 : usable.length - 1)) % usable.length];
    }
    modal.focus = next;
    btns.forEach((b, idx) => b.classList.toggle('focus', idx === next));
  }
  function openConfirm(ch) {
    const prev = modal && modal.o;
    dialog({
      cls: 'node', title: '再确认一次',
      text: t(`你要选择：\n${ch.label}\n\n这会记下来，不能靠误触完成。`),
      closable: false,
      choices: [
        { label: '确认', fn: ch.fn },
        { label: '返回', fn: () => { if (prev) dialog(prev); } }
      ]
    });
  }
  function closeDialog(silent) { const root = $('#modal'); root.classList.remove('show'); root.innerHTML = ''; modal = null; if (!silent) updateHUD(); }
  function result(title, r, next) {
    if (r.luck) Y.audio.sfx(r.luck.ok ? 'coin' : 'fail'); else if (r.changes && r.changes.some(c => c.good)) Y.audio.sfx('coin');
    dialog({ title, text: r.res || '……', changes: r.changes, tag: r.luck ? (r.luck.ok ? `🎲 成功（概率 ${Math.round(r.luck.p * 100)}%）` : `🎲 失败（概率 ${Math.round(r.luck.p * 100)}%）`) : null,
      choices: [{ label: '继续', fn: next || null }], closable: false });
  }
  function info(title, text, html) { dialog({ title, text, html, closeLabel: '好的' }); }
  function needEnergy(n) { if (state.energy < n) { toast('😮‍💨 精力不足：回家休息、喝杯咖啡或去度个假吧'); return false; } return true; }

  function basisHTML(n) {
    const b = n.basis; if (!b) return '';
    const conf = b.conf === '高' ? '高（多来源一致）' : b.conf === '中' ? '中（资料有推算或出入）' : '待核实（游戏中仅作模糊表述）';
    return `<details class="basis"><summary>📚 史实依据</summary><ul>
      <li>时间：${n.year} 年${b.month ? b.month + ' 月' : '（月份未记载）'}</li>
      <li>当时年龄：${b.age} 岁 · 地点：${b.location}</li>
      <li>资料置信度：${conf}${b.vague ? ' · 本条为模糊/转述表述' : ''}</li>
      <li>依据公开资料整理（${b.sources} 个来源，链接见项目外的 SOURCES.md）。人名、公司名为戏仿名。</li>
      <li>“游戏备选”取自资料中列出的其他可能，属虚构分支；数值效果为游戏化简化。</li></ul></details>`;
  }
  function nodeTag(n) {
    const ageTxt = n.basis && n.basis.age ? n.basis.age : (n.year - celeb.birthYear);
    return `📜 人生关键节点 · ${n.year} 年${n.month ? n.month + ' 月' : ''} · ${celeb.short} ${ageTxt} 岁`;
  }
  let scene = null, sceneCast = [], sceneLock = false, sceneTimer = null;
  const WHO_LOOK = {
    ally: { skin: '#f0c8a0', hair: '#3a2a1a', shirt: '#2b4f7a', pants: '#333', shoes: '#111' },
    family: { skin: '#f1c9a5', hair: '#7a5a3a', shirt: '#2e7d32', pants: '#333', shoes: '#111' },
    rival: { skin: '#e8c19b', hair: '#111', shirt: '#6a2a2a', pants: '#222', shoes: '#111' },
    press: { skin: '#f2d0ae', hair: '#555', shirt: '#546e7a', pants: '#333', shoes: '#111' },
    mentor: { skin: '#f0d6c0', hair: '#ddd', shirt: '#37474f', pants: '#333', shoes: '#111' }
  };
  function addBond(id, d) {
    if (!d) return;
    state.bonds = state.bonds || {};
    state.bonds[id] = Math.max(-30, Math.min(40, (state.bonds[id] || 0) + d));
  }
  function memoryLine() {
    const b = state.bonds || {};
    if ((b.ally || 0) >= 8) return '他看你的眼神比上一章软。你把顾虑说过给他听。';
    if ((b.ally || 0) <= -6) return '他站得远一点。上次你让他别问。';
    if ((b.family || 0) >= 8) return '口袋里还有家人塞的纸条。';
    if ((b.rival || 0) <= -6) return '对手还记得你寸步不让的那一次。';
    return '';
  }
  function clearSceneTimer() { if (sceneTimer) { clearInterval(sceneTimer); sceneTimer = null; } }
  function drawFace(who) {
    const cv = $('#scene-face'); if (!cv) return;
    const g = cv.getContext('2d');
    g.clearRect(0, 0, 16, 16);
    const look = who === 'inner' ? celeb.look : (WHO_LOOK[who] || WHO_LOOK.ally);
    const frame = Y.sprites.char(look).down[0];
    g.drawImage(frame, 0, 0);
  }
  function spawnSceneCast(ids) {
    sceneCast = (ids || ['ally']).filter(id => WHO_LOOK[id]).map((id, i) => ({
      id, look: WHO_LOOK[id],
      x: state.px + 70 + i * 18, y: state.py + 10,
      tx: state.px + 26 + i * 14, ty: state.py - 4
    }));
  }
  function hideScene() {
    clearSceneTimer();
    const root = $('#scene');
    if (root) { root.classList.remove('show'); root.dataset.kind = ''; root.dataset.mood = ''; }
    sceneCast = [];
    sceneLock = false;
    if (state) state.sceneEnv = null;
    scene = null;
  }
  function presentBeat(beat, meta, next) {
    const root = $('#scene');
    root.classList.add('show');
    root.dataset.kind = meta.kind || 'consequence';
    root.dataset.mood = meta.mood || '';
    sceneLock = true;
    state.sceneEnv = meta.env || 'office';
    const say = beat.interact ? null : beat;
    const spec = beat.interact || null;
    $('#scene-name').textContent = t(spec ? spec.name : (say.name || ''));
    $('#scene-expr').textContent = spec ? (spec.kind === 'crisis' ? '时间不多' : spec.kind === 'negotiate' ? '谈判' : spec.kind === 'press' ? '提问' : '对话') : (say.expr || '');
    $('#scene-line').textContent = t(spec ? spec.prompt : (say.line || ''));
    drawFace(spec ? spec.who : (say.who || 'inner'));
    const box = $('#scene-actions');
    box.innerHTML = '';
    const timer = $('#scene-timer');
    timer.textContent = '';
    clearSceneTimer();
    const go = (reply) => {
      clearSceneTimer();
      inputLock = performance.now() + 280;
      if (reply) {
        $('#scene-line').textContent = t(reply);
        box.innerHTML = '';
        const b = document.createElement('button');
        b.textContent = '继续';
        b.onclick = () => next();
        box.appendChild(b);
        scene.mode = 'say';
        scene.next = next;
        return;
      }
      next();
    };
    if (!spec) {
      const b = document.createElement('button');
      b.textContent = '继续';
      b.onclick = () => go();
      box.appendChild(b);
      scene.mode = 'say';
      scene.next = () => go();
      return;
    }
    scene.mode = 'pick';
    scene.next = null;
    spec.options.forEach(op => {
      const b = document.createElement('button');
      b.textContent = op.text;
      b.onclick = () => {
        addBond(op.bond, op.d || 0);
        if (op.fx) applyEffects(op.fx);
        go(op.reply);
      };
      box.appendChild(b);
    });
    if (spec.seconds) {
      let left = spec.seconds;
      timer.textContent = left + ' 秒';
      sceneTimer = setInterval(() => {
        left -= 1;
        timer.textContent = left > 0 ? (left + ' 秒') : '';
        if (left <= 0) {
          clearSceneTimer();
          const to = spec.timeout;
          if (to) { addBond(to.bond, to.d || 0); if (to.fx) applyEffects(to.fx); }
          go(to ? to.text : '时间到了。');
        }
      }, 1000);
    }
  }
  function playBeats(beats, meta, done) {
    state.sceneBusy = true;
    spawnSceneCast(meta.cast);
    if (Y.audio.mood) Y.audio.mood(meta.mood);
    else Y.audio.sfx(meta.mood === 'low' ? 'fail' : meta.mood === 'high' ? 'fanfare' : 'blip');
    let i = 0;
    const step = () => {
      if (i >= beats.length) { hideScene(); state.sceneBusy = false; done(); return; }
      const beat = beats[i++];
      scene = { mode: 'say', meta: meta };
      presentBeat(beat, meta, step);
    };
    scene = { mode: 'say', meta: meta };
    step();
  }
  function advanceScene() {
    if (!scene || scene.mode !== 'say' || !scene.next) return false;
    const n = scene.next;
    scene.next = null;
    n();
    return true;
  }
  function showNode(n) {
    const fictional = !!n.fictional;
    dialog({
      cls: 'node',
      tag: fictional ? '🔀 虚构推演' : nodeTag(n),
      title: fictional ? n.title : '这一章怎么走？',
      text: fictional ? '两条都会把平行人生写下去。点下去之后还要再确认一次。' : '选一条路。点下去之后还会再问一次，确认了才写入时间线。',
      html: fictional ? '<p class="hint">🔀 虚构推演，不是资料记载。</p>' : (`<div class="hint"><b>史实：</b>${t(n.history)}</div>` + basisHTML(n)),
      closable: false,
      choices: n.choices.map(ch => ({
        label: ch.text, hist: !!ch.history, danger: true,
        sub: fictional ? '🔀 虚构推演' : (ch.history ? '📜 史实选择' : ('🔀 游戏备选（虚构）' + (ch.chance ? ' · 🎲 有风险' : ''))),
        disabled: ch.req && !ch.req(state, api),
        fn: () => { const r = resolveChoice(ch); finishChapter(n, ch, r); }
      }))
    });
  }
  function leadBeats(n) {
    const beats = [];
    const mem = memoryLine();
    if (mem) beats.push({ who: 'inner', name: '心里话', expr: '沉', line: mem });
    let intro = n.fictional ? (n.intro || n.text || '') : (n.text || '');
    if (n.fictional && state.diverge && n.offset === 1) intro = '你刚才没有按资料走。你选的是「' + state.diverge.choice + '」。' + intro;
    beats.push({ who: 'inner', name: n.fictional ? '🔀 虚构推演' : '这一章', expr: '定', line: intro });
    if (!n.fictional && n.history) beats.push({ who: 'inner', name: '资料', expr: '定', line: n.history });
    const spec = n.kind ? Y.drama.interactOf(n.kind, n.prompt, n.who || '身边的人') : Y.drama.defaultInteract();
    beats.push({ interact: spec });
    return beats;
  }
  function openChapter(n) {
    if (!n) return;
    const d = guide || Y.story.describe(celeb, state, api);
    if (d && d.contact && d.phase === 'meet' && !n.fictional) {
      state.contactsDone[d.contact.id] = year();
      npcs = npcs.filter(x => !(x.contact && x.contact.id === d.contact.id));
    }
    inputLock = performance.now() + 420;
    playBeats(leadBeats(n), { mood: 'tense', env: n.fictional ? (n.env || 'garage') : 'office', kind: 'interact', cast: ['ally'] }, () => showNode(n));
  }
  function finishChapter(n, ch, r) {
    state.nodes[n.id] = { status: 'done', choice: ch.text, history: !!ch.history, fictional: !!n.fictional, year: year(), result: r.res };
    if (ch.tone) state.arcTone = ch.tone;
    logEv((n.fictional ? '🔀 ' : '') + '【' + n.title + '】' + ch.text + (ch.history ? '' : (n.fictional ? '' : '（游戏备选）')));
    if (!n.fictional && !ch.history && !state.arc) {
      const arcId = Y.drama.pickArc(ch, n);
      const arc = Y.drama.arcOf(celeb.id, arcId);
      if (arc) {
        state.arc = arcId;
        state.diverge = { from: n.title, choice: ch.text, year: year() };
        state.divergeYear = year();
        celeb.nodes.forEach(h => { if (!state.nodes[h.id]) state.nodes[h.id] = { status: 'skipped', reason: 'arc' }; });
        logEv('🔀 虚构推演开始：' + arc.title);
        toast('时间线分叉了：' + arc.title);
      }
    } else if (ch.history) toast('这一章和资料记录一致');
    save();
    const spec = n.fictional ? Y.drama.arcAfter(n, ch) : Y.drama.historicalAfter(n, ch, r);
    state.sceneBusy = true;
    if ($('#obj-kicker')) {
      $('#obj-kicker').textContent = spec.mood === 'low' ? '低谷' : (spec.mood === 'high' ? '高光' : '余波');
      $('#obj-title').textContent = t(n.title);
      $('#obj-main').textContent = '场面还没结束。';
    }
    playBeats(spec.beats, spec, () => {
      const histChoice = (n.choices.find(c => c.history) || {}).text || '';
      const arc = state.arc && Y.drama.arcOf(celeb.id, state.arc);
      const cmp = n.fictional ? '这是平行人生里的一步。' : (ch.history ? '和资料里的选择相同。' : '和资料不同。后面的资料章节先让路，改走「' + (arc ? arc.title : '虚构推演') + '」。');
      dialog({
        cls: 'node wide', tag: n.fictional ? '🔀 虚构推演' : '本章结算', title: t(n.title),
        html: t(`<p>${cmp}</p><p><b>你的选择：</b>${ch.text}</p>` + (histChoice && !n.fictional ? `<p><b>资料中的选择：</b>${histChoice}</p>` : '')) + (n.fictional ? '' : basisHTML(n)),
        changes: (r.changes || []).concat(bondChips()),
        closable: false,
        choices: [{ label: guide && guide.phase === 'done' ? '打开人生回顾' : '进入下一章', fn: () => { refreshGuide(true); updateHUD(); if (!Y.story.current(celeb, state, api)) { state.ended = true; save(); showEnding(); } } }]
      });
    });
  }
  function bondChips() {
    const name = { ally: '盟友', family: '家人', rival: '对手', mentor: '引路人' };
    return Object.keys(state.bonds || {}).filter(k => state.bonds[k]).map(k => ({ t: (name[k] || k) + ' ' + (state.bonds[k] > 0 ? '+' : '') + state.bonds[k], good: state.bonds[k] > 0 }));
  }
  function showEvent(e) {
    let autoChanges = [];
    if (e.auto) autoChanges = applyEffects(e.auto);
    dialog({
      tag: `⚡ 事件 · ${year()} 年`, title: e.title, text: e.text, changes: autoChanges, closable: false,
      choices: e.choices.map(ch => ({ label: ch.text, danger: true, sub: ch.chance ? '🎲 有风险' : '', fn: () => { const r = resolveChoice(ch); logEv(`${e.title}：${ch.text}`); save(); result(e.title, r); } }))
    });
  }

  // ---------------- 建筑 ----------------
  function companyTable(list) {
    if (!list.length) return '<p class="muted">（还没有任何公司或持仓）</p>';
    return '<table class="tbl"><tr><th>名称</th><th>估值</th><th>持股</th><th>你的份额</th><th>年增速</th></tr>' + list.map(c =>
      `<tr><td>${c.type === 'holding' ? '📈 ' : '🏢 '}${c.name}</td><td>${Y.fmtMoney(c.value)}</td><td>${Math.round(c.stake * 1000) / 10}%</td><td>${Y.fmtMoney(c.value * c.stake)}</td><td>${Math.round(c.growth * 100)}%</td></tr>`).join('') + '</table>';
  }
  function pickCompany(title, fn, list, danger) {
    list = list || api.ventures();
    if (!list.length) { info(title, '你还没有公司。去研发园区或咖啡馆启动一个项目吧。'); return; }
    dialog({ title, choices: list.map(c => ({ label: c.name, danger: !!danger, sub: `估值 ${Y.fmtMoney(c.value)} · 持股 ${Math.round(c.stake * 100)}%`, fn: () => fn(c) })) });
  }
  function act(title, opts, eff, text) {
    if (opts.energy && !needEnergy(opts.energy)) return;
    const b = snapshot();
    const e = typeof eff === 'function' ? eff() : eff;
    if (opts.energy) state.energy = clamp(state.energy - opts.energy, 0, 100);
    applyEffects(e);
    // 主线进行时不靠支线把年份快进掉，时间只在进入下一章时跳到资料里的年份。
    if (opts.months && !(guide && guide.node)) advance(opts.months);
    const changes = diffText(b);
    save();
    result(title, { res: typeof text === 'function' ? text() : text, changes });
  }

  const BUILD = {
    home: b => dialog({ tag: '🏠 ' + b.label, title: '回到家里', text: '沙发、书架、还有一张贴满便签的白板。',
      choices: [
        { label: '休息一个月', sub: '精力 +45 · 1 个月', fn: () => act('好好睡了一觉', { months: 1 }, { energy: 45 }, '醒来时阳光正好。') },
        { label: '陪伴家人', sub: '人际 +8 · 精力 +20 · 1 个月', fn: () => act('家庭时光', { months: 1 }, { rel: 8, energy: 20 }, '一起做饭、散步、聊天。') },
        { label: '埋头工作一个季度', sub: '公司估值小涨 · 3 个月', fn: () => act('闭关三个月', { energy: 15, months: 3 }, () => { api.ventures().forEach(c => c.value *= 1.03); return {}; }, '你的公司又向前推进了一步。') },
        { label: '💾 保存进度', fn: () => { save(); toast('💾 已保存'); } },
        { label: '📜 人生时间线', fn: showTimeline },
        { label: '🏁 结束这一生，查看结局', danger: true, fn: () => { state.ended = true; save(); showEnding(); } }
      ] }),
    hq: b => {
      if (celeb.mode === 'athlete') return MODE_BUILD.athleteHQ(b);
      if (celeb.mode === 'politician') return MODE_BUILD.politicianHQ(b);
      const home = state.city === celeb.homeCity;
      if (home) return dialog({ tag: '🏢 ' + b.label, title: '公司总部', text: state.driving ? '你开车准时抵达，停车场里大家都注意到了你的座驾。' : '前台向你点头致意。', html: companyTable(api.activeCompanies()),
        choices: [
          { label: '召开管理层会议', sub: (state.driving ? '🚗 开车到场：效果更好 · ' : '') + '精力 -10 · 1 个月', fn: () => act('会议结束', { energy: 10, months: 1 }, () => { api.mulMain(state.driving ? 1.05 : 1.02); return { rel: state.driving ? 4 : 2 }; }, state.driving ? '你准时开车到场，会议高效，团队士气高涨。' : '会议有点拖沓，但总算推进了。') },
          { label: '融资：出让 20% 股份换现金', fn: () => pickCompany('选择要融资的公司', c => { const v = c.value * c.stake * 0.2 * 0.9; act('融资完成', {}, () => { c.stake *= 0.8; c.value *= 1.05; return { cash: v }; }, `投资人看好「${c.name}」。`); }) },
          { label: '出售一家公司', fn: () => pickCompany('选择要出售的公司', c => act('交易完成', {}, { sell: [{ id: c.id }] }, `你卖掉了「${c.name}」。`), null, true) },
          { label: '启动新项目', fn: projectMenu },
          { label: '远程打电话谈合作', sub: '精力 -10', fn: negotiate }
        ] });
      return dialog({ tag: '🏢 ' + b.label, title: `${city().name} · ${b.label}`, text: `${city().flavor} 这里聚集着本地的企业家和投资人。`,
        choices: [
          { label: '谈合作', sub: '精力 -15 · 1 个月 · 成功率受魅力/名气/人际影响', fn: negotiate },
          { label: '拉投资', sub: '精力 -10 · 出让部分股份换现金', fn: pitch }
        ] });
    },
    bank: b => dialog({ tag: '🏦 ' + b.label, title: b.label, text: `当前现金 ${Y.fmtMoney(state.cash)}，身家 ${Y.fmtMoney(api.netWorth())}。`,
      choices: [
        { label: '投资机会', fn: investMenu },
        { label: '卖出持仓', fn: () => pickCompany('卖出哪个持仓？', c => act('卖出', {}, { sell: [{ id: c.id }] }, `你卖出了 ${c.name}。`), api.holdings(), true) },
        { label: '我的资产', fn: () => info('资产一览', `现金 ${Y.fmtMoney(state.cash)} · 身家 ${Y.fmtMoney(api.netWorth())}`, companyTable(api.activeCompanies())) },
        ...(celeb.mode === 'athlete' ? [{ label: '代言谈判', sub: '精力 -10 · 🎲 成功率看名气/魅力', fn: endorse }] : []),
        { label: '慈善捐赠 10% 现金', sub: '名气 +6 · 人际 +8', disabled: state.cash <= 0, fn: () => act('捐赠完成', {}, { cash: -state.cash * 0.1, fame: 6, rel: 8 }, '一所学校以你的名字命名了一间实验室。') }
      ] }),
    airport: b => {
      const d = guide;
      const storyDest = d && d.phase === 'travel' ? d.cityId : null;
      dialog({ tag: '✈️ ' + b.label, title: '机场', text: storyDest ? `本章要去${Y.cities[storyDest].name}。下面第一个按钮就是这段航程，点下去还会再确认一次。` : (state.jet ? `你的私人飞机「${state.jet}」已在跑道待命。` : '商务航班要排队、转机。主线进行时，年份不会被航班快进。'),
        choices: [
          ...(storyDest ? [{ label: `飞往${Y.cities[storyDest].name}（本章）`, sub: d.loc ? '资料地点：' + d.loc : '本章目的地', danger: true, fn: () => storyTravel(storyDest) }] : []),
          { label: state.jet ? '乘私人飞机去别的城市' : '乘商务航班去别的城市', sub: '支线出行，会再确认目的地', fn: flightMenu },
          { label: '购买私人飞机（{pr_gulfstream}）', sub: '$3000万', danger: true, disabled: !!state.jet || state.cash < 3000, fn: () => act('提机！', {}, () => { state.jet = '{pr_gulfstream}'; return { cash: -3000, fame: 3 }; }, '从此说走就走。') }
        ] });
    },
    garage: b => dialog({ tag: '🚗 ' + b.label, title: b.label, text: state.car ? `你的座驾：${state.car}。按 C 键或屏幕上的 🚗 按钮随时上下车。` : '买辆车，开车去开会更快更体面（移动速度翻倍）。',
      choices: CARS.map(c => ({ label: `买 ${c.name}`, danger: true, sub: Y.fmtMoney(c.price) + (c.req && !c.req(state, api) ? ' · ' + c.reqText : ''), disabled: state.cash < c.price || (c.req && !c.req(state, api)) || state.car === c.name,
        fn: () => act('提车！', {}, () => { state.car = c.name; state.carColor = c.color; state.driving = true; return { cash: -c.price, fame: c.price >= 50 ? 3 : 0 }; }, `你坐进了崭新的 ${c.name}。`) }))
        .concat(state.car ? [{ label: state.driving ? '下车步行' : '上车', fn: toggleCar }, { label: '开车兜风', sub: '精力 +8', fn: () => act('兜风', {}, { energy: 8, fame: (CARS.find(c => c.name === state.car) || {}).price >= 10 ? 1 : 0 }, '风从车窗灌进来。') }] : []) }),
    club: b => dialog({ tag: '🍸 ' + b.label, title: b.label, text: '水晶灯下，商界名流举杯交谈。',
      choices: [
        { label: '参加商业酒会', sub: '精力 -10 · 人际↑', fn: () => { if (!needEnergy(10)) return; if (R() < 0.3 + state.rel / 300 && api.main()) { const c = api.main(); return act('意外收获', { energy: 10 }, () => { c.value *= 1.08; return { rel: 6, fame: 2 }; }, `一位投资人对「${c.name}」很感兴趣，估值上调了。`); } act('酒会', { energy: 10 }, { rel: 6, fame: 2 }, '你交换了一叠名片。'); } },
        { label: '发表演讲', sub: '精力 -10 · 🎲 成功率看魅力', fn: () => { if (!needEnergy(10)) return; state.energy -= 10; const r = resolveChoice({ chance: { p: 0.4 + state.charm / 200, ok: { effects: { fame: 6, charm: 2 }, result: '全场起立鼓掌！' }, fail: { effects: { fame: -2 }, result: 'PPT 放错了版本……' } } }); save(); result('演讲', r); } },
        { label: '在舞池里社交', sub: '魅力 +2 · 精力 -5', fn: () => act('社交', { energy: 5 }, { charm: 2, rel: 2 }, '你学会了一点探戈。') }
      ] }),
    cafe: b => dialog({ tag: '☕ ' + b.label, title: b.label, text: '咖啡香里混着各种创业故事。',
      choices: [
        { label: '喝杯咖啡', sub: '精力 +12', fn: () => act('续命', {}, { energy: 12, cash: -0.01 }, '一杯美式下肚，精神百倍。') },
        { label: '听听八卦', fn: gossip },
        { label: '时代新闻', sub: '泡沫、危机这些年份事件在这里看', fn: eraMenu },
        { label: '在餐巾纸上写商业计划', sub: '启动一个新项目', fn: projectMenu }
      ] }),
    lab: b => celeb.mode === 'athlete' ? MODE_BUILD.athleteLab(b) : celeb.mode === 'politician' ? MODE_BUILD.politicianLab(b) : dialog({ tag: '🔬 ' + b.label, title: b.label, text: '工程师们在白板前争论，示波器嗡嗡作响。',
      choices: [
        { label: '启动新项目', fn: projectMenu },
        { label: '投入研发', sub: '花钱提升公司增速 · 1 个月', fn: () => pickCompany('给哪家公司投研发？', c => { const cost = Math.max(5, Math.min(state.cash * 0.1, c.value * 0.05)); if (state.cash < cost) { toast('现金不够'); return; } act('研发投入', { energy: 10, months: 1 }, () => { c.growth += 0.03; return { cash: -cost }; }, `「${c.name}」的新技术取得突破（增速 +3%）。`); }) },
        { label: '通宵冲刺', sub: '精力 -30 · 主力公司估值 +6%', fn: () => act('通宵', { energy: 30 }, () => { api.mulMain(1.06); return { fame: 1 }; }, '天亮时，原型机终于跑通了。') }
      ] }),
    harbor: b => dialog({ tag: '🛳️ ' + b.label, title: b.label, text: '白色的邮轮停在码头，海鸥在桅杆上打转。',
      choices: [
        { label: '邀请朋友乘邮轮度假', sub: '2 个月 · 精力大幅恢复', fn: cruise },
        { label: '在码头看日落', sub: '精力 +8 · 魅力 +1', fn: () => act('日落', {}, { energy: 8, charm: 1 }, '天边是橘子味的。') }
      ] })
  };

  // ——— 运动员 / 政治人物模式的专属建筑菜单（游戏化简化） ———
  function luckAct(title, energy, p, ok, okText, fail, failText, months) {
    if (!needEnergy(energy)) return;
    state.energy -= energy;
    const r = resolveChoice({ chance: { p: clamp(p, 0.05, 0.95), ok: { effects: ok, result: okText }, fail: { effects: fail, result: failText } } });
    if (months) advance(months);
    save(); result(title, r);
  }
  function endorse() {
    luckAct('代言谈判', 10, 0.25 + state.fame / 200 + state.charm / 400, () => ({ cash: Math.round(5 + state.fame * 2), fame: 2 }), '品牌方签下了你，广告牌很快会出现在街头。', { rel: -2 }, '对方说再考虑考虑。', 1);
  }
  const MODE_BUILD = {
    athleteHQ: b => dialog({ tag: '⚽ ' + b.label, title: b.label, text: state.flags.retired ? '退役后，你偶尔回来看看年轻球员训练。' : '草皮修剪得整整齐齐，教练在场边吹哨。', html: companyTable(api.activeCompanies()),
      choices: [
        { label: '加练一个月', sub: '精力 -20 · 魅力 +2 · 名气 +1 · 1 个月', fn: () => act('加练', { energy: 20, months: 1 }, { charm: 2, fame: 1 }, '任意球脚感越来越好。') },
        { label: '参加比赛', sub: '精力 -25 · 🎲 状态越好越容易赢', fn: () => luckAct('比赛结果', 25, 0.35 + state.charm / 300 + state.energy / 400, { fame: 5, cash: 20, rel: 2 }, '你送出关键传球，球队赢了！', { fame: -2 }, '球队输了，更衣室很安静。', 1) },
        { label: '球迷见面会', sub: '精力 -10 · 人际 +6 · 名气 +2', fn: () => act('见面会', { energy: 10 }, { rel: 6, fame: 2 }, '你签名签到手酸。') },
        { label: '启动新项目', fn: projectMenu }
      ] }),
    athleteLab: b => dialog({ tag: '🩺 ' + b.label, title: b.label, text: '理疗师和体能教练正在等你。',
      choices: [
        { label: '理疗恢复', sub: '精力 +35 · 1 个月', fn: () => act('理疗', { months: 1 }, { energy: 35 }, '肌肉放松了，伤病风险降低。') },
        { label: '体能测试', sub: '精力 -5 · 魅力 +1', fn: () => act('体能测试', { energy: 5 }, { charm: 1 }, '各项数据都在提升。') }
      ] }),
    politicianHQ: b => dialog({ tag: '🗳️ ' + b.label, title: b.label, text: '志愿者们在打电话，墙上贴满了选区地图。',
      choices: [
        { label: '拉票演讲', sub: '精力 -15 · 🎲 成功率看魅力', fn: () => luckAct('演讲反响', 15, 0.4 + state.charm / 250, { fame: 5, rel: 3 }, '台下掌声雷动。', { fame: -1 }, '反响平平。', 1) },
        { label: '筹款晚宴', sub: '精力 -10 · 现金 + 人际', fn: () => act('筹款晚宴', { energy: 10, months: 1 }, () => ({ cash: Math.round(2 + state.rel / 5), rel: 3 }), '支持者们慷慨解囊。') },
        { label: '走访社区', sub: '精力 -10 · 人际 +8', fn: () => act('走访社区', { energy: 10, months: 1 }, { rel: 8, charm: 1 }, '你听到了很多真实的声音。') },
        { label: '我的资产', fn: () => info('资产一览', `现金 ${Y.fmtMoney(state.cash)} · 身家 ${Y.fmtMoney(api.netWorth())}`, companyTable(api.activeCompanies())) }
      ] }),
    politicianLab: b => dialog({ tag: '📚 ' + b.label, title: b.label, text: '研究员们在整理政策报告。',
      choices: [
        { label: '研究政策', sub: '魅力 +3 · 1 个月', fn: () => act('研究政策', { energy: 5, months: 1 }, { charm: 3 }, '你对议题的理解更深了。') },
        { label: '写一本书', sub: '精力 -20 · 🎲', fn: () => luckAct('出版', 20, 0.3 + state.fame / 200, { cash: 50, fame: 5 }, '新书登上了畅销榜。', { energy: -5 }, '书卖得一般。', 3) }
      ] })
  };

  function negotiate() {
    if (!needEnergy(15)) return;
    pickCompany('用哪家公司去谈？', c => {
      dialog({ title: `谈判桌 · ${city().name}`, text: `对方是${city().name}的一家大集团，对「${c.name}」很感兴趣。你的谈判风格是？`,
        choices: [
          { label: '强硬：要最好的条件', sub: '高风险高回报', fn: () => go(0.2, 1.35) },
          { label: '双赢：找共同利益', sub: '均衡', fn: () => go(0.4, 1.18) },
          { label: '让步：先建立关系', sub: '稳妥', fn: () => go(0.65, 1.07) }
        ] });
      function go(base, mul) {
        state.energy -= 15;
        const p = clamp(base + state.charm / 300 + state.fame / 400 + state.rel / 400, 0.05, 0.95);
        const r = resolveChoice({ chance: { p, ok: { effects: { mod: [{ id: c.id, mul, growthAdd: 0.01 }], rel: 5, fame: 2 }, result: `握手成交！「${c.name}」拿下了${city().name}市场。` }, fail: { effects: { rel: -3 }, result: '对方礼貌地表示“再研究研究”。' } } });
        advance(1); logEv(`在${city().name}谈合作：${r.luck.ok ? '成功' : '失败'}`); save(); result('谈判结果', r);
      }
    });
  }
  function pitch() {
    if (!needEnergy(10)) return;
    pickCompany('为哪家公司拉投资？', c => {
      state.energy -= 10;
      const p = clamp(0.3 + state.fame / 200 + state.charm / 300, 0.05, 0.9);
      const amt = c.value * 0.1;
      const r = resolveChoice({ chance: { p, ok: { effects: () => { c.stake *= 0.9; c.value *= 1.1; return { cash: amt, rel: 3 }; }, result: `${city().name}的投资人以更高估值投了「${c.name}」。` }, fail: { effects: { energy: -5 }, result: '投资人觉得估值太高了。' } } });
      save(); result('路演结果', r);
    });
  }
  function investMenu() {
    const y = year();
    const list = Y.investments.filter(i => y >= i.from && y <= i.to && i.excludeCeleb !== celeb.id);
    dialog({ title: `${y} 年的投资机会`, text: '游戏化简化数值，非投资建议。', choices: list.map(i => ({ label: i.name, sub: `${i.desc || ''} · 预期年化 ${Math.round(i.growth * 100)}% · 波动 ${i.vol >= 1 ? '高' : i.vol >= 0.6 ? '中' : '低'}`,
      fn: () => dialog({ title: `投资 ${i.name}`, text: `可用现金 ${Y.fmtMoney(state.cash)}`, choices: [0.1, 0.3, 0.6].map(f => ({ label: `投入 ${f * 100}%（${Y.fmtMoney(state.cash * f)}）`, disabled: state.cash <= 0,
        fn: () => { const a = state.cash * f; act('买入', {}, () => { api.addHolding(i.id, a); return { cash: -a }; }, `你买入了 ${i.name}。`); } })) }) })) });
  }
  function projectMenu() {
    const y = year();
    const list = (celeb.projects || []).concat(Y.genericProjects).filter(p => y >= p.from && !api.has('p_' + p.id));
    dialog({ title: '启动新项目', text: `现金 ${Y.fmtMoney(state.cash)}。项目有失败风险，成功后成为你的新公司。`, choices: list.map(p => {
      const ok = !p.requires || p.requires(state, api);
      return { label: p.name, sub: `${p.desc} · 投入 ${Y.fmtMoney(p.cost)} · 成功率约 ${Math.round(Math.min(0.95, p.p + state.charm / 400) * 100)}%` + (ok ? '' : ' · ' + p.reqText), disabled: !ok || state.cash < p.cost,
        fn: () => { if (!needEnergy(15)) return; state.energy -= 15;
          const r = resolveChoice({ chance: { p: Math.min(0.95, p.p + state.charm / 400), ok: { effects: { cash: -p.cost, add: { id: 'p_' + p.id, name: p.name, value: p.value, stake: 0.9, growth: p.growth, vol: p.vol }, fame: 3 }, result: `「${p.name}」成功启动，团队已经到位！` }, fail: { effects: { cash: -p.cost * 0.6 }, result: `「${p.name}」没能落地，烧掉了一部分资金。` } } });
          advance(1); save(); result('新项目', r); } };
    }) });
  }
  function gossip() {
    const nx = celeb.nodes.find(n => !state.nodes[n.id] && n.year >= year());
    const inv = Y.investments.filter(i => year() >= i.from && year() <= i.to && i.growth >= 0.3 && i.excludeCeleb !== celeb.id);
    const lines = [];
    if (nx) lines.push(`邻桌的人说：“${nx.year} 年前后，可能会有大事发生……听说跟「${nx.title}」有关。”`);
    if (inv.length) lines.push(`有人小声说：“现在买点 ${pick(inv).name}，以后可能会后悔没多买。”`);
    lines.push(pick(['“听说城东新开的俱乐部，投资人都在那儿。”', '“码头那艘邮轮能包下来开派对。”', '“机场那边，有钱人都坐私人飞机，说走就走。”']));
    info('咖啡馆八卦', lines.join('\n'));
  }
  function eraMenu() {
    const y = year();
    const list = allEvents().filter(e => e.year && e.year <= y && !state.events[e.id]);
    if (!list.length) { info('时代新闻', '这一年没有新的大事件。往后章节里遇到了，再来看。'); return; }
    dialog({ title: '时代新闻', text: '这些是年份到了才会发生的事，不看也不挡住主线。', choices: list.map(e => ({
      label: e.year + ' · ' + e.title, danger: true, fn: () => { state.events[e.id] = year(); showEvent(e); }
    })) });
  }
  function storyTravel(id) {
    Y.audio.sfx('whoosh');
    loadCity(id, 'airport');
    logEv('为本章飞往' + Y.cities[id].name);
    save();
    refreshGuide(false);
    toast('抵达 ' + Y.cities[id].name + '。跟着箭头走。');
  }
  function chapterMoment(node) {
    if (node.offset != null) return Math.max(year(), (state.divergeYear || year()) + node.offset);
    return node.year;
  }
  function jumpToChapter(node, announce) {
    if (!node) { state.chapterId = null; return; }
    const y = chapterMoment(node);
    const target = y * 12 + ((node.month || 1) - 1);
    const jumped = state.month < target;
    if (jumped) {
      const years = (target - state.month) / 12;
      api.activeCompanies().forEach(c => { c.value *= Math.pow(1 + (c.growth || 0), years); });
      state.month = target;
    }
    const changed = state.chapterId !== node.id;
    state.chapterId = node.id;
    if (announce && (jumped || changed)) toast(y + ' 年 · ' + t(node.title));
  }
  function refreshGuide(announce) {
    if (!state || !celeb || state.sceneBusy) return;
    const node = Y.story.current(celeb, state, api);
    jumpToChapter(node, announce);
    guide = Y.story.describe(celeb, state, api);
    const el = $('#objective');
    if (!el) return;
    el.hidden = false;
    $('#obj-kicker').textContent = guide.phase === 'done' ? (guide.parallel ? '平行人生 · 尾声' : '尾声') : ((guide.parallel ? '平行人生 ' : '第 ') + guide.index + ' / ' + guide.total + (guide.parallel ? '' : ' 章'));
    $('#obj-title').textContent = t(guide.title || '');
    $('#obj-main').textContent = t(guide.text || '');
    $('#obj-side').textContent = guide.side || '';
    $('#obj-keys').textContent = 'WASD 或点地面移动 · 靠近后按 E 或点标记 · 重要选择会再确认一次';
    const action = $('#obj-action');
    if (guide.phase === 'done') { action.hidden = false; action.textContent = '查看结局'; }
    else { action.hidden = true; }
  }
  function objectivePoint() {
    if (!guide || !world) return null;
    if (guide.phase === 'travel') {
      const b = world.buildings.find(b => b.type === 'airport');
      return b ? { x: b.door.x * TS + 8, y: (b.door.y + 1) * TS + 8 } : null;
    }
    if (guide.phase === 'meet' && guide.contact) {
      const n = npcs.find(n => n.contact && n.contact.id === guide.contact.id);
      if (n) return { x: n.x, y: n.y };
    }
    if (guide.phase === 'spot' || guide.phase === 'meet') return world.storySpot ? { x: world.storySpot.x, y: world.storySpot.y } : null;
    if (guide.phase === 'done') {
      const b = world.buildings.find(b => b.type === 'home');
      return b ? { x: b.door.x * TS + 8, y: (b.door.y + 1) * TS + 8 } : null;
    }
    return null;
  }
  function flightMenu() {
    const jet = !!state.jet;
    if (!jet && !needEnergy(15)) return;
    dialog({ title: jet ? '🛩️ 私人飞机 · 选择目的地' : '✈️ 商务航班 · 选择目的地', choices: Y.cityOrder.filter(id => id !== state.city).map(id => {
      const c = Y.cities[id];
      const hasContact = (celeb.contacts || []).some(k => k.city === id && year() >= k.from && year() <= k.to && !state.contactsDone[k.id]);
      return { label: `${c.name}（${c.country}）${hasContact ? ' ★' : ''}`, danger: true, sub: c.flavor + (hasContact ? ' · 有关键人物在等你' : ''), fn: () => fly(id) };
    }) });
  }
  function fly(id) {
    Y.audio.sfx('whoosh');
    const jet = !!state.jet;
    if (jet) { state.cash -= 20; state.energy = clamp(state.energy - 5, 0, 100); }
    else { state.cash -= 0.5; state.energy = clamp(state.energy - 15, 0, 100); if (!(guide && guide.node)) advance(1); }
    loadCity(id, 'airport');
    logEv(`飞往${Y.cities[id].name}`);
    save();
    if (jet && api.main()) {
      dialog({ title: `🛩️ 飞往${Y.cities[id].name}的途中`, text: '万米高空，机舱很安静。你要怎么度过这段航程？', closable: false, choices: [
        { label: '邀请同行的投资人在机上谈投资', sub: '🎲', fn: () => { const c = api.main(); const r = resolveChoice({ chance: { p: clamp(0.35 + state.charm / 250 + state.rel / 300, 0, 0.9), ok: { effects: () => { const a = c.value * 0.06; c.stake *= 0.94; c.value *= 1.08; return { cash: a, rel: 4 }; }, result: `落地前，对方签下了投资「${c.name}」的意向书。` }, fail: { effects: { rel: 1 }, result: '对方表示回去再考虑。' } } }); result('机上谈判', r, arrive); } },
        { label: '补个觉', sub: '精力 +15', fn: () => { applyEffects({ energy: 15 }); arrive(); } },
        { label: '看财报和文件', sub: '主力公司 +2%', fn: () => { api.mulMain(1.02); arrive(); } }
      ] });
    } else arrive();
    function arrive() { toast(`🛬 抵达 ${Y.cities[id].name}`); updateHUD(); }
  }
  function cruise() {
    if (state.cash < 3) { toast('现金不够买船票'); return; }
    const friends = state.friends.filter(f => (state.aff[f.id] || 0) >= 50);
    const rich = api.netWorth() > 100000;
    const cost = rich ? 300 : 3;
    const go = (who, fid) => {
      const b = snapshot();
      state.cash -= cost; state.energy = clamp(state.energy + 60, 0, 100); state.rel = clamp(state.rel + (fid ? 8 : who === '家人' ? 6 : 0), 0, 100);
      if (fid) state.aff[fid] = clamp((state.aff[fid] || 0) + 15, 0, 100);
      advance(2);
      logEv(`和${who}乘邮轮度假`);
      const ev = pick(CRUISE);
      const pre = diffText(b);
      dialog({ tag: rich ? '🛳️ 你包下了整艘邮轮' : '🛳️ 邮轮度假', title: ev.title, text: `你和${who}在海上度过了两个月。\n${ev.text}`, changes: pre, closable: false,
        choices: ev.choices.map(ch => ({ label: ch.text, sub: ch.chance ? '🎲' : '', fn: () => { const r = resolveChoice(ch); save(); result(ev.title, r); } })) });
    };
    dialog({ title: '邀请谁一起？', text: `费用 ${Y.fmtMoney(cost)}${rich ? '（包船）' : ''}。在街上多交朋友，就能邀请他们同行。`, choices:
      friends.map(f => ({ label: `邀请 ${f.name}`, sub: `好感 ${state.aff[f.id]} · ${Y.cities[f.city] ? Y.cities[f.city].name : ''}的朋友`, fn: () => go(f.name, f.id) }))
        .concat([{ label: '带上家人', fn: () => go('家人') }, { label: '独自出海', fn: () => go('自己') }]) });
  }
  const CRUISE = [
    { title: '甲板上的偶遇', text: '一位基金经理在泳池边认出了你。', choices: [
      { text: '聊聊你的公司', chance: { p: s => 0.35 + s.charm / 200, ok: { effects: (s, api) => { const c = api.main(); if (c) { c.value *= 1.06; return { cash: c.value * 0.03, rel: 4 }; } return { rel: 4 }; }, result: '下船时，你们已经在谈投资条款了。' }, fail: { effects: { rel: 1 }, result: '他只想聊高尔夫。' } } },
      { text: '今天只想晒太阳', effects: { energy: 10 } }] },
    { title: '海上风暴', text: '夜里起了风浪，船身摇晃，有人开始害怕。', choices: [
      { text: '组织大家在大厅唱歌', effects: { rel: 6, charm: 2 }, result: '风暴过去时，你们已经成了好朋友。' },
      { text: '躲回船舱睡觉', effects: { energy: 5 } }] },
    { title: '船长晚宴', text: '晚宴上有才艺表演环节，主持人点了你的名字。', choices: [
      { text: '上台唱一首', chance: { p: s => 0.3 + s.charm / 150, ok: { effects: { charm: 4, fame: 2 }, result: '全场合唱！视频还上了热搜。' }, fail: { effects: { charm: -1 }, result: '跑调了，但大家笑得很开心。' } } },
      { text: '鼓掌就好', effects: { rel: 2 } }] }
  ];
  function toggleCar() {
    if (!state.car) { toast('你还没有车，去车行看看吧'); return; }
    state.driving = !state.driving; Y.audio.sfx('engine'); toast(state.driving ? `🚗 坐上了 ${state.car}` : '🚶 下车步行'); updateHUD();
  }

  // ---------------- 街头 NPC ----------------
  const LINES = {
    ok: ['TA 笑了：“你挺有意思的。”', 'TA 眼睛一亮，你们聊得很投机。', 'TA 主动加了你的联系方式。', '“下次一起喝咖啡吧！”'],
    no: ['TA 礼貌地笑了笑，戴上了耳机。', '“不好意思，我在等朋友。”', 'TA 看了看表：“我得走了。”', '气氛有点尴尬……']
  };
  function npcDialog(n) {
    if (n.type === 'contact') return contactDialog(n);
    const aff = state.aff[n.id] || 0;
    const talked = state.talked[n.id] === state.month;
    const he = n.gender === 'f' ? '她' : '他';
    const social = (label, p, bonus, sub) => ({ label, sub: sub || `🎲 约 ${Math.round(clamp(p, 0.05, 0.95) * 100)}%`, disabled: talked, fn: () => {
      state.talked[n.id] = state.month; state.energy = clamp(state.energy - 3, 0, 100);
      const ok = R() < clamp(p, 0.05, 0.95);
      const b = snapshot();
      const before = state.aff[n.id] || 0;
      state.aff[n.id] = clamp(before + (ok ? bonus : -5), 0, 100);
      if (ok) state.charm = clamp(state.charm + 1, 0, 100);
      let extra = '';
      if (ok && before < 50 && state.aff[n.id] >= 50 && !state.friends.some(f => f.id === n.id)) { state.friends.push({ id: n.id, name: n.name, city: state.city }); state.rel = clamp(state.rel + 5, 0, 100); extra = `\n🤝 ${n.name} 成为了你的朋友！可以邀请${he}一起乘邮轮度假。`; logEv(`和 ${n.name} 成为朋友`); }
      save();
      result(n.name, { res: (ok ? pick(LINES.ok) : pick(LINES.no)).replace(/TA/g, he) + `\n好感度：${before} → ${state.aff[n.id]}` + extra, changes: diffText(b), luck: { ok, p: clamp(p, 0.05, 0.95) } });
    } });
    const choices = [
      social(`真诚地夸赞${he}的品味`, 0.35 + state.charm / 200 + state.fame / 400, 15),
      social('聊聊你的梦想和事业', 0.25 + state.fame / 150 + state.charm / 300, 18),
      social('讲个冷笑话', 0.45, 12)
    ];
    if (aff >= 30) choices.push(social('邀请一起喝杯咖啡', 0.55 + state.charm / 200, 15, '好感 ≥30 解锁'));
    if (aff >= 60) choices.push({ label: '约一顿浪漫的晚餐', sub: '好感 ≥60 · 精力 +10', disabled: talked, fn: () => { state.talked[n.id] = state.month; act('晚餐', {}, () => { state.aff[n.id] = clamp(aff + 10, 0, 100); return { energy: 10, rel: 3, cash: -0.05 }; }, `烛光、晚风和长长的聊天。你们聊到了很晚。\n好感度 ${Math.min(100, aff + 10)}`); } });
    if (n.type === 'investor') choices.push({ label: '向他推销你的公司', sub: api.main() ? '🎲 成功则获得投资' : '你还没有公司', disabled: !api.main() || talked, fn: () => { state.talked[n.id] = state.month; const c = api.main(); const r = resolveChoice({ chance: { p: clamp(0.3 + state.fame / 200 + state.charm / 300 + aff / 300, 0.05, 0.9), ok: { effects: () => { const a = c.value * 0.08; c.stake *= 0.92; c.value *= 1.05; return { cash: a }; }, result: `${n.name}：“我投了！”` }, fail: { effects: {}, result: `${n.name}：“我再看看。”` } } }); save(); result(n.name, r); } });
    if (n.type === 'reporter') choices.push({ label: '接受街头采访', sub: '🎲 名气', disabled: talked, fn: () => { state.talked[n.id] = state.month; const r = resolveChoice({ chance: { p: 0.55 + state.charm / 250, ok: { effects: { fame: 5 }, result: '报道很正面。' }, fail: { effects: { fame: -2 }, result: '你的话被断章取义了。' } } }); save(); result(n.name, r); } });
    if (n.type === 'fan') choices.push({ label: '合影签名', sub: state.fame >= 10 ? '名气 +1 · 魅力 +1' : '名气 ≥10 才有人认出你', disabled: state.fame < 10 || talked, fn: () => { state.talked[n.id] = state.month; act('合影', {}, { fame: 1, charm: 1 }, `${n.name} 激动地发了朋友圈。`); } });
    if (n.type === 'engineer') choices.push({ label: '把他挖到你的公司', sub: api.main() ? '$20万 · 主力公司增速 +2%' : '你还没有公司', disabled: !api.main() || state.cash < 20 || talked, fn: () => { state.talked[n.id] = state.month; act('入职', {}, () => { api.growthMain(0.02); return { cash: -20, rel: 2 }; }, `${n.name} 下周一入职。`); } });
    if (n.type === 'passerby') choices.push({ label: '随便聊聊（听八卦）', fn: gossip });
    dialog({ tag: `${TYPE_NAME[n.type]} · 好感 ${aff}${state.friends.some(f => f.id === n.id) ? ' · 🤝 朋友' : ''}`, title: n.name,
      text: talked ? `${he}今天已经和你聊过了，改天再来吧（推进时间后可再聊）。` : pick([`${n.name} 正在街边等咖啡。`, `${n.name} 在看手机，似乎在等人。`, `${n.name} 抬头看了你一眼。`]) + (state.fame >= 50 ? `\n${he}好像认出了你：“你是……${celeb.short}？”` : ''),
      choices });
  }
  function contactDialog(n) {
    const k = n.contact;
    dialog({ tag: `★ 关键人物 · ${k.role}`, title: k.name, text: k.text, choices: k.choices.map(ch => ({ label: ch.text, fn: () => {
      const r = resolveChoice(ch); state.contactsDone[k.id] = year(); logEv(`在${city().name}见到 ${k.name}：${ch.text}`);
      npcs = npcs.filter(x => x !== n); save(); result(k.name, r);
    } })) });
  }
  function spawnNPCs() {
    npcs = [];
    const c = city(), rand = Y.rng(c.seed * 101 + 3);
    const ftypes = ['fashion', 'fashion', 'reporter', 'fashion', 'fan'], mtypes = ['investor', 'engineer', 'passerby', 'investor', 'passerby'];
    let fi = 0, mi = 0;
    c.npcNames.forEach(([name, g], i) => {
      const type = g === 'f' ? ftypes[fi++ % 5] : mtypes[mi++ % 5];
      const pos = randomWalkable(rand);
      npcs.push({ id: c.id + '-' + i, name, gender: g, type, look: Y.sprites.randomLook(rand, g), x: pos.x, y: pos.y, dir: 'down', t: rand() * 2, vx: 0, vy: 0, anim: 0 });
    });
    (celeb.contacts || []).filter(k => k.city === state.city && year() >= k.from && year() <= k.to && !state.contactsDone[k.id]).forEach((k, i) => {
      npcs.push({ id: 'contact-' + k.id, name: k.name, type: 'contact', contact: k, look: k.look, x: (bankDoor().x + 2 + i * 2) * TS + 8, y: (bankDoor().y + 1) * TS + 8, dir: 'down', t: 0, vx: 0, vy: 0, anim: 0, still: true });
    });
  }
  function bankDoor() { return world.buildings.find(b => b.type === 'bank').door; }
  function randomWalkable(rand) {
    for (let i = 0; i < 800; i++) {
      const x = Math.floor(rand() * world.W), y = Math.floor(rand() * world.H);
      const tt = world.get(x, y);
      if (tt === Y.map.T.ROAD || tt === Y.map.T.PLAZA) return { x: x * TS + 8, y: y * TS + 8 };
    }
    return { x: world.spawn.x, y: world.spawn.y };
  }

  // ---------------- 世界 ----------------
  const DAY_LEN = 240; // 现实秒数为一个昼夜循环（纯视觉效果）
  let clockOffset = 0, dayNight = localStorage.getItem('yxrs_daynight') !== '0';
  function loadCity(id, at) {
    state.city = id;
    world = Y.map.generate(Y.cities[id], celeb);
    mapCanvas = Y.map.render(world);
    if (at === 'airport') { state.px = world.airportSpawn.x; state.py = world.airportSpawn.y; }
    else if (at !== 'keep' || blocked(state.px, state.py) || state.px > world.W * TS || state.py > world.H * TS) { state.px = world.spawn.x; state.py = world.spawn.y; }
    state.dir = 'down';
    lastDistrict = '';
    clickPath = null;
    // 环境：车流、云影
    const r = Y.rng(Y.cities[id].seed * 13 + 1);
    world.traffic = world.lanes.flatMap(l => r() < 0.7 ? [{ lane: l, x: r() * l.xmax, speed: 40 + r() * 50, color: pick(['#e74c3c', '#3498db', '#f1c40f', '#ecf0f1', '#2ecc71', '#34495e']) }] : []);
    world.clouds = [0, 1, 2, 3].map(() => ({ x: r() * world.W * TS, y: r() * world.H * TS, w: 60 + r() * 80, s: 6 + r() * 8 }));
    spawnNPCs();
    Y.audio.setCity(id);
    updateHUD();
  }
  function blocked(x, y) {
    const pts = [[x - 5, y - 2], [x + 5, y - 2], [x - 5, y + 4], [x + 5, y + 4]];
    return pts.some(([px, py]) => world.isSolid(Math.floor(px / TS), Math.floor(py / TS)));
  }
  function update(dt) {
    let dx = 0, dy = 0;
    if (!sceneLock) {
    if (keys.ArrowLeft || keys.a) dx -= 1; if (keys.ArrowRight || keys.d) dx += 1;
    if (keys.ArrowUp || keys.w) dy -= 1; if (keys.ArrowDown || keys.s) dy += 1;
    }
    if (dx || dy) clickPath = null;
    else if (!sceneLock && clickPath && clickPath.length) {
      const p = clickPath[0];
      const ddx = p.x - state.px, ddy = p.y - state.py;
      if (Math.hypot(ddx, ddy) < 8) clickPath.shift();
      else { dx = ddx; dy = ddy; }
    }
    if (dx || dy) {
      const l = Math.hypot(dx, dy); dx /= l; dy /= l;
      let sp = (state.driving ? 230 : 132) * dt;
      if (clickPath && clickPath.length) sp = Math.min(sp, Math.hypot(clickPath[0].x - state.px, clickPath[0].y - state.py));
      const nx = state.px + dx * sp, ny = state.py + dy * sp;
      if (!blocked(nx, state.py)) state.px = nx;
      if (!blocked(state.px, ny)) state.py = ny;
      state.dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
      const before = Math.floor(walkAnim);
      walkAnim += dt * (state.driving ? 0 : 8);
      if (Math.floor(walkAnim) !== before && Math.floor(walkAnim) % 2 === 0) Y.audio.sfx('step');
    } else walkAnim = 0;
    for (const n of npcs) {
      if (n.still) continue;
      const near = Math.hypot(n.x - state.px, n.y - state.py) < 28;
      n.t -= dt;
      if (n.t <= 0) { n.t = 1 + R() * 3; const d = pick([[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [0, 0]]); n.vx = d[0] * 26; n.vy = d[1] * 26; }
      if (near) { n.vx = n.vy = 0; const ddx = state.px - n.x, ddy = state.py - n.y; n.dir = Math.abs(ddx) > Math.abs(ddy) ? (ddx > 0 ? 'right' : 'left') : (ddy > 0 ? 'down' : 'up'); n.anim = 0; continue; }
      if (n.vx || n.vy) {
        const nx = n.x + n.vx * dt, ny = n.y + n.vy * dt;
        if (!blocked(nx, ny)) { n.x = nx; n.y = ny; n.anim += dt * 6; } else { n.t = 0; }
        n.dir = n.vx > 0 ? 'right' : n.vx < 0 ? 'left' : n.vy > 0 ? 'down' : 'up';
      } else n.anim = 0;
    }
    for (const c of sceneCast) {
      c.x += (c.tx - c.x) * Math.min(1, dt * 2.2);
      c.y += (c.ty - c.y) * Math.min(1, dt * 2.2);
    }
    for (const c of world.traffic) { c.x += c.lane.dir * c.speed * dt; if (c.x > c.lane.xmax + 20) c.x = -20; if (c.x < -20) c.x = c.lane.xmax + 20; }
    for (const c of world.clouds) { c.x += c.s * dt; if (c.x > world.W * TS + 100) c.x = -150; }
    hudTimer -= dt; if (hudTimer <= 0) { hudTimer = 0.3; updateHUD(); }
    if (world.districtGrid) {
      const tx = Math.floor(state.px / TS), ty = Math.floor(state.py / TS);
      const id = world.districtGrid[ty * world.W + tx] || 0;
      const d = id ? world.districts[id - 1] : null;
      const name = d ? d.name : '';
      if (name && name !== lastDistrict) { lastDistrict = name; toast('进入' + name); }
    }
  }
  function nearTarget() {
    const pt = objectivePoint();
    if (guide && pt && (guide.phase === 'spot' || guide.phase === 'meet') && Math.hypot(pt.x - state.px, pt.y - state.py) < 34) return { kind: 'story' };
    let best = null, bd = 26;
    for (const n of npcs) { const d = Math.hypot(n.x - state.px, n.y - state.py); if (d < bd) { bd = d; best = { kind: 'npc', obj: n }; } }
    if (best) {
      if (guide && guide.phase === 'meet' && guide.contact && best.obj.contact && best.obj.contact.id === guide.contact.id) return { kind: 'story' };
      return best;
    }
    for (const b of world.buildings) {
      const dx = b.door.x * TS + 8, dy = b.door.y * TS + 16;
      if (Math.hypot(dx - state.px, dy - state.py) < 22) return { kind: 'building', obj: b };
    }
    for (const lm of world.landmarks) {
      if (lm.decor) continue;
      const dx = lm.door.x * TS + 8, dy = lm.door.y * TS + 16;
      if (Math.hypot(dx - state.px, dy - state.py) < 26) return { kind: 'landmark', obj: lm };
    }
    return null;
  }
  function interact() {
    if (modal || !state || tutoring) return;
    inputLock = performance.now() + 420;
    const tg = nearTarget(); if (!tg) return;
    Y.audio.sfx('blip');
    if (tg.kind === 'story') { const n = guide && guide.node; if (n) openChapter(n); return; }
    if (tg.kind === 'npc') npcDialog(tg.obj); else if (tg.kind === 'landmark') visitLandmark(tg.obj); else enterBuilding(tg.obj);
  }
  function findPath(px, py, tx, ty) {
    const walk = (x, y) => x >= 0 && y >= 0 && x < world.W && y < world.H && !world.isSolid(x, y);
    let gx = Math.floor(tx / TS), gy = Math.floor(ty / TS);
    if (!walk(gx, gy)) {
      let found = null, best = 1e9;
      for (let r = 1; r <= 6 && !found; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
        const x = gx + dx, y = gy + dy;
        if (!walk(x, y)) continue;
        const d = dx * dx + dy * dy;
        if (d < best) { best = d; found = { x, y }; }
      }
      if (!found) return [];
      gx = found.x; gy = found.y;
    }
    const sx = Math.floor(px / TS), sy = Math.floor(py / TS);
    if (sx === gx && sy === gy) return [{ x: gx * TS + 8, y: gy * TS + 8 }];
    const key = (x, y) => y * world.W + x;
    const q = [[sx, sy]], prev = new Map();
    const seen = new Uint8Array(world.W * world.H); seen[key(sx, sy)] = 1;
    const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    for (let i = 0; i < q.length; i++) {
      const [x, y] = q[i];
      if (x === gx && y === gy) break;
      for (const [dx, dy] of dirs) {
        const nx = x + dx, ny = y + dy, k = key(nx, ny);
        if (nx < 0 || ny < 0 || nx >= world.W || ny >= world.H || seen[k] || !walk(nx, ny)) continue;
        seen[k] = 1; prev.set(k, key(x, y)); q.push([nx, ny]);
      }
    }
    if (!seen[key(gx, gy)]) return [];
    const path = [];
    let cur = key(gx, gy);
    while (cur !== key(sx, sy)) {
      const x = cur % world.W, y = Math.floor(cur / world.W);
      path.push({ x: x * TS + 8, y: y * TS + 8 });
      cur = prev.get(cur);
      if (cur == null) break;
    }
    path.reverse();
    return path;
  }
  function enterBuilding(b) { state.visited[b.type] = true; BUILD[b.type](b); }
  function visitLandmark(lm) {
    const key = state.city + ':' + lm.type, done = state.landmarks && state.landmarks[key] === state.month;
    dialog({ tag: `${lm.icon} 地标 · ${city().name}`, title: lm.label, text: done ? '你这个月已经来打过卡了。' : `${city().flavor}\n游客们在「${lm.label}」前排队拍照。`,
      choices: [{ label: '拍照打卡', sub: '精力 +5 · 魅力 +1 · 名气 +1（每月一次）', disabled: done, fn: () => { state.landmarks = state.landmarks || {}; state.landmarks[key] = state.month; act('打卡成功', {}, { energy: 5, charm: 1, fame: 1 }, `你在「${lm.label}」前留下了一张像素风合影。`); } }] });
  }

  // ---------------- 渲染 ----------------
  function drawSceneFx() {
    if (!state || !state.sceneEnv) return;
    const env = state.sceneEnv;
    const tnow = performance.now() / 1000;
    if (env === 'rain' || env === 'low') {
      ctx.strokeStyle = 'rgba(180,210,255,0.35)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 40; i++) {
        const x = (i * 97 + tnow * 180) % VW, y = (i * 53 + tnow * 320) % VH;
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 4, y + 12); ctx.stroke();
      }
    }
    if (env === 'fireworks' || env === 'crowd' || env === 'high') {
      for (let i = 0; i < 18; i++) {
        const x = (Math.sin(tnow + i) * 0.5 + 0.5) * VW;
        const y = (Math.cos(tnow * 0.7 + i * 2) * 0.3 + 0.25) * VH;
        ctx.fillStyle = ['#ffd54f', '#ff8a65', '#fff', '#9be7ff'][i % 4];
        ctx.fillRect(x, y, 3, 3);
      }
    }
    if (env === 'garage') { ctx.fillStyle = 'rgba(40,24,8,0.25)'; ctx.fillRect(0, 0, VW, VH); }
    if (env === 'board') { ctx.fillStyle = 'rgba(8,16,40,0.2)'; ctx.fillRect(0, 0, VW, VH); }
    if (env === 'reporters' || env === 'press') {
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      for (let i = 0; i < 5; i++) ctx.fillRect(20 + i * 36, VH - 120, 8, 14);
    }
  }
  function drawMinimap() {
    if (!world) return;
    const mw = 156, mh = 108, x0 = VW - mw - 8, y0 = 8;
    ctx.fillStyle = 'rgba(8,8,16,0.82)'; ctx.fillRect(x0, y0, mw, mh);
    ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 2; ctx.strokeRect(x0 + 1, y0 + 1, mw - 2, mh - 2);
    const sx = (mw - 10) / world.W, sy = (mh - 18) / world.H, step = world.W > 90 ? 2 : 1;
    for (let ty = 0; ty < world.H; ty += step) for (let tx = 0; tx < world.W; tx += step) {
      const tile = world.get(tx, ty);
      let col = null;
      if (tile === Y.map.T.WATER || tile === Y.map.T.DOCK || tile === Y.map.T.SHIP) col = '#3f86c9';
      else if (tile === Y.map.T.ROAD || tile === Y.map.T.BRIDGE || tile === Y.map.T.RUNWAY) col = '#8a8a98';
      else if (tile === Y.map.T.BUILD) col = '#e6d3a3';
      else if (tile === Y.map.T.PLAZA) col = '#cbbd9a';
      else if (tile === Y.map.T.TREE) col = '#2f7d32';
      else continue;
      ctx.fillStyle = col;
      ctx.fillRect(x0 + 5 + tx * sx, y0 + 5 + ty * sy, Math.max(1, sx * step), Math.max(1, sy * step));
    }
    const pt = objectivePoint();
    if (pt) {
      const px = x0 + 5 + (pt.x / TS) * sx, py = y0 + 5 + (pt.y / TS) * sy;
      ctx.fillStyle = '#ffd54f'; ctx.fillRect(px - 3, py - 3, 6, 6);
      ctx.strokeStyle = '#fff'; ctx.strokeRect(px - 3, py - 3, 6, 6);
    }
    ctx.fillStyle = '#7CFFB2';
    ctx.beginPath();
    ctx.arc(x0 + 5 + (state.px / TS) * sx, y0 + 5 + (state.py / TS) * sy, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffd54f'; ctx.font = 'bold 11px sans-serif'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
    ctx.fillText('小地图', x0 + 6, y0 + mh - 4);
  }
  function drawObjectiveMarker(S) {
    const pt = objectivePoint();
    if (!pt) return;
    const [sx, sy] = S(pt.x, pt.y);
    const on = sx > 16 && sx < VW - 16 && sy > 16 && sy < VH - 16;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (on) {
      const bob = Math.sin(performance.now() / 180) * 7;
      const pulse = 10 + (Math.sin(performance.now() / 220) + 1) * 6;
      ctx.strokeStyle = 'rgba(255,213,79,0.9)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(sx, sy, pulse, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = '#ffd54f';
      ctx.beginPath(); ctx.moveTo(sx, sy - 36 + bob); ctx.lineTo(sx - 9, sy - 50 + bob); ctx.lineTo(sx + 9, sy - 50 + bob); ctx.fill();
      return;
    }
    const ang = Math.atan2(sy - VH / 2, sx - VW / 2);
    const ex = VW / 2 + Math.cos(ang) * (VW / 2 - 48);
    const ey = VH / 2 + Math.sin(ang) * (VH / 2 - 48);
    ctx.save(); ctx.translate(ex, ey); ctx.rotate(ang + Math.PI / 2);
    ctx.fillStyle = '#ffd54f';
    ctx.beginPath(); ctx.moveTo(0, -18); ctx.lineTo(12, 12); ctx.lineTo(-12, 12); ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.fillStyle = '#ffd54f'; ctx.font = 'bold 12px sans-serif';
    ctx.fillText('目标', Math.max(28, Math.min(VW - 28, ex)), Math.max(20, Math.min(VH - 20, ey + 22)));
  }
  function dayState() {
    if (!dayNight) return { night: 0, tint: null };
    const p = ((performance.now() / 1000 + clockOffset) % DAY_LEN) / DAY_LEN; // 0 清晨 → 0.5 黄昏 → 0.75 深夜
    let night, tint;
    if (p < 0.45) { night = 0; tint = null; }
    else if (p < 0.55) { const k = (p - 0.45) / 0.1; night = k * 0.6; tint = `rgba(255,120,40,${0.18 * (1 - Math.abs(k - 0.5) * 2) + 0.0})`; }
    else if (p < 0.9) { night = 1; tint = null; }
    else { const k = (p - 0.9) / 0.1; night = 1 - k; tint = `rgba(255,170,120,${0.12 * k})`; }
    return { night, tint, p };
  }
  function draw() {
    const now = performance.now() / 1000;
    const mw = world.W * TS * SC, mh = world.H * TS * SC;
    const cx = clamp(state.px * SC - VW / 2, 0, Math.max(0, mw - VW)), cy = clamp(state.py * SC - VH / 2, 0, Math.max(0, mh - VH));
    cam.x = cx; cam.y = cy;
    const S = (x, y) => [x * SC - cx, y * SC - cy];
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, VW, VH);
    ctx.drawImage(mapCanvas, cx / SC, cy / SC, VW / SC, VH / SC, 0, 0, VW, VH);
    // 水面波光
    const tx0 = Math.floor(cx / SC / TS), ty0 = Math.floor(cy / SC / TS), tx1 = tx0 + Math.ceil(VW / SC / TS) + 1, ty1 = ty0 + Math.ceil(VH / SC / TS) + 1;
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
      if (world.get(tx, ty) !== Y.map.T.WATER) continue;
      const h = (tx * 73856093 ^ ty * 19349663) >>> 0, ph = (now * 0.8 + (h % 100) / 25) % 4;
      if (ph < 1.4) { const [sx, sy] = S(tx * TS + (h % 11), ty * TS + ((h >> 4) % 13)); ctx.fillRect(sx + ph * 4, sy, 8 - ph * 2, 2); }
    }
    // 喷泉
    for (const f of world.fountains) {
      const [sx, sy] = S(f.x * TS + 8, f.y * TS + 6);
      ctx.fillStyle = 'rgba(200,240,255,0.9)';
      for (let i = 0; i < 6; i++) { const k = (now * 1.5 + i / 6) % 1; ctx.fillRect(sx + Math.sin(i * 2.1) * k * 12 - 1, sy - Math.sin(k * Math.PI) * 18, 3, 3); }
    }
    // 车流
    for (const c of world.traffic) {
      const [sx, sy] = S(c.x - 10, c.lane.y - 12); if (sx < -50 || sx > VW + 10 || sy < -50 || sy > VH + 10) continue;
      ctx.drawImage(Y.sprites.car(c.color)[c.lane.dir > 0 ? 'right' : 'left'], sx, sy, 40, 40);
    }
    // 实体
    const ents = npcs.map(n => ({ y: n.y, n })).concat([{ y: state.py, p: true }]).sort((a, b) => a.y - b.y);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const e of ents) {
      if (e.p) {
        if (state.driving) { const car = Y.sprites.car(state.carColor || '#e67e22'); ctx.drawImage(car[state.dir], (state.px - 10) * SC - cx, (state.py - 14) * SC - cy, 40, 40); }
        else { const sp = Y.sprites.char(celeb.look); const f = walkAnim ? 1 + (Math.floor(walkAnim) % 2) : 0; ctx.drawImage(sp[state.dir][f], (state.px - 8) * SC - cx, (state.py - 14) * SC - cy, 32, 32); }
      } else {
        const n = e.n, sp = Y.sprites.char(n.look), f = n.anim ? 1 + (Math.floor(n.anim) % 2) : 0;
        const sx = (n.x - 8) * SC - cx, sy = (n.y - 14) * SC - cy;
        if (sx < -40 || sy < -40 || sx > VW || sy > VH) continue;
        ctx.drawImage(sp[n.dir][f], sx, sy, 32, 32);
      }
    }
    // 云影（白天）
    const ds = dayState();
    if (ds.night < 0.5) { ctx.fillStyle = `rgba(0,0,30,${0.07 * (1 - ds.night * 2)})`; for (const c of world.clouds) { const [sx, sy] = S(c.x, c.y); ctx.beginPath(); ctx.ellipse(sx, sy, c.w, c.w * 0.45, 0, 0, Math.PI * 2); ctx.fill(); } }
    // 昼夜
    if (ds.tint) { ctx.fillStyle = ds.tint; ctx.fillRect(0, 0, VW, VH); }
    if (ds.night > 0) {
      ctx.fillStyle = `rgba(10,15,60,${0.5 * ds.night})`; ctx.fillRect(0, 0, VW, VH);
      ctx.fillStyle = `rgba(255,214,110,${0.85 * ds.night})`;
      for (const l of world.lights) { const [sx, sy] = S(l[0], l[1]); if (sx < -20 || sy < -20 || sx > VW || sy > VH) continue; if (((l[0] * 7 + l[1] * 13) % 5) === 0) continue; ctx.fillRect(sx, sy, l[2] * SC, l[3] * SC); }
      ctx.globalCompositeOperation = 'lighter';
      for (const l of world.lamps) { const [sx, sy] = S(l.x, l.y); if (sx < -80 || sy < -80 || sx > VW + 80 || sy > VH + 80) continue; const g = ctx.createRadialGradient(sx, sy, 2, sx, sy, 70); g.addColorStop(0, `rgba(255,200,120,${0.35 * ds.night})`); g.addColorStop(1, 'rgba(255,200,120,0)'); ctx.fillStyle = g; ctx.fillRect(sx - 70, sy - 70, 140, 140); }
      for (const c of world.traffic) { const [sx, sy] = S(c.x + c.lane.dir * 12, c.lane.y); if (sx < -60 || sx > VW + 60) continue; const g = ctx.createRadialGradient(sx, sy, 1, sx, sy, 26); g.addColorStop(0, `rgba(255,250,200,${0.5 * ds.night})`); g.addColorStop(1, 'rgba(255,250,200,0)'); ctx.fillStyle = g; ctx.fillRect(sx - 26, sy - 26, 52, 52); }
      ctx.globalCompositeOperation = 'source-over';
    }
    // 城区名
    if (world.districts) {
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      for (const d of world.districts) {
        const [sx, sy] = S(d.x * TS, d.y * TS);
        if (sx < -80 || sx > VW + 80 || sy < -40 || sy > VH + 40) continue;
        ctx.font = 'bold 22px "PingFang SC","Noto Sans CJK SC",sans-serif';
        ctx.fillStyle = 'rgba(0,0,0,0.55)';
        ctx.fillText(d.name, sx + 1, sy + 1);
        ctx.fillStyle = 'rgba(255,236,170,0.82)';
        ctx.fillText(d.name, sx, sy);
      }
    }
    // 招牌（在昼夜之后，保证可读）
    const FONT = '"Noto Sans CJK SC","PingFang SC",sans-serif';
    for (const b of world.buildings) {
      const x = (b.x * TS + 4) * SC - cx, y = (b.y * TS + 12) * SC - cy, w = (b.w * TS - 8) * SC;
      if (x > VW || y > VH || x + w < 0 || y + 24 < 0) continue;
      let fs = 15; const txt = t(`${b.icon} ${b.label}`);
      ctx.font = `bold ${fs}px ${FONT}`;
      while (ctx.measureText(txt).width > w - 6 && fs > 9) { fs--; ctx.font = `bold ${fs}px ${FONT}`; }
      ctx.fillStyle = 'rgba(20,20,30,0.85)'; ctx.fillRect(x, y, w, 24);
      ctx.fillStyle = ds.night > 0.5 ? '#ffeb99' : '#ffe9a8'; ctx.fillText(txt, x + w / 2, y + 12);
    }
    for (const lm of world.landmarks) {
      const [x, y] = S((lm.x0 + lm.x1 + 1) / 2 * TS, lm.decor ? (lm.y1 + 1) * TS + 4 : lm.y0 * TS + 8);
      if (x < -100 || x > VW + 100 || y < -20 || y > VH + 30) continue;
      const txt = `${lm.icon} ${lm.label}`; ctx.font = `bold 13px ${FONT}`; const w = ctx.measureText(txt).width + 12;
      ctx.fillStyle = 'rgba(60,30,10,0.85)'; ctx.fillRect(x - w / 2, y - 10, w, 20); ctx.fillStyle = '#ffd9a0'; ctx.fillText(txt, x, y);
    }
    // 名牌
    { const tx = state.px * SC - cx, ty = (state.py - 16) * SC - cy;
      const nm = t(celeb.short); ctx.font = `bold 12px ${FONT}`; ctx.fillStyle = 'rgba(0,0,0,0.6)'; const w = ctx.measureText(nm).width + 10; ctx.fillRect(tx - w / 2, ty - 10, w, 16); ctx.fillStyle = '#7CFFB2'; ctx.fillText(nm, tx, ty - 2); }
    for (const n of npcs) {
      const sx = (n.x - 8) * SC - cx, sy = (n.y - 14) * SC - cy;
      if (sx < -40 || sy < -40 || sx > VW || sy > VH) continue;
      const d = Math.hypot(n.x - state.px, n.y - state.py);
      if (n.type === 'contact' || d < 70) {
        const label = n.type === 'contact' ? t(`★ ${n.name}`) : `${n.name}${state.friends.some(f2 => f2.id === n.id) ? ' 🤝' : ''}`;
        ctx.font = `bold 11px ${FONT}`; const w = ctx.measureText(label).width + 8;
        ctx.fillStyle = 'rgba(0,0,0,0.6)'; ctx.fillRect(sx + 16 - w / 2, sy - 14, w, 15);
        ctx.fillStyle = n.type === 'contact' ? '#ffd54f' : '#fff'; ctx.fillText(label, sx + 16, sy - 6);
      }
    }
    // 交互提示
    const tg = nearTarget();
    if (tg && !modal) {
      const raw = tg.kind === 'story' ? '按 E 或点这里 · 进入本章' : tg.kind === 'npc' ? `按 E · 和 ${tg.obj.name}（${TYPE_NAME[tg.obj.type]}）交谈` : tg.kind === 'landmark' ? `按 E · 参观「${tg.obj.label}」` : `按 E · 进入「${tg.obj.label}」`;
      let msg = t(raw);
      let fs = 16;
      ctx.font = `bold ${fs}px ${FONT}`;
      const maxW = VW - 24;
      while (ctx.measureText(msg).width > maxW - 28 && fs > 11) { fs--; ctx.font = `bold ${fs}px ${FONT}`; }
      const w = Math.min(maxW, ctx.measureText(msg).width + 24);
      ctx.fillStyle = 'rgba(10,10,30,0.85)'; ctx.fillRect(VW / 2 - w / 2, VH - 78, w, 32); ctx.strokeStyle = '#ffd54f'; ctx.lineWidth = 2; ctx.strokeRect(VW / 2 - w / 2, VH - 78, w, 32);
      ctx.fillStyle = '#fff'; ctx.fillText(msg, VW / 2, VH - 62);
    }
    for (const c of sceneCast) {
      const sp = Y.sprites.char(c.look);
      ctx.drawImage(sp.down[0], (c.x - 8) * SC - cx, (c.y - 14) * SC - cy, 32, 32);
    }
    drawSceneFx();
    drawObjectiveMarker(S);
    drawMinimap();
    // 城市名 + 时间
    ctx.textAlign = 'left'; ctx.font = `bold 14px ${FONT}`;
    const cn = `📍 ${t(city().name)} · ${t(city().country)}${dayNight ? (ds.night > 0.5 ? ' · 🌙' : ' · ☀️') : ''}`; const cw = Math.min(VW - 180, ctx.measureText(cn).width + 16);
    ctx.fillStyle = 'rgba(0,0,0,0.55)'; ctx.fillRect(8, VH - 34, cw, 24); ctx.fillStyle = '#fff'; ctx.fillText(cn, 16, VH - 22);
  }

  // ---------------- HUD / 提示 ----------------
  function bar(v) { return `<span class="bar"><i style="width:${v}%"></i></span>`; }
  function updateHUD() {
    if (!state) return;
    const nw = api.netWorth();
    $('#hud').innerHTML = t(`
      <div class="who"><b>${celeb.name}</b><span>${year()}年${monthOf()}月 · ${age()}岁 · 📍${city().name}</span></div>
      <div class="st money">💰 资产 <b class="${nw < 0 ? 'neg' : ''}">${Y.fmtMoney(nw)}</b><small>现金 ${Y.fmtMoney(state.cash)}</small></div>
      <div class="st">⭐ 名气 ${bar(state.fame)}<em>${Math.round(state.fame)}</em></div>
      <div class="st">💖 魅力 ${bar(state.charm)}<em>${Math.round(state.charm)}</em></div>
      <div class="st">⚡ 精力 ${bar(state.energy)}<em>${Math.round(state.energy)}</em></div>
      <div class="st">🤝 人际 ${bar(state.rel)}<em>${Math.round(state.rel)}</em></div>`);
    $('#btn-car').textContent = state.driving ? '🚶 下车' : '🚗 上车';
    $('#btn-car').style.display = state.car ? '' : 'none';
    refreshGuide(false);
  }
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast'; t.textContent = Y.t(msg); $('#toasts').appendChild(t);
    setTimeout(() => t.classList.add('hide'), 2600); setTimeout(() => t.remove(), 3200);
  }

  // ---------------- 时间线 & 结局 ----------------
  function timelineHTML() {
    let rewrites = 0, same = 0;
    const rows = celeb.nodes.map(n => {
      const r = state.nodes[n.id];
      let mine, cls = '';
      if (!r) { if (n.year > year()) { mine = '<span class="muted">尚未到来</span>'; } else mine = '<span class="muted">进行中</span>'; }
      else if (r.status === 'pre') { mine = '<span class="muted">开局前 · 与历史相同</span>'; }
      else if (r.status === 'skipped') { mine = '<span class="muted">这条时间线上没有发生</span>'; cls = 'diff'; rewrites++; }
      else { mine = (r.history ? '📜 ' : '🔀 ') + r.choice + (r.result ? `<div class="muted small">${r.result}</div>` : ''); cls = r.history ? 'same' : 'diff'; if (r.history) same++; else rewrites++; }
      const basis = n.basis ? `<div class="muted small">📚 ${n.year}${n.month ? '.' + n.month : ''} · ${n.basis.location} · 依据公开资料（${n.basis.sources} 个来源，置信度${n.basis.conf}）</div>` : '';
      return `<tr class="${cls}"><td>${n.year}</td><td><b>${n.title}</b></td><td>${n.history}${basis}</td><td>${mine}</td></tr>`;
    }).join('');
    return { rewrites, same, html: `<table class="tbl tl"><tr><th>年份</th><th>节点</th><th>历史上的${celeb.short}</th><th>你的${celeb.short}</th></tr>${rows}</table>` };
  }
  function showTimeline() {
    const t = timelineHTML();
    const log = state.log.slice(-12).reverse().map(l => `<li>${l.y}.${l.m} · ${l.text}</li>`).join('');
    dialog({ cls: 'wide', title: `📜 人生时间线 · 历史上的他 vs 你的他`, html: `<p>已改写历史 <b>${t.rewrites}</b> 次，重演历史 <b>${t.same}</b> 次。</p>${t.html}<h3>最近经历</h3><ul class="log">${log}</ul>`, closeLabel: '关闭' });
  }
  function showEnding() {
    const tl = timelineHTML(), nw = api.netWorth(), h = celeb.history;
    const arc = state.arc && Y.drama.arcOf(celeb.id, state.arc);
    const title = arc ? arc.ending.title : (tl.rewrites === 0 ? '历史复刻者' : '把资料走完的人');
    const mine = arc ? arc.ending.text : (tl.rewrites === 0 ? '你几乎一直沿资料往前。高低都是那条路上的。' : '你改过一些步，又回到资料能接上的地方。');
    const bondName = { ally: '盟友', family: '家人', rival: '对手', mentor: '引路人' };
    const bonds = Object.keys(state.bonds || {}).map(k => `${bondName[k] || k} ${state.bonds[k] > 0 ? '+' : ''}${state.bonds[k]}`).join(' · ') || '还没有留下态度';
    const diverge = state.diverge ? `<p>你在 ${state.diverge.year} 年离开资料。那一步是「${state.diverge.choice}」，平行人生叫「${arc ? arc.title : ''}」。</p>` : '<p>你没有离开资料。下面是资料里的结局，和你一路做的选择。</p>';
    const html = `
      <div class="ending">
        <p class="title-badge">🏅 ${title}</p>
        ${diverge}
        <div class="cmp"><div><h4>资料里的${celeb.short}</h4><p class="big">${h.netWorth ? Y.fmtMoney(h.netWorth) : '（资料未给出身家）'}</p><p>${h.text}</p></div>
        <div><h4>你的${celeb.short}（${year()} 年，${age()} 岁）</h4><p class="big">${Y.fmtMoney(nw)}</p><p>${mine}</p>
        <p>关系：${bonds}</p>
        <p>名气 ${Math.round(state.fame)} · 魅力 ${Math.round(state.charm)} · 人际 ${Math.round(state.rel)}</p></div></div>
        ${tl.html}
      </div>`;
    dialog({ cls: 'wide', tag: arc ? '🔀 虚构推演 · 人生回顾' : '🏁 人生回顾', title: `${celeb.name}的另一种人生`, html, closable: false, choices: [
      { label: '重新开始', fn: () => { localStorage.removeItem(SAVE_KEY); showStart(); } },
      { label: '继续在这个世界闲逛', fn: () => { state.freeplay = true; save(); } }
    ] });
  }

  // ---------------- 开局 / 存档 ----------------
  function newGame(celebId, startId) {
    closeDialog(true); $('#toasts').innerHTML = '';
    celeb = Y.celebs[celebId];
    const st = celeb.starts.find(s => s.id === startId) || celeb.starts[0];
    state = {
      v: 1, celebId, startId: st.id, startYear: st.year, month: st.year * 12, city: st.city || celeb.homeCity, px: 0, py: 0, dir: 'down',
      cash: st.cash, fame: st.fame, charm: st.charm, energy: st.energy, rel: st.rel,
      companies: (st.companies || []).map(c => Object.assign({ status: 'active', type: 'company', since: st.year }, c)),
      flags: Object.assign({}, st.flags || {}), nodes: {}, events: {}, queue: [], log: [], friends: [], aff: {}, talked: {}, contactsDone: {}, visited: {},
      car: null, carColor: null, driving: false, jet: null, ended: false, storyGuide: 1, bonds: {}, arc: null, diverge: null
    };
    for (const n of celeb.nodes) if (n.year < st.year || (st.preDone || []).includes(n.id)) state.nodes[n.id] = { status: 'pre' };
    logEv(`以「${st.label}」开始人生`);
    refreshGuide(false);
    enterWorld('spawn');
    refreshGuide(true);
    if (!localStorage.getItem('yxrs_tutorial_v1')) openTutorial();
  }
  function enterWorld(at) {
    $('#start').classList.remove('show');
    $('#game').classList.add('show');
    loadCity(state.city, at);
    save();
  }
  function save() { if (state) try { const copy = Object.assign({}, state); delete copy._guideNotice; localStorage.setItem(SAVE_KEY, JSON.stringify(copy)); } catch (e) { } }
  function normalizeSave(s) {
    s.nodes = s.nodes || {}; s.flags = s.flags || {}; s.companies = s.companies || []; s.log = s.log || [];
    s.friends = s.friends || []; s.aff = s.aff || {}; s.talked = s.talked || {}; s.contactsDone = s.contactsDone || {};
    s.visited = s.visited || {}; s.events = s.events || {}; s.landmarks = s.landmarks || {};
    s.queue = Array.isArray(s.queue) ? s.queue.filter(q => q && q.kind === 'ending') : [];
    s.bonds = s.bonds || {};
    if (!s.storyGuide) {
      s.storyGuide = 1;
      s._guideNotice = '存档已接上章节引导：年份和选择都还在，接下来按屏幕上方的目标走。';
    }
    return s;
  }
  function load() {
    try {
      const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); if (!s || !Y.celebs[s.celebId]) return false;
      state = normalizeSave(s); celeb = Y.celebs[s.celebId];
      refreshGuide(false);
      enterWorld('keep');
      refreshGuide(false);
      if (state._guideNotice) { toast(state._guideNotice); state._guideNotice = ''; }
      if (state.ended && !state.freeplay) showEnding();
      return true;
    } catch (e) { return false; }
  }
  function showStart() {
    closeDialog(true); hideScene(); state = null; guide = null; tutoring = false;
    const tut = $('#tutorial'); if (tut) tut.classList.remove('show');
    $('#game').classList.remove('show'); $('#start').classList.add('show');
    const wrap = $('#celebs'); wrap.innerHTML = '';
    const saved = localStorage.getItem(SAVE_KEY);
    $('#continue').style.display = saved ? '' : 'none';
    for (const id of Y.celebOrder) {
      const c = Y.celebs[id];
      const card = document.createElement('div'); card.className = 'card'; card.dataset.id = id;
      const pc = document.createElement('canvas'); pc.width = 16; pc.height = 16; pc.className = 'portrait';
      pc.getContext('2d').drawImage(Y.sprites.char(c.look).down[0], 0, 0);
      card.appendChild(pc);
      const body = document.createElement('div'); body.className = 'cbody';
      body.innerHTML = t(`<h3>${c.name} <small>${c.en}</small></h3><div class="tags">${c.tags.map(t => `<span>${t}</span>`).join('')}</div><p>${c.bio}</p><div class="starts"></div>`);
      c.starts.forEach(s => { const b = document.createElement('button'); b.className = 'start-btn'; b.dataset.start = s.id; b.innerHTML = t(`<b>${s.label}</b><small>${s.desc}</small>`); b.onclick = () => newGame(id, s.id); body.querySelector('.starts').appendChild(b); });
      card.appendChild(body); wrap.appendChild(card);
    }
    for (const name of Y.comingSoon) {
      const card = document.createElement('div'); card.className = 'card soon';
      card.innerHTML = t(`<div class="portrait q">?</div><div class="cbody"><h3>${name}</h3><p>即将登场</p></div>`);
      wrap.appendChild(card);
    }
  }

  // ---------------- 输入 ----------------
  const TUTORIAL = [
    ['先看上面的目标', '每一章要做什么，都写在屏幕上方。照着做就不会迷路。逛街、投资、聊天是支线，可以之后再玩。'],
    ['箭头和小地图', '金色箭头指向这一章的地点。右上角小地图里，绿点是你，黄点是目标。点地面就能走过去，WASD 也行。'],
    ['不会误触', '靠近以后按 E，或直接点目标。对话要按「继续」或回车才会往下走。关键选择点下去之后，还要再确认一次才会写入时间线。']
  ];
  let tutStep = 0;
  function renderTut() {
    $('#tut-kicker').textContent = '新手引导 ' + (tutStep + 1) + ' / ' + TUTORIAL.length;
    $('#tut-title').textContent = TUTORIAL[tutStep][0];
    $('#tut-body').textContent = TUTORIAL[tutStep][1];
    $('#tut-next').textContent = tutStep === TUTORIAL.length - 1 ? '开始这一章' : '下一步';
  }
  function openTutorial() {
    tutoring = true; tutStep = 0;
    $('#tutorial').classList.add('show');
    renderTut();
  }
  function advanceTut() {
    if (!tutoring) return;
    if (tutStep < TUTORIAL.length - 1) { tutStep++; renderTut(); return; }
    tutoring = false;
    localStorage.setItem('yxrs_tutorial_v1', '1');
    $('#tutorial').classList.remove('show');
  }
  function bindInput() {
    window.addEventListener('keydown', e => {
      if (e.repeat) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (scene && $('#scene').classList.contains('show')) {
        if (k === 'enter' && performance.now() > inputLock) advanceScene();
        e.preventDefault();
        return;
      }
      if (tutoring) { if (k === 'enter') advanceTut(); return; }
      if (modal) {
        if (performance.now() < inputLock) return;
        if (e.key === 'Escape' && modal.o.closable !== false) { closeDialog(); return; }
        const n = parseInt(e.key, 10);
        if (n >= 1 && n <= 9) { focusChoice(n - 1, false); e.preventDefault(); return; }
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
          const btns = [...document.querySelectorAll('#modal .choice')];
          const usable = btns.map((b, i) => b.disabled ? -1 : i).filter(i => i >= 0);
          if (!usable.length) return;
          let pos = usable.indexOf(modal.focus);
          if (pos < 0) pos = e.key === 'ArrowDown' ? -1 : 0;
          const dir = e.key === 'ArrowDown' ? 1 : -1;
          focusChoice(usable[(pos + dir + usable.length) % usable.length], false);
          e.preventDefault(); return;
        }
        if (k === 'enter' && modal.focus >= 0) {
          const btns = document.querySelectorAll('#modal .choice');
          if (btns[modal.focus] && !btns[modal.focus].disabled) btns[modal.focus].click();
          e.preventDefault();
        }
        return;
      }
      if (!state) return;
      if ([' ', 'e', 'Enter'].includes(k)) { interact(); e.preventDefault(); return; }
      if (k === 'c') { toggleCar(); return; }
      if (k === 't') { showTimeline(); return; }
      if (k === 'm') { toggleMute(); return; }
      if (k === 'n') { toggleDayNight(); return; }
      keys[k] = true;
      if (k.startsWith('Arrow')) e.preventDefault();
    });
    window.addEventListener('keyup', e => { const k = e.key.length === 1 ? e.key.toLowerCase() : e.key; keys[k] = false; });
    window.addEventListener('blur', () => Object.keys(keys).forEach(k => keys[k] = false));
    document.querySelectorAll('#touch [data-k]').forEach(b => {
      const k = b.dataset.k;
      const on = e => { e.preventDefault(); keys[k] = true; b.classList.add('on'); };
      const off = e => { e.preventDefault(); keys[k] = false; b.classList.remove('on'); };
      b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointerleave', off); b.addEventListener('pointercancel', off);
    });
    $('#btn-a').addEventListener('pointerdown', e => { e.preventDefault(); interact(); });
    $('#btn-car').onclick = toggleCar;
    $('#btn-tl').onclick = () => state && !tutoring && showTimeline();
    $('#btn-save').onclick = () => { save(); toast('💾 已保存'); };
    $('#btn-skip').onclick = () => {
      if (!state || modal || tutoring) return;
      const pt = objectivePoint();
      if (pt) clickPath = findPath(state.px, state.py, pt.x, pt.y);
      toast(guide && guide.text ? t(guide.text) : '跟着金色箭头走');
    };
    $('#obj-action').onclick = () => {
      if (!state || !guide || guide.phase !== 'done' || modal) return;
      dialog({ title: '查看结局？', text: '打开和历史的总对照。这一步可以返回。', closable: false, choices: [
        { label: '打开总对照', fn: () => { state.ended = true; save(); showEnding(); } },
        { label: '再逛一会儿', fn: () => {} }
      ] });
    };
    $('#tut-next').onclick = advanceTut;
    canvas.addEventListener('pointerdown', e => {
      if (!state || !world || modal || tutoring) return;
      const rect = canvas.getBoundingClientRect();
      const sx = (e.clientX - rect.left) * (canvas.width / rect.width);
      const sy = (e.clientY - rect.top) * (canvas.height / rect.height);
      const wx = (sx + cam.x) / SC, wy = (sy + cam.y) / SC;
      const pt = objectivePoint();
      if (pt && Math.hypot(pt.x - state.px, pt.y - state.py) < 42 && Math.hypot(pt.x - wx, pt.y - wy) < 36) { interact(); return; }
      const tg = nearTarget();
      if (tg && tg.kind !== 'story') {
        const tx = tg.kind === 'npc' ? tg.obj.x : tg.obj.door.x * TS + 8;
        const ty = tg.kind === 'npc' ? tg.obj.y : tg.obj.door.y * TS + 16;
        if (Math.hypot(tx - wx, ty - wy) < 40) { interact(); return; }
      }
      clickPath = findPath(state.px, state.py, wx, wy);
    });
    $('#btn-mute').onclick = toggleMute;
    $('#btn-menu').onclick = () => { if (!state || tutoring) return; dialog({ title: '菜单', choices: [
      { label: '📜 人生时间线', fn: showTimeline },
      { label: '🎯 再看本章目标', fn: () => { const pt = objectivePoint(); if (pt) clickPath = findPath(state.px, state.py, pt.x, pt.y); toast(guide ? t(guide.text) : ''); } },
      { label: '📘 再看新手引导', fn: openTutorial },
      { label: '💾 保存', fn: () => { save(); toast('💾 已保存'); } },
      { label: '❓ 玩法说明', fn: help },
      { label: (Y.audio.muted ? '🔊 打开声音' : '🔇 静音') + '（M）', fn: toggleMute },
      { label: (dayNight ? '☀️ 关闭昼夜效果' : '🌙 打开昼夜效果') + '（N）', fn: toggleDayNight },
      { label: '🏠 返回选人界面（进度已保存）', fn: () => { save(); showStart(); } }
    ] }); };
    $('#continue').onclick = () => load();
  }
  function toggleMute() { Y.audio.init(); const m = Y.audio.toggleMute(); updateMuteBtn(); toast(m ? '🔇 已静音' : '🔊 声音已打开'); }
  function updateMuteBtn() { const b = $('#btn-mute'); if (b) b.textContent = Y.audio.muted ? '🔇 静音中' : '🔊 声音'; }
  function toggleDayNight() { dayNight = !dayNight; localStorage.setItem('yxrs_daynight', dayNight ? '1' : '0'); toast(dayNight ? '🌙 昼夜效果：开' : '☀️ 昼夜效果：关'); }
  function help() {
    info('玩法说明', '· 屏幕上方是本章目标。金色箭头和小地图会带你过去。\n· WASD / 方向键移动，或点地面自动走。靠近后按 E，或直接点目标。\n· 对话用「继续」或回车往下走。数字键只是选中，不会直接生效。卖公司、买车、飞去别的城市、章节选择，都要再确认一次。\n· 选📜会沿资料走，选🔀是虚构分支。📚 可以展开这一章的依据。\n· 投资、聊天、买车、坐船是支线。咖啡馆里有「时代新闻」。\n· M 静音，N 昼夜，T 时间线。章节走完后可以看和历史的总对照。');
  }

  function loop(t) {
    const dt = Math.min(0.05, (t - (loop.last || t)) / 1000); loop.last = t;
    if (state && world) {
      if (!modal && !tutoring) update(dt);
      draw();
      if (!modal && !tutoring && state.queue.length) processQueue();
    }
    requestAnimationFrame(loop);
  }

  window.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth < 700) { VW = 480; VH = Math.min(720, Math.round(480 * Math.max(1, (window.innerHeight - 330) / window.innerWidth))); }
    canvas = $('#world'); canvas.width = VW; canvas.height = VH; ctx = canvas.getContext('2d');
    bindInput(); showStart(); updateMuteBtn();
    const unlock = () => { Y.audio.init(); };
    window.addEventListener('pointerdown', unlock); window.addEventListener('keydown', unlock);
    if (matchMedia('(pointer:coarse)').matches) document.body.classList.add('touch');
    requestAnimationFrame(loop);
  });

  // 测试钩子
  window.__YX = {
    get state() { return state; }, get celeb() { return celeb; }, get npcs() { return npcs; }, get world() { return world; }, get modal() { return modal; }, api,
    newGame, advance, interact, processQueue, enterBuilding: type => enterBuilding(world.buildings.find(b => b.type === type)), fly: id => fly(id),
    teleport: (x, y) => { state.px = x; state.py = y; clickPath = null; }, goCity: id => loadCity(id, 'spawn'), setClock: phase => { clockOffset = phase * DAY_LEN - (performance.now() / 1000) % DAY_LEN; }, dayState, toggleMute, toggleDayNight, get audio() { return Y.audio; }, visitLandmark, toggleCar, showTimeline, showEnding, save, load,
    pick: i => { const btns = document.querySelectorAll('#modal .choice'); if (btns[i]) btns[i].click(); return btns.length; },
    choiceLabels: () => Array.from(document.querySelectorAll('#modal .choice .lbl')).map(x => x.textContent),
    get guide() { return guide; },
    objective: () => guide && { phase: guide.phase, text: Y.t(guide.text), title: Y.t(guide.title), index: guide.index, total: guide.total, cityId: guide.cityId },
    objectivePoint, seekObjective: () => { const p = objectivePoint(); if (!p) return 0; clickPath = findPath(state.px, state.py, p.x, p.y); return clickPath.length; },
    step: dt => { if (state && world && !modal && !tutoring) update(dt); if (state && world) draw(); },
    storyTravel, openChapter: () => { if (guide && guide.node) openChapter(guide.node); },
    isTutorial: () => tutoring, advanceTut, dismissTutorial: () => { while (tutoring) advanceTut(); },
    advanceScene, sceneState: () => scene && { mode: scene.mode, kind: scene.meta && scene.meta.kind, mood: scene.meta && scene.meta.mood, line: ($('#scene-line') || {}).textContent || '' }
  };
})(window.YXRS);
