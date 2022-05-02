module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      diagnostics: {
        pathRegex: '.test.tsx$'
      }
    }
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.css$": "<rootDir>/src/__tests__/__transformers__/cssTransform.js"
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],
  resetMocks: true,
  modulePaths: [],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.module\\.(png|jpg|gif)$': '<rootDir>/src/__tests__/__mocks__/imageMock.js',
  },
  testEnvironment: 'jsdom',
  verbose: true,
  testMatch: [
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules',
    '<rootDir>/build',
    '<rootDir>/src/__tests__/__mocks__',
    '<rootDir>/src/__tests__/__transformers__'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.tsx',
    '!src/__tests__/__transformers__/*',
    '!src/__tests__/__mocks__/*'
  ],
  coverageReporters: ['lcov'],
  coverageDirectory: 'test-coverage',
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  },
  setupFiles: [
    'react-app-polyfill/jsdom'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/src/__tests__/setupTests.js'
  ],
};
