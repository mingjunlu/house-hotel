module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'indent': ['error', 4, { 'SwitchCase': 1 }],
    'space-before-function-paren': 'off',
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    'react/state-in-constructor': 'off',
    'react/jsx-fragments': 'off',
  },
};
