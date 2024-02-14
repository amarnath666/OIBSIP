import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import NavBar from 'scenes/homePage/Navbar';
import { useParams } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const ResetPassword = () => {
    const navigate = useNavigate();
    const params = useParams();

    // State to manage form data and error messages
    const [formData, setFormData] = useState({
        email: params.email || '',
        resetOTP: '',
        password: '',
    });
    const [resetError, setResetError] = useState('');

    // Function to handle changes in form fields
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to handle form submission for password reset
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an API call to reset the password
            const response = await axios.post(`http://localhost:3001/auth/reset-password/${params.email}`, formData);

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
        <div>
            <NavBar />

            {/* Main content of password reset form */}
            <Grid container justifyContent="center" alignItems="center" style={{ height: '80vh' }}>
                <Grid item xs={10} sm={8} md={6} lg={4}>
                    <Paper elevation={0} style={{ padding: '20px' }}>
                    <Grid container justifyContent="center" alignItems="center" direction="column" spacing={1}>
              <Grid item>
                <LockIcon fontSize="medium" style={{ backgroundColor: '#1976D2', color: '#fff', padding: '10px', borderRadius: '50%' }} />
              </Grid>
              <Grid item>
                <Typography variant="h5" textAlign="center" fontWeight="700" color="#1976d2">
                  Reset Password
                </Typography>
              </Grid>
            </Grid>
                        <Typography color= "primary">OTP has been sent to your email. Please check your mail.</Typography>
                        <form onSubmit={handleSubmit}>
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
                            <Button type="submit" variant="contained" color="primary" fullWidth style={{ marginTop: '10px' }}>
                                Reset Password
                            </Button>
                        </form>
                        {resetError && <Typography color="error" style={{ marginTop: '10px' }}>{resetError}</Typography>}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResetPassword;
