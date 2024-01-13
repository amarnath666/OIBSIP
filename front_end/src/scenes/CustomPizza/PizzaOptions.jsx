import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setBase,
  setCheese,
  setSauce,
  setVeggie,
  fetchPizzaOptions,
  setPizzaOptions
} from 'scenes/state/authSlice';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const PizzaOptions = () => {
  const dispatch = useDispatch();

  // Use useSelector to get the relevant data from your Redux state
  const { baseOptions, sauceOptions, cheeseOptions, veggieOptions, selectedOptions } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await dispatch(fetchPizzaOptions());
        // Assuming fetchPizzaOptions returns the relevant data for setPizzaOptions
        dispatch(setPizzaOptions(options));
      } catch (error) {
        console.error('Error fetching pizza options:', error);
      }
    };

    fetchOptions();
  }, [dispatch]);

  console.log('Redux State:', { baseOptions, sauceOptions, cheeseOptions, veggieOptions, selectedOptions });
  console.log('Selected Options:', selectedOptions);

  if (!baseOptions || !sauceOptions || !cheeseOptions || !veggieOptions) {
    return <div>Loading...</div>;
  }
  
  const handleOptionSelect = (optionType, option) => {
    switch (optionType) {
      case 'base':
        dispatch(setBase(option));
        break;
      case 'sauce':
        dispatch(setSauce(option));
        break;
      case 'cheese':
        dispatch(setCheese(option));
        break;
      case 'veggie':
        dispatch(setVeggie(option));
        break;
      default:
        break;
    }
  };

  const renderOptions = (options, optionType, selectedOption) => (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {options.map((option) => (
        <Card
          key={option.id}
          onClick={() => handleOptionSelect(optionType, option)}
          sx={{
            width: 200,
            margin: 1,
            cursor: 'pointer',
            backgroundColor: selectedOption === option ? 'lightblue' : 'white',
          }}
        >
          <CardMedia component="img" height="140" image={option.img} alt={option.name} />
          <CardContent>
            <Typography variant="subtitle1">{option.name}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <h2>Base Options</h2>
      {renderOptions(baseOptions, 'base', selectedOptions.base)}

      <h2>Sauce Options</h2>
      {renderOptions(sauceOptions, 'sauce', selectedOptions.sauce)}

      <h2>Cheese Options</h2>
      {renderOptions(cheeseOptions, 'cheese', selectedOptions.cheese)}

      <h2>Veggie Options</h2>
      {renderOptions(veggieOptions, 'veggie', selectedOptions.veggie)}
    </div>
  );
};

export default PizzaOptions;
