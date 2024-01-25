import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector from react-redux
import Button from '@mui/material/Button';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const OrderStatusOptions = () => {
  const orderStatus = useSelector((state) => state.auth.orderStatus);

  // Define the status values and the color
  const confirmed = 'Confirmed';
  const prepared = 'Prepared';
  const delivered = 'Delivered';
  const color = 'green';
  const greyColor = 'grey';

  return (
    <div>
      <div>
        <Button
          style={{ color: orderStatus === confirmed ? greyColor : color }}
        >
          <HourglassEmptyIcon /> Order Placed
        </Button>
      </div>
      <div>
        <Button
          style={{ color: orderStatus === confirmed || orderStatus === prepared ? greyColor : color }}
        >
          <HourglassEmptyIcon /> Preparation
        </Button>
      </div>
      <div>
        <Button
          style={{ color: orderStatus === delivered ? greyColor : color }}
        >
          <LocalShippingIcon /> Out for Delivery
        </Button>
      </div>
      <div>
        <Button
          style={{ color: orderStatus === delivered ? greyColor : color }}
        >
          <CheckCircleIcon /> Delivered
        </Button>
      </div>
    </div>
  );
};

export default OrderStatusOptions;
