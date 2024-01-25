// authSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzaOptions = createAsyncThunk(
  'auth/fetchPizzaOptions',
  async () => {
    try {
      const response = await fetch('http://localhost:3001/custom-pizza');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching pizza options:', error);
      throw error;
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'auth/updateOrderStatus',
  async ({ orderId, newStatus }) => {
    try {
      const response = await fetch(`http://localhost:3001/order/order-status/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData.order.status;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  userId: null,
  pizzaVarieties: [],
  baseOptions: [],
  sauceOptions: [],
  cheeseOptions: [],
  veggieOptions: [],
  selectedOptions: {
    base: null,
    sauce: null,
    cheese: null,
    veggie: null,
  },
  orderStatus: '', // Add order status to the initial state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.userId = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.token = null;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    setPizzaVarieties: (state, action) => {
      state.pizzaVarieties = action.payload;
    },
    setBase: (state, action) => {
      state.selectedOptions.base = action.payload;
    },
    setSauce: (state, action) => {
      state.selectedOptions.sauce = action.payload;
    },
    setCheese: (state, action) => {
      state.selectedOptions.cheese = action.payload;
    },
    setVeggie: (state, action) => {
      state.selectedOptions.veggie = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
    setUserId: (state, action) => {
      console.log('Setting userId:', action.payload);
      state.userId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzaOptions.fulfilled, (state, action) => {
        state.baseOptions = action.payload.baseOptions;
        state.sauceOptions = action.payload.sauceOptions;
        state.cheeseOptions = action.payload.cheeseOptions;
        state.veggieOptions = action.payload.veggieOptions;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orderStatus = action.payload;
      });
  },
});

export const {
  login,
  logout,
  setAdmin,
  setPizzaVarieties,
  setBase,
  setCheese,
  setSauce,
  setVeggie,
  setToken,
  setOrderStatus,
  setUserId
} = authSlice.actions;

export default authSlice.reducer;

export const setPizzaOptions = (baseOptions, sauceOptions, cheeseOptions, veggieOptions) => {
  return {
    type: 'auth/setPizzaOptions',
    payload: {
      baseOptions,
      sauceOptions,
      cheeseOptions,
      veggieOptions,
    },
  };
};