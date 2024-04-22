const { Command } = require('commander');
const { dev, build } = require('../lib/lib');

const program = new Command('lib');

program.command('dev').option('--css', '编译css').description('常用库的本地开发命令.').action(dev);

program.command('build').option('--css', '编译css').description('常用库的打包命令.').action(build);

module.exports = program;
