
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice,  { fetchPizzaOptions } from './authSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

export default store;
