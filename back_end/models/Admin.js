import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  adminId: {
    type: String, // You can choose a unique identifier type (String, Number, etc.)
    default: 'uniqueAdminId', // Set a constant value for the adminId
    unique: true, // Ensure uniqueness
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orderIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  }],
  orderStatus: {
    type: String,
    enum: ['Order Received', 'Confirmed', 'Prepared', 'Delivered'],
    default: 'Order Received',
  },
});

adminSchema.post('findOneAndUpdate', async function (doc) {
  // Check if orderStatus is modified
  if (this._update.$set && this._update.$set.orderStatus) {
    try {
      // Check if the order is already marked as 'Delivered'
      if (this._update.$set.orderStatus === 'Delivered') {
        // If it's 'Delivered', no further update is needed
        return;
      }

      let orderStatusToUpdate;

      switch (this._update.$set.orderStatus) {
        case 'Confirmed':
          orderStatusToUpdate = 'Preparation';
          break;
        case 'Prepared':
          orderStatusToUpdate = 'Out for Delivery';
          break;
        case 'Delivered':
          orderStatusToUpdate = 'Delivered Again';
          break;
        default:
          orderStatusToUpdate = 'Order Placed';
      }

      // Update Order status based on Admin status
      await mongoose.model('Order').updateMany(
        { _id: { $in: doc.orderIds } },
        { $set: { status: orderStatusToUpdate } }
      );
    } catch (error) {
      console.error('Error updating Order status:', error);
    }
  }
});


const Admin = mongoose.model('Admin', adminSchema);


export default Admin;
