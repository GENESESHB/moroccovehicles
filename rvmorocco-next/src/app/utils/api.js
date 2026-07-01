import axios from 'axios';
const axiosInstance = axios.default || axios;

const api = axiosInstance.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://moroccovehicles-1-6zww.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
