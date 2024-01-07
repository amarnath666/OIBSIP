import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tokenSchema = new Schema ({
        otp: {
                type: String
            },
            otpExpiration: {
                type: Date
            },
        userId: {
            type: String,
            ref: "user",
            required:true,
        },
        token: {
                type: String,
                required: true
        },
});

const Token = mongoose.model("token", tokenSchema);
export default Token;