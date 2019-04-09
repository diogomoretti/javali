const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const exec = require('child_process').exec

const TEMP_FOLDER = '__temp__'

beforeAll(() => {
  if (!fs.existsSync(TEMP_FOLDER)) {
    fs.mkdirSync(TEMP_FOLDER)
  }
})

test('Run Javali cli without errors', async () => {
  const result = await cli('my-library', TEMP_FOLDER)
  expect(result.code).toBe(0)
})

test('Create a library called "my-library"', async () => {
  await cli('my-library', TEMP_FOLDER)
  const folderExists = fs.existsSync(`${TEMP_FOLDER}/my-library`)
  expect(folderExists).toBe(true)
})

test('Create a library called "my-library-with-typescript" with Typescript', async () => {
  await cli('my-library-with-typescript --typescript', TEMP_FOLDER)
  const fileExists = fs.existsSync(`${TEMP_FOLDER}/my-library-with-typescript/tsconfig.json`)
  expect(fileExists).toBe(true)
})

afterAll(() => {
  rimraf.sync(TEMP_FOLDER)
})

function cli (args, cwd) {
  return new Promise(resolve => {
    exec(`node ${path.resolve('./cli/index')} ${args}`,
    { cwd },
    (error, stdout, stderr) => {resolve({
      code: error && error.code ? error.code : 0,
      error,
      stdout,
      stderr
    })
  })
})}
