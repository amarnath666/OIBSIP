import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserOrderStatus } from 'scenes/state/authSlice';

const OrderStatus = ({ orderId, currentStatus }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);
  const dispatch = useDispatch();

  const handleStatusChange = () => {
    dispatch(updateUserOrderStatus(orderId, newStatus));
  };

  return (
    <div>
      <p>Current Status: {currentStatus}</p>
      <input
        type="text"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      />
      <button onClick={handleStatusChange}>Update Status</button>
    </div>
  );
};

export default OrderStatus;
