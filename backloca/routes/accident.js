const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Accident = require('../models/Accident');
const Vehicle = require('../models/Vehicle');
const SmartCar = require('../models/SmartCar');

// @route   PUT /api/accidents/vehicles/:vehicleId/damages
// @desc    Report damages for a vehicle (regular or smart)
// @access  Private
router.put('/vehicles/:vehicleId/damages', auth, async (req, res) => {
  try {
    const { damages, vehicleType, accidentDate, location, description } = req.body;
    const vehicleId = req.params.vehicleId;
    
    if (!damages || !Array.isArray(damages) || damages.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide at least one damage' 
      });
    }
    
    if (!vehicleType || !['regular', 'smart'].includes(vehicleType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid vehicle type' 
      });
    }
    
    // Validate damage format
    const validDamages = damages.every(d => 
      d.id !== undefined && d.name && d.description
    );
    
    if (!validDamages) {
      return res.status(400).json({ 
        success: false, 
        message: 'Each damage must have id, name, and description' 
      });
    }
    
    // Check if vehicle exists and user has permission
    let vehicle;
    let partnerId;
    let dbVehicleType;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
      dbVehicleType = 'SmartCar';
    } else {
      vehicle = await Vehicle.findById(vehicleId);
      dbVehicleType = 'Vehicle';
    }
    
    if (!vehicle) {
      return res.status(404).json({ 
        success: false, 
        message: 'Vehicle not found' 
      });
    }
    
    // Get partner ID from vehicle
    partnerId = vehicle.partnerId;
    
    // For regular vehicles: Update damage in Vehicle model
    if (vehicleType === 'regular') {
      // Format damages for Vehicle model
      const damageStrings = damages.map(d => 
        `${d.id}: ${d.name} - ${d.description}`
      );
      
      // Add to vehicle's dommages array
      if (!vehicle.dommages) vehicle.dommages = [];
      vehicle.dommages.push(...damageStrings);
      
      await vehicle.save();
    }
    
    // For both vehicle types: Create accident record
    const accident = new Accident({
      vehicleId,
      vehicleType: dbVehicleType,
      reportedBy: req.user.id,
      damages: damages.map(d => ({
        id: d.id,
        name: d.name,
        description: d.description
      })),
      accidentDate: accidentDate || new Date(),
      location,
      description,
      partnerId
    });
    
    await accident.save();
    
    res.json({
      success: true,
      message: vehicleType === 'smart' 
        ? 'Damage reported for smart car' 
        : 'Damage added to vehicle and reported',
      data: {
        accident: accident,
        vehicleUpdated: vehicleType === 'regular'
      }
    });
    
  } catch (error) {
    console.error('Error reporting damage:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   GET /api/accidents/vehicle/:vehicleId
// @desc    Get accident history for a vehicle
// @access  Private
router.get('/vehicle/:vehicleId', auth, async (req, res) => {
  try {
    const { vehicleType } = req.query;
    const vehicleId = req.params.vehicleId;
    
    if (!vehicleType || !['Vehicle', 'SmartCar'].includes(vehicleType)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid vehicle type' 
      });
    }
    
    const accidents = await Accident.find({ 
      vehicleId, 
      vehicleType 
    })
      .populate('reportedBy', 'name email')
      .populate('partnerId', 'name email')
      .sort({ accidentDate: -1 });
    
    res.json({
      success: true,
      data: accidents
    });
    
  } catch (error) {
    console.error('Error getting accident history:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   PUT /api/accidents/:accidentId/status
// @desc    Update accident status
// @access  Private
router.put('/:accidentId/status', auth, async (req, res) => {
  try {
    const { status, repairDetails } = req.body;
    
    const accident = await Accident.findById(req.params.accidentId);
    
    if (!accident) {
      return res.status(404).json({ 
        success: false, 
        message: 'Accident not found' 
      });
    }
    
    // Update status
    if (status) {
      accident.status = status;
    }
    
    // Update repair details if provided
    if (repairDetails) {
      accident.repairDetails = {
        ...accident.repairDetails,
        ...repairDetails,
        repairDate: repairDetails.repairDate || new Date()
      };
      
      // If vehicle is regular and status is repaired, mark damages as repaired in Vehicle model
      if (status === 'repaired' && accident.vehicleType === 'Vehicle') {
        const vehicle = await Vehicle.findById(accident.vehicleId);
        if (vehicle) {
          // Remove the damages that were reported in this accident
          const damageStrings = accident.damages.map(d => 
            `${d.id}: ${d.name} - ${d.description}`
          );
          
          vehicle.dommages = vehicle.dommages.filter(
            damage => !damageStrings.includes(damage)
          );
          
          await vehicle.save();
        }
      }
    }
    
    await accident.save();
    
    res.json({
      success: true,
      message: 'Accident status updated',
      data: accident
    });
    
  } catch (error) {
    console.error('Error updating accident status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

// @route   GET /api/accidents/partner/:partnerId
// @desc    Get all accidents for a partner
// @access  Private
router.get('/partner/:partnerId', auth, async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    const partnerId = req.params.partnerId;
    
    // Build query
    const query = { partnerId };
    
    // Date filter
    if (startDate || endDate) {
      query.accidentDate = {};
      if (startDate) query.accidentDate.$gte = new Date(startDate);
      if (endDate) query.accidentDate.$lte = new Date(endDate);
    }
    
    // Status filter
    if (status) {
      query.status = status;
    }
    
    const accidents = await Accident.find(query)
      .populate('reportedBy', 'name email')
      .populate('partnerId', 'name email')
      .sort({ accidentDate: -1 });
    
    // Group by vehicle type for statistics
    const stats = {
      total: accidents.length,
      byStatus: {},
      byVehicleType: {},
      byMonth: {}
    };
    
    accidents.forEach(accident => {
      // Count by status
      stats.byStatus[accident.status] = (stats.byStatus[accident.status] || 0) + 1;
      
      // Count by vehicle type
      stats.byVehicleType[accident.vehicleType] = (stats.byVehicleType[accident.vehicleType] || 0) + 1;
      
      // Count by month
      const month = accident.accidentDate.toISOString().slice(0, 7);
      stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
    });
    
    res.json({
      success: true,
      data: accidents,
      stats: stats
    });
    
  } catch (error) {
    console.error('Error getting partner accidents:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
});

module.exports = router;