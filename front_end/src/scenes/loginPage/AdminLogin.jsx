import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { setAdmin } from 'scenes/state/authSlice';
import { login } from 'scenes/state/authSlice';
import { useDispatch } from 'react-redux';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState('');

    const dispatch = useDispatch();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post('http://localhost:3001/auth/admin-login', formData);

            if (response.status === 200) {
                dispatch(setAdmin());
                navigate("/admin");
                console.log('Admin login successful');
            }
        } catch (error) {
            console.error('Admin login error:', error);

            if (error.response && error.response.status === 401) {
                setLoginError('Invalid credentials');
            } else {
                setLoginError('Failed to log in. Please try again.');
            }
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>
        <form onSubmit={handleAdminLogin}>
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
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}          
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminLogin;

