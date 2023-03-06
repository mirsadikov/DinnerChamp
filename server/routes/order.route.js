import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/get', auth, getAllOrders);

export default router;
