module.exports = {
  rootDir: ".",
  testEnvironment: "jsdom",
  preset: "ts-jest",
  clearMocks: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.(j|t)sx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@storybook/(.*)$": "@storybook/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  testMatch: ["<rootDir>/src/**/__tests__/**/**.test.ts?(x)"],
  collectCoverage: true,
  coverageDirectory: "<rootDir>/coverage",
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 40,
      lines: 70,
      statements: 70,
    },
  },
  testPathIgnorePatterns: ["/node_modules/"],
};
