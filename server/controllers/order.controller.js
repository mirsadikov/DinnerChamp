import { Order, OrderDish, Restaurant, Dish } from '../config/sequelize.js';

export const createOrder = async (req, res, next) => {
  try {
    const { orderer, restaurantId, orderDishes } = req.body;

    if (!orderer || !orderer.phone || !orderer.name || !restaurantId || !orderDishes) {
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

    const order = await Order.create({
      ordererName: orderer.name,
      ordererPhone: orderer.phone,
      restaurantId,
      total: dishesWithQuantity.reduce((total, dish) => total + dish.price * dish.quantity, 0),
    });

    const orderDishesToCreate = dishesWithQuantity.map((dish) => ({
      orderId: order.id,
      ...dish,
    }));

    await OrderDish.bulkCreate(orderDishesToCreate);

    return res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};
