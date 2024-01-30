// import Base from '../models/Base.js';
// import nodeMailer from 'nodemailer';
// import cron from 'node-cron';

// const router = express.Router();

// // Fetch stock status for all base varieties
// router.get('/base', async (req, res) => {
//   try {
//     const baseInventory = await Base.find({}, 'name quantity');
//     res.json(baseInventory);
//   } catch (error) {
//     console.error('Error fetching Base inventory:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Update stock for a specific base variety
// router.put('/base/:baseId', async (req, res) => {
//   const { baseId } = req.params;
//   const { newQuantity } = req.body;

//   try {
//     const updatedBase = await Base.findByIdAndUpdate(baseId, { quantity: newQuantity }, { new: true });
//     res.json(updatedBase);
//   } catch (error) {
//     console.error('Error updating Base inventory:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Schedule email notification for low stock
// const checkLowStock = async () => {
//   const threshold = 20;

//   try {
//     const lowStockItems = await Base.find({ quantity: { $lt: threshold } }, 'name quantity');

//     if (lowStockItems.length > 0) {
//       const transporter = nodeMailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: 'your-email@gmail.com', // replace with your email
//           pass: 'your-password', // replace with your email password
//         },
//       });

//       const mailOptions = {
//         from: 'your-email@gmail.com', // replace with your email
//         to: 'admin-email@example.com', // replace with admin email
//         subject: 'Low Stock Alert',
//         text: `Low stock alert for the following items:\n${lowStockItems.map(item => `${item.name}: ${item.quantity}`).join('\n')}`,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log('Low stock notification email sent!');
//     }
//   } catch (error) {
//     console.error('Error checking low stock:', error);
//   }
// };

// // Schedule the task to run every day at a specific time (adjust as needed)
// cron.schedule('0 0 * * *', () => {
//   checkLowStock();
// });

// export default router;
