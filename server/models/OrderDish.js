export default function (sequelize, DataTypes) {
  const model = sequelize.define('orderDish', {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    price: {
      type: DataTypes.INTEGER(15),
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    timestamps: false,
  })

  return model;
}