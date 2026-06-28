const mongoose = require('mongoose');

const kilometerHistorySchema = new mongoose.Schema({
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['smart', 'regular']
  },
  updateType: {
    type: String,
    required: true,
    enum: ['depart', 'retour', 'kilometer_correction', 'maintenance_update']
  },
  kilometer: {
    type: Number,
    required: true,
    min: 0,
    max: 1000000
  },
  notes: {
    type: String,
    trim: true
  },
  correctionReason: {
    type: String,
    trim: true
  },
  performedBy: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now,
    index: true
  },
  previousKilometer: {
    type: Number,
    min: 0
  },
  difference: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
kilometerHistorySchema.index({ vehicleId: 1, date: -1 });
kilometerHistorySchema.index({ vehicleType: 1, date: -1 });
kilometerHistorySchema.index({ updateType: 1 });

module.exports = mongoose.model('KilometerHistory', kilometerHistorySchema);