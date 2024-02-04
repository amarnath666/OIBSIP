import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, CardMedia, Button, useMediaQuery } from '@mui/material';
import NavBar from "scenes/homePage/Navbar";

const CustomizedPizza = () => {
  const { baseOptions, sauceOptions, cheeseOptions, veggieOptions, selectedOptions } = useSelector(state => state.auth);
  const { base, sauce, cheese, veggie } = selectedOptions;
  const [isTokenFetched, setIsTokenFetched] = useState(false);
  const authToken = useSelector((state) => state.auth.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 450px)");

  useEffect(() => {
    // Check if the authToken is available and set isTokenFetched to true accordingly
    if (authToken) {
      setIsTokenFetched(true);
      console.log('Auth Token Fetched:', authToken);
    }
  }, [authToken, setIsTokenFetched]);


// URL for each type of pizza base
const baseImages = {
  'Thin Crust': 'https://static.toiimg.com/thumb/53351680.cms?imgsize=283388&width=800&height=800',
  'Hand Tossed': 'https://img.freepik.com/premium-photo/isolated-pizza-with-mushrooms-olives_219193-8149.jpg',
  'Pan Pizza': 'https://i.pinimg.com/originals/16/34/99/1634999e7e7cf5d98142c91a3e7afc9e.png',
  'Stuffed Crust': 'https://www.vindulge.com/wp-content/uploads/2023/02/Vegetarian-Pizza-with-Caramelized-Onions-Mushrooms-Jalapeno-FI.jpg',
  'Whole Wheat': 'https://www.superhealthykids.com/wp-content/uploads/2021/10/best-veggie-pizza-featured-image-square-2-500x500.jpg',
};

// Function to generate all possible combinations of pizzas
const generateAllCombinations = () => {
  const allCombinations = [];

  // Iterate through each base option
  baseOptions.forEach((base, baseIndex) => {
    sauceOptions.forEach((sauce, sauceIndex) => {
      cheeseOptions.forEach((cheese, cheeseIndex) => {
        veggieOptions.forEach((veggies, veggieIndex) => {
          const pizza = {
            id: allCombinations.length + 1,
            name: `Custom ${base.name} Pizza`,
            base: base.name,
            sauce: sauce.name,
            cheese: cheese.name,
            veggie: veggies.name,
            description: `A customized ${base.name} pizza with ${veggie.name}, ${cheese.name} cheese, and ${sauce.name} sauce.`,
            price: 12.99,
            img: baseImages[base.name], 
          };

          allCombinations.push(pizza);
        });
      });
    });
  });

  return allCombinations;
};

// Generate all possible pizza combinations
const allPizzas = generateAllCombinations();

// Find the selected pizza in the array
const customizedPizza = allPizzas.find(
  (pizza) =>
    pizza.base === base.name &&
    pizza.sauce === sauce.name &&
    pizza.cheese === cheese.name &&
    pizza.veggie === veggie.name
);

// Function to handle the Buy Now button click for customized pizza
const handleBuyNowClickCustomized = async () => {
  try {
  
      if (!isTokenFetched) {
        return;
      }

    const response = await fetch("http://localhost:3001/payment/check-out", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: customizedPizza.price,          
      }),
    });

    const order = await response.json();
    console.log("Razorpay Order Response:", order);

    const options = {
      key: "rzp_test_ciEkAemCSllnO9",
      currency: "INR",
      name: "Pizzify",
      image: baseImages[base.name],
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
            selectedOptions: {
              base: base.name,
              cheese: cheese.name,
              sauce: sauce.name,
              veggie: veggie.name,
            },
          }),
        });

        const verificationResult = await verificationResponse.json();
        console.log("Payment Verification Response:", verificationResult);
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

  // Return UI based on whether the customized pizza is found
  if (!customizedPizza) {
    return (
      <div style={{ textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4">Selected Pizza</Typography>
        <Typography variant="body2">Customized pizza not found.</Typography>
      </div>
    );
  }

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <NavBar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: "1.5rem",  height: "87vh" }}>

        <Card
          sx={{
            maxWidth: isNonMobileScreens ? 400 : 350,
            marginBottom: '1rem',
            border: 'none',
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" },
          }}
        >
          <CardMedia
            component="img"
            alt={customizedPizza.name}
            style={{ width: '100%', objectFit: 'cover', transition: "transform 0.3s", "&:hover": { transform: "scale(1.1)" } }}
            image={customizedPizza.img}
          />
          <CardContent style={{ boxSizing: 'border-box', width: '100%', paddingTop: 8 }}>
            <Typography 
            variant={isNonMobileScreens ? "h5" : "h6"} 
            fontWeight={600}>
            {customizedPizza.name}
            
            </Typography>
            <Typography variant="body2" style={{ paddingBottom: 5 }}>{customizedPizza.description}</Typography>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", marginTop: "3px" }}>
              <Typography variant="body2" fontWeight={550} fontSize={20}>
                &#8377;{customizedPizza.price}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '100%', maxWidth: '45%', fontWeight: "500" }}
                onClick={handleBuyNowClickCustomized}
                sx={{
                  "&:hover": { backgroundColor: "blue" },
                  "&:active": { boxShadow: "none", backgroundColor: "blue" },
                }}
              >
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomizedPizza;