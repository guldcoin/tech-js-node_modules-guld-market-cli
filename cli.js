#!/usr/bin/env node
const program = require('commander')
const path = require('path')
const {
  // init,
  status,
  log,
  add,
  remove,
  commit,
  clone,
  fetch,
  push,
  pull
} = require('guld-git')
const VERSION = require('./package.json').version

/* eslint-disable no-console */
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
  .command('init')
  .description('Create an empty Git repository or reinitialize an existing one.')
  .action(async (options) => {
    await remove(process.cwd())
  })
program
  .command('clone [url] [directory]')
  .description('Clone a repository into a new directory.')
  .action(async (url, directory, options) => {
    await clone(process.cwd(), directory, url)
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
    var stat = await status(file, process.cwd())
    if (stat) console.log(stat.join('\n'))
  })
program
  .command('commit [message]')
  .description('Stores the current contents of the index in a new commit along with a log message from the user describing the changes.')
  .action(async (message, options) => {
    await commit(process.cwd(), message)
    console.log('Ok.')
  })
program
  .command('fetch [remote] [branch]')
  .description('Download objects and refs from another repository.')
  .action(async (remote, branch, options) => {
    await fetch(process.cwd(), remote, branch)
    console.log('Ok.')
  })
program
  .command('push [remote] [branch]')
  .description('Update remote refs along with associated objects.')
  .action(async (remote, branch, options) => {
    await push(process.cwd(), remote, branch)
    console.log('Ok.')
  })
program
  .command('pull [remote] [branch]')
  .description('Fetch from and integrate with another repository or a local branch.')
  .action(async (remote, branch, options) => {
    await pull(process.cwd(), remote, branch)
    console.log('Ok.')
  })
/* eslint-enable no-console */

program.parse(process.argv)
