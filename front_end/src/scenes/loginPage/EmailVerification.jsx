import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const EmailVerification = () => {
    const navigate = useNavigate();

  useEffect(() => {
    // Extract token from the URL
    const token = window.location.pathname.split('/')[3];

    // Make a request to your backend to verify the token
    const verifyToken = async () => {
      try {
        await axios.get(`http://localhost:3001/auth/confirm/${token}`);
        // Verification successful, redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Email verification error:', error);
        // Handle verification error, e.g., display an error message
      }
    };

    if (token) {
      verifyToken();
    }
  }, [navigate]);

  return (
    <div>
      loading
    </div>
  );
};

export default EmailVerification;