import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ContractFormPopup from './forms/ContractFormPopup';
import ContractsList from './lists/ContractsList';

const ContractsManagement = ({ user, vehicles, contracts, setContracts, setMessage, loadContracts }) => {
  const [contractForm, setContractForm] = useState({
    // Client information
    clientLastName: '',
    clientFirstName: '',
    clientBirthDate: '',
    clientPhone: '',
    clientAddress: '',
    clientPassport: '',
    clientCIN: '',
    clientLicenseNumber: '',
    clientLicenseIssueDate: '',

    // Second driver information
    secondDriverLastName: '',
    secondDriverFirstName: '',
    secondDriverLicenseNumber: '',
    secondDriverLicenseIssueDate: '',

    // Rental information
    vehicleId: '',
    startDateTime: '',
    endDateTime: '',
    startLocation: '',
    endLocation: '',
    prixParJour: '',
    prixTotal: 0,

    // Additional costs
    deliveryCost: 0,
    dropOffCost: 0,
    insuranceCost: 0,
    babySeatCost: 0,
    surveillanceCost: 0,
    tva: 0,
    deposit: 0,

    // Vehicle damages from vehicleInfo.dommages
    dommages: []
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingContract, setEditingContract] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Car parts data matching your database IDs
  const carPartsData = [
    { id: 'pare-chocs-avant', name: 'Pare-chocs Avant' },
    { id: 'pare-chocs-arriere', name: 'Pare-chocs Arrière' },
    { id: 'porte-avant-gauche', name: 'Porte Avant Gauche' },
    { id: 'porte-avant-droite', name: 'Porte Avant Droite' },
    { id: 'porte-arriere-gauche', name: 'Porte Arrière Gauche' },
    { id: 'porte-arriere-droite', name: 'Porte Arrière Droite' },
    { id: 'aile-avant-gauche', name: 'Aile Avant Gauche' },
    { id: 'aile-avant-droite', name: 'Aile Avant Droite' },
    { id: 'aile-arriere-gauche', name: 'Aile Arrière Gauche' },
    { id: 'aile-arriere-droite', name: 'Aile Arrière Droite' },
    { id: 'capot', name: 'Capot' },
    { id: 'coffre', name: 'Coffre' },
    { id: 'toit', name: 'Toit' },
    { id: 'retroviseur-gauche', name: 'Rétroviseur Gauche' },
    { id: 'retroviseur-droit', name: 'Rétroviseur Droit' },
    { id: 'phare-avant-gauche', name: 'Phare Avant Gauche' },
    { id: 'phare-avant-droit', name: 'Phare Avant Droite' },
    { id: 'feu-arriere-gauche', name: 'Feu Arrière Gauche' },
    { id: 'feu-arriere-droit', name: 'Feu Arrière Droite' },
    { id: 'vitre-avant', name: 'Pare-brise' },
    { id: 'vitre-arriere', name: 'Lunette Arrière' },
    { id: 'jante-avant-gauche', name: 'Jante Avant Gauche' },
    { id: 'jante-avant-droite', name: 'Jante Avant Droite' },
    { id: 'jante-arriere-gauche', name: 'Jante Arrière Gauche' },
    { id: 'jante-arriere-droite', name: 'Jante Arrière Droite' }
  ];

  useEffect(() => {
    if (!showPopup) resetForm();
  }, [showPopup]);

  const resetForm = () => {
    setContractForm({
      clientLastName: '',
      clientFirstName: '',
      clientBirthDate: '',
      clientPhone: '',
      clientAddress: '',
      clientPassport: '',
      clientCIN: '',
      clientLicenseNumber: '',
      clientLicenseIssueDate: '',
      secondDriverLastName: '',
      secondDriverFirstName: '',
      secondDriverLicenseNumber: '',
      secondDriverLicenseIssueDate: '',
      vehicleId: '',
      startDateTime: '',
      endDateTime: '',
      startLocation: '',
      endLocation: '',
      prixParJour: '',
      prixTotal: 0,
      deliveryCost: 0,
      dropOffCost: 0,
      insuranceCost: 0,
      babySeatCost: 0,
      surveillanceCost: 0,
      tva: 0,
      deposit: 0,
      dommages: []
    });
    setErrors({});
    setEditingContract(null);
    setIsEditing(false);
  };

  const handleContractChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ['prixParJour', 'deliveryCost', 'dropOffCost', 'insuranceCost', 'babySeatCost', 'surveillanceCost', 'tva', 'deposit'];
    
    if (numericFields.includes(name)) {
      setContractForm({ ...contractForm, [name]: parseFloat(value) || 0 });
    } else {
      setContractForm({ ...contractForm, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const toggleDamage = (partId) => {
    const current = contractForm.dommages || [];
    const updated = current.includes(partId) 
      ? current.filter(id => id !== partId)
      : [...current, partId];
    setContractForm({ ...contractForm, dommages: updated });
  };

  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    const date = dateObj.$date ? new Date(dateObj.$date) : new Date(dateObj);
    return date.toISOString().split('T')[0];
  };

  const formatDateTimeLocal = (dateObj) => {
    if (!dateObj) return '';
    const date = dateObj.$date ? new Date(dateObj.$date) : new Date(dateObj);
    return date.toISOString().slice(0, 16);
  };

  const checkBlacklist = async (cin, passport) => {
    try {
      const response = await api.get('/blacklist/check', { params: { cin, passport } });
      return response.data.isBlacklisted;
    } catch (error) {
      console.error('Error checking blacklist:', error);
      return false;
    }
  };

  const calculateRentalDetails = () => {
    const selectedVehicle = vehicles.find(v => v._id === contractForm.vehicleId);
    const prixParJour = parseFloat(contractForm.prixParJour) || selectedVehicle?.pricePerDay || 0;
    
    const start = new Date(contractForm.startDateTime);
    const end = new Date(contractForm.endDateTime);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const rentalDays = diffDays === 0 ? 1 : diffDays;
    const rentalCost = rentalDays * prixParJour;
    
    const deliveryCost = parseFloat(contractForm.deliveryCost) || 0;
    const dropOffCost = parseFloat(contractForm.dropOffCost) || 0;
    const insuranceCost = parseFloat(contractForm.insuranceCost) || 0;
    const babySeatCost = parseFloat(contractForm.babySeatCost) || 0;
    const surveillanceCost = parseFloat(contractForm.surveillanceCost) || 0;
    const tva = parseFloat(contractForm.tva) || 0;
    const deposit = parseFloat(contractForm.deposit) || 0;
    
    const subtotal = rentalCost + deliveryCost + dropOffCost + insuranceCost + babySeatCost + surveillanceCost;
    const prixTotal = subtotal + tva;

    return {
      rentalDays, rentalCost, prixParJour, subtotal, prixTotal,
      deliveryCost, dropOffCost, insuranceCost, babySeatCost, surveillanceCost, tva, deposit
    };
  };

  const buildContractData = () => {
    const selectedVehicle = vehicles.find(v => v._id === contractForm.vehicleId);
    const calc = calculateRentalDetails();

    return {
      partnerInfo: {
        partnerId: user._id || user.id,
        partnerName: user.entreprise || user.name,
        partnerEmail: user.email,
        partnerPhone: user.number || user.telephone,
        partnerLogo: user.logoEntreprise,
        partnerCountry: user.country,
        partnerCity: user.city,
        partnerStatus: user.status,
        partnerRole: user.role,
        partnerCreatedAt: user.createdAt,
        partnerUpdatedAt: user.updatedAt
      },
      clientInfo: {
        lastName: contractForm.clientLastName,
        firstName: contractForm.clientFirstName,
        birthDate: contractForm.clientBirthDate,
        phone: contractForm.clientPhone,
        address: contractForm.clientAddress,
        passport: contractForm.clientPassport,
        cin: contractForm.clientCIN,
        licenseNumber: contractForm.clientLicenseNumber,
        licenseIssueDate: contractForm.clientLicenseIssueDate
      },
      secondDriverInfo: {
        lastName: contractForm.secondDriverLastName,
        firstName: contractForm.secondDriverFirstName,
        licenseNumber: contractForm.secondDriverLicenseNumber,
        licenseIssueDate: contractForm.clientLicenseIssueDate
      },
      vehicleInfo: {
        vehicleId: selectedVehicle._id,
        name: selectedVehicle.name,
        type: selectedVehicle.type,
        boiteVitesse: selectedVehicle.boiteVitesse,
        description: selectedVehicle.description,
        image: selectedVehicle.image,
        pricePerDay: selectedVehicle.pricePerDay,
        carburant: selectedVehicle.carburant,
        niveauReservoir: selectedVehicle.niveauReservoir,
        radio: selectedVehicle.radio,
        gps: selectedVehicle.gps,
        mp3: selectedVehicle.mp3,
        cd: selectedVehicle.cd,
        matricule: selectedVehicle.matricule,
        impot2026: selectedVehicle.impot2026,
        impot2027: selectedVehicle.impot2027,
        impot2028: selectedVehicle.impot2028,
        impot2029: selectedVehicle.impot2029,
        assuranceStartDate: selectedVehicle.assuranceStartDate,
        assuranceEndDate: selectedVehicle.assuranceEndDate,
        vidangeInterval: selectedVehicle.vidangeInterval,
        remarques: selectedVehicle.remarques,
        dommages: contractForm.dommages,
        available: selectedVehicle.available,
        createdAt: selectedVehicle.createdAt,
        updatedAt: selectedVehicle.updatedAt
      },
      rentalInfo: {
        startDateTime: contractForm.startDateTime,
        endDateTime: contractForm.endDateTime,
        startLocation: contractForm.startLocation,
        endLocation: contractForm.endLocation,
        prixParJour: calc.prixParJour,
        rentalDays: calc.rentalDays,
        rentalCost: calc.rentalCost,
        deliveryCost: calc.deliveryCost,
        dropOffCost: calc.dropOffCost,
        insuranceCost: calc.insuranceCost,
        babySeatCost: calc.babySeatCost,
        surveillanceCost: calc.surveillanceCost,
        tva: calc.tva,
        deposit: calc.deposit,
        subtotal: calc.subtotal,
        prixTotal: calc.prixTotal
      },
      contractMetadata: {
        createdBy: user._id || user.id,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
    };
  };

  const createContract = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!contractForm.clientLastName || !contractForm.clientFirstName || !contractForm.clientBirthDate ||
        !contractForm.clientPhone || !contractForm.clientAddress || !contractForm.clientLicenseNumber ||
        !contractForm.clientLicenseIssueDate || !contractForm.vehicleId || !contractForm.startDateTime ||
        !contractForm.endDateTime || !contractForm.startLocation || !contractForm.endLocation) {
      setMessage('Veuillez remplir tous les champs obligatoires.');
      setLoading(false);
      return;
    }

    try {
      const isBlacklisted = await checkBlacklist(contractForm.clientCIN, contractForm.clientPassport);
      if (isBlacklisted) {
        setMessage('Ce client est dans la liste noire! Contrat non autorisé.');
        setLoading(false);
        return;
      }

      const contractData = buildContractData();
      await api.post('/contracts', contractData);

      resetForm();
      setShowPopup(false);
      await loadContracts();
      setMessage('Contrat créé avec succès!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Erreur création contrat:', err);
      setMessage('Erreur: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const updateContract = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const contractData = buildContractData();
      delete contractData.contractMetadata;
      
      await api.put(`/contracts/${editingContract._id}`, contractData);
      
      resetForm();
      setShowPopup(false);
      await loadContracts();
      setMessage('Contrat modifié avec succès!');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      console.error('Erreur modification:', err);
      setMessage('Erreur: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteContract = async (contractId) => {
    try {
      await api.delete(`/contracts/${contractId}`);
      setContracts(contracts.filter(c => c._id !== contractId));
      setMessage('Contrat supprimé avec succès!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Erreur suppression: ' + (err.response?.data?.message || err.message));
    }
  };

  const updateContractStatus = async (contractId, status) => {
    try {
      await api.patch(`/contracts/${contractId}`, { status });
      setContracts(contracts.map(c => c._id === contractId ? { ...c, status } : c));
      setMessage(`Statut mis à jour: ${status}`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Erreur: ' + (err.response?.data?.message || err.message));
    }
  };

  const downloadContract = (contract) => {
    const contractWindow = window.open('', '_blank');
    
    const getValue = (obj, field) => {
      if (!obj) return '';
      if (obj[field]?.$date) return new Date(obj[field].$date);
      if (obj[field] !== undefined) return obj[field];
      return '';
    };

    const formatDisplayDate = (dateVal) => {
      if (!dateVal) return 'N/A';
      const d = new Date(dateVal);
      return isNaN(d) ? 'N/A' : d.toLocaleDateString('fr-FR');
    };

    const formatDisplayDateTime = (dateVal) => {
      if (!dateVal) return 'N/A';
      const d = new Date(dateVal);
      return isNaN(d) ? 'N/A' : d.toLocaleString('fr-FR', { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit' 
      });
    };

    const partnerInfo = contract.partnerInfo || {};
    const clientInfo = contract.clientInfo || {};
    const secondDriverInfo = contract.secondDriverInfo || {};
    const vehicleInfo = contract.vehicleInfo || {};
    const rentalInfo = contract.rentalInfo || {};
    
    const dommages = vehicleInfo.dommages || [];
    
    const partnerName = partnerInfo.partnerName || user.entreprise || user.name || 'Agence';
    const partnerLogo = partnerInfo.partnerLogo || user.logoEntreprise || '';

    const generateCarSVG = () => {
      const isDamaged = (partId) => dommages.includes(partId);
      
      // New color scheme
      const damagedFill = '#fca5a5'; // Light Red
      const damagedStroke = '#dc2626'; // Red
      const normalGlassFill = '#dbeafe'; // Light Blue
      const normalGlassStroke = '#475569'; // Slate
      const roofFill = '#f1f5f9'; // Very Light Gray
      const roofStroke = '#64748b'; // Gray
      const hoodTrunkFill = '#f8fafc'; // Very Light Gray
      const hoodTrunkStroke = '#64748b'; // Gray
      const bumpersFill = '#e2e8f0'; // Light Gray
      const bumpersStroke = '#475569'; // Slate
      const doorsFill = '#f8fafc'; // Very Light Gray
      const doorsStroke = '#64748b'; // Gray
      const wheelsFill = '#334155'; // Dark Slate
      const wheelsStroke = '#1e293b'; // Very Dark
      const wheelCenters = '#94a3b8'; // Light Gray
      const mirrorsFill = '#e2e8f0'; // Light Gray
      const mirrorsStroke = '#475569'; // Slate
      const headlightsFill = '#fef08a'; // Light Yellow
      const headlightsStroke = '#ca8a04'; // Dark Yellow
      const taillightsFill = '#ef4444'; // Red
      const taillightsStroke = '#991b1b'; // Dark Red
      
      return `
      <svg viewBox="0 0 320 480" style="width:100%;max-width:180px;height:auto;">
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
          </filter>
        </defs>
        
        <g transform="translate(160, 240)">
          <!-- Main Body Outline -->
          <path d="M -70 -180 C -90 -180, -100 -160, -100 -140 L -100 140 C -100 160, -90 180, -70 180 L 70 180 C 90 180, 100 160, 100 140 L 100 -140 C 100 -160, 90 -180, 70 -180 Z" 
                fill="white" stroke="#1e293b" stroke-width="2" />
          
          <!-- Windshield -->
          <path d="M -60 -120 L 60 -120 L 50 -80 L -50 -80 Z" 
                fill="${isDamaged('vitre-avant') ? damagedFill : normalGlassFill}" 
                stroke="${isDamaged('vitre-avant') ? damagedStroke : normalGlassStroke}" stroke-width="1.5"/>
          
          <!-- Rear Window -->
          <path d="M -60 120 L 60 120 L 50 80 L -50 80 Z" 
                fill="${isDamaged('vitre-arriere') ? damagedFill : normalGlassFill}" 
                stroke="${isDamaged('vitre-arriere') ? damagedStroke : normalGlassStroke}" stroke-width="1.5"/>
          
          <!-- Roof -->
          <rect x="-55" y="-80" width="110" height="160" rx="3"
                fill="${isDamaged('toit') ? damagedFill : roofFill}" 
                stroke="${isDamaged('toit') ? damagedStroke : roofStroke}" stroke-width="1.5"/>
          
          <!-- Hood -->
          <path d="M -65 -180 L 65 -180 L 60 -120 L -60 -120 Z" 
                fill="${isDamaged('capot') ? damagedFill : hoodTrunkFill}" 
                stroke="${isDamaged('capot') ? damagedStroke : hoodTrunkStroke}" stroke-width="1.5"/>
          
          <!-- Trunk -->
          <path d="M -65 180 L 65 180 L 60 120 L -60 120 Z" 
                fill="${isDamaged('coffre') ? damagedFill : hoodTrunkFill}" 
                stroke="${isDamaged('coffre') ? damagedStroke : hoodTrunkStroke}" stroke-width="1.5"/>
          
          <!-- Front Bumper -->
          <path d="M -75 -190 Q 0 -200 75 -190 L 70 -180 L -70 -180 Z" 
                fill="${isDamaged('pare-chocs-avant') ? damagedFill : bumpersFill}" 
                stroke="${isDamaged('pare-chocs-avant') ? damagedStroke : bumpersStroke}" stroke-width="1.5"/>
          
          <!-- Rear Bumper -->
          <path d="M -75 190 Q 0 200 75 190 L 70 180 L -70 180 Z" 
                fill="${isDamaged('pare-chocs-arriere') ? damagedFill : bumpersFill}" 
                stroke="${isDamaged('pare-chocs-arriere') ? damagedStroke : bumpersStroke}" stroke-width="1.5"/>
          
          <!-- Front Left Door -->
          <rect x="-100" y="-60" width="45" height="80" rx="2"
                fill="${isDamaged('porte-avant-gauche') ? damagedFill : doorsFill}" 
                stroke="${isDamaged('porte-avant-gauche') ? damagedStroke : doorsStroke}" stroke-width="1.5"/>
          
          <!-- Rear Left Door -->
          <rect x="-100" y="20" width="45" height="80" rx="2"
                fill="${isDamaged('porte-arriere-gauche') ? damagedFill : doorsFill}" 
                stroke="${isDamaged('porte-arriere-gauche') ? damagedStroke : doorsStroke}" stroke-width="1.5"/>
          
          <!-- Front Right Door -->
          <rect x="55" y="-60" width="45" height="80" rx="2"
                fill="${isDamaged('porte-avant-droite') ? damagedFill : doorsFill}" 
                stroke="${isDamaged('porte-avant-droite') ? damagedStroke : doorsStroke}" stroke-width="1.5"/>
          
          <!-- Rear Right Door -->
          <rect x="55" y="20" width="45" height="80" rx="2"
                fill="${isDamaged('porte-arriere-droite') ? damagedFill : doorsFill}" 
                stroke="${isDamaged('porte-arriere-droite') ? damagedStroke : doorsStroke}" stroke-width="1.5"/>
          
          <!-- Front Left Fender -->
          <path d="M -100 -140 L -65 -140 L -65 -60 L -100 -60 Z" 
                fill="${isDamaged('aile-avant-gauche') ? damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-avant-gauche') ? damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <!-- Rear Left Fender -->
          <path d="M -100 100 L -65 100 L -65 20 L -100 20 Z" 
                fill="${isDamaged('aile-arriere-gauche') ? damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-arriere-gauche') ? damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <!-- Front Right Fender -->
          <path d="M 100 -140 L 65 -140 L 65 -60 L 100 -60 Z" 
                fill="${isDamaged('aile-avant-droite') ? damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-avant-droite') ? damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <!-- Rear Right Fender -->
          <path d="M 100 100 L 65 100 L 65 20 L 100 20 Z" 
                fill="${isDamaged('aile-arriere-droite') ? damagedFill : '#ffffff'}" 
                stroke="${isDamaged('aile-arriere-droite') ? damagedStroke : '#64748b'}" stroke-width="1"/>
          
          <!-- Wheels -->
          <circle cx="-85" cy="-100" r="18" 
                  fill="${isDamaged('jante-avant-gauche') ? damagedFill : wheelsFill}" 
                  stroke="${isDamaged('jante-avant-gauche') ? damagedStroke : wheelsStroke}" stroke-width="2"/>
          <circle cx="-85" cy="-100" r="10" fill="${wheelCenters}"/>
          
          <circle cx="85" cy="-100" r="18" 
                  fill="${isDamaged('jante-avant-droite') ? damagedFill : wheelsFill}" 
                  stroke="${isDamaged('jante-avant-droite') ? damagedStroke : wheelsStroke}" stroke-width="2"/>
          <circle cx="85" cy="-100" r="10" fill="${wheelCenters}"/>
          
          <circle cx="-85" cy="100" r="18" 
                  fill="${isDamaged('jante-arriere-gauche') ? damagedFill : wheelsFill}" 
                  stroke="${isDamaged('jante-arriere-gauche') ? damagedStroke : wheelsStroke}" stroke-width="2"/>
          <circle cx="-85" cy="100" r="10" fill="${wheelCenters}"/>
          
          <circle cx="85" cy="100" r="18" 
                  fill="${isDamaged('jante-arriere-droite') ? damagedFill : wheelsFill}" 
                  stroke="${isDamaged('jante-arriere-droite') ? damagedStroke : wheelsStroke}" stroke-width="2"/>
          <circle cx="85" cy="100" r="10" fill="${wheelCenters}"/>
          
          <!-- Mirrors -->
          <ellipse cx="-110" cy="-40" rx="6" ry="10" 
                   fill="${isDamaged('retroviseur-gauche') ? damagedFill : mirrorsFill}" 
                   stroke="${isDamaged('retroviseur-gauche') ? damagedStroke : mirrorsStroke}" stroke-width="1.5"/>
          
          <ellipse cx="110" cy="-40" rx="6" ry="10" 
                   fill="${isDamaged('retroviseur-droit') ? damagedFill : mirrorsFill}" 
                   stroke="${isDamaged('retroviseur-droit') ? damagedStroke : mirrorsStroke}" stroke-width="1.5"/>
          
          <!-- Headlights -->
          <path d="M -60 -175 L -40 -175 L -35 -165 L -60 -165 Z" 
                fill="${isDamaged('phare-avant-gauche') ? damagedFill : headlightsFill}" 
                stroke="${isDamaged('phare-avant-gauche') ? damagedStroke : headlightsStroke}" stroke-width="1"/>
          
          <path d="M 60 -175 L 40 -175 L 35 -165 L 60 -165 Z" 
                fill="${isDamaged('phare-avant-droit') ? damagedFill : headlightsFill}" 
                stroke="${isDamaged('phare-avant-droit') ? damagedStroke : headlightsStroke}" stroke-width="1"/>
          
          <!-- Taillights -->
          <path d="M -60 175 L -40 175 L -35 165 L -60 165 Z" 
                fill="${isDamaged('feu-arriere-gauche') ? damagedFill : taillightsFill}" 
                stroke="${isDamaged('feu-arriere-gauche') ? damagedStroke : taillightsStroke}" stroke-width="1"/>
          
          <path d="M 60 175 L 40 175 L 35 165 L 60 165 Z" 
                fill="${isDamaged('feu-arriere-droit') ? damagedFill : taillightsFill}" 
                stroke="${isDamaged('feu-arriere-droit') ? damagedStroke : taillightsStroke}" stroke-width="1"/>
        </g>
        
        <text x="160" y="15" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="bold">AVANT</text>
        <text x="160" y="465" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="bold">ARRIÈRE</text>
      </svg>`;
    };

    const generateDamagesList = () => {
      if (dommages.length === 0) {
        return '<div style="color:#64748b;font-style:italic;font-size:9px;text-align:center;padding:10px;">Aucun dommage signalé</div>';
      }
      
      return `
        <div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:flex-start;align-content:flex-start;">
          ${dommages.map(d => {
            const part = carPartsData.find(p => p.id === d);
            return `<span style="color:#dc2626;padding:2px 6px;border-radius:10px;font-size:9px;font-weight:600;border:1px solid #dc2626;white-space:nowrap;background:#fef2f2;">${part ? part.name : d}</span>`;
          }).join('')}
        </div>
      `;
    };

    contractWindow.document.write(`
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contrat ${contract.contractNumber || ''}</title>
    <style>
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Helvetica Neue', Arial, sans-serif; 
            font-size: 9px; 
            line-height: 1.2; 
            color: #64748b;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .a4-container {
            width: 210mm;
            height: 297mm;
            padding: 10mm;
            margin: 0 auto;
            background: white;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        .header {
            background: #1e293b !important;
            color: white !important;
            text-align: center;
            padding: 8px;
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 8px;
            border-radius: 4px;
            border: 2px solid #cbd5e0;
        }
        .two-cols {
            display: flex;
            gap: 8px;
            margin-bottom: 6px;
        }
        .col {
            flex: 1;
        }
        .section {
            border: 1px solid #cbd5e0;
            margin-bottom: 4px;
            page-break-inside: avoid;
            border-radius: 3px;
            overflow: hidden;
            background: white;
        }
        .section-title {
            background: #f59e0b !important;
            color: #fbfdff !important;
            padding: 3px 6px;
            font-weight: bold;
            font-size: 9px;
            border-bottom: 1px solid #cbd5e0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .section-body {
            padding: 5px;
        }
        .field-row {
            display: flex;
            margin-bottom: 2px;
            align-items: baseline;
        }
        .field-label {
            font-weight: 700;
            color: #475569;
            min-width: 80px;
            font-size: 8px;
            text-transform: uppercase;
        }
        .field-value {
            border-bottom: 1px dotted #cbd5e0;
            flex: 1;
            padding-left: 3px;
            font-size: 9px;
            min-height: 11px;
            font-weight: 600;
            color: #1e293b;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
        }
        .vehicle-info-row {
            margin-bottom: 6px;
            padding: 4px;
            background: #f8fafc;
            border-radius: 4px;
            border: 1px solid #e2e8f0;
        }
        .vehicle-info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
        }
        .vehicle-visual-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            align-items: start;
            min-height: 200px;
        }
        .damages-column {
            background: #f8fafc;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 6px;
            height: 100%;
        }
        .damages-header {
            font-size: 9px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 4px;
            text-align: center;
            padding-bottom: 3px;
            border-bottom: 2px solid #d1d5db;
            background: #e2e8f0;
            padding: 4px;
            border-radius: 3px;
        }
        .svg-column {
            background: #f8fafc;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 6px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .svg-header {
            font-size: 9px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 4px;
            text-align: center;
            text-transform: uppercase;
        }
        .costs-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
        }
        .costs-table td {
            padding: 2px 4px;
            border-bottom: 1px solid #e2e8f0;
        }
        .costs-table td:first-child {
            color: #475569;
        }
        .costs-table td:last-child {
            text-align: right;
            font-weight: 700;
            color: #1e293b;
        }
        .total-row {
            background: #f59f0b91 !important;
            font-weight: bold;
            font-size: 10px;
            border-top: 2px solid #cbd5e0;
            border-bottom: 2px solid #cbd5e0;
            color: #1a202c;
        }
        .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 8px;
            border-top: 2px solid #334155;
        }
        .signature-box {
            text-align: center;
            width: 45%;
        }
        .signature-line {
            border-top: 1px solid #334155;
            margin-top: 25px;
            padding-top: 3px;
            font-size: 8px;
            color: #1e293b;
            font-weight: 600;
        }
        .notice {
            background: #eff6ff;
            border: 1px solid #3b82f6;
            padding: 4px;
            font-size: 7px;
            margin-top: 6px;
            text-align: center;
            border-radius: 3px;
            color: #1e40af;
            font-weight: 600;
        }
        
        /* 3-Part Grid for Conditions */
        .conditions-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            font-size: 7.5px;
        }
        .condition-card {
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }
        .condition-card-title {
            background: #f1f5f9;
            color: #1e293b;
            padding: 4px;
            font-weight: bold;
            font-size: 8px;
            text-transform: uppercase;
            border-bottom: 1px solid #e2e8f0;
            text-align: center;
        }
        .condition-card-body {
            padding: 6px;
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .condition-item {
            display: flex;
            align-items: flex-start;
            gap: 4px;
            color: #334155;
            line-height: 1.3;
        }
        .checkbox {
            width: 8px;
            height: 8px;
            border: 1px solid #475569;
            display: inline-block;
            flex-shrink: 0;
            margin-top: 1px;
        }

        @media print {
            .a4-container { width: 100%; height: 100%; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="a4-container">
        <!-- Header -->
        <div class="header">
            CONTRAT DE LOCATION VÉHICULE - ${contract.contractNumber || 'N/A'}
        </div>

        <!-- Top Info -->
        <div class="two-cols">
            <div class="col">
                <div class="section">
                    <div class="section-title">Agence / Partenaire</div>
                    <div class="section-body">
                        <div class="field-row">
                            <span class="field-label">Nom:</span>
                            <span class="field-value">${partnerName}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Email:</span>
                            <span class="field-value">${partnerInfo.partnerEmail || user.email || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Téléphone:</span>
                            <span class="field-value">${partnerInfo.partnerPhone || user.number || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Adresse:</span>
                            <span class="field-value">${partnerInfo.partnerCity || user.city || ''}, ${partnerInfo.partnerCountry || user.country || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="section">
                    <div class="section-title">Client / Locataire</div>
                    <div class="section-body">
                        <div class="field-row">
                            <span class="field-label">Nom:</span>
                            <span class="field-value">${clientInfo.lastName} ${clientInfo.firstName}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Né(e) le:</span>
                            <span class="field-value">${formatDisplayDate(clientInfo.birthDate)}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Tél:</span>
                            <span class="field-value">${clientInfo.phone}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Adresse:</span>
                            <span class="field-value">${clientInfo.address || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Driver Info -->
        <div class="section">
            <div class="section-title">Permis de Conduire</div>
            <div class="section-body">
                <div class="grid-2">
                    <div>
                        <div class="field-row">
                            <span class="field-label">N° Permis:</span>
                            <span class="field-value">${clientInfo.licenseNumber || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Délivré le:</span>
                            <span class="field-value">${formatDisplayDate(clientInfo.licenseIssueDate)}</span>
                        </div>
                    </div>
                    <div>
                        <div class="field-row">
                            <span class="field-label">CIN:</span>
                            <span class="field-value">${clientInfo.cin || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Passeport:</span>
                            <span class="field-value">${clientInfo.passport || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        ${secondDriverInfo.lastName ? `
        <div class="section">
            <div class="section-title">Deuxième Conducteur</div>
            <div class="section-body">
                <div class="field-row">
                    <span class="field-label">Nom:</span>
                    <span class="field-value">${secondDriverInfo.lastName} ${secondDriverInfo.firstName}</span>
                    <span class="field-label" style="margin-left:15px;">Permis:</span>
                    <span class="field-value">${secondDriverInfo.licenseNumber || 'N/A'}</span>
                    <span class="field-label" style="margin-left:15px;">Délivré:</span>
                    <span class="field-value">${formatDisplayDate(secondDriverInfo.licenseIssueDate)}</span>
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Vehicle Section -->
        <div class="section">
            <div class="section-title">Véhicule Loué & Etat des Lieux</div>
            <div class="section-body">
                
                <!-- Vehicle Info -->
                <div class="vehicle-info-row">
                    <div class="vehicle-info-grid">
                        <div class="field-row">
                            <span class="field-label">Marque:</span>
                            <span class="field-value" style="font-size:10px;font-weight:bold;">${vehicleInfo.name || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Immat:</span>
                            <span class="field-value">${vehicleInfo.matricule || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Type:</span>
                            <span class="field-value">${vehicleInfo.type || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Carb:</span>
                            <span class="field-value">${vehicleInfo.carburant || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Boîte:</span>
                            <span class="field-value">${vehicleInfo.boiteVitesse || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Reservoir:</span>
                            <span class="field-value">${vehicleInfo.niveauReservoir || 'N/A'}</span>
                        </div>
                    </div>
                </div>

                <!-- Visual Grid -->
                <div class="vehicle-visual-grid">
                    <!-- Damages List -->
                    <div class="damages-column">
                        <div class="damages-header">
                            PIÈCES ENDOMMAGÉES (${dommages.length})
                        </div>
                        ${generateDamagesList()}
                    </div>

                    <!-- SVG Car -->
                    <div class="svg-column">
                        <div class="svg-header">Schéma du Véhicule</div>
                        ${generateCarSVG()}
                    </div>
                </div>

            </div>
        </div>

        <!-- Rental & Costs -->
        <div class="two-cols">
            <div class="col">
                <div class="section">
                    <div class="section-title">Détails Location</div>
                    <div class="section-body">
                        <div class="field-row">
                            <span class="field-label">Départ:</span>
                            <span class="field-value">${formatDisplayDateTime(rentalInfo.startDateTime)}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Retour:</span>
                            <span class="field-value">${formatDisplayDateTime(rentalInfo.endDateTime)}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Lieu dép:</span>
                            <span class="field-value">${rentalInfo.startLocation || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Lieu ret:</span>
                            <span class="field-value">${rentalInfo.endLocation || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Durée:</span>
                            <span class="field-value">${rentalInfo.rentalDays || '...'} jours</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="section">
                    <div class="section-title">Détails Financiers</div>
                    <div class="section-body">
                        <table class="costs-table">
                            <tr>
                                <td>Location (${rentalInfo.rentalDays || 0}j × ${rentalInfo.prixParJour || 0} DH)</td>
                                <td>${rentalInfo.rentalCost || 0} DH</td>
                            </tr>
                            ${(rentalInfo.deliveryCost > 0) ? `<tr><td>Livraison</td><td>${rentalInfo.deliveryCost} DH</td></tr>` : ''}
                            ${(rentalInfo.dropOffCost > 0) ? `<tr><td>Dépose</td><td>${rentalInfo.dropOffCost} DH</td></tr>` : ''}
                            ${(rentalInfo.insuranceCost > 0) ? `<tr><td>Assurance</td><td>${rentalInfo.insuranceCost} DH</td></tr>` : ''}
                            ${(rentalInfo.babySeatCost > 0) ? `<tr><td>Siège bébé</td><td>${rentalInfo.babySeatCost} DH</td></tr>` : ''}
                            ${(rentalInfo.surveillanceCost > 0) ? `<tr><td>Surveillance</td><td>${rentalInfo.surveillanceCost} DH</td></tr>` : ''}
                            ${(rentalInfo.tva > 0) ? `<tr><td>TVA</td><td>${rentalInfo.tva} DH</td></tr>` : ''}
                            <tr style="border-top:1px solid #cbd5e0;">
                                <td>Sous-total</td>
                                <td>${rentalInfo.subtotal || 0} DH</td>
                            </tr>
                            <tr class="total-row">
                                <td>TOTAL À PAYER</td>
                                <td>${rentalInfo.prixTotal || 0} DH</td>
                            </tr>
                            <tr style="font-weight:bold;color:#dc2626;">
                                <td>CAUTION</td>
                                <td>${rentalInfo.deposit || 0} DH</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- 3-Part Conditions Grid -->
        <div class="section">
            <div class="section-title">Conditions Générales</div>
            <div class="section-body">
                <div class="conditions-container">
                    <!-- Part 1: Restitution & Etat -->
                    <div class="condition-card">
                        <div class="condition-card-title">Restitution & État</div>
                        <div class="condition-card-body">
                            <div class="condition-item"><span class="checkbox"></span> Rendre véhicule même état départ</div>
                            <div class="condition-item"><span class="checkbox"></span> Dommages non déclarés = charge client</div>
                            <div class="condition-item"><span class="checkbox"></span> Même niveau carburant au retour</div>
                            <div class="condition-item"><span class="checkbox"></span> Perte clé/document = facturation</div>
                            <div class="condition-item"><span class="checkbox"></span> Vérifier huile et eau régulièrement</div>
                            <div class="condition-item"><span class="checkbox"></span> Réparation non autorisée interdite</div>
                        </div>
                    </div>

                    <!-- Part 2: Utilisation & Conduite -->
                    <div class="condition-card">
                        <div class="condition-card-title">Utilisation & Conduite</div>
                        <div class="condition-card-body">
                            <div class="condition-item"><span class="checkbox"></span> Carburant à charge client</div>
                            <div class="condition-item"><span class="checkbox"></span> Interdiction de fumer</div>
                            <div class="condition-item"><span class="checkbox"></span> Permis valide + ID obligatoires</div>
                            <div class="condition-item"><span class="checkbox"></span> Respect Code route marocain</div>
                            <div class="condition-item"><span class="checkbox"></span> Usage normal et légal uniquement</div>
                            <div class="condition-item"><span class="checkbox"></span> Sous-location et prêt interdits</div>
                        </div>
                    </div>

                    <!-- Part 3: Assurance & Responsabilité -->
                    <div class="condition-card">
                        <div class="condition-card-title">Assurance & Responsabilité</div>
                        <div class="condition-card-body">
                            <div class="condition-item"><span class="checkbox"></span> Caution obligatoire restituée après vérif</div>
                            <div class="condition-item"><span class="checkbox"></span> Client responsable amendes/infractions</div>
                            <div class="condition-item"><span class="checkbox"></span> Pneus/jantes/vitres = charge client sauf assurance</div>
                            <div class="condition-item"><span class="checkbox"></span> Sortie Maroc = autorisation écrite</div>
                            <div class="condition-item"><span class="checkbox"></span> Accident = prévenir police + loueur immédiatement</div>
                            <div class="condition-item"><span class="checkbox"></span> Pénalité retard selon tarifs loueur</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Signatures -->
        <div class="signatures">
            <div class="signature-box">
                <div style="font-weight:bold;font-size:10px;margin-bottom:2px;color:#1e293b;">LE LOCATAIRE</div>
                <div style="font-size:8px;color:#475569;">${clientInfo.firstName} ${clientInfo.lastName}</div>
                <div class="signature-line">Signature + Date</div>
            </div>
            <div class="signature-box">
                <div style="font-weight:bold;font-size:10px;margin-bottom:2px;color:#1e293b;">LE LOUEUR</div>
                <div style="font-size:8px;color:#475569;">${partnerName}</div>
                <div class="signature-line">Signature + Cachet</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="notice">
            ATTENTION: Le conducteur doit conserver ce contrat pendant toute la durée du prêt. Document contractuel à présenter sur réquisition des forces de l'ordre. | Contrat généré le ${new Date().toLocaleDateString('fr-FR')} - WegoRent System
        </div>
    </div>
</body>
</html>
    `);
    contractWindow.document.close();
    setTimeout(() => contractWindow.print(), 250);
  };

  const handleAddContract = () => {
    resetForm();
    setIsEditing(false);
    setShowPopup(true);
  };

  const handleEdit = (contract) => {
    setEditingContract(contract);
    setIsEditing(true);
    
    setContractForm({
      clientLastName: contract.clientInfo?.lastName || '',
      clientFirstName: contract.clientInfo?.firstName || '',
      clientBirthDate: formatDate(contract.clientInfo?.birthDate),
      clientPhone: contract.clientInfo?.phone || '',
      clientAddress: contract.clientInfo?.address || '',
      clientPassport: contract.clientInfo?.passport || '',
      clientCIN: contract.clientInfo?.cin || '',
      clientLicenseNumber: contract.clientInfo?.licenseNumber || '',
      clientLicenseIssueDate: formatDate(contract.clientInfo?.licenseIssueDate),
      secondDriverLastName: contract.secondDriverInfo?.lastName || '',
      secondDriverFirstName: contract.secondDriverInfo?.firstName || '',
      secondDriverLicenseNumber: contract.secondDriverInfo?.licenseNumber || '',
      secondDriverLicenseIssueDate: formatDate(contract.secondDriverInfo?.licenseIssueDate),
      vehicleId: contract.vehicleInfo?.vehicleId || '',
      startDateTime: formatDateTimeLocal(contract.rentalInfo?.startDateTime),
      endDateTime: formatDateTimeLocal(contract.rentalInfo?.endDateTime),
      startLocation: contract.rentalInfo?.startLocation || '',
      endLocation: contract.rentalInfo?.endLocation || '',
      prixParJour: contract.rentalInfo?.prixParJour || '',
      prixTotal: contract.rentalInfo?.prixTotal || 0,
      deliveryCost: contract.rentalInfo?.deliveryCost || 0,
      dropOffCost: contract.rentalInfo?.dropOffCost || 0,
      insuranceCost: contract.rentalInfo?.insuranceCost || 0,
      babySeatCost: contract.rentalInfo?.babySeatCost || 0,
      surveillanceCost: contract.rentalInfo?.surveillanceCost || 0,
      tva: contract.rentalInfo?.tva || 0,
      deposit: contract.rentalInfo?.deposit || 0,
      dommages: contract.vehicleInfo?.dommages || []
    });
    
    setShowPopup(true);
    setErrors({});
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    resetForm();
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
              Gestion des Contrats
            </h1>
            <p style={{ color: '#64748b', marginTop: '5px', fontSize: '14px' }}>
              Gérez vos contrats avec inspection véhicule intégrée
            </p>
          </div>
          
          <button
            onClick={handleAddContract}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f59e0b',
              color: '#1a202c',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.4)';
              e.target.style.backgroundColor = '#d97706';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(245, 158, 11, 0.3)';
              e.target.style.backgroundColor = '#f59e0b';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1a202c">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Nouveau Contrat
          </button>
        </div>

        <ContractsList
          contracts={contracts}
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={deleteContract}
          onDownload={downloadContract}
          onUpdateStatus={updateContractStatus}
        />
      </div>

      {showPopup && (
        <ContractFormPopup
          contractForm={contractForm}
          vehicles={vehicles}
          errors={errors}
          loading={loading}
          isEditing={isEditing}
          handleContractChange={handleContractChange}
          createContract={createContract}
          updateContract={updateContract}
          onClose={handleClosePopup}
          setContractForm={setContractForm}
          setErrors={setErrors}
          carPartsData={carPartsData}
          toggleDamage={toggleDamage}
        />
      )}
    </div>
  );
};

export default ContractsManagement;