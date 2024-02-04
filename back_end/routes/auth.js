import express from "express";
import { register, login, confirmOtp, forgotPassword, resetPassword, logout, adminLogin} from "../controllers/auth.js";

const router = express.Router();

// Route for user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const loginResult = await login(email, password);

    if (loginResult.error) {
      return res.status(401).json({ error: loginResult.error });
    }

    const { userId, token, message } = loginResult;
    return res.status(200).json({ userId, token, message });

  } catch (error) {
    console.error("Login route error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/register", register);
router.post("/confirm-otp/:email",  confirmOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:email", resetPassword);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

export default router;