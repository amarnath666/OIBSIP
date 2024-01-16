import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session"; // Import express-session
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authControllers from "./controllers/auth.js";
import pizzaVarieties from "./init/data.js";
import { baseOptions, sauceOptions, cheeseOptions, veggieOptions } from "./init/customPizza.js";
import requireAuth from "./middleware/middleware.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

/* SESSION SETUP */
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Set a secret for session management
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Set to true if using HTTPS in production
      maxAge: 1000 * 60 * 60 * 24, // Session expiration time (1 day)
    },
  })
);

/* ROUTES */
app.use("/auth", authControllers);

app.get("/pizza-varieties", (req, res) => {
  res.json(pizzaVarieties);
});

app.get("/custom-pizza", (req, res) => {
  const customPizza = {
    baseOptions,
    sauceOptions,
    cheeseOptions,
    veggieOptions,
  };

  res.json(customPizza);
});

/* MONGOOSE SETUP */
mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});