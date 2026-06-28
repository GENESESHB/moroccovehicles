const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  factureNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'vehicleModel'
  },
  
  vehicleModel: {
    type: String,
    required: true,
    enum: ['Vehicle', 'SmartCar']
  },
  
  vehicleName: {
    type: String,
    required: true,
    trim: true
  },
  
  matricule: {
    type: String,
    required: true,
    trim: true
  },
  
  vehicleType: {
    type: String,
    required: true,
    enum: ['car', 'truck', 'motorcycle', 'van', 'smart', 'other']
  },
  
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  status: {
    type: String,
    required: true,
    enum: ['pending', 'paid', 'cancelled', 'overdue'],
    default: 'pending'
  },
  
  garageName: {
    type: String,
    required: true,
    trim: true
  },
  
  phoneNumber: {
    type: String,
    trim: true,
    default: 'N/A'
  },
  
  description: {
    type: String,
    trim: true
  },
  
  maintenanceDetails: {
    startDate: Date,
    endDate: Date,
    partsReplaced: [{
      partName: String,
      partId: mongoose.Schema.Types.ObjectId,
      quantity: { type: Number, default: 1 },
      unitPrice: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    }],
    laborHours: { type: Number, default: 0 },
    laborRate: { type: Number, default: 0 },
    laborTotal: { type: Number, default: 0 }
  },
  
  damageRepairs: [{
    damageArea: String,
    description: String,
    cost: { type: Number, default: 0 },
    repairedDate: Date,
    repairedBy: String
  }],
  
  subtotal: {
    type: Number,
    default: 0
  },
  
  tax: {
    type: Number,
    default: 0,
    min: 0
  },
  
  discount: {
    type: Number,
    default: 0,
    min: 0
  },
  
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  
  paymentMethod: {
    type: String,
    enum: ['cash', 'credit_card', 'bank_transfer', 'check', 'mobile_money', 'other'],
    default: 'cash'
  },
  
  paymentDate: Date,
  paymentReference: String,
  
  // Informations de l'utilisateur qui a créé/enregistré la facture
  inforUser: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    userEmail: {
      type: String,
      trim: true
    },
    userRole: {
      type: String,
      enum: ['user', 'agence', 'admin'],
      required: true
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    department: {
      type: String,
      enum: ['finance', 'maintenance', 'admin', 'other'],
      default: 'maintenance'
    },
    // Ajout des informations de l'agence pour l'impression
    entreprise: {
      type: String,
      trim: true,
      default: ''
    },
    logoEntreprise: {
      type: String,
      trim: true,
      default: ''
    },
    country: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    }
  },
  
  // Informations de l'agence (stockées directement pour référence rapide)
  agencyInfo: {
    entreprise: {
      type: String,
      trim: true,
      default: ''
    },
    logoEntreprise: {
      type: String,
      trim: true,
      default: ''
    },
    country: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      default: ''
    },
    email: {
      type: String,
      trim: true,
      default: ''
    }
  },
  
  // Historique des modifications
  updatedBy: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    userName: String,
    action: String,
    date: {
      type: Date,
      default: Date.now
    },
    changes: mongoose.Schema.Types.Mixed,
    // Ajout des informations de l'agence dans l'historique
    entreprise: String,
    logoEntreprise: String
  }],
  
  notes: {
    type: String,
    trim: true
  },
  
  // Pièces jointes
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    // Ajout des informations de l'agence pour les pièces jointes
    uploadedByEntreprise: String,
    uploadedByLogo: String
  }],
  
  // Indicateur pour SmartCar
  isSmartCar: {
    type: Boolean,
    default: false
  },
  
  // Soft delete
  isDeleted: {
    type: Boolean,
    default: false
  },
  
  // Suivi d'audit
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Informations de l'agence au moment de la création
  createdByInfo: {
    entreprise: String,
    logoEntreprise: String,
    country: String,
    city: String,
    phone: String,
    email: String
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

// Index pour les recherches fréquentes
factureSchema.index({ factureNumber: 1 });
factureSchema.index({ vehicleId: 1 });
factureSchema.index({ status: 1 });
factureSchema.index({ date: -1 });
factureSchema.index({ 'inforUser.userId': 1 });
factureSchema.index({ 'inforUser.entreprise': 1 });
factureSchema.index({ 'agencyInfo.entreprise': 1 });
factureSchema.index({ isSmartCar: 1 });

// Middleware pour mettre à jour updatedAt
factureSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Méthode pour ajouter une entrée dans updatedBy avec informations de l'agence
factureSchema.methods.addUpdateHistory = function(user, action, changes) {
  this.updatedBy.push({
    userId: user._id || user.id,
    userName: user.name || user.userName,
    action: action,
    changes: changes,
    date: new Date(),
    entreprise: user.entreprise || '',
    logoEntreprise: user.logoEntreprise || ''
  });
};

// Méthode pour ajouter une pièce jointe avec informations de l'agence
factureSchema.methods.addAttachment = function(fileInfo, user) {
  this.attachments.push({
    fileName: fileInfo.fileName,
    fileUrl: fileInfo.fileUrl,
    fileType: fileInfo.fileType,
    uploadedAt: new Date(),
    uploadedBy: user._id || user.id,
    uploadedByEntreprise: user.entreprise || '',
    uploadedByLogo: user.logoEntreprise || ''
  });
};

// Méthode pour obtenir les données formatées pour l'impression
factureSchema.methods.getPrintData = function() {
  return {
    factureNumber: this.factureNumber,
    date: this.date ? new Date(this.date).toLocaleDateString('fr-FR') : 'N/A',
    vehicleName: this.vehicleName,
    matricule: this.matricule,
    garageName: this.garageName,
    description: this.description,
    amount: this.amount,
    tax: this.tax,
    discount: this.discount,
    totalAmount: this.totalAmount,
    paymentMethod: this.paymentMethod,
    paymentDate: this.paymentDate ? new Date(this.paymentDate).toLocaleDateString('fr-FR') : 'N/A',
    status: this.status,
    
    // Données formatées
    amountFormatted: `${this.amount.toFixed(2)} MAD`,
    taxFormatted: `${this.tax.toFixed(2)} MAD`,
    discountFormatted: `${this.discount.toFixed(2)} MAD`,
    totalAmountFormatted: `${this.totalAmount.toFixed(2)} MAD`,
    subtotalFormatted: `${this.subtotal.toFixed(2)} MAD`,
    
    // Informations de l'agence
    agencyInfo: {
      entreprise: this.agencyInfo.entreprise || this.inforUser.entreprise || '',
      logoEntreprise: this.agencyInfo.logoEntreprise || this.inforUser.logoEntreprise || '',
      country: this.agencyInfo.country || this.inforUser.country || '',
      city: this.agencyInfo.city || this.inforUser.city || '',
      phone: this.agencyInfo.phone || this.inforUser.phone || '',
      email: this.agencyInfo.email || this.inforUser.userEmail || ''
    },
    
    // Informations de l'utilisateur enregistreur
    registeredBy: {
      name: this.inforUser.userName,
      email: this.inforUser.userEmail,
      department: this.inforUser.department,
      registeredAt: this.inforUser.registeredAt ? 
        new Date(this.inforUser.registeredAt).toLocaleDateString('fr-FR') : 'N/A'
    },
    
    // Détails de maintenance
    maintenanceDetails: this.maintenanceDetails ? {
      startDate: this.maintenanceDetails.startDate ? 
        new Date(this.maintenanceDetails.startDate).toLocaleDateString('fr-FR') : 'N/A',
      endDate: this.maintenanceDetails.endDate ? 
        new Date(this.maintenanceDetails.endDate).toLocaleDateString('fr-FR') : 'N/A',
      partsReplaced: this.maintenanceDetails.partsReplaced || [],
      laborHours: this.maintenanceDetails.laborHours || 0,
      laborRate: this.maintenanceDetails.laborRate || 0,
      laborTotal: this.maintenanceDetails.laborTotal || 0
    } : null,
    
    // Réparations de dommages
    damageRepairs: this.damageRepairs || [],
    
    // Date d'impression actuelle
    printDate: new Date().toLocaleDateString('fr-FR'),
    printTime: new Date().toLocaleTimeString('fr-FR'),
    
    // Notes
    notes: this.notes || ''
  };
};

const Facture = mongoose.model('Facture', factureSchema);

module.exports = Facture;