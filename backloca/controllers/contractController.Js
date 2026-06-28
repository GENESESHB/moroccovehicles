const Contract = require('../models/Contract');
const Blacklist = require('../models/Blacklist');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

exports.createContract = async (req, res) => {
  try {
    const {
      // Complete contract structure from frontend
      clientInfo,
      secondDriverInfo,
      partnerInfo,
      vehicleInfo,
      rentalInfo,
      contractMetadata
    } = req.body;

    console.log('📥 Données complètes reçues pour le contrat:', req.body);
    console.log('👤 User ID from token:', req.user.id);

    // Fetch the complete user information from database for verification
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }

    console.log('👤 Utilisateur trouvé:', {
      id: user._id,
      name: user.name,
      entreprise: user.entreprise,
      email: user.email
    });

    // Verify vehicle exists and belongs to the current user
    const vehicle = await Vehicle.findById(vehicleInfo.vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule non trouvé'
      });
    }

    console.log('🚗 Véhicule trouvé:', {
      id: vehicle._id,
      name: vehicle.name,
      type: vehicle.type,
      partnerId: vehicle.partnerId
    });

    // Verify that the vehicle belongs to the current user
    if (vehicle.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce véhicule'
      });
    }

    // Check vehicle availability for the selected dates
    const overlappingContracts = await Contract.find({
      'vehicleInfo.vehicleId': vehicleInfo.vehicleId,
      'rentalInfo.startDateTime': { $lt: new Date(rentalInfo.endDateTime) },
      'rentalInfo.endDateTime': { $gt: new Date(rentalInfo.startDateTime) },
      status: { $in: ['pending', 'active'] }
    });

    if (overlappingContracts.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Le véhicule n\'est pas disponible pour ces dates',
        conflictingDates: overlappingContracts.map(contract => ({
          start: contract.rentalInfo.startDateTime,
          end: contract.rentalInfo.endDateTime
        }))
      });
    }

    // Check blacklist using CIN or passport
    if (clientInfo.cin || clientInfo.passport) {
      const isBlacklisted = await Blacklist.findOne({
        $or: [
          { cin: clientInfo.cin },
          { passport: clientInfo.passport },
          { licenseNumber: clientInfo.licenseNumber }
        ]
      });
      
      if (isBlacklisted) {
        return res.status(400).json({
          success: false,
          message: 'Ce client est dans la liste noire! Contrat non autorisé.'
        });
      }
    }

    // Calculate rental cost
    const rentalCost = rentalInfo.rentalCost || (rentalInfo.rentalDays * rentalInfo.prixParJour);
    
    // Calculate subtotal
    const subtotal = rentalInfo.subtotal || 
      (rentalCost + 
       (rentalInfo.deliveryCost || 0) + 
       (rentalInfo.dropOffCost || 0) + 
       (rentalInfo.insuranceCost || 0) + 
       (rentalInfo.babySeatCost || 0) + 
       (rentalInfo.surveillanceCost || 0));
    
    // Calculate total
    const prixTotal = rentalInfo.prixTotal || (subtotal + (rentalInfo.tva || 0));

    // Create complete contract data
    const contractData = {
      // 1. Partner/User Information (from database for accuracy)
      partnerInfo: {
        partnerId: user._id,
        partnerName: user.entreprise || user.name,
        partnerEmail: user.email,
        partnerPhone: user.number,
        partnerLogo: user.logoEntreprise,
        partnerCountry: user.country,
        partnerCity: user.city,
        partnerStatus: user.status,
        partnerRole: user.role,
        partnerCreatedAt: user.createdAt,
        partnerUpdatedAt: user.updatedAt
      },

      // 2. Client/Locataire Information
      clientInfo: {
        lastName: clientInfo.lastName,
        firstName: clientInfo.firstName,
        birthDate: new Date(clientInfo.birthDate),
        phone: clientInfo.phone,
        address: clientInfo.address,
        passport: clientInfo.passport || '',
        cin: clientInfo.cin || '',
        licenseNumber: clientInfo.licenseNumber,
        licenseIssueDate: new Date(clientInfo.licenseIssueDate)
      },

      // 3. Second Driver Information
      secondDriverInfo: {
        lastName: secondDriverInfo.lastName || '',
        firstName: secondDriverInfo.firstName || '',
        licenseNumber: secondDriverInfo.licenseNumber || '',
        licenseIssueDate: secondDriverInfo.licenseIssueDate ? 
          new Date(secondDriverInfo.licenseIssueDate) : null
      },

      // 4. Complete Vehicle Information (from database for accuracy)
      vehicleInfo: {
        vehicleId: vehicle._id,
        name: vehicle.name,
        type: vehicle.type,
        boiteVitesse: vehicle.boiteVitesse,
        description: vehicle.description,
        image: vehicle.image,
        pricePerDay: vehicle.pricePerDay,
        carburant: vehicle.carburant,
        niveauReservoir: vehicle.niveauReservoir,
        radio: vehicle.radio,
        gps: vehicle.gps,
        mp3: vehicle.mp3,
        cd: vehicle.cd,
        matricule: vehicle.matricule,
        kmDepart: vehicle.kmDepart,
        kmRetour: vehicle.kmRetour,
        impot2026: vehicle.impot2026,
        impot2027: vehicle.impot2027,
        impot2028: vehicle.impot2028,
        impot2029: vehicle.impot2029,
        assuranceStartDate: vehicle.assuranceStartDate,
        assuranceEndDate: vehicle.assuranceEndDate,
        vidangeInterval: vehicle.vidangeInterval,
        remarques: vehicle.remarques,
        dommages: vehicle.dommages,
        available: vehicle.available,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt
      },

      // 5. Complete Rental Information with all costs
      rentalInfo: {
        startDateTime: new Date(rentalInfo.startDateTime),
        endDateTime: new Date(rentalInfo.endDateTime),
        startLocation: rentalInfo.startLocation,
        endLocation: rentalInfo.endLocation,
        prixParJour: rentalInfo.prixParJour,
        rentalDays: rentalInfo.rentalDays,
        rentalCost: rentalCost,
        
        // Additional costs
        deliveryCost: rentalInfo.deliveryCost || 0,
        dropOffCost: rentalInfo.dropOffCost || 0,
        insuranceCost: rentalInfo.insuranceCost || 0,
        babySeatCost: rentalInfo.babySeatCost || 0,
        surveillanceCost: rentalInfo.surveillanceCost || 0,
        tva: rentalInfo.tva || 0,
        deposit: rentalInfo.deposit || 0,
        
        // Calculated totals
        subtotal: subtotal,
        prixTotal: prixTotal
      },

      // 6. Contract Metadata
      contractMetadata: {
        createdBy: user._id,
        createdAt: new Date().toISOString(),
        status: 'pending'
      },

      // Main status
      status: 'pending'
    };

    console.log('📄 Contrat complet à créer avec tous les coûts:', {
      client: `${contractData.clientInfo.firstName} ${contractData.clientInfo.lastName}`,
      vehicle: contractData.vehicleInfo.name,
      dates: `${contractData.rentalInfo.startDateTime} to ${contractData.rentalInfo.endDateTime}`,
      rentalCost: contractData.rentalInfo.rentalCost,
      additionalCosts: {
        delivery: contractData.rentalInfo.deliveryCost,
        dropOff: contractData.rentalInfo.dropOffCost,
        insurance: contractData.rentalInfo.insuranceCost,
        babySeat: contractData.rentalInfo.babySeatCost,
        surveillance: contractData.rentalInfo.surveillanceCost,
        tva: contractData.rentalInfo.tva,
        deposit: contractData.rentalInfo.deposit
      },
      subtotal: contractData.rentalInfo.subtotal,
      total: contractData.rentalInfo.prixTotal
    });

    // Create and save the contract
    const contract = new Contract(contractData);
    await contract.save();

    console.log('✅ Contrat créé avec succès avec tous les coûts:', {
      contractId: contract._id,
      client: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
      vehicle: contract.vehicleInfo.name,
      rentalCost: contract.rentalInfo.rentalCost,
      additionalCosts: {
        delivery: contract.rentalInfo.deliveryCost,
        dropOff: contract.rentalInfo.dropOffCost,
        insurance: contract.rentalInfo.insuranceCost,
        babySeat: contract.rentalInfo.babySeatCost,
        surveillance: contract.rentalInfo.surveillanceCost,
        tva: contract.rentalInfo.tva,
        deposit: contract.rentalInfo.deposit
      },
      subtotal: contract.rentalInfo.subtotal,
      total: contract.rentalInfo.prixTotal
    });

    res.status(201).json({
      success: true,
      message: 'Contrat créé avec succès avec tous les coûts',
      contract: contract
    });
  } catch (error) {
    console.error('❌ Erreur création contrat:', error);

    // More detailed error information
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Numéro de contrat déjà existant'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la création du contrat',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getMyContracts = async (req, res) => {
  try {
    console.log('📋 Récupération des contrats pour user ID:', req.user.id);

    const { status, page = 1, limit = 10 } = req.query;

    let query = { 'partnerInfo.partnerId': req.user.id };

    // Filter by status if provided
    if (status && status !== 'all') {
      query.status = status;
    }

    const contracts = await Contract.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Contract.countDocuments(query);

    console.log(`✅ ${contracts.length} contrats trouvés`);

    res.json({
      success: true,
      contracts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('❌ Erreur récupération contrats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des contrats'
    });
  }
};

exports.getContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contrat non trouvé'
      });
    }

    // Check if the contract belongs to the current user
    if (contract.partnerInfo.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce contrat'
      });
    }

    res.json({
      success: true,
      contract
    });
  } catch (error) {
    console.error('❌ Erreur récupération contrat:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
};

exports.updateContract = async (req, res) => {
  try {
    const {
      clientInfo,
      secondDriverInfo,
      vehicleInfo,
      rentalInfo,
      status
    } = req.body;

    console.log('📝 Mise à jour du contrat:', req.params.id);

    // Find existing contract
    const existingContract = await Contract.findById(req.params.id);
    if (!existingContract) {
      return res.status(404).json({
        success: false,
        message: 'Contrat non trouvé'
      });
    }

    // Check if the contract belongs to the current user
    if (existingContract.partnerInfo.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce contrat'
      });
    }

    // Validate dates
    const start = rentalInfo?.startDateTime ? new Date(rentalInfo.startDateTime) : existingContract.rentalInfo.startDateTime;
    const end = rentalInfo?.endDateTime ? new Date(rentalInfo.endDateTime) : existingContract.rentalInfo.endDateTime;

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: 'La date de fin doit être après la date de début'
      });
    }

    // Check if vehicle is changed
    let vehicle = null;
    const vehicleChanged = vehicleInfo?.vehicleId && 
      vehicleInfo.vehicleId !== existingContract.vehicleInfo.vehicleId.toString();

    if (vehicleChanged) {
      vehicle = await Vehicle.findById(vehicleInfo.vehicleId);
      if (!vehicle || vehicle.partnerId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Accès non autorisé à ce véhicule'
        });
      }
    }

    // Check for overlapping contracts if dates or vehicle changed
    const datesChanged = rentalInfo?.startDateTime || rentalInfo?.endDateTime;
    if (datesChanged || vehicleChanged) {
      const targetVehicleId = vehicleChanged ? vehicleInfo.vehicleId : existingContract.vehicleInfo.vehicleId;
      const targetStart = rentalInfo?.startDateTime || existingContract.rentalInfo.startDateTime;
      const targetEnd = rentalInfo?.endDateTime || existingContract.rentalInfo.endDateTime;

      const overlappingContracts = await Contract.find({
        'vehicleInfo.vehicleId': targetVehicleId,
        'rentalInfo.startDateTime': { $lt: new Date(targetEnd) },
        'rentalInfo.endDateTime': { $gt: new Date(targetStart) },
        status: { $in: ['pending', 'active'] },
        _id: { $ne: req.params.id }
      });

      if (overlappingContracts.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Le véhicule n\'est pas disponible pour ces dates',
          conflictingDates: overlappingContracts.map(contract => ({
            start: contract.rentalInfo.startDateTime,
            end: contract.rentalInfo.endDateTime
          }))
        });
      }
    }

    // Prepare update data
    const updateData = {
      status: status || existingContract.status
    };

    // Update client info if provided
    if (clientInfo) {
      updateData.clientInfo = {
        ...existingContract.clientInfo.toObject(),
        ...clientInfo,
        birthDate: clientInfo.birthDate ? new Date(clientInfo.birthDate) : existingContract.clientInfo.birthDate,
        licenseIssueDate: clientInfo.licenseIssueDate ? 
          new Date(clientInfo.licenseIssueDate) : existingContract.clientInfo.licenseIssueDate
      };
    }

    // Update second driver info if provided
    if (secondDriverInfo) {
      updateData.secondDriverInfo = {
        ...existingContract.secondDriverInfo.toObject(),
        ...secondDriverInfo,
        licenseIssueDate: secondDriverInfo.licenseIssueDate ? 
          new Date(secondDriverInfo.licenseIssueDate) : existingContract.secondDriverInfo.licenseIssueDate
      };
    }

    // Update rental info if provided - include all cost fields
    if (rentalInfo) {
      updateData.rentalInfo = {
        ...existingContract.rentalInfo.toObject(),
        ...rentalInfo,
        startDateTime: start,
        endDateTime: end,
        // Ensure all cost fields are included
        prixParJour: rentalInfo.prixParJour || existingContract.rentalInfo.prixParJour,
        rentalDays: rentalInfo.rentalDays || existingContract.rentalInfo.rentalDays,
        rentalCost: rentalInfo.rentalCost || existingContract.rentalInfo.rentalCost,
        deliveryCost: rentalInfo.deliveryCost || existingContract.rentalInfo.deliveryCost || 0,
        dropOffCost: rentalInfo.dropOffCost || existingContract.rentalInfo.dropOffCost || 0,
        insuranceCost: rentalInfo.insuranceCost || existingContract.rentalInfo.insuranceCost || 0,
        babySeatCost: rentalInfo.babySeatCost || existingContract.rentalInfo.babySeatCost || 0,
        surveillanceCost: rentalInfo.surveillanceCost || existingContract.rentalInfo.surveillanceCost || 0,
        tva: rentalInfo.tva || existingContract.rentalInfo.tva || 0,
        deposit: rentalInfo.deposit || existingContract.rentalInfo.deposit || 0,
        subtotal: rentalInfo.subtotal || existingContract.rentalInfo.subtotal,
        prixTotal: rentalInfo.prixTotal || existingContract.rentalInfo.prixTotal
      };
    }

    // Update vehicle info if changed
    if (vehicleChanged && vehicle) {
      updateData.vehicleInfo = {
        vehicleId: vehicle._id,
        name: vehicle.name,
        type: vehicle.type,
        boiteVitesse: vehicle.boiteVitesse,
        description: vehicle.description,
        image: vehicle.image,
        pricePerDay: vehicle.pricePerDay,
        carburant: vehicle.carburant,
        niveauReservoir: vehicle.niveauReservoir,
        radio: vehicle.radio,
        gps: vehicle.gps,
        mp3: vehicle.mp3,
        cd: vehicle.cd,
        matricule: vehicle.matricule,
        kmDepart: vehicle.kmDepart,
        kmRetour: vehicle.kmRetour,
        impot2026: vehicle.impot2026,
        impot2027: vehicle.impot2027,
        impot2028: vehicle.impot2028,
        impot2029: vehicle.impot2029,
        assuranceStartDate: vehicle.assuranceStartDate,
        assuranceEndDate: vehicle.assuranceEndDate,
        vidangeInterval: vehicle.vidangeInterval,
        remarques: vehicle.remarques,
        dommages: vehicle.dommages,
        available: vehicle.available,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt
      };
    }

    console.log('📤 Données de mise à jour avec tous les coûts:', updateData.rentalInfo);

    // Update contract
    const contract = await Contract.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Contrat mis à jour avec succès',
      contract: contract
    });
  } catch (error) {
    console.error('❌ Erreur modification contrat:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du contrat',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contrat non trouvé'
      });
    }

    // Check if the contract belongs to the current user
    if (contract.partnerInfo.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce contrat'
      });
    }

    // Check if contract can be deleted (not active or completed)
    if (['active', 'completed'].includes(contract.status)) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de supprimer un contrat actif ou terminé'
      });
    }

    await Contract.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Contrat supprimé avec succès'
    });
  } catch (error) {
    console.error('❌ Erreur suppression contrat:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du contrat'
    });
  }
};

