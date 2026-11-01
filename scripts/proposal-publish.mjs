#!/usr/bin/env node
// Encrypt one interactive HTML diagram and publish it as a private, 72-hour proposal artifact.
// Reference publisher: UpworkNotificationAssistant ports this flow (docs/upwork-proposal-artifacts.md).
//
//   node scripts/proposal-publish.mjs <file.html> [--title "…"] [--hours 72] [--no-chrome] [--local] [--dry-run]
//
//   default     PUT public/materials/UpworkProposalArtifacts/<id>/payload.json through the GitHub Contents API
//               (env PORTFOLIO_GITHUB_TOKEN). That commit triggers the Pages deploy; the link works ~3 min later.
//   --local     write the payload into this checkout instead (for `npm run build && npm run serve` testing)
//   --dry-run   encrypt and print the link, write nothing
//
// Env: PORTFOLIO_GITHUB_TOKEN, PORTFOLIO_REPO (DavitGadyan/portfolio_upwork), PORTFOLIO_BRANCH (main),
//      PORTFOLIO_SITE_URL (https://davitgadyan.github.io/portfolio_upwork)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { findForbidden } from './lib/forbidden.mjs';
import { ARTIFACTS_DIR, DEFAULT_TTL_HOURS, encryptProposal, newProposalId, proposalLink } from './lib/proposal-crypto.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const MAX_BYTES = 10 * 1024 * 1024;
const COMMITTER = { name: 'DavitGadyan', email: '35612153+DavitGadyan@users.noreply.github.com' };

/** Problems that must stop a publish: forbidden contact content, empty or oversized input. */
export function checkHtml(html) {
  const errors = findForbidden(html).map((h) => `forbidden (Upwork policy): ${h.what} — ${JSON.stringify(h.match)}`);
  if (!html.trim()) errors.push('file is empty');
  if (Buffer.byteLength(html) > MAX_BYTES) errors.push('file is larger than 10 MB');
  return errors;
}

/** src/href values that will not resolve inside the viewer (relative files). Absolute URLs, data: and # are fine. */
export function relativeRefs(html) {
  const refs = [...html.matchAll(/\b(?:src|href)\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1].trim());
  return refs.filter((r) => !/^(https?:|data:|blob:|#|javascript:|about:|\/\/)/i.test(r));
}

export function titleOf(html) {
  return (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '').trim();
}

function parseArgs(argv) {
  const o = { file: '', title: '', hours: DEFAULT_TTL_HOURS, chrome: true, local: false, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--title') o.title = argv[++i] ?? '';
    else if (a === '--hours') o.hours = Number(argv[++i]);
    else if (a === '--no-chrome') o.chrome = false;
    else if (a === '--local') o.local = true;
    else if (a === '--dry-run') o.dryRun = true;
    else if (!a.startsWith('--') && !o.file) o.file = a;
    else throw new Error(`unknown argument ${a}`);
  }
  if (!o.file) throw new Error('usage: proposal-publish.mjs <file.html> [--title …] [--hours 72] [--no-chrome] [--local] [--dry-run]');
  if (!(o.hours > 0)) throw new Error('--hours must be a positive number');
  return o;
}

async function putViaGitHub({ token, repo, branch, path, payload, id }) {
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'proposal-publish',
    },
    body: JSON.stringify({
      message: `Add proposal artifact ${id}`,
      content: Buffer.from(JSON.stringify(payload) + '\n').toString('base64'),
      branch,
      committer: COMMITTER,
      author: COMMITTER,
    }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return (await res.json()).commit?.sha ?? '';
}

async function main() {
  const o = parseArgs(process.argv.slice(2));
  const html = readFileSync(o.file, 'utf8');
  const errors = checkHtml(html);
  if (errors.length) { for (const e of errors) console.error(`[proposal] ${e}`); process.exit(1); }
  for (const r of relativeRefs(html)) console.warn(`[proposal] warn: relative reference "${r}" will not load; inline it or use an absolute URL`);

  const title = o.title || titleOf(html) || 'Proposal';
  const id = newProposalId();
  const { payload, key } = encryptProposal({ html, title, chrome: o.chrome, ttlHours: o.hours });
  const siteUrl = process.env.PORTFOLIO_SITE_URL || 'https://davitgadyan.github.io/portfolio_upwork';
  const link = proposalLink(o.local ? 'http://localhost:4173' : siteUrl, id, key);
  const path = `${ARTIFACTS_DIR}/${id}/payload.json`;

  if (o.dryRun) {
    console.log(`[proposal] dry run: ${id} "${title}" expires ${payload.expiresAt}\n${link}`);
    return;
  }
  if (o.local) {
    mkdirSync(join(ROOT, ARTIFACTS_DIR, id), { recursive: true });
    writeFileSync(join(ROOT, path), JSON.stringify(payload) + '\n');
  } else {
    const token = process.env.PORTFOLIO_GITHUB_TOKEN;
    if (!token) throw new Error('PORTFOLIO_GITHUB_TOKEN is not set');
    const sha = await putViaGitHub({
      token, id, payload, path,
      repo: process.env.PORTFOLIO_REPO || 'DavitGadyan/portfolio_upwork',
      branch: process.env.PORTFOLIO_BRANCH || 'main',
    });
    console.log(`[proposal] committed ${sha.slice(0, 7)}; the link works once the Pages deploy finishes (~3 min)`);
  }
  // Local, git-ignored record so links can be found again. Keys never go into git.
  const log = join(ROOT, '.proposals.local.json');
  const entries = existsSync(log) ? JSON.parse(readFileSync(log, 'utf8') || '[]') : [];
  entries.push({ id, title, link, createdAt: payload.createdAt, expiresAt: payload.expiresAt });
  writeFileSync(log, JSON.stringify(entries, null, 2) + '\n');
  console.log(`[proposal] ${id} "${title}" expires ${payload.expiresAt}\n${link}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(`[proposal] ${e.message}`); process.exit(1); });
}
