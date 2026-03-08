import React, { useState, useEffect } from 'react';

const VehicleFormPopup = ({
  vehicleForm,
  imagePreview,
  errors,
  loading,
  isEditing,
  handleVehicleChange,
  addVehicle,
  updateVehicle,
  onClose,
  setVehicleForm,
  setImagePreview,
  setErrors
}) => {
  const [damageAreas, setDamageAreas] = useState([]);
  const [carParts, setCarParts] = useState([
    { id: 'pare-chocs-avant', name: 'Pare-chocs Avant', selected: false },
    { id: 'pare-chocs-arriere', name: 'Pare-chocs Arrière', selected: false },
    { id: 'porte-avant-gauche', name: 'Porte Avant Gauche', selected: false },
    { id: 'porte-avant-droite', name: 'Porte Avant Droite', selected: false },
    { id: 'porte-arriere-gauche', name: 'Porte Arrière Gauche', selected: false },
    { id: 'porte-arriere-droite', name: 'Porte Arrière Droite', selected: false },
    { id: 'aile-avant-gauche', name: 'Aile Avant Gauche', selected: false },
    { id: 'aile-avant-droite', name: 'Aile Avant Droite', selected: false },
    { id: 'aile-arriere-gauche', name: 'Aile Arrière Gauche', selected: false },
    { id: 'aile-arriere-droite', name: 'Aile Arrière Droite', selected: false },
    { id: 'capot', name: 'Capot', selected: false },
    { id: 'coffre', name: 'Coffre', selected: false },
    { id: 'toit', name: 'Toit', selected: false },
    { id: 'retroviseur-gauche', name: 'Rétroviseur Gauche', selected: false },
    { id: 'retroviseur-droit', name: 'Rétroviseur Droit', selected: false },
    { id: 'phare-avant-gauche', name: 'Phare Avant Gauche', selected: false },
    { id: 'phare-avant-droit', name: 'Phare Avant Droit', selected: false },
    { id: 'feu-arriere-gauche', name: 'Feu Arrière Gauche', selected: false },
    { id: 'feu-arriere-droit', name: 'Feu Arrière Droit', selected: false },
    { id: 'vitre-avant', name: 'Vitre Avant', selected: false },
    { id: 'vitre-arriere', name: 'Vitre Arrière', selected: false },
    { id: 'jante-avant-gauche', name: 'Jante Avant Gauche', selected: false },
    { id: 'jante-avant-droite', name: 'Jante Avant Droite', selected: false },
    { id: 'jante-arriere-gauche', name: 'Jante Arrière Gauche', selected: false },
    { id: 'jante-arriere-droite', name: 'Jante Arrière Droite', selected: false }
  ]);

  // Reset form when switching between add/edit modes
  useEffect(() => {
    if (!isEditing) {
      setVehicleForm({
        name: '',
        type: '',
        boiteVitesse: '',
        description: '',
        image: null,
        pricePerDay: '',
        carburant: '',
        niveauReservoir: '',
        gps: false,
        mp3: false,
        cd: false,
        radio: false,
        matricule: '', // CHANGÉ ICI
        kmDepart: '',
        kmRetour: '',
        impot2026: false,
        impot2027: false,
        impot2028: false,
        impot2029: false,
        assuranceStartDate: '',
        assuranceEndDate: '',
        vidangeInterval: '',
        remarques: '',
        dommages: []
      });
      setImagePreview(null);
      setDamageAreas([]);
      resetCarParts();
    }
  }, [isEditing, setVehicleForm, setImagePreview]);

  // Load existing damages when editing
  useEffect(() => {
    if (isEditing && vehicleForm.dommages) {
      const updatedParts = carParts.map(part => ({
        ...part,
        selected: vehicleForm.dommages.includes(part.id)
      }));
      setCarParts(updatedParts);
    }
  }, [isEditing, vehicleForm.dommages]);

  const resetCarParts = () => {
    setCarParts(parts => parts.map(part => ({ ...part, selected: false })));
  };

  const handleCarPartClick = (partId) => {
    const updatedParts = carParts.map(part => 
      part.id === partId ? { ...part, selected: !part.selected } : part
    );
    
    setCarParts(updatedParts);
    
    const selectedDamages = updatedParts
      .filter(part => part.selected)
      .map(part => part.id);
    
    setVehicleForm(prev => ({
      ...prev,
      dommages: selectedDamages
    }));
  };

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = (e) => {
    if (isEditing) {
      updateVehicle(e);
    } else {
      addVehicle(e);
    }
  };

  const selectedDamagesCount = carParts.filter(part => part.selected).length;

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
        maxWidth: '1200px',
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
              {isEditing ? 'Modifier le Véhicule' : 'Ajouter un Nouveau Véhicule'}
            </h2>
            <p style={{ 
              margin: '5px 0 0 0', 
              fontSize: '14px',
              opacity: 0.9
            }}>
              {isEditing ? 'Modifiez les informations du véhicule ci-dessous' : 'Remplissez les informations du nouveau véhicule'}
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

        {/* Form Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '30px'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px',
              marginBottom: '25px'
            }}>
              
              {/* Informations de Base */}
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
                }}>Informations de Base</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Nom du Véhicule: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={vehicleForm.name}
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
                  />
                  {errors.name && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.name}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Type de Véhicule: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="type"
                    value={vehicleForm.type}
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
                    <option value="">Sélectionnez un type</option>
                    <optgroup label="Véhicules légers">
                      <option value="Citadine">Citadine</option>
                      <option value="Compacte">Compacte</option>
                      <option value="Berline">Berline</option>
                      <option value="Berline premium">Berline premium</option>
                      <option value="Coupé">Coupé</option>
                      <option value="Cabriolet">Cabriolet</option>
                      <option value="Break">Break</option>
                      <option value="SUV">SUV</option>
                      <option value="SUV compact">SUV compact</option>
                      <option value="SUV premium">SUV premium</option>
                      <option value="Crossover">Crossover</option>
                    </optgroup>
                  </select>
                  {errors.type && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.type}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Boîte de Vitesse: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="boiteVitesse"
                    value={vehicleForm.boiteVitesse}
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
                    <option value="">Sélectionnez</option>
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                  </select>
                  {errors.boiteVitesse && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.boiteVitesse}</span>}
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Prix par Jour (MAD): <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    value={vehicleForm.pricePerDay}
                    onChange={handleVehicleChange}
                    required
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

              {/* Carburant et État */}
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
                }}>Carburant et État</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Type de Carburant: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="carburant"
                    value={vehicleForm.carburant}
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
                    <option value="">Sélectionnez</option>
                    <option value="Gasoil">Gasoil</option>
                    <option value="Essence">Essence</option>
                    <option value="Hybride">Hybride</option>
                    <option value="Électrique">Électrique</option>
                  </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Niveau du Réservoir: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="niveauReservoir"
                    value={vehicleForm.niveauReservoir}
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
                    <option value="">Sélectionnez</option>
                    <option value="1/4">1/4</option>
                    <option value="1/2">1/2</option>
                    <option value="3/4">3/4</option>
                    <option value="PLEIN">PLEIN</option>
                  </select>
                </div>

                {/* CHANGÉ ICI - Matricule/Immatriculation */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Matricule/Immatriculation: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="matricule"
                    value={vehicleForm.matricule}
                    onChange={handleVehicleChange}
                    required
                    placeholder="Ex: 12345-A-6"
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
                  {errors.matricule && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.matricule}</span>}
                </div>
              </div>

              {/* Équipements Audio */}
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
                }}>Équipements Audio</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.radio ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.radio ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="radio"
                      checked={vehicleForm.radio}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, radio: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.radio ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.radio && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>Radio</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.gps ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.gps ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="gps"
                      checked={vehicleForm.gps}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, gps: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.gps ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.gps && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>GPS</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.mp3 ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.mp3 ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="mp3"
                      checked={vehicleForm.mp3}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, mp3: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.mp3 ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.mp3 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>MP3</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.cd ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.cd ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="cd"
                      checked={vehicleForm.cd}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, cd: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.cd ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.cd && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>CD</span>
                  </label>
                </div>
              </div>

              {/* Kilométrage */}
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
                }}>Kilométrage</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Kilométrage Départ: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="number"
                    name="kmDepart"
                    value={vehicleForm.kmDepart}
                    onChange={handleVehicleChange}
                    min="0"
                    placeholder="KM au départ"
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
                    Kilométrage Retour: {/* RETIRÉ L'ASTRISQUE */}
                  </label>
                  <input
                    type="number"
                    name="kmRetour"
                    value={vehicleForm.kmRetour}
                    onChange={handleVehicleChange}
                    min="0"
                    placeholder="KM au retour (optionnel)"
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
                    Intervalle Vidange: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="vidangeInterval"
                    value={vehicleForm.vidangeInterval}
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
                    <option value="">Sélectionnez</option>
                    <option value="8000">8000 KM</option>
                    <option value="10000">10000 KM</option>
                    <option value="12000">12000 KM</option>
                  </select>
                </div>
              </div>

              {/* Assurance */}
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
                }}>Assurance</h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Date Début Assurance: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="date"
                    name="assuranceStartDate"
                    value={vehicleForm.assuranceStartDate}
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
                    Date Fin Assurance: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="date"
                    name="assuranceEndDate"
                    value={vehicleForm.assuranceEndDate}
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
                  />
                </div>

                <h4 style={{
                  margin: '20px 0 10px 0',
                  color: '#333333',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>Impôts du Véhicule</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.impot2026 ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.impot2026 ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="impot2026"
                      checked={vehicleForm.impot2026}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, impot2026: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.impot2026 ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.impot2026 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>Impôt 2026</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.impot2027 ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.impot2027 ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="impot2027"
                      checked={vehicleForm.impot2027}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, impot2027: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.impot2027 ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.impot2027 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>Impôt 2027</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.impot2028 ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.impot2028 ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="impot2028"
                      checked={vehicleForm.impot2028}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, impot2028: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.impot2028 ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.impot2028 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>Impôt 2028</span>
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    backgroundColor: vehicleForm.impot2029 ? '#E3F2FD' : 'transparent',
                    border: `1px solid ${vehicleForm.impot2029 ? '#2196F3' : '#E0E0E0'}`
                  }}>
                    <input
                      type="checkbox"
                      name="impot2029"
                      checked={vehicleForm.impot2029}
                      onChange={(e) => setVehicleForm(prev => ({ ...prev, impot2029: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      border: '2px solid #2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: vehicleForm.impot2029 ? '#2196F3' : 'transparent'
                    }}>
                      {vehicleForm.impot2029 && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      )}
                    </span>
                    <span style={{ color: '#333333' }}>Impôt 2029</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Image du véhicule */}
            <div style={{
              backgroundColor: '#F8F9FA',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              marginBottom: '25px'
            }}>
              <h3 style={{
                margin: '0 0 15px 0',
                color: '#333333',
                fontSize: '18px',
                fontWeight: '600',
                borderBottom: '2px solid #2196F3',
                paddingBottom: '10px'
              }}>
                Image du Véhicule: 
                {!isEditing && <span style={{color: '#F44336'}}> *</span>}
                {isEditing && <span style={{color: '#666666', fontSize: '12px'}}> (Laissez vide pour garder l'image actuelle)</span>}
              </h3>
              
              <div style={{
                border: '2px dashed #BDBDBD',
                borderRadius: '8px',
                padding: '30px 20px',
                textAlign: 'center',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}>
                <input
                  type="file"
                  name="image"
                  onChange={handleVehicleChange}
                  accept="image/jpeg, image/jpg, image/png, image/gif"
                  required={!isEditing}
                  style={{ display: 'none' }}
                  id="vehicle-image-upload"
                />
                <label htmlFor="vehicle-image-upload" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <span style={{ color: '#666666', marginTop: '15px', fontSize: '16px' }}>
                    Cliquez pour télécharger une image
                  </span>
                  <span style={{ color: '#666666', fontSize: '12px', marginTop: '8px' }}>
                    Formats acceptés: JPEG, JPG, PNG, GIF
                  </span>
                </label>
              </div>
              
              {errors.image && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '10px' }}>{errors.image}</span>}
              
              {imagePreview && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <img
                    src={imagePreview}
                    alt="Aperçu"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '8px',
                      border: '1px solid #E0E0E0'
                    }}
                  />
                </div>
              )}
              
              {isEditing && vehicleForm.existingImage && !imagePreview && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '14px', color: '#666666', margin: '0 0 10px 0' }}>Image actuelle:</p>
                  <img
                    src={vehicleForm.existingImage}
                    alt="Actuel"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      border: '1px solid #E0E0E0'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Sélection des parties endommagées */}
            <div style={{
              backgroundColor: '#F8F9FA',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              marginBottom: '25px'
            }}>
              <h3 style={{
                margin: '0 0 15px 0',
                color: '#333333',
                fontSize: '18px',
                fontWeight: '600',
                borderBottom: '2px solid #2196F3',
                paddingBottom: '10px'
              }}>
                Parties Endommagées du Véhicule
                {selectedDamagesCount > 0 && (
                  <span style={{ color: '#F44336', marginLeft: '10px', fontSize: '14px' }}>
                    ({selectedDamagesCount} partie(s) endommagée(s))
                  </span>
                )}
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', 
                gap: '10px',
                maxHeight: '400px',
                overflowY: 'auto',
                padding: '15px',
                border: '1px solid #E0E0E0',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF'
              }}>
                {carParts.map((part) => (
                  <div
                    key={part.id}
                    onClick={() => handleCarPartClick(part.id)}
                    style={{
                      padding: '12px 8px',
                      border: `2px solid ${part.selected ? '#F44336' : '#E0E0E0'}`,
                      borderRadius: '6px',
                      backgroundColor: part.selected ? '#FFEBEE' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'center'
                    }}
                  >
                    <span style={{ 
                      color: part.selected ? '#F44336' : '#333333',
                      fontWeight: part.selected ? 'bold' : 'normal',
                      fontSize: '13px'
                    }}>
                      {part.name}
                    </span>
                    {part.selected && (
                      <span style={{ color: '#F44336', marginLeft: '5px' }}>●</span>
                    )}
                  </div>
                ))}
              </div>
              
              {selectedDamagesCount > 0 && (
                <div style={{ 
                  marginTop: '20px', 
                  padding: '15px', 
                  backgroundColor: '#FFEBEE', 
                  borderRadius: '6px',
                  border: '1px solid #F44336'
                }}>
                  <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#F44336' }}>Parties endommagées sélectionnées:</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {carParts
                      .filter(part => part.selected)
                      .map(part => (
                        <span
                          key={part.id}
                          style={{
                            padding: '4px 10px',
                            backgroundColor: '#F44336',
                            color: 'white',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {part.name}
                        </span>
                      ))
                    }
                  </div>
                </div>
              )}
            </div>

            {/* Description et Remarques - OPTIONNELS */}
            <div style={{
              backgroundColor: '#F8F9FA',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              marginBottom: '25px'
            }}>
              <h3 style={{
                margin: '0 0 15px 0',
                color: '#333333',
                fontSize: '18px',
                fontWeight: '600',
                borderBottom: '2px solid #2196F3',
                paddingBottom: '10px'
              }}>Informations Supplémentaires (Optionnel)</h3>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333333',
                  fontSize: '14px'
                }}>
                  Description: {/* RETIRÉ L'ASTRISQUE */}
                </label>
                <textarea
                  name="description"
                  value={vehicleForm.description}
                  onChange={handleVehicleChange}
                  rows="3"
                  placeholder="Description du véhicule (optionnel)"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '6px',
                    color: '#333333',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
                {errors.description && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.description}</span>}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#333333',
                  fontSize: '14px'
                }}>
                  Remarques: {/* RETIRÉ L'ASTRISQUE */}
                </label>
                <textarea
                  name="remarques"
                  value={vehicleForm.remarques}
                  onChange={handleVehicleChange}
                  rows="2"
                  placeholder="Remarques supplémentaires (optionnel)"
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '6px',
                    color: '#333333',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                />
                {errors.remarques && <span style={{ color: '#F44336', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.remarques}</span>}
              </div>
            </div>

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
                <strong>Attention:</strong> Tous les champs marqués d'un astérisque (*) sont obligatoires.
              </p>
            </div>

            {/* Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px',
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #E0E0E0'
            }}>
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
                  backgroundColor: loading ? '#BDBDBD' : (isEditing ? '#FFB300' : '#4CAF50'),
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
                  <span>{isEditing ? 'Mettre à jour' : 'Ajouter le Véhicule'}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleFormPopup;