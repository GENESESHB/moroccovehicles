const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Insurance = require('../models/Insurance');
const Vehicle = require('../models/Vehicle');
const SmartCar = require('../models/SmartCar');
const User = require('../models/User');

// ----------------------------------------------------------------------
// Helper: fetch vehicle details and verify ownership
// ----------------------------------------------------------------------
const getVehicleAndCheckOwner = async (vehicleId, vehicleType, userId) => {
  let vehicle = null;
  let Model = vehicleType === 'regular' ? Vehicle : SmartCar;

  try {
    vehicle = await Model.findOne({
      _id: vehicleId,
      partnerId: userId,
    });
  } catch (err) {
    return { error: 'Invalid vehicle ID' };
  }

  if (!vehicle) {
    return { error: 'Vehicle not found or you do not own it' };
  }

  return { vehicle, vehicleType };
};

// ----------------------------------------------------------------------
// POST /api/insurance
// Create a new insurance contract
// ----------------------------------------------------------------------
router.post('/', auth, async (req, res) => {
  try {
    const {
      vehicleId,
      vehicleType,
      company,
      policyNumber,
      startDate,
      endDate,
      cost,
      status,
      notes,
      coverage,
      smartCar,
    } = req.body;

    // Validate required fields
    if (!vehicleId || !vehicleType || !company || !policyNumber || !startDate || !endDate || cost === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    // Verify vehicle exists and belongs to user
    const { vehicle, error } = await getVehicleAndCheckOwner(
      vehicleId,
      vehicleType,
      req.user._id
    );

    if (error) {
      return res.status(404).json({ success: false, message: error });
    }

    // Build vehicle snapshot as a proper object
    const vehicleSnapshot = {
      name: vehicle.name || vehicle.nomVehicule || 'Sans nom',
      matricule: vehicle.matricule || vehicle.numeroMatricule || 'N/A',
      type: vehicle.type || vehicle.typeVehicule || 'Inconnu',
      carburant: vehicle.carburant || vehicle.typeCarburant || 'N/A',
      boiteVitesse: vehicle.boiteVitesse || 'N/A',
      prixJour: vehicle.prixJour || vehicle.pricePerDay || 0,
    };

    // Create insurance document
    const insurance = new Insurance({
      vehicleId,
      vehicleType,
      user: req.user._id,
      company,
      policyNumber: policyNumber.toUpperCase(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      cost: Number(cost),
      status: status || 'pending',
      notes: notes || '',
      coverage: coverage || 'Tous risques',
      smartCar: smartCar || false,
      vehicleSnapshot: vehicleSnapshot, // Explicitly set as object
    });

    await insurance.save();

    // If vehicle is regular, update its assurance dates
    if (vehicleType === 'regular') {
      try {
        await Vehicle.findByIdAndUpdate(
          vehicleId,
          {
            assuranceStartDate: new Date(startDate),
            assuranceEndDate: new Date(endDate),
          },
          { runValidators: true }
        );
      } catch (vehicleError) {
        console.error('Failed to update vehicle insurance dates:', vehicleError);
      }
    }

    res.status(201).json({
      success: true,
      data: insurance,
    });
  } catch (error) {
    console.error('Create insurance error:', error);
    if (error.code === 11000 && error.keyPattern?.policyNumber) {
      return res.status(400).json({
        success: false,
        message: 'You already have a contract with this policy number',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// ----------------------------------------------------------------------
// GET /api/insurance
// List all insurance contracts for the logged-in user
// ----------------------------------------------------------------------
router.get('/', auth, async (req, res) => {
  try {
    const insurances = await Insurance.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: insurances.length,
      data: insurances,
    });
  } catch (error) {
    console.error('Get all insurances error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// ----------------------------------------------------------------------
// GET /api/insurance/:id
// Get a single insurance contract
// ----------------------------------------------------------------------
router.get('/:id', auth, async (req, res) => {
  try {
    const insurance = await Insurance.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }

    res.json({
      success: true,
      data: insurance,
    });
  } catch (error) {
    console.error('Get insurance error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// ----------------------------------------------------------------------
// GET /api/insurance/:id/attestation
// Generate attestation with user and vehicle info
// ----------------------------------------------------------------------
router.get('/:id/attestation', auth, async (req, res) => {
  try {
    // Get insurance with user info populated
    const insurance = await Insurance.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate('user', 'name email number entreprise address city country logoEntreprise');

    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }

    // Get fresh vehicle data
    const VehicleModel = insurance.vehicleType === 'regular' ? Vehicle : SmartCar;
    const vehicle = await VehicleModel.findById(insurance.vehicleId);

    // Determine if it's a smart car
    const isSmartCar = insurance.vehicleType === 'smart' || insurance.smartCar === true;

    // Build vehicle data with proper field mapping
    let vehicleData = {
      isSmartCar: isSmartCar,
    };

    if (isSmartCar && vehicle) {
      // SmartCar fields
      vehicleData = {
        ...vehicleData,
        name: vehicle.nomVehicule || vehicle.name || 'Smart Car',
        matricule: vehicle.numeroMatricule || vehicle.matricule || 'N/A',
        type: vehicle.typeVehicule || vehicle.type || 'Smart',
        carburant: vehicle.typeCarburant || vehicle.carburant || 'N/A',
        boiteVitesse: vehicle.boiteVitesse || 'N/A',
        prixJour: vehicle.prixJour || 0,
      };
    } else if (vehicle) {
      // Regular Vehicle fields
      vehicleData = {
        ...vehicleData,
        name: vehicle.name || 'Sans nom',
        matricule: vehicle.matricule || 'N/A',
        type: vehicle.type || 'Inconnu',
        carburant: vehicle.carburant || 'N/A',
        boiteVitesse: vehicle.boiteVitesse || 'N/A',
        prixJour: vehicle.pricePerDay || 0,
      };
    } else {
      // Fallback to snapshot
      vehicleData = {
        ...vehicleData,
        ...insurance.vehicleSnapshot,
      };
    }

    // Build user data with correct field names from your User model
    const userData = insurance.user || req.user;
    
    const attestationData = {
      // Insurance info
      insurance: {
        _id: insurance._id,
        policyNumber: insurance.policyNumber,
        company: insurance.company,
        startDate: insurance.startDate,
        endDate: insurance.endDate,
        cost: insurance.cost,
        status: insurance.status,
        coverage: insurance.coverage || 'Tous risques',
        notes: insurance.notes || '',
        createdAt: insurance.createdAt,
        updatedAt: insurance.updatedAt,
        smartCar: isSmartCar,
        vehicleType: insurance.vehicleType,
      },
      
      // User info (Agency/Rental Company)
      user: {
        name: userData.name || 'N/A',
        email: userData.email || 'N/A',
        phone: userData.number || userData.phone || 'N/A',
        city: userData.city || 'N/A',
        country: userData.country || 'N/A',
        companyName: userData.entreprise || userData.companyName || 'N/A',
        logoEntreprise: userData.logoEntreprise || '',
      },
      
      // Vehicle info
      vehicle: vehicleData,
      
      generatedAt: new Date(),
      documentType: 'insurance_attestation',
    };

    res.json({
      success: true,
      data: attestationData,
    });
  } catch (error) {
    console.error('Get attestation error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// ----------------------------------------------------------------------
// PUT /api/insurance/:id
// Update an insurance contract
// ----------------------------------------------------------------------
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      company,
      policyNumber,
      startDate,
      endDate,
      cost,
      status,
      notes,
      coverage,
      smartCar,
    } = req.body;

    // Find existing insurance and verify ownership
    let insurance = await Insurance.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }

    // Build update object
    const updateFields = {};
    
    if (company !== undefined) updateFields.company = company;
    if (policyNumber !== undefined) updateFields.policyNumber = policyNumber.toUpperCase();
    if (startDate !== undefined) updateFields.startDate = new Date(startDate);
    if (endDate !== undefined) updateFields.endDate = new Date(endDate);
    if (cost !== undefined) updateFields.cost = Number(cost);
    if (status !== undefined) updateFields.status = status;
    if (notes !== undefined) updateFields.notes = notes;
    if (coverage !== undefined) updateFields.coverage = coverage;
    if (smartCar !== undefined) updateFields.smartCar = smartCar;

    // Perform update
    insurance = await Insurance.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    // If the insurance belongs to a regular vehicle, update its assurance dates
    if (insurance.vehicleType === 'regular' && (startDate || endDate)) {
      try {
        await Vehicle.findByIdAndUpdate(
          insurance.vehicleId,
          {
            assuranceStartDate: insurance.startDate,
            assuranceEndDate: insurance.endDate,
          },
          { runValidators: true }
        );
      } catch (vehicleError) {
        console.error('Failed to update vehicle insurance dates during PUT:', vehicleError);
      }
    }

    res.json({
      success: true,
      data: insurance,
    });
  } catch (error) {
    console.error('Update insurance error:', error);
    if (error.code === 11000 && error.keyPattern?.policyNumber) {
      return res.status(400).json({
        success: false,
        message: 'Policy number already exists for another contract',
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

// ----------------------------------------------------------------------
// DELETE /api/insurance/:id
// Delete an insurance contract
// ----------------------------------------------------------------------
router.delete('/:id', auth, async (req, res) => {
  try {
    const insurance = await Insurance.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!insurance) {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }

    res.json({
      success: true,
      message: 'Insurance contract deleted successfully',
    });
  } catch (error) {
    console.error('Delete insurance error:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: 'Insurance contract not found',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

module.exports = router;