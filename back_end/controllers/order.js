import Order from "../models/Order.js";

export const orderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
