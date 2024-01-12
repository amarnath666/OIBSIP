// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching pizza options
export const fetchPizzaOptions = createAsyncThunk(
  'auth/fetchPizzaOptions',
  async () => {
    // Replace 'API_ENDPOINT' with your actual server API endpoint for fetching options
    const response = await fetch('API_ENDPOINT/pizza-options');
    const data = await response.json();

    return data;
  }
);

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  pizzaVarieties: [],
  baseOptions: [], // New state to store pizza options
  sauceOptions: [],
  cheeseOptions: [],
  veggieOptions: [],
  base: null,
  sauce: null,
  cheese: null,
  veggies: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    setPizzaVarieties: (state, action) => {
      state.pizzaVarieties = action.payload;
    },
    setBase: (state, action) => {
      state.base = action.payload;
    },
    setSauce: (state, action) => {
      state.sauce = action.payload;
    },
    setCheese: (state, action) => {
      state.cheese = action.payload;
    },
    setVeggies: (state, action) => {
      state.veggies = action.payload;
    },
    setPizzaOptions: (state, action) => {
      // Set pizza options from the server
      state.baseOptions = action.payload.baseOptions;
      state.sauceOptions = action.payload.sauceOptions;
      state.cheeseOptions = action.payload.cheeseOptions;
      state.veggieOptions = action.payload.veggieOptions;
    },
    extraReducers: (builder) => {
      builder.addCase(fetchPizzaOptions.fulfilled, (state, action) => {
        state.baseOptions = action.payload.baseOptions;
        state.sauceOptions = action.payload.sauceOptions;
        state.cheeseOptions = action.payload.cheeseOptions;
        state.veggieOptions = action.payload.veggieOptions;
      })
    }
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
  setVeggies,
  setPizzaOptions,
} = authSlice.actions;
export default authSlice.reducer;
