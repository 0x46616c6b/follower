const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

if (argv.url === undefined || typeof argv.url !== 'string') {
  console.log('missing url parameter');

  process.exit(1);
}

if (argv.platform === 'android') {
  platform = 'Mozilla/5.0 (Linux; Android 6.0.1; SAMSUNG SM-N920T Build/MMB29K) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36';
} else {
  platform = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    console.log(interceptedRequest.url());

    interceptedRequest.continue();
  });
  await page.setUserAgent(platform);
  await page.goto(argv.url);

  console.log(page.url());

  await browser.close();
})();
