import React, { useState, useEffect } from 'react';

const Inventory = ({ ingredient }) => {
  const [inventory, setInventory] = useState([]);

  const fetchInventory = async () => {
    try {
      const response = await fetch(`http://localhost:3001/stock/${ingredient}`);
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error(`Error fetching ${ingredient} inventory:`, error);
    }
  };

  useEffect(() => {
    // Fetch initial inventory on component mount
    fetchInventory();

    // Poll for inventory updates every 5 seconds (adjust as needed)
    const interval = setInterval(() => {
      fetchInventory();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [ingredient]);

  return (
    <div>
      <h2>{`${ingredient} Inventory`}</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
