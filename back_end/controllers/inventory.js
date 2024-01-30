import Base from "../models/Base.js";
import Sauce from '../models/Sauce.js';
import Cheese from '../models/Cheese.js';
import Veggie from '../models/Veggie.js';
import Meat from "../models/meat.js";

// BASE INVENTORY
export const base = async (req, res) => {
    try {
      const baseInventory = await Base.find({}, 'name quantity');
      res.json(baseInventory);
    } catch (error) {
      console.error('Error fetching Base inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // SAUCE INVENTORY
  export const sauce = async (req, res) => {
    try {
      const sauceInventory = await Sauce.find({}, 'name quantity');
      res.json(sauceInventory);
    } catch (error) {
      console.error('Error fetching Base inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // CHEESE INVENTORY
  export const cheese = async (req, res) => {
    try {
      const cheeseInventory = await Cheese.find({}, 'name quantity');
      res.json(cheeseInventory);
    } catch (error) {
      console.error('Error fetching Base inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // VEGETABLES INVENTORY
  export const veggie = async (req, res) => {
    try {
      const veggieInventory = await Veggie.find({}, 'name quantity');
      res.json(veggieInventory);
    } catch (error) {
      console.error('Error fetching Base inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // MEAT INVENTORY
  export const meat = async (req, res) => {
    try {
      const meatInventory = await Meat.find({}, 'name quantity');
      res.json(meatInventory);
    } catch (error) {
      console.error('Error fetching Base inventory:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  

  


