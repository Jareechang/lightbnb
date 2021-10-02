const config = require('@common-web/esbuild');
const esbuild = require('esbuild');
const path = require('path');
const copyFiles = require('../scripts/copy-files');
const packageJson = require('../package.json');

module.exports = function buildClient() {
  return esbuild.build(config.getBaseConfig({
    entryPoints: ['./src/client/index.tsx'],
    tsconfig: './src/client/tsconfig.json',
    bundle: true,
    platform: 'browser',
    format: 'iife',
    target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
    outfile: './dist/public/react-app/index.js'
  }))
  .then(() => {
    console.log('Client Build finished');
  });
}
