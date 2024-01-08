import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from 'scenes/loginPage/RegistrationForm';
import OTPVerification from 'scenes/loginPage/OTPVerification';
import LoginForm from 'scenes/loginPage/LoginForm';
import ResetPassword from 'scenes/loginPage/ResetPassword';
import ForgotPasswordForm from 'scenes/loginPage/ForgotPassword';
import AdminLogin from 'scenes/loginPage/AdminLogin';
import NavBar from 'scenes/homePage/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        {/* <Route path="/auth/confirm/:token" element={<EmailVerification />} /> */}
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/" element={<NavBar />} />
      </Routes>
    </Router>
  );
};

export default App;
