import bcrypt from 'bcrypt';

export default function (sequelize, DataTypes) {
  const model = sequelize.define(
    'restaurant',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      img: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      running: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      hooks: {
        beforeSave: async (restaurant) => {
          if (restaurant.changed('password')) {
            restaurant.password = await bcrypt.hash(restaurant.password, 10);
          }
        },
      },
    },
  );

  model.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword.toString(), this.password);
  };

  return model;
}
