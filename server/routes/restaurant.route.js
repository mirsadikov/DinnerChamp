import express from 'express';
import {
  registerRestaurant,
  loginRestaurant,
  getRestaurant,
  getAllRestaurants,
  updateRestaurant,
  setRestaurantImage,
  removeRestaurantImage,
  getStatistics
} from '../controllers/restaurant.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginRestaurant);
router.post('/register', registerRestaurant);
router.get('/statistics', authAdmin, getStatistics)
router.get('/:id', getRestaurant);
router.get('/', getAllRestaurants);
router.put('/image', authAdmin, setRestaurantImage);
router.delete('/image', authAdmin, removeRestaurantImage);
router.put('/:id', authAdmin, updateRestaurant);

export default router;
