
import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ['Order Received', 'Confirmed', 'Prepared', 'Delivered'],
    default: 'Order Received',
  },
  
  // Add other fields as needed
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
