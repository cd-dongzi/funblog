const { getRollupConfig, getOutputConfig, getPluginsConfig } = require('./rollup.base.config');
const { getProjectRollupConfig } = require('../utils');

function _getConfig(name) {
  const config = getProjectRollupConfig(name);
  return !!Object.keys(config).length || getProjectRollupConfig('rollup.config.js');
}
function getConfig(name) {
  const config = _getConfig(name);
  if (typeof config === 'function') {
    return config(getRollupConfig());
  }
  return config;
}
exports.getRollupDevConfig = (options) => {
  const { babelPlugins, importLibrary, ...devConfig } = getConfig('rollup.dev.config.js');
  return {
    ...getRollupConfig(),
    ...devConfig,
    plugins: [...getPluginsConfig({ css: options.css, babelPlugins, importLibrary }), ...(devConfig.plugins || [])],
  };
};

exports.getRollupProdConfig = (options) => {
  const { babelPlugins, importLibrary, ...prodConfig } = getConfig('rollup.prod.config.js');
  return {
    ...getRollupConfig(),
    ...prodConfig,
    plugins: [
      ...getPluginsConfig({ minimize: true, css: options.css, babelPlugins, importLibrary }),
      ...(prodConfig.plugins || []),
    ],
  };
};
