module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [ "**/(spec|test)/js/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  testPathIgnorePatterns: ['/examples/']
};
