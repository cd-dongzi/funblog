const git = require('simple-git');

async function getModifiedFiles() {
  const res = await git(process.cwd()).status();
  return [...res.modified, ...res.created];
}

exports.getModifiedFiles = getModifiedFiles;
