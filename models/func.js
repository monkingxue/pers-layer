const fs = require('fs')

const genDB = require('./db')

function errorRes (message) {
  return console.error({error: 'Models: ' + message})
}

(async () => {
  let db
  try {
    db = await genDB(process.env.DB_IP)
    const input = fs.readFileSync('/dev/stdin')
    const {module, method, param = []} = JSON.parse(input)
    const result = await db[module][method](...param)

    console.log(JSON.stringify({result: result.get({plain: true})}))
  } catch (e) {
    return errorRes(e.message)
  } finally {
    db.sequelize.close()
  }
})()
