const { execFileSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const outputDir = path.resolve(__dirname, '..', 'qa-artifacts');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const targetFile = path.join(outputDir, 'test_home.png');

console.log('Capturing screenshot to:', targetFile);

try {
  execFileSync(chromePath, [
    '--headless=new',
    `--screenshot=${targetFile}`,
    '--window-size=1440,900',
    '--hide-scrollbars',
    'http://localhost:3002/',
  ], {
    timeout: 15000,
    cwd: outputDir,
  });

  console.log('Screenshot success! Exists:', fs.existsSync(targetFile), 'Size:', fs.statSync(targetFile).size);
} catch (err) {
  console.error('Error running chrome:', err.message);
}
