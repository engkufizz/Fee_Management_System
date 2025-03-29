import { createTheme } from '@mui/material/styles';

// Define base options that are common to both light and dark modes
const baseThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.4,
    },
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  // Define BASE component styles here
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            transition: 'all 0.3s',
            '&:hover': {
              // Base hover - will be overridden below if needed
            },
            '&.Mui-focused': {
               // Base focus - will be overridden below if needed
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
           // Base drawer styles - define default background if needed
           // backgroundColor: '#ffffff', // Example light mode default
        },
      },
    },
  },
}; // End of baseThemeOptions definition

// Function to get theme design tokens based on mode
const getDesignTokens = (mode) => ({
  palette: {
    mode, // Set the mode ('light' or 'dark')
    ...(mode === 'light'
      ? {
          // Light mode palette values
          primary: {
            main: '#1976d2',
            light: '#42a5f5',
            dark: '#1565c0',
            contrastText: '#fff',
          },
          secondary: {
            main: '#9c27b0',
            light: '#ba68c8',
            dark: '#7b1fa2',
            contrastText: '#fff',
          },
          error: {
            main: '#d32f2f',
            light: '#ef5350',
            dark: '#c62828',
          },
          warning: {
            main: '#ed6c02',
            light: '#ff9800',
            dark: '#e65100',
          },
          info: {
            main: '#0288d1',
            light: '#03a9f4',
            dark: '#01579b',
          },
          success: {
            main: '#2e7d32',
            light: '#4caf50',
            dark: '#1b5e20',
          },
          background: {
            default: '#f5f5f5', // Lighter background for light mode
            paper: '#ffffff',   // White paper background for light mode
          },
          text: {
              primary: 'rgba(0, 0, 0, 0.87)',
              secondary: 'rgba(0, 0, 0, 0.6)',
              disabled: 'rgba(0, 0, 0, 0.38)',
          },
        }
      : {
          // Dark mode palette values (adjust as needed)
          primary: {
            main: '#90caf9', // Lighter blue for dark mode
            light: '#e3f2fd',
            dark: '#42a5f5',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          secondary: {
            main: '#f48fb1', // Lighter pink/purple for dark mode
            light: '#f8bbd0',
            dark: '#ce93d8',
            contrastText: 'rgba(0, 0, 0, 0.87)',
          },
          error: {
            main: '#f44336',
            light: '#e57373',
            dark: '#d32f2f',
          },
          warning: {
            main: '#ffa726',
            light: '#ffb74d',
            dark: '#f57c00',
          },
          info: {
            main: '#29b6f6',
            light: '#4fc3f7',
            dark: '#0288d1',
          },
          success: {
            main: '#66bb6a',
            light: '#81c784',
            dark: '#388e3c',
          },
          background: {
            default: '#121212', // Dark background
            paper: '#1e1e1e',   // Slightly lighter dark for paper elements
          },
          text: {
            primary: '#ffffff',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
          },
        }),
  },
  ...baseThemeOptions, // Spread the common base options (typography, shape, base components)
  // Override specific component styles for dark/light mode here
  components: {
      ...baseThemeOptions.components, // Start with base component styles
      // Override Drawer for dark/light mode
      MuiDrawer: {
          styleOverrides: {
              paper: {
                  borderRight: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0,0,0,0.08)',
                  // Ensure background color changes with mode
                  backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
              },
          },
      },
      // Override TextField hover/focus for dark/light mode
      MuiTextField: {
          styleOverrides: {
              root: {
                  '& .MuiOutlinedInput-root': {
                      // Inherit base styles like borderRadius
                      '&:hover': {
                          backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.01)',
                      },
                      '&.Mui-focused': {
                          boxShadow: mode === 'dark' ? '0 0 0 2px rgba(144, 202, 249, 0.3)' : '0 0 0 2px rgba(25,118,210,0.2)', // Lighter focus ring for dark
                      },
                      // Ensure text color is appropriate for the mode
                      '& .MuiInputBase-input': {
                        color: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                         borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)', // Adjust border color
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.87)', // Adjust hover border color
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: mode === 'dark' ? '#90caf9' : '#1976d2', // Use primary color for focus border
                      },
                  },
                  // Adjust label color
                  '& .MuiInputLabel-root': {
                      color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                      color: mode === 'dark' ? '#90caf9' : '#1976d2', // Use primary color for focused label
                  },
              },
          },
      },
       // Override Card for dark/light mode
       MuiCard: {
           styleOverrides: {
               root: {
                   // Inherit base styles like borderRadius
                   // Adjust shadow based on mode
                   boxShadow: mode === 'dark' ? '0 4px 12px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.05)',
                   '&:hover': {
                       boxShadow: mode === 'dark' ? '0 6px 16px rgba(0,0,0,0.4)' : '0 6px 16px rgba(0,0,0,0.1)',
                   },
                   // Ensure background inherits correctly from paper or set explicitly
                   backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
               },
           },
       },
       // Override Dialog paper for dark mode if needed
       MuiDialog: {
         styleOverrides: {
           paper: {
             // Inherit base styles like borderRadius
             boxShadow: mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.5)' : '0 8px 32px rgba(0,0,0,0.1)', // Darker shadow?
             backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
           },
         },
       },
       // Override DialogTitle for dark mode
       MuiDialogTitle: {
         styleOverrides: {
           root: {
             // Adjust background and text color based on mode
             backgroundColor: mode === 'dark' ? '#424242' : '#1976d2', // Darker grey or primary
             color: mode === 'dark' ? '#ffffff' : '#ffffff',
             '& .MuiIconButton-root': { // Ensure close button is visible
                color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : '#ffffff',
             }
           }
         }
       },
       // Override DialogContent for dark mode
       MuiDialogContent: {
         styleOverrides: {
           root: {
              // Adjust divider color if using dividers prop
              borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
           }
         }
       },
       // Override Button for dark mode if needed (example: different hover)
       MuiButton: {
         styleOverrides: {
            // Inherit base styles
           root: {
              // Ensure text color contrasts correctly in dark mode
              // Example: primary contained button text might need to be dark
              // This is often handled by palette.primary.contrastText, but check if needed
           },
           containedPrimary: { // Specific override for contained primary
              color: mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : '#fff', // Use dark text on light blue background
              backgroundColor: mode === 'dark' ? '#90caf9' : '#1976d2',
              '&:hover': {
                  backgroundColor: mode === 'dark' ? '#42a5f5' : '#1565c0', // Adjust hover color
              }
           },
           containedSecondary: { // Specific override for contained secondary
              color: mode === 'dark' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
              backgroundColor: mode === 'dark' ? '#f48fb1' : '#9c27b0',
              '&:hover': {
                  backgroundColor: mode === 'dark' ? '#f06292' : '#7b1fa2',
              }
           },
           outlinedPrimary: { // Specific override for outlined primary
              borderColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.5)' : 'rgba(25, 118, 210, 0.5)',
              color: mode === 'dark' ? '#90caf9' : '#1976d2',
              '&:hover': {
                 borderColor: mode === 'dark' ? '#90caf9' : '#1976d2',
                 backgroundColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)',
              }
           },
           textPrimary: { // Specific override for text primary
              color: mode === 'dark' ? '#90caf9' : '#1976d2',
              '&:hover': {
                 backgroundColor: mode === 'dark' ? 'rgba(144, 202, 249, 0.08)' : 'rgba(25, 118, 210, 0.08)',
              }
           },
           // Add overrides for other variants (outlinedSecondary, textSecondary, etc.) if needed
         },
       },
       // Override DataGrid components for dark mode
        MuiDataGrid: {
          styleOverrides: {
             root: {
                // Ensure borders are visible in dark mode
                border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid #e0e0e0',
                color: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)', // Ensure text color contrasts
                '& .MuiDataGrid-cell': {
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(224, 224, 224, 1)',
                },
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: mode === 'dark' ? '#333333' : '#1976d2', // Darker header for dark mode
                  color: mode === 'dark' ? '#ffffff' : '#ffffff',
                  borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(224, 224, 224, 1)',
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  fontWeight: 600, // Ensure header text is bold enough
                },
                '& .MuiDataGrid-virtualScroller': {
                  backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                },
                '& .MuiDataGrid-footerContainer': {
                  borderTop: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(224, 224, 224, 1)',
                  backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff', // Match paper background
                  color: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
                },
                '& .MuiCheckbox-root': {
                  color: mode === 'dark' ? '#90caf9' : '#1976d2', // Match primary color
                },
                // Toolbar adjustments
                '& .MuiDataGrid-toolbarContainer button': {
                    color: mode === 'dark' ? '#ffffff' : 'inherit',
                },
                '& .MuiInputBase-root': { // Toolbar search input
                    color: mode === 'dark' ? '#ffffff' : 'inherit',
                    '&:before': {
                        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.42)' : 'rgba(0, 0, 0, 0.42)',
                    },
                     '&:hover:not(.Mui-disabled):before': {
                        borderColor: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
                    },
                },
             }
          }
       }
  }
});


// Export the function to create the theme based on mode
export const createAppTheme = (mode) => createTheme(getDesignTokens(mode));
