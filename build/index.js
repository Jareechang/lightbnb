const buildClient = require('./build-client');
const buildServer = require('./build-server');

buildServer()
  .then(buildClient)
  .catch(err => console.log(`build error: ${err}`));
