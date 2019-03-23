const inquirer = require('inquirer')
const { template } = require('lodash')
const recursive = require("recursive-readdir")
const questions = require('./questions')
const fs = require('fs')
const path = require('path').join
const runPath = process.cwd()

async function run (app) {
  await inquirer
    .prompt(questions)
    .then(answers => {
      recursive(path(runPath, app), ['.DS_Store'], (err, files) => {
        files.forEach(file => {
          const fileContent = fs.readFileSync(file, 'utf8')
          let compiled = template(fileContent)

          try {
            fs.writeFileSync(file, compiled(answers))
          } catch (err) {
            console.error('erro ao salvar', err)
          }
        })
      })
    })
}

module.exports = run
