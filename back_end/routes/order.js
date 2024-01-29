import express from 'express';
import {  orderStatus } from '../controllers/order.js';

const router = express.Router();

router.put("/orderStatus/:orderId", orderStatus);

export default router;
