const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let UserPermission = sequelize.define('UserPermission', {
    /* Permission
     * [Required]
     * public Permission Permission { get; set; }
     */
  })

  UserPermission.associate = ({UserPermission, Project, User}) => {
    UserPermission.belongsTo(Project, foreignKeyConfig)
    UserPermission.belongsTo(User, foreignKeyConfig)
  }

  return UserPermission
}
  