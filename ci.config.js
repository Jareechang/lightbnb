const get = require('lodash.get');

function parseBool(value) {
  if (value === 'true' || value === 'True') return true;
  if (value === 'false' || value === 'false') return false;
  return false;
}

const getConfigurations = () => {
  const debug = parseBool(process.env.CI_DEBUG);
  const nodeEnv = process.env.NODE_ENV;
  const isProduction = nodeEnv === 'production';
  const collectCoverage = parseBool(get(process.env, 'CI_JEST_COVERAGE', false));
  const verbose = ['production', 'test'].includes(nodeEnv);
  const config = {
    nodeEnv,
    isProduction,
    jest: {
      verbose,
      collectCoverage
    }
  };
  if (debug) {
    console.log('ci.config: ', JSON.stringify(config, null, 2));
  }
  return config;
}

module.exports = getConfigurations();
