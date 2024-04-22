module.exports = {
  external: ['react', /^core-js/, /^@funblog\/utils(?:.+)?$/],
  importLibrary: [
    {
      libraryName: '@funblog/utils',
      libraryDirectory: 'lib/cjs',
    },
  ],
};
