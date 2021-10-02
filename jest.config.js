const config = require('./ci.config');

// Todo support both client & server tests
module.exports = {
  collectCoverage: config.jest.collectCoverage,
  verbose: config.jest.verbose,
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: false,
      tsConfig: './src/server/tsconfig.json'
    }
  },
  roots: [
    'src'
  ],
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.sql?$': './internal/jest-transformer/text-transform',
  },
  moduleNameMapper: {
    "@app/server/(.*)": "<rootDir>/src/server/$1"
  },
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  coverageDirectory: 'testCoverage',
  coveragePathIgnorePatterns: [
    'node_modules'
  ],
  transformIgnorePatterns: [
    'node_modules'
  ],
};
