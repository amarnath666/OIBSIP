import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/auth.js";
import pizzaVarieties from "./init/data.js";
import { baseOptions, sauceOptions, cheeseOptions, veggieOptions } from "./init/customPizza.js";
import paymentRoutes from "./routes/payment.js";
import requireAuth from "./middleware/middleware.js";
import User from "./models/User.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* SESSION SETUP */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

/* Passport initialization and configuration */
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Deserializing user ID:', id);
  User.findById(id)
    .then(user => {
      if (!user) {
        console.log('User not found with ID:', id);
        return done(null, null);
      }
      console.log('User found:', user);
      done(null, user);
    })
    .catch(err => {
      console.error('Error finding user by ID:', err);
      done(err, null);
    });
});


passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Invalid Password' });
      }
    } catch (error) {
      console.error('Error in LocalStrategy:', error);
      return done(error);
    }
  }
));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/payment", paymentRoutes);

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
