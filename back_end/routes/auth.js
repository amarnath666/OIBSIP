import express from "express";
import { register, login, confirmOtp, forgotPassword, resetPassword, logout, adminLogin} from "../controllers/auth.js";
import generateToken from "../utils/jwtUtils.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", async (req, res) => {
  try {
    const { error, token, message } = await login(req.body.email, req.body.password);

    if (error) {
      return res.status(401).json({ error });
    }

    return res.status(200).json({ token, message });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/confirm-otp",  confirmOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

export default router;