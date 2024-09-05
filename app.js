const express = require('express');
const log = require('./app/lib/logger');
const routes = require('./app/routes');

const { getConfig } = require('./app/lib/utils');
const { port: globalPort } = getConfig();
const { version, name, author } = require('./package.json');

const setupApp = async () => {
  const app = express();

  app.use('/', routes);

  return app;
};

setupApp().catch((err) => {
  log.error('Error setting up the application', err);
});

(async () => {
  let app, port;

  try {
    app = await setupApp();
    port = globalPort || process.env.NODE_PORT || 3000;
  } catch (e) {
    log.error(`App setup failed: ${e.message}`, e);
    throw e;
  }

  app
    .listen(port, function () {
      log.debug(`${name} (${version}) by ${author} listening at port: ${port}`);
    })
    .on('error', (e) => {
      log.warn('Error during app start', e);
    });

  process.on('unhandledRejection', (err) => {
    log.warn('Unhandled Rejection', err);
  });

  process.on('uncaughtException', (err) => {
    log.warn('Uncaught Exception', err);
  });

  module.exports = app;
})();
