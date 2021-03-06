export default {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  preset: 'ts-jest/presets/js-with-ts-esm',
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?'],
};
