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
    resetOTP: {
        type: String
    },
    resetOTPExpiration: {
        type: Date
    },
    orders: [
        {
            orderId: {
                type: String,
                ref: "Payment",
            },
            status: {
                type: String,
                enum: ["Order Placed", "Preparation", "Out for Delivery", "Delivered"],
                default: "Order Placed",
            },
        },
    ],
},  { timestamps: true }
);

const User = mongoose.model("User", userSchema );

export default User;