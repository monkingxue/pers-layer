/**
 * Created by xueyingchen.
 */
const {modelNames} = require('./modelNames')
const deleteFolderSync = require('./deleteFolderSync')

modelNames.forEach(model => deleteFolderSync(model))
