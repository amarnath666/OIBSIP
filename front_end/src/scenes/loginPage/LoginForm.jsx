import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);
      console.log(response.data);

      if (response.status === 200) {
        // Handle successful login
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
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
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
