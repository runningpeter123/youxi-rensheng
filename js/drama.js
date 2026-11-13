// 选择之后的场面，以及“离开资料”时进入哪一段平行人生。
(function (Y) {
  const ORDER = ['solo', 'deal', 'quiet'];

  function pickArc(ch, node) {
    if (!ch || ch.history || !node || node.fictional) return null;
    const alts = (node.choices || []).filter(c => !c.history);
    let i = alts.indexOf(ch);
    if (i < 0) i = 0;
    return ORDER[i % ORDER.length];
  }

  function book(celebId) {
    return (Y.branchbook && Y.branchbook[celebId]) || null;
  }

  function arcOf(celebId, arcId) {
    const b = book(celebId);
    return b && b.arcs ? b.arcs[arcId] : null;
  }

  const OPTS = {
    persuade: [
      ['我把顾虑也告诉你', 'ally', 8, '他点头：“那就一起担。”'],
      ['别问，照我说的做', 'ally', -6, '他咬住下唇，还是没走。'],
      ['你要是怕，现在可以走', 'family', 3, '“我怕。我留下。”']
    ],
    negotiate: [
      ['让一步，换他留下', 'ally', 6, '他把包放下，坐了回来。'],
      ['对半，写在纸上', 'ally', 2, '“可以。按这个签。”'],
      ['寸步不让', 'rival', -6, '椅子响了一声，他站起来。']
    ],
    press: [
      ['承认我也会怕', 'ally', 4, '底下有人轻轻鼓掌。'],
      ['只谈接下来要做的事', 'rival', 0, '标题会很好看，人却更远。'],
      ['把话筒递回去，问他们想听什么', 'ally', -2, '会场静了一秒，然后笑开了。']
    ],
    crisis: [
      ['先保住人，条件以后再说', 'ally', 5, '你听见对面松了口气。'],
      ['把条件顶回去', 'rival', -5, '听筒里安静了很久。'],
      ['挂断，自己扛', 'family', 2, '房间里只剩电流声。']
    ]
  };

  function interactOf(kind, prompt, whoName) {
    const rows = OPTS[kind] || OPTS.persuade;
    return {
      kind: kind || 'persuade',
      who: rows[0][1] === 'rival' ? 'rival' : 'ally',
      name: whoName || '身边的人',
      prompt: prompt,
      seconds: kind === 'crisis' ? 8 : 0,
      options: rows.map(r => ({ text: r[0], bond: r[1], d: r[2], reply: r[3], fx: kind === 'crisis' && r[2] < 0 ? { energy: -6, fame: 2 } : { rel: r[2] > 0 ? 2 : 0 } })),
      timeout: kind === 'crisis' ? { text: '你没出声。对方替你选了最稳的那条：先保住人。', bond: 'ally', d: 1, fx: { energy: -2 } } : null
    };
  }

  function defaultInteract() {
    return interactOf('persuade', '他把笔放下，等你先开口。', '身边的人');
  }

  function historicalAfter(node, ch, result) {
    const res = (result && result.res) || '这一步记下来了。';
    const low = !ch.history && /不如|失败|离开|破产|吵|跌|崩/.test(res + (ch.text || ''));
    const mood = ch.history ? 'warm' : (low ? 'low' : 'tense');
    const env = ch.history ? 'board' : (low ? 'rain' : 'garage');
    const fact = String(node.history || '').split('。')[0];
    return {
      mood: mood, env: env, kind: 'consequence', cast: mood === 'low' ? ['family'] : ['ally', 'press'],
      beats: [
        { who: 'inner', name: '心里话', expr: mood === 'low' ? '沉' : '定', line: ch.history ? ('你按资料走了这一步。' + (fact ? fact + '。' : '')) : ('你没有按资料走。你选的是：' + ch.text) },
        { who: mood === 'low' ? 'family' : 'ally', name: mood === 'low' ? '家人' : '身边的人', expr: ch.history ? '笑' : '沉', line: ch.history ? '“这一页就按原来的样子翻过去。”' : '“那后面的路，不能再照着旧剧本念了。”' },
        { who: 'press', name: '门外', expr: mood === 'low' ? '乱' : '亮', line: mood === 'low' ? '走廊那盏灯坏了。没有人进来。' : (ch.history ? '门外有脚步，又停住。像是在等你先笑。' : '有人把耳朵贴在门上，又悄悄走开。') },
        { who: 'inner', name: '心里话', expr: '定', line: res }
      ]
    };
  }

  function arcAfter(node, ch) {
    const hard = ch && ch.tone === 'hard';
    const mood = hard ? 'tense' : (node.mood || 'warm');
    const env = hard ? (node.envHard || 'board') : (node.env || 'home');
    const beats = (node.after || []).map((line, i) => ({
      who: i === 1 ? 'inner' : (i === 2 ? 'family' : 'ally'),
      name: i === 1 ? '心里话' : (i === 2 ? '家人' : '身边的人'),
      expr: mood === 'low' ? '沉' : (mood === 'high' ? '亮' : '定'),
      line: line
    }));
    beats.push({ who: 'inner', name: '心里话', expr: '定', line: (ch && ch.result) || '这一幕结束了。' });
    return { mood: mood, env: env, kind: 'consequence', cast: mood === 'high' ? ['ally', 'press'] : ['ally', 'family'], beats: beats };
  }

  Y.drama = { pickArc, arcOf, book, interactOf, defaultInteract, historicalAfter, arcAfter, OPTS };
})(window.YXRS);
