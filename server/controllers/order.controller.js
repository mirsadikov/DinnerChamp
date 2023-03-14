import { Op } from 'sequelize';
import { Order, OrderDish, Restaurant, Dish, Orderer } from '../config/sequelize.js';
import io from '../socket/socket.js';

const getOrders = async (restaurantId, ofTheLastHours) => {
  const orders = await Order.findAll({
    where: {
      restaurantId: restaurantId,
      // if hour is not provided, get all orders
      ...(ofTheLastHours && {
        createdAt: {
          [Op.gt]: new Date(new Date() - ofTheLastHours * 60 * 60 * 1000),
        },
      }),
    },
    include: {
      nest: true,
      model: OrderDish,
      as: 'orderDishes',
      include: {
        model: Dish,
        as: 'dish',
      },
    },
    order: [['createdAt', 'DESC']],
  });

  const flattenOrders = orders.map((order) => ({
    ...order.toJSON(),
    orderDishes: order.orderDishes.map((orderDish) => {
      const { dish, ...orderDishWithoutDish } = orderDish.toJSON();
      return {
        ...orderDishWithoutDish,
        dishName: dish.name,
      };
    }),
  }));

  return flattenOrders;
};

export const createOrder = async (req, res, next) => {
  try {
    const { orderer, restaurantId, orderDishes, comment, code } = req.body;

    // if missing required fields
    if (!orderer || !orderer.phone || !orderer.name || !restaurantId || !orderDishes || !code) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    // if no ordered dishes
    if (orderDishes.length === 0) {
      return res.status(400).json({
        message: 'Order must have at least one dish',
      });
    }

    // if code is incorrect
    const ordererInDB = await Orderer.findOne({
      where: {
        phone: orderer.phone,
        code,
      },
    });

    if (!ordererInDB) {
      return res.status(400).json({
        message: 'Incorrect code',
      });
    }

    //  check if restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: 'Restaurant not found',
      });
    }

    // if restaurant is closed
    if (!restaurant.running) {
      return res.status(400).json({
        message: 'Restaurant is closed',
      });
    }

    //  check if dishes exist and on sale
    const dishIds = orderDishes.map((orderDish) => orderDish.id);

    const dishes = await Dish.findAll({
      where: {
        id: dishIds,
        restaurantId: restaurant.id,
        onSale: true,
      },
    });

    if (dishes.length !== dishIds.length) {
      return res.status(404).json({
        message: 'Some dishes are not found or not on sale',
      });
    }

    // map orderDish.quantity to dishes
    const dishesWithQuantity = dishes.map((dish) => {
      const orderDish = orderDishes.find((orderDish) => orderDish.id === dish.id);
      return {
        dishId: dish.id,
        price: dish.price,
        quantity: orderDish.quantity,
      };
    });

    // create order
    const order = await Order.create({
      ordererName: orderer.name,
      ordererPhone: orderer.phone,
      restaurantId,
      total: dishesWithQuantity.reduce((total, dish) => total + dish.price * dish.quantity, 0),
      comment,
    });

    // create orderDishes for many-to-many relationship
    const orderDishesToCreate = dishesWithQuantity.map((dish) => ({
      orderId: order.id,
      ...dish,
    }));

    await OrderDish.bulkCreate(orderDishesToCreate);

    // emit new order to restaurant
    io.emitTo(restaurantId, 'order:create', await getOrders(restaurantId, 24));

    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const flattenOrders = await getOrders(req.restaurant.id);
    return res.status(200).json(flattenOrders);
  } catch (error) {
    next(error);
  }
};

export const sendCode = async (req, res, next) => {
  try {
    // generate random 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000);

    const { phone } = req.body;

    // if missing required fields
    if (!phone) {
      return res.status(400).json({
        message: 'Missing required fields',
      });
    }

    Orderer.upsert({
      phone,
      code,
    });

    // TODO
    // send to phone number with twilio

    console.log(`CODE for ${phone}: `, code);

    return res.status(200).json();
  } catch (error) {
    next(error);
  }
};
