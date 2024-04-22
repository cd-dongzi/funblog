const clientComponents = [];

module.exports = (config) => {
  return {
    output: config.output.map((v) => {
      return {
        ...v,
        banner: (chunk) => {
          if (chunk.fileName.startsWith('index.js')) {
            return '"use client";';
          }
          if (clientComponents.some((c) => chunk.fileName.includes(`components/${c}`))) {
            return '"use client";';
          }
        },
      };
    }),
    external: [
      'react',
      'react-dom',
      'classnames',
      /^core-js/,
      /^@funblog\/utils(?:.+)?$/,
      /^@funblog\/hooks(?:.+)?$/,
      /^lodash(?:\/[a-zA-Z0-9]+)?$/,
    ],
    importLibrary: [
      {
        libraryName: 'lodash',
        libraryDirectory: '',
      },
      {
        libraryName: '@funblog/utils',
        libraryDirectory: 'lib/cjs',
      },
      {
        libraryName: '@funblog/hooks',
        libraryDirectory: 'lib/cjs',
      },
    ],
  };
};
