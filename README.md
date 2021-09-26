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

## API

### Login

```curl
curl -X POST http://localhost:3000/users/login \
-H 'Content-Type: application/json' \
-d '{"email": "", "password": ""}'
```

## Project structure

All paths are resolved relative to `src/` and is namespaced with `@app/`.

#### Example

```ts
import { Config } from '@app/types';
import { Database } from '@app/server/database';
```

#### Folders

- server (`@app/server`) - Server related code  
  - controllers - Any logic related to request, response  
  - services - Any business logic on top of the data beyond just accessing raw data  
  - database - Any database related logic (ie connections, data access abstractions)   
     - dao - Data Access layer logic (specific to accessing database data)  
  - routes - Any logic related to routing
  - utils - Any common or shared utils goes here (`utils.ts` can also be in local directory if it is specific to a certain domain)
- types (`@app/types`) - All typescript types goes here

```
├── server
│   ├── controllers
│   ├── database
│   │   └── dao
│   ├── services
│   ├── routes 
│   └── utils
└── types
```
