import express from 'express';
import {
  registerRestaurant,
  loginRestaurant,
  getRestaurant,
  getAllRestaurants,
  updateRestaurant,
  setRestaurantImage,
  removeRestaurantImage,
} from '../controllers/restaurant.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginRestaurant);
router.post('/register', registerRestaurant);
router.get('/:id', getRestaurant);
router.get('/', getAllRestaurants);
router.put('/image', auth, setRestaurantImage);
router.delete('/image', auth, removeRestaurantImage);
router.put('/:id', auth, updateRestaurant);

export default router;
