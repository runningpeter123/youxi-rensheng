// 游戏人生 · 全局注册表（数据驱动：每位名人一个数据文件，调用 YXRS.registerCeleb 注册）
window.YXRS = window.YXRS || {};
(function (Y) {
  Y.celebs = Y.celebs || {};
  Y.celebOrder = Y.celebOrder || [];
  Y.cities = Y.cities || {};
  Y.cityOrder = Y.cityOrder || [];
  Y.investments = Y.investments || [];
  Y.events = Y.events || [];
  Y.genericProjects = Y.genericProjects || [];
  // 即将上线的名人（只用于选人界面占位）。写好数据文件后从这里移除即可。
  Y.comingSoon = [];

  Y.registerCeleb = function (c) {
    if (!c || !c.id) throw new Error('celeb needs id');
    if (!Y.celebs[c.id]) Y.celebOrder.push(c.id);
    Y.celebs[c.id] = c;
    Y.comingSoon = Y.comingSoon.filter(n => n !== c.name && n !== c.short);
  };
  Y.registerCity = function (c) {
    if (!Y.cities[c.id]) Y.cityOrder.push(c.id);
    Y.cities[c.id] = c;
  };

  // 可复现随机数
  Y.rng = function (seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
      return (s % 100000) / 100000;
    };
  };
  Y.hash = function (str) { let h = 2166136261; for (const ch of String(str)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };

  // 金额单位：万美元
  Y.fmtMoney = function (w) {
    const neg = w < 0; w = Math.abs(w);
    let s;
    if (w >= 1e8) s = (w / 1e8).toFixed(2) + '万亿';
    else if (w >= 1e4) s = (w / 1e4).toFixed(w >= 1e6 ? 0 : 2) + '亿';
    else if (w >= 1) s = w.toFixed(w < 10 ? 1 : 0) + '万';
    else s = Math.round(w * 10000) + '';
    return (neg ? '-' : '') + '$' + s;
  };
})(window.YXRS);
