## LightBnB (fork)

This is a fork of [LHL LightBnB_WebApp](https://github.com/lighthouse-labs/LightBnB_WebApp).

#### Changes:

- Integrate [@common-web/esbuild@1.0.19](https://www.npmjs.com/package/@common-web/esbuild) for building and bundling
- Integrate [@common-web/ts-config@1.0.1](https://www.npmjs.com/package/@common-web/ts-config) for typescript 
- Moved `entry` from `index.js` to `index.ts`
- Updated the local scripts `build`, `start`, `start:watch`


## Getting Started

```sh
// static mode 
yarn build && yarn start
or
npm build && npm start
```

```
// watch mode 
yarn start:watch
or
npm start:watch
```
