export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts", "!src/middleware/*.ts"],
  env: {
    APP_ENV: "development",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
