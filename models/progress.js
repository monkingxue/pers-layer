const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let Progress = sequelize.define('Progress', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    order: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  })

  Progress.associate = ({Progress, User, Project, Task}) => {
    Progress.belongsTo(User, {as: 'Owner', ...foreignKeyConfig})
    Progress.belongsTo(Project, foreignKeyConfig)
    Progress.hasMany(Task, foreignKeyConfig)
  }

  return Progress
}
  