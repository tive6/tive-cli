#!/usr/bin/env node
"use strict";

const { Command } = require('commander')
const { push, merge } = require('../src/git-handler')

const program = new Command()
program
    .name('tive git')
    // .usage('<command> [options]')
    .option('-b, --branch <type>', 'current branch')
    .option('-t, --target <type>', 'merged branch')
    .option('-m, --commit <type>', 'commit description')
    .option('-h, --help', 'view help information')
    .parse(process.argv)

const options = program.opts()
// console.log(options)
// const args = program.args
// console.log(args)
if (options.help ||  !options.branch) {
    program.help()
}
// console.log('next')
// process.exit(1)
if (options && options.target) {
    merge(options)
} else {
    push(options)
}

