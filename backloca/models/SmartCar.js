const mongoose = require('mongoose');

const smartCarSchema = new mongoose.Schema({
  // User reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Basic information
  nomVehicule: {
    type: String,
    required: true,
    trim: true
  },
  typeVehicule: {
    type: String,
    required: true,
    enum: ['Berline', 'SUV', 'Compact', 'Citadine', 'Sport', 'Utilitaire', '4x4', 'Monospace']
  },
  boiteVitesse: {
    type: String,
    required: true,
    enum: ['Manuelle', 'Automatique', 'Séquentielle']
  },
  prixJour: {
    type: Number,
    required: true,
    min: 0
  },
  
  // Technical specifications
  typeCarburant: {
    type: String,
    required: true,
    enum: ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL']
  },
  equipementsAudio: [{
    type: String,
    enum: ['Radio', 'GPS', 'MP3', 'CD']
  }],
  nombreClesSecurite: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  intervalleVidange: {
    type: String,
    required: true,
    enum: ['8000 km', '10000 km', '12000 km']
  },
  
  // Documents and images
  imageVehicule: {
    filename: String,
    path: String,
    mimetype: String,
    url: String
  },
  carteGriseRecto: {
    filename: String,
    path: String,
    mimetype: String,
    url: String
  },
  carteGriseVerso: {
    filename: String,
    path: String,
    mimetype: String,
    url: String
  },
  numeroMatricule: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true
  },
  
  // KILOMETER TRACKING FIELDS (ADDED FOR MAINTENANCE)
  currentKilometer: {
    type: Number,
    default: 0,
    min: 0
  },
  kmDepart: {
    type: Number,
    default: 0,
    min: 0
  },
  kmRetour: {
    type: Number,
    default: 0,
    min: 0
  },
  distanceTraveled: {
    type: Number,
    default: 0,
    min: 0
  },
  kilometerNotes: {
    type: String,
    trim: true
  },
  
  // MAINTENANCE FIELDS (ADDED FOR MAINTENANCE)
  maintenanceHistory: [{
    maintenanceType: {
      type: String,
      enum: ['vidange', 'freins', 'pneus', 'batterie', 'climatisation', 'autre'],
      default: 'vidange'
    },
    cost: {
      type: Number,
      default: 0,
      min: 0
    },
    notes: {
      type: String,
      trim: true
    },
    performedBy: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    performedAtKm: {
      type: Number,
      default: 0,
      min: 0
    }
  }],
  
  lastMaintenanceKm: {
    type: Number,
    default: 0,
    min: 0
  },
  nextMaintenanceKm: {
    type: Number,
    default: 0,
    min: 0
  },
  vidangeInterval: {
    type: String,
    default: '10000'
  },
  
  // Status and timestamps
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance', 'rented', 'available'],
    default: 'available'
  },
  
  // Vehicle type identifier
  vehicleType: {
    type: String,
    enum: ['regular', 'smart'],
    default: 'smart'
  },
  
  // Partner/Owner reference
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  dateCreation: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
smartCarSchema.index({ userId: 1, status: 1 });
smartCarSchema.index({ partnerId: 1, status: 1 });
smartCarSchema.index({ numeroMatricule: 1 }, { unique: true });
smartCarSchema.index({ vehicleType: 1 });
smartCarSchema.index({ partnerId: 1, vehicleType: 1 });

module.exports = mongoose.model('SmartCar', smartCarSchema);