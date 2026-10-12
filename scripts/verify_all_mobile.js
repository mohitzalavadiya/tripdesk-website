const { spawn } = require('child_process');
const http = require('http');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const baseUrl = 'http://localhost:3002';

const routes = [
  '/',
  '/features',
  '/pricing',
  '/how-it-works',
  '/about',
  '/faq',
  '/contact',
  '/request-demo',
  '/privacy',
  '/terms',
  '/nonexistent-404-check',
];

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
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
  ]);

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

    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (callbacks.has(msg.id)) {
        const cb = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        cb(msg.result);
      }
    };

    function sendCommand(method, params = {}) {
      return new Promise((resolve) => {
        const id = msgId++;
        callbacks.set(id, resolve);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise(r => ws.onopen = r);

    // Set mobile device emulation (320x844, scale 2, mobile: true)
    await sendCommand('Emulation.setDeviceMetricsOverride', {
      width: 320,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    console.log('Checking all 11 routes at 320px mobile viewport...');

    const report = [];

    for (const route of routes) {
      await sendCommand('Page.navigate', { url: `${baseUrl}${route}` });
      // Wait for page to render
      await new Promise(r => setTimeout(r, 1200));

      const evalRes = await sendCommand('Runtime.evaluate', {
        expression: `
          (() => {
            const innerWidth = window.innerWidth;
            const docWidth = document.documentElement.offsetWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const overflows = [];
            document.querySelectorAll('*').forEach(el => {
              const rect = el.getBoundingClientRect();
              if (rect.right > 321 || el.offsetWidth > 321) {
                // Ignore horizontal scroll containers that are intentionally designed to scroll internally
                const style = window.getComputedStyle(el);
                if (style.overflowX === 'auto' || style.overflowX === 'scroll') return;
                
                // Also check if inside an intentional horizontal scroll container
                let parent = el.parentElement;
                let insideScroll = false;
                while (parent) {
                  const pStyle = window.getComputedStyle(parent);
                  if (pStyle.overflowX === 'auto' || pStyle.overflowX === 'scroll') {
                    insideScroll = true;
                    break;
                  }
                  parent = parent.parentElement;
                }
                if (insideScroll) return;

                overflows.push({
                  tag: el.tagName,
                  className: (typeof el.className === 'string' ? el.className : '').slice(0, 70),
                  rectRight: Math.round(rect.right),
                  width: Math.round(rect.width),
                  text: (el.innerText || '').slice(0, 30).replace(/\\n/g, ' ')
                });
              }
            });
            return { route: window.location.pathname, innerWidth, docWidth, scrollWidth, overflows: overflows.slice(0, 5) };
          })()
        `,
        returnByValue: true,
      });

      const data = evalRes.result.value;
      report.push(data);
      console.log(`Route [${route}]: scrollWidth=${data.scrollWidth}, overflows=${data.overflows.length}`);
      if (data.overflows.length > 0) {
        console.log('  Details:', JSON.stringify(data.overflows, null, 2));
      }
    }

    ws.close();
    chrome.kill();

    console.log('\n--- SUMMARY ---');
    const hasIssues = report.filter(r => r.scrollWidth > 320 || r.overflows.length > 0);
    if (hasIssues.length === 0) {
      console.log('ALL 11 routes pass 320px mobile viewport with zero horizontal overflow!');
    } else {
      console.log(`${hasIssues.length} routes have overflow issues:`);
      hasIssues.forEach(h => console.log(`  - ${h.route} (scrollWidth: ${h.scrollWidth}, overflows: ${h.overflows.length})`));
    }
  } catch (err) {
    console.error('Error:', err);
    chrome.kill();
  }
}

main();
