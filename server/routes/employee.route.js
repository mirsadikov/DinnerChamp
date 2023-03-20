import express from 'express';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employee.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authAdmin, getEmployees);
router.post('/create', authAdmin, createEmployee);
router.put('/:id', authAdmin, updateEmployee);
router.delete('/:id', authAdmin, deleteEmployee);

export default router;
