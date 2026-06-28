const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const maintenanceController = require('../controllers/maintenanceController');

// All routes require authentication
router.use(auth);

// Get all vehicles (both smart and regular) for the partner
router.get('/vehicles', maintenanceController.getVehicles);

// Get kilometer data for a specific vehicle
router.get('/:vehicleId/kilometer-data', maintenanceController.getKilometerData);

// Update kilometer for a vehicle
router.put('/:vehicleId/kilometer', maintenanceController.updateKilometer);

// Fix kilometer data (for corrections)
router.post('/:vehicleId/fix-kilometer', maintenanceController.fixKilometer);

// Get kilometer history for a vehicle
router.get('/:vehicleId/kilometer-history', maintenanceController.getKilometerHistory);

// Fix SmartCar document issues
router.post('/:vehicleId/fix-smartcar', maintenanceController.fixSmartCar);

module.exports = router;