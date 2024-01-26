import React from 'react';
import { Typography, Container, Link } from '@mui/material';

const PaymentSuccess = () => {
  // You can extract the reference from the URL parameters
  const searchParams = new URLSearchParams(window.location.search);
  const reference = searchParams.get('reference');

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Order Successful!
      </Typography>
      <Typography variant="body1">
        Thank you for your payment. Your order with reference ID <strong>{reference}</strong> has been confirmed.
      </Typography>
      
      {/* Link to order status */}
      <Link to="/orderstatus">Check Order Status</Link>     
    </Container>
  );
};

export default PaymentSuccess;
