import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import NavBar from 'scenes/homePage/Navbar';
import { Stepper, Step, StepLabel, Typography, Box, useMediaQuery } from '@mui/material';

// Icons for different order statuses
const icons = [faClock, faBoxOpen, faTruck, faCheck];

// Order status steps
const steps = ['Order Placed', 'Preparation', 'Out for Delivery', 'Delivered'];

const OrderStatus = () => {
  // Media queries for responsive design
  const isNonMobileScreens = useMediaQuery("(min-width: 500px)"); 
  const notMobileScreens = useMediaQuery("(min-width:100px )")
  const { orderId } = useParams();
  // State to manage order status and time
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderTime, setOrderTime] = useState(null);

  // Function to update order status
  const updateOrderStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3001/order/orderstatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update order status: ${errorMessage}`);
      }

      const { status, updatedAt } = await response.json();
      console.log('Updated Order:', { status, updatedAt });

      if (status !== orderStatus) {
        // Only update the time if the status changes
        setOrderStatus(status);
        setOrderTime(updatedAt);
      }
    } catch (error) {
      console.error('Error:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    // Set up interval to periodically update order status
    const intervalId = setInterval(() => {
      updateOrderStatus();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [orderId, orderStatus]); 

  return (
    <>
      <NavBar />

       {/* Title for the order status page */}
      <Typography
        variant="h4"
        style={{
          fontSize: isNonMobileScreens ? '2.2rem' : '2rem',
          marginTop: '3rem',
          marginBottom: '1rem',
          marginLeft: isNonMobileScreens ? '5rem' : '1rem',
          color: "#1976d2",
          fontWeight: isNonMobileScreens ? '900' : '700',
        }}
      >
        Track Order Status
      </Typography>

      {/* Box containing the Stepper component for order status */}
      <Box textAlign="center" sx={{ marginLeft: isNonMobileScreens ? '5rem' : '1rem' }}>
        <Stepper activeStep={icons.indexOf(orderStatus)} orientation="vertical">
          {/* Map through each step and display the corresponding icon, label, and time */}
          {steps.map((label, index) => (
            <Step key={index}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start',
                }}
              >
                <div
                  style={{
                    marginRight: '1rem',
                  }}
                >
                  {/* Display FontAwesomeIcon with dynamic color based on the order status */}
                  <FontAwesomeIcon
                    icon={icons[index]}
                    style={{
                      fontSize: isNonMobileScreens ? '2rem' : '1.5rem',
                      color:
                        index <= steps.indexOf(orderStatus)
                          ? index === steps.indexOf(orderStatus)
                            ? '#1976D2'
                            : 'grey'
                          : '#463E3F',
                    }}
                  />
                </div>
                <div>
                  {/* Display order status label with dynamic color */}
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: '1.5rem',
                      color:
                        index <= steps.indexOf(orderStatus)
                          ? index === steps.indexOf(orderStatus)
                            ? '#1976D2'
                            : 'grey'
                          : '#463E3F',
                    }}
                  >
                    {label}
                  </Typography>
                </div>
                {/* Displaying the time for the current step */}
                {index === steps.indexOf(orderStatus) && (
                  <div
                    style={{
                      marginLeft: isNonMobileScreens ? "65px" : "50px",
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ marginRight: isNonMobileScreens ? '1rem': "0.5rem"}}>
                      <FontAwesomeIcon icon={faClock} style={{ fontSize: isNonMobileScreens ? '1.3rem' : "1rem", color: 'grey' }} />
                    </div>
                    <div>
                      {/* Display formatted time for the current step */}
                      <Typography variant="body1" style={{ fontSize: isNonMobileScreens ? '1.3rem': "1rem", color: 'grey' }}>
                        {new Date(orderTime).toLocaleString(undefined, {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

export default OrderStatus;
