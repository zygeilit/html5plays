
const next = require('next');
const routes = require('next-routes')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

const handle = routes().getRequestHandler(app);

module.exports = {
  'app': app,
  'handle': handle
}
