// {tr_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'tower',
  name: '{tr_full}',
  short: '{tr}',
  en: '{tr_en}',
  birthYear: 1946,
  birth: "1946年6月月",
  endYear: 2026,
  homeCity: 'ny',
  mode: 'business',
  bio: "1946年生于纽约皇后区。从父亲的公寓生意起步，进军曼哈顿地产、赌场与电视节目，后来两度当选美国总统。（本角色只记录选举结果、任职、法案与法院裁决等可核实事实。）",
  tags: ["地产", "电视", "选举"],
  look: { skin: '#f2c9a0', hair: '#e8c46a', shirt: '#1f2a44', jacket: '#1f2a44', pants: '#1f2a44', shoes: '#111111' },
  history: { netWorth: null, text: "公开资料记载：他于2017年1月就任第45任美国总统，2025年1月就任第47任美国总统。" },
  starts: [
    { id: 's1968', year: 1968, label: "1968 · 22岁 · 从收租做起", desc: "进入父亲的{co_trumporg}旗下物业公司，管理公寓、维修、收租约5年，公司管理着1.4万多套中产公寓。", cash: 5, fame: 0, charm: 35, energy: 95, rel: 25,
      companies: [], preDone: [] },
    { id: 's1987', year: 1987, label: "1987 · 41岁 · 出书成名", desc: "出版《交易的艺术》（由他人代笔、署名合著），成为畅销书，使他在纽约以外成为知名企业家。", cash: 3000, fame: 40, charm: 45, energy: 85, rel: 40,
      companies: [
        { id: 'familyco', name: '{co_trumporg}', value: 60000, stake: 0.5, growth: 0.08, vol: 0.3 },
        { id: 'hotelco', name: '{co_grandhyatt}', value: 15000, stake: 0.5, growth: 0.06, vol: 0.3 }
      ], preDone: [] },
    { id: 's2015', year: 2015, label: "2015 · 69岁 · 宣布参选", desc: "宣布参选2016年总统，口号“让美国再次伟大”（2012年已注册商标），以商人和政治局外人形象竞选，2016年5月成为共和党推定提名人。", cash: 20000, fame: 85, charm: 50, energy: 75, rel: 45,
      companies: [
        { id: 'familyco', name: '{co_trumporg}', value: 300000, stake: 0.6, growth: 0.04, vol: 0.3 }
      ], preDone: [] }
  ],
  contacts: [
    { id: 'k_hotel', city: 'ny', from: 1976, to: 1980, name: '{co_hyatt}高管', role: '酒店合作方', look: { skin: '#f0caa6', hair: '#555', shirt: '#5d4037', pants: '#333', shoes: '#111' }, text: '“我们对中央车站旁那家老酒店也有兴趣。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] },
    { id: 'k_tv', city: 'ny', from: 2003, to: 2005, name: '电视制片人', role: '真人秀制作方', look: { skin: '#e8c19b', hair: '#3a2a1a', shirt: '#263238', pants: '#333', shoes: '#111' }, text: '“我有个新节目的点子，你很适合当主持人。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 't1959', year: 1959, month: null, title: "军校岁月",
      history: "（年份按八年级入学推算）父亲把他送进纽约军事学院读八至十二年级，学校强调体育与“必须赢”。",
      text: "1959年，你12-13岁，身在纽约康沃尔（纽约军事学院）。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "12-13", location: "纽约康沃尔（纽约军事学院）", sources: 1 },
      choices: [
        { text: "适应军校环境。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在普通私立学校", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "申请其他寄宿名校", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专注体育发展", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1964', year: 1964, month: null, title: "选大学",
      history: "曾考虑去加州读电影学校，但为了离家近选择福特汉姆大学。",
      text: "1964年，你17-18岁，身在纽约布朗克斯。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "17-18", location: "纽约布朗克斯", sources: 1 },
      choices: [
        { text: "选择离家近的大学。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "去加州读电影", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "直接进家族企业", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "参军", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1966', year: 1966, month: null, title: "转入沃顿",
      history: "（年份按大三推算）大三转学到宾大沃顿商学院，周末常回父亲办公室；此时已考虑从事房地产。1968年5月毕业。",
      text: "1966年，你19-20岁，身在美国费城。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "19-20", location: "美国费城", sources: 1 },
      choices: [
        { text: "转入沃顿，确定走地产路线。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "留在福特汉姆", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "读法学院", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "进入华尔街金融业", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1968', year: 1968, month: null, title: "从收租做起",
      history: "进入父亲的{co_trumporg}旗下物业公司，管理公寓、维修、收租约5年，公司管理着1.4万多套中产公寓。",
      text: "1968年，你21-22岁，身在纽约皇后区/布鲁克林/史坦顿岛。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "21-22", location: "纽约皇后区/布鲁克林/史坦顿岛", sources: 1 },
      choices: [
        { text: "从基层管理家族公寓做起。", history: true, effects: { add: { id: 'familyco', name: '{co_trumporg}', value: 20000, stake: 0.1, growth: 0.06, vol: 0.2 }, cash: 3 }, result: "史实数据：1.4万余套公寓" },
        { text: "自己另起炉灶创业", alt: true, effects: { add: { id: 'myco', name: '{tr}地产', value: 50, stake: 1, growth: 0.2, vol: 0.8 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去其他地产公司打工", alt: true, effects: { cash: 5, rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "进入娱乐业", alt: true, effects: { fame: 5, charm: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1971', year: 1971, month: null, title: "进军曼哈顿",
      when: (s, api) => ['familyco'].some(id => api.has(id)),
      history: "说服父亲向房价更高的曼哈顿扩张，自己搬到曼哈顿；父亲任董事长，他任总裁，开始以“{co_trumporg}”作为统称。",
      text: "1971年，你24-25岁，身在纽约曼哈顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "24-25", location: "纽约曼哈顿", sources: 1 },
      choices: [
        { text: "把家族业务推向曼哈顿。", history: true, effects: { mod: [{ id: 'familyco', stake: 0.3, growthAdd: 0.03 }], fame: 3 }, result: "与史实记录一致。" },
        { text: "留在外围区稳健经营", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "进军其他城市", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "转做商业地产租赁", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1978', year: 1978, month: null, title: "老酒店翻新",
      history: "启动家族首个曼哈顿项目：翻新中央车站旁一家破败的老酒店，由父亲和{co_hyatt}担保7000万美元建设贷款，并获纽约史上最长的40年税收减免；1980年以{co_grandhyatt}重新开业。",
      text: "1978年，你31-32岁，身在纽约曼哈顿中央车站旁。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "31-32", location: "纽约曼哈顿中央车站旁", sources: 1 },
      choices: [
        { text: "以高杠杆+政府税收优惠撬动大项目。", history: true, effects: { add: { id: 'hotelco', name: '{co_grandhyatt}', value: 10000, stake: 0.5, growth: 0.1, vol: 0.5 }, fame: 6 }, result: "史实数据：建设贷款7000万美元" },
        { text: "小规模翻新低风险项目", alt: true, effects: { add: { id: 'hotelco', name: '翻新小酒店', value: 1000, stake: 0.8, growth: 0.06, vol: 0.2 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与{co_hyatt}平分产权让对方主导", alt: true, effects: { add: { id: 'hotelco', name: '{co_grandhyatt}', value: 10000, stake: 0.25, growth: 0.08, vol: 0.3 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "放弃项目", alt: true, effects: { energy: 10 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1985', year: 1985, month: null, title: "海滨庄园",
      history: "购入{co_maralago}，1995年改为私人会员制俱乐部，2019年宣布为主要住所。",
      text: "1985年，你38-39岁，身在佛罗里达州棕榈滩。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "38-39", location: "佛罗里达州棕榈滩", sources: 1 },
      choices: [
        { text: "买下豪宅并后来改造为俱乐部。", history: true, effects: (s, api) => { api.pay(1000); return { add: { id: 'estate', name: '{co_maralago}', value: 1000, stake: 1, growth: 0.05, vol: 0.2, type: 'holding' }, fame: 4 }; }, result: "与史实记录一致。" },
        { text: "仅作私人度假别墅", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转卖获利", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "捐给政府作冬宫", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1987', year: 1987, month: null, title: "出书成名",
      history: "出版《交易的艺术》（由他人代笔、署名合著），成为畅销书，使他在纽约以外成为知名企业家；同年在大报刊登整版广告表达外交和财政观点。",
      text: "1987年，你40-41岁，身在纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "40-41", location: "纽约", sources: 1 },
      choices: [
        { text: "以出书和媒体曝光打造个人形象。", history: true, effects: { fame: 15, charm: 3 }, result: "与史实记录一致。" },
        { text: "低调做生意", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "专注写作开拓出版业", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "此时即参选公职", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1988', year: 1988, month: null, title: "高杠杆扩张",
      history: "收购一家著名老牌酒店（16家银行贷款）；买下大西洋城的第三家赌场{co_tajmahal}（以6.75亿美元垃圾债券融资，耗资11亿美元，1990年4月开业）；同期借贷买下一家航空公司，改名{co_trumpshuttle}（运营至1992年）。",
      text: "1988年，你41-42岁，身在纽约/新泽西大西洋城。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "41-42", location: "纽约/新泽西大西洋城", sources: 1 },
      choices: [
        { text: "高杠杆多元化扩张。", history: true, effects: { add: { id: 'casinoco', name: '{co_tajmahal}等资产', value: 110000, stake: 0.5, growth: -0.05, vol: 1.0 }, cash: -40000, fame: 8 }, result: "史实数据：{co_tajmahal}耗资11亿美元" },
        { text: "放缓扩张保留现金", alt: true, effects: { cash: 500 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做住宅地产", alt: true, effects: { mod: [{ id: 'familyco', growthAdd: 0.02 }] }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "与赌场运营商合作分担风险", alt: true, effects: { add: { id: 'casinoco', name: '合作赌场项目', value: 50000, stake: 0.25, growth: 0.05, vol: 0.6 } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't1991', year: 1991, month: null, title: "债务重组",
      when: (s, api) => ['casinoco'].some(id => api.has(id)),
      history: "{co_tajmahal}申请破产保护（1991），两家赌场与那家老牌酒店于1992年破产重组；为减轻约9亿美元个人债务卖掉航空公司和游艇；1995年在逾30亿美元银行贷款违约后经大规模重组，避免了个人破产。1991—2009年旗下企业共6次申请第11章破产保护。",
      text: "1991年，你44-45岁，身在大西洋城/纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "44-45", location: "大西洋城/纽约", sources: 1 },
      choices: [
        { text: "通过债务重组保住个人信用，转向品牌授权。", history: true, effects: (s, api) => { const c = api.get('casinoco'); if (c) c.status = 'closed'; return { cash: Math.max(0, -s.cash) * 0.8, fame: -5, flags: { licensing: true } }; }, result: "史实数据：个人债务约9亿美元；违约银行贷款逾30亿美元" },
        { text: "申请个人破产重新开始", alt: true, effects: (s, api) => { const c = api.get('casinoco'); if (c) c.status = 'closed'; return { cash: -s.cash, fame: -15 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "出售全部资产退出地产业", alt: true, effects: (s, api) => { api.ventures().forEach(c => c.status = 'sold'); return { cash: 2000 }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "寻找新投资人注资", alt: true, chance: { p: 0.5, ok: { effects: { cash: 30000, mod: [{ id: 'casinoco', stakeMul: 0.5 }] }, result: '新投资人注资，危机缓解。' }, fail: { effects: { fame: -5 }, result: '没人愿意接盘。' } } }
      ] },
    { id: 't1996', year: 1996, month: null, title: "选美赛事",
      history: "收购{co_missuniverse}（含旗下两项全国性赛事），2002年起转到{co_nbc}播出。",
      text: "1996年，你49-50岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "49-50", location: "美国", sources: 1 },
      choices: [
        { text: "进军娱乐选美业。", history: true, effects: { add: { id: 'pageantco', name: '{co_missuniverse}', value: 1000, stake: 1, growth: 0.08, vol: 0.4 }, fame: 5 }, result: "与史实记录一致。" },
        { text: "只做地产", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "收购体育球队", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "创办电视台", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2000', year: 2000, month: 2, title: "试水政治",
      history: "参加改革党总统初选三个月后，于2000年2月退出（此前1988年曾想做竞选搭档）。",
      text: "2000年2月，你53岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "53", location: "美国", sources: 1 },
      choices: [
        { text: "试水政治后退出。", history: true, effects: { fame: 4, flags: { politics: true } }, result: "与史实记录一致。" },
        { text: "坚持参选到底", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加入共和党参选", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "彻底放弃政治", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2004', year: 2004, month: null, title: "电视主持人",
      history: "主持{co_nbc}真人秀{co_apprentice}（2004—2015，含名人版），以“你被解雇了”成名，节目及相关授权为他带来逾4亿美元收入；同期大量授权“{tr}”品牌。",
      text: "2004年，你57-58岁，身在纽约。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "57-58", location: "纽约", sources: 1 },
      choices: [
        { text: "以电视明星身份经营个人品牌。", history: true, effects: { cash: 40000, fame: 20, charm: 5 }, result: "史实数据：节目及授权收入逾4亿美元" },
        { text: "拒绝电视邀约", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做幕后制片", alt: true, effects: { cash: 10000 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把品牌授权集中在少数高端项目", alt: true, effects: { cash: 15000, fame: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2015', year: 2015, month: 6, title: "宣布参选",
      history: "宣布参选2016年总统，口号“让美国再次伟大”（2012年已注册商标），以商人和政治局外人形象竞选，2016年5月成为共和党推定提名人。",
      text: "2015年6月，你69岁，身在纽约{co_trumptower}。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "69", location: "纽约{co_trumptower}", sources: 1 },
      choices: [
        { text: "以局外人身份参选总统。", history: true, effects: { fame: 10, flags: { running: true } }, result: "与史实记录一致。" },
        { text: "继续做电视节目", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "支持其他候选人", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "竞选纽约州长等地方职位", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2016', year: 2016, month: 11, title: "2016年大选",
      when: (s, api) => (s => !!s.flags.running)(s, api),
      history: "以304张选举人票对227票胜选（普选票少约287万张），成为首位既未从军也未担任过政府公职的总统。",
      text: "2016年11月，你70岁，身在美国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 11, age: "70", location: "美国", sources: 1 },
      choices: [
        { text: "接受当选，组建政府。", history: true, effects: { fame: 15, flags: { president: true } }, result: "史实数据：选举人票304:227" },
        { text: "大选中败选回归商界", alt: true, effects: { flags: { lost2016: true }, fame: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把企业交给盲目信托彻底剥离", alt: true, effects: (s, api) => { api.ventures().forEach(c => c.status = 'sold'); return { cash: 0, flags: { president: true } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "选择不同的竞选搭档", alt: true, effects: { flags: { president: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2017', year: 2017, month: 1, title: "第45任总统",
      when: (s, api) => (s => !!s.flags.president)(s, api),
      history: "1月20日就任第45任总统。任内签署《减税与就业法案》（2017年12月）、退出巴黎气候协定，任命三名最高法院大法官。",
      text: "2017年1月，你70岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "70", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "推行“美国优先”政策。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "坚持留在巴黎协定", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "更多与盟友协调的外交路线", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } }
      ] },
    { id: 't2021', year: 2021, month: 1, title: "卸任与再参选",
      when: (s, api) => (s => !!s.flags.president)(s, api),
      history: "2020年大选以232张选举人票对306张落败（普选46.8%对51.3%）。卸任后定居{co_maralago}；2022年11月宣布参选2024年总统。",
      text: "2021年1月，你74岁，身在佛罗里达州{co_maralago}。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "74", location: "佛罗里达州{co_maralago}", sources: 2 },
      choices: [
        { text: "继续参政并再次参选。", history: true, effects: { flags: { running2: true } }, result: "与史实记录一致。" },
        { text: "退出政坛专心商业", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "支持其他共和党人参选", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "创办媒体平台专注传媒", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2024', year: 2024, month: 7, title: "2024年大选",
      when: (s, api) => (s => !!s.flags.running2)(s, api),
      history: "7月15日获共和党提名；11月以312张选举人票对226票胜选，并赢得普选（49.8%对48.3%）。",
      text: "2024年7月，你78岁，身在宾夕法尼亚州巴特勒。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "78", location: "宾夕法尼亚州巴特勒", sources: 1 },
      choices: [
        { text: "继续竞选。", history: true, effects: { fame: 10, flags: { president2: true } }, result: "史实数据：选举人票312:226" },
        { text: "选择不同的竞选搭档", alt: true, effects: { flags: { president2: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "退出竞选", alt: true, effects: { energy: 30 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2025', year: 2025, month: 1, title: "第47任总统",
      when: (s, api) => (s => !!s.flags.president2)(s, api),
      history: "1月20日就任第47任总统，成为就职时年龄最大的总统、第二位非连续两任的总统。第二任期发布大量行政命令、对几乎所有国家加征关税，签署《大而美法案》。",
      text: "2025年1月，你78岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "78", location: "美国华盛顿", sources: 1 },
      choices: [
        { text: "以行政命令和关税为主要施政工具。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "以国会立法为主推动政策", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "有选择地对少数国家加税", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "延续前任的贸易政策", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 't2026', year: 2026, month: 2, title: "最高法院的关税裁决",
      when: (s, api) => (s => !!s.flags.president2)(s, api),
      history: "2月20日美国最高法院裁定《国际紧急经济权力法》（IEEPA）不授权总统征收关税，依据该法加征的关税被判无效（依据其他条款加征的关税不受影响）。",
      text: "2026年2月，你79岁，身在美国华盛顿。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "79", location: "美国华盛顿", sources: 2 },
      choices: [
        { text: "政府需改用其他法律工具推行关税。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "改由国会立法授权关税", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转向双边贸易谈判", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "取消大部分关税", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
