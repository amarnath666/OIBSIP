// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  latestOrder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  status: {
    type: String,
    enum: ["Order Placed", "Preparation", "Out for Delivery", "Delivered"],
    default: "Order Placed",
  },
  // ... other fields you might need
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
