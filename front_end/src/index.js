// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from 'scenes/state/authSlice';
import './index.css';
import App from './App';
import store from 'scenes/state/store';

const root = createRoot(document.getElementById('root'));

const render = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          {/* Now, the App component is wrapped with Router */}
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  );
};

render();
