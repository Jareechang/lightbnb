import get from 'lodash.get';

const getConfigurations = () => {
  const debug = process.env.CI_DEBUG;
  const nodeEnv = process.env.NODE_ENV;
  const isProduction = nodeEnv === 'production';
  const collectCoverage = get(process.env, 'CI_JEST_COVERAGE', false);
  const config = {
    node,
    isProduction,
    jest: {
      collectCoverage
    }
  };
  if (debug) {
    console.table('ci.config: ', JSON.stringify(config, null, 2));
  }
  return config;
}

module.exports = getConfigurations();
