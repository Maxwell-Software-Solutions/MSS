// Local proxy to strip frame-blocking headers for VS Code Simple Browser
import http from 'http';
import httpProxy from 'http-proxy';

const target = 'http://127.0.0.1:3000';
const proxy = httpProxy.createProxyServer({ target, changeOrigin: true });

http
  .createServer((req, res) => {
    proxy.once('proxyRes', (proxyRes) => {
      // Remove X-Frame-Options header completely
      delete proxyRes.headers['x-frame-options'];

      // Fix Content-Security-Policy to allow embedding in ANY iframe (dev only!)
      const csp = proxyRes.headers['content-security-policy'];
      if (csp) {
        // Remove frame-ancestors directive entirely to allow all frames
        let newCsp = csp.replace(/frame-ancestors[^;]*;?\s*/gi, '');
        // Clean up any double semicolons
        newCsp = newCsp.replace(/;+/g, ';').replace(/;\s*$/, '');
        proxyRes.headers['content-security-policy'] = newCsp;
      }
    });

    proxy.web(req, res);
  })
  .listen(3100, () => {
    console.log('🚀 Proxy running on http://127.0.0.1:3100 → ' + target);
    console.log('📱 Open VS Code Simple Browser to: http://127.0.0.1:3100');
  });

// Handle proxy errors
proxy.on('error', (err, req, res) => {
  console.error('Proxy error:', err.message);
  if (!res.headersSent) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
  }
  res.end('Proxy error: ' + err.message);
});
