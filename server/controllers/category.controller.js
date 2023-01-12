import { Category } from '../config/sequelize.js';

export async function createCategory(req, res, next) {
  try {
    const { name } = req.body;

    const category = await Category.create({
      name,
      restaurantId: req.restaurant.id,
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

export async function getAllCategories(req, res, next) {
  try {
    const categories = await Category.findAll({
      where: { restaurantId: req.params.restaurantId },
    });

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

export async function getCategory(req, res) {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId, restaurantId: req.params.restaurantId },
    });

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

export async function updateCategory(req, res, next) {
  try {
    const { name } = req.body;

    const category = await Category.findOne({
      where: { id: req.params.categoryId, restaurantId: req.restaurant.id },
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const updatedCategory = await category.update({
      name,
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
}

export async function deleteCategory(req, res, next) {
  try {
    const category = await Category.findOne({
      where: { id: req.params.categoryId, restaurantId: req.restaurant.id },
    });

    if (!category) return res.status(404).json({ message: 'Category not found' });

    await category.destroy();

    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (error) {
    next(error);
  }
}
