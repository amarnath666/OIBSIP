import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  pizzaVarieties: [],
  selectedOptions: {
    base: null,
    sauce: null,
    cheese: null,
    veggie: []
  }
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
    setSelectedOptions: (state, action) => {
      const {category, variety} = action.payload;
      state.selectedOptions[category] = variety;
    }
  },
});

export const { login, logout, setAdmin, setPizzaVarieties, setSelectedOptions } = authSlice.actions;
export default authSlice.reducer;
