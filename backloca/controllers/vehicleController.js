const Vehicle = require('../models/Vehicle');

exports.addVehicle = async (req, res) => {
  try {
    const {
      name,
      type,
      boiteVitesse,
      description,
      pricePerDay,
      carburant,
      niveauReservoir,
      radio,
      gps,
      mp3,
      cd,
      matricule,
      kmDepart,
      kmRetour,
      impot2026,
      impot2027,
      impot2028,
      impot2029,
      assuranceStartDate,
      assuranceEndDate,
      vidangeInterval,
      remarques,
      dommages
    } = req.body;

    const partnerId = req.user.id;

    let image = '';
    if (req.file) {
      image = req.file.path;
    }

    // Convertir les valeurs booléennes
    const booleanFields = {
      radio: radio === 'true',
      gps: gps === 'true',
      mp3: mp3 === 'true',
      cd: cd === 'true',
      impot2026: impot2026 === 'true',
      impot2027: impot2027 === 'true',
      impot2028: impot2028 === 'true',
      impot2029: impot2029 === 'true'
    };

    // Parser les dommages si c'est une string
    let dommagesArray = [];
    if (dommages) {
      if (typeof dommages === 'string') {
        dommagesArray = dommages.split(',');
      } else if (Array.isArray(dommages)) {
        dommagesArray = dommages;
      }
    }

    const vehicle = new Vehicle({
      name,
      type,
      boiteVitesse,
      description,
      image,
      pricePerDay: parseFloat(pricePerDay),
      carburant,
      niveauReservoir,
      ...booleanFields,
      matricule: matricule,
      kmDepart: parseInt(kmDepart),
      kmRetour: kmRetour ? parseInt(kmRetour) : null,
      assuranceStartDate: assuranceStartDate || null,
      assuranceEndDate: assuranceEndDate || null,
      vidangeInterval: vidangeInterval || null,
      remarques,
      dommages: dommagesArray,
      partnerId,
      available: true // Par défaut le véhicule est disponible
    });

    await vehicle.save();

    res.status(201).json({
      success: true,
      message: 'Véhicule ajouté avec succès',
      vehicle
    });
  } catch (error) {
    console.error('Erreur ajout véhicule:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'ajout du véhicule',
      error: error.message
    });
  }
};

exports.getMyVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ partnerId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      vehicles
    });
  } catch (error) {
    console.error('Erreur récupération véhicules:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des véhicules',
      error: error.message
    });
  }
};

exports.getVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

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

    res.json({
      success: true,
      vehicle
    });
  } catch (error) {
    console.error('Erreur récupération véhicule:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};

exports.updateVehicle = async (req, res) => {
  try {
    const {
      name,
      type,
      boiteVitesse,
      description,
      pricePerDay,
      carburant,
      niveauReservoir,
      radio,
      gps,
      mp3,
      cd,
      matricule,
      kmDepart,
      kmRetour,
      impot2026,
      impot2027,
      impot2028,
      impot2029,
      assuranceStartDate,
      assuranceEndDate,
      vidangeInterval,
      remarques,
      dommages
    } = req.body;

    const existingVehicle = await Vehicle.findById(req.params.id);
    if (!existingVehicle) {
      return res.status(404).json({
        success: false,
        message: 'Véhicule non trouvé'
      });
    }

    if (existingVehicle.partnerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Accès non autorisé à ce véhicule'
      });
    }

    // Convertir les valeurs booléennes
    const booleanFields = {
      radio: radio === 'true',
      gps: gps === 'true',
      mp3: mp3 === 'true',
      cd: cd === 'true',
      impot2026: impot2026 === 'true',
      impot2027: impot2027 === 'true',
      impot2028: impot2028 === 'true',
      impot2029: impot2029 === 'true'
    };

    // Parser les dommages si c'est une string
    let dommagesArray = [];
    if (dommages) {
      if (typeof dommages === 'string') {
        dommagesArray = dommages.split(',');
      } else if (Array.isArray(dommages)) {
        dommagesArray = dommages;
      }
    }

    let updateData = {
      name,
      type,
      boiteVitesse,
      description,
      pricePerDay: parseFloat(pricePerDay),
      carburant,
      niveauReservoir,
      ...booleanFields,
      matricule: matricule,
      kmDepart: parseInt(kmDepart),
      kmRetour: kmRetour ? parseInt(kmRetour) : null,
      assuranceStartDate: assuranceStartDate || null,
      assuranceEndDate: assuranceEndDate || null,
      vidangeInterval: vidangeInterval || null,
      remarques,
      dommages: dommagesArray
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Véhicule mis à jour avec succès',
      vehicle
    });
  } catch (error) {
    console.error('Erreur mise à jour véhicule:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour du véhicule',
      error: error.message
    });
  }
};

exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

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

    await Vehicle.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Véhicule supprimé avec succès'
    });
  } catch (error) {
    console.error('Erreur suppression véhicule:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression du véhicule',
      error: error.message
    });
  }
};

// Nouvelle fonction pour changer la disponibilité - CORRIGÉE
exports.toggleVehicleAvailability = async (req, res) => {
  try {
    const { available } = req.body;
    const vehicle = await Vehicle.findById(req.params.id);

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

    // Convertir la valeur available en boolean si c'est une string
    const availableBoolean = available === true || available === 'true';

    console.log('Updating vehicle availability:', {
      vehicleId: req.params.id,
      currentAvailable: vehicle.available,
      newAvailable: availableBoolean
    });

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      { available: availableBoolean },
      { new: true, runValidators: true }
    );

    console.log('Vehicle updated successfully:', updatedVehicle);

    res.json({
      success: true,
      message: `Véhicule ${availableBoolean ? 'activé' : 'désactivé'} avec succès`,
      vehicle: updatedVehicle
    });
  } catch (error) {
    console.error('Erreur changement statut véhicule:', error);
    console.error('Error details:', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du changement de statut du véhicule',
      error: error.message
    });
  }
};

// remove partes repaire
exports.markDamagesRepaired = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const { damageIds, damageDescriptions } = req.body;

    console.log('=== MARK DAMAGES REPAIRED START ===');
    console.log('Vehicle ID:', vehicleId);
    console.log('Damage IDs to remove:', damageIds);
    console.log('Damage descriptions to remove:', damageDescriptions);

    // 1. Trouver le véhicule
    const vehicle = await Vehicle.findById(vehicleId);
    
    if (!vehicle) {
      console.log('❌ Vehicle not found');
      return res.status(404).json({
        success: false,
        message: 'Véhicule non trouvé'
      });
    }

    console.log('Current damages in DB:', vehicle.dommages);
    console.log('Type of dommages:', Array.isArray(vehicle.dommages) ? 'Array' : 'Not array');

    // Initialiser le compteur original AVANT toute modification
    let originalCount = 0;
    let removedCount = 0;
    
    // 2. Déterminer ce qu'on doit supprimer
    const itemsToRemove = [];
    if (damageIds && Array.isArray(damageIds) && damageIds.length > 0) {
      itemsToRemove.push(...damageIds);
    }
    if (damageDescriptions && Array.isArray(damageDescriptions) && damageDescriptions.length > 0) {
      itemsToRemove.push(...damageDescriptions);
    }

    console.log('All items to remove:', itemsToRemove);
    
    // 3. Sauvegarder le nombre original AVANT modification
    originalCount = vehicle.dommages ? vehicle.dommages.length : 0;
    
    if (itemsToRemove.length > 0) {
      console.log('Processing items to remove...');
      
      // Assurer que dommages est un tableau
      if (!Array.isArray(vehicle.dommages)) {
        vehicle.dommages = [];
        console.log('⚠ dommages converti en tableau vide');
      }
      
      // Filtrer les dommages - méthode SIMPLIFIÉE
      vehicle.dommages = vehicle.dommages.filter(damage => {
        // Convertir le dommage en string pour comparaison
        let damageString = '';
        if (typeof damage === 'string') {
          damageString = damage.toLowerCase().trim();
        } else if (typeof damage === 'object' && damage) {
          // Si c'est un objet, on regarde l'ID ou la description
          damageString = (damage.id || damage._id || damage.description || '').toString().toLowerCase().trim();
        } else {
          damageString = String(damage).toLowerCase().trim();
        }
        
        // Vérifier si ce dommage doit être supprimé
        for (const item of itemsToRemove) {
          if (!item) continue;
          const itemStr = item.toString().toLowerCase().trim();
          
          // Comparaison exacte ou partielle
          if (damageString === itemStr || damageString.includes(itemStr)) {
            console.log(`✓ Supprimer: "${damageString}" (correspond à: "${itemStr}")`);
            return false; // Exclure du tableau
          }
        }
        
        return true; // Garder dans le tableau
      });
      
      removedCount = originalCount - vehicle.dommages.length;
      console.log(`✓ Résultat: ${removedCount} dommages supprimés`);
      console.log(`✓ Dommages restants: ${vehicle.dommages.length}`);
      
      // Sauvegarder seulement si des changements
      if (removedCount > 0) {
        await vehicle.save();
        console.log('✓ Véhicule sauvegardé avec succès');
      } else {
        console.log('⚠ Aucun dommage correspondant trouvé à supprimer');
      }
    } else {
      console.log('⚠ Aucun ID ou description de dommage fourni pour suppression');
    }

    console.log('Updated damages:', vehicle.dommages);
    console.log('=== MARK DAMAGES REPAIRED END ===');

    // 4. Calculer le résultat final
    const finalRemovedCount = originalCount - (vehicle.dommages ? vehicle.dommages.length : 0);
    const finalRemainingCount = vehicle.dommages ? vehicle.dommages.length : 0;

    res.json({
      success: true,
      message: 'Dommages marqués comme réparés avec succès',
      data: {
        vehicleId: vehicle._id,
        removed: finalRemovedCount,
        remaining: finalRemainingCount,
        damages: vehicle.dommages || []
      }
    });
  } catch (error) {
    console.error('❌ Erreur marquage dommages réparés:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Erreur lors du marquage des dommages comme réparés',
      error: error.message
    });
  }
};

