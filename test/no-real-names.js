// 扫描游戏源码，禁止出现真实名人名和公司名。戏仿名（如 马斯可、特斯垃、Teslah）不应命中。
const fs = require('fs');
const path = require('path');

const LATIN = [
  ['Elon Musk', /\belon\s+musk\b/i],
  ['Jensen Huang', /\bjensen\s+huang\b/i],
  ['Bill Gates', /\bbill\s+gates\b/i],
  ['Donald Trump', /\bdonald\s+trump\b/i],
  ['Jack Ma', /\bjack\s+ma\b/i],
  ['David Beckham', /\bdavid\s+beckham\b/i],
  ['Barack Obama', /\bbarack\s+obama\b/i],
  ['Masayoshi Son', /\bmasayoshi\s+son\b/i],
  ['Tesla', /\btesla\b/i],
  ['SpaceX', /\bspacex\b/i],
  ['NVIDIA', /\bnvidia\b/i],
  ['PayPal', /\bpaypal\b/i],
  ['Microsoft', /\bmicrosoft\b/i],
  ['Amazon', /\bamazon\b/i],
  ['Google', /\bgoogle\b/i],
  ['Apple', /\bapple\b/i],
  ['TSMC', /\btsmc\b/i],
  ['Sega', /\bsega\b/i],
  ['OpenAI', /\bopenai\b/i],
  ['Alibaba', /\balibaba\b/i],
  ['SoftBank', /\bsoftbank\b/i]
];
// 中文真名用完整词。微软件含「微软」二字，只在后面不是「件」时算命中。
const ZH = [
  ['马斯克', /马斯克/],
  ['黄仁勋', /黄仁勋/],
  ['盖茨', /盖茨/],
  ['特朗普', /特朗普/],
  ['马云', /马云/],
  ['贝克汉姆', /贝克汉姆/],
  ['奥巴马', /奥巴马/],
  ['孙正义', /孙正义/],
  ['特斯拉', /特斯拉/],
  ['英伟达', /英伟达/],
  ['贝宝', /贝宝(?!付)/],
  ['亚马逊', /亚马逊/],
  ['谷歌', /谷歌/],
  ['苹果', /苹果/],
  ['台积电', /台积电/],
  ['世嘉', /世嘉/],
  ['阿里巴巴', /阿里巴巴/],
  ['软银', /软银/],
  ['微软', /微软(?!件)/]
];

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'test') continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(js|html|css|md)$/.test(name)) out.push(p);
  }
  return out;
}

const root = path.resolve(__dirname, '..');
const hits = [];
for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  for (const [label, re] of LATIN.concat(ZH)) {
    re.lastIndex = 0;
    if (re.test(text)) hits.push(rel + ': ' + label);
  }
}
if (hits.length) {
  console.error('real names found:\n' + hits.join('\n'));
  process.exit(1);
}
console.log('no-real-names: ok');
