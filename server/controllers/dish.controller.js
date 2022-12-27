import { Dish } from '../config/sequelize.js';

export async function getAllDishes(req, res, next) {
  try {
    const dishes = await Dish.findAll({
      where: { restaurantId: req.params.restaurantId },
    });

    res.status(200).json(dishes);
  } catch (error) {
    next(error);
  }
}

export async function createDish(req, res, next) {
  try {
    const { name, price, description } = req.body;

    if (req.restaurant.id != req.params.restaurantId) {
      res.status(403);
      throw new Error('You are not authorized to create a dish for this restaurant!');
    }

    if (!name || !price) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    const dish = await Dish.create({name, price, description, restaurantId: req.restaurant.id});

    res.status(201).json(dish);
  } catch (error) {
    next(error);
  }
}