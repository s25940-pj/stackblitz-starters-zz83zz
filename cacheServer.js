const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 8001;
const cache = {};
const cacheExpiry = 10000; // 10 seconds

const getCachedResponse = (key) => {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < cacheExpiry) {
    return cached.data;
  }
  return null;
};

const setCachedResponse = (key, data) => {
  cache[key] = { data, timestamp: Date.now() };
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const parsedUrl = url.parse(req.url, true);
    const key = parsedUrl.path;
    const cachedData = getCachedResponse(key);

    if (cachedData) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(cachedData);
    } else {
      if (parsedUrl.pathname === '/data') {
        const response = JSON.stringify({
          message: 'This is cached data',
          time: new Date().toLocaleString(),
        });
        setCachedResponse(key, response);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(response);
      } else {
        res.statusCode = 404;
        res.end('Not Found');
      }
    }
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

server.listen(port, hostname, () => {
  console.log(`Cache server running at http://${hostname}:${port}/`);
});

module.exports = server;

module.exports = cacheServer;
