import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SchoolIcon from '@mui/icons-material/School';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Dark mode icon
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Light mode icon
import { useApp } from '../../contexts/AppContext'; // Import useApp hook

const Header = ({ onMenuClick }) => {
  const theme = useTheme(); // Can still use theme for styling the header itself
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { mode, toggleColorMode } = useApp(); // Get mode and toggle function

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        // Adjust background for dark mode if needed, or let theme handle it
        background: mode === 'light'
          ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
          : theme.palette.background.paper, // Example dark mode background
        color: theme.palette.getContrastText(
          mode === 'light' ? theme.palette.primary.main : theme.palette.background.paper
        ) // Ensure text color contrasts
      }}
      enableColorOnDark // Ensures AppBar color applies in dark mode
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <SchoolIcon sx={{ display: { xs: 'none', sm: 'block' }, mr: 1, color: 'inherit' }} />
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: '0.5px',
            // textShadow: '1px 1px 2px rgba(0,0,0,0.1)', // May not look good in dark mode
          }}
        >
          Student Fee Management System
        </Typography>
        {/* Dark Mode Toggle Button */}
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
