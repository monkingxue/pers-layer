/**
 * Created by xueyingchen.
 */
const fs = require('fs')
const path = require('path')

const modelsPath = path.join(process.cwd(), 'models')
const reservedFile = ['db.js', 'func.js']
const modelNames = fs
  .readdirSync(modelsPath)
  .filter(
    file =>
      file.indexOf('.') !== 0 &&
      !reservedFile.includes(file) &&
      file.slice(-3) === '.js',
  )
  .map(file => file.slice(0, -3))

module.exports = {
  modelNames
}