import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

const PizzaCard = ({ pizza }) => {
    return (
        <Card sx={{ marginTop: "0.2rem"}}>
            <CardMedia
                component="img"
                height="275"
                width="100%"
                image={`${process.env.PUBLIC_URL}/${pizza.img}`}
                alt={pizza.alt}
                style={{ objectFit: "cover" }}
            />
            <CardContent >
                <Typography variant="h6" gutterBottom >
                    {pizza.name}
                </Typography>
                
                <Box display="flex" justifyContent="space-between" mt={1.5} >
                    <Typography variant="h6" color="text.secondary">
                        &#8377;{pizza.price}
                    </Typography>
                    <Button variant="contained" color="primary">
                        Buy Now
                    </Button>
                </Box>   
            </CardContent>
        </Card>
    );
};

export default PizzaCard;