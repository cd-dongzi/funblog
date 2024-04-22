module.exports = {
  extends: ['standard', 'plugin:prettier/recommended'],
  rules: {
    semi: 'off',
    quotes: ['error', 'single'],
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',

    'no-unused-vars': 'off',

    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'sibling',
          'parent',
          'index',
          'object',
          'unknown',
        ],
        pathGroups: [
          {
            pattern: './*.module.{css,scss}',
            group: 'unknown',
            position: 'after',
          },
          {
            pattern: '@/styles/**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        // 'newlines-between': 'off',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'prettier/prettier': [
      'error',
      /* 
      prettier-atom and prettier-vscode 只会读取.prettierrc, 不会读取eslint这个配置，
      如果在vscode中是用的prettier来检测，而不是eslint, 请用.prettierrc 
      */
      {
        plugins: ['prettier-plugin-tailwindcss'],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        useTabs: false,
        printWidth: 120,
      },
    ],
  },
};
