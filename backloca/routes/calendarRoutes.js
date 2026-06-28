// calendarRoutes.js
const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const authMiddleware = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authMiddleware);

// Get calendar events
router.get('/events', calendarController.getCalendarEvents);

// Get vehicle boarding tasks and progression
router.get('/boarding-tasks/:contractType/:contractId', calendarController.getVehicleBoardingTasks);

// Update boarding status (for real-time updates)
router.put('/boarding-status/:contractType/:contractId', calendarController.updateBoardingStatus);

// Get all active boarding tasks for dashboard
router.get('/active-boarding-tasks', calendarController.getActiveBoardingTasks);

// Check vehicle availability
router.get('/availability', calendarController.getVehicleAvailability);

// Get upcoming rentals
router.get('/upcoming', calendarController.getUpcomingRentals);

// Get rental details
router.get('/rental/:contractType/:contractId', calendarController.getRentalDetails);

// Export calendar data
router.get('/export', calendarController.exportCalendarData);

module.exports = router;