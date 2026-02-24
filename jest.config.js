module.exports = {
  preset: "ts-jest",                    // so it works with TS
  testEnvironment: "node",              // backend testing
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],  // run this first (setup db etc)
};