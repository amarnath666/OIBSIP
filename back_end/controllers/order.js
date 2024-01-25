import Order from "../models/Order.js";
import Admin from "../models/Admin.js"; // Import the Admin model

// export const updateOrderStatus = async (userId, newStatus) => {
//    try {
//      const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });
 
//      if (latestOrder) {
//        latestOrder.status = newStatus;
//        await latestOrder.save();
//      }
//    } catch (error) {
//      console.error("Error updating order status:", error);
//      throw error;
//    }
//  };
 
// export const updateOrderStatusToReceived = async (userId) => {
//    try {
//      const latestOrder = await Order.findOne({ userId }).sort({ createdAt: -1 });
 
//      if (latestOrder) {
//        latestOrder.status = 'Order Received';
//        await latestOrder.save();
 
//        // Create a corresponding entry in Admin model
//        const adminEntry = new Admin({ userId });
//        await adminEntry.save();
//      }
//    } catch (error) {
//      console.error("Error updating order status to 'Order Received':", error);
//    }
//  };

export const getOrderStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const adminEntry = await Admin.findOne({ userId });

    if (adminEntry) {
      res.status(200).json({ orderStatus: adminEntry.orderStatus });
    } else {
      res.status(404).json({ error: 'Admin entry not found for the user' });
    }
  } catch (error) {
    console.error('Error fetching order status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
