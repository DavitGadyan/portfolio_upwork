// Reference implementation of the proposal-artifact payload contract (v1). See docs/upwork-proposal-artifacts.md.
//
//   payload.json = { v: 1, alg: "AES-256-GCM", createdAt, expiresAt, iv, ct }
//   ct           = AES-256-GCM( gzip( JSON.stringify({ title, html, createdAt, expiresAt, chrome }) ) ) ‖ 16-byte tag
//   key          = 32 random bytes, base64url, carried only in the link fragment (#p=<id>&k=<key>)
//
// The viewer (public/materials/UpworkProposalArtifacts/index.html) decrypts with WebCrypto in the browser.
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { gunzipSync, gzipSync } from 'node:zlib';

export const PAYLOAD_VERSION = 1;
export const DEFAULT_TTL_HOURS = 72;
export const ARTIFACTS_DIR = 'public/materials/UpworkProposalArtifacts';
export const ARTIFACTS_URL_PATH = '/materials/UpworkProposalArtifacts/';
export const ID_RE = /^p-[a-z0-9]{6,32}$/;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';

export const b64url = (buf) => Buffer.from(buf).toString('base64url');
export const fromB64url = (s) => Buffer.from(String(s), 'base64url');

/** Random, non-identifying folder id such as "p-7f3k9q2xm4". Never derived from the client or the job. */
export function newProposalId(length = 10) {
  const bytes = randomBytes(length);
  let id = 'p-';
  for (const b of bytes) id += ALPHABET[b % ALPHABET.length];
  return id;
}

/**
 * @typedef {{ v: number, alg: string, createdAt: string, expiresAt: string, iv: string, ct: string }} ProposalPayload
 */

/**
 * Encrypt one self-contained HTML document.
 * @returns {{ payload: ProposalPayload, key: string }} payload goes to <id>/payload.json; key goes only into the link.
 */
export function encryptProposal({ html, title = 'Proposal', chrome = true, ttlHours = DEFAULT_TTL_HOURS, now = new Date() }) {
  if (typeof html !== 'string' || !html.trim()) throw new Error('html must be a non-empty string');
  if (!(ttlHours > 0)) throw new Error('ttlHours must be positive');
  const createdAt = new Date(now).toISOString();
  const expiresAt = new Date(new Date(now).getTime() + ttlHours * 3600_000).toISOString();
  const plain = gzipSync(Buffer.from(JSON.stringify({ title: String(title), html, createdAt, expiresAt, chrome: chrome !== false }), 'utf8'));
  const key = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ct = Buffer.concat([cipher.update(plain), cipher.final(), cipher.getAuthTag()]); // WebCrypto expects the tag appended
  return {
    payload: { v: PAYLOAD_VERSION, alg: 'AES-256-GCM', createdAt, expiresAt, iv: b64url(iv), ct: b64url(ct) },
    key: b64url(key),
  };
}

/** Decrypt a payload with its base64url key. Throws on a wrong key or tampered ciphertext. */
export function decryptProposal(payload, key) {
  if (!payload || payload.v !== PAYLOAD_VERSION) throw new Error('unsupported payload version');
  const k = fromB64url(key);
  if (k.length !== 32) throw new Error('key must be 32 bytes');
  const iv = fromB64url(payload.iv);
  const all = fromB64url(payload.ct);
  const decipher = createDecipheriv('aes-256-gcm', k, iv);
  decipher.setAuthTag(all.subarray(all.length - 16));
  const plain = Buffer.concat([decipher.update(all.subarray(0, all.length - 16)), decipher.final()]);
  return JSON.parse(gunzipSync(plain).toString('utf8'));
}

/** Is the payload past its expiry? Uses the encrypted expiresAt when given, else the outer one. */
export function isExpired(expiresAt, now = new Date()) {
  const t = Date.parse(expiresAt);
  return !Number.isFinite(t) || t <= new Date(now).getTime();
}

/** The link the client receives. siteUrl is the absolute site root, e.g. https://davitgadyan.github.io/portfolio_upwork */
export function proposalLink(siteUrl, id, key) {
  return `${String(siteUrl).replace(/\/+$/, '')}${ARTIFACTS_URL_PATH}#p=${id}&k=${key}`;
}

/** Shape check used by the build (scripts/verify-out.mjs) and the prune job: ciphertext only, never plaintext. */
export function validatePayloadShape(p) {
  const problems = [];
  if (!p || typeof p !== 'object') return ['not an object'];
  if (p.v !== PAYLOAD_VERSION) problems.push('v must be 1');
  if (p.alg !== 'AES-256-GCM') problems.push('alg must be AES-256-GCM');
  for (const f of ['createdAt', 'expiresAt']) if (!Number.isFinite(Date.parse(p[f]))) problems.push(`${f} must be an ISO date`);
  if (typeof p.iv !== 'string' || fromB64url(p.iv).length !== 12) problems.push('iv must be 12 bytes base64url');
  if (typeof p.ct !== 'string' || fromB64url(p.ct).length < 17) problems.push('ct missing');
  for (const f of ['html', 'title', 'key', 'k']) if (f in p) problems.push(`plaintext field "${f}" must not be stored`);
  return problems;
}
