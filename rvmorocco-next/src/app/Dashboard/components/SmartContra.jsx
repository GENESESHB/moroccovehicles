import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import SmartContraForm from './smartC/SmartContraForm';
import SmartContraList from './smartC/SmartContraList';
import {
  FaCar,
  FaUser,
  FaSearch,
  FaPlus
} from 'react-icons/fa';
// IMPORT THE EXTERNAL PRINT TEMPLATE
import { generateContractPrintContent } from './smartC/SmartContraPrintTemplate';

const SmartContra = ({
  user,
  clients = [],
  smartCars = [],
  setMessage
}) => {
  const [showForm, setShowForm] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableSmartCars, setAvailableSmartCars] = useState([]);
  const [smartContracts, setSmartContracts] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Car parts data matching the database structure
  const carPartsData = [
    { id: 'pare-chocs-avant', name: 'Pare-chocs Avant' },
    { id: 'pare-chocs-arriere', name: 'Pare-chocs Arriere' },
    { id: 'porte-avant-gauche', name: 'Porte Avant Gauche' },
    { id: 'porte-avant-droite', name: 'Porte Avant Droite' },
    { id: 'porte-arriere-gauche', name: 'Porte Arriere Gauche' },
    { id: 'porte-arriere-droite', name: 'Porte Arriere Droite' },
    { id: 'aile-avant-gauche', name: 'Aile Avant Gauche' },
    { id: 'aile-avant-droite', name: 'Aile Avant Droite' },
    { id: 'aile-arriere-gauche', name: 'Aile Arriere Gauche' },
    { id: 'aile-arriere-droite', name: 'Aile Arriere Droite' },
    { id: 'capot', name: 'Capot' },
    { id: 'coffre', name: 'Coffre' },
    { id: 'toit', name: 'Toit' },
    { id: 'retroviseur-gauche', name: 'Retroviseur Gauche' },
    { id: 'retroviseur-droit', name: 'Retroviseur Droit' },
    { id: 'phare-avant-gauche', name: 'Phare Avant Gauche' },
    { id: 'phare-avant-droite', name: 'Phare Avant Droite' },
    { id: 'feu-arriere-gauche', name: 'Feu Arriere Gauche' },
    { id: 'feu-arriere-droit', name: 'Feu Arriere Droite' },
    { id: 'vitre-avant', name: 'Pare-brise' },
    { id: 'vitre-arriere', name: 'Lunette Arriere' },
    { id: 'jante-avant-gauche', name: 'Jante Avant Gauche' },
    { id: 'jante-avant-droite', name: 'Jante Avant Droite' },
    { id: 'jante-arriere-gauche', name: 'Jante Arriere Gauche' },
    { id: 'jante-arriere-droite', name: 'Jante Arriere Droite' }
  ];

  // Form state - UPDATED with new financial fields
  const [formData, setFormData] = useState({
    clientId: '',
    vehicleId: '',
    smartCarId: '',
    startDate: '',
    endDate: '',
    startLocation: '',
    endLocation: '',
    prixVoiture: '',
    prixTotal: '',
    sommeDesFrais: '', // NEW: Sum of fees
    niveauReservoir: 0,
    reservoirEtat: {
      depart: {
        niveau: 0,
        km: 0,
        date: new Date().toISOString()
      },
      retour: {
        niveau: 0,
        km: 0,
        date: null
      },
      consommation: {
        prixLitre: 0,
        montantDu: 0
      }
    },
    assurance: {
      compagnie: '',
      numero: '',
      dateDebut: '',
      dateFin: ''
    },
    impot: {
      tvaRate: '', // NEW: TVA percentage rate
      tva: '',     // Calculated TVA amount
      taxeSejour: '',
      autresTaxes: ''
    },
    dommages: [],
    methodPaiement: 'espece',
    paymentMethods: [
      { type: 'espece', amount: 0, status: 'pending', reference: '' }
    ],
    paymentInfo: {
      methods: [],
      totalPaid: 0,
      totalDue: 0,
      balance: 0,
      currency: 'MAD'
    },
    cardInfo: {
      numero: '',
      nom: '',
      expiration: '',
      cvv: ''
    },
    chequeInfo: {
      numero: '',
      banque: '',
      dateEmission: ''
    },
    conducteur: {
      nom: '',
      prenom: '',
      cin: '',
      permis: '',
      dateDelivre: '',
    },
    deliveryCost: 0,
    dropOffCost: 0,
    insuranceCost: 0,
    babySeatCost: 0,
    surveillanceCost: 0,
    autresFrais: 0, // NEW: Other costs (Butter)
    deposit: 0,     // Caution - standalone, not calculated
    status: 'pending',
    notes: '',
    contractNumber: ''
  });

  // Utility function to remove empty fields recursively
  const removeEmptyFields = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) {
      return obj
        .map(item => removeEmptyFields(item))
        .filter(item => {
          if (item === null || item === undefined) return false;
          if (typeof item === 'string' && item.trim() === '') return false;
          if (Array.isArray(item) && item.length === 0) return false;
          if (typeof item === 'object' && !Array.isArray(item) && Object.keys(item).length === 0) return false;
          return true;
        });
    }
    const cleaned = {};
    for (const [key, value] of Object.entries(obj)) {
      const cleanedValue = removeEmptyFields(value);
      if (cleanedValue === null || cleanedValue === undefined) continue;
      if (typeof cleanedValue === 'string' && cleanedValue.trim() === '') continue;
      if (Array.isArray(cleanedValue) && cleanedValue.length === 0) continue;
      if (typeof cleanedValue === 'object' && !Array.isArray(cleanedValue) && Object.keys(cleanedValue).length === 0) continue;
      cleaned[key] = cleanedValue;
    }
    return cleaned;
  };

  // Load smart contracts
  const loadSmartContracts = async () => {
    try {
      setLoading(true);
      const res = await api.get('/contrasmart');
      
      if (res.data && res.data.success === false) {
        const errorMsg = res.data.message || 'Erreur lors du chargement des contrats';
        setMessage(`[X] ${errorMsg}`);
        setSmartContracts([]);
        return;
      }
      
      const contracts = res.data.contrasmarts || res.data || [];
      setSmartContracts(contracts);
      
      if (contracts.length === 0) {
        setMessage('[i] Aucun contrat intelligent trouve. Creez votre premier contrat!');
      }
    } catch (err) {
      console.error('[X] Erreur loading smart contracts:', err);
      setMessage(`[X] Erreur lors du chargement des contrats`);
      setSmartContracts([]);
    } finally {
      setLoading(false);
    }
  };

  // Load available smart cars
  useEffect(() => {
    const loadSmartCars = async () => {
      try {
        const res = await api.get('/smart-cars');
        if (res.data && res.data.success === false) {
          setMessage(`[X] ${res.data.message || 'Erreur'}`);
          setAvailableSmartCars([]);
          return;
        }
        setAvailableSmartCars(res.data.smartCars || res.data || []);
      } catch (err) {
        setMessage(`[X] Erreur lors du chargement des vehicules`);
        setAvailableSmartCars([]);
      }
    };
    
    loadSmartCars();
    loadSmartContracts();
  }, []);

  // Calculate days between dates for pricing
  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  // Calculate total price - UPDATED with new logic
  const calculateTotalPrice = () => {
    const days = calculateDays(formData.startDate, formData.endDate);
    const basePrice = parseFloat(formData.prixVoiture) || 0;
    const rentalCost = basePrice * days;
    
    // Additional costs
    const deliveryCost = parseFloat(formData.deliveryCost) || 0;
    const dropOffCost = parseFloat(formData.dropOffCost) || 0;
    const insuranceCost = parseFloat(formData.insuranceCost) || 0;
    const babySeatCost = parseFloat(formData.babySeatCost) || 0;
    const surveillanceCost = parseFloat(formData.surveillanceCost) || 0;
    const autresFrais = parseFloat(formData.autresFrais) || 0; // NEW
    
    // Somme des Frais (Sum of all fees) - EXCLUDES deposit
    const sommeDesFrais = rentalCost + deliveryCost + dropOffCost + insuranceCost + babySeatCost + surveillanceCost + autresFrais;
    
    // TVA calculated as percentage of Somme des Frais
    const tvaRate = parseFloat(formData.impot?.tvaRate) || 0;
    const tva = (sommeDesFrais * tvaRate) / 100;
    
    // Total = Somme des Frais + TVA (Deposit is standalone)
    const total = sommeDesFrais + tva;
    
    return {
      total,
      sommeDesFrais,
      tva,
      tvaRate,
      rentalCost,
      days
    };
  };

  // Update prixTotal when relevant fields change
  useEffect(() => {
    const financials = calculateTotalPrice();
    setFormData(prev => ({
      ...prev,
      prixTotal: financials.total.toFixed(2),
      sommeDesFrais: financials.sommeDesFrais.toFixed(2),
      impot: {
        ...prev.impot,
        tva: financials.tva.toFixed(2)
      }
    }));
  }, [
    formData.prixVoiture, 
    formData.startDate, 
    formData.endDate, 
    formData.impot?.tvaRate, // Changed from tva to tvaRate
    formData.deliveryCost, 
    formData.dropOffCost, 
    formData.insuranceCost, 
    formData.babySeatCost, 
    formData.surveillanceCost,
    formData.autresFrais // NEW
  ]);

  // Update vehicle price when vehicle is selected
  const handleVehicleChange = (vehicleId) => {
    if (vehicleId) {
      const selectedVehicle = availableSmartCars.find(v => v._id === vehicleId);
      if (selectedVehicle) {
        setFormData(prev => ({
          ...prev,
          vehicleId: vehicleId,
          smartCarId: vehicleId,
          prixVoiture: selectedVehicle.prixJour || selectedVehicle.prixPerDay || '0',
          reservoirEtat: {
            ...prev.reservoirEtat,
            depart: {
              ...prev.reservoirEtat?.depart,
              niveau: prev.reservoirEtat?.depart?.niveau || 0,
              km: selectedVehicle.currentKilometer || 0,
              date: prev.startDate || new Date().toISOString()
            }
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        vehicleId: '',
        smartCarId: '',
        prixVoiture: ''
      }));
    }
  };

  // Filter smart contracts
  const filteredContracts = smartContracts.filter(contract => {
    if (!contract) return false;
    const matchesFilter = filter === 'all' || contract.status === filter;
    const matchesSearch =
      contract.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientSnapshot?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.clientSnapshot?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.vehicleSnapshot?.nomVehicule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contract.vehicleSnapshot?.numeroMatricule?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Reset form - COMPLETE reset with all fields including new ones
  const resetForm = () => {
    setFormData({
      clientId: '',
      vehicleId: '',
      smartCarId: '',
      startDate: '',
      endDate: '',
      startLocation: '',
      endLocation: '',
      prixVoiture: '',
      prixTotal: '',
      sommeDesFrais: '', // NEW
      niveauReservoir: 0,
      reservoirEtat: {
        depart: {
          niveau: 0,
          km: 0,
          date: new Date().toISOString()
        },
        retour: {
          niveau: 0,
          km: 0,
          date: null
        },
        consommation: {
          prixLitre: 0,
          montantDu: 0
        }
      },
      assurance: { compagnie: '', numero: '', dateDebut: '', dateFin: '' },
      impot: { 
        tvaRate: '', // NEW
        tva: '', 
        taxeSejour: '', 
        autresTaxes: '' 
      },
      dommages: [],
      methodPaiement: 'espece',
      paymentMethods: [
        { type: 'espece', amount: 0, status: 'pending', reference: '' }
      ],
      paymentInfo: {
        methods: [],
        totalPaid: 0,
        totalDue: 0,
        balance: 0,
        currency: 'MAD'
      },
      cardInfo: { numero: '', nom: '', expiration: '', cvv: '' },
      chequeInfo: { numero: '', banque: '', dateEmission: '' },
      conducteur: { 
        nom: '', 
        prenom: '', 
        cin: '', 
        permis: '', 
        dateDelivre: '',
      },
      deliveryCost: 0,
      dropOffCost: 0,
      insuranceCost: 0,
      babySeatCost: 0,
      surveillanceCost: 0,
      autresFrais: 0, // NEW
      deposit: 0,     // Standalone caution
      status: 'pending',
      notes: '',
      contractNumber: ''
    });
    setEditingContract(null);
    setCurrentStep(1);
  };

  // Handle form input changes - UPDATED to handle nested fields properly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { 
          ...prev[parent], 
          [child]: value 
        }
      }));
    } else {
      // Handle numeric fields
      const numericFields = [
        'niveauReservoir', 
        'deliveryCost', 
        'dropOffCost', 
        'insuranceCost', 
        'babySeatCost', 
        'surveillanceCost',
        'autresFrais',  // NEW
        'deposit'       // Standalone
      ];
      
      if (numericFields.includes(name)) {
        const numValue = value === '' ? 0 : parseFloat(value);
        setFormData(prev => ({ ...prev, [name]: numValue }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  // Handle conducteur input changes
  const handleConducteurChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      conducteur: { ...prev.conducteur, [field]: value }
    }));
  };

  // Generate SVG Car Diagram with damages
  const generateCarSVG = (damages = []) => {
    const isDamaged = (partId) => damages.includes(partId);
    
    const colors = {
      damagedFill: '#fca5a5',
      damagedStroke: '#dc2626',
      normalGlassFill: '#dbeafe',
      normalGlassStroke: '#475569',
      roofFill: '#f1f5f9',
      roofStroke: '#64748b',
      hoodTrunkFill: '#f8fafc',
      hoodTrunkStroke: '#64748b',
      bumpersFill: '#e2e8f0',
      bumpersStroke: '#475569',
      doorsFill: '#f8fafc',
      doorsStroke: '#64748b',
      wheelsFill: '#334155',
      wheelsStroke: '#1e293b',
      wheelCenters: '#94a3b8',
      mirrorsFill: '#e2e8f0',
      mirrorsStroke: '#475569',
      headlightsFill: '#fef08a',
      headlightsStroke: '#ca8a04',
      taillightsFill: '#ef4444',
      taillightsStroke: '#991b1b'
    };

    return `
      <svg viewBox="0 0 320 480" style="width:100%;max-width:200px;height:auto;">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
          </filter>
        </defs>
        
        <g transform="translate(160, 240)">
          <path d="M -70 -180 C -90 -180, -100 -160, -100 -140 L -100 140 C -100 160, -90 180, -70 180 L 70 180 C 90 180, 100 160, 100 140 L 100 -140 C 100 -160, 90 -180, 70 -180 Z" 
                fill="white" stroke="#1e293b" stroke-width="2" />
          
          <path d="M -60 -120 L 60 -120 L 50 -80 L -50 -80 Z" 
                fill="${isDamaged('vitre-avant') ? colors.damagedFill : colors.normalGlassFill}" 
                stroke="${isDamaged('vitre-avant') ? colors.damagedStroke : colors.normalGlassStroke}" stroke-width="1.5"/>
          
          <path d="M -60 120 L 60 120 L 50 80 L -50 80 Z" 
                fill="${isDamaged('vitre-arriere') ? colors.damagedFill : colors.normalGlassFill}" 
                stroke="${isDamaged('vitre-arriere') ? colors.damagedStroke : colors.normalGlassStroke}" stroke-width="1.5"/>
          
          <rect x="-55" y="-80" width="110" height="160" rx="3"
                fill="${isDamaged('toit') ? colors.damagedFill : colors.roofFill}" 
                stroke="${isDamaged('toit') ? colors.damagedStroke : colors.roofStroke}" stroke-width="1.5"/>
          
          <path d="M -65 -180 L 65 -180 L 60 -120 L -60 -120 Z" 
                fill="${isDamaged('capot') ? colors.damagedFill : colors.hoodTrunkFill}" 
                stroke="${isDamaged('capot') ? colors.damagedStroke : colors.hoodTrunkStroke}" stroke-width="1.5"/>
          
          <path d="M -65 180 L 65 180 L 60 120 L -60 120 Z" 
                fill="${isDamaged('coffre') ? colors.damagedFill : colors.hoodTrunkFill}" 
                stroke="${isDamaged('coffre') ? colors.damagedStroke : colors.hoodTrunkStroke}" stroke-width="1.5"/>
          
          <path d="M -75 -190 Q 0 -200 75 -190 L 70 -180 L -70 -180 Z" 
                fill="${isDamaged('pare-chocs-avant') ? colors.damagedFill : colors.bumpersFill}" 
                stroke="${isDamaged('pare-chocs-avant') ? colors.damagedStroke : colors.bumpersStroke}" stroke-width="1.5"/>
          
          <path d="M -75 190 Q 0 200 75 190 L 70 180 L -70 180 Z" 
                fill="${isDamaged('pare-chocs-arriere') ? colors.damagedFill : colors.bumpersFill}" 
                stroke="${isDamaged('pare-chocs-arriere') ? colors.damagedStroke : colors.bumpersStroke}" stroke-width="1.5"/>
          
          <rect x="-100" y="-60" width="45" height="80" rx="2"
                fill="${isDamaged('porte-avant-gauche') ? colors.damagedFill : colors.doorsFill}" 
                stroke="${isDamaged('porte-avant-gauche') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
          
          <rect x="-100" y="20" width="45" height="80" rx="2"
                fill="${isDamaged('porte-arriere-gauche') ? colors.damagedFill : colors.doorsFill}" 
                stroke="${isDamaged('porte-arriere-gauche') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
          
          <rect x="55" y="-60" width="45" height="80" rx="2"
                fill="${isDamaged('porte-avant-droite') ? colors.damagedFill : colors.doorsFill}" 
                stroke="${isDamaged('porte-avant-droite') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
          
          <rect x="55" y="20" width="45" height="80" rx="2"
                fill="${isDamaged('porte-arriere-droite') ? colors.damagedFill : colors.doorsFill}" 
                stroke="${isDamaged('porte-arriere-droite') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
          
          <path d="M -100 -140 L -65 -140 L -65 -60 L -100 -60 Z" 
                fill="${isDamaged('aile-avant-gauche') ? colors.damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-avant-gauche') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <path d="M -100 100 L -65 100 L -65 20 L -100 20 Z" 
                fill="${isDamaged('aile-arriere-gauche') ? colors.damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-arriere-gauche') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <path d="M 100 -140 L 65 -140 L 65 -60 L 100 -60 Z" 
                fill="${isDamaged('aile-avant-droite') ? colors.damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-avant-droite') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <path d="M 100 100 L 65 100 L 65 20 L 100 20 Z" 
                fill="${isDamaged('aile-arriere-droite') ? colors.damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-arriere-droite') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <circle cx="-85" cy="-100" r="18" 
                  fill="${isDamaged('jante-avant-gauche') ? colors.damagedFill : colors.wheelsFill}" 
                  stroke="${isDamaged('jante-avant-gauche') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
          <circle cx="-85" cy="-100" r="10" fill="${colors.wheelCenters}"/>
          
          <circle cx="85" cy="-100" r="18" 
                  fill="${isDamaged('jante-avant-droite') ? colors.damagedFill : colors.wheelsFill}" 
                  stroke="${isDamaged('jante-avant-droite') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
          <circle cx="85" cy="-100" r="10" fill="${colors.wheelCenters}"/>
          
          <circle cx="-85" cy="100" r="18" 
                  fill="${isDamaged('jante-arriere-gauche') ? colors.damagedFill : colors.wheelsFill}" 
                  stroke="${isDamaged('jante-arriere-gauche') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
          <circle cx="-85" cy="100" r="10" fill="${colors.wheelCenters}"/>
          
          <circle cx="85" cy="100" r="18" 
                  fill="${isDamaged('jante-arriere-droite') ? colors.damagedFill : colors.wheelsFill}" 
                  stroke="${isDamaged('jante-arriere-droite') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
          <circle cx="85" cy="100" r="10" fill="${colors.wheelCenters}"/>
          
          <ellipse cx="-110" cy="-40" rx="6" ry="10" 
                   fill="${isDamaged('retroviseur-gauche') ? colors.damagedFill : colors.mirrorsFill}" 
                   stroke="${isDamaged('retroviseur-gauche') ? colors.damagedStroke : colors.mirrorsStroke}" stroke-width="1.5"/>
          
          <ellipse cx="110" cy="-40" rx="6" ry="10" 
                   fill="${isDamaged('retroviseur-droit') ? colors.damagedFill : colors.mirrorsFill}" 
                   stroke="${isDamaged('retroviseur-droit') ? colors.damagedStroke : colors.mirrorsStroke}" stroke-width="1.5"/>
          
          <path d="M -60 -175 L -40 -175 L -35 -165 L -60 -165 Z" 
                fill="${isDamaged('phare-avant-gauche') ? colors.damagedFill : colors.headlightsFill}" 
                stroke="${isDamaged('phare-avant-gauche') ? colors.damagedStroke : colors.headlightsStroke}" stroke-width="1"/>
          
          <path d="M 60 -175 L 40 -175 L 35 -165 L 60 -165 Z" 
                fill="${isDamaged('phare-avant-droit') ? colors.damagedFill : colors.headlightsFill}" 
                stroke="${isDamaged('phare-avant-droit') ? colors.damagedStroke : colors.headlightsStroke}" stroke-width="1"/>
          
          <path d="M -60 175 L -40 175 L -35 165 L -60 165 Z" 
                fill="${isDamaged('feu-arriere-gauche') ? colors.damagedFill : colors.taillightsFill}" 
                stroke="${isDamaged('feu-arriere-gauche') ? colors.damagedStroke : colors.taillightsStroke}" stroke-width="1"/>
          
          <path d="M 60 175 L 40 175 L 35 165 L 60 165 Z" 
                fill="${isDamaged('feu-arriere-droit') ? colors.damagedFill : colors.taillightsFill}" 
                stroke="${isDamaged('feu-arriere-droit') ? colors.damagedStroke : colors.taillightsStroke}" stroke-width="1"/>
        </g>
        
        <text x="160" y="15" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="bold">AVANT</text>
        <text x="160" y="465" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="bold">ARRIERE</text>
      </svg>
    `;
  };

  // Generate visual fuel gauge SVG for print
  const generateFuelGaugeSVG = (level) => {
    const normalizedLevel = Math.min(8, Math.max(0, Math.round((level / 100) * 8)));
    const fuelLevels = [
      { color: '#ef4444' }, { color: '#f97316' }, { color: '#f59e0b' }, { color: '#eab308' },
      { color: '#84cc16' }, { color: '#65a30d' }, { color: '#22c55e' }, { color: '#16a34a' }, { color: '#15803d' }
    ];
    
    let bars = '';
    for (let i = 0; i <= 8; i++) {
      const isActive = i <= normalizedLevel;
      const height = 20 + (i * 6);
      const barColor = isActive ? fuelLevels[i].color : '#e5e7eb';
      const borderColor = isActive ? fuelLevels[i].color : '#d1d5db';
      
      bars += `
        <rect x="${i * 12}" y="${80 - height}" width="10" height="${height}" 
              fill="${barColor}" stroke="${borderColor}" stroke-width="1" rx="1"/>
      `;
    }
    
    return `
      <svg viewBox="0 0 110 85" style="width:120px;height:auto;">
        ${bars}
        <text x="55" y="95" text-anchor="middle" font-size="10" fill="#374151" font-weight="bold">${level}%</text>
      </svg>
    `;
  };

  // Remove dommage from list
  const removeDommage = (id) => {
    setFormData(prev => ({
      ...prev,
      dommages: prev.dommages.filter(d => d.id !== id)
    }));
  };

  // Generate contract number
  const generateContractNumber = () => {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 1000);
    return `SMART-${timestamp}-${random}`;
  };

  // Handle form submission - COMPLETELY UPDATED with new financial fields and empty field removal
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const selectedVehicle = availableSmartCars.find(v => v._id === formData.vehicleId);
      const selectedClient = clients.find(c => c._id === formData.clientId);
      
      // Calculate financials using new logic
      const financials = calculateTotalPrice();
      const paymentMethods = formData.paymentMethods || [];
      const totalPaid = paymentMethods
        .filter(m => m.status === 'completed')
        .reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);
      
      // Prepare COMPLETE contract data with ALL fields including new ones
      const contractData = {
        // ============ BASIC INFO ============
        clientId: formData.clientId,
        vehicleId: formData.vehicleId,
        smartCarId: formData.smartCarId || formData.vehicleId,
        contractNumber: editingContract ? formData.contractNumber : generateContractNumber(),
        
        // ============ DATES & LOCATIONS ============
        startDate: formData.startDate,
        endDate: formData.endDate,
        startLocation: formData.startLocation,
        endLocation: formData.endLocation,
        
        // ============ PRICING - UPDATED ============
        prixVoiture: parseFloat(formData.prixVoiture) || 0,
        prixTotal: financials.total,
        sommeDesFrais: financials.sommeDesFrais, // NEW
        days: financials.days,
        
        // ============ RESERVOIR STATE - COMPLETE ============
        niveauReservoir: formData.reservoirEtat?.depart?.niveau || 0,
        reservoirEtat: {
          depart: {
            niveau: formData.reservoirEtat?.depart?.niveau || 0,
            km: formData.reservoirEtat?.depart?.km || 0,
            date: formData.startDate || formData.reservoirEtat?.depart?.date || new Date().toISOString()
          },
          retour: {
            niveau: formData.reservoirEtat?.retour?.niveau || 0,
            km: formData.reservoirEtat?.retour?.km || 0,
            date: formData.reservoirEtat?.retour?.date || null
          },
          consommation: {
            prixLitre: parseFloat(formData.reservoirEtat?.consommation?.prixLitre) || 0,
            montantDu: formData.reservoirEtat?.consommation?.montantDu || 0
          }
        },
        
        // ============ INSURANCE ============
        assurance: {
          compagnie: formData.assurance?.compagnie || '',
          numero: formData.assurance?.numero || '',
          dateDebut: formData.assurance?.dateDebut || '',
          dateFin: formData.assurance?.dateFin || ''
        },
        
        // ============ TAXES - UPDATED ============
        impot: {
          tvaRate: parseFloat(formData.impot?.tvaRate) || 0, // NEW: TVA percentage
          tva: financials.tva, // Calculated amount
          taxeSejour: parseFloat(formData.impot?.taxeSejour) || 0,
          autresTaxes: parseFloat(formData.impot?.autresTaxes) || 0
        },
        
        // ============ DAMAGES ============
        dommages: formData.dommages || [],
        
        // ============ PAYMENT METHODS - NEW STRUCTURE ============
        paymentMethods: paymentMethods.map(m => ({
          type: m.type,
          amount: parseFloat(m.amount) || 0,
          status: m.status,
          reference: m.reference || '',
          date: m.date || new Date().toISOString()
        })),
        
        // ============ PAYMENT INFO - COMPLETE SUMMARY ============
        paymentInfo: {
          methods: paymentMethods.map(m => ({
            type: m.type,
            amount: parseFloat(m.amount) || 0,
            status: m.status,
            reference: m.reference || '',
            date: m.date || new Date().toISOString()
          })),
          totalPaid: totalPaid,
          totalDue: financials.total,
          balance: financials.total - totalPaid,
          currency: 'MAD'
        },
        
        // ============ LEGACY PAYMENT FIELDS (Backward Compatibility) ============
        methodPaiement: paymentMethods[0]?.type || 'espece',
        cardInfo: {
          numero: formData.cardInfo?.numero || '',
          nom: formData.cardInfo?.nom || '',
          expiration: formData.cardInfo?.expiration || '',
          cvv: formData.cardInfo?.cvv || ''
        },
        chequeInfo: {
          numero: formData.chequeInfo?.numero || '',
          banque: formData.chequeInfo?.banque || '',
          dateEmission: formData.chequeInfo?.dateEmission || ''
        },
        
        // ============ DRIVER INFO ============
        conducteur: {
          nom: formData.conducteur?.nom || '',
          prenom: formData.conducteur?.prenom || '',
          cin: formData.conducteur?.cin || '',
          permis: formData.conducteur?.permis || '',
          dateDelivre: formData.conducteur?.dateDelivre || ''
        },
        
        // ============ ADDITIONAL COSTS - UPDATED ============
        deliveryCost: parseFloat(formData.deliveryCost) || 0,
        dropOffCost: parseFloat(formData.dropOffCost) || 0,
        insuranceCost: parseFloat(formData.insuranceCost) || 0,
        babySeatCost: parseFloat(formData.babySeatCost) || 0,
        surveillanceCost: parseFloat(formData.surveillanceCost) || 0,
        autresFrais: parseFloat(formData.autresFrais) || 0, // NEW
        deposit: parseFloat(formData.deposit) || 0,         // Standalone caution
        
        // ============ STATUS & NOTES ============
        status: formData.status || 'pending',
        notes: formData.notes || '',
        
        // ============ METADATA ============
        createdBy: user?._id,
        entreprise: user?.entreprise,
        createdAt: editingContract ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        
        // ============ EMBEDDED INFO FOR QUICK ACCESS ============
        vehicleSnapshot: selectedVehicle ? {
          _id: selectedVehicle._id,
          nomVehicule: selectedVehicle.nomVehicule,
          numeroMatricule: selectedVehicle.numeroMatricule,
          typeVehicule: selectedVehicle.typeVehicule,
          boiteVitesse: selectedVehicle.boiteVitesse,
          typeCarburant: selectedVehicle.typeCarburant,
          imageVehicule: selectedVehicle.imageVehicule,
          currentKilometer: selectedVehicle.currentKilometer,
          prixJour: selectedVehicle.prixJour,
          prixPerDay: selectedVehicle.prixPerDay,
          equipements: selectedVehicle.equipements || []
        } : null,
        
        clientSnapshot: selectedClient ? {
          _id: selectedClient._id,
          firstName: selectedClient.firstName,
          lastName: selectedClient.lastName,
          cin: selectedClient.cin,
          phone: selectedClient.phone,
          email: selectedClient.email,
          birthDate: selectedClient.birthDate,
          address: selectedClient.address,
          passport: selectedClient.passport,
          licenseNumber: selectedClient.licenseNumber,
          licenseIssueDate: selectedClient.licenseIssueDate
        } : null,
        
        entrepriseSnapshot: user ? {
          _id: user._id,
          name: user.name,
          entreprise: user.entreprise,
          number: user.number,
          email: user.email,
          logoEntreprise: user.logoEntreprise,
          country: user.country,
          city: user.city,
          address: user.address,
          siret: user.siret,
          tvaNumber: user.tvaNumber
        } : null,
        
        // On peut aussi ajouter insuranceSnapshot si necessaire
        insuranceSnapshot: selectedVehicle?.assurance ? {
          company: selectedVehicle.assurance.compagnie,
          policyNumber: selectedVehicle.assurance.numeroContrat,
          startDate: selectedVehicle.assurance.dateDebut,
          endDate: selectedVehicle.assurance.dateFin,
          cost: selectedVehicle.assurance.cost,
          status: selectedVehicle.assurance.status,
          coverage: selectedVehicle.assurance.type
        } : null
      };

      // Remove undefined fields for clean update
      if (editingContract) {
        Object.keys(contractData).forEach(key => {
          if (contractData[key] === undefined) {
            delete contractData[key];
          }
        });
      }

      // ============ CLEAN EMPTY FIELDS ============
      const cleanedData = removeEmptyFields(contractData);

      let res;
      let successMessage = '';
      
      if (editingContract) {
        res = await api.put(`/contrasmart/${editingContract._id}`, cleanedData);
        successMessage = 'Contrat intelligent mis a jour avec succes';
      } else {
        res = await api.post('/contrasmart', cleanedData);
        successMessage = 'Contrat intelligent cree avec succes';
      }

      setMessage(`[OK] ${successMessage}`);
      await loadSmartContracts();
      setShowForm(false);
      resetForm();
    } catch (err) {
      console.error('Submit error:', err);
      setMessage(`[X] Erreur lors de la sauvegarde: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Edit contract - COMPLETELY UPDATED to load ALL fields including new ones
  const handleEdit = (contract) => {
    if (!contract) return;
    setEditingContract(contract);
    setFormData({
      // Basic Info
      clientId: contract.clientId || contract.clientSnapshot?._id || '',
      vehicleId: contract.vehicleId || contract.vehicleSnapshot?._id || '',
      smartCarId: contract.smartCarId || contract.vehicleSnapshot?._id || '',
      contractNumber: contract.contractNumber || '',
      
      // Dates & Locations
      startDate: contract.startDate || '',
      endDate: contract.endDate || '',
      startLocation: contract.startLocation || '',
      endLocation: contract.endLocation || '',
      
      // Pricing - UPDATED
      prixVoiture: contract.prixVoiture || '',
      prixTotal: contract.prixTotal || '',
      sommeDesFrais: contract.sommeDesFrais || '', // NEW
      
      // Reservoir - COMPLETE
      niveauReservoir: contract.niveauReservoir || contract.reservoirEtat?.depart?.niveau || 0,
      reservoirEtat: {
        depart: {
          niveau: contract.reservoirEtat?.depart?.niveau || contract.niveauReservoir || 0,
          km: contract.reservoirEtat?.depart?.km || contract.vehicleSnapshot?.currentKilometer || 0,
          date: contract.reservoirEtat?.depart?.date || contract.startDate || new Date().toISOString()
        },
        retour: {
          niveau: contract.reservoirEtat?.retour?.niveau || 0,
          km: contract.reservoirEtat?.retour?.km || 0,
          date: contract.reservoirEtat?.retour?.date || null
        },
        consommation: {
          prixLitre: contract.reservoirEtat?.consommation?.prixLitre || 0,
          montantDu: contract.reservoirEtat?.consommation?.montantDu || 0
        }
      },
      
      // Insurance
      assurance: contract.assurance || { 
        compagnie: '', 
        numero: '', 
        dateDebut: '', 
        dateFin: '' 
      },
      
      // Taxes - UPDATED with tvaRate
      impot: contract.impot || { 
        tvaRate: '',  // NEW
        tva: '', 
        taxeSejour: '', 
        autresTaxes: '' 
      },
      
      // Damages
      dommages: contract.dommages || [],
      
      // Payment - COMPLETE with new structure
      methodPaiement: contract.methodPaiement || 'espece',
      paymentMethods: contract.paymentMethods || 
                     contract.paymentInfo?.methods || 
                     (contract.methodPaiement ? 
                       [{ 
                         type: contract.methodPaiement, 
                         amount: contract.prixTotal || 0, 
                         status: 'pending', 
                         reference: '' 
                       }] : 
                       [{ type: 'espece', amount: 0, status: 'pending', reference: '' }]
                     ),
      paymentInfo: contract.paymentInfo || {
        methods: contract.paymentMethods || contract.paymentInfo?.methods || [],
        totalPaid: contract.paymentInfo?.totalPaid || 0,
        totalDue: contract.paymentInfo?.totalDue || contract.prixTotal || 0,
        balance: contract.paymentInfo?.balance || contract.prixTotal || 0,
        currency: 'MAD'
      },
      
      // Legacy payment fields
      cardInfo: contract.cardInfo || { 
        numero: '', 
        nom: '', 
        expiration: '', 
        cvv: '' 
      },
      chequeInfo: contract.chequeInfo || { 
        numero: '', 
        banque: '', 
        dateEmission: '' 
      },
      
      // Driver Info
      conducteur: { 
        nom: contract.conducteur?.nom || '', 
        prenom: contract.conducteur?.prenom || '', 
        cin: contract.conducteur?.cin || '', 
        permis: contract.conducteur?.permis || '', 
        dateDelivre: contract.conducteur?.dateDelivre || '',
      },
      
      // Additional Costs - UPDATED
      deliveryCost: contract.deliveryCost || 0,
      dropOffCost: contract.dropOffCost || 0,
      insuranceCost: contract.insuranceCost || 0,
      babySeatCost: contract.babySeatCost || 0,
      surveillanceCost: contract.surveillanceCost || 0,
      autresFrais: contract.autresFrais || 0, // NEW
      deposit: contract.deposit || 0,         // Standalone
      
      // Status & Notes
      status: contract.status || 'pending',
      notes: contract.notes || ''
    });
    
    setShowForm(true);
    setCurrentStep(1);
  };

  // Delete contract
  const handleDelete = async (contractId) => {
    if (!contractId) return;
    if (window.confirm('Etes-vous sur de vouloir supprimer ce contrat intelligent ?')) {
      try {
        await api.delete(`/contrasmart/${contractId}`);
        setMessage('[OK] Contrat intelligent supprime avec succes');
        await loadSmartContracts();
      } catch (err) {
        setMessage(`[X] Erreur lors de la suppression`);
      }
    }
  };

  // Quick Status Update
  const handleStatusUpdate = async (contractId, newStatus) => {
    try {
      setSmartContracts(prev => prev.map(contract => 
        contract._id === contractId ? { ...contract, status: newStatus } : contract
      ));
      await api.put(`/contrasmart/${contractId}`, { status: newStatus });
      setMessage(`[OK] Statut mis a jour`);
    } catch (err) {
      await loadSmartContracts();
      setMessage(`[X] Erreur lors de la mise a jour du statut`);
    }
  };

  // ==================== ENHANCED PRINT FUNCTION (USES EXTERNAL TEMPLATE) ====================
  const handlePrint = (contract) => {
    if (!contract) return;
    
    const printWindow = window.open('', '_blank');
    
    // Use the external template generator
    const printContent = generateContractPrintContent(contract, user, carPartsData);
    
    printWindow.document.write(printContent);
    printWindow.document.close();
    setTimeout(() => printWindow.print(), 300);
  };

  // Download contract as PDF
  const handleDownload = (contract) => {
    handlePrint(contract);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'active': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#333333'
    }}>
      {/* Header with Stats and Search */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '12px 16px',
        marginBottom: '16px',
        border: '1px solid #E0E0E0',
        borderRadius: '8px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#333333', whiteSpace: 'nowrap' }}>
              Contrats Vehicules Intelligents
            </h2>
            <span style={{ fontSize: '14px', color: '#666666' }}>
              ({filteredContracts.length} sur {smartContracts.length})
            </span>
          </div>
          
          <div style={{ flex: 1, maxWidth: '300px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Rechercher un contrat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 36px 8px 12px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E0E0E0',
                  borderRadius: '6px',
                  color: '#333333',
                  fontSize: '14px'
                }}
              />
              <FaSearch style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: '#666666'
              }} />
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {[
            { color: '#2196F3', label: 'Total', count: smartContracts.length },
            { color: '#4CAF50', label: 'Actifs', count: smartContracts.filter(c => c.status === 'active').length },
            { color: '#FF9800', label: 'En attente', count: smartContracts.filter(c => c.status === 'pending').length },
            { color: '#F44336', label: 'Annules', count: smartContracts.filter(c => c.status === 'cancelled').length }
          ].map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', backgroundColor: stat.color, borderRadius: '2px' }} />
              <span style={{ fontSize: '12px', color: '#333333', fontWeight: '500' }}>
                {stat.label}: <strong style={{ fontSize: '14px' }}>{stat.count}</strong>
              </span>
            </div>
          ))}
        </div>

        {/* Filter Buttons and Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['all', 'active', 'pending', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: filter === filterType ? 
                    (filterType === 'all' ? '#2196F3' : filterType === 'active' ? '#4CAF50' : filterType === 'pending' ? '#FF9800' : '#2196F3') 
                    : '#FFFFFF',
                  color: filter === filterType ? '#FFFFFF' : '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '500',
                  textTransform: 'capitalize'
                }}
              >
                {filterType === 'all' ? 'Tous' : filterType}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#4CAF50',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FaPlus style={{ width: '10px', height: '10px' }} /> Nouveau Contrat
          </button>
        </div>
      </div>

      {/* Contracts List Component */}
      <SmartContraList
        smartContracts={smartContracts}
        loading={loading}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filteredContracts={filteredContracts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handlePrint={handlePrint}
        handleDownload={handleDownload}
        handleStatusUpdate={handleStatusUpdate}
        getStatusColor={getStatusColor}
        formatDate={formatDate}
        calculateDays={calculateDays}
        setMessage={setMessage}
        setShowForm={setShowForm}
        carPartsData={carPartsData}
        generateCarSVG={generateCarSVG}
        user={user}
      />

      {/* Form Component */}
      <SmartContraForm
        showForm={showForm}
        setShowForm={setShowForm}
        editingContract={editingContract}
        loading={loading}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        formData={formData}
        setFormData={setFormData}
        availableSmartCars={availableSmartCars}
        clients={clients}
        carPartsData={carPartsData}
        calculateDays={calculateDays}
        handleVehicleChange={handleVehicleChange}
        handleInputChange={handleInputChange}
        handleConducteurChange={handleConducteurChange}
        generateCarSVG={generateCarSVG}
        removeDommage={removeDommage}
        handleSubmit={handleSubmit}
        resetForm={resetForm}
      />
    </div>
  );
};

export default SmartContra;