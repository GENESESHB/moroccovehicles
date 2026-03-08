import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const insuranceAPI = {
  getAll: async () => ({ data: [] }),
};

export const maintenanceAPI = {
  getAll: async () => ({ data: [] }),
};

export default api;