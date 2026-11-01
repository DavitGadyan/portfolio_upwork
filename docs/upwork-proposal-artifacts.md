# Private proposal artifacts (UpworkProposalArtifacts)

Each Upwork proposal can link the client to one interactive HTML diagram on this portfolio. The link is private
(it carries its own decryption key) and stops opening 72 hours after upload. The files are deleted by a daily job.

The diagram is produced and published by **UpworkNotificationAssistant**. This repository only hosts the viewer, checks
what gets published and cleans up. This document is the contract between the two.

## How it works

```
UpworkNotificationAssistant                     portfolio_upwork (public repo, GitHub Pages)
  diagram.html                                     public/materials/UpworkProposalArtifacts/
    │ 1. contact-free check                          index.html          ← viewer (this repo)
    │ 2. gzip + AES-256-GCM, random 32-byte key      <id>/payload.json   ← ciphertext only
    │ 3. PUT payload.json via GitHub Contents API ──▶  (commit triggers pages.yml, live in ~3 min)
    ▼
  link = <site>/materials/UpworkProposalArtifacts/#p=<id>&k=<key>   → sent to the client in Upwork
```

- Everything after `#` stays in the browser and is never sent to GitHub. The repository and the site therefore only
  ever hold ciphertext, which is useless without the link.
- The viewer fetches `./<id>/payload.json`, decrypts it with WebCrypto, and shows the diagram in a sandboxed iframe
  under a slim bar ("David Gadyan · Proposal: <title>", "Link expires in 2d 05h").
- The expiry is sealed inside the ciphertext, so editing the outer `expiresAt` cannot extend a link.
- `.github/workflows/proposal-cleanup.yml` runs daily at 03:23 UTC, removes expired `<id>/` folders and redeploys.
- Limits: anyone the client forwards the full link to can open it until it expires. Deleted ciphertext stays in git
  history, which is harmless without the key.

## Payload contract (v1)

Path: `public/materials/UpworkProposalArtifacts/<id>/payload.json`

```json
{ "v": 1, "alg": "AES-256-GCM", "createdAt": "2026-11-02T10:00:00.000Z", "expiresAt": "2026-11-05T10:00:00.000Z",
  "iv": "<base64url, 12 bytes>", "ct": "<base64url, ciphertext followed by the 16-byte GCM tag>" }
```

| Field | Rule |
| --- | --- |
| `<id>` | `p-` plus 6 to 32 chars of `[a-z0-9]`, random. Never the client's name or the job title: folder names are public. |
| key | 32 random bytes, base64url without padding. Only in the link, never stored in either repo. |
| `iv` | 12 random bytes per payload, base64url. |
| `ct` | `AES-256-GCM(key, iv, gzip(utf8(JSON.stringify(inner))))` with the tag appended (Node: `cipher.getAuthTag()`). |
| inner | `{ "title": string, "html": string, "createdAt": ISO, "expiresAt": ISO, "chrome": boolean }` |
| `expiresAt` | `createdAt + 72h`, identical inside and outside the ciphertext. |
| `chrome` | `true` shows the slim title bar; `false` shows the diagram alone. |

The build (`scripts/verify-out.mjs`) fails if a payload has another shape or holds a plaintext `html`, `title` or
key field.

Link: `https://davitgadyan.github.io/portfolio_upwork/materials/UpworkProposalArtifacts/#p=<id>&k=<key>`

## Rules for the HTML

- **Self-contained single file.** Inline CSS, JS and images (data: URIs), or load them from absolute https URLs such as
  Google Fonts or a CDN. Relative paths (`src="chart.png"`) will not load.
- **No storage, no parent access.** The diagram runs in `<iframe sandbox="allow-scripts allow-popups
  allow-popups-to-escape-sandbox allow-modals allow-downloads">` without same-origin, so `localStorage`,
  `sessionStorage`, cookies and `parent.*` throw. Wrap any storage use in try/catch.
- **Upwork contact-free.** No e-mail addresses, `mailto:`, `tel:`, Calendly, Formspree, LinkedIn/X profiles, the
  GitHub profile root or Toptal. The list is `scripts/lib/forbidden.mjs`. The build cannot see inside ciphertext, so
  **the publisher must run this check on the plaintext and refuse to publish on any hit.**
- Under 10 MB. A typical diagram is about 15 KB, or 5 KB after gzip.

## GitHub token

Create it once in GitHub under Settings, Developer settings, Personal access tokens, **Fine-grained tokens**, then
Generate new token:

| Setting | Value |
| --- | --- |
| Token name | `UpworkNotificationAssistant → portfolio_upwork` |
| Expiration | 90 days (set a reminder to rotate it) |
| Repository access | Only select repositories → `DavitGadyan/portfolio_upwork` |
| Permissions | Repository permissions → **Contents: Read and write**. Metadata: Read-only is added automatically. Nothing else. |

Store it in UpworkNotificationAssistant's git-ignored `.env`:

```
PORTFOLIO_GITHUB_TOKEN=github_pat_...
PORTFOLIO_REPO=DavitGadyan/portfolio_upwork
PORTFOLIO_BRANCH=main
PORTFOLIO_SITE_URL=https://davitgadyan.github.io/portfolio_upwork
```

A commit made with this token triggers `pages.yml` by itself, so no Actions permission is needed. The token can only
write to this one repository. If it leaks, revoke it in the same settings page and create a new one.

## Publishing call (GitHub Contents API)

