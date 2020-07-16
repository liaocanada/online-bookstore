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
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'linebreak-style': ['error', 'windows'],
    'comma-dangle': ['off'],
    camelcase: ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'no-multi-spaces': ['error', { ignoreEOLComments: true }],
    radix: ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'operator-linebreak': ['error', 'after'],
    indent: ['error', 2, { ignoreComments: true }],
  },
};
