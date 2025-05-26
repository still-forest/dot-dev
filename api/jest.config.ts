export default {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  // setupFilesAfterEnv: ['./tests/setup.ts'],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  collectCoverage: false,
  collectCoverageFrom: ["src/**/*.ts", "!src/index.ts"],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/tests/$1",
  },
  transform: {
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
