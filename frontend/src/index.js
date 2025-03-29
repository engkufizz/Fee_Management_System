import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Import createTheme here
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
// Import the theme creation function instead of the theme object
import { createAppTheme } from './theme';
import { AppProvider, useApp } from './contexts/AppContext'; // Import useApp

// Helper component to access context and provide theme
const AppWithTheme = () => {
  const { mode } = useApp(); // Get the current mode from context
  // Create the theme based on the mode, memoize it
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures background color and base styles apply */}
      <App />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={mode} // Make toast match the theme
      />
    </ThemeProvider>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* AppProvider now wraps ThemeProvider */}
      <AppProvider>
        {/* Use the helper component */}
        <AppWithTheme />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
