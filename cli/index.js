#!/usr/bin/env node

const program = require('commander')
const create = require('./scripts/create')
const log = require('./scripts/log')
const { version } = require('../package.json')

program
  .version(version)
  .option('-v, --version', 'version')
  .parse(process.argv)

if (program.args.length) {
  create(...program.args)
} else {
  log('Please, choose a name for your project ;)')
}
