import crypto from "crypto";
import Payment from "../models/Payment.js";
import Razorpay from "razorpay";
import User from "../models/User.js";

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

    console.log("Received payment verification request:", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      try {
        const paymentData = {
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
        };

        if (!req.isAuthenticated()) {
          return res.status(401).json({ success: false, error: 'User not authenticated' });
        }
        // Assuming you have a user object available in the request (e.g., req.user)
        const userId = req.user._id; // Adjust this according to your actual user object structure
        console.log('User ID:', userId);

        // Update the user's document in the database with the new order ID
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { orders: razorpay_order_id } },
          { new: true }
        );

        console.log("User document updated with order ID:", updatedUser);

        res.status(200).json({ success: true, reference: razorpay_payment_id });
      } catch (dbError) {
        console.error("Error storing payment data in the database:", dbError);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      }
    } else {
      console.log("Invalid Signature. Payment verification failed.");
      res.status(400).json({ success: false, error: "Invalid Signature" });
    }
  } catch (error) {
    console.error("Error in paymentVerification:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
