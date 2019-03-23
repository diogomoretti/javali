const { template } = require('lodash')
const recursive = require('recursive-readdir')
const fs = require('fs')
const path = require('path').join
const runPath = process.cwd()

async function run (app) {
  await recursive(path(runPath, app), ['.DS_Store'], (err, files) => {
    if (!err) {
      files.forEach(file => {
        const fileContent = fs.readFileSync(file, 'utf8')
        const metadata = {
          appName: app
        }
        let compiled = template(fileContent)

        try {
          fs.writeFileSync(file, compiled(metadata))
        } catch (err) {
          console.error('erro ao salvar', err)
        }
      })
    }
  })
}

module.exports = run
