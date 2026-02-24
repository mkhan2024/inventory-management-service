module.exports = {
  preset: "ts-jest",                    // use TypeScript with Jest
  testEnvironment: "node",              // we are testing Node.js
  setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],  // run this before every test
};