import { Employee } from '../config/sequelize.js';

export const createEmployee = async (req, res, next) => {
  try {
    const { staffId, name } = req.body;

    // if staffId is used
    const employeeExist = await Employee.findOne({
      where: {
        staffId,
      },
    });
    if (employeeExist) {
      return res.status(400).json({
        message: 'Staff ID is already used',
      });
    }

    const employee = await Employee.create({
      staffId,
      name,
      restaurantId: req.restaurant.id,
    });
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.findAll({
      where: {
        restaurantId: req.restaurant.id,
      },
    });
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
        restaurantId: req.restaurant.id,
      },
    });

    if (!employee) {
      res.status(404);
      throw new Error('Employee not found!');
    }

    const { staffId, name } = req.body;

    // if staffId is used
    const employeeExist = await Employee.findOne({
      where: {
        staffId,
      },
    });

    if (employeeExist && employeeExist.id !== employee.id) {
      res.status(400);
      throw new Error('Staff ID is already used');
    }

    employee.staffId = staffId;
    employee.name = name;

    const updatedEmp = await employee.save();

    res.status(200).json(updatedEmp);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      where: {
        id: req.params.id,
        restaurantId: req.restaurant.id,
      },
    });

    if (!employee) {
      res.status(404);
      throw new Error('Employee not found!');
    }

    await employee.destroy();
    res.status(200).json({ message: 'Employee deleted successfully!' });
  } catch (error) {
    next(error);
  }
};
