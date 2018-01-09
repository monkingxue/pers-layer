const {unionIdConfig} = require('./common')

const name = 'Project_User'
const fnModel = (sequelize, DataTypes) => {
  return sequelize.define(name, {
    ProjectId: unionIdConfig(DataTypes),
    UserId: unionIdConfig(DataTypes),
  })
}

module.exports = {
  name, fnModel,
}