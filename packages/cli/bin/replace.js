const { Command } = require('commander');
const { replaceWorkspace } = require('../lib/replaceWorkspace');

const program = new Command('replace');
program.command('workspace').description('更换workspace版本号').action(replaceWorkspace);

module.exports = program;
