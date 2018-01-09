const {foreignKeyConfig} = require('./common')

const name = 'Comment'
const fnModel = (sequelize, DataTypes) => {
  let Comment = sequelize.define(name, {
    content: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    time: {
      type: DataTypes.DATE,
    },
  })

  Comment.associate = ({Comment, User, Task}) => {
    Comment.belongsTo(User, foreignKeyConfig)
    Comment.belongsTo(Task, foreignKeyConfig)
  }

  return Comment
}

module.exports = {
  name, fnModel,
}
