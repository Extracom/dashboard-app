// Import necessary modules and components
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu, ArrowBack } from '@mui/icons-material';
import theme from '../styles/theme'; // Import the custom theme
import AppDrawer from '../components/AppDrawer'; // Import the AppDrawer component

// Define the props for the Header component
interface HeaderProps {
    showMenu?: boolean; // Prop to control the display of the menu icon
    showLogo?: boolean; // Prop to control the display of the logo
    appBarTitle?: string; // Prop to set the title of the AppBar
    showBack?: boolean; // Prop to control the display of the back arrow
    onBack?: () => void; // Prop for the back button click handler
}

// Define the Header component
const Header: React.FC<HeaderProps> = ({ showMenu, showLogo, appBarTitle, showBack, onBack }) => {
    const [isDrawerOpen, setDrawerOpen] = useState(false); // State to control the open/close state of the drawer

    // Function to handle the opening and closing of the drawer
    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open); // Set the state of the drawer
    };

    return (
        <>
            <AppBar position="static" sx={{ ...theme.appBars.primary }}>
                <Toolbar>
                    {showBack && <IconButton
                        size="large"
                        edge="start"
                        aria-label="back"
                        sx={{ ...theme.iconButtons.appBar }} // Apply the styles from the theme
                        onClick={onBack} // Call the onBack function when the back button is clicked
                    >
                        <ArrowBack /> {/* Render the ArrowBack icon */}
                    </IconButton>}
                    {showMenu && <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ ...theme.iconButtons.appBar }} // Apply the styles from the theme
                        onClick={toggleDrawer(true)} // Open the drawer when the menu icon is clicked
                    >
                        <Menu /> {/* Render the Menu icon */}
                    </IconButton>}
                    <Typography variant="h6" sx={{ ...theme.typographies.appBar }}>
                        {appBarTitle ? appBarTitle : ""} {/* Render the AppBar title */}
                        {showLogo} {/* Render the logo if showLogo is true */}
                    </Typography>
                </Toolbar>
            </AppBar>
            <AppDrawer open={isDrawerOpen} toggleDrawer={toggleDrawer} /> {/* Render the AppDrawer component */}
        </>
    );
};

export default Header; // Export the Header component
