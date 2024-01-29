import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderStatus = () => {
  const { orderId } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);

  const updateOrderStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3001/order/orderstatus/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        // No need to send a specific newStatus in the request body
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update order status: ${errorMessage}`);
      }

      const updatedOrder = await response.json();
      console.log('Updated Order:', updatedOrder);

      // Update the order status in the state
      setOrderStatus(updatedOrder.status);
    } catch (error) {
      console.error('Error:', error.message);
      // Show error message in UI or perform other error handling actions
      alert(`Error: ${error.message}`);
    }
  };

  // Periodically update order status using polling
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateOrderStatus();
    }, 5000); // Poll every 5 seconds (adjust as needed)

    // Cleanup interval when component unmounts
    return () => clearInterval(intervalId);
  }, [orderId]);

  // Popup component to show the current order status
  const Popup = () => (
    <div style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid #ccc' }}>
      <p>Current Order Status: {orderStatus}</p>
    </div>
  );

  return (
    <div>
      {/* Render the Popup component */}
      {orderStatus && <Popup />}

      {/* ... rest of your component code */}
    </div>
  );
};

export default OrderStatus;
