import mongoose from 'mongoose';

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
  status: { // Update this field name to match the orderSchema
    type: String,
    enum: ['Order Received', 'Confirmed', 'Prepared', 'Delivered'],
    default: 'Order Received',
  },
});

adminSchema.post('findOneAndUpdate', async function (doc) {
  console.log('Doc in findOneAndUpdate middleware:', doc);

  // Check if status is modified
  if (this._update.$set && this._update.$set.status) {
    try {
      let statusToUpdate;

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

      console.log('OrderStatus to update:', this._update.$set.status);
      console.log('Updated orderStatus in Admin:', statusToUpdate);

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

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
