const Facture = require('../models/Facture');
const Vehicle = require('../models/Vehicle');
const SmartCar = require('../models/SmartCar');
const User = require('../models/User');
const mongoose = require('mongoose');

// @desc    Create new facture for any vehicle type with infor user registration
// @route   POST /api/factures
// @access  Private
exports.createFacture = async (req, res) => {
  try {
    const {
      vehicleId,
      vehicleType = 'regular',
      vehicleName,
      matricule,
      garageName,
      phoneNumber,
      date,
      amount,
      status = 'pending',
      description,
      maintenanceDetails,
      damageRepairs,
      subtotal,
      tax = 0,
      discount = 0,
      totalAmount,
      paymentMethod = 'cash',
      notes,
      selectedParts = [],
      damageAreas = [],
      department = 'maintenance',
      autoRemoveDamages = true,
      repairedPartNames = [],
      // ADD THIS: Handle repairedPartIds from frontend
      repairedPartIds = []
    } = req.body;

    // Simple validation
    if (!vehicleId || !garageName || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle ID, garage name, and amount are required'
      });
    }

    // FIX: Handle frontend sending repairedPartIds instead of repairedPartNames
    let actualRepairedPartNames = repairedPartNames;
    if (repairedPartIds && repairedPartIds.length > 0) {
      actualRepairedPartNames = repairedPartIds;
    }

    // FIX: Create selectedParts from repairedPartNames if not provided
    const actualSelectedParts = selectedParts.length > 0 
      ? selectedParts 
      : actualRepairedPartNames.map(partName => ({
          name: partName,
          id: partName, // Use partName as ID since we don't have actual part IDs
          estimatedPrice: 0 // Default to 0, frontend should send actual price
        }));

    // FIX: Create damageAreas from repairedPartNames if not provided
    const actualDamageAreas = damageAreas.length > 0
      ? damageAreas
      : actualRepairedPartNames.map(partName => ({
          name: partName,
          estimatedPrice: 0 // Default to 0, frontend should send actual price
        }));

    let vehicle = null;
    let vehicleData = {};
    
    // Get vehicle data based on type
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
      if (vehicle) {
        vehicleData = {
          name: vehicle.nomVehicule || vehicleName,
          matricule: vehicle.numeroMatricule || matricule,
          type: vehicle.typeVehicule || 'smart',
          currentKilometer: vehicle.currentKilometer || 0,
          partnerId: vehicle.partnerId
        };
      }
    } else {
      vehicle = await Vehicle.findById(vehicleId);
      if (vehicle) {
        vehicleData = {
          name: vehicle.name || vehicleName,
          matricule: vehicle.matricule || matricule,
          type: vehicle.type || 'regular',
          currentKilometer: vehicle.currentKilometer || 0,
          partnerId: vehicle.partnerId
        };
      }
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle belongs to user (unless admin)
    const userRole = req.user.role;
    const userId = req.user.id;
    if (userRole !== 'admin' && vehicleData.partnerId && vehicleData.partnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to create factures for this vehicle'
      });
    }

    // Generate facture number
    const year = new Date().getFullYear();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    
    // Find the last invoice number for this year/month
    const lastInvoice = await Facture.findOne({
      factureNumber: new RegExp(`^FACT-${year}${month}-`)
    }).sort({ createdAt: -1 });
    
    let sequence = 1;
    if (lastInvoice && lastInvoice.factureNumber) {
      const lastSeq = parseInt(lastInvoice.factureNumber.split('-')[2]) || 0;
      sequence = lastSeq + 1;
    }
    
    const factureNumber = `FACT-${year}${month}-${sequence.toString().padStart(4, '0')}`;

    // Calculate totals if not provided
    const calculatedSubtotal = subtotal || parseFloat(amount);
    const calculatedTotal = totalAmount || (calculatedSubtotal + parseFloat(tax || 0) - parseFloat(discount || 0));

    // FIX: Use actualSelectedParts instead of selectedParts
    const detailedMaintenanceDetails = maintenanceDetails || {
      startDate: date || new Date(),
      endDate: date || new Date(),
      partsReplaced: actualSelectedParts.map(part => {
        const partObj = {
          partName: part.name || part,
          quantity: 1,
          unitPrice: part.estimatedPrice || 0,
          total: part.estimatedPrice || 0
        };
        
        if (part.id && mongoose.Types.ObjectId.isValid(part.id)) {
          partObj.partId = part.id;
        }
        
        return partObj;
      }),
      laborHours: 0,
      laborRate: 0,
      laborTotal: 0
    };

    // FIX: Use actualDamageAreas instead of damageAreas
    const detailedDamageRepairs = damageRepairs || actualDamageAreas.map(area => ({
      damageArea: area.name || area,
      description: `Repair for ${area.name || area}`,
      cost: area.estimatedPrice || 0,
      repairedDate: new Date(),
      repairedBy: 'Technician'
    }));

    // Get user information
    const user = await User.findById(req.user.id).select('name email role logoEntreprise entreprise country city number');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Create facture
    const factureData = {
      factureNumber,
      vehicleId,
      vehicleModel: vehicleType === 'smart' ? 'SmartCar' : 'Vehicle',
      vehicleName: vehicleData.name,
      matricule: vehicleData.matricule,
      vehicleType: vehicleType === 'smart' ? 'smart' : 'car',
      amount: parseFloat(amount),
      date: date || new Date(),
      status,
      garageName,
      phoneNumber: phoneNumber || 'N/A',
      description: description || `Maintenance at ${garageName}`,
      maintenanceDetails: detailedMaintenanceDetails,
      damageRepairs: detailedDamageRepairs,
      subtotal: calculatedSubtotal,
      tax: parseFloat(tax || 0),
      discount: parseFloat(discount || 0),
      totalAmount: calculatedTotal,
      paymentMethod,
      // FIX: Use actualRepairedPartNames
      autoRemoveDamages: autoRemoveDamages || false,
      repairedPartNames: actualRepairedPartNames,
      // Infor user registration
      inforUser: {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userRole: user.role,
        department: department || 'maintenance',
        registeredAt: new Date(),
        entreprise: user.entreprise,
        logoEntreprise: user.logoEntreprise || '',
        country: user.country || '',
        city: user.city || '',
        phone: user.number || ''
      },
      agencyInfo: {
        entreprise: user.entreprise,
        logoEntreprise: user.logoEntreprise || '',
        country: user.country || '',
        city: user.city || '',
        phone: user.number || '',
        email: user.email
      },
      updatedBy: [{
        userId: user._id,
        userName: user.name,
        action: 'created',
        changes: {
          factureNumber,
          amount: parseFloat(amount),
          status: 'pending',
          autoRemoveDamages: autoRemoveDamages || false,
          repairedPartsCount: actualRepairedPartNames.length
        },
        date: new Date(),
        entreprise: user.entreprise,
        logoEntreprise: user.logoEntreprise || ''
      }],
      createdBy: req.user.id,
      createdByInfo: {
        entreprise: user.entreprise,
        logoEntreprise: user.logoEntreprise || '',
        country: user.country || '',
        city: user.city || '',
        phone: user.number || '',
        email: user.email
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: notes || '',
      isSmartCar: vehicleType === 'smart'
    };

    const facture = await Facture.create(factureData);

    // FIXED: Use 'vidange' instead of 'maintenance' for Vehicle model enum
    const maintenanceTypeValue = 'vidange'; // Use allowed enum value
    
    // Update vehicle maintenance status
    if (vehicleType === 'smart') {
      // Update SmartCar
      if (vehicle.maintenanceHistory) {
        vehicle.maintenanceHistory.push({
          maintenanceType: maintenanceTypeValue, // Use consistent value
          cost: parseFloat(amount),
          notes: `Maintenance at ${garageName} - Facture: ${factureNumber} (Registered by: ${user.name})`,
          performedBy: user.name || 'Technicien',
          date: new Date(),
          performedAtKm: vehicleData.currentKilometer,
          registeredBy: user._id,
          factureId: facture._id,
          autoRemoveDamages: autoRemoveDamages || false,
          repairedParts: actualRepairedPartNames
        });
      }
      vehicle.lastMaintenanceKm = vehicleData.currentKilometer;
      vehicle.nextMaintenanceKm = vehicleData.currentKilometer + 10000;
      await vehicle.save();
    } else {
      // Update regular Vehicle - FIXED: Use allowed enum value
      if (vehicle.maintenanceHistory) {
        vehicle.maintenanceHistory.push({
          km: vehicleData.currentKilometer,
          date: new Date(),
          type: maintenanceTypeValue, // FIXED: Changed from 'maintenance' to 'vidange'
          notes: `Maintenance at ${garageName} - Facture: ${factureNumber} (Registered by: ${user.name})`,
          cost: parseFloat(amount),
          doneBy: user.name || 'Technicien',
          registeredBy: user._id,
          factureId: facture._id,
          nextMaintenanceKm: vehicleData.currentKilometer + 10000,
          autoRemoveDamages: autoRemoveDamages || false,
          repairedParts: actualRepairedPartNames
        });
      }
      vehicle.lastMaintenanceKm = vehicleData.currentKilometer;
      vehicle.nextMaintenanceKm = vehicleData.currentKilometer + 10000;
      vehicle.maintenanceStatus = 'ok';
      await vehicle.save();
    }

    // Auto-remove damages from vehicle database if enabled
    if (autoRemoveDamages && actualRepairedPartNames.length > 0) {
      try {
        await exports.markDamagesAsRepaired(vehicleId, vehicleType, actualRepairedPartNames, user);
      } catch (damageError) {
        console.error('Error auto-removing damages:', damageError);
        // Don't fail the facture creation if damage removal fails
      }
    }

    res.status(201).json({
      success: true,
      data: { 
        facture,
        vehicle: {
          id: vehicle._id,
          name: vehicleData.name,
          matricule: vehicleData.matricule,
          type: vehicleType
        },
        registeredBy: {
          id: user._id,
          name: user.name,
          role: user.role,
          department: department || 'maintenance',
          entreprise: user.entreprise,
          logoEntreprise: user.logoEntreprise,
          phone: user.number
        },
        maintenanceParts: detailedMaintenanceDetails.partsReplaced,
        damageRepairs: detailedDamageRepairs,
        autoRemoveDamages: autoRemoveDamages,
        damagesRemoved: autoRemoveDamages ? actualRepairedPartNames.length : 0
      },
      message: 'Facture created successfully with user registration'
    });
  } catch (error) {
    console.error('Create facture error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Facture number already exists'
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages,
        details: error.errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error creating facture',
      error: error.message
    });
  }
};