```
PUT https://api.github.com/repos/{PORTFOLIO_REPO}/contents/public/materials/UpworkProposalArtifacts/{id}/payload.json
Authorization: Bearer {PORTFOLIO_GITHUB_TOKEN}
Accept: application/vnd.github+json
X-GitHub-Api-Version: 2022-11-28

{ "message": "Add proposal artifact {id}", "branch": "main",
  "content": base64(JSON.stringify(payload) + "\n"),
  "committer": { "name": "DavitGadyan", "email": "<GitHub no-reply address>" },
  "author":    { "name": "DavitGadyan", "email": "<GitHub no-reply address>" } }
```

A `201` response means it was committed. The link opens after the Pages deploy finishes, about 3 minutes later.
`401` or `403` means the token is wrong, expired or missing Contents write. `422` means the id already exists, so
generate a new one. Deletion is handled here by the daily job; the publisher never deletes.

## TypeScript reference for UpworkNotificationAssistant

Port of `scripts/lib/proposal-crypto.mjs` and `scripts/proposal-publish.mjs`. It needs only Node built-ins and fetch.

```ts
// lib/proposals/publishArtifact.ts
import { createCipheriv, randomBytes } from 'node:crypto';
import { gzipSync } from 'node:zlib';

const TTL_HOURS = 72;
const DIR = 'public/materials/UpworkProposalArtifacts';
const NOREPLY = '35612153+DavitGadyan@users.noreply.github.com';

// Keep in sync with portfolio_upwork/scripts/lib/forbidden.mjs
const FORBIDDEN: [RegExp, string][] = [
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
];

export function forbiddenHits(html: string): string[] {
  return FORBIDDEN.flatMap(([re, what]) => { const m = html.match(re); return m ? [`${what}: ${m[0].slice(0, 60)}`] : []; });
}

function newId(): string {
  const a = 'abcdefghijklmnopqrstuvwxyz0123456789';
  return 'p-' + [...randomBytes(10)].map((b) => a[b % a.length]).join('');
}

export function encryptArtifact(html: string, title: string, opts: { chrome?: boolean; ttlHours?: number; now?: Date } = {}) {
  const now = opts.now ?? new Date();
  const createdAt = now.toISOString();
  const expiresAt = new Date(now.getTime() + (opts.ttlHours ?? TTL_HOURS) * 3_600_000).toISOString();
  const inner = { title, html, createdAt, expiresAt, chrome: opts.chrome !== false };
  const key = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(gzipSync(Buffer.from(JSON.stringify(inner), 'utf8'))), cipher.final(), cipher.getAuthTag()]);
  return {
    payload: { v: 1, alg: 'AES-256-GCM', createdAt, expiresAt, iv: iv.toString('base64url'), ct: ct.toString('base64url') },
    key: key.toString('base64url'),
  };
}

export async function publishArtifact(html: string, title: string, opts: { chrome?: boolean; dryRun?: boolean } = {}) {
  const hits = forbiddenHits(html);
  if (hits.length) throw new Error(`diagram blocked (Upwork contact-free rule): ${hits.join('; ')}`);
  const id = newId();
  const { payload, key } = encryptArtifact(html, title, opts);
  const site = (process.env.PORTFOLIO_SITE_URL ?? 'https://davitgadyan.github.io/portfolio_upwork').replace(/\/+$/, '');
  const link = `${site}/materials/UpworkProposalArtifacts/#p=${id}&k=${key}`;
  if (opts.dryRun) return { id, link, expiresAt: payload.expiresAt, committed: false, payload };

  const token = process.env.PORTFOLIO_GITHUB_TOKEN;
  if (!token) throw new Error('PORTFOLIO_GITHUB_TOKEN is not set');
  const repo = process.env.PORTFOLIO_REPO ?? 'DavitGadyan/portfolio_upwork';
  const res = await fetch(`https://api.github.com/repos/${repo}/contents/${DIR}/${id}/payload.json`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'upwork-assistant' },
    body: JSON.stringify({
      message: `Add proposal artifact ${id}`,
      branch: process.env.PORTFOLIO_BRANCH ?? 'main',
      content: Buffer.from(JSON.stringify(payload) + '\n').toString('base64'),
      committer: { name: 'DavitGadyan', email: NOREPLY },
      author: { name: 'DavitGadyan', email: NOREPLY },
    }),
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return { id, link, expiresAt: payload.expiresAt, committed: true };
}
```

Never log the full link next to the job's public data in anything that leaves the machine. The key is the access
control.

## Testing from UpworkNotificationAssistant

1. **Contract test, no network.** Encrypt with `encryptArtifact`, then decrypt with this repo's reference decryptor:
   ```ts
   // @ts-expect-error plain .mjs
   import { decryptProposal, validatePayloadShape } from '../../portfolio_upwork/scripts/lib/proposal-crypto.mjs';
   const { payload, key } = encryptArtifact('<h1>x</h1>', 'T');
   expect(validatePayloadShape(payload)).toEqual([]);
   expect(decryptProposal(payload, key).html).toBe('<h1>x</h1>');
   ```
2. **Blocked content.** `publishArtifact('<p>a@b.com</p>', 'T')` must throw before any network call.
3. **Live once.** Publish a harmless test diagram, wait about 3 minutes and open the printed link. The diagram shows
   with the bar. The same link without `&k=…` says "This link is private".

## Operating this repository

| Task | Command |
| --- | --- |
| Publish from here (same flow) | `PORTFOLIO_GITHUB_TOKEN=… npm run proposal:publish -- diagram.html [--title "…"] [--no-chrome]` |
| Try locally without GitHub | `npm run proposal:publish -- diagram.html --local`, then `npm run build && npm run serve` |
| List what would be deleted | `npm run proposal:prune -- --dry-run` |
| Delete now | Actions → "Remove expired proposal artifacts" → Run workflow |

Links created from here are also written to the git-ignored `.proposals.local.json`.
