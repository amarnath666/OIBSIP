import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus, setOrderStatus } from 'scenes/state/authSlice';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';
import NavBar from 'scenes/homePage/Navbar';

const Admin = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const orderStatus = useSelector((state) => state.auth.orderStatus);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Fetch order status from the backend when the component mounts
    // You may need to adjust the API endpoint based on your backend setup
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3001/order/getOrderStatus/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        dispatch(setOrderStatus(responseData.orderStatus));
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [dispatch, userId]);

  const handleStatusChange = async () => {
    try {
      // Assuming you have the orderId, you can include it in the request
      const orderId = 'your-order-id'; // Replace with your actual order ID
      const response = await fetch(`http://localhost:3001/order/order-status/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus, orderId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      dispatch(setOrderStatus(responseData.orderStatus));
    } catch (error) {
      console.error('Error updating order status:', error);
      // Handle error appropriately (e.g., show an error message to the user)
    }
  };

  return (
    <Container>
      <NavBar />
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={6}>
          <TextField
            label="New Order Status"
            variant="outlined"
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="contained" color="primary" onClick={handleStatusChange}>
            Update Order Status
          </Button>
        </Grid>
      </Grid>
      <Typography variant="body1" style={{ marginTop: '16px' }}>
        Current Order Status: {orderStatus}
      </Typography>
    </Container>
  );
};

export default Admin;
