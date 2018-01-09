const {unionIdConfig} = require('./common')

const name = 'Schedule_User'
const fnModel = (sequelize, DataTypes) => {
  return sequelize.define(name, {
    ScheduleId: unionIdConfig(DataTypes),
    UserId: unionIdConfig(DataTypes),
  })
}

module.exports = {
  name, fnModel,
}