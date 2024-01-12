// PizzaOptionsPage.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPizzaOptions } from 'scenes/state/authSlice';
import PizzaOptions from 'scenes/CustomPizza/PizzaOptions';

const PizzaOptionsPage = (props) => {
  useEffect(() => {
    // Fetch pizza options when the component mounts
    props.fetchPizzaOptions();
  }, []);

  return (
    <div>
      <h1>Select Your Pizza Options</h1>
      <PizzaOptions />
      <div>
        {/* Displaying fetched options for illustration purposes */}
        <h2>Available Pizza Options:</h2>
        <div>
          <h3>Base Options:</h3>
          <ul>
            {props.baseOptions.map((option) => (
              <li key={option.id}>{option.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Sauce Options:</h3>
          <ul>
            {props.sauceOptions.map((option) => (
              <li key={option.id}>{option.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Cheese Options:</h3>
          <ul>
            {props.cheeseOptions.map((option) => (
              <li key={option.id}>{option.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Veggie Options:</h3>
          <ul>
            {props.veggieOptions.map((option) => (
              <li key={option.id}>{option.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  baseOptions: state.auth.baseOptions,
  sauceOptions: state.auth.sauceOptions,
  cheeseOptions: state.auth.cheeseOptions,
  veggieOptions: state.auth.veggieOptions,
});

export default connect(mapStateToProps, { fetchPizzaOptions })(PizzaOptionsPage);
