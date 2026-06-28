const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    vehicleType: {
      type: String,
      enum: ['regular', 'smart'],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    policyNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'expired'],
      default: 'pending',
    },
    notes: {
      type: String,
      trim: true,
    },
    coverage: {
      type: String,
      trim: true,
      default: 'Tous risques',
    },
    smartCar: {
      type: Boolean,
      default: false,
    },
    // FIXED: Explicitly define vehicleSnapshot as a nested object with schema
    vehicleSnapshot: {
      name: {
        type: String,
        default: 'Sans nom'
      },
      matricule: {
        type: String,
        default: 'N/A'
      },
      type: {
        type: String,
        default: 'Inconnu'
      },
      carburant: {
        type: String,
        default: 'N/A'
      },
      boiteVitesse: {
        type: String,
        default: 'N/A'
      },
      prixJour: {
        type: Number,
        default: 0
      }
    },
  },
  {
    timestamps: true,
    // Ensure virtuals are included when converting to JSON/Object
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for fast queries
insuranceSchema.index({ user: 1, vehicleId: 1, vehicleType: 1 });
insuranceSchema.index({ user: 1, policyNumber: 1 }, { unique: true });
insuranceSchema.index({ startDate: 1, endDate: 1 });
insuranceSchema.index({ status: 1 });

// Pre-save middleware to ensure vehicleSnapshot is properly formatted
insuranceSchema.pre('save', function(next) {
  if (this.vehicleSnapshot && typeof this.vehicleSnapshot === 'string') {
    try {
      this.vehicleSnapshot = JSON.parse(this.vehicleSnapshot);
    } catch (e) {
      this.vehicleSnapshot = {
        name: 'Sans nom',
        matricule: 'N/A',
        type: 'Inconnu',
        carburant: 'N/A',
        boiteVitesse: 'N/A',
        prixJour: 0
      };
    }
  }
  next();
});

module.exports = mongoose.model('Insurance', insuranceSchema);