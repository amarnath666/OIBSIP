import express from 'express';
import {  getOrders,orderStatus, updateStock } from '../controllers/order.js';

const router = express.Router();

router.get("/getorders", getOrders);
router.put("/orderStatus/:orderId", orderStatus);
router.post("/updatestock", updateStock)

export default router;
