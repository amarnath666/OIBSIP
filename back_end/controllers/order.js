import Order from "../models/Order.js";
import Base from '../models/Base.js';
import Cheese from '../models/Cheese.js';
import Sauce from '../models/Sauce.js';
import Veggie from '../models/Veggie.js';
import nodemailer from 'nodemailer';
import sendLowStockEmail from "../utils/stockEmail.js";

export const getOrders = async (req, res) => {
  try {
    const orders =  await Order.find().populate("userId").exec();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const orderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  // Check if orderId is undefined or null
  if (!orderId) {
    return res.status(400).json({ error: 'orderId is required' });
  }

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// UPDATE STOCK
export const updateStock = async (options) => {
  try {
    const { base, cheese, sauce, veggie } = options;

    // Update the stock for each selected option
    const updatedBase = await Base.findOneAndUpdate({ name: base }, { $inc: { quantity: -1 } }, { new: true });
    const updatedCheese = await Cheese.findOneAndUpdate({ name: cheese }, { $inc: { quantity: -1 } }, { new: true });
    const updatedSauce = await Sauce.findOneAndUpdate({ name: sauce }, { $inc: { quantity: -1 } }, { new: true });
    const updatedVeggie = await Veggie.findOneAndUpdate({ name: veggie }, { $inc: { quantity: -1 } }, { new: true });

    console.log('Stock updated ');

    if (updatedBase.quantity < 20 || updatedCheese.quantity < 20 || updatedSauce.quantity < 20 || updatedVeggie.quantity < 20) {
      await sendLowStockEmail();
    }
  } catch (error) {
    console.error('Error updating stock:', error);
  }
};


