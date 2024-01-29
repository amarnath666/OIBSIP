import Order from "../models/Order.js";

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
