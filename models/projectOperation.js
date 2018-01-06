const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let ProjectOperation = sequelize.define('ProjectOperation', {
    time: DataTypes.DATE,
    content: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
  })

  ProjectOperation.associate = ({ProjectOperation, Project, User}) => {
    ProjectOperation.belongsTo(Project, foreignKeyConfig)
    ProjectOperation.belongsTo(User, foreignKeyConfig)
  }

  return ProjectOperation
}
  