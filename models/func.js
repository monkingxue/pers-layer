const fs = require('fs')

const genDB = require('./db')

function errorRes (message) {
  return console.log(JSON.stringify({error: 'Models: ' + message}))
}

(async () => {
  let db
  try {
    db = await genDB(process.env.DB_IP)
    const input = fs.readFileSync('/dev/stdin').toString()
    const {module, method, param = []} = JSON.parse(input)
    const result = await db[module][method](...param)

    let data
    if (Array.isArray(result)) {
      data = result.map(r => r.get({plain: true}))
    } else {
      data = result.get({plain: true})
    }

    console.log(JSON.stringify({data}))
  } catch (e) {
    return errorRes(e.message)
  } finally {
    db.sequelize.close()
  }
})()
