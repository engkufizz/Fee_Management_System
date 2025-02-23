export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const validateStudent = (data) => {
  const errors = {};
  
  if (!data.studentNo) {
    errors.studentNo = 'Student number is required';
  }
  
  if (!data.studentName) {
    errors.studentName = 'Student name is required';
  }
  
  if (!data.payments || !data.payments.length) {
    errors.payments = 'At least one payment is required';
  } else {
    data.payments.forEach((payment, index) => {
      if (!payment.amount || parseFloat(payment.amount) <= 0) {
        errors[`payment_${index}`] = 'Valid payment amount is required';
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const generateReceiptNumber = () => {
  const prefix = 'RCPT';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}-${timestamp}-${random}`;
};