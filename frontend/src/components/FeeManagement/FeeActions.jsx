import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const FeeActions = ({ 
  onExport, 
  onBackup, 
  onRestore, 
  onReset,
  feeType 
}) => {
  return (
    <Card 
      elevation={3}
      sx={{ 
        borderRadius: 2,
        background: (theme) => 
          `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          Data Management
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={onExport}
              sx={{ height: '100%', minHeight: 56 }}
            >
              Export to Excel
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<BackupIcon />}
              onClick={onBackup}
              sx={{ height: '100%', minHeight: 56 }}
            >
              Download Backup
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="info"
              startIcon={<UploadFileIcon />}
              onClick={onRestore}
              component="label"
              sx={{ height: '100%', minHeight: 56 }}
            >
              Restore Backup
              <input
                type="file"
                hidden
                accept=".json"
                onChange={onRestore}
              />
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<DeleteSweepIcon />}
              onClick={onReset}
              sx={{ height: '100%', minHeight: 56 }}
            >
              Reset All Data
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FeeActions;