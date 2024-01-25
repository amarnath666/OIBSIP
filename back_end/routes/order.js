import express from 'express';
import {  getOrderStatus } from '../controllers/order.js';

const router = express.Router();

// router.put('/order-status', updateOrderStatus);
// router.put('/order-status-to-received', updateOrderStatusToReceived);
router.get("/getorderstatus", getOrderStatus);
export default router;
