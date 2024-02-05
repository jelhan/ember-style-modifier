'use strict';

module.exports = {
  plugins: ['prettier-plugin-ember-template-tag'],
  templateSingleQuote: false,
  overrides: [
    {
      files: '*.{js,ts,gjs,gts}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
