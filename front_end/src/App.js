// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from 'scenes/loginPage/RegistrationForm';
import OTPVerification from 'scenes/loginPage/OTPVerification';
import LoginForm from 'scenes/loginPage/LoginForm';
import ResetPassword from 'scenes/loginPage/ResetPassword';
import ForgotPasswordForm from 'scenes/loginPage/ForgotPassword';
import AdminLogin from 'scenes/loginPage/AdminLogin';
import Home from 'scenes/homePage/Home';
import Admin from 'scenes/AdminPage/Admin';
import CustomizedPizza from 'scenes/CustomPizza/CustomizedPizza';
import PaymentSuccess from 'scenes/PizzaComponent/PaymentSuccess';
import OrderStatus from 'scenes/PizzaComponent/OrderStatus';

const App = () => {
  // const loggedIn = window.localStorage.getItem("isLoggedIn");
  // console.log(loggedIn, "login");
  return (
    <Routes>
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/otp-verification" element={<OTPVerification />} />
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={ <LoginForm />} />
      {/* <Route path="/" element={loggedIn ? <Home /> : <LoginForm />} /> */}
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path='/customizedPizza' element={<CustomizedPizza />} />
      <Route path="/paymentsuccess" element={<PaymentSuccess />} />
      <Route path="/orderstatus" element={<OrderStatus />} />
    </Routes>
  );
};

export default App;
