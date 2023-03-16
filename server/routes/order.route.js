import express from 'express';
import { createOrder, getAllOrders, sendCode } from '../controllers/order.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/get', auth, getAllOrders);
router.post('/code', sendCode);

export default router;
