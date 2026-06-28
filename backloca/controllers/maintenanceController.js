const mongoose = require('mongoose');
const SmartCar = require('../models/SmartCar');
const Vehicle = require('../models/Vehicle');
const KilometerHistory = require('../models/KilometerHistory');

// Helper function to find vehicle in either model
const findVehicleById = async (vehicleId) => {
  try {
    // Try to find in SmartCar model first
    let vehicle = await SmartCar.findById(vehicleId);
    let vehicleType = 'smart';
    
    if (!vehicle) {
      // If not found in SmartCar, try regular Vehicle model
      vehicle = await Vehicle.findById(vehicleId);
      vehicleType = 'regular';
    }
    
    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    
    return { vehicle, vehicleType };
  } catch (error) {
    throw new Error(`Error finding vehicle: ${error.message}`);
  }
};

// Helper function to create kilometer history record
const createKilometerHistory = async (data) => {
  const historyRecord = new KilometerHistory(data);
  await historyRecord.save();
  return historyRecord;
};

// Get all vehicles for the partner
exports.getVehicles = async (req, res) => {
  try {
    const partnerId = req.user._id;
    
    // Fetch both smart cars and regular vehicles for this partner
    const [smartCars, regularVehicles] = await Promise.all([
      SmartCar.find({ partnerId }).select('-maintenanceHistory -pendingNotifications'),
      Vehicle.find({ partnerId }).select('-maintenanceHistory -pendingNotifications')
    ]);
    
    // Combine all vehicles
    const allVehicles = [
      ...smartCars.map(v => ({ ...v.toObject(), type: 'smart', isSmartCar: true })),
      ...regularVehicles.map(v => ({ ...v.toObject(), type: 'regular', isSmartCar: false }))
    ];
    
    res.status(200).json({
      success: true,
      message: 'Vehicles retrieved successfully',
      data: {
        vehicles: allVehicles,
        count: allVehicles.length,
        smartCars: smartCars.length,
        regularVehicles: regularVehicles.length
      }
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vehicles',
      error: error.message
    });
  }
};

// Get kilometer data for a specific vehicle
exports.getKilometerData = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    const { vehicle, vehicleType } = await findVehicleById(vehicleId);
    
    // Extract kilometer data based on vehicle type
    let kilometerData;
    if (vehicleType === 'smart') {
      kilometerData = {
        currentKilometer: vehicle.currentKilometer || 0,
        kmDepart: vehicle.kmDepart || 0,
        kmRetour: vehicle.kmRetour || 0,
        distanceTraveled: vehicle.distanceTraveled || 0,
        vehicleName: vehicle.nomVehicule,
        vehicleType: 'smart',
        status: vehicle.status
      };
    } else {
      kilometerData = {
        currentKilometer: vehicle.currentKilometer || 0,
        kmDepart: vehicle.kmDepart || 0,
        kmRetour: vehicle.kmRetour || 0,
        distanceTraveled: vehicle.totalDistance || 0,
        vehicleName: vehicle.name,
        vehicleType: 'regular',
        status: vehicle.available ? 'available' : 'rented'
      };
    }
    
    res.status(200).json({
      success: true,
      message: 'Kilometer data retrieved successfully',
      data: kilometerData
    });
  } catch (error) {
    console.error('Error fetching kilometer data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch kilometer data',
      error: error.message
    });
  }
};

