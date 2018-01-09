const {foreignKeyConfig} = require('./common')

const name = 'File'
const fnModel = (sequelize, DataTypes) => {
  let File = sequelize.define(name, {
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

  }

  return File
}

module.exports = {
  name, fnModel,
}
