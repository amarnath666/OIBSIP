import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { fetchLatestOrderInfo } from 'scenes/state/authSlice';
import NavBar from 'scenes/homePage/Navbar';


const PaymentSuccess = () => {
  // Extracting 'reference' from URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get('reference');
  const dispatch = useDispatch();
  // Retrieving latest order information from Redux store
  const { latestOrderInfo } = useSelector((state) => state.auth);

  // Fetch latest order information when the component mounts
  useEffect(() => {
    dispatch(fetchLatestOrderInfo());
  }, [dispatch]);

  return (
    <>
      <NavBar />

      {/* Container for displaying payment success information */}
      <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <CheckCircleOutlineIcon 
      color="primary"
      style={{ fontSize: '100px' }}
    />
        <Typography variant="h4" gutterBottom>
          Thank you
        </Typography>
        <Typography variant="body1">
          Your order with reference ID <strong>{reference}</strong> has been placed.
        </Typography>

         {/* Conditional rendering of the "Track Order Status" button */}
        {latestOrderInfo && (
        <Button
          style={{ marginTop: '1rem' }}
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to={`/orderstatus/${latestOrderInfo.orderId}`}
          >
        Track Order Status
      </Button>
      
        )}
      </Container>
    </>
  );
};

export default PaymentSuccess;
