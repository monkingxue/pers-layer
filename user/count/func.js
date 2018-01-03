const fs = require('fs')
const fetch = require('./vendor/fetch')

const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`
const moduleName = 'User'

function errorRes (message) {
  return console.log(JSON.stringify({error: moduleName + '/Count: ' + message}))
}

(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()

    let constraint = {}
    if (input) {
      constraint = {where: JSON.parse(input)}
    }

    const reqBody = {module: moduleName, method: 'count', param: [constraint]}
    const res = await fetch(dbUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
    })
    const result = await res.json()

    if (result.error) {
      return errorRes(result.error)
    }
    console.log(JSON.stringify(result))

  } catch (e) {
    return errorRes(e.message)
  }
})()