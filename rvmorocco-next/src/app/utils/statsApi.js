// src/utils/statsApi.js
import api from './api';

// Stats API functions
export const statsApi = {
  // Get monthly stats for authenticated partner
  getMonthlyStats: async (year, month) => {
    try {
      const params = {};
      if (year !== undefined) params.year = year;
      if (month !== undefined) params.month = month;
      
      const response = await api.get('/stats/monthly', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      throw error;
    }
  },

  // Get yearly stats for authenticated partner
  getYearlyStats: async (year) => {
    try {
      const params = {};
      if (year !== undefined) params.year = year;
      
      const response = await api.get('/stats/yearly', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching yearly stats:', error);
      throw error;
    }
  },

  // Get vehicle with max rental days
  getMaxRentalVehicle: async (year, month) => {
    try {
      const params = {};
      if (year !== undefined) params.year = year;
      if (month !== undefined) params.month = month;
      
      const response = await api.get('/stats/max-vehicle', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching max rental vehicle:', error);
      throw error;
    }
  },

  // Get stats for specific vehicle
  getVehicleStats: async (vehicleId, year, month) => {
    try {
      const params = { vehicleId };
      if (year !== undefined) params.year = year;
      if (month !== undefined) params.month = month;
      
      const response = await api.get('/stats/vehicle', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicle stats:', error);
      throw error;
    }
  },

  // Get all partners stats (admin only)
  getAllPartnersStats: async () => {
    try {
      const response = await api.get('/stats/admin/all-partners');
      return response.data;
    } catch (error) {
      console.error('Error fetching all partners stats:', error);
      throw error;
    }
  },

  // Get comprehensive dashboard data (all in one)
  getDashboardStats: async () => {
    try {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      
      const [monthly, yearly, maxVehicle] = await Promise.all([
        statsApi.getMonthlyStats(year, month),
        statsApi.getYearlyStats(year),
        statsApi.getMaxRentalVehicle(year, month)
      ]);
      
      return {
        monthly: monthly.data || monthly,
        yearly: yearly.data || yearly,
        maxVehicle: maxVehicle.data || maxVehicle,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
};