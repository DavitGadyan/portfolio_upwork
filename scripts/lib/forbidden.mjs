// Upwork compliance. The site is linked from an Upwork profile, and Upwork's terms forbid pointing clients to contact
// routes outside the platform: no e-mail, phone, booking or contact services, and no social profile links. Work-sample
// repository links (github.com/<user>/<repo>) are allowed; the bare profile root is not.
// Shared by scripts/verify-out.mjs (built pages) and the proposal publisher (plaintext diagrams, scanned before
// encryption because the build can only see ciphertext).
export const FORBIDDEN = [
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

/** Every forbidden pattern found in `text`, as `{ what, match }`. Empty when the text is clean. */
export function findForbidden(text) {
  const hits = [];
  for (const [re, what] of FORBIDDEN) { const m = String(text).match(re); if (m) hits.push({ what, match: m[0].slice(0, 60) }); }
  return hits;
}
