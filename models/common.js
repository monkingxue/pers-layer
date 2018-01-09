/**
 * Created by xueyingchen.
 */
module.exports = {
  foreignKeyConfig: {
    foreignKey: {
      allowNull: false,
    },
    onDelete: 'CASCADE',
  },
  unionIdConfig: ({INTEGER}) => ({
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
  }),
}