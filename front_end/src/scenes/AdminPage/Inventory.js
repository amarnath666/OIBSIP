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
    <div style={{ textAlign: "center"}}>
      <h2>{`${ingredient.toUpperCase()} STOCK`}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px', margin: "auto" }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', width: "50%" }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', width: "50%" }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item._id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', width: "50%" }}>{item.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left', width: "50%"}}>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
