#!/usr/bin/env node
"use strict";

const { Command } = require('commander')
const { push, merge } = require('../src/git-handler')

const program = new Command()
program
    .name('tive git')
    .usage('<项目名称> [tive-demo]')
    .option('-b, --branch <type>', 'current branch', 'master')
    .option('-t, --target <type>', 'merged branch')
    .option('-m, --commit <type>', 'commit description')
    .option('-h, --help', 'view help information')
program.parse();
const options = program.opts()
// console.log(options)
const args = program.args
// console.log(args)

if (options && options.target) {
    merge(options)
} else {
    push(options)
}

