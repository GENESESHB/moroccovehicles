const mongoose = require('mongoose');

// ==================== SUBDOCUMENT SCHEMAS ====================

const PaymentMethodSchema = new mongoose.Schema({
  type: { type: String, enum: ['espece', 'carte', 'cheque', 'virement', 'autre'], default: 'espece' },
  amount: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], default: 'pending' },
  date: { type: Date, default: Date.now },
  reference: String,
  cardInfo: {
    last4: String,
    brand: String,
    transactionId: String
  },
  chequeInfo: {
    bank: String,
    number: String,
    dueDate: Date
  },
  virementInfo: {
    bank: String,
    account: String,
    reference: String
  }
}, { _id: false });

const PaymentInfoSchema = new mongoose.Schema({
  methods: [PaymentMethodSchema],
  totalPaid: { type: Number, default: 0 },
  totalDue: { type: Number, default: 0 },
  balance: { type: Number, default: 0 },
  currency: { type: String, default: 'MAD' },
  lastPaymentDate: Date
}, { _id: false });

const ReservoirStateSchema = new mongoose.Schema({
  depart: {
    niveau: { type: Number, min: 0, max: 100 },
    km: Number,
    date: Date,
    photos: [String],
    signatureClient: String,
    signatureAgent: String
  },
  retour: {
    niveau: { type: Number, min: 0, max: 100 },
    km: Number,
    date: Date,
    photos: [String],
    signatureClient: String,
    signatureAgent: String
  },
  consommation: {
    prixLitre: Number,
    litresManquants: Number,
    montantDu: Number,
    montantCharge: Number
  }
}, { _id: false });

const ConducteurSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  cin: String,
  permis: String,
  dateDelivre: Date,
  dateNaissance: Date,
  nationalite: String
}, { _id: false });

const AdditionalCostsSchema = new mongoose.Schema({
  deliveryCost: { type: Number, default: 0 },
  dropOffCost: { type: Number, default: 0 },
  insuranceCost: { type: Number, default: 0 },
  babySeatCost: { type: Number, default: 0 },
  surveillanceCost: { type: Number, default: 0 },
  autresFrais: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },
  franchise: { type: Number, default: 0 },
  fraisDossier: { type: Number, default: 0 }
}, { _id: false });

const HistoryEntrySchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  performedByName: String,
  date: { type: Date, default: Date.now },
  details: mongoose.Schema.Types.Mixed
}, { _id: false });

const WorkflowSchema = new mongoose.Schema({
  departureDate: Date,
  returnDate: Date,
  checkoutCompleted: { type: Boolean, default: false },
  checkinCompleted: { type: Boolean, default: false }
}, { _id: false });

// ==================== SNAPSHOT SCHEMAS ====================

const ClientSnapshotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  cin: String,
  phone: String,
  email: String,
  birthDate: Date,
  address: String,
  passport: String,
  licenseNumber: String,
  licenseIssueDate: Date,
  nationality: String,
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  }
}, { _id: false, strict: false });

// ✅ FIXED: Define assurance as a proper object schema (NOT a string!)
const AssuranceSchema = new mongoose.Schema({
  compagnie: { type: String, default: '' },
  numeroContrat: { type: String, default: '' },
  dateDebut: Date,
  dateFin: Date,
  type: { type: String, default: '' },
  cost: { type: Number, default: 0 },
  status: { type: String, default: '' }
}, { _id: false });

const VehicleSnapshotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nomVehicule: String,
  numeroMatricule: String,
  typeVehicule: String,
  boiteVitesse: String,
  typeCarburant: String,
  prixJour: Number,
  prixHebdo: Number,
  prixMensuel: Number,
  caution: Number,
  nombrePlaces: Number,
  nombrePortes: Number,
  cylindree: String,
  puissanceFiscale: Number,
  currentKilometer: Number,
  kmActuel: Number,
  imageVehicule: {
    filename: String,
    path: String,
    mimetype: String,
    url: String
  },
  photos: [String],
  carteGrise: {
    numero: String,
    dateCirculation: Date,
    vin: String
  },
  // ✅ FIXED: Use the object schema instead of String
  assurance: { type: AssuranceSchema, default: () => ({}) },
  equipements: [String],
  etatExterieur: String,
  etatInterieur: String,
  proprete: String,
  insuranceId: mongoose.Schema.Types.ObjectId
}, { _id: false, strict: false });

const EnterpriseSnapshotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  entreprise: String,
  number: String,
  email: String,
  logoEntreprise: String,
  country: String,
  city: String,
  address: String,
  siret: String,
  tvaNumber: String
}, { _id: false, strict: false });

const InsuranceSnapshotSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  company: String,
  policyNumber: String,
  startDate: Date,
  endDate: Date,
  cost: Number,
  status: String,
  coverage: String,
  notes: String,
  vehicleType: String,
  smartCar: Boolean,
  vehicleSnapshot: {
    name: String,
    matricule: String,
    type: String,
    carburant: String,
    boiteVitesse: String,
    prixJour: Number
  }
}, { _id: false, strict: false });

// ==================== MAIN SCHEMA ====================

const SmartContractSchema = new mongoose.Schema({
  contractNumber: { type: String, required: true, unique: true },
  
  // References
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'SmartCar', required: true },
  smartCarId: { type: mongoose.Schema.Types.ObjectId, ref: 'SmartCar' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  insuranceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Insurance' },

  // Contract details
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  days: { type: Number, required: true },
  startLocation: { type: String, required: true },
  endLocation: { type: String, required: true },

  // Pricing
  prixVoiture: { type: Number, default: 0 },
  prixTotal: { type: Number, default: 0 },
  sommeDesFrais: { type: Number, default: 0 },

  // Vehicle condition
  niveauReservoir: { type: Number, default: 0 },
  reservoirEtat: { type: ReservoirStateSchema, default: () => ({}) },

  // Structured data
  assurance: { type: mongoose.Schema.Types.Mixed, default: {} },
  impot: {
    tvaRate: { type: Number, default: 0 },
    tva: Number,
    taxeSejour: Number,
    autresTaxes: Number
  },
  dommages: [{
    id: String,
    emplacement: String,
    description: String,
    type: { type: String, enum: ['leger', 'moyen', 'grave'], default: 'leger' },
    date: Date
  }],

  // Payment
  paymentMethods: [PaymentMethodSchema],
  paymentInfo: { type: PaymentInfoSchema, default: () => ({ methods: [] }) },
  methodPaiement: { type: String, default: 'espece' },
  cardInfo: mongoose.Schema.Types.Mixed,
  chequeInfo: mongoose.Schema.Types.Mixed,

  // Driver info
  conducteur: { type: ConducteurSchema, default: () => ({}) },

  // Costs
  additionalCosts: { type: AdditionalCostsSchema, default: () => ({}) },
  deliveryCost: { type: Number, default: 0 },
  dropOffCost: { type: Number, default: 0 },
  insuranceCost: { type: Number, default: 0 },
  babySeatCost: { type: Number, default: 0 },
  surveillanceCost: { type: Number, default: 0 },
  autresFrais: { type: Number, default: 0 },
  deposit: { type: Number, default: 0 },

  // Status & notes
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: String,
  internalNotes: String,
  entreprise: String,

  // Snapshots (immutable copies)
  clientSnapshot: { type: ClientSnapshotSchema, required: true },
  vehicleSnapshot: { type: VehicleSnapshotSchema, required: true },
  entrepriseSnapshot: { type: EnterpriseSnapshotSchema, required: true },
  insuranceSnapshot: { type: InsuranceSnapshotSchema },

  // Workflow tracking
  workflow: { type: WorkflowSchema, default: () => ({}) },

  // History
  history: [HistoryEntrySchema]

}, {
  timestamps: true
});

// ==================== INDEXES ====================

SmartContractSchema.index({ contractNumber: 1 });
SmartContractSchema.index({ clientId: 1 });
SmartContractSchema.index({ vehicleId: 1 });
SmartContractSchema.index({ createdBy: 1 });
SmartContractSchema.index({ entreprise: 1 });
SmartContractSchema.index({ startDate: 1, endDate: 1 });
SmartContractSchema.index({ status: 1 });

// ==================== METHODS ====================

SmartContractSchema.methods.addPayment = function(paymentData) {
  if (!this.paymentMethods) this.paymentMethods = [];
  this.paymentMethods.push(paymentData);

  const totalPaid = this.paymentMethods
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const totalDue = this.prixTotal || 0;

  this.paymentInfo = {
    methods: this.paymentMethods,
    totalPaid,
    totalDue,
    balance: totalDue - totalPaid,
    currency: this.paymentInfo?.currency || 'MAD',
    lastPaymentDate: paymentData.status === 'completed' ? new Date() : this.paymentInfo?.lastPaymentDate
  };
};

SmartContractSchema.methods.addHistory = function(action, performedBy, performedByName, details) {
  if (!this.history) this.history = [];
  this.history.push({
    action,
    performedBy,
    performedByName,
    date: new Date(),
    details
  });
};

module.exports = mongoose.model('SmartContract', SmartContractSchema);