const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const http = require('http');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const port = 443;
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(''),
  cert: fs.readFileSync('')
};

app.prepare().then(() => {
  createServer(httpsOptions, async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === '/') {
        await app.render(req, res, '/index', query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`Ready on port ${port}`);
  });
  http
    .createServer(function (request, response) {
      if (!request.secure) {
        const httpsUrl = `https://${request.headers.host}${request.url}`;
        response.writeHead(302, {
          Location: httpsUrl
        });
        return response.end();
      }
      next();
    })
    .listen(80);
});
