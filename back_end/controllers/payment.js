import crypto from "crypto";
import Payment from "../models/Payment.js";
import Razorpay from "razorpay";
import User from "../models/User.js";
import verifyAndDecodeToken from "../utils/verifyAndDecodeToken.js";
import mongoose from 'mongoose';

export const checkOut = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      payment_capture: 1,
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log("Received payment verification request:", req.body);

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ success: false, error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(' ')[1];

    // Verify and decode the token
    const decodedToken = verifyAndDecodeToken(token);

    // Assuming decodedToken includes user information like userId
    const userId = decodedToken.userId;
    console.log('User ID:', userId);

    // Update the user's document in the database with the new order ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: razorpay_order_id } },
      { new: true }
    );

    // Save payment information to the Payment model
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await payment.save();

    console.log("User document updated with order ID:", updatedUser);

    res.status(200).json({ success: true, reference: razorpay_payment_id });
  } catch (error) {
    console.error("Error in paymentVerification:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
