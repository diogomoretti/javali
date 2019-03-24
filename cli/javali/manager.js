const shell = require('shelljs')
const checkManager = () => shell.which('yarn') ? 'yarn' : 'npm'
module.exports = checkManager
