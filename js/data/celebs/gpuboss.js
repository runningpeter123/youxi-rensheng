// {gpu_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'gpuboss',
  name: '{gpu_full}',
  short: '{gpu}',
  en: '{gpu_en}',
  birthYear: 1963,
  birth: "1963年2月月",
  endYear: 2026,
  homeCity: 'sv',
  mode: 'business',
  bio: "1963年生于台湾台北，9岁时被送到美国。少年时在{co_dennys}打工，俄勒冈州立大学电机系毕业、斯坦福硕士。1993年与两位工程师联合创办{co_nvidia}。标志：黑色皮衣。",
  tags: ["GPU", "AI", "皮衣"],
  look: { skin: '#e8c19b', hair: '#1a1a1a', shirt: '#3a3a3a', jacket: '#141414', pants: '#222222', shoes: '#111111', glasses: true },
  history: { netWorth: 10000000, text: "2024年身家约1000亿美元；{co_nvidia}2025年成为全球首家市值突破5万亿美元的公司；2026年11月他卸任CEO。" },
  starts: [
    { id: 's1984', year: 1984, label: "1984 · 21岁 · 毕业求职", desc: "因学费便宜选择俄勒冈州立大学，1984年电机工程学士毕业。", cash: 1, fame: 0, charm: 30, energy: 95, rel: 20,
      companies: [], preDone: [] },
    { id: 's1993', year: 1993, label: "1993 · 30岁 · {co_dennys}的那张桌子", desc: "4月5日签署公司成立文件，三人各出200美元，初始资本600美元，公司命名{co_nvidia}（源自拉丁语“嫉妒”一词）。", cash: 5, fame: 1, charm: 35, energy: 95, rel: 30,
      companies: [], preDone: [] },
    { id: 's2010', year: 2010, label: "2010 · 47岁 · 皮衣与纹身", desc: "在公司股价达到100美元时纹了{co_nvidia}标志纹身，并在2010年公司技术大会上首次公开展示。", cash: 20000, fame: 35, charm: 45, energy: 85, rel: 45,
      companies: [
        { id: 'gpuco', name: '{co_nvidia}', value: 600000, stake: 0.04, growth: 0.2, vol: 0.6 }
      ], preDone: [] }
  ],
  contacts: [
    { id: 'k_cofounder', city: 'sv', from: 1985, to: 1993, name: '{gpu_cofounder1}', role: '工程师同事', look: { skin: '#f0caa6', hair: '#6b4a2f', shirt: '#455a64', pants: '#333', shoes: '#111' }, text: '“下班后去{co_dennys}坐坐？聊聊图形芯片。”', choices: [{ text: '去！咖啡我请', effects: { rel: 8, charm: 1 }, result: '你们聊到很晚。' }, { text: '今天先回家', effects: { energy: 5 } }] },
    { id: 'k_vc', city: 'sv', from: 1993, to: 1994, name: '{vc_valentine}', role: '{co_sequoia}合伙人', look: { skin: '#f0caa6', hair: '#d8d8d8', shirt: '#355', pants: '#333', shoes: '#111' }, text: '“说说你的商业计划。”', choices: [{ text: '认真讲你的图形芯片构想', effects: (s, api) => api.has('gpuco') ? { mod: [{ id: 'gpuco', mul: 1.2 }], rel: 8 } : { rel: 5 }, result: '他听得很仔细。' }, { text: '只交换名片', effects: { rel: 2 } }] },
    { id: 'k_console', city: 'tk', from: 1995, to: 1997, name: '{co_sega}高管', role: '游戏机公司', look: { skin: '#f2d0ae', hair: '#333', shirt: '#2b3f8c', pants: '#2b2b2b', shoes: '#111' }, text: '“我们来谈谈合作吧。”', choices: [{ text: '真诚沟通', effects: { rel: 8 }, result: '对方点了点头。' }, { text: '改天再谈', effects: {} }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 'h1973', year: 1973, month: null, title: "异乡少年",
      history: "父母变卖几乎全部家当，把不太会英语的他和哥哥送到美国；亲戚误以为一所肯塔基的寄宿学校是名校，实为问题少年教养学校。他在那里被欺负、每天扫厕所，学会乒乓球和游泳。",
      text: "1973年，你9-10岁，身在美国华盛顿州塔科马→肯塔基州奥奈达。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "9-10", location: "美国华盛顿州塔科马→肯塔基州奥奈达", sources: 1 },
      choices: [
        { text: "独自在异乡坚持下来。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "要求回台湾", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转学到普通寄宿学校", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专心练乒乓球走体育路线", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1978', year: 1978, month: null, title: "餐厅打工",
      history: "15岁起在当地{co_dennys}餐厅上夜班，做洗碗工、杂工和服务员（1978-1983）；高中跳两级、16岁毕业，1977年起在学校的{pr_appleii}上编程。",
      text: "1978年，你14-15岁，身在美国俄勒冈州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "14-15", location: "美国俄勒冈州", sources: 1 },
      choices: [
        { text: "边打工边读书。", history: true, effects: { cash: 1, charm: 2 }, result: "与史实记录一致。" },
        { text: "全力练乒乓球冲击国家队", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "不打工专心学业", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "高中毕业后直接工作", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1984', year: 1984, month: null, title: "第一份工作",
      history: "因学费便宜选择俄勒冈州立大学，1984年电机工程学士毕业；在{co_ti}、{co_amd}、{co_lsi}中选择了熟悉的{co_amd}，做微处理器设计。",
      text: "1984年，你20-21岁，身在美国俄勒冈州科瓦利斯→硅谷。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "20-21", location: "美国俄勒冈州科瓦利斯→硅谷", sources: 1 },
      choices: [
        { text: "加入{co_amd}当芯片设计师。", history: true, effects: { cash: 5 }, result: "与史实记录一致。" },
        { text: "加入{co_ti}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加入{co_lsi}", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "继续读博士", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1985', year: 1985, month: null, title: "跳槽 {co_lsi}",
      history: "听说{co_lsi}的新芯片设计流程后离开{co_amd}，加入{co_lsi}任技术职位，服务客户{co_sun}，结识工程师{gpu_cofounder1}和{gpu_cofounder2}；在{co_amd}期间开始学普通话与同事沟通（1984年起）。",
      text: "1985年，你21-22岁，身在美国硅谷。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "21-22", location: "美国硅谷", sources: 1 },
      choices: [
        { text: "跳槽到能接触前沿设计方法的{co_lsi}。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在{co_amd}晋升", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加入{co_sun}做内部工程师", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去台湾发展", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1989', year: 1989, month: null, title: "升任总监",
      history: "与{gpu_cofounder1}、{gpu_cofounder2}完成“GX图形引擎”，帮助{co_sun}营收从1987年2.62亿美元增至1990年6.56亿美元；他升任{co_lsi}一个部门的总监，在{co_lsi}工作到1993年。",
      text: "1989年，你25-26岁，身在美国硅谷。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "25-26", location: "美国硅谷", sources: 1 },
      choices: [
        { text: "在大公司内升职积累经验。", history: true, effects: { cash: 10, fame: 2 }, result: "史实数据：{co_sun}营收2.62亿→6.56亿美元" },
        { text: "这时就离职创业", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "跳槽去{co_sun}", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把GX技术自己授权出去做生意", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1992', year: 1992, month: null, title: "餐厅里的创业计划",
      history: "获斯坦福电机工程硕士。三人频繁在东圣何塞一家{co_dennys}讨论创业计划（因“比家里安静、咖啡便宜”）。",
      text: "1992年，你28-29岁，身在美国加州圣何塞。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "28-29", location: "美国加州圣何塞", sources: 1 },
      choices: [
        { text: "边上班边读完硕士，并筹划创业。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "拿到硕士后去读博", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "留在{co_lsi}等待更好时机", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "加入已有的图形芯片公司", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1993', year: 1993, month: 4, title: "创办{co_nvidia}",
      history: "4月5日签署公司成立文件，三人各出200美元，初始资本600美元，公司命名{co_nvidia}（源自拉丁语“嫉妒”一词）。经前雇主CEO引荐，获{co_sequoia}{vc_valentine}和{co_sutter}投资；30岁的他出任总裁兼CEO。",
      text: "1993年4月，你30岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 4, age: "30", location: "美国加州", sources: 1 },
      choices: [
        { text: "以CEO身份带队创办{co_nvidia}，做PC游戏图形芯片。", history: true, effects: { add: { id: 'gpuco', name: '{co_nvidia}', value: 2000, stake: 0.2, growth: 0.3, vol: 0.8 }, fame: 2, flags: { founder: true } }, result: "史实数据：初始资本600美元" },
        { text: "让年长的联合创始人当CEO", alt: true, effects: { add: { id: 'gpuco', name: '{co_nvidia}', value: 2000, stake: 0.15, growth: 0.25, vol: 0.8 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "留在{co_lsi}做内部创业", alt: true, effects: { cash: 15, flags: { stayCorp: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受大公司收购团队", alt: true, effects: { cash: 100, flags: { stayCorp: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1996', year: 1996, month: null, title: "路线之争",
      when: (s, api) => ['gpuco'].some(id => api.has(id)),
      history: "据公开资料（具体年份来源未给出，约1995—1997年间），公司早期芯片押注四边形渲染而非业界主流的三角形，几乎失败；据报道{co_sega}投资500万美元让公司活下来，公司转向三角形渲染。",
      text: "1996年，你32-33岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "待核实", month: null, age: "32-33", location: "美国加州", sources: 1, vague: true },
      choices: [
        { text: "承认路线错误并转向。", history: true, effects: { mod: [{ id: 'gpuco', mul: 0.8, growth: 0.35 }] }, result: "史实数据：{co_sega}投资500万美元" },
        { text: "坚持四边形路线", alt: true, chance: { p: 0.2, ok: { effects: { mod: [{ id: 'gpuco', mul: 2 }] }, result: '平行时间线里，四边形路线居然成了！' }, fail: { effects: { mod: [{ id: 'gpuco', mul: 0.3 }] }, result: '市场没有接受。' } } },
        { text: "把公司卖给竞争对手", alt: true, effects: { sell: [{ id: 'gpuco' }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转做主机定制芯片", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1997', year: 1997, month: 8, title: "离破产只有30天",
      when: (s, api) => ['gpuco'].some(id => api.has(id)),
      history: "{pr_riva}发布并挽救公司，当时公司现金只够发一个月工资，由此有了非官方口号“我们离破产只有30天”。",
      text: "1997年8月，你34岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 8, age: "34", location: "美国加州", sources: 1 },
      choices: [
        { text: "孤注一掷推出{pr_riva}。", history: true, effects: { mod: [{ id: 'gpuco', mul: 5, growth: 0.4 }], fame: 5 }, result: "史实数据：仅剩约1个月工资" },
        { text: "裁员保命缩小规模", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "寻求被收购", alt: true, effects: { sell: [{ id: 'gpuco', mul: 1.2 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转做低端廉价显卡", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h1999', year: 1999, month: null, title: "{co_nvidia}上市",
      when: (s, api) => ['gpuco'].some(id => api.has(id)),
      history: "{co_nvidia}上市（IPO）。在此之前黄家一直住普通入门级住宅，2003年迁至洛斯阿尔托斯山。",
      text: "1999年，你35-36岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "35-36", location: "美国加州", sources: 1 },
      choices: [
        { text: "带公司上市。", history: true, effects: { mod: [{ id: 'gpuco', value: 60000, stake: 0.05, growth: 0.3 }], fame: 10 }, result: "史实数据：{gpu}持股约3.6%（后期数据）" },
        { text: "保持私有慢慢发展", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受大厂收购", alt: true, effects: { sell: [{ id: 'gpuco', mul: 1.1 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "上市后套现退出", alt: true, effects: { mod: [{ id: 'gpuco', value: 60000, stake: 0.01 }], cash: 2000 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2007', year: 2007, month: null, title: "家族基金会",
      when: (s, api) => ['gpuco'].some(id => api.has(id)),
      history: "与妻子成立黄氏家族基金会，捐赠3.3亿美元{co_nvidia}股票；当年他以2460万美元薪酬位列美国CEO第61。",
      text: "2007年，你43-44岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "43-44", location: "美国加州", sources: 1 },
      choices: [
        { text: "设立家族慈善基金会。", history: true, effects: (s, api) => { const c = api.get('gpuco'); if (c) c.stake = Math.max(0.01, c.stake - 33000 / c.value); return { fame: 5, rel: 6, cash: 2460 }; }, result: "史实数据：捐赠3.3亿美元股票；2025年底基金会资产超120亿美元" },
        { text: "暂不做慈善，全部再投入公司", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "捐给母校设立奖学金", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "设立AI教育专项基金", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2010', year: 2010, month: null, title: "皮衣与纹身",
      history: "在公司股价达到100美元时纹了{co_nvidia}标志纹身，并在2010年公司技术大会上首次公开展示；黑色皮衣成为其标志形象。",
      text: "2010年，你46-47岁，身在美国加州。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "46-47", location: "美国加州", sources: 1 },
      choices: [
        { text: "用个人符号打造公司品牌。", history: true, effects: { fame: 6, charm: 5 }, result: "与史实记录一致。" },
        { text: "保持低调", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "请明星代言", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把纹身换成T恤", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2022', year: 2022, month: 10, title: "回馈母校",
      history: "夫妇向母校俄勒冈州立大学捐赠5000万美元，用于建设一个总价2.13亿美元、配备{co_nvidia}超级计算机的研究教育中心。",
      text: "2022年10月，你59岁，身在美国俄勒冈州科瓦利斯。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 10, age: "59", location: "美国俄勒冈州科瓦利斯", sources: 1 },
      choices: [
        { text: "回馈母校。", history: true, effects: (s, api) => { api.pay(5000); return { fame: 4, rel: 6 }; }, result: "史实数据：捐赠5000万美元（项目总额2.13亿美元）" },
        { text: "捐给斯坦福", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "捐给台湾大学", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "投资教育科技创业公司", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2024', year: 2024, month: 6, title: "3万亿市值",
      when: (s, api) => ['gpuco'].some(id => api.has(id)),
      history: "AI热潮中{co_nvidia}市值首次达到3万亿美元，他身家约1000亿美元；在台北电脑展期间引发追星热潮。身家从2019年约30亿美元升至2024年5月约900亿美元。",
      text: "2024年6月，你61岁，身在台湾台北。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "61", location: "台湾台北", sources: 1 },
      choices: [
        { text: "借AI浪潮全面转型为AI计算公司。", history: true, effects: { mod: [{ id: 'gpuco', value: 300000000, stake: 0.033, growth: 0.1 }], fame: 15, charm: 5 }, result: "史实数据：市值3万亿美元；个人身家约1000亿美元" },
        { text: "守住游戏显卡主业", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把数据中心业务分拆", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "高位大量减持股票", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2025', year: 2025, month: 1, title: "消费电子展",
      history: "在消费电子展（CES）发表主题演讲，发布{pr_geforce} RTX 50系列显卡。",
      text: "2025年1月，你61岁，身在美国拉斯维加斯。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "61", location: "美国拉斯维加斯", sources: 1 },
      choices: [
        { text: "以CEO身份亲自做全球发布。", history: true, effects: { fame: 4 }, result: "与史实记录一致。" },
        { text: "由其他高管主讲", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只发数据中心产品", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "推迟发布避免挤压旧产品", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2025a', year: 2025, month: 10, title: "5万亿市值",
      when: (s, api) => ['gpuco'].some(id => api.has(id)),
      history: "{co_nvidia}成为全球首家市值突破5万亿美元的上市公司；同年他被一家杂志列为年度人物“AI架构师”之一。",
      text: "2025年10月，你62岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 10, age: "62", location: "美国", sources: 1 },
      choices: [
        { text: "继续扩张AI芯片版图。", history: true, effects: { mod: [{ id: 'gpuco', value: 500000000 }], fame: 10 }, result: "史实数据：市值超5万亿美元" },
        { text: "分红回购为主放缓扩张", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加大投资AI初创公司", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "进军AI云服务与芯片竞争", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2026', year: 2026, month: null, title: "总统科技顾问",
      history: "被{tr}总统任命为总统科技顾问委员会（PCAST）成员；同年捐赠1000万美元用于尼泊尔—西藏洪灾救援。",
      text: "2026年，你62-63岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "62-63", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "接受政府顾问职务。", history: true, effects: (s, api) => { api.pay(1000); return { fame: 3, rel: 5 }; }, result: "史实数据：洪灾捐款1000万美元" },
        { text: "婉拒政治职务", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做公益", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "推荐其他高管代替", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'h2026a', year: 2026, month: 11, title: "卸任",
      history: "11月，他卸任{co_nvidia}总裁兼CEO。",
      text: "2026年11月，你63岁，身在美国加州圣克拉拉。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: 11, age: "63", location: "美国加州圣克拉拉", sources: 5 },
      choices: [
        { text: "卸任CEO。", history: true, effects: { energy: 20 }, result: "与史实记录一致。" },
        { text: "卸任CEO，但保留董事席位", alt: true, effects: { rel: 3 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
