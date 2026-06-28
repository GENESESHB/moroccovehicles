// Dans routes/vehicle.js, ajoutez ces routes
const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const { upload, handleUploadErrors } = require('../middleware/upload');
const auth = require('../middleware/auth');

// Routes existantes
router.get('/public/available', vehicleController.getAvailableVehiclesPublic);

router.post('/', 
  auth, 
  upload.single('image'), 
  handleUploadErrors,
  vehicleController.addVehicle
);

router.get('/my-vehicles', auth, vehicleController.getMyVehicles);
router.get('/:id', auth, vehicleController.getVehicle);
router.put('/:id', 
  auth, 
  upload.single('image'), 
  handleUploadErrors,
  vehicleController.updateVehicle
);
router.delete('/:id', auth, vehicleController.deleteVehicle);

// NOUVELLE ROUTE POUR CHANGER LA DISPONIBILITÉ (AJOUTÉE ICI)
router.patch('/:id', auth, vehicleController.toggleVehicleAvailability);

// NOUVELLES ROUTES POUR LES DOMMAGES
//router.get('/:vehicleId/damages', auth, vehicleController.getVehicleDamages);
router.put('/:vehicleId/damages/mark-repaired', auth, vehicleController.markDamagesRepaired);

module.exports = router;