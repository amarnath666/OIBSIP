import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const PizzaCard = ({ pizza }) => {
  const handleBuyNowClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/payment/check-out", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: pizza.price,  // Include the amount in the request body
          // include other necessary details here
        }),
      });
 
      const order = await response.json();
      console.log("Razorpay Order Response:", order);
  
      const options = {
        key: 'rzp_test_ciEkAemCSllnO9',
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
            },
            body: JSON.stringify({
              razorpay_order_id: order.order.id,
              razorpay_payment_id: reference,
              razorpay_signature: razorpay_signature,
            }),
          });
  
          const verificationResult = await verificationResponse.json();
          console.log("Payment Verification Response:", verificationResult);
  
          // Handle the result as needed
        },
      };
  
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
    <Card sx={{ marginTop: "0.2rem" }}>
      <CardMedia
        component="img"
        height="275"
        width="100%"
        image={`${process.env.PUBLIC_URL}/${pizza.img}`}
        alt={pizza.alt}
        style={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {pizza.name}
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={1.5}>
          <Typography variant="h6" color="text.secondary">
            &#8377;{pizza.price}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleBuyNowClick}>
            Buy Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PizzaCard;
