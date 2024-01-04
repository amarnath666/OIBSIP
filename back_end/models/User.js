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
    Verified: {
        type: Boolean,
        default: false
    },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema );

export default User;