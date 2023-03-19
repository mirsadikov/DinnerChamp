import express from 'express';
import { createOrder, getAllOrders } from '../controllers/order.controller.js';
import { authAdmin, authClient } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authClient, createOrder);
router.get('/get', authAdmin, getAllOrders);

export default router;
