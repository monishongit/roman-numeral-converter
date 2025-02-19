/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["./jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: [
    "/node_modules/", "/__tests__/selenium/"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "./src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
};

module.exports = createJestConfig(customJestConfig);