import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPizzaOptions = createAsyncThunk(
  'auth/fetchPizzaOptions',
  async () => {
    try {
      const response = await fetch('http://localhost:3001/custom-pizza');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log('Pizza options data:', data); 
      return data;
    } catch (error) {
      console.error('Error fetching pizza options:', error);
      throw error;
    }
  }
);

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
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
      console.log('setBase Action:', action);
      state.selectedOptions.base = action.payload;
    },

    setSauce: (state, action) => {
      console.log('setSauce Action:', action);
      state.selectedOptions.sauce = action.payload;
    },

    setCheese: (state, action) => {
      console.log('setCheese Action:', action);
      state.selectedOptions.cheese = action.payload;
    },

    setVeggie: (state, action) => {
      console.log('setVeggie Action:', action);
      state.selectedOptions.veggie = action.payload;
    },
    setPizzaOptions: (state, action) => {
      state.baseOptions = action.payload.payload.baseOptions;
      state.sauceOptions = action.payload.payload.sauceOptions;
      state.cheeseOptions = action.payload.payload.cheeseOptions;
      state.veggieOptions = action.payload.payload.veggieOptions;
    },
    
    extraReducers: (builder) => {
      builder.addCase(fetchPizzaOptions.fulfilled, (state, action) => {
        console.log('Pizza options data:', action.payload);
        state.baseOptions = action.payload.baseOptions;
        state.sauceOptions = action.payload.sauceOptions;
        state.cheeseOptions = action.payload.cheeseOptions;
        state.veggieOptions = action.payload.veggieOptions;
      });
    },
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
  setPizzaOptions,
} = authSlice.actions;
export default authSlice.reducer;
