import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleLogout = async () => {
        try {
            // Make a request to the server to clear the user session
            const response = await fetch("/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                // If the server responds with a successful status, set isAuthenticated to false
                setIsAuthenticated(false);
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
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

                <Drawer
                    anchor="right"
                    open={isSmallScreen && isDrawerOpen}
                    onClose={handleDrawerToggle}
                >
                    <List>
                        <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem button component={Link} to="/register" onClick={handleDrawerToggle}>
                            <ListItemText primary="Register" />
                        </ListItem>
                        {isAuthenticated && (
                            <ListItem button onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        )}
                    </List>
                </Drawer>

                {!isSmallScreen && (
                    <div>
                        {isAuthenticated ? (
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button color="inherit" component={Link} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={Link} to="/register">
                                    Register
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
