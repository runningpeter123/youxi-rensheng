// Headless playtest: two celebrities, two chapters each, screenshots, console errors.
const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ART = '/opt/cursor/artifacts';
fs.mkdirSync(ART, { recursive: true });

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };
const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(ROOT, url === '/' ? 'index.html' : url);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('no'); return;
  }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

const errors = [];
function log(...a) { console.log(...a); }

async function main() {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  const chrome = spawn('google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage',
    '--window-size=1200,900', '--remote-debugging-port=9333',
    '--user-data-dir=/tmp/yxrs-chrome', 'about:blank'
  ], { stdio: 'ignore' });
  let ws;
  try {
    const list = await waitJson('http://127.0.0.1:9333/json/list');
    const page = list.find(t => t.type === 'page');
    ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let id = 0; const pending = new Map();
    ws.onmessage = ev => {
      const msg = JSON.parse(ev.data);
      if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); return; }
      if (msg.method === 'Runtime.exceptionThrown') {
        const d = msg.params.exceptionDetails;
        errors.push('EXC ' + (d.exception && d.exception.description || d.text));
      }
      if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        errors.push('CONSOLE ' + msg.params.args.map(a => a.value || a.description || '').join(' '));
      }
    };
    const cdp = (method, params = {}) => new Promise((res, rej) => {
      const n = ++id;
      pending.set(n, msg => msg.error ? rej(new Error(method + ' ' + JSON.stringify(msg.error))) : res(msg.result));
      ws.send(JSON.stringify({ id: n, method, params }));
    });
    const ev = async (expression) => {
      const r = await cdp('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails).slice(0, 500));
      return r.result.value;
    };
    const shot = async (name) => {
      const { data } = await cdp('Page.captureScreenshot', { format: 'png' });
      const p = path.join(ART, name);
      fs.writeFileSync(p, Buffer.from(data, 'base64'));
      log('shot', name);
    };
    await cdp('Page.enable');
    await cdp('Runtime.enable');
    await cdp('Page.navigate', { url: `http://127.0.0.1:${port}/` });
    await sleep(400);
    await waitUntil(() => ev(`!!document.querySelector('#celebs .start-btn')`));
    const gen = await ev(`(() => {
      const out = [];
      const who = { mc: 'freekick', chi: 'senator' };
      for (const id of YXRS.cityOrder) {
        const cid = who[id] || 'rocketman';
        const w = YXRS.map.generate(YXRS.cities[id], YXRS.celebs[cid]);
        out.push(id + '/' + cid + ' ' + w.W + 'x' + w.H + ' b=' + w.buildings.length + ' d=' + w.districts.length);
      }
      return out.join('\\n');
    })()`);
    log(gen);
    await shot('title_screen.png');

    await ev(`document.querySelector('.card[data-id="rocketman"] .start-btn').click()`);
    await waitUntil(() => ev(`window.__YX && window.__YX.isTutorial()`));
    await ev(`window.__YX.step(0.05)`);
    await shot('tutorial.png');
    await ev(`window.__YX.dismissTutorial()`);
    await ev(`window.__YX.step(0.05)`);
    const size = await ev(`window.__YX.world.W + 'x' + window.__YX.world.H`);
    log('rocketman map', size);
    await shot('city_objective_minimap.png');
    await playChapters(cdp, ev, shot, 2, true);

    await ev(`document.querySelector('#modal') && document.querySelector('#modal').classList.remove('show')`);
    await ev(`window.__YX && (document.querySelector('#btn-menu') && document.querySelector('#btn-menu').click())`);
    // leave via the in-game menu if a modal is up; otherwise call show by clicking return through evaluate of a safe path
    await ev(`(() => { const btns = [...document.querySelectorAll('#modal .choice .lbl')]; const i = btns.findIndex(b => b.textContent.includes('返回选人')); if (i >= 0) window.__YX.pick(i); })()`);
    await sleep(200);
    if (!(await ev(`!!document.querySelector('#start.show')`))) {
      await ev(`window.__YX.load && localStorage.removeItem('yxrs_pixel_save_v2'); location.reload()`);
      await sleep(500);
      await waitUntil(() => ev(`!!document.querySelector('.card[data-id="gpuboss"] .start-btn')`));
    }
    await ev(`localStorage.setItem('yxrs_tutorial_v1','1')`);
    await ev(`document.querySelector('.card[data-id="gpuboss"] .start-btn').click()`);
    await waitUntil(() => ev(`window.__YX && window.__YX.objective() && window.__YX.objective().title`));
    await ev(`window.__YX.dismissTutorial()`);
    log('gpuboss', await ev(`JSON.stringify(window.__YX.objective())`));
    await playChapters(cdp, ev, shot, 2, false);
    await playDivergent(ev, shot, 'rocketman');
    await playDivergent(ev, shot, 'gpuboss');

    await ev(`localStorage.setItem('yxrs_tutorial_v1','1'); location.reload()`);
    await sleep(400);
    await waitUntil(() => ev(`!!document.querySelectorAll('.card[data-id="rocketman"] .start-btn')[1]`));
    await ev(`document.querySelectorAll('.card[data-id="rocketman"] .start-btn')[1].click()`);
    await waitUntil(() => ev(`window.__YX && window.__YX.objective()`));
    await ev(`window.__YX.dismissTutorial()`);
    const travel = await ev(`window.__YX.objective()`);
    log('travel objective', JSON.stringify(travel));
    if (!travel || travel.phase !== 'travel') throw new Error('expected a travel chapter, got ' + JSON.stringify(travel));
    let flew = false;
    for (let i = 0; i < 800 && !flew; i++) {
      const modal = await modalInfo(ev);
      if (modal) {
        log('travel modal', modal.title, (modal.labels || []).join(' / '));
        if ((modal.title || '').includes('再确认')) { await ev(`window.__YX.pick(0)`); flew = true; break; }
        const idx = (modal.labels || []).findIndex(l => l.includes('飞往'));
        await ev(`window.__YX.pick(${idx >= 0 ? idx : 0})`);
        continue;
      }
      const near = await ev(`(() => { const p = window.__YX.objectivePoint(); const s = window.__YX.state; return p && Math.hypot(p.x-s.px,p.y-s.py) < 36; })()`);
      if (near) { await ev(`window.__YX.interact()`); continue; }
      const plen = await ev(`window.__YX.seekObjective()`);
      if (!plen && i > 8) await ev(`(() => { const p = window.__YX.objectivePoint(); window.__YX.teleport(p.x, p.y + 20); })()`);
      await ev(`window.__YX.step(0.25)`);
    }
    await sleep(50);
    const arrived = await ev(`window.__YX.state.city`);
    log('arrived', arrived, JSON.stringify(await ev(`window.__YX.objective()`)));
    if (arrived === 'sv') throw new Error('story flight did not leave the home city');

    if (errors.length) {
      console.error('ERRORS\n' + errors.join('\n'));
      process.exitCode = 1;
    } else log('no console errors');
  } finally {
    try { chrome.kill('SIGKILL'); } catch (e) {}
    server.close();
    if (ws) try { ws.close(); } catch (e) {}
  }
}

