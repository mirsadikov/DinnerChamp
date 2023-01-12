import express from 'express';
import {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
  getAllDishesOnSale,
} from '../controllers/dish.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:restaurantId/all', getAllDishes);
router.get('/:restaurantId', getAllDishesOnSale);
router.post('/:restaurantId', auth, createDish);
router.put('/:dishId', auth, updateDish);
router.delete('/:dishId', auth, deleteDish);

export default router;
