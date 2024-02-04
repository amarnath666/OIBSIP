import mongoose from 'mongoose';

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order", 
    required: true,
  },
  status: {
    type: String,
    enum: ['Order Received', 'Confirmed', 'Prepared', 'Delivered'],
    default: 'Order Received',
  },
}, {
  timestamps: true, 
});

// Define a post hook for findOneAndUpdate middleware
adminSchema.post('findOneAndUpdate', async function (doc) {

  // Check if status is modified
  if (this._update.$set && this._update.$set.status) {
    try {
      let statusToUpdate;

      // Map the status to the corresponding update status
      switch (this._update.$set.status) {
        case 'Confirmed':
          statusToUpdate = 'Preparation';
          break;
        case 'Prepared':
          statusToUpdate = 'Out for Delivery';
          break;
        case 'Delivered':
          statusToUpdate = 'Delivered';
          break;
        default:
          statusToUpdate = 'Order Placed';
      }

      // Update the Order document first
      await mongoose.model('Order').updateOne(
        { _id: doc.orderId },
        { $set: { status: statusToUpdate } }
      );
      
    } catch (error) {
      console.error('Error updating Order and Admin status:', error);
    }
  }
});

// Create the Admin model using the schema
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
