import React, { useState, useEffect } from 'react';

const ContractFormPopup = ({
  contractForm,
  vehicles,
  errors,
  loading,
  isEditing,
  handleContractChange,
  createContract,
  updateContract,
  onClose,
  setContractForm,
  setErrors
}) => {
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [rentalDays, setRentalDays] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  // Calculate total price when dates, vehicle, or any cost changes
  useEffect(() => {
    calculateTotalPrice();
  }, [
    contractForm.vehicleId,
    contractForm.startDateTime,
    contractForm.endDateTime,
    contractForm.prixParJour,
    contractForm.deliveryCost,
    contractForm.dropOffCost,
    contractForm.insuranceCost,
    contractForm.babySeatCost,
    contractForm.surveillanceCost,
    contractForm.tva,
    contractForm.deposit
  ]);

  const calculateTotalPrice = () => {
    if (!contractForm.startDateTime || !contractForm.endDateTime || !contractForm.vehicleId) {
      setCalculatedPrice(0);
      setRentalDays(0);
      setSubtotal(0);
      setTotal(0);
      return;
    }

    const start = new Date(contractForm.startDateTime);
    const end = new Date(contractForm.endDateTime);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const days = diffDays === 0 ? 1 : diffDays;
    setRentalDays(days);

    const vehicle = vehicles.find(v => v._id === contractForm.vehicleId);
    if (vehicle && days > 0) {
      const prixParJour = contractForm.prixParJour || vehicle.pricePerDay;
      const rentalCost = days * prixParJour;
      
      // Calculate additional costs
      const deliveryCost = parseFloat(contractForm.deliveryCost) || 0;
      const dropOffCost = parseFloat(contractForm.dropOffCost) || 0;
      const insuranceCost = parseFloat(contractForm.insuranceCost) || 0;
      const babySeatCost = parseFloat(contractForm.babySeatCost) || 0;
      const surveillanceCost = parseFloat(contractForm.surveillanceCost) || 0;
      const tva = parseFloat(contractForm.tva) || 0;
      
      // Calculate subtotal (all costs except deposit)
      const calculatedSubtotal = rentalCost + deliveryCost + dropOffCost + 
        insuranceCost + babySeatCost + surveillanceCost;
      
      // Calculate total with TVA
      const calculatedTotal = calculatedSubtotal + tva;
      
      setSubtotal(calculatedSubtotal);
      setCalculatedPrice(calculatedTotal);
      setTotal(calculatedTotal);
    } else {
      setCalculatedPrice(0);
      setSubtotal(0);
      setTotal(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      if (isEditing) {
        updateContract(e);
      } else {
        createContract(e);
      }
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getSelectedVehicle = () => {
    return vehicles.find(v => v._id === contractForm.vehicleId);
  };

  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;
    const vehicle = vehicles.find(v => v._id === vehicleId);

    setContractForm(prev => ({
      ...prev,
      vehicleId: vehicleId,
      prixParJour: vehicle ? vehicle.pricePerDay : ''
    }));
  };

  const getCurrentPricePerDay = () => {
    const vehicle = getSelectedVehicle();
    return contractForm.prixParJour || (vehicle ? vehicle.pricePerDay : 0);
  };

  // Step 1: Client Information
  const renderStep1 = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '25px'
    }}>
      {/* Client Information */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Informations du Locataire</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            CIN (Carte d'Identité Nationale): <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="clientCIN"
            value={contractForm.clientCIN || ''}
            onChange={handleContractChange}
            required
            placeholder="Ex: BE123456"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
          <div style={{
            fontSize: '12px',
            color: '#666666',
            marginTop: '5px'
          }}>
            Format: 2 lettres suivies de 6 chiffres (Ex: BE123456)
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Nom: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="clientLastName"
            value={contractForm.clientLastName}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Prénom: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="clientFirstName"
            value={contractForm.clientFirstName}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Date de Naissance: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="date"
            name="clientBirthDate"
            value={contractForm.clientBirthDate}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Téléphone: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="tel"
            name="clientPhone"
            value={contractForm.clientPhone}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Adresse: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="clientAddress"
            value={contractForm.clientAddress}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Driver Information and Passport */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Documents d'Identité</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Passeport (Pour étrangers):
          </label>
          <input
            type="text"
            name="clientPassport"
            value={contractForm.clientPassport || ''}
            onChange={handleContractChange}
            placeholder="Numéro de passeport"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
          <div style={{
            fontSize: '12px',
            color: '#666666',
            marginTop: '5px'
          }}>
            À remplir seulement pour les clients étrangers
          </div>
        </div>

        <h3 style={{
          margin: '30px 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Permis de Conduire</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Numéro de Permis: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="clientLicenseNumber"
            value={contractForm.clientLicenseNumber}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Délivré le: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="date"
            name="clientLicenseIssueDate"
            value={contractForm.clientLicenseIssueDate}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <h3 style={{
          margin: '30px 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Deuxième Conducteur (Optionnel)</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Nom:
          </label>
          <input
            type="text"
            name="secondDriverLastName"
            value={contractForm.secondDriverLastName || ''}
            onChange={handleContractChange}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Prénom:
          </label>
          <input
            type="text"
            name="secondDriverFirstName"
            value={contractForm.secondDriverFirstName || ''}
            onChange={handleContractChange}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Numéro de Permis:
          </label>
          <input
            type="text"
            name="secondDriverLicenseNumber"
            value={contractForm.secondDriverLicenseNumber || ''}
            onChange={handleContractChange}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Délivré le:
          </label>
          <input
            type="date"
            name="secondDriverLicenseIssueDate"
            value={contractForm.secondDriverLicenseIssueDate || ''}
            onChange={handleContractChange}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
    </div>
  );

  // Step 2: Vehicle and Rental Information
  const renderStep2 = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '25px'
    }}>
      {/* Vehicle Selection */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Sélection du Véhicule</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Véhicule: <span style={{color: '#F44336'}}>*</span>
          </label>
          <select
            name="vehicleId"
            value={contractForm.vehicleId}
            onChange={handleVehicleChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          >
            <option value="">Sélectionnez un véhicule</option>
            {vehicles
              .filter(vehicle => vehicle.available)
              .map(vehicle => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.name} - {vehicle.type} - {vehicle.boiteVitesse} - {vehicle.carburant} - {vehicle.pricePerDay} MAD/jour
                </option>
              ))
            }
          </select>
        </div>

        {contractForm.vehicleId && getSelectedVehicle() && (
          <div style={{
            backgroundColor: '#FFFFFF',
            padding: '15px',
            borderRadius: '6px',
            border: '1px solid #E0E0E0',
            marginTop: '15px'
          }}>
            <h4 style={{
              margin: '0 0 10px 0',
              color: '#333333',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              Véhicule sélectionné
            </h4>
            <div style={{
              display: 'flex',
              gap: '15px',
              alignItems: 'center'
            }}>
              {getSelectedVehicle().image && (
                <img
                  src={getSelectedVehicle().image}
                  alt={getSelectedVehicle().name}
                  style={{
                    width: '80px',
                    height: '60px',
                    borderRadius: '6px',
                    objectFit: 'cover',
                    border: '1px solid #E0E0E0'
                  }}
                />
              )}
              <div>
                <div style={{
                  fontWeight: '600',
                  color: '#333333',
                  fontSize: '14px',
                  marginBottom: '5px'
                }}>
                  {getSelectedVehicle().name}
                </div>
                <div style={{
                  color: '#666666',
                  fontSize: '12px'
                }}>
                  {getSelectedVehicle().type} • {getSelectedVehicle().boiteVitesse} • {getSelectedVehicle().carburant}
                </div>
                <div style={{
                  color: '#2196F3',
                  fontSize: '14px',
                  fontWeight: '600',
                  marginTop: '5px'
                }}>
                  {getSelectedVehicle().pricePerDay} MAD/jour
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Rental Period */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Période de Location</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Date et Heure de Départ: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="datetime-local"
            name="startDateTime"
            value={contractForm.startDateTime}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Date et Heure de Retour: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="datetime-local"
            name="endDateTime"
            value={contractForm.endDateTime}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <h3 style={{
          margin: '30px 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Lieux de Location</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Lieu de Départ: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="startLocation"
            value={contractForm.startLocation}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Lieu de Retour: <span style={{color: '#F44336'}}>*</span>
          </label>
          <input
            type="text"
            name="endLocation"
            value={contractForm.endLocation}
            onChange={handleContractChange}
            required
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Price Configuration */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Configuration du Prix</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Prix par Jour (MAD):
          </label>
          <input
            type="number"
            name="prixParJour"
            value={contractForm.prixParJour || (getSelectedVehicle() ? getSelectedVehicle().pricePerDay : '')}
            onChange={handleContractChange}
            placeholder={getSelectedVehicle() ? `Prix par défaut: ${getSelectedVehicle().pricePerDay} MAD` : 'Sélectionnez un véhicule'}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
          <div style={{
            fontSize: '12px',
            color: '#666666',
            marginTop: '5px'
          }}>
            {getSelectedVehicle() && `Prix par défaut: ${getSelectedVehicle().pricePerDay} MAD`}
          </div>
        </div>

        {/* Initial Costs */}
        <h3 style={{
          margin: '30px 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Coûts Initiaux</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Dépôt de Garantie (MAD):
          </label>
          <input
            type="number"
            name="deposit"
            value={contractForm.deposit || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Additional Costs and Summary
  const renderStep3 = () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '25px'
    }}>
      {/* Additional Costs */}
      <div style={{
        backgroundColor: '#F8F9FA',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <h3 style={{
          margin: '0 0 15px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '10px'
        }}>Coûts Supplémentaires</h3>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Coût de Livraison (MAD):
          </label>
          <input
            type="number"
            name="deliveryCost"
            value={contractForm.deliveryCost || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Coût de Dépôt (MAD):
          </label>
          <input
            type="number"
            name="dropOffCost"
            value={contractForm.dropOffCost || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Assurance Tous Risques (MAD):
          </label>
          <input
            type="number"
            name="insuranceCost"
            value={contractForm.insuranceCost || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Siège Bébé (MAD):
          </label>
          <input
            type="number"
            name="babySeatCost"
            value={contractForm.babySeatCost || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            Surveillance (MAD):
          </label>
          <input
            type="number"
            name="surveillanceCost"
            value={contractForm.surveillanceCost || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: '500',
            color: '#333333',
            fontSize: '14px'
          }}>
            TVA (MAD):
          </label>
          <input
            type="number"
            name="tva"
            value={contractForm.tva || ''}
            onChange={handleContractChange}
            min="0"
            step="0.01"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E0E0E0',
              borderRadius: '6px',
              color: '#333333',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Price Summary */}
      <div style={{
        backgroundColor: '#E8F5E9',
        padding: '20px',
        borderRadius: '8px',
        border: '2px solid #4CAF50',
        gridColumn: 'span 2'
      }}>
        <h3 style={{
          margin: '0 0 20px 0',
          color: '#333333',
          fontSize: '18px',
          fontWeight: '600',
          borderBottom: '2px solid #4CAF50',
          paddingBottom: '10px'
        }}>Récapitulatif du Prix</h3>
        
        {contractForm.startDateTime && contractForm.endDateTime && contractForm.vehicleId ? (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #C8E6C9'
            }}>
              <span style={{ color: '#333333', fontSize: '14px' }}>Durée de location:</span>
              <span style={{ color: '#333333', fontSize: '14px', fontWeight: '600' }}>{rentalDays} jour(s)</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #C8E6C9'
            }}>
              <span style={{ color: '#333333', fontSize: '14px' }}>Prix par jour:</span>
              <span style={{ color: '#2196F3', fontSize: '14px', fontWeight: '600' }}>{getCurrentPricePerDay()} MAD</span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '1px solid #C8E6C9'
            }}>
              <span style={{ color: '#333333', fontSize: '14px' }}>Coût de location:</span>
              <span style={{ color: '#2196F3', fontSize: '14px', fontWeight: '600' }}>{rentalDays * getCurrentPricePerDay()} MAD</span>
            </div>

            {/* Additional Costs Breakdown */}
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <h4 style={{
                margin: '0 0 10px 0',
                color: '#333333',
                fontSize: '16px',
                fontWeight: '600'
              }}>Coûts Supplémentaires:</h4>
              
              {contractForm.deliveryCost && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#666666' }}>Livraison:</span>
                  <span style={{ color: '#666666' }}>{parseFloat(contractForm.deliveryCost) || 0} MAD</span>
                </div>
              )}
              
              {contractForm.dropOffCost && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#666666' }}>Dépôt:</span>
                  <span style={{ color: '#666666' }}>{parseFloat(contractForm.dropOffCost) || 0} MAD</span>
                </div>
              )}
              
              {contractForm.insuranceCost && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#666666' }}>Assurance:</span>
                  <span style={{ color: '#666666' }}>{parseFloat(contractForm.insuranceCost) || 0} MAD</span>
                </div>
              )}
              
              {contractForm.babySeatCost && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#666666' }}>Siège bébé:</span>
                  <span style={{ color: '#666666' }}>{parseFloat(contractForm.babySeatCost) || 0} MAD</span>
                </div>
              )}
              
              {contractForm.surveillanceCost && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <span style={{ color: '#666666' }}>Surveillance:</span>
                  <span style={{ color: '#666666' }}>{parseFloat(contractForm.surveillanceCost) || 0} MAD</span>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '12px',
              paddingBottom: '12px',
              borderBottom: '2px solid #C8E6C9'
            }}>
              <span style={{ color: '#333333', fontSize: '15px', fontWeight: '600' }}>Sous-total:</span>
              <span style={{ color: '#2196F3', fontSize: '15px', fontWeight: '600' }}>{subtotal} MAD</span>
            </div>

            {contractForm.tva && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                paddingBottom: '12px',
                borderBottom: '1px solid #C8E6C9'
              }}>
                <span style={{ color: '#333333', fontSize: '14px' }}>TVA:</span>
                <span style={{ color: '#666666', fontSize: '14px', fontWeight: '600' }}>{parseFloat(contractForm.tva) || 0} MAD</span>
              </div>
            )}

            {contractForm.deposit && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '15px',
                paddingBottom: '15px',
                borderBottom: '2px solid #FFB300'
              }}>
                <span style={{ color: '#333333', fontSize: '14px' }}>Dépôt de garantie:</span>
                <span style={{ color: '#FF9800', fontSize: '14px', fontWeight: '600' }}>{parseFloat(contractForm.deposit) || 0} MAD</span>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '15px',
              paddingTop: '15px',
              borderTop: '2px solid #4CAF50'
            }}>
              <span style={{ color: '#333333', fontSize: '18px', fontWeight: '700' }}>Total à Payer:</span>
              <span style={{ color: '#4CAF50', fontSize: '22px', fontWeight: '800' }}>{total} MAD</span>
            </div>
          </div>
        ) : (
          <div style={{
            color: '#666666',
            fontSize: '14px',
            textAlign: 'center',
            padding: '20px 0'
          }}>
            Sélectionnez un véhicule et les dates pour calculer le prix
          </div>
        )}
      </div>
    </div>
  );

  // Step Navigation
  const renderStepNavigation = () => {
    const steps = [
      { number: 1, title: 'Informations Client' },
      { number: 2, title: 'Véhicule & Location' },
      { number: 3, title: 'Coûts & Récapitulatif' }
    ];

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#F8F9FA',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
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
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: currentStep >= step.number ? (currentStep === step.number ? '#2196F3' : '#4CAF50') : '#E0E0E0',
                color: currentStep >= step.number ? '#FFFFFF' : '#666666',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '16px',
                marginBottom: '8px',
                transition: 'all 0.3s ease',
                zIndex: 2
              }}>
                {step.number}
              </div>
              <div style={{
                fontSize: '12px',
                fontWeight: currentStep === step.number ? '600' : '400',
                color: currentStep >= step.number ? '#2196F3' : '#666666',
                textAlign: 'center',
                maxWidth: '100px'
              }}>
                {step.title}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div style={{
                flex: 1,
                height: '2px',
                backgroundColor: currentStep > step.number ? '#4CAF50' : '#E0E0E0',
                margin: '0 20px',
                minWidth: '50px',
                transition: 'all 0.3s ease'
              }} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1400px',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Popup Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 30px',
          backgroundColor: isEditing ? '#FFB300' : '#4CAF50',
          color: '#FFFFFF'
        }}>
          <div>
            <h2 style={{ 
              margin: 0, 
              fontSize: '24px',
              fontWeight: '600'
            }}>
              {isEditing ? 'Modifier le Contrat' : 'Créer un Nouveau Contrat'}
            </h2>
            <p style={{ 
              margin: '5px 0 0 0', 
              fontSize: '14px',
              opacity: 0.9
            }}>
              {currentStep === 1 && "Étape 1: Informations du client"}
              {currentStep === 2 && "Étape 2: Sélection du véhicule et période de location"}
              {currentStep === 3 && "Étape 3: Coûts supplémentaires et récapitulatif"}
            </p>
          </div>
          
          <button
            onClick={handleCancel}
            style={{
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px',
              borderRadius: '4px',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
            }}
          >
            ✕
          </button>
        </div>

        {/* Step Navigation */}
        {renderStepNavigation()}

        {/* Form Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 30px 30px'
        }}>
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Alert Message */}
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#FFF3E0', 
              borderRadius: '8px', 
              marginBottom: '25px',
              border: '1px solid #FFB300',
              display: 'flex',
              alignItems: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p style={{ margin: '0 0 0 10px', fontSize: '14px', color: '#333333' }}>
                {currentStep === 1 && "Remplissez les informations du client. Tous les champs marqués d'un astérisque (*) sont obligatoires."}
                {currentStep === 2 && "Sélectionnez le véhicule et définissez la période de location. Vous pouvez ajuster le prix par jour si nécessaire."}
                {currentStep === 3 && "Ajoutez les coûts supplémentaires si applicables. Le total sera calculé automatiquement."}
              </p>
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '15px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #E0E0E0'
            }}>
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    disabled={loading}
                    style={{
                      padding: '12px 30px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: '1px solid #E0E0E0',
                      borderRadius: '6px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      minWidth: '120px'
                    }}
                  >
                    ← Précédent
                  </button>
                )}
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={loading}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#FFFFFF',
                    color: '#333333',
                    border: '1px solid #E0E0E0',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                    minWidth: '120px'
                  }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '12px 40px',
                    backgroundColor: loading ? '#BDBDBD' : (currentStep === 3 ? '#4CAF50' : '#2196F3'),
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                    boxShadow: loading ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    minWidth: '180px'
                  }}
                >
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 12"></polyline>
                      </svg>
                      En cours...
                    </span>
                  ) : (
                    <span>
                      {currentStep === 3 ? (isEditing ? 'Mettre à jour' : 'Créer le Contrat') : 'Suivant →'}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContractFormPopup;