import React, { useEffect, useState } from 'react';
import NavBar from 'scenes/homePage/Navbar';
import {
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  InputLabel
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from 'scenes/state/authSlice';

// Custom hook for polling
function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  const fetchAllOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/order/getorders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch all orders');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  };

  const pollForLatestOrderInfo = () => {
    fetchAllOrders();
  };

  const handleOrderStatusChange = async (newStatus, orderId) => {
    try {
      // Update the local state (UI) immediately
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map((order) => {
          if (order._id === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });
        return updatedOrders;
      });

      // Dispatch the update to the server
      const actionResult = await dispatch(updateOrderStatus({ orderId, newOrderStatus: newStatus }));
      const updatedOrderStatus = actionResult.payload;
      console.log('Updated Order Status:', updatedOrderStatus);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Polling every 5 seconds (5000 milliseconds)
  useInterval(() => {
    pollForLatestOrderInfo();
  }, 1000);

  const filteredOrders = orders.filter(order => order.status !== "Delivered");

  return (
    <div>
      <NavBar />
      <h1>Admin Dashboard</h1>
      {filteredOrders === undefined ? (
        <p>Loading...</p>
      ) : filteredOrders.length > 0 ? (
        <div>
          <h2>All Orders</h2>
          <TableContainer component={Paper} >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Order Received Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.userId.name}</TableCell>
                    <TableCell>
                    <TextField
                      select
                      id="outlined-basic" 
                      label="Order Status" 
                      variant="outlined"
                      value={order.status}
                      onChange={(e) => handleOrderStatusChange(e.target.value, order._id)}
                      sx={{ minWidth: "180px", fontSize: { xs: "12px", md: "16px" } }}
                    >
                      <InputLabel htmlFor="order-status-label">Order Status</InputLabel>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Prepared">Prepared</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </TextField>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default Admin;
