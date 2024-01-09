import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
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
    }
  },
});

export const { login, logout, setAdmin } = authSlice.actions;
export default authSlice.reducer;