const shotsTaken = {};
async function playChapters(cdp, ev, shot, count, capture, preferAlt) {
  let shotChoice = !capture, shotSummary = !capture;
  let alt = !!preferAlt;
  let travelRetries = 0;
  for (let chapter = 0; chapter < count; chapter++) {
    const start = await ev(`window.__YX.objective()`);
    log('start chapter', JSON.stringify(start));
    if (start && start.phase === 'travel') {
      for (let i = 0; i < 80; i++) {
        if (await pumpScene(ev, shot)) continue;
        const m = await modalInfo(ev);
        if (m && ((m.labels || []).some(l => l.includes('飞往')) || (m.title || '').includes('再确认'))) {
          const idx = (m.labels || []).findIndex(l => l.includes('飞往') || l === '确认');
          await ev(`window.__YX.pick(${idx < 0 ? 0 : idx})`);
          continue;
        }
        const phase = await ev(`window.__YX.objective() && window.__YX.objective().phase`);
        if (phase && phase !== 'travel') break;
        const near = await ev(`(() => { const p = window.__YX.objectivePoint(); const s = window.__YX.state; return !!(p && s && Math.hypot(p.x - s.px, p.y - s.py) < 36); })()`);
        if (near) await ev(`window.__YX.interact()`);
        else await ev(`window.__YX.seekObjective(); window.__YX.step(0.25)`);
      }
    }
    let opened = false;
    for (let i = 0; i < 700 && !opened; i++) {
      if (await pumpScene(ev, shot)) continue;
      const modal = await modalInfo(ev);
      if (modal) { opened = true; break; }
      const near = await ev(`(() => { const p = window.__YX.objectivePoint(); const s = window.__YX.state; if (!p || !s) return false; return Math.hypot(p.x - s.px, p.y - s.py) < 36; })()`);
      if (near) {
        await ev(`window.__YX.interact()`);
        await sleep(30);
        opened = !!(await modalInfo(ev));
        if (opened) break;
      }
      const plen = await ev(`window.__YX.seekObjective()`);
      if (!plen && i > 5) {
        const moved = await ev(`(() => { const p = window.__YX.objectivePoint(); if (!p) return false; window.__YX.teleport(p.x, p.y + 18); return true; })()`);
        log('path empty, nudged', moved);
      }
      await ev(`window.__YX.step(0.2)`);
    }
    if (!opened) throw new Error('could not open chapter ' + JSON.stringify(start));
    let advanced = false;
    for (let step = 0; step < 40; step++) {
      if (await pumpScene(ev, shot)) continue;
      const m = await modalInfo(ev);
      if (!m) break;
      log('modal', m.title, '|', (m.labels || []).join(' / '), '|', (m.subs || []).join(' / '));
      const labels = m.labels || [];
      const subs = m.subs || [];
      if (!shotSummary && labels.some(l => l.includes('下一章'))) {
        await shot('chapter_summary.png'); shotSummary = true;
        await ev(`window.__YX.pick(0)`);
        break;
      }
      if (m.title && m.title.includes('再确认')) { await ev(`window.__YX.pick(0)`); continue; }
      if (!shotChoice && (m.title || '').includes('这一章怎么走')) {
        await shot('chapter_choice.png'); shotChoice = true;
      }
      let idx = subs.findIndex(s => alt ? (s.includes('游戏备选') || s.includes('虚构推演')) : s.includes('史实'));
      if (alt && idx >= 0) alt = false;
      if (idx < 0) idx = 0;
      await ev(`window.__YX.pick(${idx})`);
      await sleep(40);
    }
    const after = await ev(`window.__YX.objective()`);
    log('after', JSON.stringify(after));
    if (!start || !after || start.title !== after.title || start.index !== after.index) advanced = true;
    if (advanced) continue;
    if (start.phase === 'travel' && after.phase !== 'travel') {
      if (++travelRetries > 4) throw new Error('stuck after travel ' + start.title);
      chapter -= 1;
      continue;
    }
    throw new Error('chapter did not advance: ' + start.title);
  }
}

