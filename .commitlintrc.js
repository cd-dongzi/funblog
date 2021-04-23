module.exports = {
  extends: ['cz'],
  rules: {
    'scope-case': [0],
    'subject-case': [0],
    'subject-empty': [2, 'never'],
    'type-case': [0],
    'type-empty': [2, 'never'],
    'type-enum': [2, 'always', ['WIP', 'build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']]
  }
}



