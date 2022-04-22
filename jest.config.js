const { compilerOptions } = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

module.exports = {

  clearMocks: true,


  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),

  // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
  modulePathIgnorePatterns: ["<rootDir>/src/__tests__/helpers/","<rootDir>/src/__tests__/__mocks__/"],

  preset: 'ts-jest',


//   setupFiles: ["<rootDir>/src/__tests__/helpers/dotenv.js"],


  testEnvironment: 'node',


  transformIgnorePatterns: [
    "/node_modules/"
  ],


}
