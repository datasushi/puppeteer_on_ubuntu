const puppeteer = require('puppeteer');
const Xvfb = require('xvfb');

async function run() {
  var xvfb = new Xvfb({
    silent: true,
    xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
  });
  xvfb.start((err) => { if (err) console.error(err) })
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null, //otherwise it defaults to 800x600
    args: ['--no-sandbox', '--start-fullscreen', '--display=' + xvfb._display]
  });

  const page = await browser.newPage();
  await page.goto('https://www.google.com');

  await browser.close();
  xvfb.stop();
}
run();