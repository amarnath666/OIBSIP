import bcrypt from  "bcrypt";
import User from "../models/User.js";
import  { generateLogToken } from "../utils/sendEmail.js";
import Token from "../models/Token.js";
import crypto from "crypto";
import express from "express";
import verifyMail from "../utils/verifyMail.js";
import sendResetMail from "../utils/sendResetMail.js";

const router = express.Router();

router.post("/register",
 async(req, res) => {
    let user = await User.findOne({email: req.body.email});

    if (user) {
    return res.status(400).send("User with given email already exists!");
}

user = new User({
    name: req.body.name,
    location: req.body.location,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
});

await user.save();

//generate verification token
    const token = new Token (
        {userId: user._id,
            token:crypto.randomBytes(16).toString("hex"),
        });

        await token.save();
        console.log(token);

    //SEND MAIL
    const link = `http://localhost:3001/auth/confirm/${token.token}`;
    await verifyMail(user.email, link);
    res.status(200).send({
        message: "Email send check your mail"
    })
} 
);

//ACTIVATE ACCOUNT
router.get("/confirm/:token", async (req, res) => {
    try {
      console.log("Confirmation route triggered");
      const token = await Token.findOne({
        token: req.params.token,
      });
  
      console.log("Received token:", token);
  
      if (!token) {
        console.log("Token not found");
        return res.status(404).json({ error: "Token not found" });
      }
  
      const user = await User.findById(token.userId);
      if (!user) {
        console.log("User not found for the given token");
        return res.status(404).json({ error: "User not found for the given token" });
      }
  
      console.log("Updating user verification status");
      await User.updateOne({ _id: token.userId }, { $set: { verified: true } });
  
      // Optionally, log the updated user
      const updatedUser = await User.findById(token.userId);
      console.log("Updated user:", updatedUser);
  
      return res.status(200).send("Email verified");
    } catch (error) {
      console.error("Error verifying email:", error);
      return res.status(400).send("An error occurred during verification");
    }
  });
  

  router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if(isPasswordValid) {
        return res.json({ message: "Login successful!" });
      }
  
      return res.status(401).send("Invalid Password");
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.post("/forgot-password", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Generate reset token and set expiration time
        const resetToken = crypto.randomBytes(20).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

        await user.save();

        // Send reset email with the token
        const resetLink = `http://localhost:3001/auth/reset-password/${resetToken}`;
        await sendResetMail(user.email, resetLink);

        return res.status(200).json({
            message: "Password reset email sent. Check your mail.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/reset-password/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Check if the password is provided in the request body
        if (!req.body.password) {
            return res.status(400).json({ error: "Password is required for password reset" });
        }

        // Reset password
        user.password = await bcrypt.hash(req.body.password, 10);
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        await user.save();

        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;




// const generateVerificationToken = () => {
//     return Math.random().toString().substr(2);
// };

// export const register = async(req, res) => {
//     try {
//         const {  name , email, password, location } = req.body;

//         const existingUser = await User.findOne({ email });

//          // Check if the user already exists
//         if (existingUser) {
//             return res.status(400).json({ error: "User already exists" });
//         }

//          // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Generate a verification token
//         const verificationToken = generateVerificationToken();

//         const newUser = new User({
//             name,
//             email, 
//             password: hashedPassword, 
//             location,
//             verificationToken,
//             isVerified: false,
//         });
//         await newUser.save();

//         //sent a verfication email
//         const verificationLink =  `http://localhost:3001/auth/verify/${verificationToken}`;
//         const emailSubject = "Verify your email";
//         const emailText =  `Click the following link to verify you email: ${verificationLink}`;
//         await sendEmail(email, emailSubject, emailText);

//         res.status(201).json({ message: "Registration successful. Verification email sent."});
//     } catch (error) {
//         console.log("Registration error:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// export const verifyToken = async (req, res) => {
//     try {
//         const { verificationToken } = req.params;
        
//         //Find the user based on the verification token
//         const user = await User.findOne({ verificationToken });

//         if (!user) {
//             return res.status(404).json({ error: "user not found" });
//         }

//         user.isVerified = true;
//         user.verificationToken = undefined; 
//         await user.save();

//         return res.status(200).json({ message: "Email verification successful"});
//     } catch(error) {
//         return res.status(500).json({ error: "Internal Server Error" });
//     };
// };

// export const login = async (req, res) => {
//     try {
//         const { email, password }= req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });

//         // Check if the user exists
//         if(!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         // Check if the password is correct
//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if(!isPasswordValid) {
//            return res.status(401).json({ error: "Invalid Password" });
//         }

//         if(!user.isVerified) {
//             return res.status(401).json({ error: "Email is not verified" });
//         }

//         // Create a JWT token for authentication
//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2w' });

//         // Send the token in the response
//         res.status(200).json({ token, user: { _id: user._id, email: user.email }});
//     } catch (error) {
//         console.log("Loign error:", error);
//         res.status(500).json({ error: "Internal Server Error"});
//     };
// };

