// 章节引导：把已有人生节点排成主线。地点只做“去哪座已有城市上演”，文案始终带资料里的地点原文。
(function (Y) {
  // 后出现的地名优先，这样“俄勒冈→硅谷”会落到硅谷，而不是出发地。
  const RULES = [
    ['sea', /西雅图|雷德蒙德|贝尔维尤|塔科马|俄勒冈|科瓦利斯|华盛顿州/g],
    ['sv', /帕洛阿尔托|硅谷|圣何塞|圣克拉拉|伯克利|奥克兰|旧金山/g],
    ['la', /洛杉矶|霍桑/g],
    ['ny', /纽约|曼哈顿|布朗克斯|布鲁克林|皇后区|史坦顿岛|大西洋城/g],
    ['sh', /上海/g],
    ['tp', /台北|台湾|新竹/g],
    ['tk', /东京|日本|福冈/g],
    ['hz', /杭州|浙江/g],
    ['mc', /曼彻斯特|索尔福德|普雷斯敦|普雷斯顿/g],
    ['md', /马德里|西班牙/g],
    ['chi', /芝加哥|伊利诺伊|斯普林菲尔德/g],
    ['dc', /华盛顿特区|华盛顿(?!州)/g],
    ['ld', /伦敦|英国|剑桥|温莎|温布利|温布尔登/g]
  ];

  function stageFromLocation(loc) {
    if (!loc) return null;
    let best = null, at = -1;
    for (const [id, re] of RULES) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(loc))) {
        if (m.index >= at && Y.cities[id]) { best = id; at = m.index; }
      }
    }
    return best;
  }

  function contactIn(celeb, node, cityId) {
    return (celeb.contacts || []).find(k => k.city === cityId && node.year >= k.from && node.year <= k.to) || null;
  }

  // 只跳过“下一章”里条件已经不可能满足的节点，不提前判后面的章节。
  function current(celeb, state, api) {
    for (const n of celeb.nodes) {
      const rec = state.nodes[n.id];
      if (rec) continue;
      if (n.when && !n.when(state, api)) {
        state.nodes[n.id] = { status: 'skipped', year: api.year() };
        if (state.log && !state.log.some(l => l.text && l.text.indexOf('【' + n.title + '】这条时间线') === 0)) {
          state.log.push({ y: api.year(), m: (state.month % 12) + 1, text: '【' + n.title + '】这条时间线上没有发生' });
        }
        continue;
      }
      return n;
    }
    return null;
  }

  function list(celeb, state) {
    return celeb.nodes.filter(n => {
      const r = state.nodes[n.id];
      return !r || r.status !== 'pre';
    });
  }

  function describe(celeb, state, api) {
    const node = current(celeb, state, api);
    const all = list(celeb, state);
    const total = all.length;
    const resolved = all.filter(n => {
      const r = state.nodes[n.id];
      return r && (r.status === 'done' || r.status === 'skipped');
    }).length;
    if (!node) {
      return {
        node: null, phase: 'done', index: total, total, title: '尾声', contact: null, cityId: state.city, loc: '',
        text: '章节都走完了。回家可以结算这一生，菜单里也能打开和历史的总对照。',
        side: '支线仍可逛：投资、社交、买车、坐船。'
      };
    }
    const loc = (node.basis && node.basis.location) || '';
    const cityId = stageFromLocation(loc) || celeb.homeCity;
    const contact = contactIn(celeb, node, cityId);
    const cityName = Y.cities[cityId] ? Y.cities[cityId].name : '';
    const index = Math.min(total, resolved + 1);
    const where = loc ? '资料地点：' + loc + '。' : '';
    const base = {
      node, index, total, loc, cityId, cityName, contact, title: node.title,
      side: '支线（可选）：投资、和路人聊天、买车、坐船。不做也不耽误主线。'
    };
    if (state.city !== cityId) {
      return Object.assign(base, {
        phase: 'travel',
        text: '前往机场，飞往' + cityName + '。本章「' + node.title + '」。' + where
      });
    }
    if (contact && !state.contactsDone[contact.id]) {
      return Object.assign(base, {
        phase: 'meet',
        text: '找到 ' + contact.name + '（' + contact.role + '），当面进入「' + node.title + '」。' + where
      });
    }
    return Object.assign(base, {
      phase: 'spot',
      text: '前往金色标记，面对关键节点「' + node.title + '」。' + where
    });
  }

  Y.story = { current, describe, list, stageFromLocation, contactIn };
})(window.YXRS);
