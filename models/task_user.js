const {unionIdConfig} = require('./common')

const name = 'Task_User'
const fnModel = (sequelize, DataTypes) => {
  return sequelize.define(name, {
    TaskId: unionIdConfig(DataTypes),
    UserId: unionIdConfig(DataTypes),
  })
}

module.exports = {
  name, fnModel,
}