// Update kilometer for a vehicle
exports.updateKilometer = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { kilometer, type, notes, vehicleId: bodyVehicleId } = req.body;
    const userId = req.user._id;
    const userName = req.user.name || req.user.email;
    
    // Validate input
    if (!kilometer || isNaN(kilometer)) {
      return res.status(400).json({
        success: false,
        message: 'Valid kilometer reading is required'
      });
    }
    
    const kmValue = parseFloat(kilometer);
    if (kmValue < 0 || kmValue > 1000000) {
      return res.status(400).json({
        success: false,
        message: 'Kilometer must be between 0 and 1,000,000 km'
      });
    }
    
    const { vehicle, vehicleType } = await findVehicleById(vehicleId);
    
    // Validate SmartCar specific requirements
    if (vehicleType === 'smart') {
      if (!vehicle.partnerId) {
        return res.status(400).json({
          success: false,
          message: 'SmartCar document requires partnerId',
          errorType: 'ValidationError',
          needsSmartCarFix: true
        });
      }
      
      // Check if partnerId exists and is valid
      if (!mongoose.Types.ObjectId.isValid(vehicle.partnerId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid partnerId in SmartCar document',
          errorType: 'ValidationError',
          needsSmartCarFix: true
        });
      }
    }
    
    let updateData;
    let historyData = {
      vehicleId,
      vehicleType,
      updateType: type,
      kilometer: kmValue,
      notes: notes || `${type === 'depart' ? 'Departure' : 'Return'} kilometer update`,
      performedBy: userName,
      date: new Date()
    };
    
    if (vehicleType === 'smart') {
      // Update SmartCar
      if (type === 'depart') {
        updateData = {
          kmDepart: kmValue,
          currentKilometer: kmValue,
          kilometerNotes: notes
        };
        
        // If we have kmRetour, calculate distance
        if (vehicle.kmRetour && vehicle.kmRetour > 0) {
          const distance = kmValue - vehicle.kmRetour;
          updateData.distanceTraveled = (vehicle.distanceTraveled || 0) + (distance > 0 ? distance : 0);
        }
      } else if (type === 'retour') {
        updateData = {
          kmRetour: kmValue,
          currentKilometer: kmValue,
          kilometerNotes: notes
        };
        
        // Calculate distance if we have kmDepart
        if (vehicle.kmDepart && vehicle.kmDepart > 0) {
          const distance = kmValue - vehicle.kmDepart;
          updateData.distanceTraveled = (vehicle.distanceTraveled || 0) + (distance > 0 ? distance : 0);
        }
      }
      
      // Update the vehicle
      const updatedVehicle = await SmartCar.findByIdAndUpdate(
        vehicleId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
      // Create history record
      await createKilometerHistory(historyData);
      
      res.status(200).json({
        success: true,
        message: `Kilometer ${type} updated successfully for SmartCar`,
        data: {
          vehicle: updatedVehicle,
          updateType: type,
          newKilometer: kmValue
        }
      });
      
    } else {
      // Update regular Vehicle
      if (type === 'depart') {
        updateData = {
          kmDepart: kmValue,
          currentKilometer: kmValue
        };
      } else if (type === 'retour') {
        updateData = {
          kmRetour: kmValue,
          currentKilometer: kmValue
        };
        
        // Calculate distance if we have kmDepart
        if (vehicle.kmDepart && vehicle.kmDepart > 0) {
          const distance = kmValue - vehicle.kmDepart;
          updateData.totalDistance = (vehicle.totalDistance || 0) + (distance > 0 ? distance : 0);
        }
      }
      
      // Check maintenance if it's a return
      if (type === 'retour') {
        vehicle.checkMaintenance();
      }
      
      // Update the vehicle
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        vehicleId,
        { $set: updateData, $currentDate: { lastKmUpdate: true } },
        { new: true, runValidators: true }
      );
      
      // Create history record
      await createKilometerHistory(historyData);
      
      res.status(200).json({
        success: true,
        message: `Kilometer ${type} updated successfully for Vehicle`,
        data: {
          vehicle: updatedVehicle,
          updateType: type,
          newKilometer: kmValue
        }
      });
    }
    
  } catch (error) {
    console.error('Error updating kilometer:', error);
    
    // Check if it's a validation error (like missing partnerId)
    if (error.name === 'ValidationError' || error.message.includes('partnerId')) {
      return res.status(400).json({
        success: false,
        message: 'SmartCar validation error. Please fix the document first.',
        errorType: 'ValidationError',
        needsSmartCarFix: true,
        error: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update kilometer',
      error: error.message
    });
  }
};

// Fix kilometer data (for corrections)
exports.fixKilometer = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { correctKilometer, reason } = req.body;
    const userId = req.user._id;
    const userName = req.user.name || req.user.email;
    
    // Validate input
    if (!correctKilometer || isNaN(correctKilometer)) {
      return res.status(400).json({
        success: false,
        message: 'Valid correct kilometer reading is required'
      });
    }
    
    if (!reason || reason.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Reason for correction is required'
      });
    }
    
    const kmValue = parseFloat(correctKilometer);
    if (kmValue < 0 || kmValue > 1000000) {
      return res.status(400).json({
        success: false,
        message: 'Kilometer must be between 0 and 1,000,000 km'
      });
    }
    
    const { vehicle, vehicleType } = await findVehicleById(vehicleId);
    
    // Create correction history record
    const historyData = {
      vehicleId,
      vehicleType,
      updateType: 'kilometer_correction',
      kilometer: kmValue,
      notes: `Kilometer correction: ${reason}`,
      correctionReason: reason,
      performedBy: userName,
      date: new Date()
    };
    
    let updateData;
    if (vehicleType === 'smart') {
      updateData = {
        currentKilometer: kmValue,
        kmDepart: vehicle.kmDepart > kmValue ? kmValue : vehicle.kmDepart,
        kmRetour: vehicle.kmRetour > kmValue ? kmValue : vehicle.kmRetour,
        kilometerNotes: `Corrected: ${reason}`
      };
      
      // Recalculate distance if needed
      if (vehicle.kmDepart && vehicle.kmRetour) {
        const distance = vehicle.kmRetour - vehicle.kmDepart;
        updateData.distanceTraveled = distance > 0 ? distance : 0;
      }
      
      await SmartCar.findByIdAndUpdate(
        vehicleId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      
    } else {
      updateData = {
        currentKilometer: kmValue,
        kmDepart: vehicle.kmDepart > kmValue ? kmValue : vehicle.kmDepart,
        kmRetour: vehicle.kmRetour > kmValue ? kmValue : vehicle.kmRetour
      };
      
      // Recalculate total distance
      if (vehicle.kmDepart && vehicle.kmRetour) {
        const distance = vehicle.kmRetour - vehicle.kmDepart;
        updateData.totalDistance = distance > 0 ? distance : 0;
      }
      
      await Vehicle.findByIdAndUpdate(
        vehicleId,
        { $set: updateData, $currentDate: { lastKmUpdate: true } },
        { new: true, runValidators: true }
      );
    }
    
    // Save the correction history
    await createKilometerHistory(historyData);
    
    res.status(200).json({
      success: true,
      message: 'Kilometer data corrected successfully',
      data: {
        newKilometer: kmValue,
        reason: reason,
        correctedBy: userName,
        correctedAt: new Date()
      }
    });
    
  } catch (error) {
    console.error('Error fixing kilometer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix kilometer data',
      error: error.message
    });
  }
};