// @desc    Mark damages as repaired (used internally by createFacture)
// @access  Private
exports.markDamagesAsRepaired = async (vehicleId, vehicleType, repairedPartNames, user) => {
  try {
    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    // Initialize damages array if it doesn't exist
    if (!vehicle.dommages) {
      vehicle.dommages = [];
    }

    console.log('DEBUG - Auto-remove damages:', {
      vehicleId,
      vehicleType,
      repairedPartNames,
      dommagesInDB: vehicle.dommages
    });

    let repairedCount = 0;
    const originalCount = vehicle.dommages.length;
    
    // Create updated damages array
    const updatedDamages = [];
    
    for (const damage of vehicle.dommages) {
      if (typeof damage === 'string') {
        const normalizedDamage = damage.toLowerCase().trim();
        let shouldRemove = false;
        
        for (const partName of repairedPartNames) {
          const normalizedPart = partName.toLowerCase().trim();
          
          // Use flexible matching
          if (normalizedDamage.includes(normalizedPart) || 
              normalizedPart.includes(normalizedDamage)) {
            console.log(`Auto-removing: "${damage}" matches "${partName}"`);
            shouldRemove = true;
            repairedCount++;
            break;
          }
        }
        
        if (!shouldRemove) {
          updatedDamages.push(damage);
        }
      }
      // Handle object damages (for backward compatibility)
      else if (typeof damage === 'object' && damage !== null && damage.description) {
        const normalizedDamage = damage.description.toLowerCase().trim();
        let shouldMarkAsRepaired = false;
        
        for (const partName of repairedPartNames) {
          const normalizedPart = partName.toLowerCase().trim();
          
          if (normalizedDamage.includes(normalizedPart) || 
              normalizedPart.includes(normalizedDamage)) {
            shouldMarkAsRepaired = true;
            break;
          }
        }
        
        if (shouldMarkAsRepaired) {
          damage.repaired = true;
          damage.repairedAt = new Date();
          damage.repairedBy = user._id;
          damage.repairedByName = user.name;
          repairedCount++;
        }
        updatedDamages.push(damage);
      } else {
        updatedDamages.push(damage);
      }
    }
    
    vehicle.dommages = updatedDamages;
    
    console.log('DEBUG - Auto-remove results:', {
      removedCount: repairedCount,
      remaining: vehicle.dommages.length
    });

    await vehicle.save();
    
    return {
      success: true,
      repairedCount,
      message: `Removed ${repairedCount} damages from vehicle database`
    };
  } catch (error) {
    console.error('Mark damages as repaired error:', error);
    throw error;
  }
};

// @desc    Mark specific damages as repaired
// @route   PUT /api/vehicles/:vehicleId/damages/mark-repaired
// @access  Private
exports.markDamagesRepaired = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { damageDescriptions, vehicleType = 'regular' } = req.body;

    if (!damageDescriptions || !Array.isArray(damageDescriptions)) {
      return res.status(400).json({
        success: false,
        message: 'Damage descriptions array is required'
      });
    }

    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle belongs to user (unless admin)
    const userRole = req.user.role;
    const userId = req.user.id;
    if (userRole !== 'admin' && vehicle.partnerId && vehicle.partnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this vehicle'
      });
    }

    // Initialize damages array if it doesn't exist
    if (!vehicle.dommages) {
      vehicle.dommages = [];
    }

    console.log('DEBUG - Before removal:', {
      vehicleId,
      vehicleType,
      damageDescriptions,
      dommagesInDB: vehicle.dommages,
      dommagesCount: vehicle.dommages.length
    });

    let repairedCount = 0;
    const originalCount = vehicle.dommages.length;
    
    // Create a copy of the original damages to modify
    const updatedDamages = [];
    
    for (const damage of vehicle.dommages) {
      if (typeof damage === 'string') {
        // Normalize the damage string from database
        const normalizedDamage = damage.toLowerCase().trim();
        let shouldRemove = false;
        
        // Check if ANY part of the damage description matches
        for (const partName of damageDescriptions) {
          const normalizedPart = partName.toLowerCase().trim();
          
          // Multiple matching strategies:
          // 1. Check if damage contains the part name
          // 2. Check if part name contains damage keywords
          // 3. Check for common variations
          
          if (normalizedDamage.includes(normalizedPart) || 
              normalizedPart.includes(normalizedDamage) ||
              normalizedDamage.includes(normalizedPart.replace('-', ' ')) ||
              normalizedPart.includes(normalizedDamage.replace('-', ' '))) {
            
            console.log(`DEBUG - Match found: "${damage}" matches part: "${partName}"`);
            shouldRemove = true;
            repairedCount++;
            break;
          }
        }
        
        if (!shouldRemove) {
          updatedDamages.push(damage);
        }
      } 
      // Handle object damages (for backward compatibility)
      else if (typeof damage === 'object' && damage !== null && damage.description) {
        const normalizedDamage = damage.description.toLowerCase().trim();
        let shouldMarkAsRepaired = false;
        
        for (const partName of damageDescriptions) {
          const normalizedPart = partName.toLowerCase().trim();
          
          if (normalizedDamage.includes(normalizedPart) || 
              normalizedPart.includes(normalizedDamage)) {
            shouldMarkAsRepaired = true;
            break;
          }
        }
        
        if (shouldMarkAsRepaired) {
          damage.repaired = true;
          damage.repairedAt = new Date();
          damage.repairedBy = req.user.id;
          damage.repairedByName = req.user.name;
          repairedCount++;
        }
        updatedDamages.push(damage);
      } else {
        // Keep other types as is
        updatedDamages.push(damage);
      }
    }
    
    // Update the vehicle's damages array
    vehicle.dommages = updatedDamages;

    console.log('DEBUG - After removal:', {
      originalCount,
      repairedCount,
      remainingDamages: vehicle.dommages.length,
      updatedDamages: vehicle.dommages
    });

    await vehicle.save();

    res.status(200).json({
      success: true,
      data: {
        vehicleId,
        vehicleType,
        originalDamages: originalCount,
        remainingDamages: vehicle.dommages.length,
        repairedCount,
        damagesRemoved: originalCount - vehicle.dommages.length
      },
      message: `Successfully removed ${repairedCount} damages from vehicle database`
    });
  } catch (error) {
    console.error('Mark damages repaired error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking damages as repaired',
      error: error.message
    });
  }
};

// @desc    Get vehicle damages
// @route   GET /api/vehicles/:vehicleId/damages
// @access  Private
exports.getVehicleDamages = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { vehicleType = 'regular' } = req.query;

    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle belongs to user (unless admin)
    const userRole = req.user.role;
    const userId = req.user.id;
    if (userRole !== 'admin' && vehicle.partnerId && vehicle.partnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to view this vehicle'
      });
    }

    // Process damages - in Vehicle model, dommages is array of strings
    const damages = vehicle.dommages || [];
    
    // Convert string damages to object format for frontend
    const processedDamages = damages.map((desc, index) => ({
      id: `damage-${index}`,
      description: desc,
      type: 'string',
      date: null,
      repaired: false
    }));

    res.status(200).json({
      success: true,
      data: {
        vehicleId,
        vehicleType,
        totalDamages: damages.length,
        unrepairedDamages: damages.length, // All string damages are considered unrepaired
        damages: processedDamages
      }
    });
  } catch (error) {
    console.error('Get vehicle damages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle damages',
      error: error.message
    });
  }
};

// @desc    Update facture with infor user tracking
// @route   PUT /api/factures/:id
// @access  Private
exports.updateFacture = async (req, res) => {
  try {
    const {
      garageName,
      phoneNumber,
      date,
      amount,
      status,
      description,
      maintenanceDetails,
      damageRepairs,
      subtotal,
      tax,
      discount,
      totalAmount,
      paymentMethod,
      notes,
      department,
      autoRemoveDamages,
      repairedPartNames = []
    } = req.body;

    const facture = await Facture.findById(req.params.id);

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    // Check if user has permission to update this facture
    const userRole = req.user.role;
    const userId = req.user.id;
    
    // Get vehicle to check ownership
    let vehicle = null;
    if (facture.isSmartCar) {
      vehicle = await SmartCar.findById(facture.vehicleId).select('partnerId');
    } else {
      vehicle = await Vehicle.findById(facture.vehicleId).select('partnerId');
    }
    
    if (userRole !== 'admin' && vehicle && vehicle.partnerId) {
      if (vehicle.partnerId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to update this facture'
        });
      }
    }

    // Get user information
    const user = await User.findById(req.user.id).select('name email role logoEntreprise entreprise');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Track changes before updating
    const changes = {};
    if (garageName !== undefined && garageName !== facture.garageName) changes.garageName = garageName;
    if (amount !== undefined && parseFloat(amount) !== facture.amount) changes.amount = parseFloat(amount);
    if (status !== undefined && status !== facture.status) changes.status = status;
    if (totalAmount !== undefined && parseFloat(totalAmount) !== facture.totalAmount) changes.totalAmount = parseFloat(totalAmount);
    if (paymentMethod !== undefined && paymentMethod !== facture.paymentMethod) changes.paymentMethod = paymentMethod;
    if (autoRemoveDamages !== undefined && autoRemoveDamages !== facture.autoRemoveDamages) changes.autoRemoveDamages = autoRemoveDamages;

    // Update fields if provided
    if (garageName !== undefined) facture.garageName = garageName;
    if (phoneNumber !== undefined) facture.phoneNumber = phoneNumber;
    if (date !== undefined) facture.date = date;
    if (amount !== undefined) facture.amount = parseFloat(amount);
    if (status !== undefined) facture.status = status;
    if (description !== undefined) facture.description = description;
    if (maintenanceDetails !== undefined) facture.maintenanceDetails = maintenanceDetails;
    if (damageRepairs !== undefined) facture.damageRepairs = damageRepairs;
    if (subtotal !== undefined) facture.subtotal = subtotal;
    if (tax !== undefined) facture.tax = parseFloat(tax || 0);
    if (discount !== undefined) facture.discount = parseFloat(discount || 0);
    if (totalAmount !== undefined) facture.totalAmount = parseFloat(totalAmount);
    if (paymentMethod !== undefined) facture.paymentMethod = paymentMethod;
    if (notes !== undefined) facture.notes = notes;
    if (autoRemoveDamages !== undefined) facture.autoRemoveDamages = autoRemoveDamages;
    if (repairedPartNames !== undefined && Array.isArray(repairedPartNames)) {
      facture.repairedPartNames = repairedPartNames;
    }
    
    // Update infor user department if provided
    if (department !== undefined && facture.inforUser) {
      facture.inforUser.department = department;
    }
    
    // Add to update history
    if (Object.keys(changes).length > 0) {
      facture.updatedBy.push({
        userId: user._id,
        userName: user.name,
        action: 'updated',
        changes: changes,
        date: new Date()
      });
    }
    
    facture.updatedAt = new Date();

    await facture.save();

    // If autoRemoveDamages is enabled and we have repaired part names, update damages
    if (facture.autoRemoveDamages && facture.repairedPartNames && facture.repairedPartNames.length > 0) {
      try {
        const vehicleType = facture.isSmartCar ? 'smart' : 'regular';
        await exports.markDamagesAsRepaired(facture.vehicleId, vehicleType, facture.repairedPartNames, user);
      } catch (damageError) {
        console.error('Error auto-removing damages during update:', damageError);
      }
    }

    res.status(200).json({
      success: true,
      data: { 
        facture,
        updatedBy: {
          id: user._id,
          name: user.name,
          role: user.role,
          entreprise: user.entreprise,
          changes: changes
        }
      },
      message: 'Facture updated successfully'
    });
  } catch (error) {
    console.error('Update facture error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating facture',
      error: error.message
    });
  }
};

// @desc    Mark facture as paid with infor user tracking
// @route   PUT /api/factures/:id/pay
// @access  Private
exports.markAsPaid = async (req, res) => {
  try {
    const { paymentMethod, paymentDate, paymentReference, department } = req.body;

    const facture = await Facture.findById(req.params.id);

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    // Check if user has permission to mark this facture as paid
    const userRole = req.user.role;
    const userId = req.user.id;
    
    // Get vehicle to check ownership
    let vehicle = null;
    if (facture.isSmartCar) {
      vehicle = await SmartCar.findById(facture.vehicleId).select('partnerId');
    } else {
      vehicle = await Vehicle.findById(facture.vehicleId).select('partnerId');
    }
    
    if (userRole !== 'admin' && vehicle && vehicle.partnerId) {
      if (vehicle.partnerId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to update this facture'
        });
      }
    }

    if (facture.status === 'paid') {
      return res.status(400).json({
        success: false,
        message: 'Facture is already paid'
      });
    }

    // Get user information with logoEntreprise
    const user = await User.findById(req.user.id).select('name email role logoEntreprise entreprise');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const oldStatus = facture.status;
    facture.status = 'paid';
    facture.paymentMethod = paymentMethod || facture.paymentMethod;
    facture.paymentDate = paymentDate || Date.now();
    facture.paymentReference = paymentReference;
    
    // Update infor user department if provided
    if (department && facture.inforUser) {
      facture.inforUser.department = department;
    }
    
    // Add to update history
    facture.updatedBy.push({
      userId: user._id,
      userName: user.name,
      action: 'marked_as_paid',
      changes: {
        status: { from: oldStatus, to: 'paid' },
        paymentMethod: paymentMethod || facture.paymentMethod,
        paymentDate: paymentDate || Date.now()
      },
      date: new Date()
    });
    
    facture.updatedAt = Date.now();

    await facture.save();

    res.status(200).json({
      success: true,
      data: { 
        facture,
        processedBy: {
          id: user._id,
          name: user.name,
          role: user.role,
          entreprise: user.entreprise
        }
      },
      message: 'Facture marked as paid successfully'
    });
  } catch (error) {
    console.error('Mark as paid error:', error);
    res.status(500).json({
      success: false,
      message: 'Error marking facture as paid',
      error: error.message
    });
  }
};

// @desc    Get factures by infor user
// @route   GET /api/factures/infor-user/:userId
// @access  Private
exports.getFacturesByInforUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      status,
      startDate,
      endDate,
      page = 1,
      limit = 20
    } = req.query;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Build query
    let query = { 
      isDeleted: false,
      'inforUser.userId': userId 
    };

    // Optional filters
    if (status && status !== 'all') {
      query.status = status;
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query
    const factures = await Facture.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('createdBy', 'name email role')
      .populate('updatedBy.userId', 'name email');

    // Total count
    const total = await Facture.countDocuments(query);

    // Statistics
    const stats = await Facture.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        factures,
        userInfo: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          entreprise: user.entreprise,
          logoEntreprise: user.logoEntreprise
        },
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          limit: parseInt(limit)
        },
        stats: stats.reduce((acc, stat) => ({
          ...acc,
          [stat._id]: {
            count: stat.count,
            totalAmount: stat.totalAmount
          }
        }), {})
      }
    });
  } catch (error) {
    console.error('Get factures by infor user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching factures by infor user',
      error: error.message
    });
  }
};

// @desc    Add attachment to facture
// @route   POST /api/factures/:id/attachments
// @access  Private
exports.addAttachment = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    const { fileName, fileUrl, fileType } = req.body;

    if (!fileName || !fileUrl) {
      return res.status(400).json({
        success: false,
        message: 'File name and URL are required'
      });
    }

    // Add attachment
    facture.attachments.push({
      fileName,
      fileUrl,
      fileType: fileType || 'document',
      uploadedAt: new Date(),
      uploadedBy: req.user.id
    });

    // Add to history
    const user = await User.findById(req.user.id);
    if (user) {
      facture.updatedBy.push({
        userId: user._id,
        userName: user.name,
        action: 'added_attachment',
        changes: {
          fileName: fileName,
          fileType: fileType || 'document'
        },
        date: new Date()
      });
    }

    await facture.save();

    res.status(200).json({
      success: true,
      data: { facture },
      message: 'Attachment added successfully'
    });
  } catch (error) {
    console.error('Add attachment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding attachment',
      error: error.message
    });
  }
};

// @desc    Get facture audit trail
// @route   GET /api/factures/:id/audit
// @access  Private
exports.getFactureAuditTrail = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
      .select('factureNumber updatedBy inforUser createdBy createdAt autoRemoveDamages repairedPartNames')
      .populate('updatedBy.userId', 'name email role logoEntreprise entreprise')
      .populate('inforUser.userId', 'name email role logoEntreprise entreprise')
      .populate('createdBy', 'name email role logoEntreprise entreprise');

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    // Check permissions
    const userRole = req.user.role;
    const userId = req.user.id;
    
    if (userRole !== 'admin') {
      // Get vehicle to check ownership
      let vehicle = null;
      if (facture.isSmartCar) {
        vehicle = await SmartCar.findById(facture.vehicleId).select('partnerId');
      } else {
        vehicle = await Vehicle.findById(facture.vehicleId).select('partnerId');
      }
      
      if (vehicle && vehicle.partnerId && vehicle.partnerId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view audit trail for this facture'
        });
      }
    }

    // Format audit trail
    const auditTrail = [
      {
        action: 'created',
        user: facture.createdBy,
        date: facture.createdAt,
        details: `Facture created with number: ${facture.factureNumber}`,
        entreprise: facture.createdBy?.entreprise,
        logoEntreprise: facture.createdBy?.logoEntreprise,
        autoRemoveDamages: facture.autoRemoveDamages,
        repairedPartsCount: facture.repairedPartNames?.length || 0
      },
      {
        action: 'registered_by',
        user: facture.inforUser,
        date: facture.inforUser.registeredAt,
        details: `Registered by: ${facture.inforUser.userName} (${facture.inforUser.department} department)`,
        entreprise: facture.inforUser.entreprise,
        logoEntreprise: facture.inforUser.logoEntreprise
      },
      ...facture.updatedBy.map(update => ({
        action: update.action,
        user: update.userId,
        date: update.date,
        changes: update.changes,
        details: `${update.userName} ${update.action} the facture`,
        entreprise: update.userId?.entreprise,
        logoEntreprise: update.userId?.logoEntreprise
      }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      success: true,
      data: {
        factureNumber: facture.factureNumber,
        auditTrail,
        totalActions: auditTrail.length,
        autoRemoveDamages: facture.autoRemoveDamages,
        repairedPartsCount: facture.repairedPartNames?.length || 0
      }
    });
  } catch (error) {
    console.error('Get facture audit trail error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching audit trail',
      error: error.message
    });
  }
};

