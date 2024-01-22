import express from "express";
import { register, login, confirmOtp, forgotPassword, resetPassword, logout, adminLogin} from "../controllers/auth.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Log that the user is authenticated and the session is created
      console.log('User authenticated. Session created:', req.session);

      return res.status(200).json({ message: "Login successful!" });
    });
  })(req, res, next);
});

router.post("/confirm-otp",  confirmOtp);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/admin-login", adminLogin);
router.post("/logout", logout);

export default router;