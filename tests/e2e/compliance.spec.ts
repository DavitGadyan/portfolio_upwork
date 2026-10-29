import { expect, test } from '@playwright/test';

// The site is linked from an Upwork profile. Upwork's terms forbid pointing clients to contact routes outside the
// platform, so no e-mail, phone, booking or contact widget, and no social profile link may appear anywhere.
// Work-sample repository links (github.com/<user>/<repo>) are allowed; the bare profile root is not.
const FORBIDDEN_HREF = [/^mailto:/i, /^tel:/i, /calendly\.com/i, /formspree\.io/i, /linkedin\.com/i, /twitter\.com/i, /(^|[^.\w])x\.com\//i, /github\.com\/Davi[dt]Gadyan\/?$/i];
const FORBIDDEN_TEXT = [/toptal/i, /[\w.+-]+@[\w-]+\.[a-z]{2,}/i, /david\.gadyan@/i, /calendly/i, /formspree/i];
const PAGES = ['/', '/es/', '/privacy/', '/es/privacy/', '/cookies/', '/es/cookies/', '/blog/', '/portfolio/', '/blog/improvtalk-charisma-app/', '/es/blog/ai-gamechanger-ml-llm-rl-robotics/'];

test.describe('Upwork compliance: no off-platform contact routes', () => {
  for (const path of PAGES) {
    test(`${path} has no contact links, e-mail, Toptal or social profiles`, async ({ page }) => {
      await page.goto(path);
      const hrefs = await page.locator('a[href]').evaluateAll((els) => els.map((a) => a.getAttribute('href') ?? ''));
      const bad = hrefs.filter((h) => FORBIDDEN_HREF.some((re) => re.test(h)));
      expect(bad, `forbidden links on ${path}`).toEqual([]);
      const text = await page.locator('body').innerText();
      for (const re of FORBIDDEN_TEXT) expect(text, `forbidden text ${re} on ${path}`).not.toMatch(re);
      await expect(page.locator('#contact, #book, #cta, form[action*="formspree"], .calendly-inline-widget')).toHaveCount(0);
      await expect(page.locator('footer a[target="_blank"]')).toHaveCount(0);
    });
  }

  test('home: hero has no buttons, the burger menu has no social icons, the CV link is the contact-free file', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#home .btn')).toHaveCount(0);
    await page.locator('header .burger').click();
    const dialog = page.locator('dialog#fullscreen-nav');
    await expect(dialog).toHaveAttribute('open', '');
    await expect(dialog.locator('a[target="_blank"]')).toHaveCount(0);
    const cv = dialog.locator('a[download]');
    await expect(cv).toHaveCount(1);
    await expect(cv).toHaveAttribute('href', /\/CV_David_Gadyan_no_contact\.pdf$/);
    await expect(dialog.locator('a', { hasText: /contact|contacto/i })).toHaveCount(0);
    await page.keyboard.press('Escape');
    await expect(page.locator('#about a[download]')).toHaveAttribute('href', /\/CV_David_Gadyan_no_contact\.pdf$/);
    const res = await page.request.get('/CV_David_Gadyan_no_contact.pdf');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toMatch(/pdf/);
  });

  test('structured data and llms.txt carry no e-mail or social profiles', async ({ page }) => {
    await page.goto('/');
    const ld = await page.locator('script[type="application/ld+json"]').evaluateAll((els) => els.map((e) => e.textContent ?? '').join('\n'));
    expect(ld).not.toMatch(/"email"|linkedin\.com|twitter\.com|github\.com\/Davi[dt]Gadyan"|toptal/i);
    expect(ld).toMatch(/upwork\.com\/freelancers\//);
    for (const p of ['/llms.txt', '/es/llms.txt', '/llms-full.txt', '/es/llms-full.txt']) {
      const body = await (await page.request.get(p)).text();
      expect(body, p).not.toMatch(/mailto:|@bse\.eu|calendly|formspree|linkedin\.com|twitter\.com|toptal|#contact|#book/i);
    }
  });
});