// @desc    Get all factures for both vehicle types - UPDATED with infor user info
// @route   GET /api/factures
// @access  Private
exports.getFactures = async (req, res) => {
  try {
    const {
      status,
      vehicleType,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 20,
      showAll = 'false',
      department,
      registeredBy,
      hasDamages = 'all'
    } = req.query;

    const userRole = req.user.role;
    const userId = req.user.id;

    // Base query
    let query = { isDeleted: false };

    // If not admin and not showing all, filter by user's vehicles
    if (userRole !== 'admin' && showAll === 'false') {
      const userVehicleIds = [];
      
      // Get regular vehicles for this user
      const userRegularVehicles = await Vehicle.find({ 
        partnerId: userId,
        isDeleted: { $ne: true }
      }).select('_id');
      
      // Get smart cars for this user
      const userSmartCars = await SmartCar.find({ 
        partnerId: userId,
        status: { $in: ['active', 'available'] }
      }).select('_id');
      
      // Combine all vehicle IDs
      userVehicleIds.push(...userRegularVehicles.map(v => v._id));
      userVehicleIds.push(...userSmartCars.map(s => s._id));
      
      // If user has no vehicles, return empty result
      if (userVehicleIds.length === 0) {
        return res.status(200).json({
          success: true,
          data: {
            factures: [],
            pagination: {
              total: 0,
              page: parseInt(page),
              pages: 0,
              limit: parseInt(limit)
            },
            stats: {},
            vehicleTypeStats: {},
            inforUserStats: {}
          }
        });
      }
      
      // Filter factures by user's vehicle IDs
      query.vehicleId = { $in: userVehicleIds };
    }

    // Filter by status
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by vehicle type
    if (vehicleType && vehicleType !== 'all') {
      if (vehicleType === 'smart') {
        query.isSmartCar = true;
      } else if (vehicleType === 'regular') {
        query.isSmartCar = false;
      } else {
        query.vehicleType = vehicleType;
      }
    }

    // Filter by department
    if (department && department !== 'all') {
      query['inforUser.department'] = department;
    }

    // Filter by registered user
    if (registeredBy && registeredBy !== 'all') {
      query['inforUser.userId'] = registeredBy;
    }

    // Filter by damages
    if (hasDamages === 'with_damages') {
      query['repairedPartNames.0'] = { $exists: true };
    } else if (hasDamages === 'auto_removed') {
      query.autoRemoveDamages = true;
    }

    // Date range filter
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // Search functionality
    if (search) {
      query.$or = [
        { factureNumber: { $regex: search, $options: 'i' } },
        { vehicleName: { $regex: search, $options: 'i' } },
        { matricule: { $regex: search, $options: 'i' } },
        { garageName: { $regex: search, $options: 'i' } },
        { 'inforUser.userName': { $regex: search, $options: 'i' } },
        { 'inforUser.entreprise': { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination and population
    const factures = await Facture.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('inforUser.userId', 'name email role logoEntreprise entreprise country city number')
      .populate('createdBy', 'name email logoEntreprise entreprise');

    // Get total count for pagination
    const total = await Facture.countDocuments(query);

    // Calculate statistics by status
    const stats = await Facture.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    // Get vehicle type statistics
    const vehicleTypeStats = await Facture.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$vehicleType',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    // Get infor user statistics
    const inforUserStats = await Facture.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$inforUser.userId',
          userName: { $first: '$inforUser.userName' },
          entreprise: { $first: '$inforUser.entreprise' },
          logoEntreprise: { $first: '$inforUser.logoEntreprise' },
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    // Get damage statistics
    const damageStats = await Facture.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$autoRemoveDamages',
          count: { $sum: 1 },
          totalRepairedParts: { $sum: { $size: { $ifNull: ['$repairedPartNames', []] } } }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        factures,
        pagination: {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
          limit: parseInt(limit)
        },
        stats: stats.reduce((acc, stat) => ({
          ...acc,
          [stat._id]: {
            count: stat.count,
            totalAmount: stat.totalAmount
          }
        }), {}),
        vehicleTypeStats: vehicleTypeStats.reduce((acc, stat) => ({
          ...acc,
          [stat._id || 'unknown']: {
            count: stat.count,
            totalAmount: stat.totalAmount
          }
        }), {}),
        inforUserStats: inforUserStats.reduce((acc, stat) => ({
          ...acc,
          [stat._id ? stat._id.toString() : 'unknown']: {
            userName: stat.userName,
            entreprise: stat.entreprise,
            logoEntreprise: stat.logoEntreprise,
            count: stat.count,
            totalAmount: stat.totalAmount
          }
        }), {}),
        damageStats: {
          autoRemoveEnabled: damageStats.find(s => s._id === true)?.count || 0,
          autoRemoveDisabled: damageStats.find(s => s._id === false)?.count || 0,
          totalRepairedParts: damageStats.reduce((sum, stat) => sum + (stat.totalRepairedParts || 0), 0)
        }
      }
    });
  } catch (error) {
    console.error('Get factures error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching factures',
      error: error.message
    });
  }
};

