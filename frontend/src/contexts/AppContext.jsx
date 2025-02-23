import React, { createContext, useContext, useState, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
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

  const value = {
    loading,
    showLoading,
    hideLoading,
    error,
    showError,
    clearError,
    isMobile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};