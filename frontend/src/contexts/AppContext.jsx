import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mode, setMode] = useState('light'); // Add theme mode state

  const colorMode = useMemo( // Memoize the toggle function
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  
  const showLoading = useCallback((message = 'Loading...') => {
    setLoading(message);
  }, []);

  const hideLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const showError = useCallback((message) => {
    setError(message);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = useMemo(() => ({ // Memoize the context value
    loading,
    showLoading,
    hideLoading,
    error,
    showError,
    clearError,
    isMobile,
    mode, // Provide mode
    toggleColorMode: colorMode.toggleColorMode, // Provide toggle function
  }), [loading, showLoading, hideLoading, error, showError, clearError, isMobile, mode, colorMode.toggleColorMode]);


  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