exports.getAvailableVehiclesPublic = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    const SmartCar = mongoose.model('SmartCar');

    // 1. Fetch available regular vehicles
    const dbVehicles = await Vehicle.find({ available: true })
      .populate('partnerId', 'name entreprise city country logoEntreprise')
      .sort({ createdAt: -1 });

    // 2. Fetch available smart/luxury cars
    let dbSmartCars = [];
    try {
      dbSmartCars = await SmartCar.find({ status: 'available' })
        .populate('partnerId', 'name entreprise city country logoEntreprise')
        .sort({ createdAt: -1 });
    } catch (scError) {
      console.error('⚠️ Could not fetch SmartCars from DB:', scError.message);
    }

    const combinedVehicles = [];

    // 3. Add and normalize regular vehicles
    if (dbVehicles && dbVehicles.length > 0) {
      dbVehicles.forEach(v => {
        const carObj = v.toObject();
        carObj.vehicleSource = 'vehicle';
        carObj.transmission = carObj.boiteVitesse;
        combinedVehicles.push(carObj);
      });
    }

    // 4. Add and normalize smart/luxury cars
    if (dbSmartCars && dbSmartCars.length > 0) {
      dbSmartCars.forEach(sc => {
        const scObj = sc.toObject();
        combinedVehicles.push({
          _id: scObj._id,
          name: scObj.nomVehicule,
          type: scObj.typeVehicule || 'Standard',
          boiteVitesse: scObj.boiteVitesse,
          transmission: scObj.boiteVitesse,
          description: scObj.description || 'Véhicule Luxury Smart connecté.',
          image: scObj.imageVehicule?.url || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
          pricePerDay: scObj.prixJour,
          carburant: scObj.typeCarburant === 'Diesel' ? 'Gasoil' : scObj.typeCarburant,
          gps: scObj.equipementsAudio?.includes('GPS') || false,
          radio: scObj.equipementsAudio?.includes('Radio') || false,
          mp3: scObj.equipementsAudio?.includes('MP3') || false,
          cd: scObj.equipementsAudio?.includes('CD') || false,
          partnerId: scObj.partnerId || null,
          available: scObj.status === 'available',
          vehicleSource: 'smartcar',
          matricule: scObj.numeroMatricule
        });
      });
    }

    // 5. Fallback Mock Vehicles
    const mockVehicles = [
      {
        _id: "mock1",
        name: "Dacia Logan",
        type: "Citadine",
        boiteVitesse: "Manuelle",
        transmission: "Manuelle",
        description: "Économique, fiable et parfaite pour les trajets en ville ou en famille au Maroc.",
        image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 250,
        carburant: "Gasoil",
        gps: true,
        radio: true,
        mp3: true,
        cd: false,
        partnerId: {
          _id: "p1",
          name: "WegoRent Fez",
          entreprise: "WegoRent",
          city: "Fez",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock2",
        name: "Renault Clio 5",
        type: "Citadine",
        boiteVitesse: "Manuelle",
        transmission: "Manuelle",
        description: "Moderne, dynamique et très sobre. Parfaite pour explorer le Maroc.",
        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 300,
        carburant: "Gasoil",
        gps: true,
        radio: true,
        mp3: true,
        cd: false,
        partnerId: {
          _id: "p2",
          name: "WegoRent Casablanca",
          entreprise: "WegoRent",
          city: "Casablanca",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock3",
        name: "Range Rover Velar",
        type: "SUV premium",
        boiteVitesse: "Automatique",
        transmission: "Automatique",
        description: "Le luxe absolu et le confort suprême pour vos voyages d'affaires ou vacances.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 1200,
        carburant: "Gasoil",
        gps: true,
        radio: true,
        mp3: true,
        cd: true,
        partnerId: {
          _id: "p3",
          name: "Atlas Luxury Rent",
          entreprise: "Atlas Luxury",
          city: "Marrakech",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock4",
        name: "Mercedes-Benz Classe E",
        type: "Berline premium",
        boiteVitesse: "Automatique",
        transmission: "Automatique",
        description: "Élégance, prestige et confort de conduite exceptionnel. Idéal pour vos événements.",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 1500,
        carburant: "Gasoil",
        gps: true,
        radio: true,
        mp3: true,
        cd: true,
        partnerId: {
          _id: "p4",
          name: "Prestige Drive Rabat",
          entreprise: "Prestige Drive",
          city: "Rabat",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock5",
        name: "Dacia Duster",
        type: "SUV",
        boiteVitesse: "Manuelle",
        transmission: "Manuelle",
        description: "Robuste et spacieux, idéal pour les routes de montagne et le grand confort.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 400,
        carburant: "Gasoil",
        gps: true,
        radio: true,
        mp3: true,
        cd: false,
        partnerId: {
          _id: "p5",
          name: "WegoRent Tanger",
          entreprise: "WegoRent",
          city: "Tanger",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock6",
        name: "Porsche Cayenne Coupe",
        type: "SUV premium",
        boiteVitesse: "Automatique",
        transmission: "Automatique",
        description: "SUV ultra sportif combinant performance légendaire et confort d'exception.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 2500,
        carburant: "Essence",
        gps: true,
        radio: true,
        mp3: true,
        cd: true,
        partnerId: {
          _id: "p6",
          name: "Atlas Luxury Rent",
          entreprise: "Atlas Luxury",
          city: "Marrakech",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock7",
        name: "Hyundai Tucson",
        type: "SUV",
        boiteVitesse: "Automatique",
        transmission: "Automatique",
        description: "SUV moderne et élégant avec un espace généreux et une conduite fluide.",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 450,
        carburant: "Gasoil",
        gps: true,
        radio: true,
        mp3: true,
        cd: false,
        partnerId: {
          _id: "p7",
          name: "WegoRent Fez",
          entreprise: "WegoRent",
          city: "Fez",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock8",
        name: "Tesla Model 3",
        type: "Berline",
        boiteVitesse: "Automatique",
        transmission: "Automatique",
        description: "100% électrique. Technologie de pointe, silence absolu, accélérations instantanées et autonomie exceptionnelle.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 800,
        carburant: "Electrique",
        gps: true,
        radio: true,
        mp3: true,
        cd: false,
        partnerId: {
          _id: "p8",
          name: "Prestige Eco Rent",
          entreprise: "Prestige Eco",
          city: "Casablanca",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      },
      {
        _id: "mock9",
        name: "Dacia Spring Electric",
        type: "Citadine",
        boiteVitesse: "Automatique",
        transmission: "Automatique",
        description: "Citadine 100% électrique, compacte et agile. La solution idéale et économique pour la ville.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80",
        pricePerDay: 290,
        carburant: "Electrique",
        gps: true,
        radio: true,
        mp3: true,
        cd: false,
        partnerId: {
          _id: "p9",
          name: "WegoRent Rabat",
          entreprise: "WegoRent",
          city: "Rabat",
          country: "Morocco"
        },
        available: true,
        vehicleSource: 'vehicle'
      }
    ];

    mockVehicles.forEach(mockCar => {
      const exists = combinedVehicles.some(v => v.name.toLowerCase() === mockCar.name.toLowerCase());
      if (!exists) {
        combinedVehicles.push(mockCar);
      }
    });

    // 6. Proximity Sorting based on client city (req.query.pickup)
    const clientCity = req.query.pickup || '';
    if (clientCity) {
      combinedVehicles.sort((a, b) => {
        const aMatch = a.partnerId?.city?.toLowerCase() === clientCity.toLowerCase() ? 1 : 0;
        const bMatch = b.partnerId?.city?.toLowerCase() === clientCity.toLowerCase() ? 1 : 0;
        return bMatch - aMatch; // exact matches first
      });
    }

    res.json({
      success: true,
      vehicles: combinedVehicles
    });
  } catch (error) {
    console.error('Erreur récupération véhicules publics:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des véhicules',
      error: error.message
    });
  }
};