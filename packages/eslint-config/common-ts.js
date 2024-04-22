module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', './common'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'error',
  },
};
