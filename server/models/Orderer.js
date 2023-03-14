export default function(sequelize, DataTypes) {
  const model = sequelize.define('orderer', {
    phone: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return model;
}
