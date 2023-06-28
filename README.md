# Puppeteer on Ubuntu

## Cron config
To configure cron on ubuntu.
```
crontab -e
```

The following crontab is a sample crontab
```
0 * * * MON,TUE,WED,THU,FRI /home/ubuntu/.nvm/versions/node/v20.3.1/bin/node /home/ubuntu/yourscraper/index.js >> /home/ubuntu/yourscraper/cron.log
```

## Setup instructions.

Grab a medium EC2 instance with Ubuntu 20.

Install NVM and Node 20.
```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
nvm install v20
nvm use v20
```

Install all required packages.
```
sudo apt install chromium-browser 
sudo apt install xvfb
sudo apt install libx11-xcb1 libxcomposite1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 

```

Install all necessary node packages.
```
npm i puppeteer
npm i xvfb
```

The following minimal code should run without issues.
```
const puppeteer = require('puppeteer');
const Xvfb = require('xvfb');

async function run() {
  var xvfb = new Xvfb({
    silent: true,
    xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
  });
  xvfb.start((err) => { if (err) console.error(err) })

  // const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null, //otherwise it defaults to 800x600
    args: ['--no-sandbox', '--start-fullscreen', '--display=' + xvfb._display]
  });

  const page = await browser.newPage();

  await page.goto("https://repl.it/");
  let source = await page.content({ "waitUntil": "domcontentloaded" });
  console.log(source);

  await browser.close();
  xvfb.stop();
}
run();
```
