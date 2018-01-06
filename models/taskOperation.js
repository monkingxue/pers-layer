const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let TaskOperation = sequelize.define('TaskOperation', {
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
  