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
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router';

const PizzaOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Use useSelector to get the relevant data from your Redux state
  const { baseOptions, sauceOptions, cheeseOptions, veggieOptions, selectedOptions } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await dispatch(fetchPizzaOptions());
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

  const renderOptions = (options, optionType, selectedOption, categoryText) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
      <Typography variant="h4" style={{ marginBottom: '0.5rem' }}>{categoryText}</Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%' }}>
        {options.map((option, index) => (
          <Card
            key={option.id}
            onClick={() => handleOptionSelect(optionType, option)}
            sx={{
              width: 200,
              margin: 1,
              cursor: 'pointer',
              backgroundColor: selectedOption === option ? 'lightblue' : 'white',
              position: 'relative',
             
            }}
          >
            <CardMedia component="img" height="140" image={option.img} alt={option.name} />
            <CardContent style={{ textAlign: 'center' }}>
              <Typography  variant="subtitle1">{option.name}</Typography>
              {selectedOption === option && (
                <IconButton
                  style={{ position: 'absolute', top: 0, right: 0 }}
                  color="primary"
                >
                  <CheckCircleOutline />
                </IconButton>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const customizedPizza = () => {
    if (selectedOptions.base && selectedOptions.sauce && selectedOptions.cheese && selectedOptions.veggie) {
      navigate("customizedPizza");
    } else {
      console.warn("Please select one option from each category before proceeding.");
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {renderOptions(baseOptions, 'base', selectedOptions.base, 'Base')}

      {renderOptions(sauceOptions, 'sauce', selectedOptions.sauce, 'Sauce')}

      {renderOptions(cheeseOptions, 'cheese', selectedOptions.cheese, 'Cheese')}

      {renderOptions(veggieOptions, 'veggie', selectedOptions.veggie, 'Veggie')}

      <Button
        onClick={customizedPizza}
        variant="contained"
        color="primary"
        style={{ marginTop: '1rem', width: '150px' }}
      >
        Customize
      </Button>
    </div>
  );
};

export default PizzaOptions;
