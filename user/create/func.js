const fs = require('fs')
const fetch = require('./vendor/fetch')
const dbUrl = 'http://localhost:8080/r/persistent-layer/models'

function errorRes (message) {
  return console.error({error: 'User/Create: ' + message})
}

(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()
    const param = JSON.parse(input)
    if (!param) {
      return errorRes('No param is detected.')
    }
    const reqBody = {module: 'User', method: 'create', param: [param]}
    const result = await fetch(dbUrl, {method: 'POST', body: reqBody})
    if (result.error) {
      return errorRes(result.error)
    }
    console.log({result})
  } catch (e) {
    errorRes(e.message)
  }
})()