const fs = require('fs')
const fetch = require('./vendor/fetch')

const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`
const moduleName = 'User'

function errorRes (message) {
  return console.log(JSON.stringify({error: moduleName + '/Find: ' + message}))
}

(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()

    let constraint = {}, method = 'findAll'
    if (input) {
      method = 'findOne'
      const req = JSON.parse(input)
      constraint = {where: req.cond}
      if (req.type === 'all') {
        method = 'findAll'
      }
    }

    const reqBody = {module: moduleName, method, param: [constraint]}
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