const {foreignKeyConfig} = require('./common')

const name = 'Subtask'
const fnModel = (sequelize, DataTypes) => {
  let Subtask = sequelize.define(name, {
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

module.exports = {
  name, fnModel,
}