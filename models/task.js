const {foreignKeyConfig} = require('./common')

const name = 'Task'
const fnModel = (sequelize, DataTypes) => {
  let Task = sequelize.define(name, {
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

  Task.associate = ({Task, Progress, User, Comment, Subtask, TaskOperation}) => {
    Task.belongsTo(Progress, foreignKeyConfig)
    Task.belongsTo(User, {as: 'Owner', ...foreignKeyConfig})
    Task.hasMany(Comment)
    Task.hasMany(Subtask)
    Task.hasMany(TaskOperation, foreignKeyConfig)
  }

  return Task
}

module.exports = {
  name, fnModel,
}