import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import NavBar from 'scenes/homePage/Navbar';
import LockIcon from '@mui/icons-material/Lock';

const commonFormStyle = {
  padding: '20px',
  marginTop: '1rem',
  boxShadow: 'none', // Added to remove card effect
};

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3001/auth/register', formData);

      // Inform the user to wait for OTP
      setRegistrationError('Registration successful. Please wait while we send the OTP.');

      navigate(`/otp-verification/${formData.email}`);
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response && error.response.status === 400) {
        setRegistrationError('Email is already in use. Please choose another email.');
      } else {
        setRegistrationError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          {/* Removed the elevation prop */}
          <Paper style={commonFormStyle}>
            <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
              <Grid item>
                <LockIcon fontSize="medium" style={{ backgroundColor: '#1976D2', color: '#fff', padding: '10px', borderRadius: '50%' }} />
              </Grid>
              <Grid item>
                <Typography variant="h5" textAlign="center" fontWeight="700" color="blue">
                  Registration
                </Typography>
              </Grid>
            </Grid>
            {loading && (
              <React.Fragment>
                <CircularProgress style={{ marginBottom: '10px' }} />
                <Typography style={{ marginBottom: '10px' }}>Please wait while we send the OTP...</Typography>
              </React.Fragment>
            )}
            {registrationError && <Typography color="error">{registrationError}</Typography>}
            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Location" name="location" onChange={handleChange} margin="normal" required />
              <TextField fullWidth type="email" label="Email" name="email" onChange={handleChange} margin="normal" required />
              <TextField fullWidth type="password" label="Password" name="password" onChange={handleChange} margin="normal" required />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }} fullWidth>
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegistrationForm;
