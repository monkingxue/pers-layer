const fs = require('fs')
const fetch = require('node-fetch')

const {dbUrl, modelName, baseErrorLog} = require('../common')
const errorRes = baseErrorLog('count')

;(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()

    let constraint = {}
    if (input) {
      constraint = {where: JSON.parse(input)}
    }

    const reqBody = {module: modelName, method: 'count', param: [constraint]}
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