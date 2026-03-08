import React, { useState, useEffect } from 'react';
import {
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaPrint,
  FaDownload,
  FaEdit,
  FaTrashAlt,
  FaPlus,
  FaTimes,
  FaFilePdf,
  FaSearch,
  FaEllipsisV,
  FaArrowRight,
  FaArrowLeft,
  FaExclamationTriangle,
  FaGasPump,
  FaCreditCard,
  FaMoneyBill,
  FaUniversity,
  FaIdCard,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTachometerAlt,
  FaOilCan,
  FaCheckCircle,
  FaReceipt
} from 'react-icons/fa';

const SmartContraForm = ({
  showForm,
  setShowForm,
  editingContract,
  loading,
  currentStep,
  setCurrentStep,
  formData,
  setFormData,
  availableSmartCars,
  clients,
  carPartsData,
  calculateDays,
  handleVehicleChange,
  handleInputChange,
  handleConducteurChange,
  generateCarSVG,
  removeDommage,
  handleSubmit,
  resetForm
}) => {
  // PAYMENT VARIABLES - Synchronized with formData
  const [MONTANT_TOTAL, setMONTANT_TOTAL] = useState(0);
  const [MONTANT_PAYE, setMONTANT_PAYE] = useState(0);
  const [MONTANT_RESTE_A_PAYER, setMONTANT_RESTE_A_PAYER] = useState(0);
  const [METHODES_PAIEMENT, setMETHODES_PAIEMENT] = useState([
    { type: 'espece', amount: 0, status: 'pending', reference: '' }
  ]);

  // Fuel level selector state (0-8 levels like a fuel gauge)
  const [niveauReservoir, setNiveauReservoir] = useState(4); // Default 50%

  // NEW: Confirmation checkbox state for step 4
  const [confirmChecked, setConfirmChecked] = useState(false);

  // Sync payment methods with formData when editing or on mount
  useEffect(() => {
    if (formData.paymentMethods && formData.paymentMethods.length > 0) {
      setMETHODES_PAIEMENT(formData.paymentMethods);
    } else if (formData.paymentInfo?.methods && formData.paymentInfo.methods.length > 0) {
      setMETHODES_PAIEMENT(formData.paymentInfo.methods);
    }
  }, [formData.paymentMethods, formData.paymentInfo]);

  // Sync fuel level with formData
  useEffect(() => {
    const niveau = formData.reservoirEtat?.depart?.niveau;
    if (niveau !== undefined && niveau !== null) {
      const level = Math.round((niveau / 100) * 8);
      setNiveauReservoir(Math.min(8, Math.max(0, level)));
    }
  }, [formData.reservoirEtat?.depart?.niveau]);

  // Function to get current date/time in local timezone format for datetime-local input
  const getCurrentDateTime = () => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset() * 60000;
    const localTime = new Date(now.getTime() - timezoneOffset);
    return localTime.toISOString().slice(0, 16);
  };

  // Function to get tomorrow's date/time
  const getTomorrowDateTime = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const timezoneOffset = tomorrow.getTimezoneOffset() * 60000;
    const localTime = new Date(tomorrow.getTime() - timezoneOffset);
    return localTime.toISOString().slice(0, 16);
  };

  // Function to validate start date
  const validateStartDate = (dateString) => {
    if (!dateString) return false;
    const selectedDate = new Date(dateString);
    const now = new Date();
    // Allow dates from today onwards (with 1 minute buffer for timezone issues)
    const buffer = 60000; // 1 minute
    return selectedDate.getTime() >= (now.getTime() - buffer);
  };

  // Function to validate end date based on start date
  const validateEndDate = (startDateString, endDateString) => {
    if (!startDateString || !endDateString) return false;
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    return endDate.getTime() > startDate.getTime();
  };

  // Custom handle input change with date validation
  const handleInputChangeWithValidation = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate') {
      if (validateStartDate(value)) {
        handleInputChange(e);

        // Auto-adjust end date if it's now invalid
        if (formData.endDate && !validateEndDate(value, formData.endDate)) {
          const startDate = new Date(value);
          const newEndDate = new Date(startDate.getTime() + (24 * 60 * 60 * 1000));
          const timezoneOffset = newEndDate.getTimezoneOffset() * 60000;
          const localTime = new Date(newEndDate.getTime() - timezoneOffset);
          const formattedEndDate = localTime.toISOString().slice(0, 16);

          setFormData(prev => ({
            ...prev,
            endDate: formattedEndDate
          }));
        }
      } else {
        alert('Veuillez sélectionner une date future ou actuelle. Les dates passées ne sont pas autorisées.');
        return;
      }
    } else if (name === 'endDate') {
      if (validateEndDate(formData.startDate, value)) {
        handleInputChange(e);
      } else {
        alert('La date de fin doit être après la date de début.');
        return;
      }
    } else {
      handleInputChange(e);
    }
  };

  // Handle reservoir state changes with fuel gauge selector
  const handleReservoirChange = (field, value, subField = null) => {
    setFormData(prev => ({
      ...prev,
      reservoirEtat: {
        ...prev.reservoirEtat,
        [field]: subField ? {
          ...prev.reservoirEtat?.[field],
          [subField]: value
        } : value
      }
    }));
  };

  // Handle fuel gauge click (0-8 levels)
  const handleFuelGaugeClick = (level) => {
    setNiveauReservoir(level);
    const percentage = (level / 8) * 100;
    handleReservoirChange('depart', percentage, 'niveau');
  };

  // Handle payment method changes
  const handlePaymentMethodChange = (index, field, value) => {
    const newMethods = [...METHODES_PAIEMENT];
    newMethods[index] = { ...newMethods[index], [field]: value };
    setMETHODES_PAIEMENT(newMethods);

    // Update MONTANT_PAYE and sync with formData
    updatePaymentCalculations(newMethods);
  };

  // Add new payment method
  const addPaymentMethod = () => {
    const newMethods = [...METHODES_PAIEMENT, { type: 'espece', amount: 0, status: 'pending', reference: '' }];
    setMETHODES_PAIEMENT(newMethods);
    updatePaymentCalculations(newMethods);
  };

  // Remove payment method
  const removePaymentMethod = (index) => {
    if (METHODES_PAIEMENT.length > 1) {
      const newMethods = METHODES_PAIEMENT.filter((_, i) => i !== index);
      setMETHODES_PAIEMENT(newMethods);
      updatePaymentCalculations(newMethods);
    }
  };

  // Update payment calculations
  const updatePaymentCalculations = (methods) => {
    const totalPaye = methods
      .filter(m => m.status === 'completed')
      .reduce((sum, m) => sum + parseFloat(m.amount || 0), 0);

    setMONTANT_PAYE(totalPaye);
    setMONTANT_RESTE_A_PAYER(MONTANT_TOTAL - totalPaye);

    // Update formData with new payment info
    setFormData(prev => ({
      ...prev,
      paymentMethods: methods,
      paymentInfo: {
        methods: methods.map(m => ({
          type: m.type,
          amount: parseFloat(m.amount) || 0,
          status: m.status,
          reference: m.reference,
          date: m.date || new Date().toISOString()
        })),
        totalPaid: totalPaye,
        totalDue: MONTANT_TOTAL,
        balance: MONTANT_TOTAL - totalPaye,
        currency: 'MAD'
      }
    }));
  };

  // Calculate financial summary
  const calculateFinancials = () => {
    const days = calculateDays(formData.startDate, formData.endDate);
    const basePrice = parseFloat(formData.prixVoiture) || 0;
    const rentalCost = basePrice * days;
    
    // Additional costs
    const deliveryCost = parseFloat(formData.deliveryCost) || 0;
    const dropOffCost = parseFloat(formData.dropOffCost) || 0;
    const insuranceCost = parseFloat(formData.insuranceCost) || 0;
    const babySeatCost = parseFloat(formData.babySeatCost) || 0;
    const surveillanceCost = parseFloat(formData.surveillanceCost) || 0;
    const autresFrais = parseFloat(formData.autresFrais) || 0; // NEW: Autres frais
    
    // Sum of all fees (Somme des Frais) - EXCLUDES deposit/caution
    const sommeDesFrais = rentalCost + deliveryCost + dropOffCost + insuranceCost + babySeatCost + surveillanceCost + autresFrais;
    
    // TVA calculated on the sum of fees
    const tvaRate = parseFloat(formData.impot?.tvaRate) || 0; // TVA rate in %
    const tva = (sommeDesFrais * tvaRate) / 100;
    
    // Deposit/Caution - standalone, no calculation
    const deposit = parseFloat(formData.deposit) || 0;
    
    // Total = Somme des Frais + TVA (Caution is separate)
    const total = sommeDesFrais + tva;

    // Update MONTANT_TOTAL if changed
    if (Math.abs(total - MONTANT_TOTAL) > 0.01) {
      setMONTANT_TOTAL(total);
      const newReste = total - MONTANT_PAYE;
      setMONTANT_RESTE_A_PAYER(newReste);
      
      // Update formData total
      setFormData(prev => ({
        ...prev,
        prixTotal: total.toFixed(2),
        sommeDesFrais: sommeDesFrais.toFixed(2), // NEW: Store sum of fees
        paymentInfo: {
          ...prev.paymentInfo,
          totalDue: total,
          balance: total - (prev.paymentInfo?.totalPaid || 0)
        }
      }));
    }

    return {
      days,
      rentalCost,
      deliveryCost,
      dropOffCost,
      insuranceCost,
      babySeatCost,
      surveillanceCost,
      autresFrais, // NEW
      sommeDesFrais, // NEW: Sum of fees
      tvaRate,
      tva,
      deposit, // Standalone caution
      total
    };
  };

  // Handle part selection for damages (toggle)
  const toggleDamage = (partId) => {
    setFormData(prev => {
      const existingDamageIndex = prev.dommages.findIndex(d => d.id === partId);

      if (existingDamageIndex !== -1) {
        // Remove existing damage
        const newDommages = [...prev.dommages];
        newDommages.splice(existingDamageIndex, 1);
        return { ...prev, dommages: newDommages };
      } else {
        // Add new damage
        const part = carPartsData.find(p => p.id === partId);
        const newDamage = {
          id: partId,
          emplacement: part?.name || partId,
          description: `Dommage sur ${part?.name || partId}`,
          type: 'leger',
          date: new Date().toISOString().split('T')[0]
        };

        return { ...prev, dommages: [...prev.dommages, newDamage] };
      }
    });
  };

  // Get vehicle details for display
  const getSelectedVehicleDetails = () => {
    return availableSmartCars.find(v => v._id === formData.vehicleId);
  };

  // Get selected client details
  const getSelectedClientDetails = () => {
    return clients?.find(c => c._id === formData.clientId);
  };

  // FIXED: Validation by step - CORRECTED LOGIC
  const isStepValid = (step) => {
    if (step === 1) {
      // Client and Vehicle must be selected
      return !!(formData.clientId && formData.vehicleId);
    }
    if (step === 2) {
      // All date and location fields must be filled and valid
      const hasStartDate = !!formData.startDate;
      const hasEndDate = !!formData.endDate;
      const hasStartLocation = !!formData.startLocation?.trim();
      const hasEndLocation = !!formData.endLocation?.trim();
      const datesValid = validateStartDate(formData.startDate) && 
                        validateEndDate(formData.startDate, formData.endDate);
      
      return hasStartDate && hasEndDate && hasStartLocation && hasEndLocation && datesValid;
    }
    if (step === 3) {
      // Reservoir state: km must be a valid number (0 or positive)
      const km = formData.reservoirEtat?.depart?.km;
      const hasKm = km !== undefined && km !== null && !isNaN(parseFloat(km));
      // Also check that fuel level is set (niveau is handled by state)
      return hasKm;
    }
    if (step === 4) {
      // Final step: always allow submission (validation happens in handleSubmit)
      // But we could check if total > 0
      return MONTANT_TOTAL >= 0;
    }
    return false;
  };

  // NEW: Function to go to next step (only if current step is valid)
  const handleNext = () => {
    if (isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
      // Reset confirmation checkbox when moving to step 4 (optional)
      if (currentStep + 1 === 4) {
        setConfirmChecked(false);
      }
    } else {
      // Show which fields are missing
      let missingFields = [];
      if (currentStep === 1) {
        if (!formData.clientId) missingFields.push('Client');
        if (!formData.vehicleId) missingFields.push('Véhicule');
      } else if (currentStep === 2) {
        if (!formData.startDate || !validateStartDate(formData.startDate)) missingFields.push('Date début valide');
        if (!formData.endDate || !validateEndDate(formData.startDate, formData.endDate)) missingFields.push('Date fin valide');
        if (!formData.startLocation?.trim()) missingFields.push('Lieu départ');
        if (!formData.endLocation?.trim()) missingFields.push('Lieu retour');
      } else if (currentStep === 3) {
        const km = formData.reservoirEtat?.depart?.km;
        if (km === undefined || km === null || isNaN(parseFloat(km))) {
          missingFields.push('Kilométrage départ');
        }
      }
      
      if (missingFields.length > 0) {
        alert(`Veuillez remplir les champs suivants:\n• ${missingFields.join('\n• ')}`);
      }
    }
  };

  // Step Navigation Component - 4 STEPS
  const renderStepNavigation = () => {
    const steps = [
      { number: 1, title: 'Client & Véhicule', icon: FaUser },
      { number: 2, title: 'Période & Conducteur', icon: FaCalendarAlt },
      { number: 3, title: 'État & Réservoir', icon: FaGasPump },
      { number: 4, title: 'Paiement', icon: FaMoneyBillWave }
    ];

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '24px',
        padding: '20px',
        backgroundColor: '#f8fafc',
        borderRadius: '14px',
        border: '1px solid #e2e8f0'
      }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative'
            }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step.number ? (currentStep === step.number ? '#36c275' : '#22c55e') : '#e2e8f0',
                color: currentStep >= step.number ? '#FFFFFF' : '#64748b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '16px',
                marginBottom: '8px',
                transition: 'all 0.3s ease',
                zIndex: 2,
                boxShadow: currentStep === step.number ? '0 4px 14px rgba(54, 194, 117, 0.35)' : 'none',
                cursor: step.number < currentStep ? 'pointer' : 'default'
              }}
              onClick={() => {
                // Allow clicking back to previous steps
                if (step.number < currentStep) {
                  setCurrentStep(step.number);
                }
              }}
              >
                <step.icon style={{ width: '18px', height: '18px' }} />
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: currentStep === step.number ? '700' : '600',
                color: currentStep >= step.number ? '#36c275' : '#64748b',
                textAlign: 'center',
                maxWidth: '80px',
                lineHeight: '1.3'
              }}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div style={{
                flex: 1,
                height: '3px',
                backgroundColor: currentStep > step.number ? '#22c55e' : '#e2e8f0',
                margin: '0 12px',
                minWidth: '40px',
                transition: 'all 0.3s ease',
                marginBottom: '20px',
                borderRadius: '2px'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  // Step 1: Client and Vehicle Selection
  const renderStep1 = () => {
    const getAvailableSmartCars = () => {
      return availableSmartCars.filter(car =>
        car.status !== 'maintenance' && car.status !== 'indisponible'
      );
    };

    const selectedVehicle = getSelectedVehicleDetails();
    const selectedClient = getSelectedClientDetails();

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Client Selection */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #36c275',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(54, 194, 117, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#36c275'
            }}>
              <FaUser style={{ width: '16px', height: '16px' }} />
            </div>
            Informations Client
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Sélectionner un client <span style={{color: '#ef4444'}}>*</span>
            </label>
            <select
              name="clientId"
              value={formData.clientId}
              onChange={handleInputChange}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#ffffff',
                border: !formData.clientId ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '12px',
                color: '#1f2937',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#36c275';
                e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = !formData.clientId ? '#ef4444' : '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Choisir un client...</option>
              {(clients || []).map(client => (
                <option key={client._id} value={client._id}>
                  {client.firstName} {client.lastName} - {client.cin}
                </option>
              ))}
            </select>
            {!formData.clientId && (
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '600' }}>
                ⚠️ Veuillez sélectionner un client
              </div>
            )}
          </div>

          {selectedClient && (
            <div style={{
              backgroundColor: '#f0fdf4',
              padding: '20px',
              borderRadius: '12px',
              marginTop: '16px',
              border: '1px solid #86efac',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #bbf7d0'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #36c275 0%, #22c55e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '20px',
                  fontWeight: '700'
                }}>
                  {selectedClient.firstName?.charAt(0)}{selectedClient.lastName?.charAt(0)}
                </div>
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#166534',
                    marginBottom: '2px'
                  }}>
                    {selectedClient.firstName} {selectedClient.lastName}
                  </div>
                  <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: '600' }}>
                    Client vérifié
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                  <FaIdCard style={{ color: '#36c275', width: '16px' }} />
                  <span style={{ fontWeight: '600' }}>CIN:</span> {selectedClient.cin}
                </div>
                {selectedClient.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                    <FaPhone style={{ color: '#36c275', width: '16px' }} />
                    <span style={{ fontWeight: '600' }}>Téléphone:</span> {selectedClient.phone}
                  </div>
                )}
                {selectedClient.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                    <FaEnvelope style={{ color: '#36c275', width: '16px' }} />
                    <span style={{ fontWeight: '600' }}>Email:</span> {selectedClient.email}
                  </div>
                )}
                {selectedClient.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#374151' }}>
                    <FaMapMarkerAlt style={{ color: '#36c275', width: '16px' }} />
                    <span style={{ fontWeight: '600' }}>Adresse:</span> {selectedClient.address}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Vehicle Selection with Enhanced Details */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #36c275',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(54, 194, 117, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#36c275'
            }}>
              <FaCar style={{ width: '16px', height: '16px' }} />
            </div>
            Véhicule Intelligent
          </h3>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '600',
              color: '#374151',
              fontSize: '14px'
            }}>
              Sélectionner un véhicule <span style={{color: '#ef4444'}}>*</span>
            </label>
            <select
              value={formData.vehicleId}
              onChange={(e) => handleVehicleChange(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#ffffff',
                border: !formData.vehicleId ? '2px solid #ef4444' : '1px solid #d1d5db',
                borderRadius: '12px',
                color: '#1f2937',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#36c275';
                e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = !formData.vehicleId ? '#ef4444' : '#d1d5db';
                e.target.style.boxShadow = 'none';
              }}
            >
              <option value="">Choisir un véhicule...</option>
              {getAvailableSmartCars().map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.nomVehicule} - {vehicle.numeroMatricule} ({vehicle.prixJour} MAD/j)
                </option>
              ))}
            </select>
            {!formData.vehicleId && (
              <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '6px', fontWeight: '600' }}>
                ⚠️ Veuillez sélectionner un véhicule
              </div>
            )}
          </div>

          {selectedVehicle && (
            <div style={{
              backgroundColor: '#eff6ff',
              padding: '20px',
              borderRadius: '12px',
              marginTop: '16px',
              border: '1px solid #93c5fd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <FaCar style={{ color: '#3b82f6' }} />
                {selectedVehicle.nomVehicule}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Matricule</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>{selectedVehicle.numeroMatricule}</div>
                </div>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Type</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>{selectedVehicle.typeVehicule}</div>
                </div>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Carburant</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>{selectedVehicle.typeCarburant}</div>
                </div>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Boîte</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>{selectedVehicle.boiteVitesse}</div>
                </div>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Kilométrage</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e40af' }}>{selectedVehicle.currentKilometer || 0} km</div>
                </div>
                <div style={{
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontSize: '11px', color: '#6b7280', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px' }}>Prix/Jour</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#36c275' }}>{selectedVehicle.prixJour} MAD</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Step 2: Period and Additional Driver
  const renderStep2 = () => {
    const currentDateTime = getCurrentDateTime();
    const tomorrowDateTime = getTomorrowDateTime();

    const startDateValid = validateStartDate(formData.startDate);
    const endDateValid = validateEndDate(formData.startDate, formData.endDate);

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Rental Period */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #36c275',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(54, 194, 117, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#36c275'
            }}>
              <FaCalendarAlt style={{ width: '16px', height: '16px' }} />
            </div>
            Période de Location
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>
                Date début <span style={{color: '#ef4444'}}>*</span>
              </label>
              <input
                type="datetime-local"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChangeWithValidation}
                min={currentDateTime}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: !startDateValid && formData.startDate ? '2px solid #ef4444' : startDateValid ? '1px solid #22c55e' : '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = !startDateValid && formData.startDate ? '#ef4444' : startDateValid ? '#22c55e' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {!startDateValid && formData.startDate && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  Date invalide (doit être future)
                </div>
              )}
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>
                Date fin <span style={{color: '#ef4444'}}>*</span>
              </label>
              <input
                type="datetime-local"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChangeWithValidation}
                min={formData.startDate || tomorrowDateTime}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: !endDateValid && formData.endDate ? '2px solid #ef4444' : endDateValid ? '1px solid #22c55e' : '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = !endDateValid && formData.endDate ? '#ef4444' : endDateValid ? '#22c55e' : '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {!endDateValid && formData.endDate && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  Doit être après la date de début
                </div>
              )}
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>
                Lieu départ <span style={{color: '#ef4444'}}>*</span>
              </label>
              <input
                type="text"
                name="startLocation"
                value={formData.startLocation}
                onChange={handleInputChange}
                required
                placeholder="Ex: Agence Casablanca"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: !formData.startLocation?.trim() ? '2px solid #ef4444' : '1px solid #22c55e',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = !formData.startLocation?.trim() ? '#ef4444' : '#22c55e';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {!formData.startLocation?.trim() && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  Champ requis
                </div>
              )}
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>
                Lieu retour <span style={{color: '#ef4444'}}>*</span>
              </label>
              <input
                type="text"
                name="endLocation"
                value={formData.endLocation}
                onChange={handleInputChange}
                required
                placeholder="Ex: Aéroport Marrakech"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: !formData.endLocation?.trim() ? '2px solid #ef4444' : '1px solid #22c55e',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = !formData.endLocation?.trim() ? '#ef4444' : '#22c55e';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {!formData.endLocation?.trim() && (
                <div style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>
                  Champ requis
                </div>
              )}
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: startDateValid && endDateValid ? '#f0fdf4' : '#fef2f2',
            borderRadius: '10px',
            border: `1px solid ${startDateValid && endDateValid ? '#86efac' : '#fecaca'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: startDateValid && endDateValid ? '#22c55e' : '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <FaCalendarAlt style={{ width: '20px', height: '20px' }} />
            </div>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: startDateValid && endDateValid ? '#166534' : '#991b1b'
              }}>
                {startDateValid && endDateValid ? (
                  `Durée de location: ${calculateDays(formData.startDate, formData.endDate)} jour(s)`
                ) : (
                  '⚠️ Veuillez corriger les dates de location'
                )}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                {formData.startDate && formData.endDate ?
                  `${new Date(formData.startDate).toLocaleString('fr-FR')} → ${new Date(formData.endDate).toLocaleString('fr-FR')}` :
                  'Sélectionnez les dates de début et fin'
                }
              </div>
            </div>
          </div>
        </div>

        {/* Additional Driver */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280'
            }}>
              <FaUser style={{ width: '16px', height: '16px' }} />
            </div>
            Conducteur Additionnel <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>(Optionnel)</span>
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Nom</label>
              <input
                type="text"
                value={formData.conducteur?.nom || ''}
                onChange={(e) => handleConducteurChange('nom', e.target.value)}
                placeholder="Nom"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Prénom</label>
              <input
                type="text"
                value={formData.conducteur?.prenom || ''}
                onChange={(e) => handleConducteurChange('prenom', e.target.value)}
                placeholder="Prénom"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>CIN</label>
              <input
                type="text"
                value={formData.conducteur?.cin || ''}
                onChange={(e) => handleConducteurChange('cin', e.target.value)}
                placeholder="CIN"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>N° Permis</label>
              <input
                type="text"
                value={formData.conducteur?.permis || ''}
                onChange={(e) => handleConducteurChange('permis', e.target.value)}
                placeholder="N° Permis"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Date délivrance permis</label>
              <input
                type="date"
                value={formData.conducteur?.dateDelivre || ''}
                onChange={(e) => handleConducteurChange('dateDelivre', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Step 3: Vehicle Condition and Fuel Gauge
  const renderStep3 = () => {
    const selectedVehicle = getSelectedVehicleDetails();
    const currentKm = selectedVehicle?.currentKilometer || 0;
    const currentKmInForm = formData.reservoirEtat?.depart?.km;

    // Fuel gauge levels (0-8)
    const fuelLevels = [
      { level: 0, label: 'Vide', color: '#ef4444' },
      { level: 1, label: '1/8', color: '#f97316' },
      { level: 2, label: '1/4', color: '#f59e0b' },
      { level: 3, label: '3/8', color: '#eab308' },
      { level: 4, label: '1/2', color: '#84cc16' },
      { level: 5, label: '5/8', color: '#65a30d' },
      { level: 6, label: '3/4', color: '#22c55e' },
      { level: 7, label: '7/8', color: '#16a34a' },
      { level: 8, label: 'Plein', color: '#15803d' }
    ];

    // Check if km is valid
    const kmValue = currentKmInForm !== undefined && currentKmInForm !== null ? currentKmInForm : currentKm;
    const isKmValid = !isNaN(parseFloat(kmValue)) && parseFloat(kmValue) >= 0;

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Visual Car Diagram */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '12px',
            width: '100%',
            textAlign: 'center'
          }}>
            Schéma du Véhicule
          </h3>

          <div
            dangerouslySetInnerHTML={{ __html: generateCarSVG(formData.dommages.map(d => d.id)) }}
            style={{ marginBottom: '20px' }}
          />

          <div style={{
            fontSize: '13px',
            color: '#6b7280',
            textAlign: 'center',
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            width: '100%'
          }}>
            <div style={{ fontWeight: '700', marginBottom: '12px', color: '#374151', fontSize: '14px' }}>Légende</div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#ffffff', border: '2px solid #d1d5db', borderRadius: '4px' }}></div>
                <span style={{ fontWeight: '500' }}>Normal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#fecaca', border: '2px solid #ef4444', borderRadius: '4px' }}></div>
                <span style={{ fontWeight: '500', color: '#dc2626' }}>Endommagé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Parts Selection */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span>Sélection des Dommages</span>
            <span style={{
              fontSize: '13px',
              backgroundColor: formData.dommages.length > 0 ? '#ef4444' : '#9ca3af',
              color: '#FFFFFF',
              padding: '4px 12px',
              borderRadius: '20px',
              fontWeight: '700'
            }}>
              {formData.dommages.length}
            </span>
          </h3>

          <div style={{
            flex: 1,
            overflowY: 'auto',
            maxHeight: '280px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '10px'
            }}>
              {carPartsData.map(part => {
                const isDamaged = formData.dommages.some(d => d.id === part.id);
                return (
                  <div
                    key={part.id}
                    onClick={() => toggleDamage(part.id)}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: isDamaged ? '#fef2f2' : '#ffffff',
                      border: `2px solid ${isDamaged ? '#ef4444' : '#e5e7eb'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'center',
                      transition: 'all 0.2s ease',
                      fontWeight: isDamaged ? '700' : '600',
                      color: isDamaged ? '#dc2626' : '#374151',
                      boxShadow: isDamaged ? '0 2px 4px rgba(239, 68, 68, 0.1)' : '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isDamaged) {
                        e.currentTarget.style.borderColor = '#d1d5db';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDamaged) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    {part.name}
                  </div>
                );
              })}
            </div>
          </div>

          {formData.dommages.length > 0 && (
            <div style={{ marginTop: '8px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#374151', marginBottom: '10px' }}>
                Dommages enregistrés:
              </div>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                maxHeight: '100px',
                overflowY: 'auto',
                padding: '12px',
                backgroundColor: '#fef2f2',
                borderRadius: '10px',
                border: '1px solid #fecaca'
              }}>
                {formData.dommages.map((dommage, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #ef4444',
                      borderRadius: '20px',
                      fontSize: '12px',
                      color: '#dc2626',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                    onClick={() => removeDommage(dommage.id)}
                  >
                    <FaExclamationTriangle style={{ width: '12px', height: '12px' }} />
                    {dommage.emplacement}
                    <FaTimes style={{ width: '12px', height: '12px' }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* FUEL GAUGE SELECTOR - Like the image you showed */}
        <div style={{
          backgroundColor: '#fffbeb',
          padding: '24px',
          borderRadius: '14px',
          border: '2px solid #f59e0b',
          gridColumn: 'span 2',
          boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.1)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#92400e',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #fcd34d',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <FaGasPump style={{ width: '18px', height: '18px' }} />
            </div>
            État du Réservoir (Départ) - Sélecteur Jauge
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* FUEL GAUGE VISUAL SELECTOR */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '16px',
                fontWeight: '700',
                color: '#92400e',
                fontSize: '14px'
              }}>
                Niveau Carburant <span style={{color: '#ef4444'}}>*</span>
              </label>

              {/* Visual Fuel Gauge */}
              <div style={{
                display: 'flex',
                alignItems: 'end',
                justifyContent: 'center',
                gap: '8px',
                padding: '20px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                border: '2px solid #fcd34d',
                marginBottom: '16px'
              }}>
                {fuelLevels.map((fuel) => (
                  <div
                    key={fuel.level}
                    onClick={() => handleFuelGaugeClick(fuel.level)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: `${40 + (fuel.level * 8)}px`,
                        backgroundColor: niveauReservoir >= fuel.level ? fuel.color : '#e5e7eb',
                        border: `2px solid ${niveauReservoir >= fuel.level ? fuel.color : '#d1d5db'}`,
                        borderRadius: '4px 4px 0 0',
                        transition: 'all 0.3s ease',
                        boxShadow: niveauReservoir === fuel.level ? '0 0 10px rgba(245, 158, 11, 0.5)' : 'none',
                        transform: niveauReservoir === fuel.level ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    <div style={{
                      marginTop: '8px',
                      fontSize: '11px',
                      fontWeight: niveauReservoir === fuel.level ? '800' : '600',
                      color: niveauReservoir === fuel.level ? fuel.color : '#9ca3af',
                      textAlign: 'center'
                    }}>
                      {fuel.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Level Display */}
              <div style={{
                padding: '16px',
                backgroundColor: fuelLevels[niveauReservoir].color,
                borderRadius: '10px',
                textAlign: 'center',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '18px',
                textShadow: '0 1px 2px rgba(0,0,0,0.2)'
              }}>
                <FaOilCan style={{ marginRight: '8px' }} />
                {fuelLevels[niveauReservoir].label} ({(niveauReservoir / 8 * 100).toFixed(0)}%)
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '700',
                  color: '#92400e',
                  fontSize: '14px'
                }}>
                  Kilométrage Départ <span style={{color: '#ef4444'}}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={kmValue !== undefined && kmValue !== null ? kmValue : ''}
                    onChange={(e) => handleReservoirChange('depart', parseInt(e.target.value) || 0, 'km')}
                    min="0"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingLeft: '44px',
                      backgroundColor: '#ffffff',
                      border: isKmValid ? '2px solid #22c55e' : '2px solid #ef4444',
                      borderRadius: '10px',
                      color: '#1f2937',
                      fontSize: '15px',
                      fontWeight: '700',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <FaTachometerAlt style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#f59e0b',
                    fontSize: '18px'
                  }} />
                </div>
                <div style={{ fontSize: '12px', color: isKmValid ? '#22c55e' : '#ef4444', marginTop: '6px', fontWeight: '600' }}>
                  {isKmValid ? '✓ Valeur valide' : '⚠️ Valeur requise'}
                </div>
                <div style={{ fontSize: '12px', color: '#92400e', marginTop: '4px', fontWeight: '500' }}>
                  Km actuel véhicule: {currentKm} km
                </div>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '10px',
                  fontWeight: '700',
                  color: '#92400e',
                  fontSize: '14px'
                }}>
                  Prix du litre (MAD)
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    value={formData.reservoirEtat?.consommation?.prixLitre || ''}
                    onChange={(e) => handleReservoirChange('consommation', parseFloat(e.target.value) || 0, 'prixLitre')}
                    step="0.01"
                    min="0"
                    placeholder="Ex: 12.50"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      paddingLeft: '44px',
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '10px',
                      color: '#1f2937',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#f59e0b';
                      e.target.style.boxShadow = '0 0 0 3px rgba(245, 158, 11, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <FaMoneyBillWave style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#f59e0b',
                    fontSize: '18px'
                  }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '20px',
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            border: '1px solid #fcd34d',
            fontSize: '13px',
            color: '#92400e',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#d97706',
              flexShrink: 0
            }}>
              <FaExclamationTriangle style={{ width: '16px', height: '16px' }} />
            </div>
            <span>Le niveau de carburant et le kilométrage seront vérifiés à nouveau au retour du véhicule. Des frais seront appliqués pour le carburant manquant selon le prix indiqué.</span>
          </div>
        </div>
      </div>
    );
  };

  // Step 4: Payment and Financial Summary
  const renderStep4 = () => {
    const financials = calculateFinancials();
    const {
      days, rentalCost, deliveryCost, dropOffCost,
      insuranceCost, babySeatCost, surveillanceCost, autresFrais,
      sommeDesFrais, tvaRate, tva, deposit, total
    } = financials;

    const getPaymentIcon = (type) => {
      switch(type) {
        case 'carte': return <FaCreditCard />;
        case 'cheque': return <FaMoneyBill />;
        case 'virement': return <FaUniversity />;
        default: return <FaMoneyBillWave />;
      }
    };

    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Additional Costs */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '14px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e293b',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280'
            }}>
              <FaMoneyBillWave style={{ width: '16px', height: '16px' }} />
            </div>
            Coûts Supplémentaires
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Livraison (MAD)</label>
              <input
                type="number"
                name="deliveryCost"
                value={formData.deliveryCost || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Dépose (MAD)</label>
              <input
                type="number"
                name="dropOffCost"
                value={formData.dropOffCost || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Assurance (MAD)</label>
              <input
                type="number"
                name="insuranceCost"
                value={formData.insuranceCost || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Siège bébé (MAD)</label>
              <input
                type="number"
                name="babySeatCost"
                value={formData.babySeatCost || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Surveillance (MAD)</label>
              <input
                type="number"
                name="surveillanceCost"
                value={formData.surveillanceCost || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            {/* NEW: Autres Frais (Butter/Other) */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Autres Frais (MAD)</label>
              <input
                type="number"
                name="autresFrais"
                value={formData.autresFrais || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>TVA (%)</label>
              <input
                type="number"
                name="impot.tvaRate"
                value={formData.impot?.tvaRate || ''}
                onChange={handleInputChange}
                min="0"
                max="100"
                step="0.01"
                placeholder="20"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontWeight: '600',
                color: '#374151',
                fontSize: '13px'
              }}>Caution (MAD) <span style={{color: '#9ca3af', fontWeight: '500'}}>(Montant bloqué, non calculé)</span></label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit || ''}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  backgroundColor: '#f9fafb',
                  border: '2px solid #d1d5db',
                  borderRadius: '10px',
                  color: '#1f2937',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#36c275';
                  e.target.style.boxShadow = '0 0 0 3px rgba(54, 194, 117, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px', fontStyle: 'italic' }}>
                La caution est restituée à la fin du contrat si aucun dommage n'est constaté.
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Payment Methods */}
        <div style={{
          backgroundColor: '#eff6ff',
          padding: '24px',
          borderRadius: '14px',
          border: '2px solid #3b82f6',
          boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.1)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#1e40af',
            fontSize: '16px',
            fontWeight: '700',
            borderBottom: '2px solid #bfdbfe',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}>
                <FaCreditCard style={{ width: '16px', height: '16px' }} />
              </div>
              Méthodes de Paiement
            </div>
            <button
              type="button"
              onClick={addPaymentMethod}
              style={{
                padding: '8px 16px',
                backgroundColor: '#22c55e',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.2)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#16a34a';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#22c55e';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaPlus /> Ajouter
            </button>
          </h3>

          <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
            {METHODES_PAIEMENT.map((method, index) => (
              <div key={index} style={{
                backgroundColor: '#ffffff',
                padding: '16px',
                borderRadius: '10px',
                marginBottom: '12px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <select
                    value={method.type}
                    onChange={(e) => handlePaymentMethodChange(index, 'type', e.target.value)}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      color: '#374151',
                      outline: 'none',
                      cursor: 'pointer',
                      backgroundColor: '#ffffff'
                    }}
                  >
                    <option value="espece">💵 Espèces</option>
                    <option value="carte">💳 Carte Bancaire</option>
                    <option value="cheque">📝 Chèque</option>
                    <option value="virement">🏦 Virement</option>
                  </select>
                  <input
                    type="number"
                    value={method.amount}
                    onChange={(e) => handlePaymentMethodChange(index, 'amount', e.target.value)}
                    placeholder="Montant"
                    min="0"
                    step="0.01"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#1f2937',
                      outline: 'none'
                    }}
                  />
                  {METHODES_PAIEMENT.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePaymentMethod(index)}
                      style={{
                        padding: '10px',
                        backgroundColor: '#ef4444',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                      }}
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={method.reference}
                    onChange={(e) => handlePaymentMethodChange(index, 'reference', e.target.value)}
                    placeholder="Référence (N° chèque, transaction...)"
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '13px',
                      color: '#6b7280',
                      outline: 'none'
                    }}
                  />
                  <select
                    value={method.status}
                    onChange={(e) => handlePaymentMethodChange(index, 'status', e.target.value)}
                    style={{
                      padding: '10px 14px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '600',
                      outline: 'none',
                      cursor: 'pointer',
                      backgroundColor: method.status === 'completed' ? '#f0fdf4' : '#ffffff',
                      color: method.status === 'completed' ? '#166534' : '#374151'
                    }}
                  >
                    <option value="pending">⏳ En attente</option>
                    <option value="completed">✅ Payé</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          {/* PAYMENT SUMMARY BOX - CLAIR ET EXPLICITE */}
          <div style={{
            marginTop: '16px',
            padding: '20px',
            backgroundColor: MONTANT_RESTE_A_PAYER > 0 ? '#fffbeb' : '#f0fdf4',
            borderRadius: '12px',
            border: `3px solid ${MONTANT_RESTE_A_PAYER > 0 ? '#f59e0b' : '#22c55e'}`,
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#1f2937',
              marginBottom: '16px',
              textAlign: 'center',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '12px'
            }}>
              RÉCAPITULATIF PAIEMENT
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaMoneyBillWave style={{ color: '#6b7280' }} />
                  MONTANT TOTAL:
                </span>
                <span style={{ color: '#1e40af', fontSize: '18px', fontWeight: '900' }}>
                  {MONTANT_TOTAL.toFixed(2)} MAD
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151', fontSize: '15px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaCheckCircle style={{ color: '#22c55e' }} />
                  MONTANT PAYÉ:
                </span>
                <span style={{ color: '#16a34a', fontSize: '18px', fontWeight: '900' }}>
                  {MONTANT_PAYE.toFixed(2)} MAD
                </span>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px',
                backgroundColor: MONTANT_RESTE_A_PAYER > 0 ? '#fef3c7' : '#dcfce7',
                borderRadius: '8px',
                marginTop: '8px'
              }}>
                <span style={{ color: MONTANT_RESTE_A_PAYER > 0 ? '#92400e' : '#166534', fontSize: '16px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaExclamationTriangle style={{ color: MONTANT_RESTE_A_PAYER > 0 ? '#d97706' : '#22c55e' }} />
                  RESTE À PAYER:
                </span>
                <span style={{ color: MONTANT_RESTE_A_PAYER > 0 ? '#d97706' : '#16a34a', fontSize: '22px', fontWeight: '900' }}>
                  {MONTANT_RESTE_A_PAYER.toFixed(2)} MAD
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div style={{
          backgroundColor: '#f0fdf4',
          padding: '24px',
          borderRadius: '14px',
          border: '2px solid #22c55e',
          display: 'flex',
          flexDirection: 'column',
          gridColumn: 'span 2',
          boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.1)'
        }}>
          <h3 style={{
            margin: '0 0 20px 0',
            color: '#166534',
            fontSize: '18px',
            fontWeight: '800',
            borderBottom: '2px solid #86efac',
            paddingBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <FaReceipt style={{ width: '20px', height: '20px' }} />
            </div>
            Récapitulatif Financier Détaillé
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                paddingBottom: '6px',
                borderBottom: '1px dashed #bbf7d0'
              }}>
                <span style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500' }}>Location ({days} jours):</span>
                <span style={{ color: '#374151', fontSize: '14px', fontWeight: '600' }}>{rentalCost.toFixed(2)} MAD</span>
              </div>

              {deliveryCost > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Livraison:</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{deliveryCost.toFixed(2)} MAD</span>
                </div>
              )}
              {dropOffCost > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Dépose:</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{dropOffCost.toFixed(2)} MAD</span>
                </div>
              )}
              {insuranceCost > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Assurance:</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{insuranceCost.toFixed(2)} MAD</span>
                </div>
              )}
              {babySeatCost > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Siège bébé:</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{babySeatCost.toFixed(2)} MAD</span>
                </div>
              )}
              {surveillanceCost > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Surveillance:</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{surveillanceCost.toFixed(2)} MAD</span>
                </div>
              )}
              {autresFrais > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>Autres frais:</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{autresFrais.toFixed(2)} MAD</span>
                </div>
              )}

              {/* SOMME DES FRAIS */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '12px',
                marginBottom: '8px',
                padding: '12px',
                backgroundColor: '#dbeafe',
                borderRadius: '8px',
                border: '1px solid #93c5fd'
              }}>
                <span style={{ color: '#1e40af', fontSize: '15px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FaReceipt style={{ color: '#3b82f6' }} />
                  SOMME DES FRAIS:
                </span>
                <span style={{ color: '#1d4ed8', fontSize: '16px', fontWeight: '900' }}>
                  {sommeDesFrais.toFixed(2)} MAD
                </span>
              </div>

              {tva > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', padding: '0 12px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '500' }}>TVA ({tvaRate}%):</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>{tva.toFixed(2)} MAD</span>
                </div>
              )}

              {/* CAUTION - Standalone */}
              {deposit > 0 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '16px',
                  marginTop: '8px',
                  padding: '12px',
                  backgroundColor: '#fef3c7',
                  borderRadius: '8px',
                  border: '2px dashed #fcd34d'
                }}>
                  <span style={{ color: '#92400e', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaExclamationTriangle style={{ color: '#d97706' }} />
                    CAUTION (Bloquée):
                  </span>
                  <span style={{ color: '#b45309', fontWeight: '800' }}>{deposit.toFixed(2)} MAD</span>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              padding: '32px',
              borderRadius: '12px',
              border: '3px solid #22c55e',
              boxShadow: '0 10px 25px -5px rgba(34, 197, 94, 0.2)'
            }}>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MONTANT TOTAL À PAYER</div>
              <div style={{ fontSize: '42px', fontWeight: '900', color: '#16a34a', lineHeight: '1' }}>
                {total.toFixed(2)}
              </div>
              <div style={{ fontSize: '16px', color: '#22c55e', fontWeight: '700', marginTop: '4px' }}>MAD</div>

              {MONTANT_PAYE > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '10px 20px',
                  backgroundColor: '#f0fdf4',
                  borderRadius: '20px',
                  fontSize: '14px',
                  color: '#166534',
                  fontWeight: '700',
                  border: '1px solid #86efac'
                }}>
                  Payé: {MONTANT_PAYE.toFixed(2)} MAD
                </div>
              )}
              
              {deposit > 0 && (
                <div style={{
                  marginTop: '12px',
                  fontSize: '13px',
                  color: '#92400e',
                  fontWeight: '600',
                  textAlign: 'center',
                  padding: '8px 16px',
                  backgroundColor: '#fffbeb',
                  borderRadius: '8px',
                  border: '1px solid #fcd34d'
                }}>
                  + Caution: {deposit.toFixed(2)} MAD (restituée après contrôle)
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NEW: Confirmation Checkbox */}
        <div style={{
          gridColumn: 'span 2',
          marginTop: '10px',
          padding: '16px 24px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '2px solid #94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <input
            type="checkbox"
            id="confirmCheck"
            checked={confirmChecked}
            onChange={(e) => setConfirmChecked(e.target.checked)}
            style={{
              width: '22px',
              height: '22px',
              cursor: 'pointer',
              accentColor: '#22c55e'
            }}
          />
          <label htmlFor="confirmCheck" style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#1e293b',
            cursor: 'pointer'
          }}>
            Je confirme que toutes les informations fournies sont exactes et complètes.
          </label>
        </div>
      </div>
    );
  };

  if (!showForm) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '24px',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '1200px',
        maxHeight: '92vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Popup Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 28px',
          backgroundColor: editingContract ? '#f59e0b' : '#36c275',
          color: '#FFFFFF',
          minHeight: '70px'
        }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '800', letterSpacing: '-0.025em' }}>
              {editingContract ? 'Modifier le Contrat' : 'Nouveau Contrat Intelligent'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', opacity: 0.95, fontWeight: '600' }}>
              Étape {currentStep} sur 4: {
                currentStep === 1 ? 'Client & Véhicule' :
                currentStep === 2 ? 'Période & Conducteur' :
                currentStep === 3 ? 'État & Réservoir' :
                'Paiement'
              }
            </p>
          </div>

          <button
            onClick={() => {
              setShowForm(false);
              resetForm();
            }}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
              e.currentTarget.style.transform = 'rotate(90deg)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.transform = 'rotate(0deg)';
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Step Navigation */}
        <div style={{ padding: '24px 28px 0' }}>
          {renderStepNavigation()}
        </div>

        {/* Form Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 28px 28px' }}>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '12px',
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '2px solid #e5e7eb'
            }}>
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    disabled={loading}
                    style={{
                      padding: '14px 24px',
                      backgroundColor: '#ffffff',
                      color: '#374151',
                      border: '2px solid #d1d5db',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: '700',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#9ca3af';
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = '#ffffff';
                    }}
                  >
                    <FaArrowLeft /> Précédent
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  disabled={loading}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: '#ffffff',
                    color: '#6b7280',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: '700',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#d1d5db';
                    e.currentTarget.style.color = '#374151';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  Annuler
                </button>
                
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    style={{
                      padding: '14px 32px',
                      backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: loading ? 'none' : '0 10px 22px rgba(59, 130, 246, 0.3), inset 0 -2px 0 rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                      opacity: loading ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!loading) {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {loading ? <span>En cours...</span> : <span>Suivant <FaArrowRight /></span>}
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !confirmChecked}
                    style={{
                      padding: '14px 32px',
                      backgroundColor: loading || !confirmChecked ? '#9ca3af' : '#22c55e',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: (loading || !confirmChecked) ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: (loading || !confirmChecked) ? 'none' : '0 10px 22px rgba(34, 197, 94, 0.3), inset 0 -2px 0 rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                      opacity: (loading || !confirmChecked) ? 0.7 : 1
                    }}
                    onMouseEnter={(e) => {
                      if (!loading && confirmChecked) {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.filter = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {loading ? <span>En cours...</span> : <span>{editingContract ? 'Mettre à jour' : 'Créer le contrat'}</span>}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};       

export default SmartContraForm;