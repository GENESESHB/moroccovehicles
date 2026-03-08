// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Intercepteur pour ajouter automatiquement le token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalide ou expiré
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
// Ajoutez ces fonctions à votre fichier utils/api.js
export const maintenanceAPI = {
  getMaintenanceDashboard: () => api.get('/maintenance/dashboard'),
  
  getVehiclesDueForMaintenance: () => api.get('/maintenance/due'),
  
  recordMaintenance: (vehicleId, data) => 
    api.post(`/maintenance/${vehicleId}/maintenance`, data),
  
  updateKilometer: (vehicleId, data) => 
    api.put(`/maintenance/${vehicleId}/kilometer`, data),
  
  getMaintenanceSchedule: (vehicleId) => 
    api.get(`/maintenance/${vehicleId}/schedule`),
  
  getMaintenanceHistory: (vehicleId) => 
    api.get(`/maintenance/${vehicleId}/history`),
  
  updateMaintenanceSettings: (vehicleId, data) => 
    api.put(`/maintenance/${vehicleId}/settings`, data)
};

// 🚗 INSURANCE API – add this
export const insuranceAPI = {
  // Create a new insurance contract
  create: (data) => api.post('/insurance', data),

  // Update an existing insurance contract
  update: (id, data) => api.put(`/insurance/${id}`, data),

  // Get all insurance contracts (optional, for future use)
  getAll: () => api.get('/insurance'),

  // Get a single contract by ID
  getOne: (id) => api.get(`/insurance/${id}`),

  // Delete a contract
  delete: (id) => api.delete(`/insurance/${id}`),

  // NEW: Get attestation data with user and vehicle info
  getAttestation: (id) => api.get(`/insurance/${id}/attestation`),
};