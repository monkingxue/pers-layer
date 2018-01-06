/**
 * Created by xueyingchen.
 */
const fs = require('fs')
const {join} = require('path')

module.exports = function deleteFolderSync (folderPath) {
  if (!fs.existsSync(folderPath)) {
    return
  }

  fs.readdirSync(folderPath).forEach(file => {
    const curPath = join(folderPath, file)
    if (fs.lstatSync(curPath).isDirectory()) {
      deleteFolderSync(curPath)
    } else {
      fs.unlinkSync(curPath)
    }
  })
  fs.rmdirSync(folderPath)
}
