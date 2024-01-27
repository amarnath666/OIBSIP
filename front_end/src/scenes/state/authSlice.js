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

export const updateUserOrderStatus = createAsyncThunk(
  'orders/updateUserOrderStatus',
  async ({ orderId, newStatus }, { getState, rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/order/orderStatus/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newStatus }),
      });

      const updatedOrder = await response.json();

      // Return the updated order to fulfill the promise
      return updatedOrder;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to update order status');
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'auth/updateOrderStatus',
  async ({ orderId, newOrderStatus }) => {
    try {
      const response = await axios.put(`http://localhost:3001/payment/updateOrderStatus/${orderId}`, { newOrderStatus });
      return response.data.orderStatus; // Assuming the server responds with the updated order status
    } catch (error) {
      console.error('Error setting order status:', error);
      throw error;
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  userId: null,
  orders: [],
  status: 'idle',
  error: null,
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
  orderStatus: '',
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
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setLatestOrderInfo: (state, action) => {
      state.latestOrderInfo = action.payload;
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
      })
      .addCase(updateUserOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the order in the state
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateUserOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
  setUserId,
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
}