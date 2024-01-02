import  express  from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import exp from "constants";
import authRoutes from "./routes/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); 
const app = express();
app.use(express.json());
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);

/* MONGOOSE SETUP */
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`)
});