import bcrypt from "bcrypt";
import User from "../models/User.js";
import verifyMail from "../utils/verifyMail.js";
import sendResetMail from "../utils/sendResetMail.js";

// Register a new user
export const register = async (req, res) => {
  try {
    // Check if required fields are provided
    if (!req.body.name || !req.body.location || !req.body.email || !req.body.password) {
      return res.status(400).send("Name, location, email, and password are required");
    }

    // Check if the user with the given email already exists
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      return res.status(400).send("User with given email already exists!");
    }

    // Create a new user with email and generate OTP
    user = new User({
      name: req.body.name,
      location: req.body.location,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      otp: Math.floor(100000 + Math.random() * 900000).toString(),
      otpExpiration: Date.now() + 300000, // OTP expiration time (5 minutes)
      verified: false, // Set initial verification status to false
    });

    await user.save();

    // Send email with OTP
    const link = `Your OTP is: ${user.otp}`;
    await verifyMail(user.email, link);

    res.status(200).send({
      message: "OTP sent to your email. Check your mail",
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle bcrypt hashing error
    if (error.name === 'TypeError' && error.message.includes('data and salt arguments required')) {
      return res.status(500).json({ error: "Internal Server Error - Bcrypt hashing issue" });
    }

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Confirm OTP for user verification
export const confirmOtp = async (req, res) => {
  const { email, enteredOTP } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log OTP-related details for debugging
    console.log('Stored OTP:', user.otp);
    console.log('Entered OTP:', enteredOTP);
    console.log('OTP Expiration:', user.otpExpiration);

    // Check if the OTP is valid
    if (user.otp === enteredOTP && user.otpExpiration instanceof Date && user.otpExpiration > Date.now()) {
      // Mark the user as verified
      user.verified = true;
      await user.save();

      // Respond with a success message
      return res.status(200).json({ message: 'OTP verified successfully' });
    } else {
      // Respond with an error message
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('OTP verification error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.verified) {
      return res.status(401).json({ error: "Email not verified. Please check your email for verification." });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      return res.json({ message: "Login successful!" });
    }

    return res.status(401).send("Invalid Password");
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// User forgot password
export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate reset OTP and set expiration time
    const resetOTP = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = resetOTP;
    user.resetOTPExpiration = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset email with the OTP
    await sendResetMail(user.email, resetOTP);

    return res.status(200).json({
      message: "Password reset OTP sent. Check your mail.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// User reset password after receiving OTP
export const resetPassword = async (req, res) => {
  try {
    const { email, resetOTP, password } = req.body;
    const user = await User.findOne({
      email,
      resetOTP,
      resetOTPExpiration: { $gt: Date.now() },
    });

    // Log user found in the database
    console.log('User found in the database:', user);

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Log current time and OTP Expiration from the user
    console.log('Current time:', Date.now());
    console.log('OTP Expiration from the user:', user.resetOTPExpiration);

    // Reset password
    user.password = await bcrypt.hash(password, 10);
    user.resetOTP = undefined;
    user.resetOTPExpiration = undefined;

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Admin login
export const adminLogin = async (req, res) => {
  const adminCredentials = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };

  try {
    const { email, password } = req.body;

    if (email === adminCredentials.email && password === adminCredentials.password) {
      return res.status(200).json({ message: 'Admin login successful' });
    } else {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User logout
export const logout = (req, res) => {
  try {
    if (req.session) {
      req.session.destroy(); // Destroy the session
    }
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