// @desc    Get single facture for printing with logo
// @route   GET /api/factures/:id/print
// @access  Private
exports.getFactureForPrint = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find facture by ID with populated user data
    const facture = await Facture.findById(id)
      .populate({
        path: 'inforUser.userId',
        select: 'name email role logoEntreprise entreprise country city number siret vatNumber address'
      })
      .populate({
        path: 'createdBy',
        select: 'name email logoEntreprise entreprise country city number siret vatNumber address'
      })
      .populate({
        path: 'updatedBy.userId',
        select: 'name email logoEntreprise entreprise'
      })
      .populate({
        path: 'attachments.uploadedBy',
        select: 'name email'
      });

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    // Get vehicle information
    let vehicle = null;
    let vehicleData = {};
    
    try {
      if (facture.isSmartCar) {
        vehicle = await SmartCar.findById(facture.vehicleId)
          .select('nomVehicule numeroMatricule typeVehicule currentKilometer status partnerId dommages maintenanceHistory lastMaintenanceKm nextMaintenanceKm kmDepart kmRetour distanceTraveled');
        
        if (vehicle) {
          vehicleData = {
            name: vehicle.nomVehicule,
            matricule: vehicle.numeroMatricule,
            type: vehicle.typeVehicule,
            currentKilometer: vehicle.currentKilometer || 0,
            status: vehicle.status,
            isSmartCar: true,
            damages: vehicle.dommages || [],
            maintenanceHistory: vehicle.maintenanceHistory || [],
            lastMaintenanceKm: vehicle.lastMaintenanceKm || 0,
            nextMaintenanceKm: vehicle.nextMaintenanceKm || 0,
            kmDepart: vehicle.kmDepart || 0,
            kmRetour: vehicle.kmRetour || 0,
            distanceTraveled: vehicle.distanceTraveled || 0
          };
        }
      } else {
        vehicle = await Vehicle.findById(facture.vehicleId)
          .select('name matricule type currentKilometer maintenanceStatus partnerId dommages maintenanceHistory lastMaintenanceKm nextMaintenanceKm totalDistance kmDepart kmRetour');
        
        if (vehicle) {
          vehicleData = {
            name: vehicle.name,
            matricule: vehicle.matricule,
            type: vehicle.type,
            currentKilometer: vehicle.currentKilometer || 0,
            maintenanceStatus: vehicle.maintenanceStatus,
            isSmartCar: false,
            damages: vehicle.dommages || [],
            maintenanceHistory: vehicle.maintenanceHistory || [],
            lastMaintenanceKm: vehicle.lastMaintenanceKm || 0,
            nextMaintenanceKm: vehicle.nextMaintenanceKm || 0,
            totalDistance: vehicle.totalDistance || 0,
            kmDepart: vehicle.kmDepart || 0,
            kmRetour: vehicle.kmRetour || 0
          };
        }
      }
    } catch (vehicleError) {
      console.error('Error fetching vehicle data:', vehicleError);
      // Use facture data as fallback
      vehicleData = {
        name: facture.vehicleName,
        matricule: facture.matricule,
        type: facture.vehicleType,
        currentKilometer: facture.kmEnd || 0,
        isSmartCar: facture.isSmartCar || false,
        damages: []
      };
    }

    // Check if user has permission to view this facture
    const userRole = req.user.role;
    const userId = req.user.id;
    
    if (userRole !== 'admin' && vehicle && vehicle.partnerId) {
      if (vehicle.partnerId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view this facture'
        });
      }
    }

    // Get user who created the facture
    let createdByUser = null;
    if (facture.createdBy && typeof facture.createdBy === 'object') {
      createdByUser = facture.createdBy;
    } else if (facture.createdBy) {
      try {
        createdByUser = await User.findById(facture.createdBy)
          .select('name email role logoEntreprise entreprise country city number siret vatNumber address');
      } catch (error) {
        console.error('Error fetching createdBy user:', error);
      }
    }

    // Get inforUser details
    let inforUserDetails = facture.inforUser || {};
    if (facture.inforUser && facture.inforUser.userId && typeof facture.inforUser.userId === 'object') {
      inforUserDetails = {
        ...facture.inforUser.toObject(),
        ...facture.inforUser.userId.toObject()
      };
    }

    // Prepare comprehensive data for printing
    const printData = {
      // Facture basic information
      facture: {
        ...facture.toObject(),
        date: facture.date ? new Date(facture.date).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }) : 'N/A',
        paymentDate: facture.paymentDate ? new Date(facture.paymentDate).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }) : null,
        createdAt: facture.createdAt ? new Date(facture.createdAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : 'N/A',
        updatedAt: facture.updatedAt ? new Date(facture.updatedAt).toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }) : 'N/A',
      },
      
      // Vehicle information
      vehicle: vehicleData,
      
      // Agency/Company information - prioritize inforUser data
      agencyInfo: {
        entreprise: inforUserDetails.entreprise || 
                   facture.agencyInfo?.entreprise || 
                   (createdByUser?.entreprise) || 
                   '',
        logoEntreprise: inforUserDetails.logoEntreprise || 
                       facture.agencyInfo?.logoEntreprise || 
                       (createdByUser?.logoEntreprise) || 
                       '',
        country: inforUserDetails.country || 
                facture.agencyInfo?.country || 
                (createdByUser?.country) || 
                '',
        city: inforUserDetails.city || 
              facture.agencyInfo?.city || 
              (createdByUser?.city) || 
              '',
        address: inforUserDetails.address || 
                (createdByUser?.address) || 
                '',
        phone: inforUserDetails.phone || 
               facture.agencyInfo?.phone || 
               (createdByUser?.number) || 
               facture.phoneNumber || 
               'N/A',
        email: inforUserDetails.userEmail || 
               facture.agencyInfo?.email || 
               (createdByUser?.email) || 
               '',
        siret: inforUserDetails.siret || 
               (createdByUser?.siret) || 
               '',
        vatNumber: inforUserDetails.vatNumber || 
                   (createdByUser?.vatNumber) || 
                   ''
      },
      
      // Garage information
      garageInfo: {
        name: facture.garageName || 'N/A',
        phone: facture.phoneNumber || 'N/A',
        address: facture.garageAddress || '',
        email: facture.garageEmail || ''
      },
      
      // Financial information with formatted amounts
      financialInfo: {
        amount: facture.amount || 0,
        tax: facture.tax || 0,
        discount: facture.discount || 0,
        subtotal: facture.subtotal || facture.amount || 0,
        totalAmount: facture.totalAmount || facture.amount || 0,
        amountFormatted: `${(facture.amount || 0).toFixed(2)} MAD`,
        taxFormatted: `${(facture.tax || 0).toFixed(2)} MAD`,
        discountFormatted: `${(facture.discount || 0).toFixed(2)} MAD`,
        subtotalFormatted: `${(facture.subtotal || facture.amount || 0).toFixed(2)} MAD`,
        totalAmountFormatted: `${(facture.totalAmount || facture.amount || 0).toFixed(2)} MAD`,
        paymentMethod: facture.paymentMethod || 'cash',
        status: facture.status || 'pending'
      },
      
      // Maintenance details
      maintenanceDetails: facture.maintenanceDetails || {
        startDate: facture.date || new Date(),
        endDate: facture.date || new Date(),
        partsReplaced: [],
        laborHours: 0,
        laborRate: 0,
        laborTotal: 0
      },
      
      // Damage repairs
      damageRepairs: facture.damageRepairs || [],
      
      // Damage information
      damageInfo: {
        autoRemoveEnabled: facture.autoRemoveDamages || false,
        repairedPartsCount: facture.repairedPartNames?.length || 0,
        totalDamages: vehicleData.damages?.length || 0,
        repairedPartNames: facture.repairedPartNames || []
      },
      
      // User who registered the facture
      registeredBy: {
        userId: inforUserDetails.userId || inforUserDetails._id || facture.createdBy,
        userName: inforUserDetails.userName || inforUserDetails.name || 'System',
        userEmail: inforUserDetails.userEmail || inforUserDetails.email || '',
        userRole: inforUserDetails.userRole || inforUserDetails.role || 'user',
        department: inforUserDetails.department || 'maintenance',
        registeredAt: inforUserDetails.registeredAt ? 
                     new Date(inforUserDetails.registeredAt).toLocaleDateString('fr-FR', {
                       day: '2-digit',
                       month: 'long',
                       year: 'numeric'
                     }) : 'N/A',
        entreprise: inforUserDetails.entreprise || '',
        logoEntreprise: inforUserDetails.logoEntreprise || '',
        phone: inforUserDetails.phone || '',
        country: inforUserDetails.country || '',
        city: inforUserDetails.city || '',
        address: inforUserDetails.address || '',
        siret: inforUserDetails.siret || '',
        vatNumber: inforUserDetails.vatNumber || ''
      },
      
      // Audit trail summary
      auditInfo: {
        createdBy: facture.createdBy?._id || facture.createdBy,
        createdByName: createdByUser?.name || 'Unknown',
        createdByEmail: createdByUser?.email || '',
        createdAt: facture.createdAt ? new Date(facture.createdAt).toLocaleDateString('fr-FR') : 'N/A',
        updatesCount: facture.updatedBy?.length || 0,
        lastUpdated: facture.updatedAt ? new Date(facture.updatedAt).toLocaleDateString('fr-FR') : 'N/A',
        lastUpdatedBy: facture.updatedBy && facture.updatedBy.length > 0 ? 
                      facture.updatedBy[facture.updatedBy.length - 1].userName : 'N/A'
      },
      
      // Additional information
      description: facture.description || '',
      notes: facture.notes || '',
      attachments: facture.attachments || [],
      isSmartCar: facture.isSmartCar || false,
      vehicleModel: facture.vehicleModel || 'Vehicle',
      
      // Current print information
      printDate: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
      printTime: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    res.status(200).json({
      success: true,
      data: printData,
      message: 'Facture data retrieved for printing with complete information'
    });
  } catch (error) {
    console.error('Get facture for print error:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid facture ID format'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error fetching facture for printing',
      error: error.message
    });
  }
};

// @desc    Get single facture - UPDATED with infor user info
// @route   GET /api/factures/:id
// @access  Private
exports.getFacture = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id)
      .populate('inforUser.userId', 'name email role logoEntreprise entreprise country city number')
      .populate('createdBy', 'name email logoEntreprise entreprise')
      .populate('updatedBy.userId', 'name email logoEntreprise entreprise')
      .populate('attachments.uploadedBy', 'name email logoEntreprise entreprise');

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    // Get vehicle information
    let vehicle = null;
    if (facture.isSmartCar) {
      vehicle = await SmartCar.findById(facture.vehicleId)
        .select('nomVehicule numeroMatricule typeVehicule currentKilometer status partnerId');
    } else {
      vehicle = await Vehicle.findById(facture.vehicleId)
        .select('name matricule type currentKilometer maintenanceStatus partnerId');
    }

    // Check if user has permission to view this facture
    const userRole = req.user.role;
    const userId = req.user.id;
    
    if (userRole !== 'admin' && vehicle && vehicle.partnerId) {
      if (vehicle.partnerId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to view this facture'
        });
      }
    }

    res.status(200).json({
      success: true,
      data: { 
        facture,
        vehicle: vehicle || { 
          name: facture.vehicleName,
          matricule: facture.matricule,
          type: facture.vehicleType
        },
        registeredBy: {
          ...facture.inforUser.toObject(),
          logoEntreprise: facture.inforUser?.userId?.logoEntreprise || facture.inforUser?.logoEntreprise || '',
          entreprise: facture.inforUser?.userId?.entreprise || facture.inforUser?.entreprise || ''
        }
      }
    });
  } catch (error) {
    console.error('Get facture error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching facture',
      error: error.message
    });
  }
};

