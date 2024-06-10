// //Utwórz serwer HTTP w Node.js, który obsługuje pliki statyczne oraz dynamicznie generuje treści.
// Implementuj serwer w server.js, który używa modułów http i fs.
// Serwer powinien zwracać index.html jako stronę główną.
// Obsłuż żądania do plików CSS i JS z katalogu public, który powinien znajdować się w tym samym miejscu co odpalany server
// Dla ścieżki /dynamic, generuj dynamicznie treść HTML z bieżącą datą i czasem.
// Obsługa plików statycznych: Zaimplementuj funkcję serveStaticFile do obsługi plików statycznych z odpowiednim MIME type.

const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 8000;
const publicDir = path.join(__dirname, 'public');

const serveStaticFile = (filePath, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('File not found');
      return;
    }

    const ext = path.extname(filePath);
    let contentType = 'text/plain';

    switch (ext) {
      case '.html':
        contentType = 'text/html';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'application/javascript';
        break;
      default:
        contentType = 'text/plain';
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/') {
      serveStaticFile(path.join(publicDir, 'index.html'), res);
    } else if (req.url.startsWith('/public/')) {
      serveStaticFile(path.join(__dirname, req.url), res);
    } else if (req.url === '/dynamic') {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html');
      res.end(
        `<html><body><h1>Dynamic Content</h1><p>Current date and time: ${new Date().toLocaleString()}</p></body></html>`
      );
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = server;

module.exports = server;
