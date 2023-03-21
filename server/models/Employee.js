import bcrypt from 'bcrypt';

export default function (sequelize, DataTypes) {
  const model = sequelize.define(
    'employee',
    {
      staffId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      hooks: {
        beforeSave: async (employee) => {
          if (employee.changed('password')) {
            employee.password = await bcrypt.hash(employee.password, 10);
          }
        },
      },
    }
  );

  model.prototype.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword.toString(), this.password);
  };

  return model;
}
