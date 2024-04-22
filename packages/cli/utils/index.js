const fs = require('fs');
const path = require('path');
const { rimrafSync } = require('rimraf');
const log = require('./log');

const logRollupConfig = log.logOnce('rollup 配置不存在，将使用默认配置');
exports.getProjectRollupConfig = (name) => {
  const rollupPath = path.join(process.cwd(), name);
  if (!fs.existsSync(rollupPath)) {
    logRollupConfig();
    return {};
  }
  const config = require(rollupPath);
  return config;
};

exports.removeDir = (dir) => {
  rimrafSync(dir);
};

exports.getProjectPackage = () => {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    return {};
  }
  const config = require(packageJsonPath);
  return config;
};
