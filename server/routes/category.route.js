import express from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryWithDishes,
} from '../controllers/category.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:restaurantId', getAllCategories);
router.get('/:restaurantId/:categoryId', getCategoryWithDishes);
router.post('/create', authAdmin, createCategory);
router.put('/:categoryId', authAdmin, updateCategory);
router.delete('/:categoryId', authAdmin, deleteCategory);

export default router;
