import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  decryptProposal, encryptProposal, ID_RE, isExpired, newProposalId, proposalLink, validatePayloadShape,
} from '../../scripts/lib/proposal-crypto.mjs';
import { checkHtml, relativeRefs, titleOf } from '../../scripts/proposal-publish.mjs';
import { findExpired, prune } from '../../scripts/proposal-prune.mjs';

const HTML = '<!doctype html><html><head><title>Upwork Job Search Assistant</title></head><body><h1>Flow</h1><script>window.x=1</script></body></html>';
const NOW = new Date('2026-11-02T10:00:00Z');

// The viewer's own decrypt code, lifted out of the page so the test runs exactly what the browser runs.
const viewer = readFileSync(join(__dirname, '../../public/materials/UpworkProposalArtifacts/index.html'), 'utf8');
const decryptSrc = viewer.match(/\/\/ BEGIN-DECRYPT[^\n]*\n([\s\S]*?)\/\/ END-DECRYPT/)![1];
const viewerOpen = new Function(`${decryptSrc}; return openPayload;`)() as (p: unknown, k: string) => Promise<Record<string, unknown>>;

describe('proposal payload contract', () => {
  it('round-trips through the Node reference decryptor', () => {
    const { payload, key } = encryptProposal({ html: HTML, title: 'Job A', now: NOW });
    expect(validatePayloadShape(payload)).toEqual([]);
    expect(payload.expiresAt).toBe('2026-11-05T10:00:00.000Z');
    const doc = decryptProposal(payload, key);
    expect(doc).toMatchObject({ title: 'Job A', html: HTML, expiresAt: payload.expiresAt, chrome: true });
  });

  it('decrypts with the viewer page code (WebCrypto + DecompressionStream)', async () => {
    const { payload, key } = encryptProposal({ html: HTML, title: 'Job B', chrome: false, now: NOW });
    const doc = await viewerOpen(payload, key);
    expect(doc).toMatchObject({ title: 'Job B', html: HTML, chrome: false });
  });

  it('rejects a wrong key in both decryptors', async () => {
    const { payload } = encryptProposal({ html: HTML });
    const other = encryptProposal({ html: HTML }).key;
    expect(() => decryptProposal(payload, other)).toThrow();
    await expect(viewerOpen(payload, other)).rejects.toThrow();
  });

  it('keeps the sealed expiry when the outer one is edited', () => {
    const { payload, key } = encryptProposal({ html: HTML, now: NOW });
    const tampered = { ...payload, expiresAt: '2099-01-01T00:00:00.000Z' };
    expect(decryptProposal(tampered, key).expiresAt).toBe('2026-11-05T10:00:00.000Z');
  });

  it('detects tampered ciphertext', () => {
    const { payload, key } = encryptProposal({ html: HTML });
    const ct = Buffer.from(payload.ct, 'base64url');
    ct[0] ^= 1;
    expect(() => decryptProposal({ ...payload, ct: ct.toString('base64url') }, key)).toThrow();
  });

  it('stores no plaintext in the public payload', () => {
    const { payload, key } = encryptProposal({ html: HTML, title: 'Secret job title' });
    const json = JSON.stringify(payload);
    expect(json).not.toContain('Secret job title');
    expect(json).not.toContain('Flow');
    expect(json).not.toContain(key);
    expect(validatePayloadShape({ ...payload, html: HTML })).toContain('plaintext field "html" must not be stored');
  });

  it('builds random ids and fragment-only links', () => {
    const id = newProposalId();
    expect(id).toMatch(ID_RE);
    expect(newProposalId()).not.toBe(id);
    expect(proposalLink('https://davitgadyan.github.io/portfolio_upwork/', id, 'KEY'))
      .toBe(`https://davitgadyan.github.io/portfolio_upwork/materials/UpworkProposalArtifacts/#p=${id}&k=KEY`);
  });

  it('treats invalid dates as expired', () => {
    expect(isExpired('nonsense')).toBe(true);
    expect(isExpired('2026-11-05T10:00:00Z', NOW)).toBe(false);
    expect(isExpired('2026-11-02T09:59:59Z', NOW)).toBe(true);
  });
});

describe('publisher checks', () => {
  it('blocks off-platform contact content before encryption', () => {
    expect(checkHtml(HTML)).toEqual([]);
    expect(checkHtml(HTML.replace('Flow', 'write to someone@example.com')).join()).toMatch(/e-mail address/);
    expect(checkHtml(HTML.replace('Flow', '<a href="https://calendly.com/x">book</a>')).join()).toMatch(/Calendly/);
  });

  it('flags relative assets and reads the title', () => {
    const html = '<img src="chart.png"><link href="https://fonts.googleapis.com/css2"><a href="#top"></a><img src="data:image/png;base64,AA">';
    expect(relativeRefs(html)).toEqual(['chart.png']);
    expect(titleOf(HTML)).toBe('Upwork Job Search Assistant');
  });
});

describe('daily prune', () => {
  let dir = '';
  afterEach(() => { if (dir) rmSync(dir, { recursive: true, force: true }); });

  it('removes only expired, broken or empty folders and keeps the viewer', () => {
    dir = mkdtempSync(join(tmpdir(), 'proposals-'));
    writeFileSync(join(dir, 'index.html'), '<!doctype html>');
    writeFileSync(join(dir, '.gitkeep'), '');
    const put = (id: string, body: string | null) => {
      mkdirSync(join(dir, id));
      if (body !== null) writeFileSync(join(dir, id, 'payload.json'), body);
    };
    put('p-live000001', JSON.stringify(encryptProposal({ html: HTML, now: NOW }).payload));
    put('p-old0000001', JSON.stringify(encryptProposal({ html: HTML, now: new Date('2026-10-29T00:00:00Z') }).payload));
    put('p-broken0001', '{not json');
    put('p-empty00001', null);

    const later = new Date('2026-11-03T00:00:00Z');
    expect(findExpired(dir, later).map((g: { id: string }) => g.id).sort()).toEqual(['p-broken0001', 'p-empty00001', 'p-old0000001']);
    expect(prune(dir, { dryRun: true, now: later })).toHaveLength(3);
    expect(existsSync(join(dir, 'p-old0000001'))).toBe(true);
    prune(dir, { now: later });
    expect(existsSync(join(dir, 'p-old0000001'))).toBe(false);
    expect(existsSync(join(dir, 'p-live000001'))).toBe(true);
    expect(existsSync(join(dir, 'index.html'))).toBe(true);
  });
});
