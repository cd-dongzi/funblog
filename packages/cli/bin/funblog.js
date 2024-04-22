#!/usr/bin/env node

const { Command } = require('commander');
const lib = require('./lib');
const replace = require('./replace');
const pkg = require('../package.json');

const commands = [
  {
    command: lib,
  },
  {
    command: replace,
  },
];

const program = new Command();

program.version(pkg.version).description(pkg.description);

commands.forEach(({ name, desc, action, command }) => {
  if (command) {
    return program.addCommand(command);
  }
  program
    .command(name)
    .description(desc || '')
    .action(action);
});

program.parseAsync(process.argv).catch((err) => {
  console.log(err);
  process.exitCode = 1;
});
