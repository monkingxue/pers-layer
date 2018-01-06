const {projectUser} = require('./joinTables')
const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let Project = sequelize.define('Project', {
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
    Project.belongsToMany(User, {through: projectUser})

    Project.hasMany(Progress)
    Project.hasMany(Schedule, foreignKeyConfig)
    Project.hasMany(ProjectOperation, foreignKeyConfig)
    Project.hasMany(UserPermission, foreignKeyConfig)
    Project.hasMany(File)
  }

  return Project
}
  