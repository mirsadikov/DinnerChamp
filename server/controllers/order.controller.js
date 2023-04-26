import { Op } from 'sequelize';
import { Order, OrderDish, Restaurant, Dish, Branch } from '../config/sequelize.js';
import io from '../socket/socket.js';

export const getOrders = async (restaurantId, branchId, ofTheLastHours) => {
  const orders = await Order.findAll({
    where: {
      restaurantId: restaurantId,
      branchId: branchId,
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

export const updateOrder = async (id, status) => {
  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return io.emit('error', 'Order not found');
    }

    order.status = status;
    await order.save();

    // emit to restaurant
    io.emitTo(order.restaurantId, order.branchId, 'order:update', order);
  } catch (err) {
    return io.emit('error', err);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { ordererName, restaurantId, orderDishes, comment, branchId } = req.body;

    // if missing required fields
    if (!ordererName || !restaurantId || !orderDishes || !branchId) {
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

    //  check if restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: 'Restaurant not found',
      });
    }

    // check if branch exists
    const branch = await Branch.findOne({
      where: {
        id: branchId,
        restaurantId: restaurant.id,
      },
    });

    if (!branch) {
      return res.status(404).json({
        message: 'Branch not found',
      });
    }

    // if branch is closed
    if (!branch.running) {
      return res.status(400).json({
        message: 'Branch is closed',
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
      number: branch.orderNumber,
      ordererName: ordererName,
      ordererPhone: req.orderer.number,
      restaurantId,
      branchId,
      total: dishesWithQuantity.reduce((total, dish) => total + dish.price * dish.quantity, 0),
      comment,
    });

    // create orderDishes for many-to-many relationship
    const orderDishesToCreate = dishesWithQuantity.map((dish) => ({
      orderId: order.id,
      ...dish,
    }));

    await OrderDish.bulkCreate(orderDishesToCreate);

    // update order number
    branch.orderNumber++;
    await branch.save();

    // emit new order to restaurant
    io.emitTo(restaurantId, branchId, 'order:read', await getOrders(restaurantId, branchId, 24));

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
