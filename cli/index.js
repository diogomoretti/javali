#!/usr/bin/env node

const program = require('commander')
const create = require('./javali/create')
const log = require('./javali/log')

program
  .version('1.0.0')
  .option('-v, --version', 'version')
  .parse(process.argv)

if (program.args[0]) {
  create(program.args[0])
} else {
  log('Please, choose a name for your project ;)')
}
