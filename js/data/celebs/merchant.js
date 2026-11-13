// {ma_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'merchant',
  name: '{ma_full}',
  short: '{ma}',
  en: '{ma_en}',
  birthYear: 1964,
  birth: "1964年9月月",
  endYear: 2026,
  homeCity: 'hz',
  mode: 'business',
  bio: "1964年生于浙江杭州。少年时在杭州给外国游客当导游练英语，做过英语老师，创办翻译社和{co_chinapages}，1999年在自家公寓创办{co_alibaba}。",
  tags: ["电商", "支付", "教育"],
  look: { skin: '#f0d0a8', hair: '#2a2a2a', shirt: '#c0392b', pants: '#2c3e50', shoes: '#111111' },
  history: { netWorth: null, text: "公开资料记载：他于2019年卸任{co_alibaba}董事局主席，转向教育公益；2023年起不再是{co_ant}实际控制人；2025年2月重新公开亮相。" },
  starts: [
    { id: 's1994', year: 1994, label: "1994 · 30岁 · 翻译社", desc: "集资3000元创办{co_haibo}，首月收入700元、房租1500元，靠去广州、义乌进小商品倒卖养活翻译社，还组织了杭州第一个英语角。", cash: 0.05, fame: 1, charm: 40, energy: 95, rel: 30,
      companies: [], preDone: [] },
    { id: 's1999', year: 1999, label: "1999 · 35岁 · 回杭州", desc: "辞职带团队回杭州，在自家公寓与18位朋友用50万元创办{co_alibaba}B2B平台，服务中小企业外贸。", cash: 10, fame: 8, charm: 50, energy: 90, rel: 45,
      companies: [], preDone: [] },
    { id: 's2013', year: 2013, label: "2013 · 48岁 · 卸任CEO", desc: "5月10日在{co_taobao}十周年晚会上卸任集团CEO，由继任者接任，他保留董事局主席。", cash: 30000, fame: 70, charm: 60, energy: 80, rel: 60,
      companies: [
        { id: 'alico', name: '{co_alibaba}', value: 8000000, stake: 0.08, growth: 0.25, vol: 0.4 }
      ], preDone: [] }
  ],
  contacts: [
    { id: 'k_son', city: 'tk', from: 1999, to: 2000, name: '{sn}', role: '投资人', look: { skin: '#f2d0ae', hair: '#2a2a2a', shirt: '#37474f', pants: '#333', shoes: '#111' }, text: '“说说你的公司，给你六分钟。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 'a1980', year: 1980, month: null, title: "给游客当导游",
      history: "骑车去给游客当导游练英语时，结识一个澳大利亚家庭，与这家的儿子成为笔友；后来这家人邀请他到澳大利亚纽卡斯尔住了29天，他说“没有那29天，我不会有今天的思维方式”。",
      text: "1980年，你15-16岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "15-16", location: "浙江杭州", sources: 1 },
      choices: [
        { text: "主动结交外国人，接受邀请出国看世界。", history: true, effects: { charm: 5, rel: 5 }, result: "与史实记录一致。" },
        { text: "专心备考不再做导游", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做导游赚钱不读书", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去国营工厂工作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1984', year: 1984, month: null, title: "第三次高考",
      history: "第三次高考数学89分，总分仍略低于本科线，但因杭州师范学院外语系招生未满被录取；在校成绩名列系里前五，当选学生会主席、杭州市学联主席。",
      text: "1984年，你19-20岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "19-20", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "进入师范外语专业。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "再复读一年冲击更好大学", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去读技校", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "直接工作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1988', year: 1988, month: 8, title: "当上老师",
      history: "毕业后分配到杭州电子工业学院教英语和国际贸易。据他本人在演讲中说，此前求职屡屡被拒、申请哈佛商学院也多次被拒（均为本人说法，未经第三方证实）。",
      text: "1988年8月，你23岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "待核实", month: 8, age: "23", location: "浙江杭州", sources: 2, vague: true },
      choices: [
        { text: "接受分配当大学老师。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "下海经商", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "继续申请出国留学", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去外贸公司做翻译", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1994', year: 1994, month: null, title: "{co_haibo}",
      history: "集资3000元创办{co_haibo}，首月收入700元、房租1500元，靠去广州、义乌进小商品倒卖养活翻译社，还组织了杭州第一个英语角。",
      text: "1994年，你29-30岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "29-30", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "边教书边创业。", history: true, effects: { add: { id: 'transco', name: '{co_haibo}', value: 0.1, stake: 1, growth: 0.2, vol: 0.3 }, flags: { founder: true } }, result: "史实数据：启动资金3000元人民币" },
        { text: "放弃翻译社专心教书", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转型做外贸进出口", alt: true, effects: { add: { id: 'transco', name: '外贸小公司', value: 0.2, stake: 1, growth: 0.15, vol: 0.5 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把翻译社卖掉", alt: true, effects: { cash: 0.1 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1995', year: 1995, month: 4, title: "{co_chinapages}",
      history: "1995年初代表杭州市政府赴美，首次接触互联网，发现搜不到中国信息；回国后与妻子和同事于4月创办“{co_chinapages}”，5月10日注册网站域名，三年赚约500万元；6月1日辞去大学教职。",
      text: "1995年4月，你30岁，身在美国（出访）→浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 4, age: "30", location: "美国（出访）→浙江杭州", sources: 2 },
      choices: [
        { text: "辞掉铁饭碗，全职做互联网。", history: true, effects: { add: { id: 'pagesco', name: '{co_chinapages}', value: 30, stake: 0.6, growth: 0.5, vol: 0.6 }, fame: 3 }, result: "史实数据：三年利润约500万元人民币" },
        { text: "保留教职兼职创业", alt: true, effects: { add: { id: 'pagesco', name: '{co_chinapages}', value: 20, stake: 0.6, growth: 0.3, vol: 0.6 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做翻译社", alt: true, effects: { cash: 0.5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "留在美国发展", alt: true, effects: { charm: 3, cash: 1 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1996', year: 1996, month: null, title: "被收购之后",
      when: (s, api) => ['pagesco'].some(id => api.has(id)),
      history: "{co_chinapages}被{co_telecom}旗下公司收购，合作不顺，1997年离开。",
      text: "1996年，你31-32岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "31-32", location: "浙江杭州", sources: 1 },
      choices: [
        { text: "离开国企合作方。", history: true, effects: { sell: [{ id: 'pagesco' }] }, result: "与史实记录一致。" },
        { text: "留在合资公司当高管", alt: true, effects: { mod: [{ id: 'pagesco', stake: 0.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与电信打官司争夺控制权", alt: true, chance: { p: 0.3, ok: { effects: { mod: [{ id: 'pagesco', stake: 0.6 }] }, result: '你保住了控制权。' }, fail: { effects: { sell: [{ id: 'pagesco', mul: 0.5 }] }, result: '官司输了。' } } },
        { text: "把股份卖掉换现金", alt: true, effects: { sell: [{ id: 'pagesco' }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1997', year: 1997, month: null, title: "进京",
      history: "1997-1999年为外经贸部开发官方网站和“中国产品网上交易市场”，领导中国国际电子商务中心下属信息技术公司。",
      text: "1997年，你32-33岁，身在北京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "32-33", location: "北京", sources: 2 },
      choices: [
        { text: "进京为政府部门做电商网站。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "回杭州继续自主创业", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加入外资互联网公司", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去门户网站公司", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a1999', year: 1999, month: null, title: "公寓里的创业",
      history: "辞职带团队回杭州，在自家公寓与18位朋友用50万元创办{co_alibaba}B2B平台，服务中小企业外贸。",
      text: "1999年，你34-35岁，身在浙江杭州（自家公寓）。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "34-35", location: "浙江杭州（自家公寓）", sources: 1 },
      choices: [
        { text: "回杭州从零创办B2B电商。", history: true, effects: { add: { id: 'alico', name: '{co_alibaba}', value: 10, stake: 0.2, growth: 1.2, vol: 0.6 }, fame: 3, flags: { founder: true } }, result: "史实数据：启动资金50万元人民币" },
        { text: "留在北京做政府项目", alt: true, effects: { cash: 5, flags: { gov: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "做面向消费者的C2C", alt: true, effects: { add: { id: 'alico', name: '{ma}网上商城', value: 10, stake: 0.3, growth: 0.8, vol: 0.9 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把团队带去上海或北京创业", alt: true, effects: { add: { id: 'alico', name: '{co_alibaba}', value: 10, stake: 0.2, growth: 1.0, vol: 0.6 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2000', year: 2000, month: 1, title: "引入风投",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "1999年10月和2000年1月先后获得{co_goldman}、{co_softbank}共2500万美元风险投资（其中{co_softbank}投资2000万美元）。",
      text: "2000年1月，你35岁，身在浙江杭州/东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "35", location: "浙江杭州/东京", sources: 2 },
      choices: [
        { text: "接受外资投资扩张。", history: true, effects: { mod: [{ id: 'alico', value: 10000, stakeMul: 0.7 }], cash: 2 }, result: "史实数据：合计2500万美元" },
        { text: "拒绝外资保持控股", alt: true, effects: { mod: [{ id: 'alico', growth: 0.5 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只接受{co_goldman}不接受{co_softbank}", alt: true, effects: { mod: [{ id: 'alico', value: 4000, stakeMul: 0.85 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受国内资本投资", alt: true, effects: { mod: [{ id: 'alico', value: 6000, stakeMul: 0.75 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2003', year: 2003, month: 5, title: "{co_taobao}",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "秘密成立{co_taobao}，在{co_taobao}迅速崛起后拒绝了{co_ebay}的收购意向（见下一节点）；2004年12月推出第三方支付平台{co_alipay}。",
      text: "2003年5月，你38岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "38", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "以免费模式对抗{co_ebay}。", history: true, effects: { mod: [{ id: 'alico', mul: 2, growth: 0.7 }], fame: 6 }, result: "与史实记录一致。" },
        { text: "接受{co_ebay}收购", alt: true, effects: { sell: [{ id: 'alico' }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不做C2C，专注B2B", alt: true, effects: { mod: [{ id: 'alico', growth: 0.3 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与{co_ebay}合作做中国区", alt: true, effects: { mod: [{ id: 'alico', growth: 0.45 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2005', year: 2005, month: 8, title: "{co_yahoo}入股",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "{co_yahoo}以10亿美元现金加{co_yahoo}中国业务，换取{co_alibaba}40%股份，成为最大股东。",
      text: "2005年8月，你40岁，身在北京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 8, age: "40", location: "北京", sources: 2 },
      choices: [
        { text: "引入{co_yahoo}为最大股东，拒绝被{co_ebay}收购。", history: true, effects: { mod: [{ id: 'alico', value: 400000, stakeMul: 0.6, growth: 0.3 }], fame: 5 }, result: "史实数据：10亿美元换40%股份" },
        { text: "接受{co_ebay}收购", alt: true, effects: { sell: [{ id: 'alico' }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不融资独立发展", alt: true, effects: { mod: [{ id: 'alico', growth: 0.35 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "找国内资本合作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2007', year: 2007, month: 11, title: "香港上市",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "{co_alibaba} B2B业务在香港上市，募资131亿港元，首日股价从13.5港元最高涨到39.5港元；2012年以同样的13.5港元价格私有化退市。",
      text: "2007年11月，你43岁，身在香港。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "43", location: "香港", sources: 1 },
      choices: [
        { text: "分拆B2B业务先行上市。", history: true, effects: { mod: [{ id: 'alico', mul: 1.5 }], fame: 8 }, result: "史实数据：募资131亿港元" },
        { text: "整体上市", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去纽约上市", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "暂不上市", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2011', year: 2011, month: null, title: "支付牌照",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "为获央行支付牌照，在未经董事会正式通过的情况下终止{co_alipay}与{co_alibaba}集团的协议控制，引发与{co_yahoo}、{co_softbank}的争议；2011年7月三方达成和解。",
      text: "2011年，你46-47岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "46-47", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "优先保住支付牌照。", history: true, effects: { add: { id: 'antco', name: '{co_alipay}', value: 50000, stake: 0.1, growth: 0.4, vol: 0.5 }, rel: -5 }, result: "与史实记录一致。" },
        { text: "让外资股东同意后再处理", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "放弃支付牌照申请", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把{co_alipay}卖给国内银行", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2013', year: 2013, month: 5, title: "卸任CEO",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "5月10日在{co_taobao}十周年晚会上卸任集团CEO，由继任者接任，他保留董事局主席。2012年11月{co_alibaba}年交易额已突破1万亿元。",
      text: "2013年5月，你48岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "48", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "退出CEO职位。", history: true, effects: { energy: 15, rel: 5 }, result: "史实数据：2012年交易额破1万亿元" },
        { text: "继续担任CEO", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "彻底退休", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "转去做公益", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2014', year: 2014, month: 9, title: "纽约上市",
      when: (s, api) => ['alico'].some(id => api.has(id)),
      history: "9月19日{co_alibaba}在纽约证券交易所上市，每股68美元，含超额配售共募资250亿美元，创全球最大IPO纪录；同年多家榜单称他为中国首富。",
      text: "2014年9月，你50岁，身在美国纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "50", location: "美国纽约", sources: 3 },
      choices: [
        { text: "赴美上市。", history: true, effects: { mod: [{ id: 'alico', value: 20000000, stake: 0.08, growth: 0.05 }], fame: 15 }, result: "史实数据：募资250亿美元" },
        { text: "回香港上市", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在A股上市", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "推迟上市", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2015', year: 2015, month: 4, title: "教育公益",
      history: "向母校杭州师范大学捐赠1亿元设立教育基金；同年创办{co_hupan}。",
      text: "2015年4月，你50岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 4, age: "50", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "投入教育公益。", history: true, effects: (s, api) => { api.pay(1500); return { fame: 4, rel: 6 }; }, result: "史实数据：捐赠1亿元人民币" },
        { text: "捐给海外名校", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "成立商业培训公司", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专注环保公益", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2017', year: 2017, month: 1, title: "会见候任总统",
      history: "1月9日在纽约与候任总统{tr}会面约40分钟，讨论帮助美国创造100万个就业岗位。同年主演功夫短片《功守道》。",
      text: "2017年1月，你52岁，身在美国纽约{co_trumptower}。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "52", location: "美国纽约{co_trumptower}", sources: 2 },
      choices: [
        { text: "以民间身份会见外国政要。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：计划100万个美国就业岗位" },
        { text: "不见外国政要", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "事先报批后再会见", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只派公司高管出席", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2019', year: 2019, month: 9, title: "退休交班",
      history: "2018年9月宣布交班计划，2019年9月10日（55岁生日）正式卸任董事局主席，由继任者接任，转向教育公益；2020年10月1日卸任董事。",
      text: "2019年9月，你55岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "55", location: "浙江杭州", sources: 3 },
      choices: [
        { text: "按计划退休交班。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "继续担任主席", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只卸任不交出影响力", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "交给其他创始团队成员", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2020', year: 2020, month: 10, title: "外滩演讲",
      history: "10月24日在外滩金融峰会上发表批评监管和银行的演讲；11月2日被监管部门约谈，11月3日上交所暂缓{co_ant}科创板上市，港交所同步暂缓H股上市。此后近三个月未公开露面。",
      text: "2020年10月，你56岁，身在上海外滩。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 10, age: "56", location: "上海外滩", sources: 2 },
      choices: [
        { text: "公开发表批评性演讲。", history: true, effects: (s, api) => ({ mod: [{ id: 'antco', mul: 0.6 }], fame: -5 }), result: "与史实记录一致。" },
        { text: "不发表批评演讲，按计划完成{co_ant}上市", alt: true, effects: { mod: [{ id: 'antco', mul: 1.5 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "演讲后立即公开致歉", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "推迟上市主动整改", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2021', year: 2021, month: 4, title: "整改",
      history: "4月国家市场监管总局对{co_alibaba}处以182亿元反垄断罚款，{co_alibaba}表示“诚恳接受，坚决服从”；5月他辞去{co_hupan}校长。1月20日以视频形式在乡村教师活动中露面。",
      text: "2021年4月，你56岁，身在中国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 4, age: "56", location: "中国", sources: 3 },
      choices: [
        { text: "低调接受整改。", history: true, effects: { mod: [{ id: 'alico', mul: 0.8 }] }, result: "史实数据：罚款182亿元人民币（约27.5亿美元）" },
        { text: "在海外发声抗辩", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "出售阿里股份离开中国", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "全面退出商业", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2022', year: 2022, month: null, title: "旅居东京",
      history: "移居日本，基本退出公众生活；2023年5月-2024年10月任东京大学东京学院客座教授，研究可持续农业与食品生产。",
      text: "2022年，你57-58岁，身在日本东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "57-58", location: "日本东京", sources: 2 },
      choices: [
        { text: "旅居海外，转向研究。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在杭州低调生活", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "移居欧美", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "重新参与阿里经营", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2023', year: 2023, month: 1, title: "放弃控制权",
      history: "1月{co_ant}调整股权结构，他的投票权从约53%降至约6%，不再是实际控制人；3月返回杭州，在一所学校现身；同月{co_alibaba}宣布拆分为六大业务集团。",
      text: "2023年1月，你58岁，身在浙江杭州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "58", location: "浙江杭州", sources: 2 },
      choices: [
        { text: "放弃{co_ant}控制权，回国。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：投票权53.46%→6.208%" },
        { text: "拒绝放弃控制权", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "继续旅居海外", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "彻底出售{co_ant}股份", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'a2025', year: 2025, month: 2, title: "重新亮相",
      history: "2月17日出席在北京人民大会堂举行的民营企业座谈会，坐在第一排；同年5月入选一份年度慈善人物榜单。",
      text: "2025年2月，你60岁，身在北京人民大会堂。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "60", location: "北京人民大会堂", sources: 2 },
      choices: [
        { text: "重新公开亮相。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "继续回避公开场合", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在会上发言提建议", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "重新出任阿里职务", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
