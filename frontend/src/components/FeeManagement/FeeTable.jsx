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

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-cell': {
    borderColor: theme.palette.divider,
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '8px 8px 0 0',
  },
  '& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.background.paper,
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

  const columns = [
    {
      field: 'studentNo',
      headerName: 'Student No',
      flex: 0.8,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight="500">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'studentName',
      headerName: 'Student Name',
      flex: 1.2,
      renderCell: (params) => (
        <Typography variant="body2">{params.value}</Typography>
      ),
    },
    {
      field: 'receiptNo',
      headerName: 'Receipt No',
      flex: 1,
    },
    {
      field: 'payment',
      headerName: 'Amount',
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body2">
          RM {parseFloat(params.value).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1.5,
    },
    {
      field: 'extraInfo',
      headerName: 'Extra Info',
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => onEdit(params.row)}
              size="small"
              sx={{ color: 'primary.main' }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              onClick={() => onDelete(params.row)}
              size="small"
              sx={{ color: 'error.main' }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  // Filter data based on search text
  const filteredData = data.filter((row) => {
    const searchString = searchText.toLowerCase();
    return (
      row.studentNo.toLowerCase().includes(searchString) ||
      row.studentName.toLowerCase().includes(searchString) ||
      row.receiptNo.toLowerCase().includes(searchString) ||
      row.description.toLowerCase().includes(searchString)
    );
  });

  return (
    <Card
      elevation={3}
      sx={{
        height: 600,
        width: '100%',
        borderRadius: 2,
        '& .MuiDataGrid-root': {
          border: 'none',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" color="primary">
            {feeType} Fee Records
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              variant="outlined"
              placeholder="Search records..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
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

        <StyledDataGrid
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          checkboxSelection
          disableSelectionOnClick
          onSelectionModelChange={(newSelection) => {
            setSelectedRows(newSelection);
          }}
          components={{
            Toolbar: GridToolbar,
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          sx={{
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              '& .MuiDataGrid-row': {
                '&:nth-of-type(2n)': {
                  backgroundColor: 'rgba(0, 0, 0, 0.02)',
                },
              },
            },
          }}
        />
      </Box>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
      >
        <MenuItem onClick={handleFilterClose}>All Records</MenuItem>
        <MenuItem onClick={handleFilterClose}>Paid</MenuItem>
        <MenuItem onClick={handleFilterClose}>Pending</MenuItem>
        <MenuItem onClick={handleFilterClose}>Custom Filter...</MenuItem>
      </Menu>
    </Card>
  );
};

export default FeeTable;