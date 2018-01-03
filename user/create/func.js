const fs = require('fs')
const fetch = require('./vendor/fetch')

const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`
const moduleName = 'User'

function errorRes (message) {
  return console.log(JSON.stringify({error: moduleName + '/Create: ' + message}))
}

(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()
    if (!input) {
      return errorRes('No param is detected.')
    }
    const param = JSON.parse(input)

    const reqBody = {module: moduleName, method: 'create', param: [param]}
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
    errorRes(e.message)
  }
})()