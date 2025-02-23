import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Collapse,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

const FeeForm = ({ onSubmit, initialData = null, feeType }) => {
  const [formData, setFormData] = useState(initialData || {
    studentNo: '',
    studentName: '',
    payments: [{ receiptNo: '', amount: '', description: '' }],
    extraInfo: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (index, field, value) => {
    setFormData((prev) => {
      const newPayments = [...prev.payments];
      newPayments[index] = {
        ...newPayments[index],
        [field]: value,
      };
      return { ...prev, payments: newPayments };
    });
  };

  const addPaymentField = () => {
    setFormData((prev) => ({
      ...prev,
      payments: [
        ...prev.payments,
        { receiptNo: '', amount: '', description: '' },
      ],
    }));
  };

  const removePaymentField = (index) => {
    if (formData.payments.length > 1) {
      setFormData((prev) => ({
        ...prev,
        payments: prev.payments.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation
    if (!formData.studentNo || !formData.studentName) {
      setError('Student number and name are required');
      return;
    }

    const hasValidPayment = formData.payments.some(
      (p) => p.amount && parseFloat(p.amount) > 0
    );
    if (!hasValidPayment) {
      setError('At least one valid payment amount is required');
      return;
    }

    onSubmit(formData);
    if (!initialData) {
      // Clear form if it's a new entry
      setFormData({
        studentNo: '',
        studentName: '',
        payments: [{ receiptNo: '', amount: '', description: '' }],
        extraInfo: '',
      });
    }
    setError('');
  };

  return (
    <Card 
      elevation={3}
      sx={{
        mb: 4,
        borderRadius: 2,
        background: (theme) => 
          `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom color="primary">
          {initialData ? 'Edit' : 'New'} {feeType} Fee Entry
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Student Information */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Number"
                name="studentNo"
                value={formData.studentNo}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Student Name"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            {/* Payment Fields */}
            {formData.payments.map((payment, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    position: 'relative',
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Receipt No"
                        value={payment.receiptNo}
                        onChange={(e) =>
                          handlePaymentChange(index, 'receiptNo', e.target.value)
                        }
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        value={payment.amount}
                        onChange={(e) =>
                          handlePaymentChange(index, 'amount', e.target.value)
                        }
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Description"
                        value={payment.description}
                        onChange={(e) =>
                          handlePaymentChange(index, 'description', e.target.value)
                        }
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  {formData.payments.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => removePaymentField(index)}
                      sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: 'error.main',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                startIcon={<AddIcon />}
                onClick={addPaymentField}
                variant="outlined"
                size="small"
              >
                Add Another Payment
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Extra Information"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleInputChange}
                multiline
                rows={2}
                variant="outlined"
              />
            </Grid>

            {/* Error Message */}
            <Grid item xs={12}>
              <Collapse in={!!error}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => setError('')}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Collapse>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {initialData ? 'Update' : 'Submit'} Fee Entry
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    setFormData({
                      studentNo: '',
                      studentName: '',
                      payments: [{ receiptNo: '', amount: '', description: '' }],
                      extraInfo: '',
                    });
                    setError('');
                  }}
                >
                  Clear Form
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeeForm;