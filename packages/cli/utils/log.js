const chalk = require('chalk');

const log = {
  info: (...args) => console.log(...args),
  error: (str) => console.log(chalk.bgRedBright.black(' ERROR ') + ' ' + str),
  warn: (str) => console.log(chalk.bgYellowBright.black(' WARN ') + ' ' + str),
  success: (str) => console.log(chalk.bgGreenBright.black(' SUCCESS ') + ' ' + str),
  done: (str) => console.log(chalk.greenBright('✔️') + ' ' + str),
  skip: (str) => console.log(chalk.bgWhiteBright.black(' SKIP ') + ' ' + str),
  code: (str) => console.log(chalk.bgGray.whiteBright(str)),
  highlight: (str) => console.log(chalk.bold(str)),

  logOnce: (msg, type = 'warn') => {
    let warned = false;
    return (_msg) => {
      if (warned) {
        return;
      }
      warned = true;
      if (typeof log[type] === 'function') {
        log[type](_msg || msg);
      }
    };
  },
};

module.exports = log;
