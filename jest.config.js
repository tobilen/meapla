module.exports = {
  testRunner: "jest-circus/runner",
  roots: ["<rootDir>"],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules|.next)[/\\\\]"],
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest",
  },
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|svg|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|md)$":
      "<rootDir>/setup/fileMock.ts",
    "\\.(css|less|scss)$": "<rootDir>/setup/styleMock.ts",
  },
  clearMocks: true,
  snapshotSerializers: ["jest-date-serializer"],
  setupFilesAfterEnv: ["<rootDir>/setup/index.ts"],
};
