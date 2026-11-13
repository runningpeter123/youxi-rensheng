// {bk_full} —— 由 /workspace/youxi-rensheng-tools/build_celebs.py 根据项目外的史实资料生成，请勿手改。
// 史实字段（年份/年龄/地点/事件/真实选择/数据）只取自资料；“游戏备选”取自资料中的 alternatives，为虚构分支。
// 效果数值（估值、持股、名气等）是游戏化简化，不代表真实数据。单位：万美元。
YXRS.registerCeleb({
  id: 'freekick',
  name: '{bk_full}',
  short: '{bk}',
  en: '{bk_en}',
  birthYear: 1975,
  birth: "1975年5月月",
  endYear: 2026,
  homeCity: 'mc',
  mode: 'athlete',
  bio: "1975年生于英国伦敦。14岁与{club_mu}签学徒协议，“92班”成员，以精准的任意球闻名；先后效力{club_real}、{club_galaxy}、{club_milan}、{club_psg}，退役后经营球队并投身慈善。",
  tags: ["足球", "任意球", "偶像"],
  look: { skin: '#f3d3b5', hair: '#d9b56a', shirt: '#c62828', pants: '#f5f5f5', shoes: '#111111' },
  history: { netWorth: null, text: "公开资料记载：他职业生涯获得19个主要冠军，2013年退役；后来经营{club_miami}并投身慈善，2025年获封爵士。" },
  starts: [
    { id: 's1991', year: 1991, label: "1991 · 16岁 · 青训合同", desc: "7月8日签下青训合同，与同批青训队友组成后来著名的“92班”，1992年5月赢得足总青年杯。", cash: 0.5, fame: 2, charm: 40, energy: 100, rel: 25,
      companies: [], preDone: [] },
    { id: 's2003', year: 2003, label: "2003 · 27岁 · 转会风波", desc: "2月15日足总杯负{club_arsenal}后，主教练{bk_coach}在更衣室踢飞一只球鞋，击中他眉骨需缝针。", cash: 3000, fame: 85, charm: 70, energy: 85, rel: 50, flags: { club: 'mu' },
      companies: [], preDone: [] },
    { id: 's2013', year: 2013, label: "2013 · 37岁 · 最后一站", desc: "1月31日签约{club_psg}5个月，薪水全数捐给当地儿童慈善机构。", cash: 15000, fame: 90, charm: 75, energy: 70, rel: 60, flags: { miamiOption: true }, city: 'la',
      companies: [], preDone: [] }
  ],
  contacts: [
    { id: 'k_coach', city: 'mc', from: 1991, to: 2003, name: '{bk_coach}', role: '{club_mu}主教练', look: { skin: '#f0c4a0', hair: '#cfcfcf', shirt: '#263238', pants: '#333', shoes: '#111' }, text: '“训练场见。别迟到。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] },
    { id: 'k_real', city: 'md', from: 2003, to: 2003, name: '{club_real}代表', role: '转会谈判', look: { skin: '#efc9a5', hair: '#2a2a2a', shirt: '#eeeeee', pants: '#333', shoes: '#111' }, text: '“我们俱乐部很欣赏你。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] },
    { id: 'k_galaxy', city: 'la', from: 2006, to: 2007, name: '{club_galaxy}代表', role: '美国球会', look: { skin: '#e8c19b', hair: '#4a3a2a', shirt: '#1565c0', pants: '#333', shoes: '#111' }, text: '“来美国踢球吧，这里需要你。”', choices: [{ text: '真诚交流', effects: { rel: 8, charm: 1 }, result: '你们聊得很投机，留下了联系方式。' }, { text: '寒暄几句就告辞', effects: { rel: 2 } }] }
  ],
  projects: [
    
  ],
  nodes: [
    { id: 'b1986', year: 1986, month: null, title: "球童与试训",
      history: "担任{club_mu}一场比赛的球童吉祥物；先后到几家球会试训，参加{club_spurs}精英学校，但从未为{club_spurs}出场。",
      text: "1986年，你10-11岁，身在英国伦敦/曼彻斯特。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "10-11", location: "英国伦敦/曼彻斯特", sources: 1 },
      choices: [
        { text: "心系{club_mu}。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "加入家门口的{club_spurs}青训", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去小球会争取早出场", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "接受{club_barca}青训邀请", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1989', year: 1989, month: 5, title: "14岁的合同",
      history: "14岁生日当天与{club_mu}签学徒协议。",
      text: "1989年5月，你14岁，身在英国曼彻斯特。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "14", location: "英国曼彻斯特", sources: 1 },
      choices: [
        { text: "选择{club_mu}。", history: true, effects: { fame: 3, rel: 2 }, result: "与史实记录一致。" },
        { text: "签{club_spurs}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "签家乡伦敦球会", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "继续读书再决定", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1991', year: 1991, month: 7, title: "“92班”",
      history: "7月8日签下青训合同，与同批青训队友组成后来著名的“92班”，1992年5月赢得足总青年杯。",
      text: "1991年7月，你16岁，身在英国曼彻斯特。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "16", location: "英国曼彻斯特", sources: 1 },
      choices: [
        { text: "在{club_mu}青训成长。", history: true, effects: { fame: 3, cash: 0.5, flags: { club: 'mu' } }, result: "与史实记录一致。" },
        { text: "转会出场机会更多的球队", alt: true, effects: { fame: 1, flags: { club: 'other' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "放弃职业足球", alt: true, effects: { energy: 20, flags: { quit: true } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去国外青训", alt: true, effects: { charm: 3, flags: { club: 'abroad' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1992', year: 1992, month: 9, title: "一线队首秀",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "9月23日在联赛杯中替补出场，完成一线队首秀，17岁；1993年1月23日签职业合同。",
      text: "1992年9月，你17岁，身在英国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 9, age: "17", location: "英国", sources: 1 },
      choices: [
        { text: "抓住首秀机会。", history: true, effects: { fame: 4, cash: 3 }, result: "与史实记录一致。" },
        { text: "要求外租锻炼", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转会其他球队", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "继续留在预备队", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1995', year: 1995, month: null, title: "外租",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "1994-95赛季租借至{club_preston}（他自述当时以为{club_mu}不要他了），5场2球，其中一球直接角球破门；回到{club_mu}后1995-96赛季赢得首个联赛冠军。",
      text: "1995年，你19-20岁，身在英国{club_preston}。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "19-20", location: "英国{club_preston}", sources: 1 },
      choices: [
        { text: "接受外租。", history: true, effects: { fame: 3, cash: 5, charm: 2 }, result: "史实数据：5场2球" },
        { text: "拒绝外租坚持在{club_mu}竞争", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "永久转会低级别球队", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "转会其他英超队", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1996', year: 1996, month: 8, title: "中场吊射",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "8月17日新赛季首日从中场线吊射破门，一战成名；9月1日21岁完成英格兰队首秀；当季获年度最佳年轻球员，次季接过7号球衣。",
      text: "1996年8月，你21岁，身在英国伦敦温布尔登。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 8, age: "21", location: "英国伦敦温布尔登", sources: 1 },
      choices: [
        { text: "在大场面大胆起脚。", history: true, effects: { fame: 12, cash: 50, charm: 5 }, result: "与史实记录一致。" },
        { text: "稳妥传球", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把机会让给队友", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "专注防守角色", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1997', year: 1997, month: null, title: "恋情",
      history: "观看{club_mu}比赛的流行女子组合成员{bk_wife}与他开始交往，两人成为媒体焦点。",
      text: "1997年，你21-22岁，身在英国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "21-22", location: "英国", sources: 1 },
      choices: [
        { text: "公开恋情。", history: true, effects: { fame: 10, charm: 5 }, result: "与史实记录一致。" },
        { text: "低调保密恋情", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "专注足球暂不恋爱", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "与圈外人交往", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1998', year: 1998, month: 6, title: "世界杯红牌",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "世界杯对阿根廷的1/8决赛中，他被对手犯规后倒地踢人吃红牌，英格兰点球出局，他遭受大量批评；此前小组赛对哥伦比亚踢进个人国家队首球。",
      text: "1998年6月，你23岁，身在法国圣艾蒂安。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "23", location: "法国圣艾蒂安", sources: 1 },
      choices: [
        { text: "没有离开英格兰，留在{club_mu}用表现回应。", history: true, effects: { fame: -8, rel: -5 }, result: "与史实记录一致。" },
        { text: "转会海外躲避舆论", alt: true, effects: { fame: -3, flags: { club: 'abroad' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "公开反击批评者", alt: true, effects: { fame: -10, charm: 3 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "暂时退出国家队", alt: true, effects: { energy: 20, fame: -5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b1999', year: 1999, month: 5, title: "三冠王",
      when: (s, api) => (s => s.flags.club === 'mu')(s, api),
      history: "1998—99赛季随{club_mu}夺得英超、足总杯、欧冠“三冠王”；当年获金球奖亚军。7月4日在爱尔兰一座城堡与{bk_wife}结婚。",
      text: "1999年5月，你24岁，身在英国/西班牙{club_barca}。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "24", location: "英国/西班牙{club_barca}", sources: 1 },
      choices: [
        { text: "成家并巅峰夺冠。", history: true, effects: { fame: 15, cash: 200, rel: 8 }, result: "史实数据：婚礼花费约50万英镑" },
        { text: "婚礼低调不卖独家", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把婚礼安排在休赛期之外", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "转会意甲", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2000', year: 2000, month: null, title: "英格兰队长",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "2000年欧洲杯后成为英格兰队长（任期6年，58次担任队长）。2001年10月对希腊终场前任意球破门，帮助英格兰晋级世界杯，获年度体育人物、世界足球先生亚军。",
      text: "2000年，你24-25岁，身在英国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "中", month: null, age: "24-25", location: "英国", sources: 1 },
      choices: [
        { text: "接下队长袖标。", history: true, effects: { fame: 10, charm: 5 }, result: "与史实记录一致。" },
        { text: "拒绝队长专注个人表现", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "退出国家队专注俱乐部", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只在大赛中出场", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2003', year: 2003, month: 2, title: "飞靴与转会",
      when: (s, api) => (s => s.flags.club === 'mu')(s, api),
      history: "2月15日足总杯负{club_arsenal}后，主教练{bk_coach}在更衣室踢飞一只球鞋，击中他眉骨需缝针；此前他已失去主力位置。同年夏天{club_mu}一度宣布与{club_barca}达成转会，最终他以3700万欧元加盟{club_real}。",
      text: "2003年2月，你27岁，身在英国曼彻斯特。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "27", location: "英国曼彻斯特", sources: 1 },
      choices: [
        { text: "离开{club_mu}，选择{club_real}而非{club_barca}。", history: true, effects: { cash: 1500, fame: 10, flags: { club: 'real' } }, result: "史实数据：转会费3700万欧元" },
        { text: "留在{club_mu}与{bk_coach}和解", alt: true, effects: { rel: 8, flags: { club: 'mu' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "加盟{club_barca}", alt: true, effects: { cash: 1200, fame: 8, flags: { club: 'barca' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去意甲或英超其他豪门", alt: true, effects: { cash: 1000, fame: 5, flags: { club: 'other' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2005', year: 2005, month: null, title: "足球学院与慈善",
      history: "创办以自己名字命名的足球学院（2009年底宣布关闭）；当年成为{org_unicef}大使。",
      text: "2005年，你29-30岁，身在英国伦敦/美国洛杉矶。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "29-30", location: "英国伦敦/美国洛杉矶", sources: 1 },
      choices: [
        { text: "把名气投入青训与慈善。", history: true, effects: (s, api) => { api.pay(300); return { fame: 5, rel: 8 }; }, result: "与史实记录一致。" },
        { text: "只专注踢球", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "开设高端时尚品牌", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "投资球队", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2006', year: 2006, month: 7, title: "辞去队长",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "世界杯1/8决赛对厄瓜多尔任意球破门，成为首位在三届世界杯进球的英格兰球员；1/4决赛受伤下场后英格兰点球负葡萄牙，次日他宣布辞去队长职务。",
      text: "2006年7月，你31岁，身在德国。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "31", location: "德国", sources: 1 },
      choices: [
        { text: "主动辞去国家队队长。", history: true, effects: { fame: -3, energy: 10 }, result: "与史实记录一致。" },
        { text: "继续担任队长", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "彻底退出国家队", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "等新教练决定", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2007', year: 2007, month: 1, title: "远赴美国",
      when: (s, api) => (s => s.flags.club === 'real')(s, api),
      history: "{club_real}未续约，1月11日宣布签约{org_mls}{club_galaxy}5年（实际合同约3250万美元，媒体传的2.5亿美元是包含代言收入的公关数字），合同含日后以2500万美元购买{org_mls}扩军球队的期权。6月17日随{club_real}夺得西甲冠军后告别。",
      text: "2007年1月，你31岁，身在西班牙马德里→美国洛杉矶。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "31", location: "西班牙马德里→美国洛杉矶", sources: 1 },
      choices: [
        { text: "去美国推广足球。", history: true, effects: { cash: 3250, fame: 10, flags: { club: 'galaxy', miamiOption: true } }, result: "史实数据：合同约3250万美元/5年" },
        { text: "留在欧洲顶级联赛", alt: true, effects: { cash: 1500, flags: { club: 'europe' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "接受{club_real}最后时刻的挽留", alt: true, effects: { cash: 1200, flags: { club: 'real' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去中东/亚洲高薪联赛", alt: true, effects: { cash: 4000, flags: { club: 'other' } }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2008', year: 2008, month: 5, title: "第100场国家队比赛",
      when: (s, api) => (s => !s.flags.quit)(s, api),
      history: "3月26日对法国获得英格兰队第100次出场；2009年3月以第109场超越前纪录，成为英格兰出场最多的非门将球员（纪录保持到2016年）。",
      text: "2008年5月，你33岁，身在英国伦敦温布利。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "33", location: "英国伦敦温布利", sources: 1 },
      choices: [
        { text: "为保持国家队状态寻求高水平比赛。", history: true, effects: { fame: 8 }, result: "史实数据：英格兰队总出场115次" },
        { text: "接受国家队生涯结束", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "回英超效力", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "只在{org_mls}踢球", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2009', year: 2009, month: 1, title: "租借米兰",
      when: (s, api) => (s => s.flags.club === 'galaxy')(s, api),
      history: "为保持状态备战世界杯，从{club_galaxy}租借至{club_milan}（2009、2010两次），成为首位踢满100场欧冠的英国球员；2010年3月跟腱断裂，错过南非世界杯。",
      text: "2009年1月，你33岁，身在意大利米兰。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "33", location: "意大利米兰", sources: 1 },
      choices: [
        { text: "租借回欧洲。", history: true, effects: { fame: 5, energy: -20, cash: 300 }, result: "与史实记录一致。" },
        { text: "整年留在{club_galaxy}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "永久转会米兰", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "去英超租借", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2011', year: 2011, month: null, title: "美职联冠军",
      when: (s, api) => (s => s.flags.club === 'galaxy')(s, api),
      history: "随{club_galaxy}夺得2011年{org_mls}杯，2012年1月续约两年并卫冕；2012年5月随队受到{ob}总统在白宫接见。",
      text: "2011年，你35-36岁，身在美国洛杉矶。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "35-36", location: "美国洛杉矶", sources: 1 },
      choices: [
        { text: "合同到期后留在美国。", history: true, effects: { fame: 6, cash: 500 }, result: "与史实记录一致。" },
        { text: "加盟{club_psg}", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "回英超", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "退役转型", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2013', year: 2013, month: 5, title: "巴黎与退役",
      history: "1月31日签约{club_psg}5个月，薪水全数捐给当地儿童慈善机构；5月12日夺得法甲冠军，成为唯一在英、西、美、法四国都拿过联赛冠军的英格兰球员；5月16日宣布退役，5月18日踢告别赛。",
      text: "2013年5月，你38岁，身在法国巴黎。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 5, age: "38", location: "法国巴黎", sources: 1 },
      choices: [
        { text: "退役。", history: true, effects: { fame: 10, rel: 10, flags: { retired: true } }, result: "史实数据：职业生涯19个主要冠军" },
        { text: "再踢一个赛季", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "去中超等联赛", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "退役后立即执教", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2014', year: 2014, month: 2, title: "买下球队",
      when: (s, api) => (s => !!s.flags.miamiOption)(s, api),
      history: "2月5日{org_mls}宣布他行使2500万美元期权购买迈阿密扩军球队；因球场问题拖延，2018年1月获批，2020年3月1日{club_miami}首秀。",
      text: "2014年2月，你38岁，身在美国迈阿密。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 2, age: "38", location: "美国迈阿密", sources: 1 },
      choices: [
        { text: "投资经营球队。", history: true, effects: (s, api) => { api.pay(2500); return { add: { id: 'teamco', name: '{club_miami}', value: 5000, stake: 0.5, growth: 0.15, vol: 0.4 }, fame: 6 }; }, result: "史实数据：期权价2500万美元" },
        { text: "放弃期权", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "把球队设在其他城市", alt: true, effects: (s, api) => { api.pay(2500); return { add: { id: 'teamco', name: '扩军球队', value: 4000, stake: 0.5, growth: 0.1, vol: 0.5 } }; }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "转卖期权获利", alt: true, effects: { cash: 3000 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2015', year: 2015, month: null, title: "慈善基金",
      history: "发起以“7”命名的{org_unicef}基金。",
      text: "2015年，你39-40岁，身在全球。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: null, age: "39-40", location: "全球", sources: 1 },
      choices: [
        { text: "深化慈善事业。", history: true, effects: { fame: 3, rel: 6 }, result: "与史实记录一致。" },
        { text: "成立私人基金会", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "只做代言不做公益", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "投资体育科技", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2019', year: 2019, month: 1, title: "入股{club_salford}",
      history: "与“92班”队友一起入股非联赛球队{club_salford}（取得其他股东持有的10%股份）；2025年5月与旧队友牵头新财团接手该俱乐部。",
      text: "2019年1月，你43岁，身在英国索尔福德。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 1, age: "43", location: "英国索尔福德", sources: 1 },
      choices: [
        { text: "与旧队友共同经营球队。", history: true, effects: (s, api) => { api.pay(100); return { add: { id: 'salfordco', name: '{club_salford}', value: 1000, stake: 0.1, growth: 0.08, vol: 0.4 }, rel: 6 }; }, result: "史实数据：10%股份" },
        { text: "只经营迈阿密", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "入股英超球队", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "买回{club_mu}股份", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2023', year: 2023, month: 7, title: "引进超级球星",
      when: (s, api) => ['teamco'].some(id => api.has(id)),
      history: "7月15日{club_miami}签下七届金球奖得主{bk_star}。2025年12月6日球队以3比1获胜，首夺{org_mls}杯，{bk_star}两次助攻。",
      text: "2023年7月，你48岁，身在美国迈阿密。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 7, age: "48", location: "美国迈阿密", sources: 3 },
      choices: [
        { text: "重金引进超级球星。", history: true, effects: { mod: [{ id: 'teamco', mul: 2, growth: 0.2 }], fame: 10 }, result: "与史实记录一致。" },
        { text: "稳步培养年轻球员", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "引进其他欧洲老将", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "出售球队股份", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] },
    { id: 'b2025', year: 2025, month: 6, title: "获封爵士",
      history: "2025年6月入选国王生日授勋名单，获封下级勋位爵士，表彰其对体育和慈善的贡献；11月4日在温莎城堡受勋。",
      text: "2025年6月，你50岁，身在英国温莎城堡。命运的岔路口就在眼前——你会怎么选？",
      basis: { conf: "高", month: 6, age: "50", location: "英国温莎城堡", sources: 2 },
      choices: [
        { text: "接受爵士头衔。", history: true, effects: { fame: 10 }, result: "与史实记录一致。" },
        { text: "低调领奖", alt: true, effects: { energy: 10, charm: 2 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' },
        { text: "婉拒授勋", alt: true, chance: { p: 0.5, ok: { effects: { fame: 5, rel: 3 }, result: '（游戏虚构）这次冒险成功了。' }, fail: { effects: { fame: -2, energy: -10 }, result: '（游戏虚构）结果不如预期。' } } },
        { text: "把荣誉献给慈善伙伴", alt: true, effects: { rel: 5 }, result: '（游戏虚构）你选择了与史实不同的路，时间线从这里分叉。' }
      ] }
  ]
});
