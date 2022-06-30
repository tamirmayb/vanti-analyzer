const http = require('http');
const analyzer = require('./src/analyzer');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  const msg = 'Analyzer is running now!'
  res.end(msg);
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);

  analyzer.run();
});
