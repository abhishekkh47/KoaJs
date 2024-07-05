module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  rootDir: ".",
  // roots: ["<rootDir>/src/"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@utility/(.*)$": "<rootDir>/src/utility/$1",
    "^@db/(.*)$": "<rootDir>/src/db/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
