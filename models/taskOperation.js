const {foreignKeyConfig} = require('./common')

const name = 'TaskOperation'
const fnModel = (sequelize, DataTypes) => {
  let TaskOperation = sequelize.define(name, {
    content: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
  })

  TaskOperation.associate = ({TaskOperation, Task, User}) => {
    TaskOperation.belongsTo(Task, foreignKeyConfig)
    TaskOperation.belongsTo(User, foreignKeyConfig)
  }

  return TaskOperation
}

module.exports = {
  name, fnModel,
}