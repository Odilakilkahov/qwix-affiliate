// Страж публикации. Запуск: node scripts/prepublish-check.mjs  (после `npm run build` в site/)
// Сайт нельзя выкладывать, пока в собранных страницах есть заготовки, пример-оффер или нераскрытые партнёрские ссылки.
// Ответственность за качество лежит на нас (условие владельца 21.09.2026) — поэтому это проверяет код, а не память.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(fileURLToPath(new URL('..', import.meta.url)), 'site', 'dist');
const FORBIDDEN = [
  [/TO BE WRITTEN BY CLAUDE/i, 'заготовка текста'],
  [/\bDRAFT\b/, 'пометка DRAFT'],
  [/lorem ipsum/i, 'lorem ipsum'],
  [/example\.(com|org)\/?["'<\s]/i, 'пример-адрес вместо настоящего'],
];
// запрещённые темы из AGENTS.md — грубая сетка, ловит очевидное
const HARAM = /\b(casino|betting|sportsbook|payday loan|forex signals|dating app|crypto casino|get rich quick)\b/i;

function* html(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* html(p);
    else if (name.endsWith('.html')) yield p;
  }
}

const problems = [];
let pages = 0;
for (const file of html(dist)) {
  pages++;
  const rel = relative(dist, file).replaceAll('\\', '/');
  const src = readFileSync(file, 'utf8');
  const text = src.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ');
  for (const [re, why] of FORBIDDEN) if (re.test(text)) problems.push(`${rel}: ${why}`);
  if (HARAM.test(text)) problems.push(`${rel}: запрещённая тема — «${text.match(HARAM)[0]}»`);

  // Любая партнёрская ссылка обязана идти через /go/ с rel="sponsored", а страница — содержать раскрытие партнёрства.
  const go = [...src.matchAll(/<a\b[^>]*href="\/go\/[^"]+"[^>]*>/gi)].map((m) => m[0]);
  for (const a of go) if (!/rel="[^"]*sponsored[^"]*"/i.test(a)) problems.push(`${rel}: ссылка /go/ без rel="sponsored"`);
  if (go.length && !/affiliate|commission/i.test(text)) problems.push(`${rel}: есть партнёрские ссылки, но нет раскрытия партнёрства`);
}

if (!pages) {
  console.error('Нет собранных страниц: сначала `npm run build` в site/');
  process.exit(2);
}
if (problems.length) {
  console.error(`ПУБЛИКАЦИЯ ЗАПРЕЩЕНА — проблем: ${problems.length} (страниц проверено: ${pages})`);
  for (const p of problems) console.error('  ✗ ' + p);
  process.exit(1);
}
console.log(`Можно публиковать: страниц ${pages}, заготовок и нарушений нет.`);
