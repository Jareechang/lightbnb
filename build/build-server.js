const config = require('@common-web/esbuild');
const esbuild = require('esbuild');
const path = require('path');
const copyFiles = require('../scripts/copy-files');
const packageJson = require('../package.json');

module.exports = function buildServer() {
  return esbuild.build(config.getBaseConfig({
    entryPoint: './src/server/index.ts',
    tsconfig: './src/server/tsconfig.json',
    platform: 'node',
    bundle: true,
    external: [
      ...Object.keys(packageJson.dependencies)
    ],
    override: {
      loader: { '.sql': 'text' }
    }
  }))
  .then(copyFiles('./src/public', './dist/public', { recursive: true }))
  .then(() => {
    console.log('Server Build finished');
  });
}
