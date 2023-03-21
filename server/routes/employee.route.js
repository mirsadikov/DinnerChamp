import express from 'express';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  loginEmployee,
} from '../controllers/employee.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authAdmin, getEmployees);
router.post('/create', authAdmin, createEmployee);
router.put('/:id', authAdmin, updateEmployee);
router.delete('/:id', authAdmin, deleteEmployee);
router.post('/login', authAdmin, loginEmployee);

export default router;
