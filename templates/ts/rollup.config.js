import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

const plugins = [
  resolve({
    extensions: ['.js', '.ts']
  }),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    extensions: ['.js', '.ts']
  })
]

export default [
  {
    input: 'src/main.ts',
    output: {
      name: 'index',
      file: pkg.browser,
      format: 'umd'
    },
    plugins
  },
  {
    input: 'src/main.ts',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins
  }
]
