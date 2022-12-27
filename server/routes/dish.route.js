import express from 'express';
import {
  getAllDishes,
  createDish
} from '../controllers/dish.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/:restaurantId', getAllDishes);
router.post('/:restaurantId', auth, createDish);


export default router;
