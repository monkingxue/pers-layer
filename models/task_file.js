const {unionIdConfig} = require('./common')

const name = 'Task_File'
const fnModel = (sequelize, DataTypes) => {
  return sequelize.define(name, {
    TaskId: unionIdConfig(DataTypes),
    FileId: unionIdConfig(DataTypes),
  })
}

module.exports = {
  name, fnModel,
}