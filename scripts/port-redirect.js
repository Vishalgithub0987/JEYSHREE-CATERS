const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(302, { Location: 'http://localhost:3000' + req.url });
  res.end(`<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=http://localhost:3000${req.url}"></head><body>Redirecting to <a href="http://localhost:3000${req.url}">http://localhost:3000${req.url}</a></body></html>`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port 5173 already in use, skipping redirect server.');
  } else {
    console.error('Redirect server error:', err.message);
  }
});

server.listen(5173, () => {
  console.log('Port 5173 redirect server active -> forwarding to http://localhost:3000');
});
