import { getPayments, createPayments } from '../controllers/paymentsController.js';
import { Router } from 'express';

import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post('/payments', createPayments);
router.get('/payments', validateUser, getPayments);

export default router; 