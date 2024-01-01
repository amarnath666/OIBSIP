import express from "express";
import { register, verifyToken} from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.get("/verify/:token", verifyToken);

export default router;