import express from 'express';
import {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
} from '../controllers/dish.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:restaurantId', getAllDishes);
router.post('/:restaurantId', auth, createDish);
router.put('/:dishId', auth, updateDish);
router.delete('/:dishId', auth, deleteDish);

export default router;
