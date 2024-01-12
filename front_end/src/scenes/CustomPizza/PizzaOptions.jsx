// PizzaOptions.js
import React from 'react';
import { connect } from 'react-redux';
import { setBase, setCheese, setSauce, setVeggies } from 'scenes/state/authSlice';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const PizzaOptions = (props) => {
  const { base, sauce, cheese, veggies, baseOptions, sauceOptions, cheeseOptions, veggieOptions } = props;

  const handleChange = (event, type) => {
    const selectedOption = event.target.value;
    switch (type) {
      case 'base':
        props.setBase(selectedOption);
        break;
      case 'sauce':
        props.setSauce(selectedOption);
        break;
      case 'cheese':
        props.setCheese(selectedOption);
        break;
      case 'veggies':
        props.setVeggies(selectedOption);
        break;
      default:
        break;
    }
  };

  const renderOptions = (options) => {
    return options.map((option) => (
      <MenuItem key={option.id} value={option.id}>
        {option.name}
      </MenuItem>
    ));
  };

  const renderCard = (option) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={option.id}>
      <Card>
        {option.img && (
          <CardMedia
            component="img"
            height="140"
            alt={option.name}
            src={option.img}
          />
        )}
        <CardContent>
          <Typography variant="h6" component="div">
            {option.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {option.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <div>
      <FormControl>
        <InputLabel htmlFor="base-select">Select Base</InputLabel>
        <Select
          label="Select Base"
          value={base}
          onChange={(event) => handleChange(event, 'base')}
          inputProps={{
            id: 'base-select',
          }}
        >
          {renderOptions(baseOptions)}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="sauce-select">Select Sauce</InputLabel>
        <Select
          label="Select Sauce"
          value={sauce}
          onChange={(event) => handleChange(event, 'sauce')}
          inputProps={{
            id: 'sauce-select',
          }}
        >
          {renderOptions(sauceOptions)}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="cheese-select">Select Cheese</InputLabel>
        <Select
          label="Select Cheese"
          value={cheese}
          onChange={(event) => handleChange(event, 'cheese')}
          inputProps={{
            id: 'cheese-select',
          }}
        >
          {renderOptions(cheeseOptions)}
        </Select>
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="veggies-select">Select Veggies</InputLabel>
        <Select
          label="Select Veggies"
          multiple
          value={veggies}
          onChange={(event) => handleChange(event, 'veggies')}
          inputProps={{
            id: 'veggies-select',
          }}
        >
          {renderOptions(veggieOptions)}
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {baseOptions.map(renderCard)}
        {sauceOptions.map(renderCard)}
        {cheeseOptions.map(renderCard)}
        {veggieOptions.map(renderCard)}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  base: state.auth.base,
  sauce: state.auth.sauce,
  cheese: state.auth.cheese,
  veggies: state.auth.veggies,
  baseOptions: state.auth.baseOptions,
  sauceOptions: state.auth.sauceOptions,
  cheeseOptions: state.auth.cheeseOptions,
  veggieOptions: state.auth.veggieOptions,
});

export default connect(mapStateToProps, {
  setBase,
  setSauce,
  setCheese,
  setVeggies,
})(PizzaOptions);
