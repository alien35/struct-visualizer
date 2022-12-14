import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';

export default function MenuAppBar() {

  const handleConfig = () => {

  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {
            /*
            <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          */
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Code Visualizer
          </Typography>
          <Link style={{color: "white"}} to="/settings">
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleConfig}
              color="inherit"
            >
              <SettingsIcon />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}