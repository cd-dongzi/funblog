const czConfig = require('./.cz-config');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', czConfig.types.map((item) => item.value)],
  },
};
