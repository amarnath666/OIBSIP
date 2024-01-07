import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpiration: {
        type: Date  // Corrected to Date
    },
    verified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    }
},  { timestamps: true }
);

const User = mongoose.model("User", userSchema );

export default User;