const fs = require('fs')
const fetch = require('node-fetch')

const {dbUrl, modelName, baseErrorLog} = require('../common')
const errorRes = baseErrorLog('create')

;(async () => {
  try {
    const input = fs.readFileSync('/dev/stdin').toString()

    let param = []
    if (input) {
      const req = JSON.parse(input)
      param.push(req.values, {where: req.cond})
    } else {
      return errorRes('Must have input')
    }

    const reqBody = {module: modelName, method: 'update', param}
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