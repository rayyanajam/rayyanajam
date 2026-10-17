// Exports each .board in artwork.html as a PNG.
// Run from the repo root: node marketing/render.cjs (needs Playwright).
const path = require('path');
const { chromium } = require('playwright');

const OUT = {
  'fb-profile': 'facebook/profile-picture.png',
  'fb-cover': 'facebook/cover-photo.png',
  'ad-address-square': 'meta-ads/1-address-1080x1080.png',
  'ad-privacy-square': 'meta-ads/2-privacy-1080x1080.png',
  'ad-mail-square': 'meta-ads/3-mail-scanning-1080x1080.png',
  'ad-address-story': 'meta-ads/1-address-story-1080x1920.png',
  'ad-privacy-story': 'meta-ads/2-privacy-story-1080x1920.png',
  'ad-mail-story': 'meta-ads/3-mail-scanning-story-1080x1920.png',
  'ad-offer-4x5': 'meta-ads/4-offer-1080x1350.png',
  'ad-offer-square': 'meta-ads/4-offer-1080x1080.png',
  'ad-offer-story': 'meta-ads/4-offer-story-1080x1920.png'
};

(async () => {
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  const page = await browser.newPage({ viewport: { width: 2000, height: 1200 } });
  await page.goto('file://' + path.join(__dirname, 'artwork.html'));
  await page.evaluate(() => document.fonts.ready);
  for (const [id, file] of Object.entries(OUT)) {
    await page.locator('#' + id).screenshot({ path: path.join(__dirname, file) });
    console.log('saved', file);
  }
  await browser.close();
})();
