const fs = require('fs');
const path = require('path');

const getPackagesVersion = () => {
  const projectDir = process.cwd();
  const targetDir = path.resolve(projectDir, 'packages');
  const dirs = fs
    .readdirSync(targetDir)
    .filter((f) => fs.statSync(path.resolve(targetDir, f)).isDirectory());
  const pkgs = dirs.map((d) => {
    const packageJson = require(path.resolve(targetDir, d, 'package.json'));
    return packageJson;
  });
  return pkgs.reduce((obj, v) => {
    return {
      ...obj,
      [v.name]: v.version,
    };
  }, {});
};

const format = (pkg, pkgsVersion) => {
  if (pkg.dependencies) {
    for (const [k, v] of Object.entries(pkg.dependencies)) {
      if (pkgsVersion[k]) {
        pkg.dependencies[k] = pkgsVersion[k];
      }
    }
  }
  if (pkg.devDependencies) {
    for (const [k, v] of Object.entries(pkg.devDependencies)) {
      if (pkgsVersion[k]) {
        pkg.devDependencies[k] = pkgsVersion[k];
      }
    }
  }
  return pkg;
};

const replaceWorkspace = async () => {
  const pkgsVersion = getPackagesVersion();
  const projectDir = process.cwd();
  const arr = ['admin', 'client', 'server'];
  for (const k of arr) {
    const targetDir = path.resolve(projectDir, `apps/${k}`);
    const outputDir = path.resolve(targetDir, 'opts');
    const pkg = require(path.resolve(targetDir, 'package.json'));
    const newPkg = format(pkg, pkgsVersion);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(
      path.resolve(outputDir, 'package.json'),
      JSON.stringify(newPkg, undefined, 2)
    );
  }
};
replaceWorkspace();
