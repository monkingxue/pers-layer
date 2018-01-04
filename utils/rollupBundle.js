/**
 * Created by xueyingchen.
 */
const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

const {modelNames} = require('./modelNames')

async function build (input, output) {
  const bundle = await rollup.rollup(input)
  await bundle.write(output)
}

modelNames.forEach((model) => {
  const modelDir = path.join(process.cwd(), model)
  fs.readdirSync(modelDir)
    .forEach(async opName => {
      const opDir = path.join(modelDir, opName)
      const inputFile = path.join(opDir, 'func.js')
      const outputFile = path.join(opDir, 'bundle.js')

      if (fs.lstatSync(opDir).isFile()) {
        return
      }

      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile)
      }
      const inputOptions = {
        input: inputFile,
        external: ['fs', 'stream', 'http', 'url', 'https', 'zlib', 'util', 'path'],
        plugins: [resolve({preferBuiltins: true}), commonjs()],
      }
      const outputOptions = {
        file: outputFile,
        format: 'cjs',
      }
      await build(inputOptions, outputOptions)
    })
})

