import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const PizzaCard = ({ pizza }) => {
  const handleBuyNowClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/payment/create-order", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // No need for these values here
        }),
      });

      const order = await response.json();
      console.log("Razorpay Order Response:", order);
      
      const options = {
        amount: pizza.price * 100, // Razorpay expects the amount in paise
        currency: "INR",
        name: "Pizzify",
        description: pizza.description,
        order_id: order.id,
        handler: function (response) {
          console.log(response);
          // Handle successful payment response here
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
