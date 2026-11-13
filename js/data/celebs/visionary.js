// {sn_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'visionary',
  name: '{sn_full}',
  short: '{sn}',
  en: '{sn_en}',
  birthYear: 1957,
  birth: "1957年8月月",
  endYear: 2026,
  homeCity: 'tk',
  mode: 'business',
  bio: "1957年生于日本佐贺县鸟栖。16岁赴美，在伯克利读书时卖出电子翻译器；回日本创办{co_softbank}，以重仓互联网、电信与AI的大手笔投资闻名。",
  tags: ["投资", "电信", "远见"],
  look: { skin: '#f2d0ae', hair: '#3a3a3a', shirt: '#eceff1', jacket: '#37474f', pants: '#37474f', shoes: '#111111' },
  history: { netWorth: 10070000, text: "2026年6月，{co_softbank}集团市值一度居日本第一，他身家达1007亿美元，再度成为亚洲首富，但数日后排名回落（资料置信度：中）。" },
  starts: [
    { id: 's1977', year: 1977, label: "1977 · 20岁 · 伯克利", desc: "伯克利在读期间，在物理学教授等人帮助下发明电子翻译器，卖给{co_sharp}获170万美元。", cash: 1, fame: 0, charm: 35, energy: 95, rel: 25, city: 'sv',
      companies: [], preDone: [] },
    { id: 's1994', year: 1994, label: "1994 · 37岁 · 上市", desc: "{co_softbank}上市，估值30亿美元。", cash: 500, fame: 30, charm: 45, energy: 90, rel: 40, flags: { founder: true },
      companies: [
        { id: 'sbco', name: '{co_softbank}', value: 300000, stake: 0.5, growth: 0.3, vol: 0.6 }
      ], preDone: [] },
    { id: 's2016', year: 2016, label: "2016 · 58岁 · 芯片豪赌", desc: "英国脱欧公投后立即宣布以234亿英镑（约314亿美元）收购芯片设计公司{co_arm}，9月完成，总价约240亿英镑（约340亿美元），是欧洲科技公司史上最大收购。", cash: 50000, fame: 80, charm: 55, energy: 75, rel: 55, flags: { founder: true },
      companies: [
        { id: 'sbco', name: '{co_softbank}', value: 8000000, stake: 0.2, growth: 0.12, vol: 0.6 }
      ], preDone: [] }
  ],
  contacts: [
    { id: 'k_mentor', city: 'tk', from: 1973, to: 1974, name: '{sn_mentor}', role: '{co_mcd}日本创始人', look: { skin: '#f2d0ae', hair: '#cfcfcf', shirt: '#c62828', pants: '#333', shoes: '#111' }, text: '“年轻人，你有什么想问的？”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] },
    { id: 'k_ma', city: 'hz', from: 1999, to: 2000, name: '{ma}', role: '创业者', look: { skin: '#f0d0a8', hair: '#2a2a2a', shirt: '#c0392b', pants: '#333', shoes: '#111' }, text: '“我们想帮中小企业做外贸。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 's1973', year: 1973, month: null, title: "求见偶像",
      history: "（年份按16岁赴美前推算）自行飞到东京{co_mcd}日本总部求见偶像{sn_mentor}，获谈15分钟，得到“学英语、学计算机、去美国”的建议。",
      text: "1973年，你15-16岁，身在日本东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "15-16", location: "日本东京", sources: 1 },
      choices: [
        { text: "不请自来，当面求教。", history: true, effects: { charm: 4, rel: 4 }, result: "与史实记录一致。" },
        { text: "写信等待回复", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "放弃求见", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "听从家人安排继续在日本读高中", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's1974', year: 1974, month: null, title: "退学赴美",
      history: "16岁从日本高中退学赴美，在当地一所学院学英语，三周内完成高中学业。",
      text: "1974年，你16-17岁，身在美国加州奥克兰。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "16-17", location: "美国加州奥克兰", sources: 1 },
      choices: [
        { text: "退学出国。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "读完日本高中再出国", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在日本考大学", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去韩国读书", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's1977', year: 1977, month: null, title: "翻译器与游戏机",
      history: "伯克利在读期间，在物理学教授等人帮助下发明电子翻译器，卖给{co_sharp}获170万美元；又从日本赊购二手游戏机放到宿舍和餐厅，赚了150万美元；在奥克兰创办游戏公司{co_unison}，后以200万美元卖给合伙人。",
      text: "1977年，你19-20岁，身在美国加州伯克利。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "19-20", location: "美国加州伯克利", sources: 1 },
      choices: [
        { text: "边读书边创业。", history: true, effects: { cash: 520, fame: 3 }, result: "史实数据：翻译器170万美元；游戏机150万美元；{co_unison} 200万美元" },
        { text: "专心学业毕业后进大公司", alt: true, effects: { charm: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把翻译器专利留在自己手里自己生产", alt: true, effects: { add: { id: 'transl', name: '电子翻译器厂', value: 200, stake: 1, growth: 0.2, vol: 0.8 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "留在美国继续经营{co_unison}", alt: true, effects: { cash: 320, add: { id: 'unison', name: '{co_unison}', value: 200, stake: 0.5, growth: 0.3, vol: 0.7 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's1979', year: 1979, month: null, title: "在美国成家",
      history: "与伯克利同学结婚。",
      text: "1979年，你21-22岁，身在美国加州伯克利。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "21-22", location: "美国加州伯克利", sources: 1 },
      choices: [
        { text: "在美国成家。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "回日本后再结婚", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与美国同学结婚定居美国", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "暂不结婚", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's1981', year: 1981, month: 9, title: "创办{co_softbank}",
      history: "9月3日，24岁的他创办{co_softbank}，最初做软件分销；1982年5月进入出版业，创办电脑杂志。",
      text: "1981年9月，你24岁，身在日本东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "24", location: "日本东京", sources: 1 },
      choices: [
        { text: "从软件分销和电脑出版起家。", history: true, effects: (s, api) => { api.pay(100); return { add: { id: 'sbco', name: '{co_softbank}', value: 200, stake: 0.8, growth: 0.8, vol: 0.6 }, flags: { founder: true } }; }, result: "与史实记录一致。" },
        { text: "做游戏开发商", alt: true, effects: (s, api) => { api.pay(100); return { add: { id: 'sbco', name: '{sn}游戏', value: 150, stake: 0.8, growth: 0.6, vol: 0.9 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "做电脑硬件进口", alt: true, effects: (s, api) => { api.pay(100); return { add: { id: 'sbco', name: '{sn}电脑进口', value: 150, stake: 0.8, growth: 0.5, vol: 0.6 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "回美国创业", alt: true, effects: (s, api) => { api.pay(100); return { add: { id: 'sbco', name: '{sn}科技', value: 150, stake: 0.8, growth: 0.6, vol: 0.8 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's1994', year: 1994, month: null, title: "上市与收购",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "{co_softbank}上市，估值30亿美元；1995年4月1日以8亿美元买下美国电脑展{co_comdex}，1995年9月同意以21亿美元收购{co_ziff}出版（1996年完成）。",
      text: "1994年，你36-37岁，身在日本东京/美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "36-37", location: "日本东京/美国", sources: 2 },
      choices: [
        { text: "借上市资金大举收购美国IT媒体与展会。", history: true, effects: (s, api) => ({ mod: [{ id: 'sbco', value: Math.max(300000, (api.get('sbco') || {}).value || 0), stake: 0.5, growth: 0.3 }], fame: 10 }), result: "史实数据：上市估值30亿美元；{co_comdex} 8亿美元；{co_ziff} 21亿美元" },
        { text: "上市后稳健经营国内业务", alt: true, effects: { mod: [{ id: 'sbco', value: 300000, stake: 0.5, growth: 0.15 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把资金投向日本本土互联网", alt: true, effects: { mod: [{ id: 'sbco', value: 300000, stake: 0.5, growth: 0.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不上市保持控制", alt: true, effects: { mod: [{ id: 'sbco', growth: 0.15 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's1995', year: 1995, month: null, title: "重仓互联网",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "买入{co_yahoo}股份；1996年与{co_yahoo}合资成立{co_yahoo}日本，成为日本主导性门户网站。同年收购{co_kingston}80%股份。",
      text: "1995年，你37-38岁，身在美国硅谷/日本。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "37-38", location: "美国硅谷/日本", sources: 2 },
      choices: [
        { text: "早期重仓互联网。", history: true, effects: { mod: [{ id: 'sbco', mul: 3, growth: 0.5, vol: 1.0 }], fame: 8 }, result: "与史实记录一致。" },
        { text: "只投日本本土公司", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "收购{co_yahoo}控股权", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把钱投给{co_amazon}", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2000', year: 2000, month: 1, title: "押注{co_alibaba}",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "约在1999—2000年间（资料记载年份不一），{co_softbank}投资{ma}的{co_alibaba}约2000万美元；据资料，该笔投资到2014年{co_alibaba}上市后价值约750亿美元。同年互联网泡沫破裂，据报道他的身价大幅蒸发，此前曾短暂成为世界首富。",
      text: "2000年1月，你42岁，身在中国杭州/东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "待核实", month: 1, age: "42", location: "中国杭州/东京", sources: 2, vague: true },
      choices: [
        { text: "对{co_alibaba}下重注。", history: true, effects: { mod: [{ id: 'sbco', mul: 0.3, growth: 0.25, vol: 0.6 }], flags: { aliStake: true } }, result: "史实数据：投资约2000万美元（年份资料不一）" },
        { text: "投资其他中国门户网站", alt: true, effects: { mod: [{ id: 'sbco', mul: 0.3, growth: 0.12 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只投1000万美元", alt: true, effects: { mod: [{ id: 'sbco', mul: 0.3, growth: 0.18 }], flags: { aliStake: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "泡沫破裂时卖掉阿里止损", alt: true, effects: { mod: [{ id: 'sbco', mul: 0.35, growth: 0.1 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2001', year: 2001, month: 9, title: "宽带价格战",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "与{co_yahoo}日本成立{co_yahoobb}宽带业务，大规模派发调制解调器抢市场，并收购日本第三大固网运营商{co_jtelecom}。",
      text: "2001年9月，你44岁，身在日本。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: 9, age: "44", location: "日本", sources: 1 },
      choices: [
        { text: "从互联网投资转向电信基础设施。", history: true, effects: { mod: [{ id: 'sbco', growthAdd: 0.05 }], cash: -200 }, result: "史实数据：{co_softbank}累计约13亿美元债务" },
        { text: "专注投资不做运营", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与{co_ntt}合作而非竞争", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "出售{co_yahoo}日本股份还债", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2005', year: 2005, month: 1, title: "职业棒球队",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "1月28日{co_softbank}成为职业棒球队福冈{co_softbank}鹰的所有者（该队2025年获日本一）。",
      text: "2005年1月，你47岁，身在日本福冈。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "47", location: "日本福冈", sources: 1 },
      choices: [
        { text: "收购职业球队提升品牌。", history: true, effects: { fame: 6 }, result: "与史实记录一致。" },
        { text: "赞助而不收购", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "收购足球队", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "不涉足体育", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2006', year: 2006, month: 3, title: "进军移动通信",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "3月17日宣布以约1.75万亿日元股权价值（约151亿美元）收购{co_vodafone}日本97.7%股份，10月更名{co_softbank}移动，进入移动通信。",
      text: "2006年3月，你48岁，身在日本。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 3, age: "48", location: "日本", sources: 2 },
      choices: [
        { text: "重金进入手机市场。", history: true, effects: { mod: [{ id: 'sbco', mul: 1.4, growthAdd: 0.05, vol: 0.8 }], fame: 5 }, result: "史实数据：约1.75万亿日元（约151亿美元）" },
        { text: "与{co_ntt}合作", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做固网宽带", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "收购规模更小的运营商", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2008', year: 2008, month: 6, title: "独家手机",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "6月4日宣布与{co_apple}合作，当年在日本独家推出{pr_iphone} 3G，独家地位维持到2011年。",
      text: "2008年6月，你50岁，身在日本。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "50", location: "日本", sources: 1 },
      choices: [
        { text: "押注{pr_iphone}独家合作。", history: true, effects: { mod: [{ id: 'sbco', mul: 1.2 }], fame: 5 }, result: "与史实记录一致。" },
        { text: "坚持日本本土功能机", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与{co_google}的手机系统合作", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "等竞争对手先试水", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2011', year: 2011, month: 3, title: "转向太阳能",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "福岛核事故后批评核电行业，投资建设全国性太阳能发电网络；2018年3月宣布参与沙特“愿景2030”计划中200GW太阳能项目。",
      text: "2011年3月，你53岁，身在日本。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: 3, age: "53", location: "日本", sources: 1 },
      choices: [
        { text: "转向可再生能源。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：沙特项目200GW" },
        { text: "支持核电重启", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不涉足能源", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只做能源技术投资", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2013', year: 2013, month: 7, title: "收购美国运营商",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "完成对美国第三大运营商{co_sprint}的收购，投资约216亿美元，持股约78%（后增至约84%）；2020年{co_sprint}与{co_tmobile}合并。",
      text: "2013年7月，你55岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "55", location: "美国", sources: 2 },
      choices: [
        { text: "进军美国电信市场。", history: true, effects: { mod: [{ id: 'sbco', vol: 0.9 }], fame: 5 }, result: "史实数据：约216亿美元" },
        { text: "收购规模较小的美国运营商", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "专注亚洲市场", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "与{co_sprint}仅做战略合作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2014', year: 2014, month: 9, title: "{co_alibaba}上市",
      when: (s, api) => ['sbco'].some(id => api.has(id)) && (s => !!s.flags.aliStake)(s, api),
      history: "{co_alibaba}纽约证券交易所上市，{co_softbank}所持股份价值约750亿美元，成为{co_softbank}财务支柱。",
      text: "2014年9月，你57岁，身在美国纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "57", location: "美国纽约", sources: 1 },
      choices: [
        { text: "长期持有阿里股份。", history: true, effects: { mod: [{ id: 'sbco', mul: 2 }], fame: 8 }, result: "史实数据：持股价值约750亿美元" },
        { text: "IPO时大幅减持套现", alt: true, effects: { mod: [{ id: 'sbco', mul: 1.3 }], cash: 30000 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "增持阿里", alt: true, effects: { mod: [{ id: 'sbco', mul: 2.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把阿里股份质押融资大举并购", alt: true, effects: { mod: [{ id: 'sbco', mul: 2.3, vol: 1.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2016', year: 2016, month: 7, title: "收购{co_arm}",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "英国脱欧公投后立即宣布以234亿英镑（约314亿美元）收购芯片设计公司{co_arm}，9月完成，总价约240亿英镑（约340亿美元），是欧洲科技公司史上最大收购。",
      text: "2016年7月，你58岁，身在英国剑桥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "58", location: "英国剑桥", sources: 1 },
      choices: [
        { text: "在英镑贬值时收购{co_arm}。", history: true, effects: { mod: [{ id: 'sbco', value: 8000000, stake: 0.2, growth: 0.12 }], flags: { arm: true }, fame: 6 }, result: "史实数据：约240亿英镑（约340亿美元）" },
        { text: "等待英镑进一步贬值", alt: true, effects: { energy: 10 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只收购部分股权", alt: true, effects: { flags: { arm: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "收购美国芯片公司", alt: true, effects: { mod: [{ id: 'sbco', growthAdd: 0.02 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2017', year: 2017, month: null, title: "{co_visionfund}",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "成立规模约1000亿美元的{co_visionfund}，投资AI、机器人、物联网等，投资对象包括出行、共享办公、外卖等领域的多家独角兽；2019年设立第二期基金（目标1080亿美元，后缩水）。",
      text: "2017年，你59-60岁，身在全球（东京/伦敦）。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "59-60", location: "全球（东京/伦敦）", sources: 1 },
      choices: [
        { text: "以超大基金押注科技独角兽。", history: true, effects: { mod: [{ id: 'sbco', vol: 1.1, growthAdd: 0.05 }], fame: 8 }, result: "史实数据：一期约1000亿美元" },
        { text: "设立规模更小、更分散的基金", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只投AI而非共享经济", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "与其他机构联合投资", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2020', year: 2020, month: 9, title: "出售{co_arm}未果",
      when: (s, api) => ['sbco'].some(id => api.has(id)) && (s => !!s.flags.arm)(s, api),
      history: "同意以初始约400亿美元现金加股票，把{co_arm}卖给{co_nvidia}，2022年2月因美欧监管反对，交易失败；同年6月辞去{co_alibaba}董事。",
      text: "2020年9月，你63岁，身在美国/英国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "63", location: "美国/英国", sources: 1 },
      choices: [
        { text: "尝试出售{co_arm}。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：初始约400亿美元" },
        { text: "保留{co_arm}自行上市", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把{co_arm}卖给财团", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "与{co_nvidia}成立合资公司", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2022', year: 2022, month: null, title: "巨额亏损",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "{co_visionfund}在截至2022年3月的财年录得创纪录的3.5万亿日元（约274亿美元）亏损（多项投资失败）；据英国媒体报道，到2022年11月他个人欠{co_softbank}47亿美元。",
      text: "2022年，你64-65岁，身在日本东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "64-65", location: "日本东京", sources: 1 },
      choices: [
        { text: "承受亏损，坚持投资策略并逐步收缩。", history: true, effects: { mod: [{ id: 'sbco', mul: 0.6 }], fame: -5 }, result: "史实数据：亏损约274亿美元" },
        { text: "清盘{co_visionfund}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "引入外部CEO", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "大幅回购股票", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2023', year: 2023, month: 9, title: "{co_arm}上市",
      when: (s, api) => ['sbco'].some(id => api.has(id)) && (s => !!s.flags.arm)(s, api),
      history: "{co_arm}于9月14日在{co_nasdaq}上市，募资48.7亿美元，估值545亿美元，{co_softbank}保留90.6%股权；此前{co_softbank}以约160亿美元从{co_visionfund}回购{co_arm} 25%股份。同年起{co_softbank}宣布全面转向AI。",
      text: "2023年9月，你66岁，身在美国纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "66", location: "美国纽约", sources: 1 },
      choices: [
        { text: "让{co_arm}上市并保留绝对控股。", history: true, effects: { mod: [{ id: 'sbco', mul: 1.3, growth: 0.2 }], fame: 5 }, result: "史实数据：募资48.7亿美元；估值545亿美元" },
        { text: "出售{co_arm}全部股份套现", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在伦敦上市", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "延后上市", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2025', year: 2025, month: 1, title: "{pr_stargate}",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "1月21日与{co_openai}、{co_oracle}等宣布成立{pr_stargate}AI基础设施合资项目，计划投资约5000亿美元，他任董事长；2月与{co_openai}在日本成立合资公司。",
      text: "2025年1月，你67岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "67", location: "美国华盛顿", sources: 2 },
      choices: [
        { text: "全力押注{co_openai}与AI算力。", history: true, effects: { mod: [{ id: 'sbco', growthAdd: 0.1, vol: 1.0 }], fame: 8 }, result: "史实数据：计划约5000亿美元" },
        { text: "只做财务投资不当董事长", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "投资其他AI公司", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专注{co_arm}芯片而非数据中心", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2025a', year: 2025, month: 11, title: "清仓与加码",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "11月披露已于10月清仓全部{co_nvidia}股份（约58.3亿美元），用于为{co_openai}投资筹资；截至2025年底累计投资{co_openai}约346亿美元、持股约11%。同年以65亿美元收购{co_ampere}。",
      text: "2025年11月，你68岁，身在日本东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "68", location: "日本东京", sources: 2 },
      choices: [
        { text: "卖{co_nvidia}、加码{co_openai}。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：出售{co_nvidia}约58.3亿美元；{co_openai}累计约346亿美元" },
        { text: "继续持有{co_nvidia}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "分散投资多家AI公司", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "保留现金应对风险", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 's2026', year: 2026, month: 6, title: "重回亚洲首富",
      when: (s, api) => ['sbco'].some(id => api.has(id)),
      history: "6月2日{co_softbank}集团市值超越{co_toyota}居日本第一，他身家达1007亿美元，十余年来再度成为亚洲首富，但数日后排名回落。",
      text: "2026年6月，你68岁，身在日本东京。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: 6, age: "68", location: "日本东京", sources: 1 },
      choices: [
        { text: "继续重仓AI。", history: true, effects: { mod: [{ id: 'sbco', value: 50000000, stake: 0.2, growth: 0.02 }], fame: 10 }, result: "史实数据：身家约1007亿美元" },
        { text: "高位减持", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "分拆业务上市", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "退居幕后交班", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