// @desc    Delete facture (soft delete) - UPDATED with user tracking
// @route   DELETE /api/factures/:id
// @access  Private
exports.deleteFacture = async (req, res) => {
  try {
    const facture = await Facture.findById(req.params.id);

    if (!facture || facture.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Facture not found'
      });
    }

    // Check if user has permission to delete this facture
    const userRole = req.user.role;
    const userId = req.user.id;
    
    // Get vehicle to check ownership
    let vehicle = null;
    if (facture.isSmartCar) {
      vehicle = await SmartCar.findById(facture.vehicleId).select('partnerId');
    } else {
      vehicle = await Vehicle.findById(facture.vehicleId).select('partnerId');
    }
    
    if (userRole !== 'admin' && vehicle && vehicle.partnerId) {
      if (vehicle.partnerId.toString() !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to delete this facture'
        });
      }
    }

    // Get user information
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete with tracking
    facture.isDeleted = true;
    
    // Add to update history
    facture.updatedBy.push({
      userId: user._id,
      userName: user.name,
      action: 'deleted',
      changes: {
        isDeleted: true
      },
      date: new Date()
    });
    
    facture.updatedAt = Date.now();

    await facture.save();

    res.status(200).json({
      success: true,
      data: {
        deletedBy: {
          id: user._id,
          name: user.name,
          role: user.role,
          entreprise: user.entreprise
        }
      },
      message: 'Facture deleted successfully'
    });
  } catch (error) {
    console.error('Delete facture error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting facture',
      error: error.message
    });
  }
};

// @desc    Get maintenance vehicles for dashboard (both types)
// @route   GET /api/factures/maintenance/vehicles
// @access  Private
exports.getMaintenanceVehicles = async (req, res) => {
  try {
    const { showAll = 'false' } = req.query;
    const userRole = req.user.role;
    const userId = req.user.id;

    // Base filters
    let regularFilter = { isDeleted: { $ne: true } };
    let smartFilter = { status: { $in: ['active', 'available'] } };

    // If user is not admin and not showing all vehicles, filter by partnerId
    if (userRole !== 'admin' && showAll === 'false') {
      regularFilter.partnerId = userId;
      smartFilter.partnerId = userId;
    }

    // Get regular vehicles with damage information
    const regularVehicles = await Vehicle.find(regularFilter)
      .select('name type matricule kmDepart kmRetour currentKilometer maintenanceHistory lastMaintenanceKm nextMaintenanceKm maintenanceStatus partnerId available dommages')
      .sort({ name: 1 });

    // Get smart cars with damage information
    const smartCars = await SmartCar.find(smartFilter)
      .select('nomVehicule typeVehicule numeroMatricule kmDepart kmRetour currentKilometer maintenanceHistory lastMaintenanceKm nextMaintenanceKm status partnerId dommages')
      .sort({ nomVehicule: 1 });

    // Process regular vehicles
    const processedRegularVehicles = regularVehicles.map(vehicle => {
      const kmDepart = vehicle.kmDepart || 0;
      const kmRetour = vehicle.kmRetour || 0;
      const currentKm = vehicle.currentKilometer || kmRetour || 0;
      const distanceTraveled = kmRetour - kmDepart;
      
      // Calculate maintenance progress
      let maintenanceStatus = 'ok';
      let maintenanceProgress = 0;
      const nextMaintenanceKm = vehicle.nextMaintenanceKm || currentKm + 10000;
      
      if (currentKm > 0) {
        const lastMaintenanceKm = vehicle.lastMaintenanceKm || 0;
        const kmSinceLastMaintenance = currentKm - lastMaintenanceKm;
        const maintenanceInterval = 10000; // Default 10,000 km
        
        maintenanceProgress = Math.min(100, Math.round((kmSinceLastMaintenance / maintenanceInterval) * 100));
        
        if (currentKm >= nextMaintenanceKm) {
          maintenanceStatus = 'due';
        } else if (currentKm >= nextMaintenanceKm - 2000) {
          maintenanceStatus = 'due_soon';
        } else {
          maintenanceStatus = vehicle.maintenanceStatus || 'ok';
        }
      }
      
      // Check for damages - dommages is array of strings
      const hasDamage = vehicle.dommages && vehicle.dommages.length > 0;
      const unrepairedDamageCount = hasDamage ? vehicle.dommages.length : 0;
      const hasUnrepairedDamage = unrepairedDamageCount > 0;
      
      return {
        id: vehicle._id,
        name: vehicle.name || 'Unknown Vehicle',
        type: vehicle.type || 'car',
        matricule: vehicle.matricule || 'N/A',
        kmDepart,
        kmRetour,
        currentKilometer: currentKm,
        distanceTraveled,
        maintenanceStatus,
        maintenanceProgress,
        lastMaintenanceDate: vehicle.lastMaintenanceKm ? 
          `At ${vehicle.lastMaintenanceKm} km` : 'Never',
        nextMaintenanceDue: nextMaintenanceKm,
        vehicleType: 'regular',
        isSmartCar: false,
        isAvailable: vehicle.available !== false,
        // Damage information
        hasDamage,
        hasUnrepairedDamage,
        damageCount: vehicle.dommages ? vehicle.dommages.length : 0,
        unrepairedDamageCount,
        damages: vehicle.dommages || []
      };
    });

    // Process smart cars
    const processedSmartCars = smartCars.map(smartCar => {
      const kmDepart = smartCar.kmDepart || 0;
      const kmRetour = smartCar.kmRetour || 0;
      const currentKm = smartCar.currentKilometer || kmRetour || 0;
      const distanceTraveled = kmRetour - kmDepart;
      
      // Calculate maintenance progress
      let maintenanceStatus = 'ok';
      let maintenanceProgress = 0;
      const nextMaintenanceKm = smartCar.nextMaintenanceKm || currentKm + 10000;
      
      if (currentKm > 0) {
        const lastMaintenanceKm = smartCar.lastMaintenanceKm || 0;
        const kmSinceLastMaintenance = currentKm - lastMaintenanceKm;
        const maintenanceInterval = 10000; // Default 10,000 km
        
        maintenanceProgress = Math.min(100, Math.round((kmSinceLastMaintenance / maintenanceInterval) * 100));
        
        if (currentKm >= nextMaintenanceKm) {
          maintenanceStatus = 'due';
        } else if (currentKm >= nextMaintenanceKm - 2000) {
          maintenanceStatus = 'due_soon';
        } else {
          maintenanceStatus = 'ok';
        }
      }
      
      // Check for damages
      const hasDamage = smartCar.dommages && smartCar.dommages.length > 0;
      const unrepairedDamageCount = hasDamage ? smartCar.dommages.length : 0;
      const hasUnrepairedDamage = unrepairedDamageCount > 0;
      
      return {
        id: smartCar._id,
        name: smartCar.nomVehicule || 'Unknown Smart Car',
        type: smartCar.typeVehicule || 'smart',
        matricule: smartCar.numeroMatricule || 'N/A',
        kmDepart,
        kmRetour,
        currentKilometer: currentKm,
        distanceTraveled,
        maintenanceStatus,
        maintenanceProgress,
        lastMaintenanceDate: smartCar.lastMaintenanceKm ? 
          `At ${smartCar.lastMaintenanceKm} km` : 'Never',
        nextMaintenanceDue: nextMaintenanceKm,
        vehicleType: 'smart',
        isSmartCar: true,
        isAvailable: smartCar.status === 'available',
        // Damage information
        hasDamage,
        hasUnrepairedDamage,
        damageCount: smartCar.dommages ? smartCar.dommages.length : 0,
        unrepairedDamageCount,
        damages: smartCar.dommages || []
      };
    });

    // Combine all vehicles
    const allVehicles = [...processedRegularVehicles, ...processedSmartCars];

    // Get statistics including damage statistics
    const total = allVehicles.length;
    const due = allVehicles.filter(v => v.maintenanceStatus === 'due').length;
    const dueSoon = allVehicles.filter(v => v.maintenanceStatus === 'due_soon').length;
    const ok = allVehicles.filter(v => v.maintenanceStatus === 'ok').length;
    const regularCount = processedRegularVehicles.length;
    const smartCount = processedSmartCars.length;
    
    // Damage statistics
    const vehiclesWithDamage = allVehicles.filter(v => v.hasDamage).length;
    const vehiclesWithUnrepairedDamage = allVehicles.filter(v => v.hasUnrepairedDamage).length;
    const totalDamages = allVehicles.reduce((sum, v) => sum + v.damageCount, 0);
    const totalUnrepairedDamages = allVehicles.reduce((sum, v) => sum + v.unrepairedDamageCount, 0);

    res.status(200).json({
      success: true,
      data: {
        vehicles: allVehicles,
        statistics: {
          total,
          due,
          dueSoon,
          ok,
          regular: regularCount,
          smart: smartCount,
          withDamage: vehiclesWithDamage,
          withUnrepairedDamage: vehiclesWithUnrepairedDamage,
          totalDamages,
          totalUnrepairedDamages
        }
      }
    });
  } catch (error) {
    console.error('Get maintenance vehicles error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching maintenance vehicles',
      error: error.message
    });
  }
};

