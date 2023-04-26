import { Branch } from '../config/sequelize.js';
import generateToken from '../utils/tokenGenerator.js';
import io from '../socket/socket.js';

export async function createBranch(req, res, next) {
  try {
    const { name, email, phone, password, address, city, running } = req.body;

    // Check if the restaurant is authorized to create a branch
    if (req.restaurant.id != req.params.restaurantId) {
      res.status(403);
      throw new Error('You are not authorized to create a branch for this restaurant!');
    }

    // Validate input
    if (!name || !email || !password || !address || !city) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    // Create the branch
    const branch = await Branch.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      address,
      city,
      running,
      restaurantId: req.params.restaurantId,
    });

    res.status(201).json({
      id: branch.id,
      name: branch.name,
      email: branch.email,
      phone: branch.phone,
      address: branch.address,
      city: branch.city,
      running: branch.running,
      restaurantId: branch.restaurantId,
    });
  } catch (error) {
    next(error);
  }
}

export async function getBranches(req, res, next) {
  try {
    const branches = await Branch.findAll({
      where: { restaurantId: req.params.restaurantId },
      attributes: {
        exclude: ['password', 'orderNumber'],
      },
    });

    res.status(200).json(branches);
  } catch (error) {
    next(error);
  }
}

export async function getOpenBranches(req, res, next) {
  try {
    const branches = await Branch.findAll({
      where: {
        restaurantId: req.params.restaurantId,
        running: true,
      },
      attributes: {
        exclude: ['password', 'orderNumber'],
      },
    });

    res.status(200).json(branches);
  } catch (error) {
    next(error);
  }
}

export async function updateBranch(req, res, next) {
  try {
    const branch = await Branch.findOne({
      where: { id: req.params.id, restaurantId: req.restaurant.id },
    });

    if (branch) {
      const { name, email, phone, password, address, city, running } = req.body;

      if (!name || !email || !address || !city) {
        res.status(400);
        throw new Error('Invalid field input!');
      }

      branch.name = name || branch.name;
      branch.email = email || branch.email;
      branch.phone = phone || branch.phone;
      branch.address = address || branch.address;
      branch.city = city || branch.city;
      branch.password = password && password.trim() ? password : branch.password;
      branch.running = typeof running === 'boolean' ? running : branch.running;

      const updatedBranch = await branch.save();
      updatedBranch.password = undefined;

      res.status(200).json(updatedBranch);
    } else {
      res.status(404);
      throw new Error('Branch not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteBranch(req, res, next) {
  try {
    const branch = await Branch.findOne({
      where: { id: req.params.id, restaurantId: req.restaurant.id },
    });

    if (branch) {
      await branch.destroy();
      res.status(200).json({ message: 'Branch deleted!' });
    } else {
      res.status(404);
      throw new Error('Branch not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function loginBranch(req, res, next) {
  try {
    const { email, password, tablet } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const branch = await Branch.findOne({
      where: { email: email.toLowerCase() },
    });

    if (branch) {
      if (await branch.matchPassword(password)) {
        const payload = {
          id: branch.id,
          email: branch.email,
          restaurantId: branch.restaurantId,
          branchId: branch.id,
        };

        res.status(200).json({
          id: branch.id,
          name: branch.name,
          email: branch.email,
          // if from tablet never expire
          token: `Bearer ${generateToken(payload, tablet ? '-1' : null)}`,
        });
      } else {
        res.status(401);
        throw new Error('Incorrect email or password!');
      }
    } else {
      res.status(404);
      throw new Error('Branch not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function switchBranch(branchId, restaurantId, newStatus) {
  try {
    const branch = await Branch.findOne({
      where: { id: branchId, restaurantId: restaurantId },
      attrubutes: ['running'],
    });

    if (branch) {
      branch.running = newStatus.isOnline;
      await branch.save();
    }

    return branch;
  } catch (err) {
    return io.emit('error', err);
  }
}

export async function resetOrderNumber(branchId) {
  try {
    const branch = await Branch.findByPk(branchId);

    if (branch) {
      branch.orderNumber = 1;
      await branch.save();
    }
  } catch (err) {
    return io.emit('error', err);
  }
}
