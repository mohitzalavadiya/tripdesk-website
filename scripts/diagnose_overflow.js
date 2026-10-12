const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--remote-debugging-port=9222',
  'http://localhost:3002/',
]);

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function main() {
  await new Promise(r => setTimeout(r, 2000));
  try {
    const list = await getJson('http://localhost:9222/json');
    const page = list.find(p => p.type === 'page');
    if (!page) {
      console.log('No page found');
      chrome.kill();
      return;
    }

    const ws = new WebSocket(page.webSocketDebuggerUrl);
    ws.onopen = () => {
      // 1. Override device metrics to 320x844 mobile
      ws.send(JSON.stringify({
        id: 1,
        method: 'Emulation.setDeviceMetricsOverride',
        params: {
          width: 320,
          height: 844,
          deviceScaleFactor: 2,
          mobile: true,
        }
      }));
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === 1) {
        // Now evaluate
        const expr = `
          (() => {
            const innerWidth = window.innerWidth;
            const docWidth = document.documentElement.offsetWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const overflows = [];
            document.querySelectorAll('*').forEach(el => {
              const rect = el.getBoundingClientRect();
              if (rect.right > 321 || el.offsetWidth > 321) {
                overflows.push({
                  tag: el.tagName,
                  className: (typeof el.className === 'string' ? el.className : '').slice(0, 80),
                  rectRight: Math.round(rect.right),
                  width: Math.round(rect.width),
                  text: (el.innerText || '').slice(0, 30).replace(/\\n/g, ' ')
                });
              }
            });
            return { innerWidth, docWidth, scrollWidth, overflows: overflows.slice(0, 10) };
          })()
        `;
        ws.send(JSON.stringify({
          id: 2,
          method: 'Runtime.evaluate',
          params: { expression: expr, returnByValue: true }
        }));
      } else if (msg.id === 2) {
        console.log('Result at mobile 320:', JSON.stringify(msg.result.result.value, null, 2));
        ws.close();
        chrome.kill();
        process.exit(0);
      }
    };
  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
  }
}

main();
