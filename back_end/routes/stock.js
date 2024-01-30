import express from "express";
import { base, sauce, cheese, veggie, meat } from "../controllers/inventory.js";

const router = express.Router();

router.get("/base", base);
router.get("/sauce", sauce);
router.get("/cheese", cheese);
router.get("/veggie", veggie);
router.get("/meat", meat);

export default router;