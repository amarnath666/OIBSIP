import express from "express";
import { checkOut, paymentVerification, getLatestOrderInfo, pollForLatestOrderInfo, updateOrderStatus } from "../controllers/payment.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/check-out",verifyToken, checkOut);
router.post("/payment-verification", paymentVerification);
router.get('/latestOrder', getLatestOrderInfo);
router.get('/pollLatestOrder', pollForLatestOrderInfo);
router.put("/updateOrderStatus/:orderId", updateOrderStatus);

export default router;