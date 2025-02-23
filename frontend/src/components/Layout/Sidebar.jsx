import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  styled
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const drawerWidth = 240;

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  margin: '8px 16px',
  borderRadius: '8px',
  backgroundColor: active ? theme.palette.primary.light + '20' : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.primary.light + '30',
  },
}));

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Monthly Fees', icon: <PaymentIcon />, path: '/monthly-fees' },
    { text: 'Yearly Fees', icon: <AccountBalanceIcon />, path: '/yearly-fees' },
  ];

  const drawer = (
    <Box sx={{ mt: 8 }}>
      <List>
        {menuItems.map((item) => (
          <StyledListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            active={location.pathname === item.path ? 1 : 0}
          >
            <ListItemIcon sx={{ 
              color: location.pathname === item.path 
                ? theme.palette.primary.main 
                : theme.palette.text.secondary 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.text} 
              sx={{
                color: location.pathname === item.path 
                  ? theme.palette.primary.main 
                  : theme.palette.text.primary
              }}
            />
          </StyledListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              boxShadow: '3px 0 10px rgba(0,0,0,0.1)',
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              boxShadow: '3px 0 10px rgba(0,0,0,0.1)',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;