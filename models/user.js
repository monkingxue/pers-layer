module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  })

  User.associate = ({ User, UserInfo }) => {
    User.hasOne(UserInfo)
  }

  return User
}
