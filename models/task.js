const {taskUser, taskFile} = require('./joinTables')
const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let Task = sequelize.define('Task', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    ddl: DataTypes.DATE,
    state: DataTypes.BOOLEAN,
  })

  Task.associate = ({Task, Progress, User, Comment, Subtask, TaskOperation, File}) => {
    Task.belongsTo(Progress, foreignKeyConfig)
    Task.belongsTo(User, {as: 'Owner', ...foreignKeyConfig})
    Task.belongsToMany(User, {through: taskUser})
    Task.belongsToMany(File, {through: taskFile})
    Task.hasMany(Comment)
    Task.hasMany(Subtask)
    Task.hasMany(TaskOperation, foreignKeyConfig)
  }

  return Task
}
  