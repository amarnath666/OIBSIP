import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { logout } from "scenes/state/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation} from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isAdmin = useSelector((state) => state.auth.isAdmin);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Function to handle toggling the drawer open/close state on small screens
    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            // Make a request to the server to clear the user session
            const response = await fetch("http://localhost:3001/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include', 
            });
            
            
            if (response.ok) {
                // Dispatch the logout action and navigate to the home page
                dispatch(logout());
                navigate("/");
            } else {
                // Handle errors here, such as displaying an error message to the user
                console.error("Logout failed:", response.statusText);
            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Logout error:", error);
        }
    };

    return (
        <AppBar position="sticky">
            <Toolbar>
            <Typography variant="h5" component={Link} to="/home" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
                Pizzify
            </Typography>


                {isSmallScreen && (
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{  marginRight: 2 }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

            {/* Drawer for small screens */}
            <Drawer
                anchor="right"
                open={isSmallScreen && isDrawerOpen}
                onClose={handleDrawerToggle}
            >
            <List>
                 {/* Conditional rendering of navigation links based on authentication and admin status */}
                {!isAuthenticated && !isAdmin && (
                    <>
                        <ListItem Button component={Link} to="/register" onClick={handleDrawerToggle}>
                            <ListItemText primary="Register" />
                        </ListItem>
                        <ListItem Button component={Link} to="/" onClick={handleDrawerToggle}>
                            <ListItemText primary="User login" />
                        </ListItem>
                        <ListItem Button component={Link} to="/admin-login" onClick={handleDrawerToggle}>
                            <ListItemText primary="Admin login" />
                        </ListItem>
                    </>
                )}
                {isAuthenticated &&  (
                    <>
                        <ListItem Button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                )}
                {!isAuthenticated && isAdmin && (
                    <>
                    
                        {location.pathname === "/inventory" && (
                        <ListItem button component={Link} to="/admin">
                        <ListItemText primary="Orders" />
                        </ListItem>
                        )}
                        {location.pathname === "/admin" && (
                            <ListItem button component={Link} to="/inventory">
                            <ListItemText primary="Inventory" />
                            </ListItem>
                        )}   
                        <ListItem Button onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </>
                )}
            </List>
            </Drawer>

            {/* Navigation links for larger screens */}
                {!isSmallScreen &&(
                    <div>
                        {!isAuthenticated &&  !isAdmin &&(
                            <>
                            <Button color="inherit" component={Link} to="/register">
                                    Register
                                </Button>
                                <Button color="inherit" component={Link} to="/">
                                    User login
                                </Button>
                                <Button color="inherit" component={Link} to="/admin-login">
                                    Admin login
                                </Button>
                            </>
                        )}
                        
                        {isAuthenticated && (
                            <>                               
                                <Button color="inherit" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        )}
                            {!isAuthenticated && isAdmin &&(
                                <> 
                                   {location.pathname === '/admin' && (
                                        <Button color="inherit" component={Link} to="/inventory">
                                        Inventory
                                        </Button>
                                    )}
                                    {location.pathname === '/inventory' && (
                                        <Button color="inherit" component={Link} to="/admin">
                                        Orders
                                        </Button>
                                    )}
                                    <Button color="inherit" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                </>
                        )}
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
