/**
 * Created by xueyingchen.
 */
const fs = require('fs')
const path = require('path')

const joinPathes = Object.keys(require('../models/joinTables'))

const modelsPath = path.join(process.cwd(), 'models')
const reservedFile = ['db.js', 'func.js', 'joinTables.js', 'common.js']
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
  modelNames: modelNames.concat(joinPathes),
}