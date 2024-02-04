import mongoose from "mongoose";

// Define the Payment schema
const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  }
});

// Create the Payment model using the schema
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;