import express from "express";
import { register, login, confirmOtp, forgotPassword, resetPassword, logout, adminLogin} from "../controllers/auth.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.post('/login', login);
router.post("/register", register);
router.post("/confirm-otp/:email",  confirmOtp);
router.post("/forgot-password",  forgotPassword);
router.post("/reset-password/:email", resetPassword);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

export default router;