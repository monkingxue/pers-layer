const {foreignKeyConfig} = require('./common')

const name = 'Project'
const fnModel = (sequelize, DataTypes) => {
  let Project = sequelize.define(name, {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  })

  Project.associate = ({Project, Progress, Schedule, User, ProjectOperation, UserPermission, File}) => {
    Project.belongsTo(User, {as: 'Owner', ...foreignKeyConfig})

    Project.hasMany(Progress)
    Project.hasMany(Schedule, foreignKeyConfig)
    Project.hasMany(ProjectOperation, foreignKeyConfig)
    Project.hasMany(UserPermission, foreignKeyConfig)
    Project.hasMany(File)
  }

  return Project
}

module.exports = {
  name, fnModel,
}
  