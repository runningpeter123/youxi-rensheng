// 通用随机事件 / 时代事件。effects 可以是对象，也可以是 (state, api) => 对象。
(function (Y) {
  Y.events = [
    { id: 'dotcom', year: 2000, title: '互联网泡沫破裂', text: '{co_nasdaq}从高点暴跌，大量 .com 公司一夜归零。你的持仓也受到冲击（市值 -40%）。',
      auto: (s, api) => { api.mulAll(0.6); return {}; },
      choices: [
        { text: '逆势抄底：拿出三成现金买入指数基金', effects: (s, api) => { const amt = s.cash * 0.3; api.addHolding('index', amt); return { cash: -amt }; }, result: '别人恐惧时你贪婪。' },
        { text: '捂紧现金，熬过寒冬', effects: { energy: -10 }, result: '你睡得不太好，但现金还在。' },
        { text: '给团队打气，承诺不裁员', effects: { rel: 8, energy: -15 }, result: '团队士气大振。' }
      ] },
    { id: 'gfc', year: 2008, title: '全球金融危机', text: '{co_lehman}倒闭，信贷冻结，几乎所有资产都在下跌（市值 -35%）。',
      auto: (s, api) => { api.mulAll(0.65); return {}; },
      choices: [
        { text: '削减开支，保住现金流', effects: { rel: -5 }, result: '账本好看了一些，员工有些不安。' },
        { text: '咬牙继续投入研发', effects: (s, api) => { api.growthAll(0.03); return { energy: -20 }; }, result: '危机过后，你的产品会更有竞争力。' }
      ] },
    { id: 'covid', year: 2020, title: '新冠疫情', text: '全球进入居家办公时代，供应链大乱。',
      choices: [
        { text: '全员远程办公', effects: { energy: 10, rel: 3 }, result: '大家在视频会议里见面。' },
        { text: '想办法让工厂尽快复工', effects: (s, api) => { api.mulMain(1.1); return { fame: 3, rel: -3 }; }, result: '产能领先，但争议不少。' }
      ] },
    // 随机事件（无 year 字段，每年有概率触发，可重复，带冷却）
    { id: 'interview', title: '媒体专访', text: '一家知名杂志想给你做封面专访。',
      choices: [
        { text: '坦诚分享失败经历', effects: { fame: 4, charm: 2 }, result: '读者觉得你很真实。' },
        { text: '大胆画饼：十年后改变世界', chance: { p: s => 0.4 + s.fame / 200, ok: { effects: { fame: 8 }, result: '标题引爆全网！' }, fail: { effects: { fame: -3 }, result: '被评论区群嘲“吹牛”。' } } },
        { text: '婉拒，专心做事', effects: { energy: 5 }, result: '清净。' }
      ] },
    { id: 'gala', title: '慈善晚宴', text: '你收到一场慈善晚宴的邀请函。',
      choices: [
        { text: '捐出现金的 5%', effects: s => ({ cash: -Math.max(0, s.cash * 0.05), fame: 5, rel: 6 }), result: '掌声和闪光灯。' },
        { text: '出席但不捐款', effects: { rel: 2 }, result: '你认识了几位新朋友。' },
        { text: '在家睡觉', effects: { energy: 10 } }
      ] },
    { id: 'insomnia', title: '连续失眠', text: '最近压力很大，你已经三天没睡好了。',
      choices: [
        { text: '吃点褪黑素，早点睡', effects: { energy: 15 } },
        { text: '既然睡不着，那就继续工作', effects: (s, api) => { api.mulMain(1.03); return { energy: -15 }; }, result: '效率很高，黑眼圈也很重。' }
      ] },
    { id: 'reunion', title: '老同学聚会', text: '大学同学组织了一场聚会。',
      choices: [
        { text: '去！顺便请大家吃饭', effects: { rel: 8, cash: -1, energy: 5 }, result: '大家聊起当年的宿舍趣事。' },
        { text: '太忙，发个红包', effects: { rel: 2, cash: -0.5 } }
      ] },
    { id: 'meme', title: '你成了表情包', text: '你在发布会上的一个表情被做成表情包，在网上疯传。',
      choices: [
        { text: '自己也转发，玩梗', effects: { fame: 6, charm: 3 }, result: '网友：这老板有点可爱。' },
        { text: '让公关部低调处理', effects: { fame: 1 } }
      ] },
    { id: 'poach', title: '竞争对手挖角', text: '对手开出双倍薪水，想挖走你的核心工程师。',
      when: (s, api) => api.activeCompanies().length > 0,
      choices: [
        { text: '加薪留人', effects: { cash: -20, rel: 4 }, result: '他留下了，并且干劲十足。' },
        { text: '放他走，祝福他', effects: (s, api) => { api.growthMain(-0.02); return { rel: 2 }; } },
        { text: '反手挖对方的人', chance: { p: s => 0.35 + s.charm / 200, ok: { effects: (s, api) => { api.growthMain(0.03); return { fame: 2 }; }, result: '对方的明星工程师加入了你。' }, fail: { effects: { rel: -4 }, result: '没挖到，还上了科技新闻。' } } }
      ] },
    { id: 'family', title: '家人的生日', text: '今天是家人的生日，但公司也有一场重要会议。',
      choices: [
        { text: '推掉会议回家', effects: { rel: 8, energy: 10 }, result: '蛋糕很甜。' },
        { text: '开完会再说', effects: (s, api) => { api.mulMain(1.02); return { rel: -6 }; }, result: '回家时大家已经睡了。' }
      ] }
  ];
})(window.YXRS);