exports.updateContractStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contrat non trouvé'
      });
    }

    // Check if the contract belongs to the current user
    if (contract.partnerInfo.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce contrat'
      });
    }

    // Check if contract can be cancelled
    if (status === 'cancelled') {
      const now = new Date();
      const startDate = new Date(contract.rentalInfo.startDateTime);
      const timeDiff = startDate.getTime() - now.getTime();
      const hoursDiff = timeDiff / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        return res.status(400).json({
          success: false,
          message: 'Impossible d\'annuler le contrat: moins de 24 heures avant le début'
        });
      }
    }

    contract.status = status;
    await contract.save();

    res.json({
      success: true,
      message: 'Statut du contrat mis à jour',
      contract: contract
    });
  } catch (error) {
    console.error('❌ Erreur mise à jour statut:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du statut'
    });
  }
};

exports.checkVehicleAvailability = async (req, res) => {
  try {
    const { vehicleId, startDateTime, endDateTime, contractId } = req.body;

    const startDate = new Date(startDateTime);
    const endDate = new Date(endDateTime);

    // Find overlapping contracts
    const query = {
      'vehicleInfo.vehicleId': vehicleId,
      'rentalInfo.startDateTime': { $lt: endDate },
      'rentalInfo.endDateTime': { $gt: startDate },
      status: { $in: ['pending', 'active'] }
    };

    if (contractId) {
      query._id = { $ne: contractId };
    }

    const overlappingContracts = await Contract.find(query);

    const isAvailable = overlappingContracts.length === 0;

    res.json({
      success: true,
      isAvailable,
      conflictingContracts: isAvailable ? [] : overlappingContracts.map(contract => ({
        id: contract._id,
        client: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
        start: contract.rentalInfo.startDateTime,
        end: contract.rentalInfo.endDateTime,
        status: contract.status
      }))
    });
  } catch (error) {
    console.error('❌ Erreur vérification disponibilité:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la vérification de disponibilité'
    });
  }
};

