const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

function getRemotePackageVersion(packageName) {
  return new Promise((resolve, reject) => {
    shell.exec(`npm show ${packageName} version`, { silent: true }, (code, stdout, stderr) => {
      if (code === 0) {
        resolve(stdout.trim());
      } else {
        reject(stderr);
      }
    });
  });
}
// 查询某个目录下的所有文件
function getDirPackageList(dir) {
  const files = fs.readdirSync(dir);
  const arr = [];
  files.forEach((file) => {
    const stats = fs.statSync(path.resolve(dir, file));
    if (stats.isDirectory()) {
      arr.push(path.resolve(dir, file, 'package.json'));
    }
  });
  return arr;
}

function getAppPkgs() {
  return getDirPackageList(path.resolve(__dirname, '../apps'));
}

function getPackagePkgs() {
  return getDirPackageList(path.resolve(__dirname, '../packages'));
}

function getRepoPaths(files) {
  return files.map((p) => {
    return path.relative(process.cwd(), path.dirname(p));
  });
}
function getAppRepoPaths(appName) {
  const apps = getAppPkgs();
  return getRepoPaths(apps);
}
function getPackageRepoPaths(appName) {
  const packages = getPackagePkgs();
  return getRepoPaths(packages);
}

function getPkgs() {
  const apps = getAppPkgs();
  const packages = getPackagePkgs();
  const pkgs = [...apps, ...packages].map((p) => {
    return JSON.parse(fs.readFileSync(p, 'utf-8'));
  });
  return pkgs;
}

function getPackageVersion(packageName) {
  const pkgs = getPkgs();
  const pkg = pkgs.find((p) => p.name === packageName);
  return pkg.version;
}

async function compareVersion(packageName) {
  const remoteVersion = await getRemotePackageVersion(packageName);
  const localVersion = getPackageVersion(packageName);
  return remoteVersion === localVersion;
}

exports.getPackageRepoPaths = getPackageRepoPaths;
exports.getRemotePackageVersion = getRemotePackageVersion;
