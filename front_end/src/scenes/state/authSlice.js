import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  pizzaVarieties: [],
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
    }
  },
});

export const { login, logout, setAdmin, setPizzaVarieties } = authSlice.actions;
export default authSlice.reducer;
