import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { Grid,Paper, Typography,TextField,Button } from "@mui/material";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/auth/login', formData);

      if (response.status === 200) {
        // Handle successful login
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
          {loginError && <Typography color="error" style={{ marginTop: '10px' }}>{loginError}</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginForm;