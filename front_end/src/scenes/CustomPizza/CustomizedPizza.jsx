import React from "react";
import { useSelector } from "react-redux";
import { Typography, Card, CardContent, CardMedia, Button } from '@mui/material';
import NavBar from "scenes/homePage/Navbar";

const CustomizedPizza = () => {
  const { selectedOptions } = useSelector((state) => state.auth);
  const { base, sauce, cheese, veggie } = selectedOptions;

  const preMadePizzas = [
    {
        id: 1,
        name: 'Vegetarian Delight',
        base: 'Thin Crust',
        sauce: 'Classic Marinara',
        cheese: 'Mozzarella',
        veggie: 'Tomatoes',
        description: 'A delightful vegetarian pizza with fresh tomatoes on a thin crust.',
        price: 12.99,
        img: 'Photo_1594928207551.webp',
      },
      {
        id: 2,
        name: 'Pepperoni Paradise',
        base: 'Hand-Tossed',
        sauce: 'Classic Marinara',
        cheese: 'Mozzarella',
        veggie: 'Bell Peppers',
        description: 'A classic pepperoni pizza with bell peppers on a hand-tossed crust.',
        price: 14.99,
        img: 'Mexican_Green_Wave.jpg',
      },
      {
        id: 3,
        name: 'Mushroom Marvel',
        base: 'Pan Pizza',
        sauce: 'Garlic Parmesan',
        cheese: 'Gouda',
        veggie: 'Mushrooms',
        description: 'Indulge in the marvel of mushrooms with garlic Parmesan sauce and Gouda cheese.',
        price: 13.99,
        img: 'Farmhouse.jpg',
      },
      {
        id: 4,
        name: 'Supreme Sensation',
        base: 'Stuffed Crust',
        sauce: 'Classic Marinara',
        cheese: 'Cheddar',
        veggie: 'Onions',
        description: 'Experience a supreme sensation with stuffed crust, classic marinara, Cheddar, and onions.',
        price: 15.99,
        img: 'Farmhouse.jpg',
      },
      {
        id: 5,
        name: 'Margherita',
        base: 'Whole Wheat',
        sauce: 'Classic Marinara',
        cheese: 'Mozzarella',
        veggie: 'Tomatoes',
        description: 'A classic Margherita pizza with whole wheat crust, marinara sauce, Mozzarella, and tomatoes.',
        price: 12.99,
        img: 'Farmhouse.jpg',
      },
      {
        id: 6,
        name: 'BBQ Chicken Bliss',
        base: 'Hand-Tossed',
        sauce: 'BBQ',
        cheese: 'Cheddar',
        veggie: 'Onions',
        description: 'Savor the bliss of BBQ chicken with hand-tossed crust, BBQ sauce, Cheddar, and onions.',
        price: 14.99,
        img: 'PepperBarbecueChicken.jpg',
      },
      {
        id: 7,
        name: 'Pesto Paradise',
        base: 'Thin Crust',
        sauce: 'Pesto',
        cheese: 'Parmesan',
        veggie: 'Spinach',
        description: 'Delicious pizza with pesto sauce, Parmesan cheese, and fresh spinach.',
        price: 12.99,
        img: 'whole-wheat-margherita-pizza.jpg',
      },
      {
        id: 8,
        name: 'Meat Lover’s Feast',
        base: 'Stuffed Crust',
        sauce: 'Classic Marinara',
        cheese: 'Mozzarella',
        veggie: 'Tomatoes',
        description: 'A hearty feast for meat lovers with classic marinara sauce and Mozzarella cheese.',
        price: 14.99,
        img: 'Farmhouse.jpg',
      },
      {
        id: 9,
        name: 'Hawaiian Retreat',
        base: 'Pan Pizza',
        sauce: 'Tomato',
        cheese: 'Mozzarella',
        veggie: 'Pineapple',
        description: 'Escape to the tropics with this Hawaiian pizza featuring tomato sauce and pineapple.',
        price: 13.99,
        img: 'Farmhouse.jpg',
      },
      {
        id: 10,
        name: 'Mediterranean Delight',
        base: 'Whole Wheat',
        sauce: 'Garlic Parmesan',
        cheese: 'Feta',
        veggie: 'Tomatoes',
        description: 'Experience the flavors of the Mediterranean with garlic Parmesan sauce and Feta cheese.',
        price: 15.99,
        img: 'Farmhouse.jpg',
      },
  ];

  
  const customizedPizza = preMadePizzas.find(
    (pizza) =>
      pizza.base === base.name &&
      pizza.sauce === sauce.name &&
      pizza.cheese === cheese.name &&
      pizza.veggie === veggie.name
  );

  
  if (!customizedPizza) {
    return (
      <div style={{ textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h4">Selected Pizza</Typography>
        <Typography variant="body2">Customized pizza not found.</Typography>
      </div>
    );
  }

  const imagePath = `${process.env.PUBLIC_URL}/${customizedPizza.img}`;

  
  return (
    <div>
      <NavBar />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        {/* Image Card */}
        <Card style={{ maxWidth: 450, maxHeight:300, boxShadow: 'none' }}>
          <CardMedia
            component="img"
            alt={customizedPizza.name}
            style={{ height: '300', width: '100%' }}
            image={imagePath}
          />
        </Card>
  
        {/* Text Card */}
        <Card style={{ maxWidth: 400, boxShadow: 'none', marginLeft: "0.5rem"}}>
          <CardContent style={{ padding: '16px', boxSizing: 'border-box' }}>
            <Typography variant="h4" fontWeight={600}>{customizedPizza.name}</Typography>
            <Typography variant="body2" style={{ paddingBottom: 8, marginTop: 8}}>{customizedPizza.description}</Typography>
            <Typography variant="body2" style={{ paddingBottom: 8 }}>
              Base: {customizedPizza.base}, Sauce: {customizedPizza.sauce}, Cheese:{' '}
              {customizedPizza.cheese}, Veggie: {customizedPizza.veggie}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
              <Typography variant="body2" fontWeight={550} fontSize={20}>
                &#8377;{customizedPizza.price}
              </Typography>
              <Button variant="contained" color="primary">
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