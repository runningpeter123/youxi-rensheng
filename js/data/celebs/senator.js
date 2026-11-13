// {ob_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'senator',
  name: '{ob_full}',
  short: '{ob}',
  en: '{ob_en}',
  birthYear: 1961,
  birth: "1961年8月月",
  endYear: 2026,
  homeCity: 'chi',
  mode: 'politician',
  bio: "1961年生于美国夏威夷檀香山。童年在雅加达和檀香山度过，在芝加哥做社区组织者，哈佛法学院毕业后从州参议员起步。（本角色只记录选举结果、任职与法案等可核实事实。）",
  tags: ["社区", "演讲", "选举"],
  look: { skin: '#8d5a3b', hair: '#1b1b1b', shirt: '#ffffff', jacket: '#263248', pants: '#263248', shoes: '#111111' },
  history: { netWorth: null, text: "公开资料记载：他于2009—2017年任第44任美国总统；2026年6月，{ob}总统中心在芝加哥落成开放。" },
  starts: [
    { id: 's1985', year: 1985, label: "1985 · 23岁 · 芝加哥南区", desc: "放弃纽约，去芝加哥担任由8个天主教堂区组成的“发展社区项目”主任，做社区组织者（1985.6-1988.5），建立职业培训、大学预备辅导和租户权益组织。", cash: 1, fame: 1, charm: 45, energy: 95, rel: 30,
      companies: [], preDone: [] },
    { id: 's1996', year: 1996, label: "1996 · 35岁 · 第一次参选", desc: "当选伊利诺伊州参议员（第13选区），1998、2002年连任，推动伦理与医保改革、低收入税收抵免、种族形象定性监测和凶杀审讯录像等立法。", cash: 20, fame: 10, charm: 55, energy: 90, rel: 45,
      companies: [], preDone: [] },
    { id: 's2008', year: 2008, label: "2008 · 47岁 · 总统大选", desc: "8月选择{ob_vp}为竞选搭档。", cash: 100, fame: 70, charm: 70, energy: 85, rel: 60, flags: { politician: true, senator: true, presRun: true },
      companies: [], preDone: [] }
  ],
  contacts: [
    { id: 'k_vp', city: 'dc', from: 2008, to: 2016, name: '{ob_vp}', role: '竞选搭档 / 副总统', look: { skin: '#f2d6c0', hair: '#e0e0e0', shirt: '#1a237e', pants: '#333', shoes: '#111' }, text: '“我们一起把事情办成。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 'o1967', year: 1967, month: null, title: "雅加达童年",
      history: "随母亲迁居雅加达与继父生活，用英文小名在当地印尼语学校读书，能说流利的印尼语；继父教他“对世界如何运转的冷静判断”。",
      text: "1967年，你5-6岁，身在印度尼西亚雅加达。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "5-6", location: "印度尼西亚雅加达", sources: 1 },
      choices: [
        { text: "适应异国生活。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在夏威夷与外祖父母生活", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在国际学校读英语课程", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "随父亲去肯尼亚", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1971', year: 1971, month: null, title: "回到檀香山",
      history: "回檀香山与外祖父母生活，靠奖学金进入普纳荷学校，直至1979年毕业；1975年母亲回印尼做田野调查，他选择留在夏威夷。",
      text: "1971年，你9-10岁，身在夏威夷檀香山。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "9-10", location: "夏威夷檀香山", sources: 1 },
      choices: [
        { text: "留在夏威夷完成学业。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "随母亲回印尼", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去本土寄宿学校", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专心打篮球", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1979', year: 1979, month: null, title: "第一次公开演讲",
      history: "获全额奖学金进入西方学院；1981年2月发表第一次公开演讲，呼吁学校从南非撤资以反对种族隔离。",
      text: "1979年，你17-18岁，身在美国洛杉矶。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "17-18", location: "美国洛杉矶", sources: 1 },
      choices: [
        { text: "投身校园政治议题。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：全额奖学金" },
        { text: "专注学业不参与社会运动", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转学篮球强校", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "休学打工", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1981', year: 1981, month: null, title: "转学纽约",
      history: "年中赴印尼探亲并访问巴基斯坦三周；年底转学哥伦比亚大学，1983年毕业。",
      text: "1981年，你19-20岁，身在美国纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "19-20", location: "美国纽约", sources: 1 },
      choices: [
        { text: "转到纽约名校。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在西方学院", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "毕业后去华尔街", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "回夏威夷读书", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1983', year: 1983, month: null, title: "第一份工作",
      history: "毕业后在一家商业资讯公司做了约一年金融研究员和撰稿人，1985年在纽约公共利益研究组做了三个月项目协调员。",
      text: "1983年，你21-22岁，身在美国纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "21-22", location: "美国纽约", sources: 1 },
      choices: [
        { text: "先进入商业公司工作。", history: true, effects: { cash: 2 }, result: "与史实记录一致。" },
        { text: "直接读法学院", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "进入媒体做记者", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "直接去做社区工作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1985', year: 1985, month: 6, title: "社区组织者",
      history: "放弃纽约，去芝加哥担任由8个天主教堂区组成的“发展社区项目”主任，做社区组织者（1985.6-1988.5），建立职业培训、大学预备辅导和租户权益组织。",
      text: "1985年6月，你23岁，身在美国芝加哥南区。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "23", location: "美国芝加哥南区", sources: 1 },
      choices: [
        { text: "选择低薪的社区工作。", history: true, effects: { rel: 10, charm: 3 }, result: "与史实记录一致。" },
        { text: "留在纽约商业界", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "读研究生", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去华盛顿做政策研究", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1988', year: 1988, month: null, title: "选择哈佛",
      history: "年中首次去欧洲三周、肯尼亚五周，第一次见到许多父系亲属；秋天放弃西北大学法学院全额奖学金，入读哈佛法学院。",
      text: "1988年，你26-27岁，身在肯尼亚/美国剑桥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "26-27", location: "肯尼亚/美国剑桥", sources: 1 },
      choices: [
        { text: "选择哈佛而非全额奖学金的西北大学。", history: true, effects: { charm: 3 }, result: "与史实记录一致。" },
        { text: "接受西北大学全额奖学金", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "继续做社区组织者", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去肯尼亚工作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1990', year: 1990, month: null, title: "法律评论主编",
      history: "当选《哈佛法律评论》首位黑人主编，引发全国关注并获得出书合约，书稿后成为1995年出版的回忆录《我父亲的梦想》；1991年获法律博士学位。",
      text: "1990年，你28-29岁，身在美国马萨诸塞州剑桥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "28-29", location: "美国马萨诸塞州剑桥", sources: 1 },
      choices: [
        { text: "利用关注度出书，而非进入高薪律所。", history: true, effects: { fame: 8 }, result: "与史实记录一致。" },
        { text: "毕业后进入大律所或联邦法院当书记员", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "回芝加哥做社区工作", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去学术界当教授", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1992', year: 1992, month: 4, title: "投票计划",
      history: "4-10月领导伊利诺伊州“投票计划”选民登记运动，为40万未登记非裔选民中的15万完成登记；1992-2004年在芝加哥大学法学院教宪法（1996年起任高级讲师）。",
      text: "1992年4月，你30岁，身在美国芝加哥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 4, age: "30", location: "美国芝加哥", sources: 1 },
      choices: [
        { text: "深耕芝加哥，扎根社区与法学教学。", history: true, effects: { rel: 10, fame: 4 }, result: "史实数据：登记15万名选民" },
        { text: "进入律所赚钱", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做学术研究", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "离开芝加哥", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o1996', year: 1996, month: null, title: "州参议员",
      history: "当选伊利诺伊州参议员（第13选区），1998、2002年连任，推动伦理与医保改革、低收入税收抵免、种族形象定性监测和凶杀审讯录像等立法。",
      text: "1996年，你34-35岁，身在美国伊利诺伊州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "34-35", location: "美国伊利诺伊州", sources: 1 },
      choices: [
        { text: "从地方立法起步从政。", history: true, effects: { fame: 6, flags: { politician: true } }, result: "与史实记录一致。" },
        { text: "继续教书", alt: true, effects: { cash: 5, flags: { teacher: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "竞选芝加哥市议员", alt: true, effects: { fame: 3, flags: { politician: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "做民权律师", alt: true, effects: { cash: 10, flags: { lawyer: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2000', year: 2000, month: null, title: "众议员初选",
      when: (s, api) => (s => !!s.flags.politician)(s, api),
      history: "挑战一位四届联邦众议员，在民主党初选中以约1:2落败。",
      text: "2000年，你38-39岁，身在美国芝加哥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "38-39", location: "美国芝加哥", sources: 1 },
      choices: [
        { text: "输了之后继续留在州参议院。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：得票约为对手一半" },
        { text: "赢得众议院席位", alt: true, effects: { fame: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "退出政坛", alt: true, effects: { flags: { politician: false } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转去做律师", alt: true, effects: { cash: 20, flags: { politician: false } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2002', year: 2002, month: 10, title: "冲击联邦参议院",
      when: (s, api) => (s => !!s.flags.politician)(s, api),
      history: "10月2日在芝加哥一场反伊拉克战争集会上发言反对开战；同年筹备竞选联邦参议员，聘请媒体顾问，2003年1月正式宣布参选。",
      text: "2002年10月，你41岁，身在美国芝加哥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 10, age: "41", location: "美国芝加哥", sources: 1 },
      choices: [
        { text: "公开反对伊战并冲击联邦参议院。", history: true, effects: { fame: 4 }, result: "与史实记录一致。" },
        { text: "支持伊战顺应主流", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "保持沉默", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "继续留在州议会", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2004', year: 2004, month: 7, title: "全国大会演讲",
      when: (s, api) => (s => !!s.flags.politician)(s, api),
      history: "3月初选大胜；7月在民主党全国代表大会发表主题演讲（约900万人观看），一举成名；11月以70%得票当选联邦参议员，创伊利诺伊州纪录。",
      text: "2004年7月，你42岁，身在美国波士顿/伊利诺伊。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "42", location: "美国波士顿/伊利诺伊", sources: 1 },
      choices: [
        { text: "在全国舞台发表演讲。", history: true, effects: { fame: 20, charm: 5, flags: { senator: true } }, result: "史实数据：得票率70%" },
        { text: "拒绝演讲邀请", alt: true, effects: { fame: 5, flags: { senator: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把演讲机会让给他人", alt: true, effects: { rel: 5, flags: { senator: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "演讲内容只谈伊州议题", alt: true, effects: { fame: 8, flags: { senator: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2007', year: 2007, month: 2, title: "宣布参选总统",
      when: (s, api) => (s => !!s.flags.senator)(s, api),
      history: "2月10日在伊利诺伊州斯普林菲尔德的旧州议会大厦前宣布竞选总统，主张尽快结束伊战、能源独立、医改；初选与党内对手激烈竞争，2008年6月锁定提名。",
      text: "2007年2月，你45岁，身在伊利诺伊州斯普林菲尔德。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "45", location: "伊利诺伊州斯普林菲尔德", sources: 1 },
      choices: [
        { text: "以资历尚浅的参议员身份挑战总统大位。", history: true, effects: { fame: 10, flags: { presRun: true } }, result: "与史实记录一致。" },
        { text: "等待2012或2016年再参选", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "竞选副总统", alt: true, effects: { fame: 3 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "继续在参议院积累资历", alt: true, effects: { rel: 8 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2008', year: 2008, month: 11, title: "2008年大选",
      when: (s, api) => (s => !!s.flags.presRun)(s, api),
      history: "8月选择{ob_vp}为竞选搭档；11月4日以365张选举人票对173张（普选52.9%对45.7%）当选，成为首位非裔美国总统。外祖母在大选前两天去世。",
      text: "2008年11月，你47岁，身在美国芝加哥格兰特公园。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "47", location: "美国芝加哥格兰特公园", sources: 1 },
      choices: [
        { text: "选择{ob_vp}做搭档并赢得大选。", history: true, effects: { fame: 20, flags: { president: true } }, result: "史实数据：选举人票365:173" },
        { text: "选择另一位参议员做搭档", alt: true, effects: { flags: { president: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "选择党内初选对手做搭档", alt: true, effects: { flags: { president: true }, rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "大选失利，回到参议院", alt: true, effects: { fame: -5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2009', year: 2009, month: 1, title: "第44任总统",
      when: (s, api) => (s => !!s.flags.president)(s, api),
      history: "1月20日就任第44任总统。2月17日签署7870亿美元《美国复苏与再投资法案》应对大衰退；3月介入两家大型车企的重组；同年获诺贝尔和平奖。",
      text: "2009年1月，你47岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "47", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "以大规模刺激政策应对金融危机。", history: true, effects: { fame: 3, rel: 2 }, result: "史实数据：刺激计划7870亿美元" },
        { text: "更小规模的刺激计划", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "让车企直接破产", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "优先推动医改而非经济刺激", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2010', year: 2010, month: 3, title: "医改法案",
      when: (s, api) => (s => !!s.flags.president)(s, api),
      history: "3月23日签署《患者保护与平价医疗法案》（俗称“{ob}医改”），同年签署华尔街金融改革法案。",
      text: "2010年3月，你48岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 3, age: "48", location: "美国华盛顿", sources: 2 },
      choices: [
        { text: "推动全面医改。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "只做小幅医改", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加入公共医保选项", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把医改推迟到第二任期", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2012', year: 2012, month: 11, title: "连任",
      when: (s, api) => (s => !!s.flags.president)(s, api),
      history: "11月6日以332张选举人票击败共和党对手连任，普选51.1%。",
      text: "2012年11月，你51岁，身在美国芝加哥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "51", location: "美国芝加哥", sources: 1 },
      choices: [
        { text: "竞选连任。", history: true, effects: { fame: 10, flags: { reelected: true } }, result: "史实数据：选举人票332" },
        { text: "不寻求连任", alt: true, effects: { energy: 30, flags: { oneTerm: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "更换副总统搭档", alt: true, effects: { flags: { reelected: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "竞选失败回归学术界", alt: true, effects: { flags: { oneTerm: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2016', year: 2016, month: null, title: "第二任期",
      when: (s, api) => (s => !!s.flags.reelected)(s, api),
      history: "第二任期内签署巴黎气候协定、发布限制碳排放行政令，因俄罗斯吞并克里米亚对其实施制裁，推动医改实施。",
      text: "2016年，你54-55岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "54-55", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "以行政手段推进气候议程。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "只通过国会立法推进气候政策", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不加入巴黎协定", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "优先推动枪支管制立法", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2017', year: 2017, month: 1, title: "卸任之后",
      when: (s, api) => (s => !!s.flags.president)(s, api),
      history: "1月20日卸任，{tr}就职；同年获“勇气人物奖”，举办首届{co_obfund}峰会。2018年5月与{ob_wife}成立制作公司并与{co_netflix}签约，首部影片《美国工厂》获2020年奥斯卡最佳纪录片。",
      text: "2017年1月，你55岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "55", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "转型为基金会与内容制作。", history: true, effects: { cash: 500, fame: 5 }, result: "与史实记录一致。" },
        { text: "进入企业董事会", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "在大学任教", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "竞选其他公职", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2020', year: 2020, month: 11, title: "回忆录",
      history: "4月表态支持{ob_vp}参选；11月17日出版总统回忆录《应许之地》；2021年与一位摇滚歌手合作推出播客；2022年获艾美奖最佳旁白。",
      text: "2020年11月，你59岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "59", location: "美国", sources: 1 },
      choices: [
        { text: "写回忆录并为党内候选人助选。", history: true, effects: { cash: 300, fame: 5 }, result: "与史实记录一致。" },
        { text: "保持中立不为任何人背书", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "专注基金会", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "不出版回忆录", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2024', year: 2024, month: 7, title: "2024年助选",
      history: "7月21日{ob_vp}退选，5天后他与{ob_wife}为民主党新候选人背书，并在民主党全国代表大会演讲、赴摇摆州助选；大选后祝贺胜选者。2025年1月出席{tr}第二次就职典礼。",
      text: "2024年7月，你62岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "62", location: "美国", sources: 1 },
      choices: [
        { text: "为党内候选人助选，选后按惯例祝贺胜者。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "不参与助选", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "更早公开呼吁{ob_vp}退选", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "支持其他民主党人", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'o2026', year: 2026, month: 6, title: "总统中心",
      history: "{ob}总统中心（总统图书馆）于6月18日在芝加哥杰克逊公园举行落成典礼，6月19日对公众开放。",
      text: "2026年6月，你64岁，身在美国芝加哥杰克逊公园。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "64", location: "美国芝加哥杰克逊公园", sources: 2 },
      choices: [
        { text: "把总统中心建在芝加哥南区。", history: true, effects: { fame: 5, rel: 5 }, result: "与史实记录一致。" },
        { text: "建在夏威夷", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "建在纽约", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只做数字图书馆", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
