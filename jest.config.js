module.exports = {
  modulePaths: ["<rootDir>/src/"],
  moduleFileExtensions: ["js"],
  moduleNameMapper: {
    "^hooks(.*)$": "<rootDir>/src/hooks$1",
    "^root(.*)$" : "<rootDir>/src$1",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"]
}
