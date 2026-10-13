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
  ['2026-09-14T20:59:59Z', 'before'], ['2026-09-14T21:00:00Z', 'open'],
  ['2026-10-05T12:00:00Z', 'open'], ['2026-10-15T20:59:59Z', 'open'],
  ['2026-10-15T21:00:00Z', 'closed'], ['2026-10-28T12:00:00Z', 'closed'],
]) assert.equal(contestPhase(new Date(date)), expected, date);
assert.equal(creativeContest.nominations.length, 5);
assert.equal(creativeContest.age, '7–17 лет');
assert.equal(octoberProgram.email, 'anocentrdetei@yandex.ru');
assert.equal(octoberProgram.organizers.length, 2);
const html = route => {
  const candidate = fs.existsSync(path.join(root, 'out', route, 'index.html'))
    ? path.join(root, 'out', route, 'index.html')
    : path.join(root, '.next/server/app', route ? route + '.html' : 'index.html');
  return fs.readFileSync(candidate, 'utf8');
};
for (const route of ['', 'route']) {
  assert.ok(html(route).includes('26–28 октября 2026'));
  assert.ok(html(route).includes('27 октября 2026'));
}
const contest = html('creativity/contests');
for (const text of ['Моя Родина', '15 октября 2026', '7–17', 'ПЯТЬ НОМИНАЦИЙ', 'anocentrdetei@yandex.ru'])
  assert.ok(contest.includes(text), text);
for (const stale of ['планшет', 'ноутбук', '1 200+', 'Анна Петрова', '1 сентября 2026', '30 сентября 2026'])
  assert.ok(!contest.includes(stale), stale);
assert.ok(!fs.readFileSync(path.join(root, 'src/app/creativity/contests/apply/page.tsx'), 'utf8').includes('formspree'));
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
console.log('PASS: Moscow deadlines, five nominations, recipient, dates, static HTML, Yandex tag, book assets and page ranges.');
console.log('Editorial identity verification is not covered by this technical test.');
