const http = require('node:http');
const { URL } = require('node:url');

const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const PORT = process.env.PORT || 3000;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Missing OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET');
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Step 1: Redirect user to GitHub OAuth
  if (url.pathname === '/auth') {
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      scope: 'repo,user',
    });
    res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params}` });
    res.end();
    return;
  }

  // Step 2: Exchange code for access token, send it back to CMS via postMessage
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing code parameter');
      return;
    }

    try {
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code }),
      });

      const data = await tokenRes.json();

      if (data.error) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(authPage('error', data.error_description || data.error));
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(authPage('success', data.access_token));
    } catch (err) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(authPage('error', err.message));
    }
    return;
  }

  // Health check
  if (url.pathname === '/' || url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

function authPage(status, content) {
  const payload =
    status === 'success'
      ? JSON.stringify({ token: content, provider: 'github' })
      : JSON.stringify({ message: content });

  return `<!DOCTYPE html><html><body><script>
(function() {
  window.addEventListener("message", function(e) {
    window.opener.postMessage(
      "authorization:github:${status}:" + ${JSON.stringify(payload)},
      e.origin
    );
  });
  window.opener.postMessage("authorizing:github", "*");
})();
</script></body></html>`;
}

server.listen(PORT, () => {
  console.log('OAuth proxy listening on port ' + PORT);
});
