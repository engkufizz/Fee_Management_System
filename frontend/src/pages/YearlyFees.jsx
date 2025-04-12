import React, { useState, useEffect } from 'react';
import { Box, Typography, Alert, Snackbar } from '@mui/material';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';

import FeeForm from '../components/FeeManagement/FeeForm';
import FeeTable from '../components/FeeManagement/FeeTable';
import FeeActions from '../components/FeeManagement/FeeActions';
import { feeService } from '../services/api';

import LoadingSpinner from '../components/common/LoadingSpinner';

const YearlyFees = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch students on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await feeService.getStudents('yearly');
      setStudents(data);
    } catch (err) {
      toast.error('Failed to fetch student records');
      setError('Failed to load student records');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        feeType: 'yearly',
        timestamp: new Date().toISOString(),
      };

      if (editingStudent) {
        await feeService.updateStudent({
          ...payload,
          id: editingStudent.id,
        });
        toast.success('Record updated successfully');
      } else {
        await Promise.all(
          formData.payments.map(payment =>
            feeService.addStudent({
              feeType: 'yearly',
              studentNo: formData.studentNo,
              studentName: formData.studentName,
              receiptNo: payment.receiptNo,
              payment: payment.amount,
              description: payment.description,
              extraInfo: formData.extraInfo,
              timestamp: new Date().toISOString(),
            })
          )
        );
        toast.success('New record(s) added successfully');
      }

      setEditingStudent(null);
      fetchStudents();
    } catch (err) {
      toast.error('Failed to save record');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({
      ...student,
      payments: [{
        receiptNo: student.receiptNo,
        amount: student.payment,
        description: student.description,
      }],
    });
  };

  const handleDelete = async (student) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await feeService.deleteStudent(student.id);
        toast.success('Record deleted successfully');
        fetchStudents();
      } catch (err) {
        toast.error('Failed to delete record');
      }
    }
  };

  const handleExport = () => {
    try {
      const detailWS = XLSX.utils.json_to_sheet(
        students.map(s => ({
          'Student No': s.studentNo,
          'Name': s.studentName,
          'Receipt No': s.receiptNo,
          'Payment': parseFloat(s.payment),
          'Description': s.description,
          'Extra Info': s.extraInfo,
        }))
      );

      const summary = Array.from(new Set(students.map(s => s.studentNo)))
        .map(no => {
          const studentPayments = students.filter(s => s.studentNo === no);
          return {
            'Student No': no,
            'Name': studentPayments[0].studentName,
            'Total Payment': studentPayments.reduce((sum, s) => sum + Number(s.payment), 0),
          };
        });
      const summaryWS = XLSX.utils.json_to_sheet(summary);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, detailWS, 'Yearly_Fees_Detail');
      XLSX.utils.book_append_sheet(wb, summaryWS, 'Yearly_Fees_Summary');
      XLSX.writeFile(wb, `yearly_fees_${new Date().toISOString().split('T')[0]}.xlsx`);
      
      toast.success('Excel file exported successfully');
    } catch (err) {
      toast.error('Failed to export Excel file');
    }
  };

  const handleBackup = () => {
    try {
      const dataStr = JSON.stringify(students);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `yearly_fees_backup_${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      toast.success('Backup file downloaded successfully');
    } catch (err) {
      toast.error('Failed to download backup');
    }
  };

  const handleRestore = async (event) => {
    // Check if a file was actually selected
    if (!event.target.files || !event.target.files[0]) {
      return; // Exit if no file selected
    }

    try {
      setLoading(true);
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const backupData = JSON.parse(e.target.result);
          // Validate the data before setting
          if (Array.isArray(backupData)) {
            // First clear existing data
            await feeService.resetData('yearly');
            
            // Then add all restored records to database
            await Promise.all(
              backupData.map(record => 
                feeService.addStudent({
                  feeType: 'yearly',
                  studentNo: record.studentNo,
                  studentName: record.studentName || record.name, // Handle both name formats
                  receiptNo: record.receiptNo,
                  payment: parseFloat(record.payment), // Ensure payment is a number
                  description: record.description,
                  extraInfo: record.extraInfo,
                  timestamp: record.timestamp
                })
              )
            );
            
            // Finally fetch fresh data from backend
            await fetchStudents();
            
            toast.success('Data restored successfully');
            // Reset the file input
            event.target.value = '';
          } else {
            toast.error('Invalid backup file format');
          }
        } catch (err) {
          console.error('Restore error:', err);
          toast.error('Failed to restore data');
        } finally {
          setLoading(false);
        }
      };

      reader.readAsText(file);
    } catch (err) {
      console.error('File read error:', err);
      toast.error('Failed to read backup file');
      setLoading(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all yearly fee data? This cannot be undone!')) {
      try {
        await feeService.resetData('yearly');
        toast.success('All yearly fee data has been reset');
        fetchStudents();
      } catch (err) {
        toast.error('Failed to reset data');
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
        Yearly Fee Management
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <LoadingSpinner />
        </Box>
      )}

      {!loading && (
        <>
          <FeeForm
            onSubmit={handleSubmit}
            initialData={editingStudent}
            feeType="Yearly"
          />

          <FeeTable
            data={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
            feeType="Yearly"
          />

          <Box sx={{ mt: 3 }}>
            <FeeActions
              onExport={handleExport}
              onBackup={handleBackup}
              onRestore={handleRestore}
              onReset={handleReset}
              feeType="Yearly"
            />
          </Box>
        </>
      )}

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default YearlyFees;
