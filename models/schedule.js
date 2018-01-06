const {scheduleUser} = require('./joinTables')
const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let Schedule = sequelize.define('Schedule', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    repeatDaily: DataTypes.BOOLEAN,
    repeatWeekly: DataTypes.BOOLEAN,
    location: DataTypes.STRING(40),
  })

  Schedule.associate = ({Schedule, Project, User}) => {
    Schedule.belongsTo(Project, foreignKeyConfig)
    Schedule.belongsTo(User, {as: 'Owner', ...foreignKeyConfig})
    Schedule.belongsToMany(User, {through: scheduleUser})
  }
  return Schedule
}
