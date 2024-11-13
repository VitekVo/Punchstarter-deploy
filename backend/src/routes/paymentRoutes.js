import express from  'express';

import { createPayment, getPaymentsByUserId, getPaymentsByProjectId, updatePaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

 router.post('/', createPayment);
 router.get('/user/:userId', getPaymentsByUserId);
 router.get('/project/:projectId', getPaymentsByProjectId);
 router.put('/:paymentId', updatePaymentStatus);

export default router;