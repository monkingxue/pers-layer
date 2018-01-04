/**
 * Created by xueyingchen.
 */
const fs = require('fs')
const path = require('path')
const rollup = require('rollup')
const commonjs = require('rollup-plugin-commonjs')
const resolve = require('rollup-plugin-node-resolve')

const modelPath = path.join(process.cwd(), 'models')
const reservedFile = ['db.js', 'func.js']
// const modelNames = fs
//   .readdirSync(modelPath)
//   .filter(
//     file =>
//       file.indexOf('.') !== 0 &&
//       !reservedFile.includes(file) &&
//       file.slice(-3) === '.js',
//   )
//   .map(file => file.slice(0, -3))
const modelNames = ['user']

async function build (inputOptions, outputOptions) {

  // create a bundle
  const bundle = await rollup.rollup(inputOptions)
  //
  // // generate code and a sourcemap
  // const {code, map} = await bundle.generate(outputOptions)

  // or write the bundle to disk
  await bundle.write(outputOptions)
}

modelNames.forEach((model) => {
  const modelDir = path.join(process.cwd(), model)
  fs.readdirSync(modelDir)
    .forEach(async opName => {
      const opDir = path.join(modelDir, opName)
      const inputFile = path.join(opDir, 'func.js')
      const outputFile = path.join(opDir, 'bundles.js')

      const inputOptions = {
        input: inputFile,
        // external: ['fs', 'stream', 'encoding', 'http', 'url', 'https', 'zlib'],
        plugins: [resolve({preferBuiltins: true}), commonjs()],
      }
      const outputOptions = {
        file: outputFile,
        format: 'cjs',
      }
      await build(inputOptions, outputOptions)
    })
})

