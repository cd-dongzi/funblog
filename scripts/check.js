const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { getModifiedFiles } = require('./git');
const { getPackageRepoPaths, getRemotePackageVersion } = require('./package');

async function check() {
  const modifiedFiles = await getModifiedFiles();
  const validateFiles = modifiedFiles.filter((f) => {
    const ext = path.extname(f);
    const _ext = ext.slice(1);
    const arr = ['js', 'ts', 'jsx', 'tsx', 'json', 'css'];
    return arr.some((e) => e === _ext);
  });
  const paths = getPackageRepoPaths();
  const modifiedPaths = paths.filter((p) =>
    modifiedFiles.some((f) => f.startsWith(p))
  );

  const promises = [];
  for (const p of modifiedPaths) {
    promises.push(
      new Promise(async (resolve) => {
        const pkgP = path.resolve(process.cwd(), p, 'package.json');
        const pkgObj = JSON.parse(fs.readFileSync(pkgP, 'utf-8'));
        const remoteVersion = await getRemotePackageVersion(pkgObj.name);
        if (pkgObj.version === remoteVersion) {
          console.log(chalk.yellow('-------------------------------------'));
          console.log(
            chalk.yellow(
              `${pkgObj.name} 本地版本与远程版本一致，如有改动需要发版，已发版忽略此提示`
            )
          );
          console.log(chalk.yellow('-------------------------------------'));
        }
        resolve();
      })
    );
  }
  await Promise.all(promises);
}
check();
