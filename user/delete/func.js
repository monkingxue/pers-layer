const fs = require('fs')
const fetch = require('node-fetch')

const {dbUrl, modelName, baseErrorLog} = require('../common')
const errorRes = baseErrorLog('delete')

;(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()
    if (!input) {
      return errorRes('No param is detected')
    }
    const param = {where: JSON.parse(input)}

    const reqBody = {module: modelName, method: 'destroy', param: [param]}
    const res = await fetch(dbUrl, {
      method: 'POST',
      body: JSON.stringify(reqBody),
    })
    const result = await res.json()

    if (result.error) {
      return errorRes(result.error)
    } else if (result.data === 0) {
      return errorRes('Delete fail')
    }
    console.log(JSON.stringify(result))

  } catch (e) {
    return errorRes(e.message)
  }
})()