async function playDivergent(ev, shot, id) {
  await ev(`localStorage.setItem('yxrs_tutorial_v1','1'); location.reload()`);
  await sleep(500);
  await waitUntil(() => ev(`!!document.querySelector('.card[data-id="${id}"] .start-btn')`));
  await ev(`document.querySelector('.card[data-id="${id}"] .start-btn').click()`);
  await waitUntil(() => ev(`window.__YX && window.__YX.objective()`));
  await ev(`window.__YX.dismissTutorial()`);
  await playChapters(null, ev, shot, 1, false, true);
  const info = await ev(`({ arc: window.__YX.state.arc, obj: window.__YX.objective() })`);
  log('diverged', id, JSON.stringify(info));
  if (!info.arc) throw new Error(id + ' did not enter a parallel arc');
  if (!info.obj || String(info.obj.text).indexOf('虚构') < 0) throw new Error(id + ' follow-up is not fictional');
  if (!shotsTaken.diverge) {
    await ev(`window.__YX.step(0.05)`);
    await shot('divergent_chapter.png');
    shotsTaken.diverge = true;
  }
  await playChapters(null, ev, shot, 2, false, false);
  if (!shotsTaken.review) {
    await ev(`window.__YX.showEnding()`);
    await sleep(250);
    await shot('life_review.png');
    shotsTaken.review = true;
  }
}
async function pumpScene(ev, shot) {
  const st = await ev(`window.__YX && window.__YX.sceneState && window.__YX.sceneState()`);
  if (!st) return false;
  if (shot && st.kind === 'consequence' && !shotsTaken.cons) { await shot('consequence_scene.png'); shotsTaken.cons = true; }
  if (shot && st.kind === 'interact' && st.mode === 'pick' && !shotsTaken.talk) { await shot('dialogue_interaction.png'); shotsTaken.talk = true; }
  if (shot && st.mood === 'high' && !shotsTaken.high) { await shot('emotional_high.png'); shotsTaken.high = true; }
  if (shot && st.mood === 'low' && !shotsTaken.low) { await shot('emotional_low.png'); shotsTaken.low = true; }
  if (st.mode === 'say') await ev(`window.__YX.advanceScene()`);
  else await ev(`document.querySelector('#scene-actions button') && document.querySelector('#scene-actions button').click()`);
  await sleep(40);
  return true;
}
async function modalInfo(ev) {
  return ev(`(() => {
    const m = document.querySelector('#modal');
    if (!m || !m.classList.contains('show')) return null;
    return {
      title: (m.querySelector('h2') || {}).textContent || '',
      labels: [...m.querySelectorAll('.choice .lbl')].map(n => n.textContent),
      subs: [...m.querySelectorAll('.choice .sub')].map(n => n.textContent)
    };
  })()`);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function waitJson(url) {
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.length) return data;
    } catch (e) {}
    await sleep(100);
  }
  throw new Error('no debugger');
}
async function waitUntil(fn) {
  for (let i = 0; i < 50; i++) { if (await fn()) return; await sleep(100); }
  throw new Error('waitUntil timeout');
}

main().catch(err => { console.error(err); process.exit(1); });
