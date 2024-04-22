const path = require('path');
const { rollup, watch } = require('rollup');
const { getRollupDevConfig, getRollupProdConfig } = require('../config/rollup.config');
const { removeDir, getProjectPackage } = require('../utils');
const log = require('../utils/log');
const spinner = require('../utils/spinner');

const pkg = getProjectPackage();
function removeOutputDir(output) {
  log.info(`Remove ${pkg.name} output dir...`);
  const _get = (item) => {
    const _path = item.file || item.dir;
    const _dir = path.normalize(_path);
    const [rootDir] = _dir.split(path.sep);
    return rootDir;
  };
  if (!Array.isArray(output)) {
    return removeDir(_get(output));
  }
  const dirs = {};
  output.forEach((item) => {
    const rootDir = _get(item);
    dirs[rootDir] = true;
  });
  Object.keys(dirs).forEach((dir) => {
    removeDir(dir);
  });
  log.info(`Remove ${pkg.name} output dir done`);
}

exports.dev = (options) => {
  const config = getRollupDevConfig({
    css: options.css,
  });
  removeOutputDir(config.output);
  const watcher = watch(config);
  let failed = false;
  watcher.on('event', (event) => {
    switch (event.code) {
      case 'START':
        failed = false;
        spinner.start(`Compiling ${pkg.name}...`);
        break;
      case 'BUNDLE_END':
        event.result.close();
        break;
      case 'END':
        if (!failed) {
          spinner.stop(`Compilation done: ${pkg.name}`);
        }
        break;
      case 'FATAL':
      case 'ERROR':
        failed = true;
        spinner.stop(`Compilation failed: ${pkg.name}`, 'fail');
        console.log('error', event);
        break;
      default:
        break;
    }
  });
  process.on('exit', () => {
    watcher.close();
  });
};

exports.build = async (options) => {
  let bundle;
  let buildFailed = false;
  const config = getRollupProdConfig({
    css: options.css,
  });
  removeOutputDir(config.output);
  spinner.start(`Compiling ${pkg.name}...`);
  try {
    const bundle = await rollup(config);
    const { output } = config;
    const promises = [];
    if (Array.isArray(output)) {
      for (const o of output) {
        promises.push(bundle.write(o));
      }
    } else {
      promises.push(bundle.write(output));
    }
    await Promise.all(promises);
  } catch (error) {
    buildFailed = true;
    // 进行一些错误报告
    console.error(error);
  }

  if (bundle) {
    await bundle.close();
  }
  spinner.stop(`Compilation done: ${pkg.name}`);
  process.exit(buildFailed ? 1 : 0);
};
