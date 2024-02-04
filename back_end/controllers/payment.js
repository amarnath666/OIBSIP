import mongoose from 'mongoose';
import Payment from "../models/Payment.js";
import Razorpay from "razorpay";
import User from "../models/User.js";
import verifyAndDecodeToken from "../utils/verifyAndDecodeToken.js";
import Order from "../models/Order.js";
import Admin from "../models/Admin.js";
import { updateStock } from "./order.js";

// Variable to store the latest order information
let latestOrderInfo = null;

// Checkout Endpoint - Creates a Razorpay order
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

    // Create a new Razorpay order
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

// Payment Verification Endpoint - Handles payment confirmation and updates database
export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ success: false, error: "Authorization header missing" });
    }

    const token = authorizationHeader.split(' ')[1];

    // Verify and decode the token
    const decodedToken = verifyAndDecodeToken(token);

    // Assuming decodedToken includes user information like userId
    const userId = decodedToken.userId;

    // Create a new order
    const newOrder = new Order({
      userId: userId,
      status: "Order Placed",
    });

    // Save the new order
    const savedOrder = await newOrder.save();

  // // Assuming savedOrder has a 'status' field, fetch it
    const orderStatus = savedOrder.status;

    // Create a new Admin document for the order
    const newAdmin = new Admin({
      adminId: new mongoose.Types.ObjectId(),
      userId: userId,
      orderId: savedOrder._id,
      status: 'Order Received',
    });

    // Save the new Admin document
    await newAdmin.save();

    // Update the user's document in the database with the new order ID
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { orders: savedOrder._id } },
      { new: true }
    );

    // Save payment information to the Payment model
    const payment = new Payment({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    await payment.save();

    // Update the latest order information variable
    latestOrderInfo = {
      orderId: savedOrder._id,
      userId: userId,
      status: orderStatus, 
    };

    // Check if selectedOptions exist in the request body
    if ('selectedOptions' in req.body) {
      const { selectedOptions } = req.body;
      const { base, cheese, sauce, veggie } = selectedOptions;

      // Call the function to update stock after successful payment
      await updateStock({ base, cheese, sauce, veggie });
    }

    res.status(200).json({ success: true, reference: razorpay_payment_id });
  } catch (error) {
    console.error("Error in paymentVerification:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get the latest order information
export const getLatestOrderInfo = (req, res) => {
  try {
    if (latestOrderInfo) {
      res.status(200).json({ success: true, latestOrderInfo });
    } else {
      res.status(404).json({ success: false, error: "No latest order available" });
    }
  } catch (error) {
    console.error("Error while fetching latest order information:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Endpoint for polling by the admin page
export const pollForLatestOrderInfo = (req, res) => {
  try {
    if (latestOrderInfo) {
      res.status(200).json({ success: true, latestOrderInfo });
    } else {
      res.status(404).json({ success: false, error: "No latest order available" });
    }
  } catch (error) {
    console.error("Error while fetching latest order information:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update Order Status Endpoint - Admin can update the order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params; // Extract orderId from URL parameters
    const { newOrderStatus } = req.body;

    // Update the Admin model based on the provided order ID
    const updatedAdmin = await Admin.findOneAndUpdate(
      { 'orderId': orderId },
      { 'status': newOrderStatus },
      { new: true }
    );

    res.status(200).json({ success: true, updatedAdmin, updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};