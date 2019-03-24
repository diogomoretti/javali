const chalk = require('chalk')

const log = (msg, type) => {
  const prefix = chalk.hex('#fef30a').bold('🐗  Javali ')
  let typeMessage = chalk.hex('#f5f5f5').bold(`➜ ${msg}`)

  if (type === 'success') {
    typeMessage = chalk.green.bold(`✔︎ ${msg}`)
  } else if (type === 'error') {
    typeMessage = chalk.red.bold(`✖ ${msg}`)
  }

  return console.log(`${prefix}${typeMessage}`)
}

module.exports = log
