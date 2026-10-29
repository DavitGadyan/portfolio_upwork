// Static checks over out/: lang, single h1, canonical + hreflang, image dimensions, noindex pages, sitemap alternates,
// and the Upwork-compliance scan (no off-platform contact routes or social profile links anywhere).
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const out = join(process.cwd(), 'out');
const html = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (f === "_not-found" || f === "_next") continue; if (statSync(p).isDirectory()) walk(p); else if (f.endsWith('.html')) html.push(p); } })(out);

let errors = 0, redirectPages = 0;
const err = (f, m) => { errors++; console.error(`[verify] ${relative(out, f)}: ${m}`); };
const sentinels = [' the ', ' and ', ' with ', ' your ', ' projects '];

for (const f of html) {
  const s = readFileSync(f, 'utf8');
  const rel = relative(out, f);
  const isEs = rel === 'es/index.html' || rel.startsWith('es/');
  if (/<meta http-equiv="refresh" content="0; url=/.test(s)) { // legacy redirect page (scripts/postbuild.mjs): only needs its canonical
    redirectPages++;
    if (!/<link rel="canonical" href="https?:\/\//.test(s)) err(f, 'redirect page without absolute canonical');
    continue;
  }
  const lang = (s.match(/<html[^>]*\blang="([^"]+)"/) ?? [])[1];
  if (!lang) err(f, 'missing <html lang>');
  else if (isEs && lang !== 'es') err(f, `lang should be es, got ${lang}`);
  else if (!isEs && lang !== 'en') err(f, `lang should be en, got ${lang}`);
  const h1s = (s.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) err(f, `expected 1 <h1>, found ${h1s}`);
  const noindex = /<meta name="robots" content="noindex/i.test(s);
  if (rel === '404.html') { if (!noindex) err(f, 'should be noindex'); continue; }
  if (!/<link rel="canonical" href="/.test(s)) err(f, 'missing canonical');
  for (const hl of ['en', 'es', 'x-default']) if (!new RegExp(`hreflang="${hl}"`, "i").test(s)) err(f, `missing hreflang=${hl}`);
  const imgsNoSize = (s.match(/<img(?![^>]*\bwidth=)[^>]*>/g) ?? []).filter((t) => !/data-nimg="fill"/.test(t));
  if (imgsNoSize.length) err(f, `${imgsNoSize.length} <img> without width`);
  if (isEs) {
    const text = s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ');
    const hits = sentinels.filter((w) => new RegExp(w, 'i').test(text)).length;
    if (hits >= 4) { if (process.env.VERIFY_STRICT_ES) err(f, "looks like untranslated English content"); else console.warn(`[verify] warn: ${rel} looks like untranslated English content`); }
  }
}
// Upwork compliance. The site is linked from an Upwork profile, and Upwork's terms forbid pointing clients to contact
// routes outside the platform: no e-mail, phone, booking or contact services, and no social profile links. Work-sample
// repository links (github.com/<user>/<repo>) are allowed; the bare profile root is not.
const FORBIDDEN = [
  [/mailto:/i, 'mailto: link'],
  [/\btel:\+?\d/i, 'tel: link'],
  [/[\w.+-]+@[\w-]+\.[\w.-]*[a-z]/i, 'e-mail address'],
  [/calendly\.com/i, 'Calendly'],
  [/formspree\.io/i, 'Formspree'],
  [/linkedin\.com\/in\//i, 'LinkedIn profile'],
  [/twitter\.com\//i, 'Twitter/X profile'],
  [/(^|[^.\w])x\.com\//i, 'X profile'],
  [/github\.com\/Davi[dt]Gadyan\/?(?=["'<)\s]|$)/i, 'GitHub profile root'],
  [/toptal/i, 'Toptal'],
  [/David_Gadyan_Resume4/i, 'old CV file name'],
];
const scanned = [...html, ...['llms.txt', 'llms-full.txt', 'es/llms.txt', 'es/llms-full.txt'].map((p) => join(out, p)).filter(existsSync)];
for (const f of scanned) {
  const s = readFileSync(f, 'utf8');
  for (const [re, what] of FORBIDDEN) { const m = s.match(re); if (m) err(f, `forbidden (Upwork policy): ${what} — ${JSON.stringify(m[0].slice(0, 60))}`); }
}
if (existsSync(join(out, 'David_Gadyan_Resume4.pdf'))) err(join(out, 'David_Gadyan_Resume4.pdf'), 'stale CV with contact details is still in out/ (rm -rf out before building)');

const sm = join(out, 'sitemap.xml');
if (existsSync(sm)) {
  const x = readFileSync(sm, 'utf8');
  if (!/xmlns:xhtml/.test(x)) err(sm, 'sitemap missing xhtml namespace');
  const urls = (x.match(/<url>/g) ?? []).length;
  const alts = (x.match(/<xhtml:link/g) ?? []).length;
  if (alts < urls) err(sm, `sitemap: ${urls} urls but only ${alts} alternates`);
}
if (errors) { console.error(`[verify] ${errors} problem(s)`); process.exit(1); }
console.log(`[verify] ${html.length - redirectPages} html files ok (+ ${redirectPages} legacy redirect pages)`);
