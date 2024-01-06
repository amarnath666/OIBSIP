import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationForm from 'scenes/loginPage/RegistrationForm';
import VerificationPage from 'scenes/loginPage/VerificationPage';
import EmailVerification from 'scenes/loginPage/EmailVerification';
import LoginForm from 'scenes/loginPage/LoginForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/auth/confirm/:token" element={<EmailVerification />} />
        {/* <Route path="/auth/confirm/:token" element={<VerificationPage />} /> */}
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
};

export default App;
