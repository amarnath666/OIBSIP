import express from "express";
import { register, login, confirmOtp, forgotPassword, resetPassword, logout, adminLogin} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/confirm-otp",  confirmOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

export default router;