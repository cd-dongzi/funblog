module.exports = {
  types: [
    {
      value: 'wip',
      name: '💪    wip:     Work in progress',
    },
    {
      value: 'feat',
      name: '✨   feat:     A new feature',
    },
    {
      value: 'fix',
      name: '🐞    fix:     A bug fix',
    },
    {
      value: 'build',
      name: '🔨  build:     Changes that affect the build system or external dependencies'
    },
    {
      value: 'perf',
      name:'⚡   perf:     A code change that improves performance',
    },
    {
      value: 'docs',
      name: '📚   docs:     Documentation only changes',
    },
    {
      value: 'style',
      name: '💅  style:     Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name:'🛠 refactor:    A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'test',
      name: '🏁   test:     Add missing tests or correcting existing tests',
    },
    {
      value: 'chore',
      name: "🗯   chore:     Changes that don't modify src or test files. Such as updating build tasks, package manager",
    },
    {
      value: 'ci',
      name: '👷     ci:     Changes to our CI configuration files and scripts'
    },
    {
      value: 'revert',
      name: '⏪ revert:     Revert to a commit',
    }
  ],
	scopes: [],
	messages: {
		type: '选择更改类型:\n',
		scope: '选择一个 scope（可选）：\n',
		customScope: '请输入自定义的 scope（可选）：',
		subject: '简短描述:\n',
		body: '详细描述. 使用"|"换行（可选）:\n',
		breaking: 'Breaking Changes列表（可选）:\n',
		footer: '关闭的issues列表. E.g.: #31, #34（可选）:\n',
		confirmCommit: '确认提交?'
	},
  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix', 'build', 'perf', 'refactor'],
}
