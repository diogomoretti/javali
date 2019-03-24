const _ = require('lodash')
const recursive = require('recursive-readdir')
const fs = require('fs')
const log = require('./log')
const manager = require('./manager')
const path = require('path').join
const runPath = process.cwd()

_.templateSettings = {
  evaluate: /{{([\s\S]+?)}}/g,
  interpolate: /{{=([\s\S]+?)}}/g,
  escape: /{{-([\s\S]+?)}}/g
}

async function run (app) {
  await recursive(path(runPath, app), ['.DS_Store'], (err, files) => {
    if (!err) {
      const managerType = manager()
      const cmd = (managerType === 'yarn') ? 'yarn' : 'npm run'

      files.forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf8')
        const metadata = {
          appName: app,
          appManager: managerType,
          appCmd: cmd
        }
        const compiled = _.template(fileContent)

        try {
          fs.writeFileSync(file, compiled(metadata))
        } catch (err) {
          log(err, 'error')
        }
      })
      log(`To get started, run: "cd ${app} && ${cmd} start"`)
    }
  })
}

module.exports = run
