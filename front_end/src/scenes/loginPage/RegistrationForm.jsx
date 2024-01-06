import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';

const RegistrationForm = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    password: '',
  });
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/register', formData);
      console.log(response.data);

      
      if (response.status === 200) {
        setRegistrationMessage('Registration successful. Check your email for verification.');

        // Redirect to login page after successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Registration
          </Typography>
          {registrationMessage && <Typography color="success">{registrationMessage}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Name" name="name" onChange={handleChange} margin="normal" required />
            <TextField fullWidth label="Location" name="location" onChange={handleChange} margin="normal" required />
            <TextField fullWidth type="email" label="Email" name="email" onChange={handleChange} margin="normal" required />
            <TextField fullWidth type="password" label="Password" name="password" onChange={handleChange} margin="normal" required />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Register
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RegistrationForm;
