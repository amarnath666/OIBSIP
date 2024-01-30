import express from 'express';
import {  orderStatus, updateStock } from '../controllers/order.js';

const router = express.Router();

router.put("/orderStatus/:orderId", orderStatus);
router.post("/updatestock", updateStock)

export default router;
