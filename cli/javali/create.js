const fs = require('fs')
const path = require('path').join
const ncp = require('ncp').ncp
const runPath = process.cwd()
const template = require('./template')
const log = require('./log')

const isFolderExistsSync = dir => {
  try {
    fs.accessSync(dir)
    return true
  } catch (e) {
    return false
  }
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
      log(`Project folder "${app}" was created =]`, 'success')
      template(app)
    })
  }
}

module.exports = create
