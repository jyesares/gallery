'use strict';

module.exports = function(server) {
  if (process.env.NODE_ENV !== 'production') {
    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    router.get('/', server.loopback.status());
    server.use(router);
  }
};
