/**
 * Created by xueyingchen.
 */
const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')
const json = require('rollup-plugin-json')
const builtinModules = require('builtin-modules')

async function build (input, output) {
  const inputOptions = {
    input: input,
    external: builtinModules,
    plugins: [
      resolve(),
      commonjs(),
      json(),
    ],
  }
  const outputOptions = {
    file: output,
    format: 'cjs',
  }

  try {
    const bundle = await rollup.rollup(inputOptions)
    await bundle.write(outputOptions)
  } catch (e) {
    console.error(e)
  }

}

module.exports = {
  build,
}