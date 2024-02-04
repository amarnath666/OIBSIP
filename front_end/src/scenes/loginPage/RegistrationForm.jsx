import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Grid, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import NavBar from 'scenes/homePage/Navbar';
import LockIcon from '@mui/icons-material/Lock';

// Common style for the form paper
const commonFormStyle = {
  padding: '20px',
  marginTop: '1rem',
  boxShadow: 'none', 
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

  // Function to handle changes in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set loading to true while waiting for the server response
      setLoading(true);

      // Make a request to the server for registration
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

      {/* Main content of registration form */}
      <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
        <Grid item xs={10} sm={8} md={6} lg={4}>
          {/* Paper component for the registration form */}
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

            {/* Display loading spinner and message while waiting for OTP */}
            {loading && (
              <React.Fragment>
                <CircularProgress style={{ marginBottom: '10px' }} />
                <Typography style={{ marginBottom: '10px' }}>Please wait while we send the OTP...</Typography>
              </React.Fragment>
            )}
            {registrationError && <Typography color="error">{registrationError}</Typography>}

            {/* Form for user registration */}
            <form onSubmit={handleSubmit}>
              {/* Text fields for user details */}
              <TextField fullWidth label="Name" name="name" onChange={handleChange} margin="normal" required />
              <TextField fullWidth label="Location" name="location" onChange={handleChange} margin="normal" required />
              <TextField fullWidth type="email" label="Email" name="email" onChange={handleChange} margin="normal" required />
              <TextField fullWidth type="password" label="Password" name="password" onChange={handleChange} margin="normal" required />

              {/* Submit button for user registration */}
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
