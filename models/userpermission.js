const {foreignKeyConfig} = require('./common')

const name = 'UserPermission'
const fnModel = (sequelize, DataTypes) => {
  let UserPermission = sequelize.define(name, {
    /* Permission
     * [Required]
     */
  })

  UserPermission.associate = ({UserPermission, Project, User}) => {
    UserPermission.belongsTo(Project, foreignKeyConfig)
    UserPermission.belongsTo(User, foreignKeyConfig)
  }

  return UserPermission
}

module.exports = {
  name, fnModel,
}