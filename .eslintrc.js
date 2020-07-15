module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx'] }],
    'linebreak-style': ['warn', 'windows'],
    'comma-dangle': ['off'],
    camelcase: ['off'],
    'arrow-parens': ['warn', 'as-needed'],
    'no-multi-spaces': ['warn', { ignoreEOLComments: true }],
    radix: ['off'],
    'react/jsx-one-expression-per-line': ['off'],
  },
};
