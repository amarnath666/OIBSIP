import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const PizzaCard = ({ pizza }) => {
  const handleBuyNowClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/payment/checkout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        // Adjust the request body as needed
        body: JSON.stringify({
          amount: pizza.price,
          // include other necessary details here
        }),
      });
  
      const order = await response.json();
      console.log("Razorpay Order Response:", order);
  
      const options = {
        key: 'rzp_test_ciEkAemCSllnO9', 
        amount: pizza.price * 100, // Razorpay expects the amount in paise
        currency: "INR",
        name: "Pizzify",
        description: pizza.description,
        order_id: order.id,  // Use order.order.id instead of order.id
        callback_url: "http://localhost:3001/payment/paymentverification",
        handler: function (response) {
          console.log(response);
          const { razorpay_payment_id: reference } = response;
          // window.location.href = `/paymentsuccess?reference=${reference}`;
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
