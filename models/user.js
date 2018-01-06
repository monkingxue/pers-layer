const {projectUser, taskUser, scheduleUser} = require('./joinTables')
const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })

  User.associate = ({User, UserInfo, Project, Task, Comment, Schedule, Subtask, UserPermission}) => {
    User.hasOne(UserInfo, foreignKeyConfig)

    User.belongsToMany(Project, {through: projectUser})
    User.belongsToMany(Task, {through: taskUser})
    User.belongsToMany(Schedule, {through: scheduleUser})

    User.hasMany(Comment)
    User.hasMany(Subtask)
    User.hasMany(UserPermission, foreignKeyConfig)
  }

  return User
}
