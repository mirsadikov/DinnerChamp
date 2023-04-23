import moment from 'moment';
import Sequelize, { Op } from 'sequelize';
import { Order, Restaurant } from '../config/sequelize.js';
import generateToken from '../utils/tokenGenerator.js';
import { removeS3, uploadS3 } from '../utils/imgStorage.js';
import io from '../socket/socket.js';

export async function registerRestaurant(req, res, next) {
  try {
    const { name, email, phone, password, description } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const restaurantExists = await Restaurant.findOne({
      where: { email: email.toLowerCase() },
    });

    if (restaurantExists) {
      res.status(400);
      throw new Error('This email is linked to another account!');
    }

    const restaurant = await Restaurant.create({
      name,
      email: email.toLowerCase(),
      phone,
      password,
      description,
    });

    const payload = { id: restaurant.id, email: restaurant.email };

    res.status(201).json({
      id: restaurant.id,
      name: restaurant.name,
      email: restaurant.email,
      phone: restaurant.role,
      description: restaurant.description,
      token: `Bearer ${generateToken(payload)}`,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginRestaurant(req, res, next) {
  try {
    const { email, password, tablet } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const restaurant = await Restaurant.findOne({
      where: { email: email.toLowerCase() },
    });

    if (restaurant) {
      if (await restaurant.matchPassword(password)) {
        const payload = {
          id: restaurant.id,
          email: restaurant.email,
        };

        res.status(200).json({
          id: restaurant.id,
          name: restaurant.name,
          email: restaurant.email,
          phone: restaurant.role,
          description: restaurant.description,
          // if from tablet never expire
          token: `Bearer ${generateToken(payload, tablet ? '-1' : null)}`,
        });
      } else {
        res.status(401);
        throw new Error('Incorrect email or password!');
      }
    } else {
      res.status(404);
      throw new Error('Restaurant not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['password'] },
    });

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404);
      throw new Error('Restaurant not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function getAllRestaurants(req, res, next) {
  try {
    let restaurants;
    // check if params are passed
    if (req.query && req.query.search) {
      const { search } = req.query;
      restaurants = await Restaurant.findAll({
        where: {
          [Op.or]: [
            { name: { [Op.iLike]: `%${search}%` } },
            { city: { [Op.iLike]: `%${search}%` } },
          ],
        },
        attributes: { exclude: ['password'] },
        limit: 10,
      });
    } else {
      restaurants = await Restaurant.findAll({
        attributes: { exclude: ['password'] },
      });
    }

    res.status(200).json(restaurants);
  } catch (error) {
    next(error);
  }
}

export async function updateRestaurant(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.params.id, email: req.restaurant.email },
    });

    if (restaurant) {
      const { name, email, phone, description, address, city, running } = req.body;

      if (!name || !email) {
        res.status(400);
        throw new Error('Name and email are required!');
      }

      restaurant.name = name || restaurant.name;
      restaurant.email = email || restaurant.email;
      restaurant.phone = phone === '' ? null : phone || restaurant.phone;
      restaurant.description = description === '' ? null : description || restaurant.description;
      restaurant.address = address === '' ? null : address || restaurant.address;
      restaurant.city = city === '' ? null : city || restaurant.city;
      restaurant.running = typeof running === 'boolean' ? running : restaurant.running;

      const updatedRestaurant = await restaurant.save();
      updatedRestaurant.password = undefined;

      res.status(200).json(updatedRestaurant);
    } else {
      res.status(404);
      throw new Error('Restaurant not found!');
    }
  } catch (error) {
    next(error);
  }
}

export async function setRestaurantImage(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.restaurant.id },
      attributes: { exclude: ['password'] },
    });
    const { image } = req.files;

    if (!image) {
      res.status(400);
      throw new Error('No file provided!');
    }

    const img = await uploadS3(image);

    if (!img.key) {
      res.status(500);
      throw new Error(img.error);
    }

    if (restaurant.img) removeS3(restaurant.img);

    restaurant.img = img.key;
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
}

export async function removeRestaurantImage(req, res, next) {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: req.restaurant.id },
      attributes: { exclude: ['password'] },
    });

    if (!restaurant.img) {
      res.status(200).json(restaurant);
      return;
    }

    removeS3(restaurant.img);
    restaurant.img = null;
    await restaurant.save();

    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
}

export async function getStatistics(req, res, next) {
  try {
    const { time: timeQuery, offset } = req.query;

    let time;
    let periodUnit;
    let periodName;

    switch (timeQuery) {
      case 'year':
        periodUnit = 'month';
        time = moment().subtract(1, 'year').toDate();
        periodName = 'MONTH';
        break;
      case 'month':
        periodUnit = 'week';
        time = moment().subtract(2, 'month').toDate();
        periodName = 'WEEK';
        break;
      case 'week':
        periodUnit = 'day';
        time = moment().subtract(1, 'week').toDate();
        periodName = 'ISODOW';
        break;
      default:
        periodUnit = 'hour';
        time = moment().subtract(1, 'day').toDate();
        periodName = 'HOUR';
    }

    // total orders
    const totalOrders = await Order.count({
      where: {
        restaurantId: req.restaurant.id,
        createdAt: {
          [Op.gte]: time,
        },
      },
    });

    // total revenue
    const totalRevenue = await Order.sum('total', {
      where: {
        restaurantId: req.restaurant.id,
        createdAt: {
          [Op.gte]: time,
        },
      },
    });

    // total customers
    const totalCustomers = await Order.count({
      where: {
        restaurantId: req.restaurant.id,
        createdAt: {
          [Op.gte]: time,
        },
      },
      distinct: true,
      col: 'ordererPhone',
    });

    // orders by period
    const orderByPeriod = await Order.findAll({
      attributes: [
        [
          Sequelize.literal(
            `date_trunc('${periodUnit}', "createdAt" AT TIME ZONE 'UTC' AT TIME ZONE '${offset}') AT TIME ZONE 'UTC'`
          ),
          'period',
        ],
        [
          Sequelize.literal(
            `EXTRACT(${periodName} FROM "createdAt" AT TIME ZONE 'UTC' AT TIME ZONE '${offset}')`
          ),
          'periodName',
        ],
        [Sequelize.fn('count', Sequelize.col('id')), 'count'],
      ],
      where: {
        restaurantId: req.restaurant.id,
        createdAt: {
          [Op.gte]: time,
        },
      },
      group: ['periodName', 'period'],
      order: ['period'],
    });

    res.json({ timeQuery, totalOrders, totalRevenue, totalCustomers, orderByPeriod });
  } catch (error) {
    next(error);
  }
}

export async function switchRestaurant(restaurantId, newStatus) {
  try {
    const restaurant = await Restaurant.findOne({
      where: { id: restaurantId },
      attrubutes: ['running'],
    });

    if (restaurant) {
      restaurant.running = newStatus.isOnline;
      await restaurant.save();
    }

    return restaurant;
  } catch (err) {
    return io.emit('error', err);
  }
}
