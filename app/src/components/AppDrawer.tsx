import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { LockOpenRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface AppDrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

const AppDrawer: React.FC<AppDrawerProps> = ({ open, toggleDrawer }) => {
    const navigate = useNavigate();

    const drawerItems = {
        beforeDivider: [
            { icon: <LockOpenRounded />, text: 'Sign Out', navigate: '/signin' },
        ],
        // afterDivider: [
        //     { icon: <LockOpenRounded />, text: 'Sign In', navigate: '/signin' },
        // ]
    }

    const list = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {(drawerItems && drawerItems.beforeDivider && drawerItems.beforeDivider.length > 0) &&
                    drawerItems.beforeDivider.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton onClick={() => navigate(item.navigate)}>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
            {/* <Divider />
            <List>
                {drawerItems.afterDivider.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => navigate(item.navigate)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );

    return (
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)} >
            {list()}
        </Drawer>
    );
};


export default AppDrawer;