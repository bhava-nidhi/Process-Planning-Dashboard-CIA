import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Badge
} from '@mui/material';
import {
  Menu,
  Mail,
  Dashboard,
  Notifications,
  Group,
  Settings,
  Brightness4,
  Brightness7
} from '@mui/icons-material';
import ChatInterface from './components/ChatInterface';
import DashboardView from './components/DashboardView';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2563EB',
      },
      secondary: {
        main: darkMode ? '#90CAF9' : '#1976D2',
      },
    },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, view: 'dashboard' },
    { text: 'Chat', icon: <Mail />, view: 'chat' },
    { text: 'Teams', icon: <Group />, view: 'teams' },
    { text: 'Notifications', icon: <Notifications />, view: 'notifications' },
    { text: 'Settings', icon: <Settings />, view: 'settings' },
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            disablePadding
            key={item.text}
            selected={activeView === item.view}
            onClick={() => {
              setActiveView(item.view);
              setMobileOpen(false);
            }}
          >
            <ListItemIcon>
              {item.text === 'Notifications' ? (
                <Badge badgeContent={4} color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <AppBar
            position="fixed"
            sx={{
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: 'none' } }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Process Planning
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                {darkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Toolbar>
          </AppBar>
          
          <Box
            component="nav"
            sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: 'block', sm: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 240px)` },
            }}
          >
            <Toolbar />
            <Routes>
              <Route path="/" element={<DashboardView />} />
              <Route path="/chat" element={<ChatInterface />} />
              <Route path="/teams" element={<div>Teams View</div>} />
              <Route path="/notifications" element={<div>Notifications View</div>} />
              <Route path="/settings" element={<div>Settings View</div>} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;
