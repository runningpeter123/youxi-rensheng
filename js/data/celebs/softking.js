// {gz_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'softking',
  name: '{gz_full}',
  short: '{gz}',
  en: '{gz_en}',
  birthYear: 1955,
  birth: "1955年10月",
  endYear: 2026,
  homeCity: 'sea',
  mode: 'business',
  bio: "1955年生于美国西雅图。湖滨中学里迷上编程，进入哈佛后休学，与好友{gz_partner}创办{co_microsoft}；后来把重心转向{co_gzfund}。",
  tags: ["软件", "操作系统", "慈善"],
  look: { skin: '#f3d2b4', hair: '#9a7448', shirt: '#7aa6d6', pants: '#3b3b4f', shoes: '#2a1f1a', glasses: true },
  history: { netWorth: null, text: "2025年5月，他宣布未来20年通过基金会支出约2000亿美元、把几乎全部财富捐出，基金会将于2045年12月31日关闭。" },
  starts: [
    { id: 's1975', year: 1975, label: "1975 · 19岁 · 一通电话", desc: "读到1975年1月号一本电子杂志介绍{pr_altair}，主动联系{co_mits}说正在开发BASIC——其实手里既没机器也没写代码。", cash: 0.2, fame: 0, charm: 25, energy: 95, rel: 20,
      companies: [], preDone: [] },
    { id: 's1980', year: 1980, label: "1980 · 24岁 · 大客户上门", desc: "{co_ibm}为其个人电脑找软件，与另一家软件公司谈操作系统不成。", cash: 30, fame: 5, charm: 30, energy: 90, rel: 30, flags: { founder: true },
      companies: [
        { id: 'softco', name: '{co_microsoft}', value: 800, stake: 0.6, growth: 0.6, vol: 0.4 }
      ], preDone: [] },
    { id: 's2000', year: 2000, label: "2000 · 44岁 · 交棒", desc: "{gz_ceo2}接任CEO，他转任首席软件架构师。", cash: 50000, fame: 80, charm: 45, energy: 75, rel: 45, flags: { founder: true },
      companies: [
        { id: 'softco', name: '{co_microsoft}', value: 50000000, stake: 0.2, growth: 0.05, vol: 0.3 }
      ], preDone: [] }
  ],
  contacts: [
    { id: 'k_allen', city: 'sea', from: 1972, to: 1982, name: '{gz_partner}', role: '少年好友、合伙人', look: { skin: '#f0c9a3', hair: '#6b4a2f', shirt: '#8d6e63', pants: '#333', shoes: '#111' }, text: '“你看到那篇介绍新电脑的文章了吗？”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] },
    { id: 'k_buffett', city: 'ny', from: 2010, to: 2011, name: '{gz_buffett}', role: '“捐赠誓言”发起人之一', look: { skin: '#f2d6c0', hair: '#e0e0e0', shirt: '#37474f', pants: '#333', shoes: '#111' }, text: '“把钱花在能改变最多人的地方。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 'g1968', year: 1968, month: null, title: "湖滨中学的电脑",
      history: "进入湖滨中学，学校用义卖款买了电传终端和电脑机时，他迷上编程，被允许免上数学课去写程序。",
      text: "1968年，你12-13岁，身在美国西雅图。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "12-13", location: "美国西雅图", sources: 1 },
      choices: [
        { text: "把时间全部投入电脑。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "按父母期望走法律路线", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "专注数学竞赛", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把编程当业余爱好", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1970', year: 1970, month: null, title: "蹭机时",
      history: "因利用系统漏洞蹭免费机时被一家电脑公司禁用一个暑假；之后与伙伴主动提出帮这家公司找漏洞换机时，借机研读各种程序源代码。",
      text: "1970年，你14-15岁，身在美国西雅图。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "14-15", location: "美国西雅图", sources: 1 },
      choices: [
        { text: "从“蹭机时”转为“用技能换资源”。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "接受惩罚不再碰电脑", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去别家公司找机时", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "用漏洞自己做生意", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1972', year: 1972, month: null, title: "排课系统与交通计数器",
      history: "与一位好友接下学校排课系统自动化项目（换机时和版税），好友登山遇难后由{gz_partner}帮他完成；17岁与{gz_partner}合办一个交通流量计数器项目；同年在美国众议院当国会侍从。",
      text: "1972年，你16-17岁，身在美国西雅图。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "16-17", location: "美国西雅图", sources: 1 },
      choices: [
        { text: "失去好友后与{gz_partner}搭档继续做项目。", history: true, effects: { cash: 0.1, rel: 4 }, result: "与史实记录一致。" },
        { text: "放弃项目", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转向政治（国会侍从经历）", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专心升学", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1973', year: 1973, month: null, title: "进入哈佛",
      history: "以SAT 1590分进入哈佛，结识后来的{co_microsoft}CEO{gz_ceo2}。",
      text: "1973年，你17-18岁，身在美国马萨诸塞州剑桥。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "17-18", location: "美国马萨诸塞州剑桥", sources: 1 },
      choices: [
        { text: "进入哈佛读书。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "去普林斯顿/麻省理工", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不读大学直接创业", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "读法律预科", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1975', year: 1975, month: 1, title: "先承诺后交付",
      history: "读到1975年1月号一本电子杂志介绍{pr_altair}，主动联系{co_mits}说正在开发BASIC——其实手里既没机器也没写代码；几周内做出模拟器和解释器，演示成功。11月休学去{co_mits}，与{gz_partner}合伙创办“{co_microsoft}”。",
      text: "1975年1月，你19岁，身在美国哈佛→新墨西哥州阿尔伯克基。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "19", location: "美国哈佛→新墨西哥州阿尔伯克基", sources: 1 },
      choices: [
        { text: "先承诺后交付，并从哈佛休学。", history: true, effects: { add: { id: 'softco', name: '{co_microsoft}', value: 10, stake: 0.6, growth: 0.8, vol: 0.4 }, fame: 2, flags: { founder: true } }, result: "与史实记录一致。" },
        { text: "读完哈佛再创业", alt: true, effects: { charm: 5, add: { id: 'softco', name: '{co_microsoft}', value: 5, stake: 0.5, growth: 0.6, vol: 0.5 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把BASIC卖断给{co_mits}拿一次性费用", alt: true, effects: { cash: 3 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去大公司上班", alt: true, effects: { cash: 5, flags: { employee: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1976', year: 1976, month: 2, title: "致爱好者的公开信",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "发表《致爱好者的公开信》，称90%以上BASIC用户没付费，坚持软件应当收费；11月26日在新墨西哥州正式注册“{co_microsoft}”商号；年底脱离{co_mits}独立。",
      text: "1976年2月，你20岁，身在美国阿尔伯克基。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "20", location: "美国阿尔伯克基", sources: 1 },
      choices: [
        { text: "坚持软件收费模式。", history: true, effects: { mod: [{ id: 'softco', growthAdd: 0.1 }], fame: 3 }, result: "与史实记录一致。" },
        { text: "开源免费换取用户", alt: true, effects: { fame: 6, mod: [{ id: 'softco', growth: 0.3 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "靠硬件销售分成赚钱", alt: true, effects: { cash: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转做定制软件外包", alt: true, effects: { cash: 10, mod: [{ id: 'softco', growth: 0.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1979', year: 1979, month: 1, title: "搬回家乡",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "1月1日公司从阿尔伯克基迁到西雅图附近的贝尔维尤；前5年他亲自审阅并常重写所有代码。",
      text: "1979年1月，你23岁，身在美国华盛顿州贝尔维尤。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "23", location: "美国华盛顿州贝尔维尤", sources: 1 },
      choices: [
        { text: "把公司搬回家乡。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在阿尔伯克基", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "搬到硅谷", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "搬到波士顿", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1980', year: 1980, month: 7, title: "{co_ibm}的订单",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "{co_ibm}为其个人电脑找软件，与另一家软件公司谈操作系统不成；他与{gz_partner}提出采用{co_seattlecc}的一款现成操作系统，买下授权后交付{co_ibm}，一次性收费5万美元，但保留版权，可再卖给其他兼容机厂商。",
      text: "1980年7月，你24岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "24", location: "美国", sources: 1 },
      choices: [
        { text: "低价授权给{co_ibm}但保留版权。", history: true, effects: { cash: 5, mod: [{ id: 'softco', mul: 3, growth: 0.9 }], fame: 5 }, result: "史实数据：一次性费用5万美元" },
        { text: "把版权一并卖给{co_ibm}换高价", alt: true, effects: { cash: 100, mod: [{ id: 'softco', growth: 0.25 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "推荐{co_ibm}继续找另一家软件公司", alt: true, effects: { rel: 5, mod: [{ id: 'softco', growth: 0.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做BASIC不碰操作系统", alt: true, effects: { mod: [{ id: 'softco', growth: 0.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1981', year: 1981, month: 6, title: "掌握控制权",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "6月25日公司重组为华盛顿州公司，他任总裁兼董事长，{gz_partner}任副董事长。1983年初{gz_partner}确诊霍奇金淋巴瘤后离开公司。",
      text: "1981年6月，你25岁，身在美国华盛顿州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "25", location: "美国华盛顿州", sources: 1 },
      choices: [
        { text: "牢牢掌握公司控制权。", history: true, effects: { mod: [{ id: 'softco', stake: 0.53 }] }, result: "与史实记录一致。" },
        { text: "与{gz_partner}平分控制权", alt: true, effects: { mod: [{ id: 'softco', stake: 0.4 }], rel: 8 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "引入职业经理人当CEO", alt: true, effects: { mod: [{ id: 'softco', stake: 0.45, growthAdd: 0.05 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受大公司投资换股权", alt: true, effects: { mod: [{ id: 'softco', stake: 0.35 }], cash: 200 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1985', year: 1985, month: 11, title: "图形界面",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "11月20日推出首个零售版{co_windows}，对抗{co_apple}电脑的图形界面；1986年8月与{co_ibm}合作开发新操作系统，后合作破裂。",
      text: "1985年11月，你30岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "30", location: "美国", sources: 1 },
      choices: [
        { text: "自研图形界面系统。", history: true, effects: { mod: [{ id: 'softco', growthAdd: 0.1 }] }, result: "与史实记录一致。" },
        { text: "全力押注与{co_ibm}合作的新操作系统", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "为{co_apple}电脑开发应用为主", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "授权{co_apple}的界面技术", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1986', year: 1986, month: null, title: "上市",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "{co_microsoft}上市，他保留44.9%股份；1987年31岁成为当时最年轻的十亿美元富豪（身家12.5亿美元）。1987年在纽约展会上结识{gz_wife}。",
      text: "1986年，你30-31岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "30-31", location: "美国", sources: 1 },
      choices: [
        { text: "上市并保留大比例股权。", history: true, effects: (s, api) => ({ mod: [{ id: 'softco', value: Math.max(280000, (api.get('softco') || {}).value || 0), stake: 0.449, growth: 0.45 }], fame: 15 }), result: "史实数据：上市后持股44.9%；1987年身家12.5亿美元" },
        { text: "推迟上市", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "上市时大幅套现", alt: true, effects: (s, api) => ({ mod: [{ id: 'softco', value: 280000, stake: 0.3 }], cash: 40000 }), result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "卖给大公司", alt: true, effects: { sell: [{ id: 'softco', mul: 1.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1994', year: 1994, month: 1, title: "成家与手稿",
      history: "1月1日与{gz_wife}在夏威夷拉奈岛结婚；同年以3080万美元拍得一部文艺复兴时期大师的手稿，并用部分{co_microsoft}股票成立以父亲名字命名的基金会。",
      text: "1994年1月，你38岁，身在美国夏威夷拉奈岛。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "38", location: "美国夏威夷拉奈岛", sources: 1 },
      choices: [
        { text: "成家并开始做慈善。", history: true, effects: (s, api) => { api.pay(3080); return { rel: 10, fame: 3 }; }, result: "史实数据：手稿拍价3080万美元" },
        { text: "暂不结婚专注事业", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不做慈善先积累财富", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把钱投入艺术收藏", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1995', year: 1995, month: null, title: "全球首富",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "{co_windows} 95发布；当年起登上全球富豪榜首位，1995—2007年连续13年。",
      text: "1995年，你39-40岁，身在全球。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "39-40", location: "全球", sources: 1 },
      choices: [
        { text: "持续扩张PC软件霸主地位。", history: true, effects: { mod: [{ id: 'softco', mul: 1.5 }], fame: 10 }, result: "与史实记录一致。" },
        { text: "分拆公司", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转向互联网服务为主", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "提前退休", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g1998', year: 1998, month: null, title: "反垄断案",
      when: (s, api) => ['softco'].some(id => api.has(id)),
      history: "美国司法部诉{co_microsoft}反垄断案中他出庭作证，证词被媒体形容为闪烁其词；法院最终裁定{co_microsoft}违反《谢尔曼反垄断法》。1999年身家一度超过1000亿美元。",
      text: "1998年，你42-43岁，身在美国华盛顿特区。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "42-43", location: "美国华盛顿特区", sources: 1 },
      choices: [
        { text: "以强硬姿态应诉。", history: true, effects: { mod: [{ id: 'softco', value: 50000000, stake: 0.2, growth: 0.05 }], rel: -5 }, result: "史实数据：1999年身家一度超1000亿美元" },
        { text: "早期与政府和解", alt: true, effects: { mod: [{ id: 'softco', value: 50000000, stake: 0.2, growth: 0.08 }], rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "主动拆分业务", alt: true, effects: { mod: [{ id: 'softco', value: 40000000, stake: 0.2, growth: 0.1 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "放弃捆绑浏览器", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2000', year: 2000, month: null, title: "交棒与基金会",
      history: "{gz_ceo2}接任CEO，他转任首席软件架构师；同年与{gz_wife}合并三个家庭基金会、捐赠价值50亿美元股票，成立{co_gzfund}。",
      text: "2000年，你44-45岁，身在美国西雅图。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "44-45", location: "美国西雅图", sources: 1 },
      choices: [
        { text: "交出CEO，开始重心转向慈善。", history: true, effects: (s, api) => { api.pay(500000); return { fame: 10, rel: 10, flags: { foundation: true } }; }, result: "史实数据：初始捐赠50亿美元股票" },
        { text: "继续当CEO", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把基金会交给专业团队只捐钱", alt: true, effects: (s, api) => { api.pay(500000); return { fame: 6 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把钱投给科技创业公司", alt: true, effects: (s, api) => { api.pay(300000); api.addHolding('angel', 300000, '科技创业投资组合', 0.15, 0.9); return {}; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2008', year: 2008, month: 6, title: "全职慈善",
      history: "6月27日结束在{co_microsoft}的全职工作，转为全职投入基金会，保留非执行董事长；告别会上与{gz_ceo2}相拥落泪。",
      text: "2008年6月，你52岁，身在美国雷德蒙德。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "52", location: "美国雷德蒙德", sources: 2 },
      choices: [
        { text: "离开日常管理。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "继续全职留在{co_microsoft}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "彻底退出{co_microsoft}", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "创办新科技公司", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2010', year: 2010, month: 12, title: "捐赠誓言",
      history: "12月9日与{gz_wife}、{gz_buffett}签署“捐赠誓言”，承诺捐出至少一半财富。",
      text: "2010年12月，你55岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 12, age: "55", location: "美国", sources: 1 },
      choices: [
        { text: "公开承诺捐出大部分财富。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "只做私下捐款", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "承诺捐赠但设定更低比例", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "设立家族信托传给子女", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2014', year: 2014, month: 2, title: "退居顾问",
      history: "辞去{co_microsoft}董事长，任新CEO的技术顾问。",
      text: "2014年2月，你58岁，身在美国雷德蒙德。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "58", location: "美国雷德蒙德", sources: 2 },
      choices: [
        { text: "退居顾问。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "继续担任董事长", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "重新出任CEO", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "完全离开{co_microsoft}", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2015', year: 2015, month: null, title: "疫情警告与清洁能源",
      history: "3月在一场演讲大会上警告世界尚未准备好应对下一次大流行；12月巴黎气候大会期间牵头{co_breakthrough}投资者联盟，个人已投10亿美元于能源初创并再承诺10亿美元。",
      text: "2015年，你59-60岁，身在加拿大温哥华/法国巴黎。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "59-60", location: "加拿大温哥华/法国巴黎", sources: 1 },
      choices: [
        { text: "押注公共卫生与清洁能源。", history: true, effects: (s, api) => { api.pay(10000); api.addHolding('cleanenergy', 10000, '{co_breakthrough}投资', 0.1, 0.8); return { fame: 4 }; }, result: "史实数据：再承诺10亿美元" },
        { text: "只投传统慈善项目", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "专注AI投资", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "投资核能以外的传统能源", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2020', year: 2020, month: 3, title: "离开董事会",
      history: "3月13日辞去{co_microsoft}和{co_berkshire}董事会职务，专注全球健康、教育和气候；疫情期间基金会设立新冠治疗加速器。",
      text: "2020年3月，你64岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 3, age: "64", location: "美国", sources: 2 },
      choices: [
        { text: "彻底离开董事会。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "继续留任董事会", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "回到{co_microsoft}参与AI战略", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "转战政坛", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2021', year: 2021, month: 5, title: "婚姻变故",
      history: "5月3日宣布与{gz_wife}离婚，8月2日完成离婚，财务细节保密；2024年{gz_wife}辞任联席主席后，基金会改为现名。",
      text: "2021年5月，你65岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "65", location: "美国", sources: 1 },
      choices: [
        { text: "接受离婚并继续独自掌舵基金会。", history: true, effects: { rel: -5 }, result: "与史实记录一致。" },
        { text: "挽回婚姻", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把基金会一分为二", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "退出基金会管理", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'g2025', year: 2025, month: 5, title: "捐出几乎全部财富",
      history: "5月8日基金会25周年之际宣布：未来20年支出约2000亿美元，并于2045年12月31日关闭；他将把几乎全部财富通过基金会捐出。同年出版首部回忆录。",
      text: "2025年5月，你69岁，身在美国西雅图。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "69", location: "美国西雅图", sources: 3 },
      choices: [
        { text: "加速捐出几乎全部财富。", history: true, effects: { fame: 8, rel: 8 }, result: "史实数据：约2000亿美元（20年）" },
        { text: "维持原计划（身后20年关闭）", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把部分财富留给子女", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把资金转投AI与气候企业", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
