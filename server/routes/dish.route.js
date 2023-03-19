import express from 'express';
import {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
  getAllDishesOnSale,
} from '../controllers/dish.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:restaurantId/all', getAllDishes);
router.get('/:restaurantId', getAllDishesOnSale);
router.post('/:restaurantId', authAdmin, createDish);
router.put('/:dishId', authAdmin, updateDish);
router.delete('/:dishId', authAdmin, deleteDish);

export default router;
