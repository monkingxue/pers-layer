module.exports = (sequelize, DataTypes) => {
  let UserInfo = sequelize.define('UserInfo', {
    name: DataTypes.STRING(20),
    address: DataTypes.STRING(20),
    gender: DataTypes.BOOLEAN,
    phoneNumber: DataTypes.STRING(20),
    job: DataTypes.STRING(40),
    website: DataTypes.STRING(40),
    avatar: DataTypes.STRING,
    birthday: DataTypes.DATE
  })

  UserInfo.associate = ({ User, UserInfo }) => {
    UserInfo.belongsTo(User)
  }

  return UserInfo
}
