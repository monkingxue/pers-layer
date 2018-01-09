const {foreignKeyConfig} = require('./common')

const name = 'Progress'
const fnModel = (sequelize, DataTypes) => {
  let Progress = sequelize.define(name, {
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

module.exports = {
  name, fnModel,
}