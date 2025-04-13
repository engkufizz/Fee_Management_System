import React, { useState } from 'react';
import {
  Box,
  Card,
  IconButton,
  Typography,
  Tooltip,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

// Apply scrolling specifically to the virtual scroller
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  // Ensure the root grid takes available width but doesn't force overflow itself
  width: '100%',
  '& .MuiDataGrid-main': {
    // Prevent the main container from having its own scrollbars
    overflow: 'hidden',
  },
  '& .MuiDataGrid-virtualScroller': {
    // THIS is the container that should scroll horizontally
    overflowX: 'auto !important',
    overflowY: 'auto', // Allow vertical scrolling too
    backgroundColor: theme.palette.background.paper,
    // Optional: Style scrollbar for better visibility if needed
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '8px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[300],
      borderRadius: '4px',
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '8px 8px 0 0',
    // Prevent headers from wrapping excessively if desired, or allow wrapping
    whiteSpace: 'normal', // Allow header text wrapping
    wordWrap: 'break-word',
    lineHeight: 1.3,
  },
  '& .MuiDataGrid-columnHeaderTitleContainer': {
     padding: '4px 0', // Adjust padding for wrapped header text
  },
  '& .MuiDataGrid-cell': {
    borderColor: theme.palette.divider,
    whiteSpace: 'normal !important', // Force text wrapping in cells
    wordWrap: 'break-word !important',
    lineHeight: '1.4 !important', // Adjust line height for readability
    padding: '8px', // Adjust padding as needed
    display: 'flex', // Use flexbox for better alignment
    alignItems: 'center', // Center content vertically
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  '& .MuiDataGrid-row:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiCheckbox-root': {
    color: theme.palette.primary.main,
  },
}));

const FeeTable = ({ data, onEdit, onDelete, feeType }) => {
  const [searchText, setSearchText] = useState('');
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  // Define columns with fixed widths to ensure content overflows horizontally
  const columns = [
     {
      field: 'studentNo',
      headerName: 'Student No',
      width: 120, // Use fixed width
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      width: 150, // Use fixed width
    },
    {
      field: 'receiptNo',
      headerName: 'Receipt No',
      width: 120, // Use fixed width
    },
    {
      field: 'payment',
      headerName: 'Amount',
      width: 100, // Use fixed width
      renderCell: (params) => (
        `RM ${parseFloat(params.value).toFixed(2)}`
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 200, // Use fixed width, maybe wider for descriptions
    },
    {
      field: 'extraInfo',
      headerName: 'Extra Info',
      width: 150, // Use fixed width
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100, // Use fixed width
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => onEdit(params.row)}
              size="small"
              sx={{ color: 'primary.main', padding: '4px' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => onDelete(params.row)}
              size="small"
              sx={{ color: 'error.main', padding: '4px' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const filteredData = data.filter((row) => {
    const searchString = searchText.toLowerCase();
    // Ensure all potential fields exist before calling toLowerCase
    return (
      (row.studentNo?.toLowerCase() ?? '').includes(searchString) ||
      (row.studentName?.toLowerCase() ?? '').includes(searchString) ||
      (row.receiptNo?.toLowerCase() ?? '').includes(searchString) ||
      (row.description?.toLowerCase() ?? '').includes(searchString) ||
      (row.extraInfo?.toLowerCase() ?? '').includes(searchString)
    );
  });

  return (
    <Card
      elevation={3}
      sx={{
        width: '100%',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        // Making the height 5 times taller using fixed pixel heights
        height: { 
          xs: '500vh',  // 5 times taller (was 95vh)
          sm: '500vh',  // 5 times taller (was 92vh)
          md: '500vh'   // 5 times taller (was 90vh)
        },
        maxHeight: '5000px', // Adding a max-height to ensure it doesn't get too tall
      }}
    >
      {/* Header Box (Search, Filter, Title) */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' }, // Align differently on mobile
            gap: 2, // Add gap between items
            // mb: 2, // Removed margin bottom as padding is on parent
          }}
        >
          <Typography variant="h6" color="primary" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
            {feeType} Fee Records
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'center', sm: 'flex-end' } }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search..." // Shorten placeholder
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ maxWidth: { xs: '100%', sm: '250px' } }} // Control width
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Box>

      {/* DataGrid container - Make this part grow and manage its height */}
      <Box sx={{ flexGrow: 1, overflow: 'hidden', width: '100%', position: 'relative' }}>
          {/* The StyledDataGrid needs to fill this Box */}
          <StyledDataGrid
            rows={filteredData}
            columns={columns}
            pageSize={500} // Significantly increased to show many more rows
            rowsPerPageOptions={[100, 250, 500]} // Updated options for many more rows
            checkboxSelection
            disableColumnMenu={false}
            getRowHeight={() => 'auto'}
            disableSelectionOnClick
            onSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: {
                showQuickFilter: false,
                printOptions: { disableToolbarButton: true },
                csvOptions: { disableToolbarButton: true },
              },
              // Ensure footer is rendered, even if pagination isn't strictly needed
              // Note: This might show pagination controls even for 0 rows if not handled carefully.
              // footer: {
              //   sx: { display: 'flex' } // Simple way to ensure it's part of layout
              // }
            }}
            // Ensure DataGrid fills its container BOX absolutely
            // This allows the footer to be pinned at the bottom
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              '& .MuiDataGrid-virtualScroller': {
                 overflow: 'auto !important',
                 // Ensure smooth scrolling for the larger content
                 scrollBehavior: 'smooth',
              },
              '& .MuiDataGrid-footerContainer': {
                // Ensure footer is visible and doesn't get overlapped
                zIndex: 1,
                backgroundColor: (theme) => theme.palette.background.paper, // Match background
              },
              '& .MuiDataGrid-row:nth-of-type(even)': {
                 backgroundColor: (theme) => theme.palette.action.hover,
              },
               // Make sure grid itself doesn't add extra borders causing layout shifts
              border: 'none',
            }}
            // Explicitly disable autoHeight
            autoHeight={false}
          />
      </Box>


      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        {/* ... (Menu items remain the same) ... */}
        <MenuItem onClick={handleFilterClose}>All Records</MenuItem>
        <MenuItem onClick={handleFilterClose}>Paid</MenuItem>
        <MenuItem onClick={handleFilterClose}>Pending</MenuItem>
        <MenuItem onClick={handleFilterClose}>Custom Filter...</MenuItem>
      </Menu>
    </Card>
  );
};

export default FeeTable;
