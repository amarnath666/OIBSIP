import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    enteredOTP: '',
  });
  const [verificationMessage, setVerificationMessage] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    setFormData({ ...formData, email: email || '' });
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/confirm-otp', formData);

      if (response.status === 200) {
        setVerificationMessage('OTP verified successfully.');

        // Redirect to login page after successful OTP verification
        navigate('/login');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setVerificationMessage('Invalid or expired OTP. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            OTP Verification
          </Typography>
          <Typography>OTP has been sent to your email. Please check your mail.</Typography>
          {verificationMessage && <Typography color="success">{verificationMessage}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField fullWidth type="email" label="Email" name="email" onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="OTP" name="enteredOTP" onChange={handleChange} margin="normal" required />
            {/* Use the correct field name here */}
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Verify OTP
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default OTPVerification;