// {rocket_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'rocketman',
  name: '{rocket_full}',
  short: '{rocket}',
  en: '{rocket_en}',
  birthYear: 1971,
  birth: "1971年6月月",
  endYear: 2026,
  homeCity: 'sv',
  mode: 'business',
  bio: "1971年生于南非比勒陀利亚，1989年独自移居加拿大，后转学到美国宾夕法尼亚大学读物理和经济。连续创业：{co_zip2}、{co_xcom}/{co_paypal}、{co_spacex}、{co_tesla}……",
  tags: ["火箭", "电动车", "连续创业"],
  look: { skin: '#f1c9a5', hair: '#5a3b24', shirt: '#1d1d22', pants: '#2f3b55', shoes: '#111111' },
  history: { netWorth: 100000000, text: "2026年6月{co_spacex}上市，据资料他借此一度成为首位“万亿美元富豪”，随后股价回落（资料置信度：中）。" },
  starts: [
    { id: 's1995', year: 1995, label: "1995 · 24岁 · 帕洛阿尔托", desc: "与弟弟{rocket_brother}和一位合伙人在租来的小办公室创办{co_zip2}，为报业提供网络城市指南（地图、路线、黄页），拿下多家大报合同。", cash: 3, fame: 1, charm: 30, energy: 95, rel: 25,
      companies: [], preDone: [] },
    { id: 's2002', year: 2002, label: "2002 · 30岁 · 套现之后", desc: "2001年为“火星绿洲”温室计划两次赴莫斯科想买洲际导弹改装火箭未果，于是用约1亿美元个人资金创办{co_spacex}，任CEO兼首席工程师。", cash: 2200, fame: 20, charm: 40, energy: 85, rel: 35, flags: { founder: true },
      companies: [
        { id: 'payco', name: '{co_paypal}', value: 100000, stake: 0.1172, growth: 0.3, vol: 0.4 }
      ], preDone: [] },
    { id: 's2008', year: 2008, label: "2008 · 37岁 · 至暗时刻", desc: "金融危机中，{co_spacex}前三次发射失败、几近破产。", cash: 500, fame: 45, charm: 45, energy: 60, rel: 30, flags: { founder: true },
      companies: [
        { id: 'rocketco', name: '{co_spacex}', value: 30000, stake: 0.7, growth: 0.1, vol: 0.8 },
        { id: 'evco', name: '{co_tesla}', value: 20000, stake: 0.3, growth: 0.1, vol: 0.9 },
        { id: 'solarco', name: '{co_solarcity}', value: 10000, stake: 0.25, growth: 0.15, vol: 0.5 }
      ], preDone: [] }
  ],
  contacts: [
    { id: 'k_brother', city: 'sv', from: 1995, to: 1998, name: '{rocket_brother}', role: '弟弟、创业伙伴', look: { skin: '#f1c9a5', hair: '#7a5a3a', shirt: '#2e7d32', pants: '#333', shoes: '#111' }, text: '“哥，今天我们去哪儿谈客户？”', choices: [{ text: '一起去拜访客户', effects: (s, api) => ({ rel: 8, mod: api.has('citymap') ? [{ id: 'citymap', mul: 1.1 }] : [] }), result: '兄弟俩跑了一整天。' }, { text: '让他先回去休息', effects: { energy: 5 } }] },
    { id: 'k_pay', city: 'sv', from: 1999, to: 2002, name: '{partner_thiel}', role: '{co_confinity} 联合创始人', look: { skin: '#f0c8a0', hair: '#c9a26b', shirt: '#2b4f7a', pants: '#333', shoes: '#111' }, text: '“我们两家在做同样的事，也许该聊聊。”', choices: [{ text: '坐下来聊聊', effects: { rel: 10 }, result: '你们交换了联系方式。' }, { text: '把他当对手，敬而远之', effects: { fame: 1 } }] }
  ],
  projects: [
    { id: 'starlink', name: '{pr_starlink}', from: 2015, cost: 20000, value: 60000, growth: 0.4, vol: 0.8, p: 0.7, desc: '卫星互联网', requires: (s, api) => api.has('rocketco'), reqText: '需要拥有{co_spacex}' },
    { id: 'brain', name: '{pr_neuralink}', from: 2016, cost: 10000, value: 12000, growth: 0.3, vol: 1.0, p: 0.55, desc: '脑机接口' },
    { id: 'tunnel', name: '{pr_boring}', from: 2017, cost: 1000, value: 1500, growth: 0.2, vol: 0.8, p: 0.6, desc: '隧道' }
  ],
  nodes: [
    { id: 'r1983', year: 1983, month: null, title: "卖掉第一款游戏",
      history: "10岁起通过一台家用电脑的说明书自学编程；12岁时（1983年）把自己写的BASIC小游戏卖给一家电脑杂志。",
      text: "1983年，你11-12岁，身在南非比勒陀利亚。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "11-12", location: "南非比勒陀利亚", sources: 1 },
      choices: [
        { text: "把爱好变现，卖掉游戏。", history: true, effects: { cash: 0.05, charm: 2 }, result: "史实数据：约500美元" },
        { text: "把游戏免费公开，换取名气", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "继续打磨游戏，做成系列作品", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把卖游戏的钱投入买更好的电脑", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r1989', year: 1989, month: 6, title: "离开南非",
      history: "为避开南非种族隔离政权的强制兵役、并方便日后去美国，通过母亲申请加拿大护照，1989年6月抵达加拿大，在农场和锯木厂打零工。",
      text: "1989年6月，你18岁，身在加拿大萨斯喀彻温→安大略。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "18", location: "加拿大萨斯喀彻温→安大略", sources: 1 },
      choices: [
        { text: "离开南非，独自移民加拿大。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在南非读比勒陀利亚大学", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "直接申请去美国读书", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "按要求服兵役后再出国", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r1992', year: 1992, month: null, title: "转学常春藤",
      history: "在女王大学读了两年后转学宾夕法尼亚大学，攻读物理和经济（沃顿）双学位；据报道曾举办收费家庭派对贴补学费。",
      text: "1992年，你20-21岁，身在美国费城。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "20-21", location: "美国费城", sources: 1 },
      choices: [
        { text: "从加拿大转学到美国常春藤名校。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在女王大学完成学业", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "退学直接创业", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "转去工程类院校专攻物理", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r1995', year: 1995, month: null, title: "第一次创业：{co_zip2}",
      history: "与弟弟{rocket_brother}和一位合伙人在租来的小办公室创办{co_zip2}，为报业提供网络城市指南（地图、路线、黄页），拿下多家大报合同；董事会阻止他出任CEO。",
      text: "1995年，你23-24岁，身在美国帕洛阿尔托。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "23-24", location: "美国帕洛阿尔托", sources: 1 },
      choices: [
        { text: "兄弟合伙做互联网城市黄页。", history: true, effects: { add: { id: 'citymap', name: '{co_zip2}', value: 300, stake: 0.07, growth: 0.8, vol: 0.4 }, fame: 2, flags: { founder: true } }, result: "与史实记录一致。" },
        { text: "自己单干做电子书扫描（他在宾大写过类似的商业计划）", alt: true, effects: { add: { id: 'ebook', name: '电子书扫描公司', value: 50, stake: 0.8, growth: 0.3, vol: 1.0 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受与{co_citysearch}合并", alt: true, effects: { add: { id: 'citymap', name: '{co_zip2}', value: 300, stake: 0.05, growth: 0.6, vol: 0.4 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "争取让自己当上CEO否则离开", alt: true, chance: { p: 0.4, ok: { effects: { add: { id: 'citymap', name: '{co_zip2}', value: 300, stake: 0.15, growth: 0.8, vol: 0.5 }, fame: 3 }, result: '董事会让步了，你当上了CEO。' }, fail: { effects: { energy: -10 }, result: '谈崩了，你离开了这家公司。' } } }
      ] },
    { id: 'r1999', year: 1999, month: 2, title: "{co_compaq}的收购",
      when: (s, api) => ['citymap'].some(id => api.has(id)),
      history: "{co_compaq}以3.07亿美元现金收购{co_zip2}，{rocket}凭7%股份获得2200万美元。",
      text: "1999年2月，你27岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "27", location: "美国加州", sources: 1 },
      choices: [
        { text: "接受收购，套现离场。", history: true, effects: { sell: [{ id: 'citymap', cash: 2200 }], fame: 8 }, result: "史实数据：收购价3.07亿美元；个人获2200万美元" },
        { text: "拒绝收购，继续做大{co_zip2}", alt: true, effects: { mod: [{ id: 'citymap', growth: 0.15, vol: 1.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "拿到钱后退休享受生活", alt: true, effects: { sell: [{ id: 'citymap', cash: 2200 }], energy: 40, flags: { retired: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把钱全部投入股票市场", alt: true, effects: (s, api) => { api.addHolding('index', 2200); return { sell: [{ id: 'citymap', cash: 0 }] }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r1999a', year: 1999, month: null, title: "网上银行：{co_xcom}",
      when: (s, api) => (s => !s.flags.retired)(s, api),
      history: "联合创办网上金融/电子邮件支付公司{co_xcom}，早期吸引20多万用户；年底被投资人以经验不足为由换下CEO。2000年3月与{partner_thiel}等人的{co_confinity}合并。",
      text: "1999年，你27-28岁，身在美国帕洛阿尔托。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "27-28", location: "美国帕洛阿尔托", sources: 1 },
      choices: [
        { text: "把{co_zip2}所得投入网上银行创业，并选择与竞争对手合并。", history: true, effects: (s, api) => { api.pay(1000); return { add: { id: 'payco', name: '{co_paypal}', value: 8000, stake: 0.12, growth: 0.8, vol: 0.6 } }; }, result: "与史实记录一致。" },
        { text: "不合并，与{co_confinity}正面竞争", alt: true, effects: (s, api) => { api.pay(1000); return { add: { id: 'payco', name: '{co_xcom}', value: 3000, stake: 0.4, growth: 0.3, vol: 1.2 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做传统网上银行", alt: true, effects: (s, api) => { api.pay(800); return { add: { id: 'netbank', name: '传统网上银行', value: 1500, stake: 0.5, growth: 0.1, vol: 0.4 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把钱投给别人的创业公司当天使", alt: true, effects: (s, api) => { api.pay(800); api.addHolding('angel', 800, '天使投资组合', 0.18, 0.8); return { rel: 5 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2000', year: 2000, month: null, title: "被撤换之后",
      when: (s, api) => ['payco'].some(id => api.has(id)),
      history: "合并后的公司里，他重新担任CEO，但因技术路线等分歧，董事会在2000年将他撤换，由{partner_thiel}接任。同年他在南非度假时染上严重疟疾。",
      text: "2000年，你28-29岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "28-29", location: "美国加州", sources: 1 },
      choices: [
        { text: "被撤换后没有离开，保留股份。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "与董事会对抗，争夺控制权", alt: true, chance: { p: 0.35, ok: { effects: { mod: [{ id: 'payco', stake: 0.2 }], fame: 3 }, result: '你赢下了控制权。' }, fail: { effects: { rel: -15, mod: [{ id: 'payco', mul: 0.8 }] }, result: '内斗伤了元气。' } } },
        { text: "卖掉全部股份离开", alt: true, effects: { sell: [{ id: 'payco' }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受技术路线改为Unix以保住职位", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2002', year: 2002, month: 5, title: "去火星：{co_spacex}",
      when: (s, api) => (s => !s.flags.retired)(s, api),
      history: "2001年为“火星绿洲”温室计划两次赴莫斯科想买洲际导弹改装火箭未果，于是用约1亿美元个人资金创办{co_spacex}，任CEO兼首席工程师。",
      text: "2002年5月，你30岁，身在美国加州（洛杉矶地区）。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "30", location: "美国加州（洛杉矶地区）", sources: 1 },
      choices: [
        { text: "自己造便宜的火箭。", history: true, effects: (s, api) => { api.pay(10000); return { add: { id: 'rocketco', name: '{co_spacex}', value: 10000, stake: 0.8, growth: 0.25, vol: 0.8 } }; }, result: "史实数据：约1亿美元个人资金" },
        { text: "从俄罗斯买二手导弹做发射", alt: true, chance: { p: 0.3, ok: { effects: { fame: 12 }, result: '交易谈成了，你的温室真的发射了。' }, fail: { effects: { cash: -200 }, result: '报价离谱，交易告吹。' } } },
        { text: "只资助火星协会的科研，不自己造火箭", alt: true, effects: { cash: -100, fame: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把钱投入互联网公司而非航天", alt: true, effects: (s, api) => { const a = Math.max(0, s.cash) * 0.5; api.addHolding('index', a); return { cash: -a }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2002a', year: 2002, month: null, title: "{co_ebay}的收购",
      when: (s, api) => ['payco'].some(id => api.has(id)),
      history: "{co_ebay}以15亿美元股票收购{co_paypal}，{rocket}作为最大股东（11.72%）获得约1.758亿美元。同年入籍美国。",
      text: "2002年，你30-31岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "30-31", location: "美国加州", sources: 1 },
      choices: [
        { text: "接受收购。", history: true, effects: { sell: [{ id: 'payco', cash: 17580 }], fame: 10 }, result: "史实数据：收购价15亿美元；个人约1.758亿美元" },
        { text: "拒绝{co_ebay}，推动{co_paypal}独立上市做大", alt: true, effects: { mod: [{ id: 'payco', value: 150000, growth: 0.15 }], fame: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "收购后留在{co_ebay}任高管", alt: true, effects: { sell: [{ id: 'payco', cash: 17580 }], flags: { exec: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "拿钱彻底退休", alt: true, effects: { sell: [{ id: 'payco', cash: 17580 }], energy: 40, flags: { retired: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2004', year: 2004, month: 2, title: "入局电动车",
      when: (s, api) => (s => !s.flags.retired)(s, api),
      history: "领投{co_tesla}（2003年7月由两位工程师创立）A轮，投资635万美元，成为最大股东并出任董事长，主管{pr_roadster}产品设计，但不参与日常运营。",
      text: "2004年2月，你32岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "32", location: "美国加州", sources: 1 },
      choices: [
        { text: "以投资人+董事长身份入局电动车。", history: true, effects: (s, api) => { api.pay(635); return { add: { id: 'evco', name: '{co_tesla}', value: 1000, stake: 0.6, growth: 0.3, vol: 0.9 } }; }, result: "史实数据：635万美元" },
        { text: "只做财务投资，不进董事会", alt: true, effects: (s, api) => { api.pay(635); return { add: { id: 'evco', name: '{co_tesla}', value: 1000, stake: 0.5, growth: 0.25, vol: 0.9 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "自己从零创办电动车公司", alt: true, effects: (s, api) => { api.pay(2000); return { add: { id: 'evco', name: '{rocket}电动车', value: 2000, stake: 0.95, growth: 0.2, vol: 1.1 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不投电动车，专心{co_spacex}", alt: true, effects: { energy: 10 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2006', year: 2006, month: null, title: "太阳能与首射失败",
      history: "为表亲创办的{co_solarcity}提供最初构想和资金。同年{co_spacex}{pr_falcon1}首次发射失败，但获得{co_nasa}商业轨道运输服务（COTS）合同。",
      text: "2006年，你34-35岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "34-35", location: "美国加州", sources: 1 },
      choices: [
        { text: "支持表亲做太阳能，同时坚持火箭研发。", history: true, effects: (s, api) => { api.pay(1000); return { add: { id: 'solarco', name: '{co_solarcity}', value: 2000, stake: 0.3, growth: 0.15, vol: 0.5 }, rel: 5 }; }, result: "与史实记录一致。" },
        { text: "不碰太阳能，专注两家公司", alt: true, effects: { energy: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "第一次失败后关闭{co_spacex}", alt: true, effects: { close: ['rocketco'] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把{co_solarcity}并入{co_tesla}做内部部门", alt: true, effects: { mod: [{ id: 'evco', mul: 1.05 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2008', year: 2008, month: null, title: "至暗时刻",
      when: (s, api) => ((s, api) => api.has('rocketco') || api.has('evco'))(s, api),
      history: "金融危机中，{co_spacex}前三次发射失败、几近破产；2008年第四次发射成功入轨，随后获得{co_nasa}16亿美元国际空间站补给合同。同年他出任{co_tesla}CEO兼产品架构师；{pr_roadster}开始交付。",
      text: "2008年，你36-37岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "36-37", location: "美国加州", sources: 1 },
      choices: [
        { text: "两家公司都不放弃，亲自出任{co_tesla}CEO。", history: true, effects: { mod: [{ id: 'rocketco', mul: 4, growth: 0.3, vol: 0.5 }, { id: 'evco', mul: 2, growth: 0.3 }], fame: 15, energy: -20 }, result: "史实数据：{co_nasa}合同16亿美元" },
        { text: "保{co_spacex}、放弃{co_tesla}", alt: true, effects: { close: ['evco'], mod: [{ id: 'rocketco', mul: 3 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "保{co_tesla}、关闭{co_spacex}", alt: true, effects: { close: ['rocketco'], mod: [{ id: 'evco', mul: 2.5 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "两家都卖给大公司", alt: true, effects: { sell: [{ id: 'rocketco', mul: 0.5 }, { id: 'evco', mul: 0.5 }], energy: 40, flags: { retired: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2010', year: 2010, month: null, title: "{co_tesla}上市",
      when: (s, api) => ['evco'].some(id => api.has(id)),
      history: "{co_tesla}首次公开募股（IPO）。",
      text: "2010年，你38-39岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "38-39", location: "美国加州", sources: 1 },
      choices: [
        { text: "带{co_tesla}上市融资。", history: true, effects: { mod: [{ id: 'evco', value: 170000, stake: 0.25, growth: 0.3 }], fame: 10 }, result: "与史实记录一致。" },
        { text: "保持私有，寻找车企收购方", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与传统车企合资", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "延后上市，先推出平价车", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2012', year: 2012, month: null, title: "飞船对接空间站",
      when: (s, api) => ['rocketco'].some(id => api.has(id)),
      history: "{co_spacex}{pr_dragon}对接国际空间站，成为首个对接空间站的商业飞船；{co_tesla}{pr_models}开始生产。",
      text: "2012年，你40-41岁，身在美国加州/国际空间站。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "40-41", location: "美国加州/国际空间站", sources: 1 },
      choices: [
        { text: "把商业航天推向载货运输。", history: true, effects: { mod: [{ id: 'rocketco', value: 480000, stake: 0.5, growth: 0.3 }], fame: 10 }, result: "与史实记录一致。" },
        { text: "只做卫星发射不做飞船", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把{pr_dragon}卖给{co_nasa}运营", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专注军用发射合同", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2015', year: 2015, month: 12, title: "AI 与回收火箭",
      history: "12月联合创办非营利AI研究机构{co_openai}（承诺10亿美元，实际捐赠约5000万美元）；同年{co_spacex}首次实现{pr_falcon9}一级陆地回收，并启动{pr_starlink}卫星互联网项目。",
      text: "2015年12月，你44岁，身在美国旧金山/佛罗里达。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 12, age: "44", location: "美国旧金山/佛罗里达", sources: 1 },
      choices: [
        { text: "同时押注AI安全和可回收火箭。", history: true, effects: (s, api) => { api.pay(5000); return { flags: { aiLab: true }, mod: [{ id: 'rocketco', growthAdd: 0.05 }], fame: 5 }; }, result: "史实数据：承诺10亿美元，实际约5000万美元" },
        { text: "不参与AI，专注航天与汽车", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把{co_openai}办成营利公司并亲自掌控", alt: true, effects: (s, api) => { api.pay(5000); return { add: { id: 'ailab', name: '{rocket}AI实验室', value: 8000, stake: 0.8, growth: 0.3, vol: 1.2 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "全额兑现10亿美元承诺", alt: true, effects: (s, api) => { api.pay(100000); return { fame: 8 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2016', year: 2016, month: null, title: "整合能源，脑机与隧道",
      when: (s, api) => ['evco'].some(id => api.has(id)),
      history: "{co_tesla}以约20亿美元收购{co_solarcity}并组建{pr_teslaenergy}（引发股东诉讼，2022年法院判他胜诉）；同年以1亿美元联合创办脑机接口公司{pr_neuralink}。2017年创办{pr_boring}。",
      text: "2016年，你44-45岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "44-45", location: "美国加州", sources: 1 },
      choices: [
        { text: "整合能源业务，拓展脑机接口与隧道。", history: true, effects: (s, api) => { api.pay(10000); return { sell: [{ id: 'solarco', cash: 0 }], mod: [{ id: 'evco', mul: 1.05 }], add: { id: 'p_brain', name: '{pr_neuralink}', value: 10000, stake: 0.5, growth: 0.3, vol: 1.0 } }; }, result: "史实数据：{co_solarcity}约20亿美元；{pr_neuralink} 1亿美元" },
        { text: "不收购{co_solarcity}，让其独立", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不做{pr_neuralink}，只做投资", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把{pr_boring}交给他人经营", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2018', year: 2018, month: null, title: "离开{co_openai}董事会",
      history: "{co_spacex}{pr_falconheavy}火箭首飞，把他的{pr_roadster}送入太空；同年他离开{co_openai}董事会；因一条关于{co_tesla}私有化的推文与美国证监会（SEC）和解，2020年5月辞去{co_tesla}董事长。",
      text: "2018年，你46-47岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "46-47", location: "美国", sources: 1 },
      choices: [
        { text: "离开{co_openai}，继续亲自掌舵{co_tesla}与{co_spacex}。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在{co_openai}董事会", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "真的推进{co_tesla}私有化", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "辞去{co_tesla}CEO只当董事长", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2020', year: 2020, month: null, title: "迁往得州",
      when: (s, api) => ((s, api) => api.has('rocketco') || api.has('evco'))(s, api),
      history: "{co_spacex}成为首个把宇航员送入轨道的私营公司；{co_tesla}成为市值最高车企并纳入标普500；年底他从加州迁居得州。",
      text: "2020年，你48-49岁，身在美国→得克萨斯。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "48-49", location: "美国→得克萨斯", sources: 1 },
      choices: [
        { text: "离开加州，迁往得州。", history: true, effects: (s, api) => ({ mod: [{ id: 'rocketco', value: Math.max((api.get('rocketco') || {}).value || 0, 4600000), stake: Math.min((api.get('rocketco') || { stake: 0.42 }).stake, 0.42) }, { id: 'evco', value: Math.max((api.get('evco') || {}).value || 0, 60000000), stake: Math.min((api.get('evco') || { stake: 0.2 }).stake, 0.2) }], fame: 15 }), result: "与史实记录一致。" },
        { text: "留在加州", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "迁往其他低税州", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "出售部分{co_tesla}股票降风险", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2022', year: 2022, month: 10, title: "收购{co_twitter}",
      when: (s, api) => ((s, api) => api.netWorth() >= 4400000)(s, api),
      history: "4月起以约440亿美元收购{co_twitter}（约125亿美元贷款+210亿美元股权融资），中途一度反悔，最终于2022年10月27日完成收购并自任CEO，大幅裁员；2023年改名{co_xcorp_short}。",
      text: "2022年10月，你51岁，身在美国旧金山。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 10, age: "51", location: "美国旧金山", sources: 1 },
      choices: [
        { text: "不惜重金收购社交平台。", history: true, effects: { mod: [{ id: 'evco', stakeMul: 0.85 }], add: { id: 'socialx', name: '{co_xcorp}', value: 4400000, stake: 0.75, growth: -0.05, vol: 0.4 }, fame: 15, rel: -8 }, result: "史实数据：约440亿美元" },
        { text: "只当最大股东并进董事会", alt: true, effects: (s, api) => { api.pay(300000); api.addHolding('socialx_stake', 300000, '{co_twitter}股份'); return { fame: 3 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "放弃收购支付违约金", alt: true, effects: (s, api) => { api.pay(100000); return { fame: -3 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "收购后找专业CEO经营", alt: true, effects: { mod: [{ id: 'evco', stakeMul: 0.85 }], add: { id: 'socialx', name: '{co_twitter}', value: 4400000, stake: 0.75, growth: 0.05, vol: 0.4 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2023', year: 2023, month: 7, title: "创立{co_xai}",
      history: "7月创立AI公司{co_xai}，开发生成式AI。",
      text: "2023年7月，你52岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "52", location: "美国", sources: 1 },
      choices: [
        { text: "自己做AI公司与{co_openai}竞争。", history: true, effects: { add: { id: 'aico', name: '{co_xai}', value: 2400000, stake: 0.5, growth: 0.5, vol: 1.0 } }, result: "与史实记录一致。" },
        { text: "重新投资{co_openai}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把AI团队并入{co_tesla}", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只投资不创业", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2024', year: 2024, month: null, title: "介入大选",
      history: "7月宣布支持{tr}，参加其竞选集会，成为2024年大选最大个人捐款人（约2.91亿美元）。",
      text: "2024年，你52-53岁，身在美国（宾夕法尼亚等摇摆州）。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "52-53", location: "美国（宾夕法尼亚等摇摆州）", sources: 1 },
      choices: [
        { text: "公开深度介入总统选举。", history: true, effects: (s, api) => { api.pay(29100); return { fame: 5, rel: -5 }; }, result: "史实数据：约2.91亿美元" },
        { text: "保持政治中立", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "两党都捐款", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只支持具体政策议题而不站队候选人", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2025', year: 2025, month: 1, title: "进入政府",
      history: "{tr}就职后担任顾问，主导“政府效率部”（DOGE），推动联邦裁员和削减开支；5月28日以特殊政府雇员130天期满离任。",
      text: "2025年1月，你53岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "53", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "进入政府，到期离开。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "不进入政府，只做外部顾问", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在政府待满整个任期", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "离任后保持低调", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2025a', year: 2025, month: 11, title: "超高目标薪酬",
      when: (s, api) => ['evco'].some(id => api.has(id)),
      history: "{co_tesla}股东批准一份为期10年、价值最高约1万亿美元的薪酬方案，需达成市值8.5万亿美元等里程碑。",
      text: "2025年11月，你54岁，身在美国得州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "54", location: "美国得州", sources: 1 },
      choices: [
        { text: "接受与超高目标挂钩的薪酬。", history: true, effects: { mod: [{ id: 'evco', growth: 0.25 }], fame: 5 }, result: "史实数据：最高约1万亿美元（10年）" },
        { text: "拒绝天价薪酬方案", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "降低目标换取更稳妥的回报", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "卸任{co_tesla}CEO专注{co_spacex}", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'r2026', year: 2026, month: 2, title: "合并上市",
      when: (s, api) => ['rocketco'].some(id => api.has(id)),
      history: "2月{co_spacex}收购{co_xai}（{co_xai}此前已于2025年3月合并{co_xcorp_short}），合并后估值约1.25万亿美元；6月11日{co_spacex}以每股135美元IPO，募资750亿美元，创美国最大IPO纪录，估值约1.77万亿美元。据资料他借此一度成为首位“万亿美元富豪”，随后股价回落。",
      text: "2026年2月，你54岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: 2, age: "54", location: "美国", sources: 4 },
      choices: [
        { text: "把航天、AI、社交平台整合后上市。", history: true, effects: (s, api) => { ['aico', 'socialx'].forEach(id => { const c = api.get(id); if (c) c.status = 'merged'; }); return { mod: [{ id: 'rocketco', value: 177000000, stake: 0.42 }], fame: 15 }; }, result: "史实数据：合并估值约1.25万亿美元；IPO募资750亿美元，估值约1.77万亿美元" },
        { text: "保持{co_spacex}私有", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "让{co_xai}独立上市", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把{co_xai}并入{co_tesla}而非{co_spacex}", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
