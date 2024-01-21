import express from "express";
import { checkOut, paymentVerification } from "../controllers/payment.js";

const router = express.Router();

router.post("/check-out", checkOut);
router.post("/payment-verification", paymentVerification);

export default router;