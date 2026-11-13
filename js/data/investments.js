// 投资大厅里的机会（游戏化简化数值，非投资建议）。金额单位：万美元。
(function (Y) {
  Y.investments = [
    { id: 'index', name: '标普500指数基金', from: 1980, to: 2100, growth: 0.08, vol: 0.4, desc: '稳健，长期年化约8%（游戏简化）' },
    { id: 'realestate', name: '湾区房产', from: 1980, to: 2100, growth: 0.06, vol: 0.3, desc: '慢，但很少归零' },
    { id: 'shop_stock', name: '{co_amazon}股票', from: 1997, to: 2003, growth: 0.35, vol: 1.2, desc: '1997年刚上市的网上书店' },
    { id: 'search_stock', name: '{co_google}早期股份', from: 1998, to: 2004, growth: 0.5, vol: 0.8, desc: '两个斯坦福博士生做的搜索引擎' },
    { id: 'fruit_stock', name: '{co_apple}股票', from: 2001, to: 2009, growth: 0.35, vol: 0.7, desc: '他们的音乐播放器刚刚发布' },
    { id: 'social_stock', name: '{co_facebook} 早期股份', from: 2004, to: 2010, growth: 0.5, vol: 0.9, desc: '哈佛宿舍里诞生的社交网站' },
    { id: 'btc', name: '比特币', from: 2010, to: 2016, growth: 1.0, vol: 3.0, desc: '极高风险，可能暴涨也可能腰斩' },
    { id: 'gpu_stock', name: '{co_nvidia}股票', from: 1999, to: 2100, growth: 0.25, vol: 0.9, excludeCeleb: 'gpuboss', desc: '做显卡的公司' },
    { id: 'ev_stock', name: '{co_tesla}股票', from: 2010, to: 2100, growth: 0.25, vol: 1.0, excludeCeleb: 'rocketman', desc: '电动车新贵' }
  ];

  // 所有名人都能做的通用新项目
  Y.genericProjects = [
    { id: 'coffee', name: '连锁咖啡品牌', from: 1980, cost: 50, value: 60, growth: 0.12, vol: 0.5, p: 0.6, desc: '小而稳' },
    { id: 'gamestudio', name: '像素游戏工作室', from: 1990, cost: 80, value: 100, growth: 0.2, vol: 1.0, p: 0.45, desc: '做一款叫《游戏人生》的游戏？' },
    { id: 'aistartup', name: 'AI 应用初创', from: 2015, cost: 500, value: 800, growth: 0.45, vol: 1.2, p: 0.4, desc: '风口上的猪' }
  ];
})(window.YXRS);
