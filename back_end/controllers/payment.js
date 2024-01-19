import Razorpay from "razorpay";
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const generateUniqueReceiptId = () => {
        const uuid = uuidv4();
        // Take only the first 40 characters of the generated UUID
        return `order_rcptid_${uuid.substring(0, 10)}`;
    };

    const options = {
        amount: 1000, // amount in paise 
        currency: "INR",
        receipt: generateUniqueReceiptId(), // Using uuid to generate a unique ID
        payment_capture: 1, // Auto capture payment
    };

    try {
        const order = await razorpay.orders.create(options);
        console.log("Razorpay Order Creation Response:", order); // Log the order creation response
        res.json(order);
    } catch (error) {
        console.error("Error creating order:", error);
        console.log("Complete Razorpay API response:", error.response?.data || error.response);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};