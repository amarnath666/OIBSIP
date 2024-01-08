import { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    resetOTP: '',
    password: '',
  });
  const [resetError, setResetError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an API call to reset the password
      const response = await axios.post('http://localhost:3001/auth/reset-password', formData);

      if (response.status === 200) {
       navigate("/login");
        
        console.log('Password reset successfully');
        
      }
    } catch (error) {
      console.error('Reset password error:', error);

      if (error.response && error.response.status === 400) {
        setResetError('Invalid or expired OTP. Please try again.');
      } else {
        setResetError('Error resetting password. Please try again.');
      }
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          <Typography>OTP has been sent to your email. Please check your mail.</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              name="email"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="text"
              label="Reset OTP"
              name="resetOTP"
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="password"
              label="New Password"
              name="password"
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Reset Password
            </Button>
          </form>
          {resetError && <Typography color="error" style={{ marginTop: '10px' }}>{resetError}</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ResetPassword;
