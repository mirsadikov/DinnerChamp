export default function(sequelize, DataTypes) {
  const model = sequelize.define('category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });

  return model;
}
