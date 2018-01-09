const {foreignKeyConfig} = require('./common')

const name = 'User'
const fnModel = (sequelize, DataTypes) => {
  let User = sequelize.define(name, {
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

  User.associate = ({User, UserInfo, Comment, Subtask, UserPermission}) => {
    User.hasOne(UserInfo, foreignKeyConfig)

    User.hasMany(Comment)
    User.hasMany(Subtask)
    User.hasMany(UserPermission, foreignKeyConfig)
  }

  return User
}

module.exports = {
  name, fnModel,
}