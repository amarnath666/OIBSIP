import bcrypt from  "bcrypt";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const generateVerificationToken = () => {
    return Math.random().toString().substr(2);
};

const register = async(req, res) => {
    try {
        const {  name , email, password, location } = req.body;

        const existingUser = User.findOne({ email });

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
        const verficationLink =  `http://localhost:3000/verify/${verificationToken}`;
        const emailSubject = "Verify your email";
        const emailText =  `Click the following link to verify you email: ${verificationToken}`;
        await sendEmail(email, emailSubject, emailText);

        res.status(201).success.json({ message: "Registration successful. Verification email sent."});
    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const verifyToken = async (req, res) => {
    try {
        const { verificationToken } = req.params;

        //Find the user based on the verification token
        const user = await User.findOne( verificationToken );

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

export default { register, verifyToken};