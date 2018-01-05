/**
 * Created by xueyingchen.
 */
const fs = require('fs')
const {join} = require('path')

const {build} = require('./utils')
const {modelNames} = require('../modelNames')

modelNames.forEach((model) => {
  const modelDir = join(process.cwd(), model)
  fs.readdirSync(modelDir)
    .forEach(async opName => {
      const opDir = join(modelDir, opName)
      if (fs.lstatSync(opDir).isFile()) {
        return
      }

      const inputFile = join(opDir, 'func.js')
      const outputFile = join(opDir, 'bundle.js')

      if (fs.existsSync(outputFile)) {
        fs.unlinkSync(outputFile)
      }

      await build(inputFile, outputFile)
    })
})