// @desc    Update kilometer for any vehicle type
// @route   PUT /api/factures/maintenance/:vehicleId/kilometer
// @access  Private
exports.updateKilometer = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { kilometer, type, vehicleType = 'regular', notes } = req.body;

    if (!kilometer || isNaN(kilometer)) {
      return res.status(400).json({
        success: false,
        message: 'Valid kilometer reading is required'
      });
    }

    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle belongs to user (unless admin)
    const userRole = req.user.role;
    const userId = req.user.id;
    if (userRole !== 'admin' && vehicle.partnerId && vehicle.partnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to update this vehicle'
      });
    }

    // Update based on type
    const kmValue = parseFloat(kilometer);
    
    if (type === 'depart') {
      vehicle.kmDepart = kmValue;
    } else if (type === 'retour') {
      vehicle.kmRetour = kmValue;
      
      // Update current kilometer
      if (vehicleType === 'smart') {
        vehicle.currentKilometer = Math.max(kmValue, vehicle.currentKilometer || 0);
        vehicle.distanceTraveled = kmValue - (vehicle.kmDepart || 0);
      } else {
        vehicle.currentKilometer = Math.max(kmValue, vehicle.currentKilometer || 0);
        vehicle.totalDistance = (vehicle.totalDistance || 0) + (kmValue - (vehicle.kmDepart || 0));
      }
    } else {
      // Update current kilometer directly
      if (vehicleType === 'smart') {
        vehicle.currentKilometer = kmValue;
      } else {
        vehicle.currentKilometer = kmValue;
      }
    }

    // Add to history if needed
    if (vehicleType === 'regular') {
      if (!vehicle.kilometerHistory) {
        vehicle.kilometerHistory = [];
      }
      
      vehicle.kilometerHistory.push({
        kilometer: kmValue,
        type: type || 'update',
        date: new Date(),
        notes: notes || 'Maintenance update'
      });
    }

    await vehicle.save();

    res.status(200).json({
      success: true,
      data: { vehicle },
      message: 'Kilometer updated successfully'
    });
  } catch (error) {
    console.error('Update kilometer error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating kilometer',
      error: error.message
    });
  }
};

// @desc    Add damage indices array to vehicle - STORE ONLY ARRAY
// @route   PUT /api/factures/vehicles/:vehicleId/damages
// @access  Private
exports.addDamage = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { 
      damageIndices = [],  // Just an array of numbers [0, 1, 2, ...]
      vehicleType = 'regular'
    } = req.body;

    console.log('Received damage indices:', {
      vehicleId,
      damageIndices,
      vehicleType
    });

    // Validate damageIndices is an array
    if (!Array.isArray(damageIndices) || damageIndices.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Damage indices array is required and must contain at least one number'
      });
    }

    // Validate all items are numbers
    if (!damageIndices.every(item => typeof item === 'number')) {
      return res.status(400).json({
        success: false,
        message: 'All damage indices must be numbers'
      });
    }

    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if vehicle belongs to user (unless admin)
    const userRole = req.user.role;
    const userId = req.user.id;
    if (userRole !== 'admin' && vehicle.partnerId && vehicle.partnerId.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to add damage to this vehicle'
      });
    }

    // Initialize dommages array if it doesn't exist
    if (!vehicle.dommages) {
      vehicle.dommages = [];
    }

    // DIRECTLY PUSH THE ARRAY - no objects, no strings, just the array
    vehicle.dommages.push(damageIndices);

    await vehicle.save();

    res.status(200).json({
      success: true,
      data: { 
        damageIndicesAdded: damageIndices,
        vehicleId: vehicle._id, 
        vehicleType,
        totalDamageEntries: vehicle.dommages.length
      },
      message: `${damageIndices.length} damage index(es) stored successfully`
    });
  } catch (error) {
    console.error('Store damage indices error:', error);
    res.status(500).json({
      success: false,
      message: 'Error storing damage indices',
      error: error.message
    });
  }
};

// @desc    Get all damage arrays from vehicle
// @route   GET /api/factures/vehicles/:vehicleId/damages
// @access  Private
exports.getDamages = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { vehicleType = 'regular' } = req.query;

    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Part names for reference
    const partNames = [
      'Pare-chocs Avant',
      'Pare-chocs Arrière',
      'Porte Avant Gauche',
      'Porte Avant Droite',
      'Porte Arrière Gauche',
      'Porte Arrière Droite',
      'Aile Avant Gauche',
      'Aile Avant Droite',
      'Aile Arrière Gauche',
      'Aile Arrière Droite',
      'Capot',
      'Coffre',
      'Toit',
      'Rétroviseur Gauche',
      'Rétroviseur Droit',
      'Phare Avant Gauche',
      'Phare Avant Droit',
      'Feu Arrière Gauche',
      'Feu Arrière Droit',
      'Vitre Avant',
      'Vitre Arrière',
      'Jante Avant Gauche',
      'Jante Avant Droite',
      'Jante Arrière Gauche',
      'Jante Arrière Droite'
    ];

    // Get damage arrays and convert indices to names
    const damages = vehicle.dommages || [];
    
    const processedDamages = damages.map((damageArray, index) => {
      const names = damageArray.map(idx => partNames[idx] || `Area ${idx}`);
      return {
        id: index,
        indices: damageArray,
        names: names
      };
    });

    res.status(200).json({
      success: true,
      data: {
        vehicleId: vehicle._id,
        vehicleType,
        damages: processedDamages,
        total: damages.length
      },
      message: 'Damage arrays retrieved successfully'
    });
  } catch (error) {
    console.error('Get damages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving damages',
      error: error.message
    });
  }
};

// @desc    Get all damages for a vehicle
// @route   GET /api/factures/vehicles/:vehicleId/damages
// @access  Private
exports.getDamages = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { vehicleType = 'regular' } = req.query;

    let vehicle = null;
    
    if (vehicleType === 'smart') {
      vehicle = await SmartCar.findById(vehicleId);
    } else {
      vehicle = await Vehicle.findById(vehicleId);
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Process dommages to ensure consistent format
    let damages = vehicle.dommages || [];
    
    // Convert if they're stored as strings
    if (damages.length > 0 && typeof damages[0] === 'string') {
      damages = damages.map(dmg => {
        try {
          const parsed = JSON.parse(dmg);
          return parsed;
        } catch (e) {
          return { id: 0, description: dmg, date: new Date() };
        }
      });
    }

    // Map part names based on id
    const partNames = [
      'Pare-chocs Avant',
      'Pare-chocs Arrière',
      'Porte Avant Gauche',
      'Porte Avant Droite',
      'Porte Arrière Gauche',
      'Porte Arrière Droite',
      'Aile Avant Gauche',
      'Aile Avant Droite',
      'Aile Arrière Gauche',
      'Aile Arrière Droite',
      'Capot',
      'Coffre',
      'Toit',
      'Rétroviseur Gauche',
      'Rétroviseur Droit',
      'Phare Avant Gauche',
      'Phare Avant Droit',
      'Feu Arrière Gauche',
      'Feu Arrière Droit',
      'Vitre Avant',
      'Vitre Arrière',
      'Jante Avant Gauche',
      'Jante Avant Droite',
      'Jante Arrière Gauche',
      'Jante Arrière Droite'
    ];

    const processedDamages = damages.map((damage, index) => {
      // Ensure damage has required fields
      const id = damage.id || index;
      const name = partNames[id] || `Area ${id}`;
      
      return {
        id: id,
        name: name,
        description: damage.description || `${name} - damaged`,
        date: damage.date || new Date(),
        repaired: damage.repaired || false,
        _id: damage._id || index
      };
    });

    res.status(200).json({
      success: true,
      data: {
        vehicleId: vehicle._id,
        vehicleType,
        damages: processedDamages,
        total: damages.length
      },
      message: 'Damages retrieved successfully'
    });
  } catch (error) {
    console.error('Get damages error:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving damages',
      error: error.message
    });
  }
};

// @desc    Get user's vehicles with their factures
// @route   GET /api/factures/user/vehicles
// @access  Private
exports.getUserVehiclesWithFactures = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Get vehicles for this user
    const regularVehicles = await Vehicle.find({
      isDeleted: { $ne: true },
      ...(userRole !== 'admin' && { partnerId: userId })
    }).select('name type matricule currentKilometer partnerId dommages');

    const smartCars = await SmartCar.find({
      status: { $in: ['active', 'available'] },
      ...(userRole !== 'admin' && { partnerId: userId })
    }).select('nomVehicule typeVehicule numeroMatricule currentKilometer partnerId dommages');

    // Get factures for these vehicles
    const regularVehicleIds = regularVehicles.map(v => v._id);
    const smartCarIds = smartCars.map(s => s._id);

    const [regularFactures, smartFactures] = await Promise.all([
      Facture.find({
        vehicleId: { $in: regularVehicleIds },
        isDeleted: false
      }).populate('inforUser.userId', 'name email role logoEntreprise entreprise')
        .sort({ createdAt: -1 }),
      Facture.find({
        vehicleId: { $in: smartCarIds },
        isDeleted: false
      }).populate('inforUser.userId', 'name email role logoEntreprise entreprise')
        .sort({ createdAt: -1 })
    ]);

    // Combine factures
    const allFactures = [...regularFactures, ...smartFactures];

    // Process vehicles with their factures
    const vehiclesWithFactures = [
      ...regularVehicles.map(vehicle => {
        const vehicleFactures = allFactures.filter(f => 
          f.vehicleId.toString() === vehicle._id.toString() && 
          !f.isSmartCar
        );
        
        // Check damages (array of strings)
        const hasDamage = vehicle.dommages && vehicle.dommages.length > 0;
        const unrepairedDamages = vehicle.dommages ? vehicle.dommages.length : 0;
        
        return {
          id: vehicle._id,
          name: vehicle.name,
          type: vehicle.type,
          matricule: vehicle.matricule,
          currentKilometer: vehicle.currentKilometer,
          vehicleType: 'regular',
          factureCount: vehicleFactures.length,
          factures: vehicleFactures.slice(0, 5), // Last 5 factures
          // Damage information
          hasDamage,
          damageCount: vehicle.dommages ? vehicle.dommages.length : 0,
          unrepairedDamageCount: unrepairedDamages,
          damages: vehicle.dommages || [],
          lastFacture: vehicleFactures.length > 0 ? vehicleFactures[0] : null
        };
      }),
      ...smartCars.map(smartCar => {
        const vehicleFactures = allFactures.filter(f => 
          f.vehicleId.toString() === smartCar._id.toString() && 
          f.isSmartCar
        );
        
        // Check damages
        const hasDamage = smartCar.dommages && smartCar.dommages.length > 0;
        const unrepairedDamages = smartCar.dommages ? smartCar.dommages.length : 0;
        
        return {
          id: smartCar._id,
          name: smartCar.nomVehicule,
          type: smartCar.typeVehicule,
          matricule: smartCar.numeroMatricule,
          currentKilometer: smartCar.currentKilometer,
          vehicleType: 'smart',
          factureCount: vehicleFactures.length,
          factures: vehicleFactures.slice(0, 5), // Last 5 factures
          // Damage information
          hasDamage,
          damageCount: smartCar.dommages ? smartCar.dommages.length : 0,
          unrepairedDamageCount: unrepairedDamages,
          damages: smartCar.dommages || [],
          lastFacture: vehicleFactures.length > 0 ? vehicleFactures[0] : null
        };
      })
    ];

    // Calculate damage statistics
    const totalVehicles = vehiclesWithFactures.length;
    const vehiclesWithDamage = vehiclesWithFactures.filter(v => v.hasDamage).length;
    const vehiclesWithUnrepairedDamage = vehiclesWithFactures.filter(v => v.unrepairedDamageCount > 0).length;
    const totalDamages = vehiclesWithFactures.reduce((sum, v) => sum + v.damageCount, 0);
    const totalUnrepairedDamages = vehiclesWithFactures.reduce((sum, v) => sum + v.unrepairedDamageCount, 0);

    res.status(200).json({
      success: true,
      data: {
        vehicles: vehiclesWithFactures,
        statistics: {
          totalVehicles,
          totalFactures: allFactures.length,
          vehiclesWithDamage,
          vehiclesWithUnrepairedDamage,
          totalDamages,
          totalUnrepairedDamages
        }
      }
    });
  } catch (error) {
    console.error('Get user vehicles with factures error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user vehicles with factures',
      error: error.message
    });
  }
};

