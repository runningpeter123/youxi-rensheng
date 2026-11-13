// 城市数据：每座城市有自己的配色、道路网格、水域类型、地标（见文件末尾 LAYOUTS）。新增城市只需在此注册。
(function (Y) {
  const base = { home: '家', hq: '商务中心', bank: '投资大厅', airport: '机场', cafe: '咖啡馆', garage: '车行', club: '商业俱乐部', lab: '研发园区', harbor: '游轮码头' };
  const C = (o) => Y.registerCity(Object.assign({ labels: Object.assign({}, base, o.labels || {}) }, o, { labels: Object.assign({}, base, o.labels || {}) }));

  C({ id: 'sv', name: '硅谷', country: '美国', seed: 11, flavor: '车库创业、风投和工程师的天堂。',
    palette: { grass: '#5fa04e', grass2: '#4f8a41', road: '#4b4b55', plaza: '#cfc6b0', water: '#3f86c9', sand: '#e3cf98', wall: ['#e9e1cf', '#c9d6e3', '#e6c9a8', '#d7e3c9'], roof: '#8a5a44' },
    labels: { bank: '沙丘路风投', cafe: '大学街咖啡', lab: '科技园区', harbor: '湾区码头', club: '创业者俱乐部' },
    npcNames: [['Alice', 'f'], ['Kevin', 'm'], ['Emily', 'f'], ['Raj', 'm'], ['Sophia', 'f'], ['Brian', 'm'], ['Grace', 'f'], ['Leo', 'm'], ['Mia', 'f'], ['Jason', 'm']] });
  C({ id: 'la', name: '洛杉矶', country: '美国', seed: 23, flavor: '阳光、好莱坞和航天工厂。',
    palette: { grass: '#7aa84a', grass2: '#6a9640', road: '#55525a', plaza: '#e6d4b0', water: '#2f9bd6', sand: '#f0dc9c', wall: ['#f2d7b6', '#f6e7c8', '#e8bfa0', '#d9e8f0'], roof: '#b5653d' },
    labels: { bank: '比佛利投资大厅', cafe: '海滩咖啡', lab: '霍桑航天园区', harbor: '圣佩德罗港', club: '好莱坞俱乐部' },
    npcNames: [['Chloe', 'f'], ['Diego', 'm'], ['Ava', 'f'], ['Tyler', 'm'], ['Isabella', 'f'], ['Marcus', 'm'], ['Zoe', 'f'], ['Ryan', 'm'], ['Luna', 'f'], ['Nate', 'm']] });
  C({ id: 'ny', name: '纽约', country: '美国', seed: 37, flavor: '华尔街、媒体和永不停歇的街道。',
    palette: { grass: '#5a8f52', grass2: '#4c7d46', road: '#3e3e44', plaza: '#bdb6a8', water: '#386f9e', sand: '#c9bb94', wall: ['#b9a08a', '#a7b2bd', '#c7b49c', '#9c8b7c'], roof: '#5a4a44' },
    labels: { hq: '洛克菲乐商务中心', bank: '华尔街投资银行', cafe: '布鲁克林咖啡', club: '曼哈顿俱乐部', harbor: '哈德逊码头', lab: '布鲁克林创新园' },
    npcNames: [['Olivia', 'f'], ['Michael', 'm'], ['Hannah', 'f'], ['Daniel', 'm'], ['Madison', 'f'], ['Chris', 'm'], ['Ella', 'f'], ['Sam', 'm'], ['Lily', 'f'], ['Tom', 'm']] });
  C({ id: 'sea', name: '西雅图', country: '美国', seed: 41, flavor: '咖啡、雨和软件巨头。',
    palette: { grass: '#4f8f5a', grass2: '#427d4c', road: '#4a5058', plaza: '#b9c0bf', water: '#3c7aa8', sand: '#bfb79a', wall: ['#cfd8dc', '#b0bec5', '#d7ccc8', '#c5e1a5'], roof: '#455a64' },
    labels: { hq: '雷德蒙德商务园', cafe: '派克市场咖啡', harbor: '艾略特湾码头', bank: '西雅图投资大厅' },
    npcNames: [['Megan', 'f'], ['Eric', 'm'], ['Abby', 'f'], ['Josh', 'm'], ['Nora', 'f'], ['Paul', 'm'], ['Ivy', 'f'], ['Ben', 'm'], ['Ruby', 'f'], ['Owen', 'm']] });
  C({ id: 'sh', name: '上海', country: '中国', seed: 53, flavor: '外滩、陆家嘴和飞速的城市节奏。',
    palette: { grass: '#62a05a', grass2: '#548c4c', road: '#46464e', plaza: '#d8cdb8', water: '#4a8fb3', sand: '#d9c79a', wall: ['#e8e0d5', '#d0d8e8', '#f0d0c0', '#c8d8d0'], roof: '#7a3b30' },
    labels: { hq: '陆家嘴商务中心', bank: '外滩金融大厅', cafe: '武康路咖啡', club: '外滩会所', lab: '临港产业园', harbor: '国际客运码头', garage: '浦东车行' },
    npcNames: [['林小雨', 'f'], ['陈浩', 'm'], ['王思琪', 'f'], ['张伟', 'm'], ['刘佳怡', 'f'], ['赵磊', 'm'], ['周雨桐', 'f'], ['吴凡', 'm'], ['孙悦', 'f'], ['郑一鸣', 'm']] });
  C({ id: 'tp', name: '台北', country: '中国台湾', seed: 67, flavor: '夜市、芯片和机车洪流。',
    palette: { grass: '#5aa35e', grass2: '#4b8f50', road: '#4a4a50', plaza: '#d6cbb4', water: '#3d8fbf', sand: '#dccb9a', wall: ['#f0e6d2', '#d6e4ec', '#f2d4c2', '#dfe9cf'], roof: '#a0452f' },
    labels: { hq: '信义商务中心', bank: '台北投资大厅', cafe: '永康街咖啡', club: '信义会所', lab: '新竹科学园区', harbor: '基隆港', garage: '机车行' },
    npcNames: [['林怡君', 'f'], ['黄俊杰', 'm'], ['陈雅婷', 'f'], ['李志豪', 'm'], ['张诗涵', 'f'], ['王建宏', 'm'], ['吴佩珊', 'f'], ['蔡明哲', 'm'], ['许嘉玲', 'f'], ['郭家豪', 'm']] });
  C({ id: 'tk', name: '东京', country: '日本', seed: 79, flavor: '霓虹、电车和游戏机。',
    palette: { grass: '#6aa86a', grass2: '#5b955b', road: '#3f3f48', plaza: '#d2c8c0', water: '#3a7fc0', sand: '#d8c8a0', wall: ['#f3eee8', '#e0e4f0', '#f6d6dc', '#dcefe4'], roof: '#33335a' },
    labels: { hq: '丸之内商务中心', bank: '日本桥投资大厅', cafe: '涩谷咖啡', club: '六本木俱乐部', lab: '筑波研究园', harbor: '横滨港', garage: '秋叶原车行' },
    npcNames: [['佐藤 由美', 'f'], ['铃木 健', 'm'], ['高桥 爱', 'f'], ['田中 翔', 'm'], ['中村 美咲', 'f'], ['小林 拓也', 'm'], ['山本 结衣', 'f'], ['加藤 大辉', 'm'], ['吉田 樱', 'f'], ['山田 太郎', 'm']] });

  C({ id: 'hz', name: '杭州', country: '中国', seed: 89, flavor: '西湖、茶园和电商之都。',
    palette: { grass: '#68a862', grass2: '#589454', road: '#4a4a52', plaza: '#d9d0bc', water: '#5a9fb8', sand: '#d8c99c', wall: ['#f2ede2', '#dfe8e0', '#efe0cf', '#d8e2ec'], roof: '#3f4f5a' },
    labels: { hq: '滨江商务中心', bank: '钱江投资大厅', cafe: '龙井茶馆', club: '西湖会所', lab: '未来科技城', harbor: '运河码头', garage: '湖滨车行' },
    npcNames: [['沈晓雯', 'f'], ['钱程', 'm'], ['俞佳', 'f'], ['楼建国', 'm'], ['应雪', 'f'], ['金一鸣', 'm'], ['叶青', 'f'], ['方磊', 'm'], ['蒋婷', 'f'], ['许航', 'm']] });
  C({ id: 'ld', name: '伦敦', country: '英国', seed: 97, flavor: '大钟、红色巴士和泰晤士河。',
    palette: { grass: '#5c9a58', grass2: '#4d8549', road: '#44444c', plaza: '#c9c2b4', water: '#4f7f99', sand: '#bfb59a', wall: ['#e8dccb', '#c9ccd2', '#d9c2a8', '#b9a48e'], roof: '#4a4048' },
    labels: { hq: '金融城商务中心', bank: '金融城投资大厅', cafe: '街角茶室', club: '绅士俱乐部', lab: '东区创新园', harbor: '泰晤士码头', garage: '老牌车行' },
    npcNames: [['Amelia', 'f'], ['Oliver', 'm'], ['Isla', 'f'], ['Harry', 'm'], ['Poppy', 'f'], ['George', 'm'], ['Freya', 'f'], ['Jack', 'm'], ['Evie', 'f'], ['Alfie', 'm']] });
  C({ id: 'mc', name: '曼彻斯特', country: '英国', seed: 103, flavor: '红砖仓库、运河和足球。',
    palette: { grass: '#5a9a52', grass2: '#4b8646', road: '#46464e', plaza: '#c4b8a6', water: '#4a7690', sand: '#b8ab8e', wall: ['#c98e72', '#b9806a', '#d8b49a', '#a8b0b8'], roof: '#5a3a34', accent: '#c62828' },
    labels: { hq: '商务中心', bank: '曼城投资大厅', cafe: '北区咖啡', club: '球迷酒吧', lab: '科学园', harbor: '运河码头', garage: '车行' },
    npcNames: [['Chloe', 'f'], ['Liam', 'm'], ['Jessica', 'f'], ['Callum', 'm'], ['Megan', 'f'], ['Ryan', 'm'], ['Holly', 'f'], ['Connor', 'm'], ['Leah', 'f'], ['Kyle', 'm']] });
  C({ id: 'md', name: '马德里', country: '西班牙', seed: 109, flavor: '阳光广场、王宫和白色球场。',
    palette: { grass: '#8aa84e', grass2: '#7a9644', road: '#55504a', plaza: '#e6d3ae', water: '#4a90b8', sand: '#e8d29a', wall: ['#f3e3c8', '#f0d2b4', '#e8c8a2', '#f6ecd8'], roof: '#b8562f', accent: '#eceff1' },
    labels: { hq: '商务中心', bank: '马德里投资大厅', cafe: '广场咖啡', club: '弗拉门戈俱乐部', lab: '科技园', harbor: '河畔码头', garage: '车行' },
    npcNames: [['Lucía', 'f'], ['Pablo', 'm'], ['Sofía', 'f'], ['Javier', 'm'], ['Carmen', 'f'], ['Diego', 'm'], ['Elena', 'f'], ['Álvaro', 'm'], ['Marta', 'f'], ['Hugo', 'm']] });
  C({ id: 'chi', name: '芝加哥', country: '美国', seed: 113, flavor: '湖滨、风城和社区街道。',
    palette: { grass: '#5c9c56', grass2: '#4d884a', road: '#44444c', plaza: '#c7c0b2', water: '#3f86b8', sand: '#d6c79c', wall: ['#c9b49a', '#b8c2cc', '#d8c4a8', '#a89a8a'], roof: '#4d4044' },
    labels: { hq: '卢普区商务中心', bank: '拉萨尔街投资大厅', cafe: '南区咖啡', club: '湖滨俱乐部', lab: '大学研究园', harbor: '湖滨码头', garage: '车行' },
    npcNames: [['Keisha', 'f'], ['Marcus', 'm'], ['Emily', 'f'], ['Andre', 'm'], ['Maria', 'f'], ['Tyrone', 'm'], ['Grace', 'f'], ['Kevin', 'm'], ['Rosa', 'f'], ['Darnell', 'm']] });
  C({ id: 'dc', name: '华盛顿', country: '美国', seed: 127, flavor: '国会山、纪念碑和政策辩论。',
    palette: { grass: '#62a456', grass2: '#53904a', road: '#4a4a52', plaza: '#ddd6c6', water: '#4a86b0', sand: '#d8cba0', wall: ['#f2efe8', '#dcdfe4', '#e8dccb', '#d0d6cc'], roof: '#5a5a62' },
    labels: { hq: 'K街商务中心', bank: '联邦投资大厅', cafe: '国会山咖啡', club: '政策俱乐部', lab: '智库街区', harbor: '波托马克码头', garage: '车行' },
    npcNames: [['Abigail', 'f'], ['Nathan', 'm'], ['Claire', 'f'], ['Howard', 'm'], ['Jasmine', 'f'], ['Ethan', 'm'], ['Natalie', 'f'], ['Malik', 'm'], ['Sarah', 'f'], ['Gavin', 'm']] });

  // —— 每城独立地图 ——
  // W/H：地图尺寸（格）；water：bottom 海岸在下 / right 海岸在右 / river 河流横穿（ry 为河的首行）
  // h / v：道路（每条 2 格宽）的起始行 / 列；建筑会自动摆进道路围成的街区，门朝下对着道路
  // landmarks：像素地标（通用描述，无商标）；music：背景音乐参数
  const LAYOUTS = {
    sv: { slug: 'guigu', W: 50, H: 38, water: 'bottom', h: [10, 21, 30], v: [9, 24, 38], parks: 0.25,
      landmarks: [{ type: 'clocktower', label: '大学钟楼' }, { type: 'garagehouse', label: '传奇车库' }],
      music: { bpm: 112, root: 60, scale: 'major', lead: 'square', mood: 'bright' } },
    la: { slug: 'luoshanji', W: 54, H: 36, water: 'right', h: [11, 22, 33], v: [8, 20, 33], parks: 0.2,
      landmarks: [{ type: 'ferris', label: '海滨摩天轮' }, { type: 'palms', label: '棕榈大道' }],
      music: { bpm: 100, root: 62, scale: 'mixolydian', lead: 'triangle', mood: 'chill' } },
    ny: { slug: 'niuyue', W: 52, H: 40, water: 'bottom', h: [9, 18, 25, 32], v: [7, 17, 27, 37], parks: 0.1,
      landmarks: [{ type: 'skyline', label: '摩天楼群' }, { type: 'statue', label: '火炬女神像', decor: true }],
      music: { bpm: 128, root: 57, scale: 'minor', lead: 'square', mood: 'busy' } },
    sea: { slug: 'xiyatu', W: 50, H: 38, water: 'right', h: [12, 24, 35], v: [10, 26], parks: 0.35,
      landmarks: [{ type: 'needle', label: '飞碟观景塔' }, { type: 'market', label: '海鲜市场' }],
      music: { bpm: 92, root: 55, scale: 'dorian', lead: 'triangle', mood: 'rainy' } },
    sh: { slug: 'shanghai', W: 52, H: 40, water: 'river', ry: 19, h: [8, 17, 30, 37], v: [10, 24, 38], parks: 0.2,
      landmarks: [{ type: 'tvtower', label: '明珠电视塔' }, { type: 'bund', label: '外滩老建筑群' }],
      music: { bpm: 116, root: 62, scale: 'pentatonic', lead: 'square', mood: 'bright' } },
    tp: { slug: 'taibei', W: 50, H: 39, water: 'river', ry: 27, h: [11, 25, 36], v: [8, 22, 36], parks: 0.25,
      landmarks: [{ type: 'tower101', label: '百层大楼' }, { type: 'nightmarket', label: '夜市' }],
      music: { bpm: 104, root: 64, scale: 'pentatonic', lead: 'triangle', mood: 'warm' } },
    tk: { slug: 'dongjing', W: 56, H: 38, water: 'bottom', h: [9, 19, 30], v: [8, 18, 30, 44], parks: 0.15,
      landmarks: [{ type: 'redtower', label: '红色电视塔' }, { type: 'torii', label: '神社鸟居' }],
      music: { bpm: 136, root: 57, scale: 'insen', lead: 'square', mood: 'busy' } },
    hz: { slug: 'hangzhou', W: 52, H: 38, water: 'river', ry: 25, h: [9, 23, 33], v: [9, 22, 37], parks: 0.35,
      landmarks: [{ type: 'pagoda', label: '湖畔古塔' }, { type: 'archbridge', label: '断桥残雪' }],
      music: { bpm: 96, root: 62, scale: 'pentatonic', lead: 'triangle', mood: 'warm' } },
    ld: { slug: 'lundun', W: 52, H: 39, water: 'river', ry: 21, h: [8, 19, 29, 35], v: [8, 20, 33, 44], parks: 0.25,
      landmarks: [{ type: 'bigclock', label: '议会大钟' }, { type: 'ferris', label: '河畔观景轮' }],
      music: { bpm: 120, root: 57, scale: 'dorian', lead: 'square', mood: 'busy' } },
    mc: { slug: 'manchesite', W: 50, H: 38, water: 'bottom', h: [10, 20, 30], v: [8, 21, 35], parks: 0.2,
      landmarks: [{ type: 'stadium', label: '红魔球场' }, { type: 'warehouse', label: '红砖仓库' }],
      music: { bpm: 124, root: 55, scale: 'mixolydian', lead: 'square', mood: 'bright' } },
    md: { slug: 'madeli', W: 54, H: 38, water: 'right', h: [11, 22, 31], v: [9, 22, 34], parks: 0.3,
      landmarks: [{ type: 'stadium', label: '白色球场' }, { type: 'palace', label: '王宫' }],
      music: { bpm: 132, root: 64, scale: 'minor', lead: 'triangle', mood: 'warm' } },
    chi: { slug: 'zhijiage', W: 52, H: 40, water: 'right', h: [9, 19, 28, 35], v: [7, 18, 30], parks: 0.2,
      landmarks: [{ type: 'bean', label: '镜面豆子雕塑' }, { type: 'skyline', label: '湖滨天际线' }],
      music: { bpm: 108, root: 58, scale: 'dorian', lead: 'triangle', mood: 'chill' } },
    dc: { slug: 'huashengdun', W: 54, H: 38, water: 'bottom', h: [11, 21, 30], v: [9, 22, 35, 46], parks: 0.4,
      landmarks: [{ type: 'dome', label: '国会圆顶' }, { type: 'obelisk', label: '纪念方尖碑' }],
      music: { bpm: 100, root: 60, scale: 'major', lead: 'square', mood: 'bright' } }
  };
  Object.keys(LAYOUTS).forEach(id => { if (Y.cities[id]) { Y.cities[id].layout = LAYOUTS[id]; Y.cities[id].slug = LAYOUTS[id].slug; } });
})(window.YXRS);
