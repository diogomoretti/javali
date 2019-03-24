const fs = require('fs')
const path = require('path').join
const fullPath = require('path')
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
  const fullPathTemplate = path(fullPath.resolve(__dirname), '../../template')

  if (isFolderExistsSync(fullPathFolder)) {
    log(`Folder "${app}" already exists`, 'error')
  } else {
    ncp(fullPathTemplate, fullPathFolder, err => {
      if (err) {
        return log('Error while copying files', 'error')
      }
      log(`Project folder "${app}" was created =]`, 'success')
      template(app)
    })
  }
}

module.exports = create
