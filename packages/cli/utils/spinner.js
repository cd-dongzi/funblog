const ora = require('ora');

let spinner;
const disabled = false;

function getColor(type) {
  return type === 'succeed' ? 'cyan' : type === 'warn' ? 'yellow' : type === 'fail' ? 'red' : 'white';
}

function start(text, type = 'succeed') {
  if (disabled) return;
  if (spinner) {
    spinner.stop();
    spinner = null;
  }
  spinner = ora(`${text}\n`);
  spinner.color = getColor(type);
  spinner.start();
}
function stop(text, type = 'succeed') {
  if (disabled) return;
  if (spinner) {
    if (text) {
      return spinner[type](text);
    }
    spinner.stop();
  }
}

module.exports = {
  start,
  stop,
};
