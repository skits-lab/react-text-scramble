'use strict';

module.exports = {
  bracketSpacing: true,
  singleQuote: true,
  jsxBracketSameLine: false,
  trailingComma: 'es5',
  printWidth: 100,

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        trailingComma: 'all',
      },
    },
  ],
};