// Get kilometer history for a vehicle
exports.getKilometerHistory = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    
    // Verify vehicle exists
    const { vehicle, vehicleType } = await findVehicleById(vehicleId);
    
    // Fetch kilometer history from KilometerHistory model
    const history = await KilometerHistory.find({ vehicleId })
      .sort({ date: -1 })
      .select('-__v');
    
    // Also include current vehicle data
    let vehicleData;
    if (vehicleType === 'smart') {
      vehicleData = {
        name: vehicle.nomVehicule,
        type: 'smart',
        currentKilometer: vehicle.currentKilometer,
        kmDepart: vehicle.kmDepart,
        kmRetour: vehicle.kmRetour,
        distanceTraveled: vehicle.distanceTraveled
      };
    } else {
      vehicleData = {
        name: vehicle.name,
        type: 'regular',
        currentKilometer: vehicle.currentKilometer,
        kmDepart: vehicle.kmDepart,
        kmRetour: vehicle.kmRetour,
        totalDistance: vehicle.totalDistance
      };
    }
    
    res.status(200).json({
      success: true,
      message: 'Kilometer history retrieved successfully',
      data: {
        vehicle: vehicleData,
        history: history,
        count: history.length
      }
    });
    
  } catch (error) {
    console.error('Error fetching kilometer history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch kilometer history',
      error: error.message
    });
  }
};

// Fix SmartCar document issues
exports.fixSmartCar = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const partnerId = req.user._id;
    
    // Find the SmartCar
    const smartCar = await SmartCar.findById(vehicleId);
    if (!smartCar) {
      return res.status(404).json({
        success: false,
        message: 'SmartCar not found'
      });
    }
    
    // Fix common issues
    const updates = {};
    
    // 1. Ensure partnerId is set (use current user's ID)
    if (!smartCar.partnerId || !mongoose.Types.ObjectId.isValid(smartCar.partnerId)) {
      updates.partnerId = partnerId;
    }
    
    // 2. Ensure vehicleType is set
    if (!smartCar.vehicleType) {
      updates.vehicleType = 'smart';
    }
    
    // 3. Ensure required fields have default values
    if (!smartCar.currentKilometer && smartCar.currentKilometer !== 0) {
      updates.currentKilometer = smartCar.kmDepart || smartCar.kmRetour || 0;
    }
    
    if (!smartCar.kmDepart && smartCar.kmDepart !== 0) {
      updates.kmDepart = smartCar.currentKilometer || 0;
    }
    
    if (!smartCar.kmRetour && smartCar.kmRetour !== 0) {
      updates.kmRetour = smartCar.currentKilometer || 0;
    }
    
    if (!smartCar.distanceTraveled && smartCar.distanceTraveled !== 0) {
      updates.distanceTraveled = 0;
    }
    
    // 4. Ensure status is set
    if (!smartCar.status) {
      updates.status = 'available';
    }
    
    // Apply updates if any
    let updatedSmartCar = smartCar;
    if (Object.keys(updates).length > 0) {
      updatedSmartCar = await SmartCar.findByIdAndUpdate(
        vehicleId,
        { $set: updates },
        { new: true, runValidators: true }
      );
    }
    
    res.status(200).json({
      success: true,
      message: 'SmartCar document fixed successfully',
      data: {
        smartCar: updatedSmartCar,
        fixesApplied: Object.keys(updates)
      }
    });
    
  } catch (error) {
    console.error('Error fixing SmartCar:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fix SmartCar document',
      error: error.message
    });
  }
};