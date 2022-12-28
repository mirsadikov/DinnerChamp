import { Dish } from '../config/sequelize.js';
import { removeS3, uploadS3 } from '../utils/imgStorage.js';

export async function getAllDishes(req, res, next) {
  try {
    // Get all dishes for a restaurant
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

    // Check if the restaurant is authorized to create a dish
    if (req.restaurant.id != req.params.restaurantId) {
      res.status(403);
      throw new Error(
        'You are not authorized to create a dish for this restaurant!',
      );
    }

    // Validate input
    if (!name || !price) {
      res.status(400);
      throw new Error('Invalid input!');
    }

    // If there is an image, upload it to S3
    if (req.files?.image) {
      const imgUploaded = await uploadS3(req.files.image);

      // If image upload failed, throw an error
      if (!imgUploaded.key) {
        res.status(500);
        throw new Error(imgUploaded.error);
      }

      req.body.image = imgUploaded.key;
    }

    // Create the dish
    const dish = await Dish.create({
      name,
      price,
      description,
      restaurantId: req.restaurant.id,
      image: req.body.image,
    });

    res.status(201).json(dish);
  } catch (error) {
    next(error);
  }
}

export async function updateDish(req, res, next) {
  try {
    const dish = await Dish.findOne({
      where: { id: req.params.dishId, restaurantId: req.restaurant.id },
    });

    if (!dish) {
      res.status(404);
      throw new Error('Dish not found!');
    }

    const { name, price, description, removeImage } = req.body;

    if (req.files?.image) {
      await removeS3(dish.image);
      const imgUploaded = await uploadS3(req.files.image);

      if (!imgUploaded.key) {
        res.status(500);
        throw new Error(imgUploaded.error);
      }

      dish.image = imgUploaded.key;
    } else if (removeImage) {
      await removeS3(dish.image);
      dish.image = null;
    }

    if (name) dish.name = name;
    if (price) dish.price = price;
    if (description) dish.description = description;

    const updatedDish = await dish.save();
    updatedDish.password = undefined;

    res.status(200).json(updatedDish);
  } catch (error) {
    next(error);
  }
}

export async function deleteDish(req, res, next) {
  try {
    const dish = await Dish.findOne({
      where: {
        id: req.params.dishId,
        restaurantId: req.restaurant.id,
      },
    });

    if (!dish) {
      res.status(404);
      throw new Error('Dish not found!');
    }

    if (dish.image) {
      await removeS3(dish.image);
    }

    await dish.destroy();
    res.status(200).json({ message: 'Dish deleted successfully!' });
  } catch (error) {
    next(error);
  }
}
