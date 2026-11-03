// After `next build` + image optimisation: 404.html for GitHub Pages, .nojekyll, optional CNAME, required-file assertions.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const out = join(process.cwd(), 'out');
if (!existsSync(out)) { console.error('[postbuild] out/ missing'); process.exit(1); }

const notFound = join(out, 'not-found-page', 'index.html');
if (existsSync(notFound)) {
  cpSync(notFound, join(out, '404.html'));
  rmSync(join(out, 'not-found-page'), { recursive: true, force: true });
}
writeFileSync(join(out, '.nojekyll'), '');
rmSync(join(out, '_not-found'), { recursive: true, force: true });
rmSync(join(out, '404'), { recursive: true, force: true }); // Next's default not-found with trailingSlash; 404.html (ours) is what GitHub Pages serves
const domain = (process.env.CUSTOM_DOMAIN ?? '').trim();
if (domain) writeFileSync(join(out, 'CNAME'), `${domain}\n`);
else if (existsSync(join(out, 'CNAME'))) rmSync(join(out, 'CNAME'));

// Short links for the Loom video introductions (data/videos.json): /<short>/ and its lowercase form redirect to the
// video page, e.g. upwork.davidgadyan.com/GenAI and /videos/GenAI → /materials/videos/generative-ai/. GitHub Pages cannot send 301s, so
// this is a meta refresh + canonical page (scripts/verify-out.mjs treats it as a redirect page).
const site = (process.env.NEXT_PUBLIC_SITE_URL || 'https://upwork.davidgadyan.com').replace(/\/+$/, '');
const { videos } = JSON.parse(readFileSync(join(process.cwd(), 'data', 'videos.json'), 'utf8'));
const esc = (u) => u.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
for (const v of videos) {
  const target = `${site}/materials/videos/${v.slug}/`;
  const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Video · David Gadyan</title><meta http-equiv="refresh" content="0; url=${esc(target)}"><link rel="canonical" href="${esc(target)}"><script>location.replace(${JSON.stringify(target)})</script></head><body><p><a href="${esc(target)}">${esc(target)}</a></p></body></html>\n`;
  const names = [...new Set([v.short, v.short.toLowerCase()].flatMap((n) => [n, `videos/${n}`]))];
  const taken = (name) => existsSync(join(out, name, 'index.html')) && !readFileSync(join(out, name, 'index.html'), 'utf8').includes('<title>Video · David Gadyan</title>');
  if (names.some(taken)) { console.error(`[postbuild] short link /${v.short}/ collides with a page`); process.exit(1); }
  for (const name of names) {
    mkdirSync(join(out, name), { recursive: true });
    writeFileSync(join(out, name, 'index.html'), page);
  }
}

// /videos/ itself lists every video introduction.
{
  const target = `${site}/materials/videos/`;
  mkdirSync(join(out, 'videos'), { recursive: true });
  writeFileSync(join(out, 'videos', 'index.html'), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Videos · David Gadyan</title><meta http-equiv="refresh" content="0; url=${esc(target)}"><link rel="canonical" href="${esc(target)}"><script>location.replace(${JSON.stringify(target)})</script></head><body><p><a href="${esc(target)}">${esc(target)}</a></p></body></html>\n`);
}

const required = [
  'index.html', 'es/index.html', '404.html', '.nojekyll',
  'sitemap.xml', 'robots.txt', 'manifest.webmanifest', 'llms.txt', 'llms-full.txt', 'es/llms.txt', 'es/llms-full.txt',
  'portfolio/index.html', 'es/portfolio/index.html', 'blog/index.html', 'es/blog/index.html',
  'cookies/index.html', 'es/cookies/index.html', 'privacy/index.html', 'es/privacy/index.html',
  'CV_David_Gadyan_no_contact.pdf', // the contact-free CV every "Download my CV" link points at (lib/site.ts CV_PATH)
];
const missing = required.filter((f) => !existsSync(join(out, f)));
if (missing.length) { console.error('[postbuild] missing:', missing.join(', ')); process.exit(1); }
console.log(`[postbuild] ok${domain ? ` (CNAME=${domain})` : ' (no CNAME)'}`);
