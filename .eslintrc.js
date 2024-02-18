module.exports = {
  root: true,
  env: {
    node: false,
  },
  extends: ['plugin:vue/essential'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-parsing-error': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    singleQuote: 0,
    semi: 0,
  },
}
