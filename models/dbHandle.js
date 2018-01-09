const path = require('path')
const Sequelize = require('sequelize')

module.exports = async function genDB (model, DB_IP) {
  const config = {
    database: 'database',
    username: 'yy',
    password: 'password',
    options: {
      host: DB_IP,
      dialect: 'mysql',
      logging: false,
    },
  }

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options,
  )

  const db = {}

  try {
    const {name, fnModel} = require(path.join(__dirname, model.toLowerCase()))
    db[name] = fnModel(sequelize, Sequelize.DataTypes)

    db.sequelize = sequelize
    db.Sequelize = Sequelize

  } catch (e) {
    console.error(e)
    sequelize.close()
  }

  return db
}