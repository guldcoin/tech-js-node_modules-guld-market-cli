# guld-git-cli

Guld standardized CLI for git.

### Example Output

### Install

```
npm i -g guld-git-cli
```

### Usage

##### CLI

```
  Usage: guld-git [options] [command]

  Guld standardized CLI for git.

  Options:

    -V, --version                   output the version number
    -C --cwd <dir>                  Set current working directory before running.
    -h, --help                      output usage information

  Commands:

    path                            Blocktree path resolution tools.
    config                          Configuration manager for git config files.
    host                            Configuration manager for git hosts.
    remote                          Manage git remotes the guld way.
    add [options] [file]            Add files to the git working directory.
    init                            Create an empty Git repository or reinitialize an existing one.
    clone [url] [directory]         Clone a repository into a new directory.
    remove|delete [options] <file>  Remove files from the git working directory.
    log [options] [fromRef]         List commits from the given ref backwards.
    status [file]                   Get the status of a file in the working directory.
    commit [message]                Stores the current contents of the index in a new commit along with a log message from the user describing the changes.
    fetch [remote] [branch]         Download objects and refs from another repository.
    push [remote] [branch]          Update remote refs along with associated objects.
    pull [remote] [branch]          Fetch from and integrate with another repository or a local branch.
    help [cmd]                      display help for [cmd]
```
