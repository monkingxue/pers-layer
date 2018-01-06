const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let Subtask = sequelize.define('Subtask', {
    content: {
      allowNull: false,
      type: DataTypes.STRING(80),
    },
    state: DataTypes.BOOLEAN,
  })

  Subtask.associate = ({Subtask, User, Task}) => {
    Subtask.belongsTo(User, foreignKeyConfig)
    Subtask.belongsTo(Task, foreignKeyConfig)
  }

  return Subtask
}