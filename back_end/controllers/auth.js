import bcrypt from  "bcrypt";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

const generateVerificationToken = () => {
    return Math.random().toString().substr(2);
};

export const register = async(req, res) => {
    try {
        const {  name , email, password, location } = req.body;

        const existingUser = await User.findOne({ email });

         // Check if the user already exists
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

         // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate a verification token
        const verificationToken = generateVerificationToken();

        const newUser = new User({
            name,
            email, 
            password: hashedPassword, 
            location,
            verificationToken,
            isVerified: false,
        });
        await newUser.save();

        //sent a verfication email
        const verificationLink =  `http://localhost:3001/verify?token=${verificationToken}`;
        const emailSubject = "Verify your email";
        const emailText =  `Click the following link to verify you email: ${verificationLink}`;
        await sendEmail(email, emailSubject, emailText);

        res.status(201).json({ message: "Registration successful. Verification email sent."});
    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const verifyToken = async (req, res) => {
    try {
        const { verificationToken } = req.params;
        
        //Find the user based on the verification token
        const user = await User.findOne({ verificationToken });

        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }

        user.isVerified = true;
        user.verificationToken = undefined; 
        await user.save();

        return res.status(200).json()({ message: "Email verification successful"});
    } catch(error) {
        return res.status(500).json({ error: "Internal Server Error" });
    };
};

export const login = async (req, res) => {
    try {
        const { email, password }= req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if the user exists
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
           return res.status(401).json({ error: "Invalid Password" });
        }

        if(!user.isVerified) {
            return res.status(401).json({ error: "Email is not verified" });
        }

        // Create a JWT token for authentication
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2w' });

        // Send the token in the response
        res.status(200).json({ token, user: { _id: user._id, email: user.email }});
    } catch (error) {
        console.log("Loign error:", error);
        res.status(500).json({ error: "Internal Server Error"});
    };
};

