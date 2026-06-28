const express = require('express');
const router = express.Router();
const {
  createFacture,
  getFactures,
  getFacture,
  updateFacture,
  deleteFacture,
  markAsPaid,
  getMaintenanceVehicles,
  updateKilometer,
  addDamage,
  getFactureForPrint, // Add this
  getFactureAuditTrail, // Add this
  addAttachment, // Add this
  getFacturesByInforUser, // Add this
  markDamagesRepaired, // Add this
  getVehicleDamages, // Add this
  getUserVehiclesWithFactures, // Add this
  migratePhoneNumbers, // Add this
  getDamageStatistics, // Add this
  getVehiclesNeedingRepair // Add this
} = require('../controllers/factureController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// Facture routes
router.route('/')
  .get(getFactures)
  .post(createFacture);

router.route('/:id')
  .get(getFacture)
  .put(updateFacture)
  .delete(deleteFacture);

router.route('/:id/pay')
  .put(markAsPaid);

router.route('/:id/print')  // Add this route
  .get(getFactureForPrint);

router.route('/:id/audit')  // Add this route
  .get(getFactureAuditTrail);

router.route('/:id/attachments')  // Add this route
  .post(addAttachment);

// Maintenance routes
router.route('/maintenance/vehicles')
  .get(getMaintenanceVehicles);

router.route('/maintenance/:vehicleId/kilometer')
  .put(updateKilometer);

// Damage routes
router.route('/vehicles/:vehicleId/damages')
  .get(getVehicleDamages)
  .post(addDamage);

router.route('/vehicles/:vehicleId/damages/mark-repaired')
  .put(markDamagesRepaired);

// User routes
router.route('/user/vehicles')
  .get(getUserVehiclesWithFactures);

router.route('/infor-user/:userId')
  .get(getFacturesByInforUser);

// Statistics routes
router.route('/damages/statistics')
  .get(getDamageStatistics);

router.route('/vehicles/needing-repair')
  .get(getVehiclesNeedingRepair);

// Migration route (admin only)
router.route('/migrate/phones')
  .post(migratePhoneNumbers);

module.exports = router;