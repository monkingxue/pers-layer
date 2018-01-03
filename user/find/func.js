const fs = require('fs')
const fetch = require('./vendor/fetch')
const dbUrl = `http://${process.env.SERVER_IP}:8080/r/persistent-layer/models`

function errorRes (message) {
  return console.error({error: 'User/Find: ' + message})
}

(async () => {
  try {
    const input = JSON.parse(fs.readFileSync('/dev/stdin'))
    const constraint = {where: input}
    const reqBody = {module: 'User', method: 'findOne', param: [constraint]}
    const res = await fetch(dbUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
    })
    const result = await res.json()
    if (result.error) {
      return errorRes(result.error)
    }
    console.log(result)
  } catch (e) {
    return errorRes(e.message)
  }
})()