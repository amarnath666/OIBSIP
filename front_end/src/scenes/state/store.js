import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice, { fetchPizzaOptions } from './authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for the web

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // Add any additional configuration as needed
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

const persistor = persistStore(store);

export { store, persistor };
