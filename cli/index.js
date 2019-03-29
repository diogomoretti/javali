#!/usr/bin/env node

const program = require('commander')
const create = require('./scripts/create')
const log = require('./scripts/log')
const { version } = require('../package.json')

let appName

program
  .version(version)
  .arguments('<appName>')
  .option('-v, --version', 'version')
  .option('--typescript', 'use typescript')
  .action((_appName) => {
    appName = _appName
  })
  .parse(process.argv)

if (appName) {
  create(appName, program.typescript)
} else {
  log('Please, choose a name for your project ;)')
}
