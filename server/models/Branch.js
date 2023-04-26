import bcrypt from 'bcrypt';

export default function (sequelize, DataTypes) {
  const model = sequelize.define(
    'branch',
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
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      running: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      }
    },
    {
      timestamps: false,
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
