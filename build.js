const config = require('@common-web/esbuild');
const esbuild = require('esbuild');
const path = require('path');
const copyFiles = require('./scripts/copy-files');
const packageJson = require('./package.json');

// Simple
esbuild.build(config.getBaseConfig({
    entryPoint: './src/server/index.ts',
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
    console.log('Build finished');
});

