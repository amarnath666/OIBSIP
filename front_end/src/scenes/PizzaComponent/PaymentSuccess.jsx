// PaymentSuccess.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchLatestOrderInfo } from 'scenes/state/authSlice';

const PaymentSuccess = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get('reference');
  const dispatch = useDispatch();
  const { latestOrderInfo } = useSelector((state) => state.auth);

  // Fetch latest order information when the component mounts
  useEffect(() => {
    dispatch(fetchLatestOrderInfo());
  }, [dispatch]);

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Order Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for your payment. Your order with reference ID <strong>{reference}</strong> has been confirmed.
      </Typography>

      {/* Conditional rendering of the link */}
      {latestOrderInfo && (
        <Link to={`/orderstatus/${latestOrderInfo.orderId}`}>Check Order Status</Link>
      )}
    </Container>
  );
};

export default PaymentSuccess;