exports.getContractStats = async (req, res) => {
  try {
    const partnerId = req.user.id;

    const stats = await Contract.aggregate([
      { $match: { 'partnerInfo.partnerId': new require('mongoose').Types.ObjectId(partnerId) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$rentalInfo.prixTotal' }
        }
      }
    ]);

    const totalContracts = await Contract.countDocuments({ 'partnerInfo.partnerId': partnerId });
    const totalRevenue = await Contract.aggregate([
      { $match: { 'partnerInfo.partnerId': new require('mongoose').Types.ObjectId(partnerId) } },
      { $group: { _id: null, total: { $sum: '$rentalInfo.prixTotal' } } }
    ]);

    const monthlyStats = await Contract.aggregate([
      { $match: { 'partnerInfo.partnerId': new require('mongoose').Types.ObjectId(partnerId) } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$rentalInfo.prixTotal' }
        }
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 }
    ]);

    res.json({
      success: true,
      stats: {
        byStatus: stats,
        totalContracts,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyStats
      }
    });
  } catch (error) {
    console.error('❌ Erreur récupération statistiques:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des statistiques'
    });
  }
};

exports.getUpcomingReturns = async (req, res) => {
  try {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const upcomingReturns = await Contract.find({
      'partnerInfo.partnerId': req.user.id,
      status: 'active',
      'rentalInfo.endDateTime': { $lte: nextWeek, $gte: today }
    })
    .sort({ 'rentalInfo.endDateTime': 1 })
    .limit(10);

    res.json({
      success: true,
      upcomingReturns
    });
  } catch (error) {
    console.error('❌ Erreur récupération retours:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des retours à venir'
    });
  }
};

