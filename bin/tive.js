#!/usr/bin/env node

const { Command } = require('commander')
const program = new Command()
const pkg = require('../package.json')

program.version(pkg.version)

program
    .name('tive')
    .usage('<command> [options]')
    .command('create [name]', '创建一个基于vue2.0 + vantUI的项目')
    .command('git', 'git push / merge')
    .parse(process.argv)