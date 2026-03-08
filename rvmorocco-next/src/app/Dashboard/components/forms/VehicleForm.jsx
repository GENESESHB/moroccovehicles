import React, { useEffect, useState } from 'react';

const VehicleForm = ({
  vehicleForm,
  imagePreview,
  errors,
  loading,
  isEditing,
  handleVehicleChange,
  addVehicle,
  updateVehicle,
  setShowForm,
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
        nombreCles: '',
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
    setShowForm(false);
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
      nombreCles: '',
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
    setErrors({});
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
    <div className="vehicle-form-container" style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      backgroundColor: '#0B0E11',
      color: '#EAECEF',
      minHeight: '100vh',
      padding: '0',
      overflowX: 'hidden'
    }}>
      <form onSubmit={handleSubmit} style={{
        width: '100%',
        backgroundColor: '#1E2329',
        borderRadius: '0',
        padding: '20px',
        boxShadow: 'none'
      }}>
        {/* Header */}
        <div style={{
          backgroundColor: isEditing ? '#F0B90B20' : '#3AD4A320',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '25px',
          border: `2px solid ${isEditing ? '#F0B90B' : '#3AD4A3'}`,
          textAlign: 'center'
        }}>
          <h2 style={{ 
            margin: '0 0 8px 0', 
            color: isEditing ? '#F0B90B' : '#3AD4A3',
            fontSize: 'clamp(20px, 4vw, 28px)',
            fontWeight: '700'
          }}>
            {isEditing ? ' Modifier le Véhicule' : ' Ajouter un Nouveau Véhicule'}
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            color: isEditing ? '#F0B90B' : '#3AD4A3'
          }}>
            {isEditing ? 'Modifiez les informations du véhicule ci-dessous' : 'Remplissez les informations du nouveau véhicule'}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          marginBottom: '25px'
        }}>
          
          {/* Informations de Base - REQUIRED */}
          <div style={{
            backgroundColor: '#2B3139',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #3A4249'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F0B90B',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              borderBottom: '1px solid #3A4249',
              paddingBottom: '10px'
            }}>Informations de Base</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Nom du Véhicule: <span style={{color: '#F6465D'}}>*</span>
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
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
              {errors.name && <span style={{ color: '#F6465D', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.name}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Type de Véhicule: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <select
                name="type"
                value={vehicleForm.type}
                onChange={handleVehicleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              >
                <option value="">Sélectionnez un type</option>
                <optgroup label=" Véhicules légers">
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
              {errors.type && <span style={{ color: '#F6465D', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.type}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Boîte de Vitesse: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <select
                name="boiteVitesse"
                value={vehicleForm.boiteVitesse}
                onChange={handleVehicleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              >
                <option value="">Sélectionnez</option>
                <option value="Manuelle">Manuelle</option>
                <option value="Automatique">Automatique</option>
              </select>
              {errors.boiteVitesse && <span style={{ color: '#F6465D', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.boiteVitesse}</span>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Prix par Jour (€): <span style={{color: '#F6465D'}}>*</span>
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
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
            </div>
          </div>

          {/* Carburant et État - REQUIRED */}
          <div style={{
            backgroundColor: '#2B3139',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #3A4249'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F0B90B',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              borderBottom: '1px solid #3A4249',
              paddingBottom: '10px'
            }}>Carburant et État</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Type de Carburant: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <select
                name="carburant"
                value={vehicleForm.carburant}
                onChange={handleVehicleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
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
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Niveau du Réservoir: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <select
                name="niveauReservoir"
                value={vehicleForm.niveauReservoir}
                onChange={handleVehicleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              >
                <option value="">Sélectionnez</option>
                <option value="1/4">1/4</option>
                <option value="1/2">1/2</option>
                <option value="3/4">3/4</option>
                <option value="PLEIN">PLEIN</option>
              </select>
            </div>
          </div>

          {/* Équipements Audio - REQUIRED */}
          <div style={{
            backgroundColor: '#2B3139',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #3A4249'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F0B90B',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              borderBottom: '1px solid #3A4249',
              paddingBottom: '10px'
            }}>Équipements Audio: <span style={{color: '#F6465D'}}>*</span></h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.radio ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.radio ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.radio && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                Radio
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.gps ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.gps ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.gps && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                GPS
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.mp3 ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.mp3 ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.mp3 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                MP3
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.cd ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.cd ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.cd && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                CD
              </label>
            </div>
          </div>

          {/* Impôts - REQUIRED */}
          <div style={{
            backgroundColor: '#2B3139',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #3A4249'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F0B90B',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              borderBottom: '1px solid #3A4249',
              paddingBottom: '10px'
            }}>Impôts du Véhicule: <span style={{color: '#F6465D'}}>*</span></h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.impot2026 ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.impot2026 ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.impot2026 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                Impôt 2026
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.impot2027 ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.impot2027 ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.impot2027 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                Impôt 2027
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.impot2028 ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.impot2028 ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.impot2028 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                Impôt 2028
              </label>
              
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                padding: '10px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                backgroundColor: vehicleForm.impot2029 ? '#F0B90B20' : 'transparent'
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
                  border: '2px solid #3A4249',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: vehicleForm.impot2029 ? '#F0B90B' : 'transparent'
                }}>
                  {vehicleForm.impot2029 && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </span>
                Impôt 2029
              </label>
            </div>
          </div>

          {/* Clés et Kilométrage - REQUIRED */}
          <div style={{
            backgroundColor: '#2B3139',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #3A4249'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F0B90B',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              borderBottom: '1px solid #3A4249',
              paddingBottom: '10px'
            }}>Clés et Kilométrage</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Immatriculation: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <input
                type="text"
                name="nombreCles"
                value={vehicleForm.nombreCles}
                onChange={handleVehicleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Kilométrage Départ: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <input
                type="number"
                name="kmDepart"
                value={vehicleForm.kmDepart}
                onChange={handleVehicleChange}
                min="0"
                placeholder="KM au départ"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Kilométrage Retour: {/* RETIRÉ L'ASTRISQUE */}
              </label>
              <input
                type="number"
                name="kmRetour"
                value={vehicleForm.kmRetour}
                onChange={handleVehicleChange}
                min="0"
                placeholder="KM au retour"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
            </div>
          </div>

          {/* Assurance et Vidange - REQUIRED */}
          <div style={{
            backgroundColor: '#2B3139',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #3A4249'
          }}>
            <h3 style={{
              margin: '0 0 15px 0',
              color: '#F0B90B',
              fontSize: 'clamp(16px, 3vw, 18px)',
              fontWeight: '600',
              borderBottom: '1px solid #3A4249',
              paddingBottom: '10px'
            }}>Assurance et Entretien</h3>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Date Début Assurance: <span style={{color: '#F6465D'}}>*</span>
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
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Date Fin Assurance: <span style={{color: '#F6465D'}}>*</span>
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
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)'
              }}>
                Intervalle Vidange: <span style={{color: '#F6465D'}}>*</span>
              </label>
              <select
                name="vidangeInterval"
                value={vehicleForm.vidangeInterval}
                onChange={handleVehicleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#0B0E11',
                  border: '1px solid #3A4249',
                  borderRadius: '6px',
                  color: '#EAECEF',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}
              >
                <option value="">Sélectionnez</option>
                <option value="8000">8000 KM</option>
                <option value="10000">10000 KM</option>
                <option value="12000">12000 KM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Image du véhicule - REQUIRED seulement pour l'ajout */}
        <div style={{
          backgroundColor: '#2B3139',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #3A4249',
          marginBottom: '25px'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#F0B90B',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: '600',
            borderBottom: '1px solid #3A4249',
            paddingBottom: '10px'
          }}>
            Image du Véhicule: 
            {!isEditing && <span style={{color: '#F6465D'}}> *</span>}
            {isEditing && <span style={{color: '#848E9C', fontSize: '12px'}}> (Laissez vide pour garder l'image actuelle)</span>}
          </h3>
          
          <div style={{
            border: '2px dashed #3A4249',
            borderRadius: '8px',
            padding: '30px 20px',
            textAlign: 'center',
            backgroundColor: '#0B0E11',
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
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#848E9C" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span style={{ color: '#848E9C', marginTop: '15px', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>
                Cliquez pour télécharger une image
              </span>
              <span style={{ color: '#848E9C', fontSize: '12px', marginTop: '8px' }}>
                Formats acceptés: JPEG, JPG, PNG, GIF
              </span>
            </label>
          </div>
          
          {errors.image && <span style={{ color: '#F6465D', fontSize: '12px', display: 'block', marginTop: '10px' }}>{errors.image}</span>}
          
          {imagePreview && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <img
                src={imagePreview}
                alt="Aperçu"
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  borderRadius: '8px',
                  border: '1px solid #3A4249'
                }}
              />
            </div>
          )}
          
          {isEditing && vehicleForm.existingImage && !imagePreview && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#848E9C', margin: '0 0 10px 0' }}>Image actuelle:</p>
              <img
                src={vehicleForm.existingImage}
                alt="Actuel"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '8px',
                  border: '1px solid #3A4249'
                }}
              />
            </div>
          )}
        </div>

        {/* Sélection des parties endommagées - REQUIRED */}
        <div style={{
          backgroundColor: '#2B3139',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #3A4249',
          marginBottom: '25px'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#F0B90B',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: '600',
            borderBottom: '1px solid #3A4249',
            paddingBottom: '10px'
          }}>
            🚨 Parties Endommagées du Véhicule: <span style={{color: '#F6465D'}}>*</span>
            {selectedDamagesCount > 0 && (
              <span style={{ color: '#F6465D', marginLeft: '10px' }}>
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
            border: '1px solid #3A4249',
            borderRadius: '6px',
            backgroundColor: '#0B0E11'
          }}>
            {carParts.map((part) => (
              <div
                key={part.id}
                onClick={() => handleCarPartClick(part.id)}
                style={{
                  padding: '12px 8px',
                  border: `2px solid ${part.selected ? '#F6465D' : '#3A4249'}`,
                  borderRadius: '6px',
                  backgroundColor: part.selected ? '#F6465D20' : 'transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <span style={{ 
                  color: part.selected ? '#F6465D' : '#EAECEF',
                  fontWeight: part.selected ? 'bold' : 'normal',
                  fontSize: 'clamp(12px, 2vw, 13px)'
                }}>
                  {part.name}
                </span>
                {part.selected && (
                  <span style={{ color: '#F6465D', marginLeft: '5px' }}>●</span>
                )}
              </div>
            ))}
          </div>
          
          {selectedDamagesCount > 0 && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#F6465D20', 
              borderRadius: '6px',
              border: '1px solid #F6465D'
            }}>
              <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#F6465D' }}>Parties endommagées sélectionnées:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {carParts
                  .filter(part => part.selected)
                  .map(part => (
                    <span
                      key={part.id}
                      style={{
                        padding: '4px 10px',
                        backgroundColor: '#F6465D',
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

        {/* Description et Remarques - NON REQUIRED */}
        <div style={{
          backgroundColor: '#2B3139',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #3A4249',
          marginBottom: '25px'
        }}>
          <h3 style={{
            margin: '0 0 15px 0',
            color: '#F0B90B',
            fontSize: 'clamp(16px, 3vw, 18px)',
            fontWeight: '600',
            borderBottom: '1px solid #3A4249',
            paddingBottom: '10px'
          }}>Informations Supplémentaires</h3>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#EAECEF',
              fontSize: 'clamp(13px, 2.5vw, 14px)'
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
                backgroundColor: '#0B0E11',
                border: '1px solid #3A4249',
                borderRadius: '6px',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)',
                resize: 'vertical'
              }}
            />
            {errors.description && <span style={{ color: '#F6465D', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.description}</span>}
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#EAECEF',
              fontSize: 'clamp(13px, 2.5vw, 14px)'
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
                backgroundColor: '#0B0E11',
                border: '1px solid #3A4249',
                borderRadius: '6px',
                color: '#EAECEF',
                fontSize: 'clamp(13px, 2.5vw, 14px)',
                resize: 'vertical'
              }}
            />
            {errors.remarques && <span style={{ color: '#F6465D', fontSize: '12px', display: 'block', marginTop: '5px' }}>{errors.remarques}</span>}
          </div>
        </div>

        {/* Alert Message */}
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#F6465D20', 
          borderRadius: '8px', 
          marginBottom: '25px',
          border: '1px solid #F6465D',
          display: 'flex',
          alignItems: 'center'
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F6465D" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p style={{ margin: '0 0 0 10px', fontSize: 'clamp(13px, 2.5vw, 14px)', color: '#F6465D' }}>
            <strong>Attention:</strong> Tous les champs marqués d'un astérisque (*) sont obligatoires.
          </p>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '15px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 40px',
              backgroundColor: loading ? '#3A4249' : (isEditing ? '#F0B90B' : '#3AD4A3'),
              color: '#0B0E11',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(15px, 3vw, 17px)',
              fontWeight: '700',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
              minWidth: '200px'
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 12"></polyline>
                </svg>
                En cours...
              </span>
            ) : (
              <span>{isEditing ? ' Mettre à jour' : ' Ajouter le Véhicule'}</span>
            )}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            style={{
              padding: '14px 30px',
              backgroundColor: '#3A4249',
              color: '#EAECEF',
              border: '1px solid #3A4249',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: 'clamp(15px, 3vw, 17px)',
              fontWeight: '500',
              transition: 'all 0.2s',
              minWidth: '150px'
            }}
          >
            ✕ Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;