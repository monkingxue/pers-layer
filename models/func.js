const fs = require('fs')

const genDB = require('./db')

function errorRes (message) {
  return console.log(JSON.stringify({error: 'Models: ' + message}))
}

(async () => {
  let db
  try {
    const input = fs.readFileSync('/dev/stdin').toString()
    const {module, method, param = []} = JSON.parse(input)
    db = await genDB(process.env.SYNC, process.env.DB_IP)
    if(!(module && method)) {
      return errorRes('Must have module and method')
    }
    const result = await db[module][method](...param)

    if (result == null) {
      return errorRes('Database operate fail')
    }

    let data
    if (Array.isArray(result) && result.length && result[0].get) {
      data = result.map(r => r.get({plain: true}))
    } else if (result.get) {
      data = result.get({plain: true})
    } else {
      data = result
    }

    console.log(JSON.stringify({data}))
  } catch (e) {
    return errorRes(e.message)
  } finally {
    db.sequelize.close()
  }
})()
