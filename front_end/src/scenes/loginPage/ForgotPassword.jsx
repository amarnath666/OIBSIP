import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from 'scenes/homePage/Navbar';

const ForgotPasswordForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
    });
    const [resetPasswordError, setResetPasswordError] = useState('');
    const [resetPasswordSuccess, setResetPasswordSuccess] = useState('');
    const [loading, setLoading] = useState(false); // New loading state

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setLoading(true); // Set loading to true when starting the request
            const response = await axios.post('http://localhost:3001/auth/forgot-password', formData);

            if (response.status === 200) {
                setResetPasswordSuccess('Password reset OTP sent. Check your email.');
                navigate("/reset-password");
            }
        } catch (error) {
            console.error('Forgot password error:', error);

            if (error.response && error.response.status === 404) {
                setResetPasswordError('User not found. Please check your email address.');
            } else {
                setResetPasswordError('Failed to send reset OTP. Please try again.');
            }
        } finally {
            setLoading(false); // Set loading to false regardless of success or error
        }
    };

    return (
        <div>
            <NavBar />
            <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
            <Grid item xs={10} sm={8} md={6} lg={4}>
                <Paper elevation={3} style={{ padding: '20px' }}>
                    <Typography variant="h5" gutterBottom>
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleResetPassword}>
                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                            {loading ? (
                                <React.Fragment>
                                    <CircularProgress size={24} color="inherit" style={{ marginRight: '10px' }} />
                                    Please wait...
                                </React.Fragment>
                            ) : (
                                'Reset Password'
                            )}
                        </Button>
                    </form>
                    {resetPasswordError && (
                        <Typography color="error" style={{ marginTop: '10px' }}>
                            {resetPasswordError}
                        </Typography>
                    )}
                    {resetPasswordSuccess && (
                        <Typography style={{ marginTop: '10px' }}>{resetPasswordSuccess}</Typography>
                    )}
                </Paper>
            </Grid>
        </Grid>
        </div>
        
    );
};

export default ForgotPasswordForm;