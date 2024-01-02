import express from "express";
import { register, verifyToken, login} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verifyToken);

export default router;