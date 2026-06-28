const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const SmartContract = require('../models/SmartContract');
const SmartCar = require('../models/SmartCar');
const Client = require('../models/Client');
const User = require('../models/User');
const Insurance = require('../models/Insurance');

// ==================== HELPERS ====================

const generateContractNumber = () => {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `SMART-${timestamp}-${random}`;
};

const calculateDays = (startDate, endDate) => {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
};

const parseNumber = (value, defaultValue = 0) => {
  if (value === undefined || value === null || value === '') return defaultValue;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

// ==================== SNAPSHOT BUILDERS ====================

/**
 * Build comprehensive client snapshot from Client model
 */
const buildClientSnapshot = (client) => ({
  _id: client._id,
  firstName: client.firstName || '',
  lastName: client.lastName || '',
  cin: client.cin || '',
  phone: client.phone || '',
  email: client.email || '',
  birthDate: client.birthDate,
  address: client.address || '',
  passport: client.passport || '',
  licenseNumber: client.licenseNumber || '',
  licenseIssueDate: client.licenseIssueDate,
  nationality: client.nationality || '',
  emergencyContact: client.emergencyContact || {
    name: '',
    phone: '',
    relation: ''
  }
});

/**
 * Build comprehensive vehicle snapshot from SmartCar model
 * UPDATED: Now includes insurance information lookup
 */
const buildVehicleSnapshot = async (vehicle, userId) => {
  // Fetch active insurance for this vehicle
  const insurance = await Insurance.findOne({
    vehicleId: vehicle._id,
    startDate: { $lte: new Date() },
    endDate: { $gte: new Date() },
    status: { $in: ['active', 'pending'] }
  }).sort({ createdAt: -1 });

  return {
    _id: vehicle._id,
    nomVehicule: vehicle.nomVehicule || '',
    numeroMatricule: vehicle.numeroMatricule || '',
    typeVehicule: vehicle.typeVehicule || '',
    boiteVitesse: vehicle.boiteVitesse || '',
    typeCarburant: vehicle.typeCarburant || '',
    prixJour: vehicle.prixJour || 0,
    prixHebdo: vehicle.prixHebdo || 0,
    prixMensuel: vehicle.prixMensuel || 0,
    caution: vehicle.caution || 0,
    nombrePlaces: vehicle.nombrePlaces || 0,
    nombrePortes: vehicle.nombrePortes || 0,
    cylindree: vehicle.cylindree || '',
    puissanceFiscale: vehicle.puissanceFiscale || 0,
    currentKilometer: vehicle.currentKilometer || vehicle.kmDepart || 0,
    kmActuel: vehicle.currentKilometer || vehicle.kmDepart || 0,
    imageVehicule: vehicle.imageVehicule || {
      filename: '',
      path: '',
      mimetype: '',
      url: ''
    },
    photos: vehicle.photos || [],
    carteGrise: {
      numero: vehicle.numeroMatricule || '',
      dateCirculation: vehicle.dateCirculation,
      vin: vehicle.vin || ''
    },
    // UPDATED: Include insurance info in vehicle snapshot
    assurance: insurance ? {
      compagnie: insurance.company || '',
      numeroContrat: insurance.policyNumber || '',
      dateDebut: insurance.startDate,
      dateFin: insurance.endDate,
      type: insurance.coverage || 'Tous risques',
      cost: insurance.cost || 0,
      status: insurance.status || 'pending'
    } : (vehicle.assurance || {
      compagnie: '',
      numeroContrat: '',
      dateDebut: null,
      dateFin: null,
      type: ''
    }),
    equipements: vehicle.equipementsAudio || [],
    etatExterieur: vehicle.etatExterieur || 'bon',
    etatInterieur: vehicle.etatInterieur || 'bon',
    proprete: vehicle.proprete || 'propre',
    // NEW: Include insurance reference if found
    insuranceId: insurance ? insurance._id : null
  };
};

/**
 * Build enterprise snapshot from User model
 */
const buildEnterpriseSnapshot = (user) => ({
  _id: user._id,
  name: user.name || '',
  entreprise: user.entreprise || '',
  number: user.number || '',
  email: user.email || '',
  logoEntreprise: user.logoEntreprise || '',
  country: user.country || '',
  city: user.city || '',
  address: user.address || '',
  siret: user.siret || '',
  tvaNumber: user.tvaNumber || ''
});

/**
 * Build insurance snapshot from Insurance model
 * UPDATED: Enhanced with full vehicle snapshot from insurance record
 */
const buildInsuranceSnapshot = (insurance) => {
  if (!insurance) return null;
  
  return {
    _id: insurance._id,
    company: insurance.company || '',
    policyNumber: insurance.policyNumber || '',
    startDate: insurance.startDate,
    endDate: insurance.endDate,
    cost: insurance.cost || 0,
    status: insurance.status || '',
    coverage: insurance.coverage || '',
    notes: insurance.notes || '',
    vehicleType: insurance.vehicleType || '',
    smartCar: insurance.smartCar || false,
    // Use the embedded vehicleSnapshot from insurance or build minimal one
    vehicleSnapshot: insurance.vehicleSnapshot || {
      name: 'Sans nom',
      matricule: 'N/A',
      type: 'Inconnu',
      carburant: 'N/A',
      boiteVitesse: 'N/A',
      prixJour: 0
    }
  };
};

// ==================== NEW ROUTE: GET VEHICLE WITH INSURANCE ====================
/**
 * @route   GET /api/contrasmart/vehicle/:id
 * @desc    Get single vehicle with active insurance information
 * @access  Private
 */
router.get('/vehicle/:id', auth, async (req, res) => {
  try {
    const vehicleId = req.params.id;
    
    // Fetch vehicle with user verification
    const vehicle = await SmartCar.findOne({
      _id: vehicleId,
      $or: [
        { userId: req.user.id },
        { partnerId: req.user.id }
      ]
    });

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found or access denied'
      });
    }

    // Fetch active insurance for this vehicle
    const activeInsurance = await Insurance.findOne({
      vehicleId: vehicleId,
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
      status: { $in: ['active', 'pending'] }
    }).sort({ createdAt: -1 });

    // Fetch all insurances for this vehicle (history)
    const allInsurances = await Insurance.find({
      vehicleId: vehicleId
    }).sort({ startDate: -1 }).limit(5);

    // Build enhanced vehicle snapshot with insurance
    const vehicleSnapshot = await buildVehicleSnapshot(vehicle, req.user.id);

    res.json({
      success: true,
      vehicle: {
        ...vehicle.toObject(),
        // Include computed insurance status
        insuranceStatus: activeInsurance ? 'active' : 'none',
        activeInsurance: activeInsurance ? buildInsuranceSnapshot(activeInsurance) : null,
        insuranceHistory: allInsurances.map(ins => buildInsuranceSnapshot(ins))
      },
      // Also provide the snapshot format used in contracts
      vehicleSnapshot: vehicleSnapshot
    });

  } catch (error) {
    console.error('❌ Error fetching vehicle with insurance:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// ==================== VALIDATION ====================

const validateContractInput = (body) => {
  const errors = [];
  
  if (!body.clientId) errors.push('Client ID is required');
  if (!body.vehicleId) errors.push('Vehicle ID is required');
  if (!body.startDate) errors.push('Start date is required');
  if (!body.endDate) errors.push('End date is required');
  if (!body.startLocation) errors.push('Start location is required');
  if (!body.endLocation) errors.push('End location is required');
  
  // Validate payment methods if provided
  if (body.paymentMethods && Array.isArray(body.paymentMethods)) {
    body.paymentMethods.forEach((method, index) => {
      if (!method.type) {
        errors.push(`Payment method ${index + 1}: type is required`);
      }
      if (method.amount && method.amount < 0) {
        errors.push(`Payment method ${index + 1}: amount cannot be negative`);
      }
    });
  }
  
  // Validate reservoir data if provided
  if (body.reservoirEtat) {
    const { depart } = body.reservoirEtat;
    if (depart && depart.niveau !== undefined && (depart.niveau < 0 || depart.niveau > 100)) {
      errors.push('Reservoir departure level must be between 0 and 100');
    }
  }
  
  return errors;
};

// ==================== ROUTES ====================

/**
 * @route   POST /api/contrasmart
 * @desc    Create new smart contract with full info inheritance (including insurance)
 * @access  Private
 */
router.post('/', auth, async (req, res) => {
  try {
    const {
      clientId,
      vehicleId,
      smartCarId,
      insuranceId,                // Optional explicit insurance ID
      startDate,
      endDate,
      startLocation,
      endLocation,
      prixVoiture,
      prixTotal,
      sommeDesFrais,              // NEW: Sum of fees
      niveauReservoir,
      reservoirEtat,
      assurance,
      impot,
      dommages,
      paymentMethods,
      paymentInfo,
      methodPaiement,
      cardInfo,
      chequeInfo,
      conducteur,
      deliveryCost,
      dropOffCost,
      insuranceCost,
      babySeatCost,
      surveillanceCost,
      autresFrais,                // NEW: Other costs
      deposit,
      status,
      notes,
      internalNotes
    } = req.body;

    // Validate required fields
    const validationErrors = validateContractInput(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    // Fetch all related documents in parallel
    const [client, vehicle, partnerUser] = await Promise.all([
      Client.findById(clientId),
      SmartCar.findById(vehicleId),
      User.findById(req.user.id)
    ]);

    // Validate existence
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    if (!partnerUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // ==================== NEW: Fetch insurance information ====================
    let insurance = null;
    if (insuranceId) {
      // If an explicit insurance ID is provided, use it and verify it belongs to the user and vehicle
      insurance = await Insurance.findOne({
        _id: insuranceId,
        user: req.user.id,
        vehicleId: vehicleId
      });
    } else {
      // Otherwise, find the active insurance for this vehicle (if any) at the current date
      insurance = await Insurance.findOne({
        vehicleId: vehicleId,
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() },
        status: { $in: ['active', 'pending'] }
      }).sort({ createdAt: -1 });
    }

    // Build insurance snapshot (or null if no insurance found)
    const insuranceSnapshot = buildInsuranceSnapshot(insurance);

    // Check for overlapping contracts
    const overlappingContract = await SmartContract.findOne({
      vehicleId,
      status: { $in: ['pending', 'confirmed', 'active'] },
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) }
        }
      ]
    });

    if (overlappingContract) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle is already booked for the selected dates'
      });
    }

    // Calculate days
    const days = calculateDays(startDate, endDate);

    // UPDATED: Calculate financials with new fields
    const rentalCost = days * (parseNumber(prixVoiture) || vehicle.prixJour || 0);
    const calculatedSommeDesFrais = sommeDesFrais || (
      rentalCost +
      parseNumber(deliveryCost) +
      parseNumber(dropOffCost) +
      parseNumber(insuranceCost) +
      parseNumber(babySeatCost) +
      parseNumber(surveillanceCost) +
      parseNumber(autresFrais)
    );
    
    const tvaRate = parseNumber(impot?.tvaRate) || 0;
    const calculatedTVA = (calculatedSommeDesFrais * tvaRate) / 100;
    const calculatedTotal = parseNumber(prixTotal) || (calculatedSommeDesFrais + calculatedTVA);

    // Build reservoir state from frontend data
    let reservoirState = {
      depart: {
        niveau: parseInt(reservoirEtat?.depart?.niveau) || parseInt(niveauReservoir) || 0,
        km: parseNumber(reservoirEtat?.depart?.km) || vehicle.currentKilometer || 0,
        date: reservoirEtat?.depart?.date ? new Date(reservoirEtat.depart.date) : new Date(startDate) || new Date(),
        photos: reservoirEtat?.depart?.photos || [],
        signatureClient: reservoirEtat?.depart?.signatureClient || '',
        signatureAgent: reservoirEtat?.depart?.signatureAgent || ''
      },
      retour: {
        niveau: parseInt(reservoirEtat?.retour?.niveau) || 0,
        km: parseNumber(reservoirEtat?.retour?.km) || 0,
        date: reservoirEtat?.retour?.date ? new Date(reservoirEtat.retour.date) : null,
        photos: reservoirEtat?.retour?.photos || [],
        signatureClient: reservoirEtat?.retour?.signatureClient || '',
        signatureAgent: reservoirEtat?.retour?.signatureAgent || ''
      },
      consommation: {
        prixLitre: parseNumber(reservoirEtat?.consommation?.prixLitre) || 0,
        litresManquants: parseNumber(reservoirEtat?.consommation?.litresManquants) || 0,
        montantDu: parseNumber(reservoirEtat?.consommation?.montantDu) || 0,
        montantCharge: parseNumber(reservoirEtat?.consommation?.montantCharge) || 0
      }
    };

    // Build payment methods from frontend data
    let paymentMethodsData = [];
    let paymentInfoData = {};
    
    // Case 1: Direct paymentMethods array from frontend (NEW)
    if (paymentMethods && Array.isArray(paymentMethods) && paymentMethods.length > 0) {
      paymentMethodsData = paymentMethods.map(method => ({
        type: method.type || 'espece',
        amount: parseNumber(method.amount),
        status: method.status || 'pending',
        date: method.date ? new Date(method.date) : new Date(),
        reference: method.reference || '',
        cardInfo: method.cardInfo || {},
        chequeInfo: method.chequeInfo || {},
        virementInfo: method.virementInfo || {}
      }));
      
      const totalPaid = paymentMethodsData
        .filter(m => m.status === 'completed')
        .reduce((sum, m) => sum + m.amount, 0);
      
      const totalDue = calculatedTotal;
      
      paymentInfoData = {
        methods: paymentMethodsData,
        totalPaid,
        totalDue,
        balance: totalDue - totalPaid,
        currency: 'MAD',
        lastPaymentDate: paymentMethodsData.find(m => m.status === 'completed')?.date || null
      };
    } 
    // Case 2: paymentInfo object with methods array
    else if (paymentInfo && paymentInfo.methods && Array.isArray(paymentInfo.methods) && paymentInfo.methods.length > 0) {
      paymentMethodsData = paymentInfo.methods.map(method => ({
        type: method.type || 'espece',
        amount: parseNumber(method.amount),
        status: method.status || 'pending',
        date: method.date ? new Date(method.date) : new Date(),
        reference: method.reference || '',
        cardInfo: method.cardInfo || {},
        chequeInfo: method.chequeInfo || {},
        virementInfo: method.virementInfo || {}
      }));
      
      const totalPaid = paymentMethodsData
        .filter(m => m.status === 'completed')
        .reduce((sum, m) => sum + m.amount, 0);
      
      const totalDue = parseNumber(paymentInfo.totalDue) || calculatedTotal;
      
      paymentInfoData = {
        methods: paymentMethodsData,
        totalPaid,
        totalDue,
        balance: totalDue - totalPaid,
        currency: paymentInfo.currency || 'MAD',
        lastPaymentDate: paymentMethodsData.find(m => m.status === 'completed')?.date || null
      };
    } 
    // Case 3: Legacy format (single payment)
    else {
      const singlePayment = {
        type: methodPaiement || 'espece',
        amount: calculatedTotal,
        status: 'pending',
        date: new Date(),
        reference: '',
        cardInfo: cardInfo || {},
        chequeInfo: chequeInfo || {},
        virementInfo: {}
      };
      
      paymentMethodsData = [singlePayment];
      
      paymentInfoData = {
        methods: [singlePayment],
        totalPaid: 0,
        totalDue: calculatedTotal,
        balance: calculatedTotal,
        currency: 'MAD',
        lastPaymentDate: null
      };
    }

    // Build conducteur data
    const conducteurData = {
      nom: conducteur?.nom || '',
      prenom: conducteur?.prenom || '',
      cin: conducteur?.cin || '',
      permis: conducteur?.permis || '',
      dateDelivre: conducteur?.dateDelivre ? new Date(conducteur.dateDelivre) : null,
      dateNaissance: conducteur?.dateNaissance ? new Date(conducteur.dateNaissance) : null,
      nationalite: conducteur?.nationalite || ''
    };

    // Build additional costs - UPDATED with new fields
    const additionalCostsData = {
      deliveryCost: parseNumber(deliveryCost),
      dropOffCost: parseNumber(dropOffCost),
      insuranceCost: parseNumber(insuranceCost),
      babySeatCost: parseNumber(babySeatCost),
      surveillanceCost: parseNumber(surveillanceCost),
      autresFrais: parseNumber(autresFrais),        // NEW
      deposit: parseNumber(deposit),
      franchise: parseNumber(req.body.franchise) || 0,
      fraisDossier: parseNumber(req.body.fraisDossier) || 0
    };

    // Build taxes - UPDATED with tvaRate
    const impotData = {
      tvaRate: parseNumber(impot?.tvaRate),           // NEW: TVA percentage
      tva: parseNumber(impot?.tva) || calculatedTVA,  // Calculated or provided
      taxeSejour: parseNumber(impot?.taxeSejour),
      autresTaxes: parseNumber(impot?.autresTaxes)
    };

    // Build dommages
    const dommagesData = (dommages || []).map(d => ({
      id: d.id,
      emplacement: d.emplacement,
      description: d.description || '',
      type: d.type || 'leger',
      date: d.date ? new Date(d.date) : new Date()
    }));

    // UPDATED: Build vehicle snapshot with insurance info
    const vehicleSnapshot = await buildVehicleSnapshot(vehicle, req.user.id);

    // Build contract with inherited snapshots
    const contractData = {
      contractNumber: generateContractNumber(),
      
      // References
      clientId,
      vehicleId,
      smartCarId: smartCarId || vehicleId,
      createdBy: req.user.id,
      insuranceId: insurance ? insurance._id : null,
      
      // Contract details
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      days,
      startLocation,
      endLocation,
      
      // Pricing - UPDATED with new fields
      prixVoiture: parseNumber(prixVoiture),
      prixTotal: calculatedTotal,
      sommeDesFrais: calculatedSommeDesFrais,           // NEW
      
      // Vehicle condition
      niveauReservoir: reservoirState.depart.niveau || 0,
      reservoirEtat: reservoirState,
      
      // Structured data
      assurance: assurance || {},
      impot: impotData,
      dommages: dommagesData,
      
      // Enhanced payment info
      paymentMethods: paymentMethodsData,
      paymentInfo: paymentInfoData,
      
      // Legacy payment fields
      methodPaiement: paymentMethodsData[0]?.type || 'espece',
      cardInfo: cardInfo || {},
      chequeInfo: chequeInfo || {},
      
      // Driver info
      conducteur: conducteurData,
      
      // Additional costs - UPDATED
      additionalCosts: additionalCostsData,
      
      // Individual cost fields (backward compatibility)
      deliveryCost: parseNumber(deliveryCost),
      dropOffCost: parseNumber(dropOffCost),
      insuranceCost: parseNumber(insuranceCost),
      babySeatCost: parseNumber(babySeatCost),
      surveillanceCost: parseNumber(surveillanceCost),
      autresFrais: parseNumber(autresFrais),           // NEW
      deposit: parseNumber(deposit),
      
      status: status || 'pending',
      notes: notes || '',
      internalNotes: internalNotes || '',
      entreprise: req.user.entreprise,
      
      // Inherited snapshots - CRITICAL FOR PRINTING
      clientSnapshot: buildClientSnapshot(client),
      vehicleSnapshot: vehicleSnapshot,                 // UPDATED: Now includes insurance
      entrepriseSnapshot: buildEnterpriseSnapshot(partnerUser),
      insuranceSnapshot: insuranceSnapshot,             // NEW
      
      // Initial history entry
      history: [{
        action: 'CONTRACT_CREATED',
        performedBy: req.user.id,
        performedByName: req.user.name || 'System',
        date: new Date(),
        details: { 
          status: status || 'pending',
          vehicleMatricule: vehicle.numeroMatricule,
          clientName: `${client.firstName} ${client.lastName}`,
          paymentMethods: paymentMethodsData.length,
          totalAmount: calculatedTotal,
          hasInsurance: !!insurance,
          insuranceCompany: insurance?.company || null
        }
      }]
    };

    // Create and save contract
    const newContract = new SmartContract(contractData);
    const savedContract = await newContract.save();

    // Update vehicle status if needed
    if (['pending', 'confirmed', 'active'].includes(status)) {
      await SmartCar.findByIdAndUpdate(vehicleId, { status: 'reserved' });
    }

    // Populate snapshots for response
    const populatedContract = await SmartContract.findById(savedContract._id)
      .populate('clientId', 'firstName lastName cin phone email')
      .populate('vehicleId', 'nomVehicule numeroMatricule typeVehicule prixJour status imageVehicule')
      .populate('createdBy', 'name email')
      .populate('insuranceId', 'company policyNumber');

    res.status(201).json({
      success: true,
      message: 'Smart contract created successfully',
      smartContract: populatedContract
    });

  } catch (error) {
    console.error('❌ Error creating smart contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/contrasmart
 * @desc    Get all smart contracts with populated references and snapshots
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const { status, clientId, vehicleId, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    // Build filter
    const filter = { 
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    };
    
    if (status) filter.status = status;
    if (clientId) filter.clientId = clientId;
    if (vehicleId) filter.vehicleId = vehicleId;
    if (startDate && endDate) {
      filter.startDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const contracts = await SmartContract.find(filter)
      .populate('clientId', 'firstName lastName cin phone email')
      .populate('vehicleId', 'nomVehicule numeroMatricule typeVehicule prixJour status imageVehicule currentKilometer')
      .populate('createdBy', 'name email')
      .populate('insuranceId', 'company policyNumber startDate endDate')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    // Ensure all contracts have snapshots for printing
    const contractsWithSnapshots = await Promise.all(contracts.map(async (contract) => {
      const contractObj = contract.toObject();
      
      // If snapshots are missing, create them from populated data
      if (!contractObj.clientSnapshot && contractObj.clientId) {
        contractObj.clientSnapshot = buildClientSnapshot(contractObj.clientId);
      }
      if (!contractObj.vehicleSnapshot && contractObj.vehicleId) {
        contractObj.vehicleSnapshot = await buildVehicleSnapshot(contractObj.vehicleId, req.user.id);
      }
      if (!contractObj.entrepriseSnapshot && contractObj.createdBy) {
        contractObj.entrepriseSnapshot = buildEnterpriseSnapshot(contractObj.createdBy);
      }
      
      return contractObj;
    }));

    const count = await SmartContract.countDocuments(filter);

    res.json({
      success: true,
      contrasmarts: contractsWithSnapshots,
      count: contractsWithSnapshots.length,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });

  } catch (error) {
    console.error('❌ Error fetching smart contracts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/contrasmart/:id
 * @desc    Get single smart contract with full details and snapshots
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const contract = await SmartContract.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    })
      .populate('clientId', 'firstName lastName cin phone email address passport licenseNumber licenseIssueDate birthDate nationality emergencyContact')
      .populate('vehicleId', 'nomVehicule numeroMatricule typeVehicule prixJour status imageVehicule currentKilometer boiteVitesse typeCarburant prixHebdo prixMensuel caution nombrePlaces nombrePortes cylindree puissanceFiscale photos equipementsAudio etatExterieur etatInterieur proprete')
      .populate('createdBy', 'name email entreprise number logoEntreprise country city address siret tvaNumber')
      .populate('history.performedBy', 'name email')
      .populate('insuranceId', 'company policyNumber startDate endDate cost status coverage notes vehicleSnapshot');

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Smart contract not found'
      });
    }

    // Convert to object to manipulate
    let contractObj = contract.toObject();

    // Ensure snapshots exist for printing - if missing, build from populated data
    if (!contractObj.clientSnapshot && contractObj.clientId) {
      contractObj.clientSnapshot = buildClientSnapshot(contractObj.clientId);
    }
    
    if (!contractObj.vehicleSnapshot && contractObj.vehicleId) {
      contractObj.vehicleSnapshot = await buildVehicleSnapshot(contractObj.vehicleId, req.user.id);
    }
    
    if (!contractObj.entrepriseSnapshot && contractObj.createdBy) {
      contractObj.entrepriseSnapshot = buildEnterpriseSnapshot(contractObj.createdBy);
    }

    // Also provide clientInfo and vehicleInfo aliases for frontend compatibility
    contractObj.clientInfo = contractObj.clientSnapshot || contractObj.clientId;
    contractObj.vehicleInfo = contractObj.vehicleSnapshot || contractObj.vehicleId;

    res.json({
      success: true,
      smartContract: contractObj
    });

  } catch (error) {
    console.error('❌ Error fetching smart contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   PUT /api/contrasmart/:id
 * @desc    Update smart contract (preserves snapshots, updates mutable fields)
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      startLocation,
      endLocation,
      prixVoiture,
      prixTotal,
      sommeDesFrais,
      niveauReservoir,
      reservoirEtat,
      assurance,
      impot,
      dommages,
      paymentMethods,
      paymentInfo,
      methodPaiement,
      cardInfo,
      chequeInfo,
      conducteur,
      deliveryCost,
      dropOffCost,
      insuranceCost,
      babySeatCost,
      surveillanceCost,
      autresFrais,
      deposit,
      status,
      notes,
      internalNotes
    } = req.body;

    // Find existing contract
    let contract = await SmartContract.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Smart contract not found'
      });
    }

    // Check for overlapping contracts if dates changed
    if (startDate || endDate) {
      const checkStart = startDate ? new Date(startDate) : contract.startDate;
      const checkEnd = endDate ? new Date(endDate) : contract.endDate;
      
      const overlappingContract = await SmartContract.findOne({
        vehicleId: contract.vehicleId,
        _id: { $ne: req.params.id },
        status: { $in: ['pending', 'confirmed', 'active'] },
        $or: [
          {
            startDate: { $lte: checkEnd },
            endDate: { $gte: checkStart }
          }
        ]
      });

      if (overlappingContract) {
        return res.status(400).json({
          success: false,
          message: 'Vehicle is already booked for the selected dates'
        });
      }
    }

    // Build update object (snapshots remain immutable)
    const updateData = {};
    
    // Update dates if provided
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    
    // Recalculate days if dates changed
    if (startDate || endDate) {
      updateData.days = calculateDays(
        startDate || contract.startDate,
        endDate || contract.endDate
      );
    }
    
    // Update locations
    if (startLocation) updateData.startLocation = startLocation;
    if (endLocation) updateData.endLocation = endLocation;
    
    // Update pricing
    if (prixVoiture !== undefined) updateData.prixVoiture = parseNumber(prixVoiture);
    if (prixTotal !== undefined) updateData.prixTotal = parseNumber(prixTotal);
    if (sommeDesFrais !== undefined) updateData.sommeDesFrais = parseNumber(sommeDesFrais); // NEW
    
    // Update reservoir state
    if (niveauReservoir !== undefined) updateData.niveauReservoir = parseInt(niveauReservoir);
    
    if (reservoirEtat) {
      updateData.reservoirEtat = {
        depart: {
          ...contract.reservoirEtat?.depart,
          ...(reservoirEtat.depart && {
            niveau: reservoirEtat.depart.niveau !== undefined ? parseInt(reservoirEtat.depart.niveau) : contract.reservoirEtat?.depart?.niveau,
            km: reservoirEtat.depart.km !== undefined ? parseNumber(reservoirEtat.depart.km) : contract.reservoirEtat?.depart?.km,
            date: reservoirEtat.depart.date ? new Date(reservoirEtat.depart.date) : contract.reservoirEtat?.depart?.date,
            photos: reservoirEtat.depart.photos || contract.reservoirEtat?.depart?.photos,
            signatureClient: reservoirEtat.depart.signatureClient || contract.reservoirEtat?.depart?.signatureClient,
            signatureAgent: reservoirEtat.depart.signatureAgent || contract.reservoirEtat?.depart?.signatureAgent
          })
        },
        retour: {
          ...contract.reservoirEtat?.retour,
          ...(reservoirEtat.retour && {
            niveau: reservoirEtat.retour.niveau !== undefined ? parseInt(reservoirEtat.retour.niveau) : contract.reservoirEtat?.retour?.niveau,
            km: reservoirEtat.retour.km !== undefined ? parseNumber(reservoirEtat.retour.km) : contract.reservoirEtat?.retour?.km,
            date: reservoirEtat.retour.date ? new Date(reservoirEtat.retour.date) : contract.reservoirEtat?.retour?.date,
            photos: reservoirEtat.retour.photos || contract.reservoirEtat?.retour?.photos,
            signatureClient: reservoirEtat.retour.signatureClient || contract.reservoirEtat?.retour?.signatureClient,
            signatureAgent: reservoirEtat.retour.signatureAgent || contract.reservoirEtat?.retour?.signatureAgent
          })
        },
        consommation: {
          ...contract.reservoirEtat?.consommation,
          ...(reservoirEtat.consommation && {
            prixLitre: reservoirEtat.consommation.prixLitre !== undefined ? parseNumber(reservoirEtat.consommation.prixLitre) : contract.reservoirEtat?.consommation?.prixLitre,
            litresManquants: reservoirEtat.consommation.litresManquants !== undefined ? parseNumber(reservoirEtat.consommation.litresManquants) : contract.reservoirEtat?.consommation?.litresManquants,
            montantDu: reservoirEtat.consommation.montantDu !== undefined ? parseNumber(reservoirEtat.consommation.montantDu) : contract.reservoirEtat?.consommation?.montantDu,
            montantCharge: reservoirEtat.consommation.montantCharge !== undefined ? parseNumber(reservoirEtat.consommation.montantCharge) : contract.reservoirEtat?.consommation?.montantCharge
          })
        }
      };
    }
    
    // Update structured objects
    if (assurance) updateData.assurance = { ...contract.assurance, ...assurance };
    
    if (impot) {
      updateData.impot = {
        tvaRate: impot.tvaRate !== undefined ? parseNumber(impot.tvaRate) : contract.impot?.tvaRate, // NEW
        tva: impot.tva !== undefined ? parseNumber(impot.tva) : contract.impot?.tva,
        taxeSejour: impot.taxeSejour !== undefined ? parseNumber(impot.taxeSejour) : contract.impot?.taxeSejour,
        autresTaxes: impot.autresTaxes !== undefined ? parseNumber(impot.autresTaxes) : contract.impot?.autresTaxes
      };
    }
    
    if (dommages) {
      updateData.dommages = dommages.map(d => ({
        id: d.id,
        emplacement: d.emplacement,
        description: d.description || '',
        type: d.type || 'leger',
        date: d.date ? new Date(d.date) : new Date()
      }));
    }
    
    // Update payment info with support for new paymentMethods array
    if (paymentMethods && Array.isArray(paymentMethods)) {
      // Replace all payment methods with new ones
      const newMethods = paymentMethods.map(method => ({
        type: method.type || 'espece',
        amount: parseNumber(method.amount),
        status: method.status || 'pending',
        date: method.date ? new Date(method.date) : new Date(),
        reference: method.reference || '',
        cardInfo: method.cardInfo || {},
        chequeInfo: method.chequeInfo || {},
        virementInfo: method.virementInfo || {}
      }));
      
      const totalPaid = newMethods
        .filter(m => m.status === 'completed')
        .reduce((sum, m) => sum + m.amount, 0);
      
      const totalDue = parseNumber(prixTotal || contract.prixTotal);
      
      updateData.paymentMethods = newMethods;
      updateData.paymentInfo = {
        methods: newMethods,
        totalPaid,
        totalDue,
        balance: totalDue - totalPaid,
        currency: contract.paymentInfo?.currency || 'MAD',
        lastPaymentDate: newMethods.find(m => m.status === 'completed')?.date || contract.paymentInfo?.lastPaymentDate
      };
      
      // Update legacy field
      updateData.methodPaiement = newMethods[0]?.type || 'espece';
    } else if (paymentInfo) {
      // Handle paymentInfo object update
      if (paymentInfo.methods && Array.isArray(paymentInfo.methods)) {
        const existingMethods = contract.paymentMethods || contract.paymentInfo?.methods || [];
        const newMethods = paymentInfo.methods.map(method => ({
          type: method.type || 'espece',
          amount: parseNumber(method.amount),
          status: method.status || 'pending',
          date: method.date ? new Date(method.date) : new Date(),
          reference: method.reference || '',
          cardInfo: method.cardInfo || {},
          chequeInfo: method.chequeInfo || {},
          virementInfo: method.virementInfo || {}
        }));
        
        const allMethods = [...existingMethods, ...newMethods];
        const totalPaid = allMethods
          .filter(m => m.status === 'completed')
          .reduce((sum, m) => sum + m.amount, 0);
        
        updateData.paymentMethods = allMethods;
        updateData.paymentInfo = {
          methods: allMethods,
          totalPaid,
          totalDue: parseNumber(paymentInfo.totalDue || contract.prixTotal),
          balance: parseNumber(paymentInfo.totalDue || contract.prixTotal) - totalPaid,
          currency: paymentInfo.currency || contract.paymentInfo?.currency || 'MAD',
          lastPaymentDate: allMethods.find(m => m.status === 'completed')?.date || contract.paymentInfo?.lastPaymentDate
        };
      }
    }
    
    // Legacy payment fields
    if (methodPaiement) updateData.methodPaiement = methodPaiement;
    if (cardInfo) updateData.cardInfo = { ...contract.cardInfo, ...cardInfo };
    if (chequeInfo) updateData.chequeInfo = { ...contract.chequeInfo, ...chequeInfo };
    
    // Update conducteur
    if (conducteur) {
      updateData.conducteur = {
        ...contract.conducteur,
        nom: conducteur.nom !== undefined ? conducteur.nom : contract.conducteur?.nom,
        prenom: conducteur.prenom !== undefined ? conducteur.prenom : contract.conducteur?.prenom,
        cin: conducteur.cin !== undefined ? conducteur.cin : contract.conducteur?.cin,
        permis: conducteur.permis !== undefined ? conducteur.permis : contract.conducteur?.permis,
        dateDelivre: conducteur.dateDelivre ? new Date(conducteur.dateDelivre) : contract.conducteur?.dateDelivre,
        dateNaissance: conducteur.dateNaissance ? new Date(conducteur.dateNaissance) : contract.conducteur?.dateNaissance,
        nationalite: conducteur.nationalite !== undefined ? conducteur.nationalite : contract.conducteur?.nationalite
      };
    }
    
    // Update additional costs
    const hasCostUpdates = [
      'deliveryCost', 'dropOffCost', 'insuranceCost', 
      'babySeatCost', 'surveillanceCost', 'autresFrais', 'deposit'
    ].some(field => req.body[field] !== undefined);
    
    if (hasCostUpdates) {
      const additionalCosts = {
        ...contract.additionalCosts,
        ...(deliveryCost !== undefined && { deliveryCost: parseNumber(deliveryCost) }),
        ...(dropOffCost !== undefined && { dropOffCost: parseNumber(dropOffCost) }),
        ...(insuranceCost !== undefined && { insuranceCost: parseNumber(insuranceCost) }),
        ...(babySeatCost !== undefined && { babySeatCost: parseNumber(babySeatCost) }),
        ...(surveillanceCost !== undefined && { surveillanceCost: parseNumber(surveillanceCost) }),
        ...(autresFrais !== undefined && { autresFrais: parseNumber(autresFrais) }), // NEW
        ...(deposit !== undefined && { deposit: parseNumber(deposit) })
      };
      
      updateData.additionalCosts = additionalCosts;
      
      // Update individual fields
      if (deliveryCost !== undefined) updateData.deliveryCost = parseNumber(deliveryCost);
      if (dropOffCost !== undefined) updateData.dropOffCost = parseNumber(dropOffCost);
      if (insuranceCost !== undefined) updateData.insuranceCost = parseNumber(insuranceCost);
      if (babySeatCost !== undefined) updateData.babySeatCost = parseNumber(babySeatCost);
      if (surveillanceCost !== undefined) updateData.surveillanceCost = parseNumber(surveillanceCost);
      if (autresFrais !== undefined) updateData.autresFrais = parseNumber(autresFrais); // NEW
      if (deposit !== undefined) updateData.deposit = parseNumber(deposit);
    }
    
    // Update status and notes
    if (status) {
      updateData.status = status;
      
      // Add to history if status changed
      if (status !== contract.status) {
        updateData.$push = {
          history: {
            action: 'STATUS_CHANGED',
            performedBy: req.user.id,
            performedByName: req.user.name || 'System',
            date: new Date(),
            details: { 
              oldStatus: contract.status, 
              newStatus: status 
            }
          }
        };
      }
    }
    
    if (notes !== undefined) updateData.notes = notes;
    if (internalNotes !== undefined) updateData.internalNotes = internalNotes;

    // Apply updates
    contract = await SmartContract.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    // Update vehicle status based on contract status
    if (status) {
      const vehicleStatus = ['pending', 'confirmed', 'active'].includes(status) ? 'reserved' : 'disponible';
      await SmartCar.findByIdAndUpdate(contract.vehicleId, { status: vehicleStatus });
    }

    // Populate for response
    const populatedContract = await SmartContract.findById(contract._id)
      .populate('clientId', 'firstName lastName cin phone email')
      .populate('vehicleId', 'nomVehicule numeroMatricule typeVehicule prixJour status imageVehicule')
      .populate('createdBy', 'name email')
      .populate('insuranceId', 'company policyNumber');

    res.json({
      success: true,
      message: 'Smart contract updated successfully',
      smartContract: populatedContract
    });

  } catch (error) {
    console.error('❌ Error updating smart contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/contrasmart/:id/payment
 * @desc    Add payment to contract
 * @access  Private
 */
router.post('/:id/payment', auth, async (req, res) => {
  try {
    const { type, amount, status, reference, cardInfo, chequeInfo, virementInfo } = req.body;
    
    if (!type || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Payment type and amount are required'
      });
    }

    const contract = await SmartContract.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Smart contract not found'
      });
    }

    const paymentData = {
      type,
      amount: parseNumber(amount),
      status: status || 'completed',
      date: new Date(),
      reference: reference || '',
      cardInfo: cardInfo || {},
      chequeInfo: chequeInfo || {},
      virementInfo: virementInfo || {}
    };

    // Add payment using schema method
    contract.addPayment(paymentData);
    contract.addHistory('PAYMENT_ADDED', req.user.id, req.user.name || 'System', {
      amount: paymentData.amount,
      type: paymentData.type,
      reference: paymentData.reference,
      status: paymentData.status
    });

    await contract.save();

    res.json({
      success: true,
      message: 'Payment added successfully',
      smartContract: contract
    });

  } catch (error) {
    console.error('❌ Error adding payment:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/contrasmart/:id/checkout
 * @desc    Process vehicle checkout (departure)
 * @access  Private
 */
router.post('/:id/checkout', auth, async (req, res) => {
  try {
    const { kmDepart, reservoirNiveau, photos, signatureClient, signatureAgent } = req.body;
    
    let contract = await SmartContract.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Smart contract not found'
      });
    }

    const updateData = {
      'workflow.departureDate': new Date(),
      'workflow.checkoutCompleted': true,
      status: 'active',
      'reservoirEtat.depart.km': parseNumber(kmDepart),
      'reservoirEtat.depart.niveau': parseInt(reservoirNiveau) || 0,
      'reservoirEtat.depart.date': new Date(),
      'reservoirEtat.depart.photos': photos || [],
      'reservoirEtat.depart.signatureClient': signatureClient || '',
      'reservoirEtat.depart.signatureAgent': signatureAgent || '',
      niveauReservoir: parseInt(reservoirNiveau) || 0
    };

    contract = await SmartContract.findByIdAndUpdate(
      req.params.id,
      { 
        $set: updateData,
        $push: {
          history: {
            action: 'VEHICLE_CHECKOUT',
            performedBy: req.user.id,
            performedByName: req.user.name || 'System',
            date: new Date(),
            details: { kmDepart, reservoirNiveau }
          }
        }
      },
      { new: true }
    );

    // Update vehicle status and km
    await SmartCar.findByIdAndUpdate(contract.vehicleId, {
      status: 'rented',
      kmDepart: parseNumber(kmDepart),
      currentKilometer: parseNumber(kmDepart)
    });

    res.json({
      success: true,
      message: 'Checkout completed successfully',
      smartContract: contract
    });

  } catch (error) {
    console.error('❌ Error during checkout:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   POST /api/contrasmart/:id/checkin
 * @desc    Process vehicle return (checkin)
 * @access  Private
 */
router.post('/:id/checkin', auth, async (req, res) => {
  try {
    const { 
      kmRetour, 
      reservoirNiveau, 
      photos, 
      signatureClient, 
      signatureAgent,
      dommages,
      prixLitre,
      litresManquants,
      montantCharge
    } = req.body;
    
    let contract = await SmartContract.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Smart contract not found'
      });
    }

    const kmDepart = contract.reservoirEtat?.depart?.km || 0;
    const distanceTraveled = parseNumber(kmRetour) - kmDepart;

    const updateData = {
      'workflow.returnDate': new Date(),
      'workflow.checkinCompleted': true,
      status: 'completed',
      'reservoirEtat.retour.km': parseNumber(kmRetour),
      'reservoirEtat.retour.niveau': parseInt(reservoirNiveau) || 0,
      'reservoirEtat.retour.date': new Date(),
      'reservoirEtat.retour.photos': photos || [],
      'reservoirEtat.retour.signatureClient': signatureClient || '',
      'reservoirEtat.retour.signatureAgent': signatureAgent || '',
      'reservoirEtat.consommation.prixLitre': parseNumber(prixLitre) || 0,
      'reservoirEtat.consommation.litresManquants': parseNumber(litresManquants) || 0,
      'reservoirEtat.consommation.montantCharge': parseNumber(montantCharge) || 0
    };

    // Build push operations
    const pushOperations = {
      history: {
        action: 'VEHICLE_CHECKIN',
        performedBy: req.user.id,
        performedByName: req.user.name || 'System',
        date: new Date(),
        details: { 
          kmRetour, 
          reservoirNiveau, 
          distanceTraveled,
          litresManquants,
          montantCharge
        }
      }
    };
    
    // Add damages if provided
    if (dommages && dommages.length > 0) {
      pushOperations.dommages = { $each: dommages };
    }

    contract = await SmartContract.findByIdAndUpdate(
      req.params.id,
      { 
        $set: updateData,
        $push: pushOperations
      },
      { new: true }
    );

    // Update vehicle status and km
    await SmartCar.findByIdAndUpdate(contract.vehicleId, {
      status: 'disponible',
      kmRetour: parseNumber(kmRetour),
      currentKilometer: parseNumber(kmRetour)
    });

    res.json({
      success: true,
      message: 'Checkin completed successfully',
      smartContract: contract,
      summary: {
        distanceTraveled,
        reservoirDifference: (contract.reservoirEtat?.depart?.niveau || 0) - (parseInt(reservoirNiveau) || 0),
        fuelCharge: parseNumber(montantCharge) || 0
      }
    });

  } catch (error) {
    console.error('❌ Error during checkin:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   DELETE /api/contrasmart/:id
 * @desc    Delete smart contract and free vehicle
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const contract = await SmartContract.findOne({
      _id: req.params.id,
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ]
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Smart contract not found'
      });
    }

    // Free up the vehicle
    await SmartCar.findByIdAndUpdate(contract.vehicleId, {
      status: 'disponible'
    });

    await SmartContract.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Smart contract deleted successfully'
    });

  } catch (error) {
    console.error('❌ Error deleting smart contract:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

/**
 * @route   GET /api/contrasmart/stats/overview
 * @desc    Get contract statistics
 * @access  Private
 */
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const stats = await SmartContract.aggregate([
      { 
        $match: { 
          $or: [
            { createdBy: req.user._id },
            { entreprise: req.user.entreprise }
          ]
        } 
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$prixTotal' },
          totalPaid: { $sum: '$paymentInfo.totalPaid' },
          totalBalance: { $sum: '$paymentInfo.balance' }
        }
      }
    ]);

    const upcoming = await SmartContract.countDocuments({
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ],
      startDate: { $gte: new Date() },
      status: { $in: ['pending', 'confirmed'] }
    });

    const active = await SmartContract.countDocuments({
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ],
      status: 'active'
    });

    const overdue = await SmartContract.countDocuments({
      $or: [
        { createdBy: req.user.id },
        { entreprise: req.user.entreprise }
      ],
      endDate: { $lt: new Date() },
      status: { $in: ['active', 'confirmed'] }
    });

    res.json({
      success: true,
      stats: {
        byStatus: stats,
        upcoming,
        active,
        overdue
      }
    });

  } catch (error) {
    console.error('❌ Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;