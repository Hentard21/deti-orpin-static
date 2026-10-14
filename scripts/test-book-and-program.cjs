const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const box = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/data/october-program.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { exports: box.exports, module: box, Date });
const { contestPhase, creativeContest, octoberProgram } = box.exports;
for (const [date, expected] of [
  ['2026-09-14T20:59:59Z', 'pending'], ['2026-09-14T21:00:00Z', 'pending'],
  ['2026-10-14T12:00:00Z', 'pending'], ['2026-10-15T20:59:59Z', 'pending'],
  ['2026-10-15T21:00:00Z', 'pending'], ['2026-12-08T12:00:00Z', 'pending'],
]) assert.equal(contestPhase(new Date(date)), expected, date);
assert.equal(creativeContest.nominations.length, 5);
assert.equal(creativeContest.age, '7–17 лет');
assert.equal(octoberProgram.email, 'anocentrdetei@yandex.ru');
assert.equal(octoberProgram.organizers.length, 2);
assert.equal(octoberProgram.status, 'cancelled');
assert.equal(creativeContest.scheduleStatus, 'pending');
const moscowBox = { exports: {} };
vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.join(root, 'src/data/moscow-program.ts'), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText,
  { exports: moscowBox.exports, module: moscowBox });
const { moscowProgram } = moscowBox.exports;
assert.equal(moscowProgram.title, 'Всероссийский форум «Симфония единства и героизма»');
assert.equal(moscowProgram.dates, '8–9 декабря 2026 года');
assert.equal(moscowProgram.stages.length, 4);
const expectedStages = [
  ['tournament', '2026-12-08', '19:00–20:00', 'Конференц-зал Центра'],
  ['rehearsal', '2026-12-08', '20:00–22:00', 'Под куполом павильона №34 «Космос»'],
  ['opening', '2026-12-09', '10:00–11:00', 'Под куполом павильона №34'],
  ['awards', '2026-12-09', '11:00–13:00', 'Конференц-зал Павильона'],
];
moscowProgram.stages.forEach((stage, index) => {
  assert.deepEqual([stage.id, stage.dateTime, stage.time, stage.room], expectedStages[index]);
});
const html = route => {
  const candidate = fs.existsSync(path.join(root, 'out', route, 'index.html'))
    ? path.join(root, 'out', route, 'index.html')
    : path.join(root, '.next/server/app', route ? route + '.html' : 'index.html');
  return fs.readFileSync(candidate, 'utf8');
};
for (const route of ['', 'route']) {
  const page = html(route);
  assert.ok(page.includes('8–9 декабря 2026'));
  assert.ok(page.includes('Симфония единства и героизма'));
  let lastPosition = -1;
  for (const stage of moscowProgram.stages) {
    const position = page.indexOf(`data-stage-id="${stage.id}"`);
    assert.ok(position > lastPosition, stage.id);
    lastPosition = position;
    for (const value of [stage.date, stage.time, stage.room, stage.description]) assert.ok(page.includes(value), value);
  }
  for (const stale of ['26–28 октября 2026', '27 октября 2026', '7–8 декабря 2026', '7 декабря 2026', 'stalingrad-tournament-2026-signed.pdf'])
    assert.ok(!page.includes(stale), stale);
  if (route === '') assert.ok(page.includes('Новые сроки конкурса уточняются'));
}
const contest = html('creativity/contests');
for (const text of ['Моя Родина', 'Новые сроки конкурса уточняются', '7–17', 'ПЯТЬ НОМИНАЦИЙ', 'anocentrdetei@yandex.ru'])
  assert.ok(contest.includes(text), text);
for (const stale of ['планшет', 'ноутбук', '1 200+', 'Анна Петрова', '1 сентября 2026', '30 сентября 2026'])
  assert.ok(!contest.includes(stale), stale);
assert.ok(!fs.readFileSync(path.join(root, 'src/app/creativity/contests/apply/page.tsx'), 'utf8').includes('formspree'));
for (const route of ['', 'route', 'about', 'contact', 'creativity', 'creativity/contests', 'creativity/contests/apply']) {
  assert.ok(!html(route).includes('15 октября 2026'), route + ': stale deadline');
  assert.ok(!html(route).includes('Организаторы октябрьского'), route + ': stale organizers');
}
assert.ok(!html('creativity/contests/apply').includes('<form'), 'pending contest must not accept entries');
assert.ok(html('book').includes('Диалог поколений'));
assert.ok(html('book').includes('49f5622db9115623'), 'Yandex verification');
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'src/data/book-manifest.json'), 'utf8'));
assert.equal(manifest.spreadCount, Math.ceil((manifest.interiorPages + 1) / 2));
assert.equal(manifest.families.length, manifest.familyCount);
const exists = relative => assert.ok(fs.existsSync(path.join(root, 'public', relative)), relative);
exists(manifest.download);
exists(manifest.cover);
exists(octoberProgram.tournament.document);
for (let n = 1; n <= manifest.spreadCount; n++)
  exists(manifest.spreadPattern.replace('{number}', String(n).padStart(3, '0')));
let previousEnd = 0;
const ids = new Set();
for (const family of manifest.families) {
  assert.ok(!ids.has(family.id), family.id); ids.add(family.id);
  assert.ok(family.startPage > previousEnd && family.endPage >= family.startPage);
  assert.ok(family.endPage <= manifest.interiorPages);
  previousEnd = family.endPage;
}
console.log('PASS: Moscow forum 8–9 December, four ordered stages, pending contest, cancelled Volgograd, Yandex tag, book assets and page ranges.');
console.log('Editorial identity verification is not covered by this technical test.');
