import express from "express";
import { checkOut, paymentVerification, getLatestOrderInfo, updateOrderStatus } from "../controllers/payment.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/check-out",verifyToken, checkOut);
router.post("/payment-verification",verifyToken, paymentVerification);
router.get('/latestOrder',verifyToken, getLatestOrderInfo);
router.put("/updateOrderStatus/:orderId", updateOrderStatus);

export default router;