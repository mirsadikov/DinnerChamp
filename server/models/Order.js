export default function (sequelize, DataTypes) {
  const model = sequelize.define('order', {
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ordererName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ordererPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    // timestapms only createdAt
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: false,
  });

  return model;
}
