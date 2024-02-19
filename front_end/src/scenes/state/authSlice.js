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

//ADMIN ORDER STATUS
export const updateOrderStatus = createAsyncThunk(
  'auth/updateOrderStatus',
  async ({ orderId, newOrderStatus }) => {   
    try {
      const response = await fetch(`http://localhost:3001/payment/updateOrderStatus/${orderId}`, { 
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newOrderStatus })
       });

      return response.data.orderStatus;
    
    } catch (error) {
      console.error('Error setting order status:', error);
      throw error;
    }
  }
);

// FETCH LATEST ORDER ID
export const fetchLatestOrderInfo = createAsyncThunk('order/fetchLatestOrderInfo', async (_, {getState}) => {
  try {
    const authToken = getState().auth.token;
    const response = await fetch("http://localhost:3001/payment/latestOrder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      }
    })
    const data = await response.json();

    if (data.success) {
      return data.latestOrderInfo;
    } else {
      throw new Error("Error fetching latest order information");
    }
  } catch (error) {
    throw new Error("Error fetching latest order information", error);
  }
});

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  token: null,
  userId: null,
  orders: [],
  status: {},
  latestOrderInfo: null,
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
      .addCase(fetchLatestOrderInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.latestOrderInfo = action.payload;
      })
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
  setLatestOrderInfo
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