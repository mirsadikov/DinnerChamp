import express from 'express';
import { sendCode, verifyCode } from '../controllers/client.controller.js';

const router = express.Router();

router.post('/code', sendCode);
router.post('/auth', verifyCode);

export default router;
