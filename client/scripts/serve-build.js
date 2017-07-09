const path = require('path');
const serve = require('serve');

const rootDir = path.resolve(__dirname, '..', 'build');

const port = 3000;

console.log('SERVE_BUILD WTF');

const server = serve(rootDir, {
  port,
});
