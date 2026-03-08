// src/hooks/useStats.js
import { useState, useEffect, useCallback } from 'react';
import { statsApi } from '../../../../utils/statsApi';

export const useStats = (initialYear, initialMonth) => {
  const [stats, setStats] = useState({
    monthly: null,
    yearly: null,
    maxVehicle: null,
    loading: false,
    error: null,
    lastUpdated: null
  });

  const [currentDate, setCurrentDate] = useState({
    year: initialYear || new Date().getFullYear(),
    month: initialMonth || new Date().getMonth() + 1
  });

  const fetchStats = useCallback(async (year, month) => {
    try {
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      const yearToUse = year || currentDate.year;
      const monthToUse = month || currentDate.month;
      
      // Fetch all stats in parallel
      const [monthlyRes, yearlyRes, maxVehicleRes] = await Promise.all([
        statsApi.getMonthlyStats(yearToUse, monthToUse),
        statsApi.getYearlyStats(yearToUse),
        statsApi.getMaxRentalVehicle(yearToUse, monthToUse)
      ]);
      
      setStats({
        monthly: monthlyRes.data || monthlyRes,
        yearly: yearlyRes.data || yearlyRes,
        maxVehicle: maxVehicleRes.data || maxVehicleRes,
        loading: false,
        error: null,
        lastUpdated: new Date()
      });
      
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({
        ...prev,
        loading: false,
        error: error.response?.data?.message || error.message || 'Failed to fetch statistics'
      }));
    }
  }, [currentDate.year, currentDate.month]);

  const refreshStats = () => {
    fetchStats(currentDate.year, currentDate.month);
  };

  const setDate = (year, month) => {
    setCurrentDate({ year, month });
    fetchStats(year, month);
  };

  // Fetch stats on initial load
  useEffect(() => {
    fetchStats();
  }, []);

  // Get top vehicle info
  const getTopVehicle = () => {
    if (stats.maxVehicle?.data) {
      return stats.maxVehicle.data;
    } else if (stats.monthly?.maxRentalVehicle) {
      return stats.monthly.maxRentalVehicle;
    } else if (stats.monthly?.vehicles?.length > 0) {
      // Find vehicle with max rental days from monthly vehicles
      const sortedVehicles = [...stats.monthly.vehicles]
        .sort((a, b) => (b.totalRentalDays || b.rentalDays) - (a.totalRentalDays || a.rentalDays));
      return sortedVehicles[0];
    }
    return null;
  };

  // Generate chart data from monthly vehicles
  const getVehicleChartData = () => {
    if (!stats.monthly?.vehicles) return [];
    
    return stats.monthly.vehicles
      .map(vehicle => ({
        name: vehicle.vehicleName || vehicle.name,
        rentalDays: vehicle.totalRentalDays || vehicle.rentalDays || 0,
        revenue: vehicle.totalRevenue || vehicle.revenue || 0,
        contracts: vehicle.contractCount || vehicle.numberOfContracts || 0,
        utilization: Math.min(((vehicle.totalRentalDays || vehicle.rentalDays || 0) / 30) * 100, 100)
      }))
      .sort((a, b) => b.rentalDays - a.rentalDays)
      .slice(0, 10); // Top 10 vehicles
  };

  // Get monthly revenue trend
  const getRevenueTrend = () => {
    if (!stats.yearly?.monthlyStats) return [];
    
    return stats.yearly.monthlyStats.map(month => ({
      month: month.monthName,
      revenue: month.totalRevenue || 0,
      rentalDays: month.totalRentalDays || 0
    }));
  };

  return {
    stats,
    currentDate,
    fetchStats,
    refreshStats,
    setDate,
    loading: stats.loading,
    error: stats.error,
    getTopVehicle,
    getVehicleChartData,
    getRevenueTrend,
    // Helper properties
    totalRentalDays: stats.monthly?.totalRentalDays || 0,
    totalRevenue: stats.monthly?.totalRevenue || 0,
    totalVehicles: stats.monthly?.totalVehiclesRented || 0,
    averageRentalDays: stats.monthly?.averageRentalDays || 0,
    topVehicle: getTopVehicle()
  };
};