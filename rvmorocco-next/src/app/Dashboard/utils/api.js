'use client';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request interceptor: attach JWT token ──────────────────────────────────
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor: auto-logout on 401 ──────────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Insurance API ──────────────────────────────────────────────────────────
export const insuranceAPI = {
  create:       (data)       => api.post('/insurance', data),
  update:       (id, data)   => api.put(`/insurance/${id}`, data),
  getAll:       ()           => api.get('/insurance'),
  getOne:       (id)         => api.get(`/insurance/${id}`),
  delete:       (id)         => api.delete(`/insurance/${id}`),
  getAttestation: (id)       => api.get(`/insurance/${id}/attestation`),
};

// ── Maintenance API ────────────────────────────────────────────────────────
export const maintenanceAPI = {
  getMaintenanceDashboard:    ()               => api.get('/maintenance/dashboard'),
  getVehiclesDueForMaintenance: ()             => api.get('/maintenance/due'),
  recordMaintenance:          (vehicleId, data)=> api.post(`/maintenance/${vehicleId}/maintenance`, data),
  updateKilometer:            (vehicleId, data)=> api.put(`/maintenance/${vehicleId}/kilometer`, data),
  getMaintenanceSchedule:     (vehicleId)      => api.get(`/maintenance/${vehicleId}/schedule`),
  getMaintenanceHistory:      (vehicleId)      => api.get(`/maintenance/${vehicleId}/history`),
  updateMaintenanceSettings:  (vehicleId, data)=> api.put(`/maintenance/${vehicleId}/settings`, data),
};

export default api;