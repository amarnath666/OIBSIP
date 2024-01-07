import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from 'scenes/loginPage/RegistrationForm';
import OTPVerification from 'scenes/loginPage/OTPVerification';
import LoginForm from 'scenes/loginPage/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        {/* <Route path="/auth/confirm/:token" element={<EmailVerification />} /> */}
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
