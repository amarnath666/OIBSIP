import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClock, faTruck, faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import NavBar from 'scenes/homePage/Navbar';
import { Divider, Stepper, Step, StepLabel, Typography, Box, useMediaQuery } from '@mui/material';

const icons = [faClock, faBoxOpen, faTruck, faCheck];
const steps = ['Order Placed', 'Preparation', 'Out for Delivery', 'Delivered'];

const OrderStatus = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 500px)"); 
  const notMobileScreens = useMediaQuery("(min-width:100px )")
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderTime, setOrderTime] = useState(null);

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
    const intervalId = setInterval(() => {
      updateOrderStatus();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [orderId, orderStatus]); // Add orderStatus to the dependency array

  return (
    <>
      <NavBar />
      <Typography
        variant="h4"
        style={{
          fontSize: isNonMobileScreens ? '2.2rem' : '2rem',
          marginTop: '3rem',
          marginBottom: '1rem',
          marginLeft: isNonMobileScreens ? '5rem' : '1rem',
          color: "blue",
          fontWeight: isNonMobileScreens ? '900' : '700',
        }}
      >
        Track Order Status
      </Typography>
      <Box textAlign="center" sx={{ marginLeft: isNonMobileScreens ? '5rem' : '1rem' }}>
        <Stepper activeStep={icons.indexOf(orderStatus)} orientation="vertical">
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
                {/* Displaying the time */}
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
