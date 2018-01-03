const fs = require('fs')
const fetch = require('./vendor/fetch')

const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`
const moduleName = 'User'

function errorRes (message) {
  return console.log(JSON.stringify({error: moduleName + '/Update: ' + message}))
}

(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()

    let param = []
    if (input) {
      const req = JSON.parse(input)
      param.push(req.values, {where: req.cond})
    } else {
      return errorRes('Must have input')
    }

    const reqBody = {module: moduleName, method: 'update', param}
    const res = await fetch(dbUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
    })
    const result = await res.json()

    if (result.error) {
      return errorRes(result.error)
    } else if (result.data[0] === 0) {
      return errorRes('Update fail')
    }
    console.log(JSON.stringify(result))

  } catch (e) {
    return errorRes(e.message)
  }
})()