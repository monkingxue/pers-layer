const {taskFile} = require('./joinTables')
const {foreignKeyConfig} = require('./common')

module.exports = (sequelize, DataTypes) => {
  let File = sequelize.define('File', {
    name: {
      allowNull: false,
      type: DataTypes.STRING(40),
    },
    content: {
      type: DataTypes.BLOB // TODO: check here
    },
    uploadTime: {
      type: DataTypes.DATE,
    },
  })

  File.associate = ({File, User, Project, Task}) => {
    File.belongsTo(User, foreignKeyConfig)
    File.belongsTo(Project, foreignKeyConfig)

    File.belongsToMany(Task, {through: taskFile})
  }

  return File
}
