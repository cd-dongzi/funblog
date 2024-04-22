module.exports = {
  extends: ['next/core-web-vitals', './common-ts'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
    'no-undef': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    "jsx-a11y/alt-text": "off",
    "import/export": "off",
    "@typescript-eslint/no-var-requires": "off"
  },
};
