// models/Vehicle.js
const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Citadine', 'Compacte', 'Berline', 'Berline premium', 'Coupé', 
      'Cabriolet', 'Break', 'SUV', 'SUV compact', 'SUV premium', 'Crossover'
    ]
  },
  boiteVitesse: {
    type: String,
    required: true,
    enum: ['Manuelle', 'Automatique']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  carburant: {
    type: String,
    required: true,
    enum: ['Gasoil', 'Essence', 'Hybride', 'Électrique']
  },
  niveauReservoir: {
    type: String,
    required: false,
    enum: ['1/4', '1/2', '3/4', 'PLEIN']
  },
  // Équipements audio
  radio: {
    type: Boolean,
    default: false
  },
  gps: {
    type: Boolean,
    default: false
  },
  mp3: {
    type: Boolean,
    default: false
  },
  cd: {
    type: Boolean,
    default: false
  },
  // Matricule (anciennement nombreCles)
  matricule: { // CHANGÉ ICI
    type: String,
    required: true
  },
  
  // UPDATED: Kilometrage tracking with maintenance
  kmDepart: {
    type: Number,
    required: false,
    min: 0,
    default: 0
  },
  kmRetour: {
    type: Number,
    min: 0,
    default: 0
  },
  
  // NEW: Current odometer reading (cumulative)
  currentKilometer: {
    type: Number,
    min: 0,
    default: 0
  },
  
  // NEW: Total distance traveled
  totalDistance: {
    type: Number,
    min: 0,
    default: 0
  },
  
  // NEW: Maintenance tracking fields
  lastMaintenanceKm: {
    type: Number,
    min: 0,
    default: 0
  },
  nextMaintenanceKm: {
    type: Number,
    min: 0,
    default: 10000
  },
  
  // UPDATED: Vidange (maintenance) interval
  vidangeInterval: {
    type: String,
    enum: ['8000', '10000', '12000'],
    default: '10000'
  },
  
  // NEW: Maintenance history array
  maintenanceHistory: [{
    km: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    type: {
      type: String,
      enum: ['vidange', 'révision', 'entretien'],
      default: 'vidange'
    },
    notes: String,
    cost: Number,
    doneBy: String,
    nextMaintenanceKm: Number, // When next maintenance is due
    notified: {
      type: Boolean,
      default: false
    },
    notificationDate: Date
  }],
  
  // NEW: Current rental/contract info
  currentContract: {
    contractId: String,
    startDate: Date,
    endDate: Date,
    startKm: Number,
    endKm: Number,
    clientName: String,
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'completed'
    }
  },
  
  // NEW: Pending maintenance notifications
  pendingNotifications: [{
    km: Number,
    message: String,
    date: {
      type: Date,
      default: Date.now
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    resolved: {
      type: Boolean,
      default: false
    }
  }],
  
  // Impôts
  impot2026: {
    type: Boolean,
    default: false
  },
  impot2027: {
    type: Boolean,
    default: false
  },
  impot2028: {
    type: Boolean,
    default: false
  },
  impot2029: {
    type: Boolean,
    default: false
  },
  
  // Assurance et maintenance
  assuranceStartDate: {
    type: Date
  },
  assuranceEndDate: {
    type: Date
  },
  
  remarques: {
    type: String
  },
  
  // Dommages du véhicule
  dommages: [{
    type: String
  }],
  
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  available: {
    type: Boolean,
    default: true
  },
  
  // NEW: Maintenance status
  maintenanceStatus: {
    type: String,
    enum: ['ok', 'due_soon', 'overdue', 'in_maintenance'],
    default: 'ok'
  },
  
  // NEW: Last updated kilometer timestamp
  lastKmUpdate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des requêtes
vehicleSchema.index({ partnerId: 1, available: 1 });
vehicleSchema.index({ type: 1 });
vehicleSchema.index({ pricePerDay: 1 });
vehicleSchema.index({ nextMaintenanceKm: 1 });
vehicleSchema.index({ maintenanceStatus: 1 });

// Middleware to update current kilometer when kmRetour is set
vehicleSchema.pre('save', function(next) {
  if (this.isModified('kmRetour') && this.kmRetour > this.currentKilometer) {
    // Calculate distance traveled for this rental
    const distance = this.kmRetour - (this.kmDepart || 0);
    
    // Update total distance
    this.totalDistance += distance;
    
    // Update current kilometer
    this.currentKilometer = this.kmRetour;
    
    // Update last update timestamp
    this.lastKmUpdate = new Date();
    
    // Check for maintenance
    this.checkMaintenance();
  }
  next();
});

// Method to check and update maintenance status
vehicleSchema.methods.checkMaintenance = function() {
  const vidangeInterval = parseInt(this.vidangeInterval) || 10000;
  const currentKm = this.currentKilometer;
  const nextMaintenanceKm = this.nextMaintenanceKm;
  
  // Check if maintenance is due
  if (currentKm >= nextMaintenanceKm) {
    const overdueBy = currentKm - nextMaintenanceKm;
    
    // Calculate how many maintenance cycles have passed
    const cyclesPassed = Math.floor((currentKm - this.lastMaintenanceKm) / vidangeInterval);
    
    if (cyclesPassed > 0) {
      // Add notifications for each missed maintenance
      for (let i = 1; i <= cyclesPassed; i++) {
        const maintenanceKm = this.lastMaintenanceKm + (i * vidangeInterval);
        
        // Check if notification already exists
        const alreadyNotified = this.pendingNotifications.some(
          notif => notif.km === maintenanceKm && !notif.resolved
        );
        
        if (!alreadyNotified) {
          this.pendingNotifications.push({
            km: maintenanceKm,
            message: `Maintenance vidange due à ${maintenanceKm} km. Véhicule a ${currentKm} km (${overdueBy > 0 ? `en retard de ${overdueBy} km` : 'maintenance due'})`,
            priority: overdueBy > 2000 ? 'high' : 'medium',
            resolved: false
          });
          
          // Update maintenance status
          if (overdueBy > 2000) {
            this.maintenanceStatus = 'overdue';
          } else if (overdueBy > 0) {
            this.maintenanceStatus = 'due_soon';
          }
        }
      }
    }
  } else {
    // Check if maintenance is coming soon (within 1000 km)
    const kmUntilMaintenance = nextMaintenanceKm - currentKm;
    if (kmUntilMaintenance <= 1000 && kmUntilMaintenance > 0) {
      this.maintenanceStatus = 'due_soon';
      
      // Add upcoming maintenance notification if not already present
      const hasUpcomingNotification = this.pendingNotifications.some(
        notif => notif.km === nextMaintenanceKm && !notif.resolved
      );
      
      if (!hasUpcomingNotification) {
        this.pendingNotifications.push({
          km: nextMaintenanceKm,
          message: `Maintenance vidange prochaine à ${nextMaintenanceKm} km. Reste ${kmUntilMaintenance} km.`,
          priority: 'low',
          resolved: false
        });
      }
    } else {
      this.maintenanceStatus = 'ok';
    }
  }
};

// Method to record a maintenance event
vehicleSchema.methods.recordMaintenance = function(maintenanceData) {
  const vidangeInterval = parseInt(this.vidangeInterval) || 10000;
  const currentKm = this.currentKilometer;
  
  const maintenanceRecord = {
    km: currentKm,
    date: new Date(),
    type: maintenanceData.type || 'vidange',
    notes: maintenanceData.notes || '',
    cost: maintenanceData.cost || 0,
    doneBy: maintenanceData.doneBy || 'Technicien',
    nextMaintenanceKm: currentKm + vidangeInterval
  };
  
  // Add to maintenance history
  this.maintenanceHistory.push(maintenanceRecord);
  
  // Update maintenance tracking
  this.lastMaintenanceKm = currentKm;
  this.nextMaintenanceKm = currentKm + vidangeInterval;
  this.maintenanceStatus = 'ok';
  
  // Resolve pending notifications for this maintenance
  this.pendingNotifications = this.pendingNotifications.map(notif => {
    if (notif.km <= currentKm && !notif.resolved) {
      notif.resolved = true;
      notif.resolvedDate = new Date();
    }
    return notif;
  });
  
  return maintenanceRecord;
};

// Method to update kilometer reading (for rental start/end)
vehicleSchema.methods.updateKilometer = function(km, type = 'retour') {
  if (type === 'depart') {
    this.kmDepart = km;
  } else if (type === 'retour') {
    this.kmRetour = km;
    // The pre-save middleware will handle the rest
  }
  
  return this;
};

// Static method to get vehicles due for maintenance
vehicleSchema.statics.getDueForMaintenance = async function() {
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return this.find({
    $and: [
      { currentKilometer: { $gte: 0 } },
      {
        $or: [
          { maintenanceStatus: 'overdue' },
          { maintenanceStatus: 'due_soon' },
          {
            $expr: {
              $gte: ['$currentKilometer', '$nextMaintenanceKm']
            }
          }
        ]
      },
      {
        $or: [
          { 'lastKmUpdate': { $gte: oneWeekAgo } },
          { 'maintenanceHistory.0.date': { $lte: oneWeekAgo } }
        ]
      }
    ]
  });
};

// Method to report new damage
vehicleSchema.methods.addDamage = function(damageData) {
  const damage = {
    description: damageData.description,
    date: damageData.date || new Date(),
    location: damageData.location || '',
    cost: damageData.cost || 0,
    reportedBy: damageData.reportedBy,
    reportedDate: new Date(),
    status: 'unrepaired',
    severity: damageData.severity || 'medium',
    images: damageData.images || [],
    notes: damageData.notes || ''
  };
  
  this.dommages.push(damage);
  return this.save();
};

// Method to mark damages as repaired (when maintenance is done)
vehicleSchema.methods.markDamagesAsRepaired = function(damageIds, factureId, notes = '') {
  // Update each damage
  this.dommages = this.dommages.map(damage => {
    if (damageIds.includes(damage._id.toString())) {
      return {
        ...damage.toObject(),
        status: 'repaired',
        repairedDate: new Date(),
        factureId: factureId,
        repairNotes: notes,
        isRepaired: true
      };
    }
    return damage;
  });
  
  // Also check if we need to remove damages from the simple string array (backward compatibility)
  if (this.dommages && Array.isArray(this.dommages)) {
    // If dommages is an array of strings, remove them
    const stringDamages = this.dommages.filter(d => typeof d === 'string');
    const objectDamages = this.dommages.filter(d => typeof d === 'object');
    
    // For now, we'll keep the object damages only
    // You might want to implement logic to convert string damages to objects
    this.dommages = objectDamages;
  }
  
  return this.save();
};

// Method to get unrepaired damages
vehicleSchema.methods.getUnrepairedDamages = function() {
  return this.dommages.filter(damage => 
    (damage.status === 'unrepaired' || damage.isRepaired === false) && 
    !damage.repairedDate
  );
};

// Method to get repair history
vehicleSchema.methods.getRepairHistory = function() {
  return this.dommages.filter(damage => 
    damage.status === 'repaired' || damage.isRepaired === true
  );
};

// Method to update vehicle after maintenance
vehicleSchema.methods.updateAfterMaintenance = function(maintenanceData) {
  const vidangeInterval = parseInt(this.vidangeInterval) || 10000;
  const currentKm = this.currentKilometer || 0;
  
  // Add to maintenance history
  const maintenanceRecord = {
    km: currentKm,
    date: new Date(),
    type: maintenanceData.type || 'vidange',
    notes: maintenanceData.notes || '',
    cost: maintenanceData.cost || 0,
    doneBy: maintenanceData.doneBy || 'Technicien',
    factureId: maintenanceData.factureId,
    nextMaintenanceKm: currentKm + vidangeInterval,
    services: maintenanceData.services,
    damagedParts: maintenanceData.damagedParts
  };
  
  this.maintenanceHistory.push(maintenanceRecord);
  
  // Update maintenance tracking
  this.lastMaintenanceKm = currentKm;
  this.nextMaintenanceKm = currentKm + vidangeInterval;
  this.maintenanceStatus = 'ok';
  
  // Resolve pending notifications
  this.pendingNotifications = this.pendingNotifications.map(notif => {
    if (notif.km <= currentKm && !notif.resolved) {
      notif.resolved = true;
      notif.resolvedDate = new Date();
    }
    return notif;
  });
  
  // Update free maintenance flag if applicable
  if (maintenanceData.isFree) {
    this.hasFreeMaintenance = false;
    this.freeMaintenancePending = false;
  }
  
  return this.save();
};

module.exports = mongoose.model('Vehicle', vehicleSchema);