import express from 'express';
import {
  createBranch, getBranches, updateBranch, deleteBranch, getOpenBranches, loginBranch
} from '../controllers/branch.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginBranch);
router.post('/create/:restaurantId', authAdmin, createBranch);
router.get('/getAll/:restaurantId', getBranches);
router.get('/getAllOpen/:restaurantId', getOpenBranches);
router.put('/update/:id', authAdmin, updateBranch);
router.delete('/delete/:id', authAdmin, deleteBranch);


export default router;
