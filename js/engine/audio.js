// Web Audio 芯片音乐：每座城市一首程序生成的 BGM + 音效。无外部音频文件。
(function (Y) {
  const SCALES = { major: [0, 2, 4, 5, 7, 9, 11], minor: [0, 2, 3, 5, 7, 8, 10], dorian: [0, 2, 3, 5, 7, 9, 10], mixolydian: [0, 2, 4, 5, 7, 9, 10], pentatonic: [0, 2, 4, 7, 9], insen: [0, 1, 5, 7, 10] };
  const MUTE_KEY = 'yxrs_mute';
  const A = Y.audio = { ctx: null, master: null, music: null, sfxBus: null, muted: localStorage.getItem(MUTE_KEY) === '1', song: null, step: 0, nextTime: 0, timer: null, city: null };
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);

  A.init = function () {
    if (A.ctx) { if (A.ctx.state === 'suspended') A.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    A.ctx = new AC();
    A.master = A.ctx.createGain(); A.master.gain.value = A.muted ? 0 : 0.6; A.master.connect(A.ctx.destination);
    A.music = A.ctx.createGain(); A.music.gain.value = 0.35; A.music.connect(A.master);
    A.sfxBus = A.ctx.createGain(); A.sfxBus.gain.value = 0.5; A.sfxBus.connect(A.master);
    const len = A.ctx.sampleRate * 0.5, buf = A.ctx.createBuffer(1, len, A.ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    A.noise = buf;
    A.timer = setInterval(schedule, 25);
    if (A.city) A.setCity(A.city, true);
  };
  A.setMuted = function (m) {
    A.muted = m; localStorage.setItem(MUTE_KEY, m ? '1' : '0');
    if (A.master) A.master.gain.setTargetAtTime(m ? 0 : 0.6, A.ctx.currentTime, 0.05);
  };
  A.toggleMute = () => { A.setMuted(!A.muted); return A.muted; };

  function tone(t, freq, dur, type, vol, bus, slide) {
    const o = A.ctx.createOscillator(), g = A.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, slide), t + dur);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(bus || A.music); o.start(t); o.stop(t + dur + 0.02);
  }
  function noise(t, dur, vol, hp, bus) {
    const s = A.ctx.createBufferSource(); s.buffer = A.noise;
    const f = A.ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp || 6000;
    const g = A.ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(bus || A.music); s.start(t); s.stop(t + dur + 0.02);
  }

  // 根据城市 music 参数生成 4 小节 × 16 步的歌
  function makeSong(city) {
    const m = (city.layout && city.layout.music) || { bpm: 110, root: 60, scale: 'major', lead: 'square', mood: 'bright' };
    const r = Y.rng(city.seed * 977 + 5), sc = SCALES[m.scale] || SCALES.major;
    const deg = (d, oct) => m.root + 12 * (oct + Math.floor(d / sc.length)) + sc[((d % sc.length) + sc.length) % sc.length];
    const prog = [0, 3, 4, 0].map((x, i) => (i === 1 && sc.length === 5) ? 2 : (i === 2 && sc.length === 5) ? 3 : x);
    const lead = [], bass = [], drum = [];
    let cur = 2;
    const density = { bright: 0.6, chill: 0.4, busy: 0.75, rainy: 0.35, warm: 0.5 }[m.mood] || 0.5;
    const motif = []; for (let i = 0; i < 16; i++) motif.push(r() < density ? Math.floor(r() * 5) - 2 : null);
    for (let bar = 0; bar < 4; bar++) for (let s = 0; s < 16; s++) {
      const i = bar * 16 + s;
      const mv = bar === 3 && s > 8 ? (r() < 0.5 ? null : motif[s]) : motif[s];
      if (mv != null && (s % 2 === 0 || m.mood === 'busy')) { cur = Math.max(-2, Math.min(9, cur + mv)); lead[i] = deg(cur + prog[bar], 1); } else lead[i] = null;
      bass[i] = (s % 4 === 0) ? deg(prog[bar], -1) + (s % 8 === 4 ? 12 : 0) : null;
      drum[i] = s % 8 === 0 ? 'k' : s % 8 === 4 ? 's' : (s % 2 === 0 ? 'h' : (m.mood === 'busy' ? 'h' : null));
    }
    return { bpm: m.bpm, lead, bass, drum, leadType: m.lead, len: 64 };
  }
  function schedule() {
    if (!A.ctx || !A.song) return;
    const sp = 60 / A.song.bpm / 4;
    while (A.nextTime < A.ctx.currentTime + 0.12) {
      const i = A.step % A.song.len, t = A.nextTime;
      if (A.song.lead[i]) tone(t, mtof(A.song.lead[i]), sp * 1.8, A.song.leadType, 0.12);
      if (A.song.bass[i]) tone(t, mtof(A.song.bass[i]), sp * 3.5, 'triangle', 0.2);
      const d = A.song.drum[i];
      if (d === 'k') tone(t, 140, 0.12, 'sine', 0.35, null, 40);
      else if (d === 's') noise(t, 0.08, 0.18, 1800);
      else if (d === 'h') noise(t, 0.025, 0.06, 7000);
      A.nextTime += sp; A.step++;
    }
  }
  A.setCity = function (id, force) {
    if (A.city === id && !force && A.song) return;
    A.city = id;
    if (!A.ctx) return;
    A.song = makeSong(Y.cities[id]); A.step = 0; A.nextTime = A.ctx.currentTime + 0.1;
  };
  A.stopMusic = function () { A.song = null; };

  const SFX = {
    blip: t => tone(t, 880, 0.06, 'square', 0.15, A.sfxBus),
    select: t => { tone(t, 660, 0.05, 'square', 0.15, A.sfxBus); tone(t + 0.05, 990, 0.07, 'square', 0.15, A.sfxBus); },
    coin: t => { tone(t, 988, 0.08, 'square', 0.18, A.sfxBus); tone(t + 0.08, 1319, 0.2, 'square', 0.18, A.sfxBus); },
    fail: t => { tone(t, 330, 0.15, 'square', 0.18, A.sfxBus, 160); tone(t + 0.15, 220, 0.25, 'square', 0.18, A.sfxBus, 90); },
    fanfare: t => [523, 659, 784, 1047].forEach((f, i) => tone(t + i * 0.1, f, i === 3 ? 0.4 : 0.12, 'square', 0.16, A.sfxBus)),
    whoosh: t => { noise(t, 0.9, 0.25, 400, A.sfxBus); tone(t, 200, 0.9, 'sawtooth', 0.05, A.sfxBus, 900); },
    engine: t => { tone(t, 70, 0.4, 'sawtooth', 0.15, A.sfxBus, 140); },
    chime: t => { tone(t, 1047, 0.3, 'triangle', 0.15, A.sfxBus); tone(t + 0.12, 1568, 0.4, 'triangle', 0.12, A.sfxBus); },
    step: t => noise(t, 0.02, 0.03, 3000, A.sfxBus)
  };
  A.sfx = function (name) { if (!A.ctx || A.muted || !SFX[name]) return; SFX[name](A.ctx.currentTime + 0.01); };
  A.mood = function (m) { A.sfx(m === 'high' ? 'fanfare' : m === 'low' ? 'fail' : m === 'warm' ? 'chime' : 'blip'); };
})(window.YXRS);
