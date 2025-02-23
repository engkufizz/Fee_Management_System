const hostname = window.location.hostname;
const API_BASE_URL = `http://${hostname}:3002/api`;

export const feeService = {
  getStudents: async (feeType) => {
    const response = await fetch(`${API_BASE_URL}/getStudents?feeType=${feeType}`);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  addStudent: async (data) => {
    const response = await fetch(`${API_BASE_URL}/addStudent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add student');
    return response.json();
  },

  updateStudent: async (data) => {
    const response = await fetch(`${API_BASE_URL}/updateStudent`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  deleteStudent: async (id) => {
    const response = await fetch(`${API_BASE_URL}/student/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete student');
    return response.json();
  },

  resetData: async (feeType) => {
    const response = await fetch(`${API_BASE_URL}/resetStudents?feeType=${feeType}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to reset data');
    return response.json();
  },
};