// New method to update vehicle information in all contracts
exports.updateVehicleInContracts = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    // Verify that the vehicle belongs to the current user
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule non trouvé'
      });
    }

    if (vehicle.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce véhicule'
      });
    }

    // Update all contracts with the new vehicle information
    const result = await Contract.updateMany(
      { 'vehicleInfo.vehicleId': vehicleId },
      {
        $set: {
          'vehicleInfo.name': vehicle.name,
          'vehicleInfo.type': vehicle.type,
          'vehicleInfo.boiteVitesse': vehicle.boiteVitesse,
          'vehicleInfo.description': vehicle.description,
          'vehicleInfo.image': vehicle.image,
          'vehicleInfo.pricePerDay': vehicle.pricePerDay,
          'vehicleInfo.carburant': vehicle.carburant,
          'vehicleInfo.niveauReservoir': vehicle.niveauReservoir,
          'vehicleInfo.radio': vehicle.radio,
          'vehicleInfo.gps': vehicle.gps,
          'vehicleInfo.mp3': vehicle.mp3,
          'vehicleInfo.cd': vehicle.cd,
          'vehicleInfo.matricule': vehicle.matricule,
          'vehicleInfo.kmDepart': vehicle.kmDepart,
          'vehicleInfo.kmRetour': vehicle.kmRetour,
          'vehicleInfo.impot2026': vehicle.impot2026,
          'vehicleInfo.impot2027': vehicle.impot2027,
          'vehicleInfo.impot2028': vehicle.impot2028,
          'vehicleInfo.impot2029': vehicle.impot2029,
          'vehicleInfo.assuranceStartDate': vehicle.assuranceStartDate,
          'vehicleInfo.assuranceEndDate': vehicle.assuranceEndDate,
          'vehicleInfo.vidangeInterval': vehicle.vidangeInterval,
          'vehicleInfo.remarques': vehicle.remarques,
          'vehicleInfo.dommages': vehicle.dommages,
          'vehicleInfo.available': vehicle.available
        }
      }
    );

    res.json({
      success: true,
      message: `Informations véhicule mises à jour dans ${result.modifiedCount} contrats`,
      updatedCount: result.modifiedCount
    });
  } catch (error) {
    console.error('❌ Erreur mise à jour véhicule dans contrats:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour des informations véhicule'
    });
  }
};