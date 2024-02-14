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
  InputLabel,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatus } from 'scenes/state/authSlice';

// Custom styles for the component
const styles = {
  tableContainer: {
    marginTop: '20px',
    marginbottom: '20px',
  
  },
  tableHeaderCell: {
    backgroundColor: '#f2f2f2',
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
};

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
  const isAdmin = useSelector((state) => state.auth.is)
  const [orderStatus, setOrderStatus] = useState({});
  const dispatch = useDispatch();

  // Function to fetch all orders from the server
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

  // Function to poll for the latest order information
  const pollForLatestOrderInfo = () => {
    fetchAllOrders();
  };

  // Function to handle the change in order status
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
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Fetch all orders once on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Polling every 5 seconds (5000 milliseconds)
  useInterval(() => {
    pollForLatestOrderInfo();
  }, 5000);

  // Filter orders to exclude those with status "Delivered" from Admin Dashboard
  const filteredOrders = orders.filter(order => order.status !== "Delivered");

  return (
    <div>
      <NavBar />
        <h1 style={{ textAlign: "center", color: "#1976d2" }}>Admin Dashboard</h1>
        <hr />
      {filteredOrders === undefined ? (
        <p>Loading...</p>
      ) : filteredOrders.length > 0 ? (
        <div>
        <h3 style={{ textAlign: "center", color: "#42a5f5" }}>All Orders</h3>
        <TableContainer component={Paper} style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ backgroundColor: '#f2f2f2', padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Order ID</TableCell>
                <TableCell style={{ backgroundColor: '#f2f2f2', padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Customer</TableCell>
                <TableCell style={{ backgroundColor: '#f2f2f2', padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Status</TableCell>
                <TableCell style={{ backgroundColor: '#f2f2f2', padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Order Received</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{order._id}</TableCell>
                  <TableCell style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>{order.userId.name}</TableCell>
                  <TableCell style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                    <TextField
                      select
                      label="Order Status" 
                      variant="outlined"
                      value={order.status}
                      onChange={(e) => handleOrderStatusChange(e.target.value, order._id)}
                      sx={{ minWidth: "180px", fontSize: { xs: "12px", md: "16px" }, backgroundColor: "white" }}
                      InputProps={{
                        sx: { backgroundColor: 'white' },
                      }}
                    >
                      <InputLabel htmlFor="order-status-label">Order Status</InputLabel>
                      <MenuItem value="Confirmed">Confirmed</MenuItem>
                      <MenuItem value="Prepared">Prepared</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </TextField>
                  </TableCell>
                  <TableCell style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      ) : (
        <h3 style={{ textAlign: "center"}}>No orders available</h3>
      )}
     
    </div>
  );
};

export default Admin;
