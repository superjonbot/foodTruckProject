const nodeConfig = require('@globalstuff/eslint-config-node');
const jestConfig = require('@globalstuff/eslint-config-jest');

module.exports = [
  ...nodeConfig,
  ...jestConfig,
  {
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    ignores: ['coverage/*'],
  },
];
