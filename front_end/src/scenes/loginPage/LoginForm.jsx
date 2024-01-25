import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { login, setToken, setUserId } from 'scenes/state/authSlice';
import NavBar from 'scenes/homePage/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import axios
 from 'axios';
const LoginForm = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

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

      if (response.status === 200) {
        const { token, userId } = response.data;

        dispatch(login());
        dispatch(setToken(token));
        dispatch(setUserId(userId));

        navigate("/home");
      }
    } catch (error) {
      console.error('Login error:', error);

     
if (error.response && error.response.status === 401) {
  setLoginError('Incorrect email or password. Please try again.');
} else {
  setLoginError('Incorrect email or password. Please try again.');
}
}
};

  return (
    <Grid>
      <NavBar />
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
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
              />
              <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Login
              </Button>
            </form>
            {loginError && <Typography color="error" style={{ marginTop: '10px' }}>{loginError}</Typography>}
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              <Link to="/forgot-password">Forgot Password?</Link>
            </Typography>
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              <Link to="/register">Don't have an account? Sign Up here.</Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
