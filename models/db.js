const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)

module.exports = async function genDB (DB_IP) {
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

  const db = {}

  const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options,
  )

  const reservedFile = [basename, 'func.js', 'joinTables.js', 'common.js']

  try {
    fs
      .readdirSync(__dirname)
      .filter(
        file =>
          file.indexOf('.') !== 0 &&
          !reservedFile.includes(file) &&
          file.slice(-3) === '.js',
      )
      .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file))
        db[model.name] = model
      })

    Object.keys(db).forEach(modelName => {
      if (db[modelName].associate) {
        db[modelName].associate(db)
      }
    })

    db.sequelize = sequelize
    db.Sequelize = Sequelize

    await db.sequelize.sync()
  } catch (e) {
    console.error(e)
    sequelize.close()
  }

  return db
}