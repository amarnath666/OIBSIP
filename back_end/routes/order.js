import express from 'express';
import {  getOrders,orderStatus, updateStock } from '../controllers/order.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/getorders", getOrders);
router.put("/orderStatus/:orderId",verifyToken, orderStatus);
router.post("/updatestock", updateStock);

export default router;
