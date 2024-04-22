const fs = require('fs');
const path = require('path');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const json = require('@rollup/plugin-json');

const resolve = require('@rollup/plugin-node-resolve');
const terser = require('@rollup/plugin-terser');
const glob = require('glob');
const postcss = require('rollup-plugin-postcss');
const typescript = require('rollup-plugin-typescript2');
const imports = require('../plugins/rollup-plugin-import');
const { getProjectPackage } = require('../utils');

function getInputConfig() {
  return glob.sync(['src/**/*.{js,ts,tsx}']).reduce((entries, file) => {
    const relativePath = path.relative('src', file.slice(0, file.length - path.extname(file).length));
    entries[relativePath] = path.resolve(process.cwd(), file);
    return entries;
  }, {});
}
function getOutputConfig() {
  const pkg = getProjectPackage();
  return [
    // {
    //   file: pkg.main,
    //   format: 'cjs',
    //   exports: 'named',
    // },
    // {
    //   file: pkg.module,
    //   format: 'es',
    //   exports: 'named',
    // },
    {
      dir: 'lib/cjs',
      format: 'cjs',
      // preserveModules: true,
      // preserveModulesRoot: 'src',
    },
    {
      dir: 'lib/esm',
      format: 'es',
      // preserveModules: true,
      // preserveModulesRoot: 'src',
    },
  ];
}

function getPluginsConfig({ css, minimize, importLibrary = [], babelPlugins = [] } = {}) {
  return [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    resolve({
      // preferBuiltins: true,
    }),
    // 识别 commonjs 模式第三方依赖
    commonjs(),
    json(),
    imports({
      library: importLibrary,
    }),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            // /* Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败 */
            modules: false,
            targets: {
              browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
            },
            useBuiltIns: 'usage',
            corejs: 3,
          },
        ],
      ],
      plugins: [
        [
          // 与 babelHelpers: 'runtime' 配合使用
          '@babel/plugin-transform-runtime',
        ],
      ],
      extensions: ['.ts', '.tsx', '.jsx', '.js'],
      // 编译库使用
      babelHelpers: 'runtime',
      exclude: ['**/node_modules/**'],
    }),
    css &&
      postcss({
        modules: true,
        extract: true,
        plugins: [require('postcss-import')(), require('postcss-nested')()],
      }),
    minimize &&
      terser({
        compress: {
          directives: false, // 解决 use client 被删除的问题
        },
      }),
  ];
}

function getRollupConfig() {
  return {
    input: getInputConfig(),
    output: getOutputConfig(),
    plugins: getPluginsConfig(),
  };
}

exports.getOutputConfig = getOutputConfig;
exports.getPluginsConfig = getPluginsConfig;
exports.getRollupConfig = getRollupConfig;
