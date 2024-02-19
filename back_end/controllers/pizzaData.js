import pizzaVarieties from "../init/data";
import { baseOptions, cheeseOptions, sauceOptions, veggieOptions } from "../init/customPizza";

export const preMadePizzas = (req, res) => {
    res.json(pizzaVarieties);
  };
  
  // Route to get options for custom pizza
export const customPizza = (req, res) => {
    const customPizza = {
      baseOptions,
      sauceOptions,
      cheeseOptions,
      veggieOptions,
    };
  
    res.json(customPizza);
  };