import mongoose from "mongoose";

// Define the Order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true, 
  },
  Order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", 
  },
  status: {
    type: String,
    enum: ["Order Placed", "Preparation", "Out for Delivery", "Delivered"],
    default: "Order Placed", 
  },
}, { 
  timestamps: true, 
});

// Create the Order model using the schema
const Order = mongoose.model("Order", orderSchema);

export default Order;
