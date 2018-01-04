/**
 * Created by xueyingchen.
 */
const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`
const modelName = 'User'

function baseErrorLog (opName) {
  return (message) => console.log(JSON.stringify({error: modelName + `/${opName}: ` + message}))
}

module.exports = {
  dbUrl,
  modelName,
  baseErrorLog,
}