import express from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
} from '../controllers/category.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:restaurantId', getAllCategories);
router.get('/:restaurantId/:categoryId', getCategory);
router.post('/create', auth, createCategory);
router.put('/:categoryId', auth, updateCategory);
router.delete('/:categoryId', auth, deleteCategory);

export default router;
