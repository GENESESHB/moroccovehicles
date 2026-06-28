const mongoose = require('mongoose');

const accidentSchema = new mongoose.Schema({
  // Vehicle reference
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'vehicleType'
  },
  
  // Vehicle type for dynamic referencing
  vehicleType: {
    type: String,
    required: true,
    enum: ['Vehicle', 'SmartCar']
  },
  
  // User who reported the accident
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Damage details
  damages: [{
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    dateReported: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Accident details
  accidentDate: {
    type: Date,
    default: Date.now
  },
  
  location: {
    type: String,
    trim: true
  },
  
  description: {
    type: String,
    trim: true
  },
  
  // Status
  status: {
    type: String,
    enum: ['reported', 'assessed', 'in_repair', 'repaired', 'closed'],
    default: 'reported'
  },
  
  // Photos or evidence
  photos: [{
    filename: String,
    path: String,
    url: String,
    mimetype: String
  }],
  
  // Partner info (copied from vehicle at time of accident)
  partnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Vehicle info at time of accident (for historical reference)
  vehicleInfo: {
    name: String,
    matricule: String,
    type: String,
    currentKilometer: Number,
    partnerName: String
  },
  
  // Repair info
  repairDetails: {
    cost: Number,
    repairDate: Date,
    repairedBy: String,
    notes: String
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better query performance
accidentSchema.index({ vehicleId: 1, vehicleType: 1 });
accidentSchema.index({ reportedBy: 1 });
accidentSchema.index({ partnerId: 1 });
accidentSchema.index({ status: 1 });
accidentSchema.index({ accidentDate: 1 });

// Pre-save middleware to populate vehicle info
accidentSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      let vehicle;
      
      // Get the correct model based on vehicleType
      if (this.vehicleType === 'SmartCar') {
        const SmartCar = mongoose.model('SmartCar');
        vehicle = await SmartCar.findById(this.vehicleId)
          .populate('partnerId', 'name email');
      } else {
        const Vehicle = mongoose.model('Vehicle');
        vehicle = await Vehicle.findById(this.vehicleId)
          .populate('partnerId', 'name email');
      }
      
      if (vehicle) {
        this.vehicleInfo = {
          name: vehicle.nomVehicule || vehicle.name,
          matricule: vehicle.numeroMatricule || vehicle.matricule,
          type: vehicle.typeVehicule || vehicle.type,
          currentKilometer: vehicle.currentKilometer,
          partnerName: vehicle.partnerId ? vehicle.partnerId.name : 'Unknown'
        };
      }
    } catch (error) {
      console.error('Error populating vehicle info:', error);
    }
  }
  
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Accident', accidentSchema);