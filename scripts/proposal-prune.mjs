#!/usr/bin/env node
// Delete expired proposal artifacts: every public/materials/UpworkProposalArtifacts/<id>/ whose payload.json has
// expired, is unreadable, or is missing. Run daily by .github/workflows/proposal-cleanup.yml.
//
//   node scripts/proposal-prune.mjs [--dry-run]
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ARTIFACTS_DIR, isExpired } from './lib/proposal-crypto.mjs';

/** The <id> folders under `dir` that should go, with the reason. Pure apart from reading the files. */
export function findExpired(dir, now = new Date()) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (!statSync(p).isDirectory()) continue; // the viewer index.html and .gitkeep stay
    const file = join(p, 'payload.json');
    if (!existsSync(file)) { out.push({ id: name, reason: 'no payload.json' }); continue; }
    let expiresAt;
    try { expiresAt = JSON.parse(readFileSync(file, 'utf8')).expiresAt; } catch { out.push({ id: name, reason: 'unreadable payload.json' }); continue; }
    if (isExpired(expiresAt, now)) out.push({ id: name, reason: `expired ${expiresAt}` });
  }
  return out;
}

export function prune(dir, { dryRun = false, now = new Date() } = {}) {
  const gone = findExpired(dir, now);
  if (!dryRun) for (const g of gone) rmSync(join(dir, g.id), { recursive: true, force: true });
  return gone;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const dryRun = process.argv.includes('--dry-run');
  const root = join(dirname(fileURLToPath(import.meta.url)), '..');
  const gone = prune(join(root, ARTIFACTS_DIR), { dryRun });
  for (const g of gone) console.log(`[prune] ${dryRun ? 'would remove' : 'removed'} ${g.id} (${g.reason})`);
  console.log(`[prune] ${gone.length} artifact(s) ${dryRun ? 'expired' : 'removed'}`);
}
