import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import { login } from 'scenes/state/authSlice';

const PizzaCard = ({ pizza }) => {
  const [isTokenFetched, setIsTokenFetched] = useState(false);
  const authToken = useSelector((state) => state.auth.token);

  // Effect to check if the authToken is available and set isTokenFetched to true accordingly
  useEffect(() => {
    if (authToken) {
      setIsTokenFetched(true);
      console.log('Auth Token Fetched:', authToken);
    }
  }, [authToken, setIsTokenFetched]);

  // Function to handle the "Buy Now" button click
  const handleBuyNowClick = async () => {
    try {
  
      // Check if the authToken is fetched yet
      if (!isTokenFetched) {
        console.log('Token not fetched yet');
        return;
      }
  
      // Make a fetch request to the server for payment processing
      const response = await fetch("http://localhost:3001/payment/check-out", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: pizza.price,
        }),
      });
  
      console.log('Fetch response:', response);
  
      if (!response.ok) {
        console.error('Fetch error:', response.statusText);
        return;
      }
  
      // Parse the response to get the Razorpay order details
      const order = await response.json();
      console.log("Razorpay Order Response:", order);
  
      // Options for the Razorpay payment
      const options = {
        key: "rzp_test_ciEkAemCSllnO9",
        currency: "INR",
        name: "Pizzify",
        description: pizza.description,
        image:`${process.env.PUBLIC_URL}/${pizza.img}`,
        order_id: order.order.id,
        handler: async function (response) {
          console.log(response);
          const { razorpay_payment_id: reference, razorpay_signature } = response;
          window.location.href = `/paymentsuccess?reference=${reference}`;
          
          // Manually trigger payment verification
          const verificationResponse = await fetch("http://localhost:3001/payment/payment-verification", {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              razorpay_order_id: order.order.id,
              razorpay_payment_id: reference,
              razorpay_signature: razorpay_signature,
            }),
          });

          const verificationResult = await verificationResponse.json();
          console.log("Payment Verification Response:", verificationResult);
        },
      };

      // Open the Razorpay payment dialog
      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay script not loaded");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Card
      sx={{
        marginTop: "0.2rem",
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
       },
      }}
    >
      <CardMedia
        component="img"
        height="275"
        width="100%"
        image={`${process.env.PUBLIC_URL}/${pizza.img}`}
        alt={pizza.alt}
        style={{
          objectFit: "cover",
          transition: "transform 0.3s",
          "&:hover": { transform: "scale(1.1)" },         
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {pizza.name}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={1.5}>
          <Typography variant="h6" color="text.secondary">
            &#8377;{pizza.price}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBuyNowClick}
            sx={{
              "&:hover": { backgroundColor: "blue" },
              "&:active": { boxShadow: "none", backgroundColor: "blue" },
            }}
          >
            Buy Now
          </Button>
        </Box>
      </CardContent>
</Card>

  );
};

export default PizzaCard;