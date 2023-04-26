import { Employee } from '../config/sequelize.js';
import generateToken from '../utils/tokenGenerator.js';

export const createEmployee = async (req, res, next) => {
  try {
    const { staffId, name, password } = req.body;

    if (!staffId || !name || !password) {
      return res.status(400).json({
        message: 'Invalid input',
      });
    }

    // if staffId is used
    const employeeExist = await Employee.findOne({
      where: {
        staffId,
        restaurantId: req.restaurant.id,
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
      password,
    });
    res.status(201).json({
      id: employee.id,
      staffId: employee.staffId,
      name: employee.name,
      restaurantId: employee.restaurantId,
    });
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
      attributes: { exclude: ['password'] },
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

    const { staffId, name, password } = req.body;

    // if staffId is used
    const employeeExist = await Employee.findOne({
      where: {
        staffId,
        restaurantId: req.restaurant.id,
      },
    });

    if (employeeExist && employeeExist.id !== employee.id) {
      res.status(400);
      throw new Error('Staff ID is already used');
    }

    if (staffId) employee.staffId = staffId;
    if (name) employee.name = name;
    if (password) employee.password = password;

    const updatedEmp = await employee.save();
    updatedEmp.password = undefined;

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

export const loginEmployee = async (req, res, next) => {
  try {
    const { staffId, password } = req.body;

    if (!staffId || !password) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const employee = await Employee.findOne({
      where: { staffId, restaurantId: req.branch.restaurantId },
    });

    if (employee) {
      if (await employee.matchPassword(password)) {
        const payload = {
          id: employee.id,
          staffId: employee.staffId,
          restaurantId: employee.restaurantId,
          branchId: req.branch.id,
        };

        res.status(200).json({
          id: employee.id,
          staffId: employee.staffId,
          name: employee.name,
          restaurantId: employee.restaurantId,
          token: `Bearer ${generateToken(payload, '1d')}`,
        });
      } else {
        res.status(401);
        throw new Error('Incorrect ID or password!');
      }
    } else {
      res.status(404);
      throw new Error('Employee not found!');
    }
  } catch (error) {
    next(error);
  }
};