// @desc    Migrate existing factures to include phone numbers from users
// @route   POST /api/factures/migrate/phones
// @access  Private (Admin only)
exports.migratePhoneNumbers = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Only admin can perform migration'
      });
    }

    // Get all factures
    const factures = await Facture.find({ isDeleted: false });
    let updatedCount = 0;
    let errorCount = 0;

    for (const facture of factures) {
      try {
        // Get user information
        const user = await User.findById(facture.inforUser.userId);
        
        if (user && user.number) {
          console.log(`Migrating facture ${facture.factureNumber} for user ${user.name} with number: ${user.number}`);
          
          // Update inforUser.phone
          facture.inforUser.phone = user.number;
          
          // Update agencyInfo.phone
          facture.agencyInfo.phone = user.number;
          
          // Update agencyInfo.email
          facture.agencyInfo.email = user.email;
          
          // Update createdByInfo if it exists
          if (facture.createdByInfo) {
            facture.createdByInfo.phone = user.number;
            facture.createdByInfo.email = user.email;
          } else {
            // Create createdByInfo if it doesn't exist
            facture.createdByInfo = {
              entreprise: user.entreprise || '',
              logoEntreprise: user.logoEntreprise || '',
              country: user.country || '',
              city: user.city || '',
              phone: user.number || '',
              email: user.email || ''
            };
          }
          
          await facture.save();
          updatedCount++;
        } else if (!user) {
          console.log(`User not found for facture ${facture.factureNumber}`);
          errorCount++;
        }
      } catch (error) {
        console.error(`Error migrating facture ${facture.factureNumber}:`, error.message);
        errorCount++;
      }
    }

    res.status(200).json({
      success: true,
      message: `Migration completed. Updated ${updatedCount} factures with phone numbers. ${errorCount} errors.`
    });
  } catch (error) {
    console.error('Migration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error migrating phone numbers',
      error: error.message
    });
  }
};

// @desc    Get factures with damages statistics
// @route   GET /api/factures/damages/statistics
// @access  Private
exports.getDamageStatistics = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    // Get all vehicles for this user
    let regularVehicles = [];
    let smartCars = [];
    
    if (userRole === 'admin') {
      regularVehicles = await Vehicle.find({ isDeleted: { $ne: true } }).select('_id dommages');
      smartCars = await SmartCar.find({ status: { $in: ['active', 'available'] } }).select('_id dommages');
    } else {
      regularVehicles = await Vehicle.find({ 
        partnerId: userId,
        isDeleted: { $ne: true }
      }).select('_id dommages');
      
      smartCars = await SmartCar.find({ 
        partnerId: userId,
        status: { $in: ['active', 'available'] }
      }).select('_id dommages');
    }

    // Get all factures with damages
    const allVehicleIds = [
      ...regularVehicles.map(v => v._id),
      ...smartCars.map(s => s._id)
    ];

    const facturesWithDamages = await Facture.find({
      vehicleId: { $in: allVehicleIds },
      isDeleted: false,
      $or: [
        { autoRemoveDamages: true },
        { 'repairedPartNames.0': { $exists: true } }
      ]
    }).populate('inforUser.userId', 'name email')
      .sort({ createdAt: -1 });

    // Calculate vehicle damage statistics
    const allVehicles = [...regularVehicles, ...smartCars];
    let totalVehicles = allVehicles.length;
    let vehiclesWithDamages = 0;
    let totalDamages = 0;
    
    for (const vehicle of allVehicles) {
      if (vehicle.dommages && vehicle.dommages.length > 0) {
        vehiclesWithDamages++;
        totalDamages += vehicle.dommages.length;
      }
    }

    // Calculate facture damage statistics
    const facturesWithAutoRemove = facturesWithDamages.filter(f => f.autoRemoveDamages);
    const totalRepairedParts = facturesWithDamages.reduce(
      (sum, f) => sum + (f.repairedPartNames?.length || 0), 
      0
    );

    res.status(200).json({
      success: true,
      data: {
        vehicleStatistics: {
          totalVehicles,
          vehiclesWithDamages,
          totalDamages
        },
        factureStatistics: {
          totalFacturesWithDamages: facturesWithDamages.length,
          facturesWithAutoRemove: facturesWithAutoRemove.length,
          totalRepairedParts
        },
        recentFacturesWithDamages: facturesWithDamages.slice(0, 10)
      }
    });
  } catch (error) {
    console.error('Get damage statistics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching damage statistics',
      error: error.message
    });
  }
};

// @desc    Get vehicles needing damage repair
// @route   GET /api/factures/vehicles/needing-repair
// @access  Private
exports.getVehiclesNeedingRepair = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    // Base filters
    let regularFilter = { isDeleted: { $ne: true } };
    let smartFilter = { status: { $in: ['active', 'available'] } };

    // If user is not admin, filter by partnerId
    if (userRole !== 'admin') {
      regularFilter.partnerId = userId;
      smartFilter.partnerId = userId;
    }

    // Get vehicles with damages (all string damages are considered needing repair)
    const regularVehicles = await Vehicle.find({
      ...regularFilter,
      'dommages.0': { $exists: true } // Has at least one damage
    }).select('name type matricule currentKilometer maintenanceStatus dommages partnerId');

    const smartCars = await SmartCar.find({
      ...smartFilter,
      'dommages.0': { $exists: true } // Has at least one damage
    }).select('nomVehicule typeVehicule numeroMatricule currentKilometer status dommages partnerId');

    // Process vehicles
    const vehiclesNeedingRepair = [
      ...regularVehicles.map(vehicle => {
        return {
          id: vehicle._id,
          name: vehicle.name,
          type: vehicle.type,
          matricule: vehicle.matricule,
          currentKilometer: vehicle.currentKilometer,
          maintenanceStatus: vehicle.maintenanceStatus,
          vehicleType: 'regular',
          unrepairedDamageCount: vehicle.dommages ? vehicle.dommages.length : 0,
          damages: vehicle.dommages || []
        };
      }),
      ...smartCars.map(smartCar => {
        return {
          id: smartCar._id,
          name: smartCar.nomVehicule,
          type: smartCar.typeVehicule,
          matricule: smartCar.numeroMatricule,
          currentKilometer: smartCar.currentKilometer,
          status: smartCar.status,
          vehicleType: 'smart',
          unrepairedDamageCount: smartCar.dommages ? smartCar.dommages.length : 0,
          damages: smartCar.dommages || []
        };
      })
    ].sort((a, b) => b.unrepairedDamageCount - a.unrepairedDamageCount);

    res.status(200).json({
      success: true,
      data: {
        vehicles: vehiclesNeedingRepair,
        statistics: {
          totalVehicles: vehiclesNeedingRepair.length,
          totalUnrepairedDamages: vehiclesNeedingRepair.reduce((sum, v) => sum + v.unrepairedDamageCount, 0),
          regularVehicles: vehiclesNeedingRepair.filter(v => v.vehicleType === 'regular').length,
          smartVehicles: vehiclesNeedingRepair.filter(v => v.vehicleType === 'smart').length
        }
      }
    });
  } catch (error) {
    console.error('Get vehicles needing repair error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicles needing repair',
      error: error.message
    });
  }
};