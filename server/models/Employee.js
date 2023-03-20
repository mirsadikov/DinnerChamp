export default function (sequelize, DataTypes) {
  const model = sequelize.define('employee', {
    staffId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return model;
}
