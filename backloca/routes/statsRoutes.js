const express = require('express');
const router = express.Router();
const {
  getMonthlyStats,
  getYearlyStats,
  getMaxRentalVehicle,
  getVehicleStats,
  getDashboardStats
} = require('../controllers/statsController');

// Import your auth middleware (using auth.js)
const auth = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(auth);

/**
 * @route   GET /api/stats/monthly
 * @desc    Get monthly rental statistics for authenticated partner
 * @access  Private
 * @query   year (optional) - Year (e.g., 2024)
 * @query   month (optional) - Month (1-12)
 * @query   type (optional) - 'regular', 'smart', or 'all' (default: 'all')
 * 
 * Example: GET /api/stats/monthly?year=2024&month=1&type=smart
 * Example: GET /api/stats/monthly (gets current month, all vehicle types)
 */
router.get('/monthly', getMonthlyStats);

/**
 * @route   GET /api/stats/yearly
 * @desc    Get yearly rental statistics for authenticated partner
 * @access  Private
 * @query   year (optional) - Year (e.g., 2024)
 * @query   type (optional) - 'regular', 'smart', or 'all' (default: 'all')
 * 
 * Example: GET /api/stats/yearly?year=2024&type=smart
 * Example: GET /api/stats/yearly (gets current year, all vehicle types)
 */
router.get('/yearly', getYearlyStats);

/**
 * @route   GET /api/stats/max-vehicle
 * @desc    Get vehicle with maximum rental days
 * @access  Private
 * @query   year (optional) - Year
 * @query   month (optional) - Month
 * @query   type (optional) - 'regular', 'smart', or 'all' (default: 'all')
 * 
 * Example: GET /api/stats/max-vehicle?year=2024&month=1&type=smart
 * Example: GET /api/stats/max-vehicle (gets current month, all vehicle types)
 */
router.get('/max-vehicle', getMaxRentalVehicle);

/**
 * @route   GET /api/stats/vehicle
 * @desc    Get rental statistics for a specific vehicle (auto-detects type)
 * @access  Private
 * @query   vehicleId (required) - Vehicle ID
 * @query   year (optional) - Year
 * @query   month (optional) - Month
 * @query   vehicleType (optional) - 'regular' or 'smart' (auto-detected if not provided)
 * 
 * Example: GET /api/stats/vehicle?vehicleId=65a1b2c3d4e5f6a7b8c9d0e1&year=2024&month=1
 */
router.get('/vehicle', getVehicleStats);

/**
 * @route   GET /api/stats/dashboard
 * @desc    Get dashboard overview statistics with growth metrics
 * @access  Private
 * 
 * Example: GET /api/stats/dashboard
 */
router.get('/dashboard', getDashboardStats);

module.exports = router;