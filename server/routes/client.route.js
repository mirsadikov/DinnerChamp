import express from 'express';
import { getOrders, sendCode, verifyCode } from '../controllers/client.controller.js';
import { authClient } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/code', sendCode);
router.post('/auth', verifyCode);
router.get('/orders', authClient, getOrders);

export default router;
