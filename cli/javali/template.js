const _ = require('lodash')
const recursive = require('recursive-readdir')
const fs = require('fs')
const log = require('./log')
const manager = require('./manager')
const path = require('path').join
const runPath = process.cwd()
const shell = require('shelljs')

_.templateSettings = {
  evaluate: /{{([\s\S]+?)}}/g,
  interpolate: /{{=([\s\S]+?)}}/g,
  escape: /{{-([\s\S]+?)}}/g
}

async function run (app) {
  await recursive(path(runPath, app), ['.DS_Store'], (err, files) => {
    if (!err) {
      const managerType = manager()
      const cmdRun = (managerType === 'yarn') ? 'yarn' : 'npm run'
      const cmdInstall = (managerType === 'yarn') ? 'yarn' : 'npm install'

      files.forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf8')
        const metadata = {
          appName: _.kebabCase(app),
          appManager: managerType,
          appCmd: cmdRun
        }
        const compiled = _.template(fileContent)

        try {
          fs.writeFileSync(file, compiled(metadata))
        } catch (err) {
          log(err, 'error')
        }
      })
      log(`To get started, run: "cd ${app} && ${cmdInstall} && ${cmdRun} start"`)
    }
  })
}

module.exports = run
