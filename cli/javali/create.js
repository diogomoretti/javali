const chalk = require('chalk')
const fs = require('fs')
const path = require('path').join
const ncp = require('ncp').ncp
const runPath = process.cwd()
const template = require('./template')

const isFolderExistsSync = myDir => {
  try {
    fs.accessSync(myDir)
    return true
  } catch (e) {
    return false
  }
}

const log = (msg, type) => {
  const prefix = chalk.hex('#fef30a').bold('🐗  Javali ')
  let typeMessage = chalk.hex('#f5f5f5').bold(`➜ ${msg}`)

  if (type === 'success') {
    typeMessage = chalk.green.bold(`✔︎ ${msg}`)
  } else if (type === 'error') {
    typeMessage = chalk.red.bold(`✖ ${msg}`)
  }

  return console.log(`${prefix}${typeMessage}\n`)
}

const create = app => {
  const fullPathFolder = path(runPath, app)
  const fullPathTemplate = path(runPath, 'template')

  if (isFolderExistsSync(app)) {
    log(`Folder "${app}" already exists`, 'error')
  } else {
    ncp(fullPathTemplate, fullPathFolder, err => {
      if (err) {
        return console.error(err)
      }
      log(`Project folder "${app}" was created =]`)
      template(app)
    })
  }
}

module.exports = create
