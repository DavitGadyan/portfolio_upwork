import { expect, test } from '@playwright/test';

test.describe('embeds', () => {
  test('video facade injects the provider iframe only after a click', async ({ page }) => {
    await page.goto('/portfolio/ai-marketing-ga4-seo-geo/');
    const facade = page.locator('.facade').first();
    await expect(facade.locator('iframe')).toHaveCount(0);
    await facade.getByRole('button').click();
    await expect(facade.locator('iframe')).toHaveAttribute('src', /youtube-nocookie\.com|loom\.com\/embed/);
  });
});
