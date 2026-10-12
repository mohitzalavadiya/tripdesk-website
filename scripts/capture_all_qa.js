const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve(__dirname, '..', 'qa-artifacts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const baseUrl = 'http://localhost:3002';

const routes = [
  { name: 'home', path: '/' },
  { name: 'features', path: '/features' },
  { name: 'pricing', path: '/pricing' },
  { name: 'how-it-works', path: '/how-it-works' },
  { name: 'about', path: '/about' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' },
  { name: 'request-demo', path: '/request-demo' },
  { name: 'privacy', path: '/privacy' },
  { name: 'terms', path: '/terms' },
  { name: '404', path: '/nonexistent-404-check' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 320, height: 844 },
  { name: 'narrow_mobile', width: 320, height: 800 },
];

async function run() {
  console.log(`Starting Visual QA Screenshot Capture across ${routes.length} routes and ${viewports.length} viewports...`);
  const results = [];

  for (const route of routes) {
    for (const vp of viewports) {
      // Prioritize: capture all routes at desktop & mobile; plus laptop and tablet for core routes
      const filename = `${route.name}_${vp.name}_${vp.width}x${vp.height}.png`;
      const targetFile = path.join(outputDir, filename);

      try {
        execFileSync(chromePath, [
          '--headless=new',
          `--screenshot=${targetFile}`,
          `--window-size=${vp.width},${vp.height}`,
          '--hide-scrollbars',
          `${baseUrl}${route.path}`,
        ], {
          timeout: 20000,
          cwd: outputDir,
        });

        if (fs.existsSync(targetFile)) {
          const stats = fs.statSync(targetFile);
          results.push({
            route: route.path,
            viewport: `${vp.name} (${vp.width}x${vp.height})`,
            file: filename,
            size: stats.size,
            status: 'OK',
          });
          process.stdout.write(`.`);
        } else {
          results.push({
            route: route.path,
            viewport: `${vp.name} (${vp.width}x${vp.height})`,
            file: filename,
            status: 'MISSING',
          });
          process.stdout.write(`F`);
        }
      } catch (err) {
        results.push({
          route: route.path,
          viewport: `${vp.name} (${vp.width}x${vp.height})`,
          file: filename,
          status: 'ERROR: ' + err.message,
        });
        process.stdout.write(`E`);
      }
    }
    console.log(` [Route ${route.name} captured]`);
  }

  console.log(`\n\nCapture complete! Total screenshots: ${results.length}`);
  fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(results, null, 2));
}

run().catch(console.error);
