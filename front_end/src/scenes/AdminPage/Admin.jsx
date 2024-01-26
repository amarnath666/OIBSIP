// Admin.jsx

import React, { useEffect, useState } from 'react';
import NavBar from 'scenes/homePage/Navbar';
import { MenuItem, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderStatus } from 'scenes/state/authSlice';

const Admin = () => {
  const [latestOrderInfo, setLatestOrderInfo] = useState(null);
  const dispatch = useDispatch();

  const pollForLatestOrderInfo = async () => {
    try {
      const response = await fetch('http://localhost:3001/payment/pollLatestOrder');
      if (response.ok) {
        const data = await response.json();
        setLatestOrderInfo(data.latestOrderInfo);
      } else {
        console.error('Failed to fetch latest order info');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const handleOrderStatusChange = async (newStatus) => {
    try {
      const orderId = latestOrderInfo.orderId;
      const actionResult = await dispatch(setOrderStatus({ orderId, newOrderStatus: newStatus }));
      const updatedOrderStatus = actionResult.payload;
      console.log('Updated Order Status:', updatedOrderStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      pollForLatestOrderInfo();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Admin Page</h1>
      {latestOrderInfo ? (
        <div>
          <h2>Latest Order Information:</h2>
          <p>Order ID: {latestOrderInfo.orderId}</p>
          <p>User ID: {latestOrderInfo.userId}</p>
          
          <TextField
            select
            label="Order Status"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleOrderStatusChange(e.target.value)}
          >
            <MenuItem value="Confirmed">Confirmed</MenuItem>
            <MenuItem value="Prepared">Prepared</MenuItem>
            <MenuItem value="Delivered">Delivered</MenuItem>
          </TextField>
        </div>
      ) : (
        <p>No latest order available</p>
      )}
    </div>
  );
};

export default Admin;
