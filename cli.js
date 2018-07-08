#!/usr/bin/env node
// eslint-disable-file no-console
const program = require('commander')
const path = require('path')
const { add, remove, log, status } = require('guld-git')
const VERSION = require('./package.json').version

program
  .name('guld-git')
  .version(VERSION)
  .description('Guld standardized CLI for git.')
  .option('-C --cwd <dir>', 'Set current working directory before running.', d => {
    process.chdir(path.resolve(d))
  })
  .command('path', 'Blocktree path resolution tools.')
  .command('config', 'Configuration manager for git config files.')
  .command('host', 'Configuration manager for git hosts.')
  .command('remote', 'Manage git remotes the guld way.')
  .command('add [file]')
    .description('Add files to the git working directory.')
    .option('-A --all', 'add changes from all tracked and untracked files')
    .action((file, options) => {
      if (file && !options.all) add(file, process.cwd())
      else add(file, process.cwd()).then(console.log('Ok.'))
    })
program
  .command('remove <file>')
    .alias('delete')
    .description('Remove files from the git working directory.')
    .option('--cached', 'Keep the cached (working) copy of the file.')
    .action(async (file, options) => {
      await remove(file, process.cwd(), options.cached)
    })
program
  .command('log [fromRef]')
    .description('List commits from the given ref backwards.')
    .option('-d --depth <depth>', 'The depth to search to.', 1)
    .action(async (fromRef, options) => {
      console.log((await log(process.cwd(), fromRef, options.depth)).join('\n'))
    })
program
  .command('status [file]')
    .description('Get the status of a file in the working directory.')
    .action(async (file, options) => {
      console.log((await status(file, process.cwd())).join('\n'))
    })    

program.parse(process.argv)
