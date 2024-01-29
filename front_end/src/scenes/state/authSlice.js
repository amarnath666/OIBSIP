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

//USER STATUS
// export const updateUserOrderStatus = createAsyncThunk(
//   'orders/updateUserOrderStatus',
//   async ({ orderId }) => {
//     try {
//       const response = await fetch(`http://localhost:3001/order/orderStatus/${orderId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const updatedOrder = await response.json();

//       // Return the updated order to fulfill the promise
//       return updatedOrder;
//     } catch (error) {
//       console.error(error);
//       return rejectWithValue('Failed to update order status');
//     }
//   }
//);

//ADMIN STATUS
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

// FETCH LATEST ORDER ID
export const fetchLatestOrderInfo = createAsyncThunk('order/fetchLatestOrderInfo', async () => {
  try {
    const response = await fetch("http://localhost:3001/payment/latestOrder");
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
      // .addCase(updateUserOrderStatus.fulfilled, (state, action) => {
      //   // Update the order status in the state
      //   state.status = action.payload;
      // })
      .addCase(fetchLatestOrderInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLatestOrderInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.latestOrderInfo = action.payload;
      })
      .addCase(fetchLatestOrderInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
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