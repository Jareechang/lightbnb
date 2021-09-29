module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
      diagnostics: false,
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
  coveragePathIgnorePatterns: [
    'node_modules'
  ],
  transformIgnorePatterns: [
    'node_modules'
  ],
};
