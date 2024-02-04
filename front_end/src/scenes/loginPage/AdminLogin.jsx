import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { setAdmin } from 'scenes/state/authSlice';
import { login } from 'scenes/state/authSlice';
import { useDispatch } from 'react-redux';
import NavBar from 'scenes/homePage/Navbar';
import LockIcon from '@mui/icons-material/Lock';

const AdminLogin = () => {
    const navigate = useNavigate();

    // State to manage form data and login error
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loginError, setLoginError] = useState('');

    const dispatch = useDispatch();

    // Function to handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle admin login
    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
          // Make a request to the server to perform admin login
          const response = await axios.post('http://localhost:3001/auth/admin-login', formData);

            if (response.status === 200) {
                // If login is successful, dispatch the setAdmin action and navigate to the admin page
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
      <div>
        <NavBar />

        {/* Main content of the admin login page */}
        <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={0} style={{ padding: '20px' }}>
        {/* Grid container for the lock icon and title */}
        <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
              <Grid item>
                {/* Lock icon with styling */}
                <LockIcon fontSize="medium" style={{ backgroundColor: '#1976D2', color: '#fff', padding: '10px', borderRadius: '50%' }} />
              </Grid>
              <Grid item>
                {/* Title for the admin login */}
                <Typography variant="h5" textAlign="center" fontWeight="700" color="blue">
                  Admin login
                </Typography>
              </Grid>
            </Grid>
        
        {/* Form for admin login */}
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
            <Button fullWidth type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
              Login
            </Button>
          </form>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}          
        </Paper>
      </Grid>
    </Grid>
      </div>
        
  );
};

export default AdminLogin;

