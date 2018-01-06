const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let Comment = sequelize.define('Comment', {
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
