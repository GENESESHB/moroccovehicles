import React, { useState } from 'react';
import {
  FaCar,
  FaShieldAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaTimes,
  FaSave,
  FaPlus,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const InsuranceFormModal = ({
  formData,
  onInputChange,
  onSubmit,
  onClose,
  loading,
  isEditing,
  allVehicles,
  isSmartCar
}) => {
  const [submitError, setSubmitError] = useState('');

  const selectedVehicle = formData.vehicleId
    ? allVehicles.find(v => v._id === formData.vehicleId)
    : null;
  const isSmartCarSelected = selectedVehicle ? isSmartCar(selectedVehicle) : false;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    
    try {
      await onSubmit(e);
    } catch (err) {
      console.error('Form submission error:', err);
      const message = err.response?.data?.message || err.message || 'Erreur lors de l\'enregistrement';
      setSubmitError(message);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: '24px 32px',
          backgroundColor: '#36C275',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '22px',
              fontWeight: '600',
              color: '#ffffff',
              letterSpacing: '-0.01em'
            }}>
              {isEditing ? 'Modifier le contrat d\'assurance' : 'Nouveau contrat d\'assurance'}
            </h2>
            <p style={{
              margin: '4px 0 0 0',
              fontSize: '14px',
              color: '#f7cd13',
              fontWeight: '400'
            }}>
              {isEditing
                ? 'Mettez à jour les informations du contrat'
                : 'Renseignez les informations du véhicule et de la police'}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              background: 'transparent',
              border: '1px solid #E2E8F0',
              color: '#4A5568',
              fontSize: '18px',
              cursor: loading ? 'not-allowed' : 'pointer',
              padding: '8px',
              borderRadius: '12px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: loading ? 0.6 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = '#F7FAFC';
                e.target.style.borderColor = '#CBD5E0';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = '#E2E8F0';
              }
            }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Content */}
        <div style={{
          padding: '32px',
          overflowY: 'auto',
          backgroundColor: '#F9FAFC'
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '24px',
              marginBottom: '24px'
            }}>
              {/* Left Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Vehicle Card */}
                <div style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <FaCar style={{ width: '18px', height: '18px', color: '#36C275' }} />
                    <h3 style={cardTitleStyle}>Véhicule</h3>
                  </div>
                  <div style={cardBodyStyle}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>
                        Véhicule <span style={{ color: '#E53E3E' }}>*</span>
                      </label>
                      <select
                        name="vehicleId"
                        value={formData.vehicleId}
                        onChange={onInputChange}
                        required
                        disabled={loading || isEditing}
                        style={selectStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#36C275';
                          e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="">Sélectionner un véhicule</option>
                        {allVehicles.map(vehicle => {
                          const smart = isSmartCar(vehicle);
                          return (
                            <option key={vehicle._id} value={vehicle._id}>
                              {vehicle.name} - {vehicle.matricule}
                              {smart ? ' (Luxury Car)' : ''}   {/* Changed from Smart Car to Luxury Car */}
                            </option>
                          );
                        })}
                      </select>
                      {isEditing && (
                        <div style={{ fontSize: '11px', color: '#718096', marginTop: '4px' }}>
                          Le véhicule ne peut pas être modifié en mode édition
                        </div>
                      )}
                    </div>
                    {isSmartCarSelected && (
                      <div style={{
                        marginTop: '12px',
                        padding: '10px 14px',
                        backgroundColor: '#EBF8FF',
                        borderRadius: '12px',
                        border: '1px solid #90CDF4',
                        fontSize: '13px',
                        color: '#2C5282',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <FaShieldAlt style={{ width: '14px', height: '14px' }} />
                        <span>Véhicule Luxury Car détecté</span>   {/* Already correct */}
                      </div>
                    )}
                  </div>
                </div>

                {/* Insurance Company Card */}
                <div style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <FaShieldAlt style={{ width: '18px', height: '18px', color: '#36C275' }} />
                    <h3 style={cardTitleStyle}>Compagnie d'Assurance</h3>
                  </div>
                  <div style={cardBodyStyle}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>
                        Compagnie <span style={{ color: '#E53E3E' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={onInputChange}
                        required
                        disabled={loading}
                        placeholder="Ex: AXA, Wafa Assurance, Sanad..."
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#36C275';
                          e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>
                        Numéro de police <span style={{ color: '#E53E3E' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="policyNumber"
                        value={formData.policyNumber}
                        onChange={onInputChange}
                        required
                        disabled={loading}
                        placeholder="Ex: POL-2025-001234"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#36C275';
                          e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Period Card */}
                <div style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <FaCalendarAlt style={{ width: '18px', height: '18px', color: '#36C275' }} />
                    <h3 style={cardTitleStyle}>Période de validité</h3>
                  </div>
                  <div style={cardBodyStyle}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>
                          Début <span style={{ color: '#E53E3E' }}>*</span>
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={onInputChange}
                          required
                          disabled={loading}
                          style={dateInputStyle}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#36C275';
                            e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#E2E8F0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                      <div style={fieldStyle}>
                        <label style={labelStyle}>
                          Fin <span style={{ color: '#E53E3E' }}>*</span>
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={onInputChange}
                          required
                          disabled={loading}
                          style={dateInputStyle}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#36C275';
                            e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#E2E8F0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost & Status Card */}
                <div style={cardStyle}>
                  <div style={cardHeaderStyle}>
                    <FaMoneyBillWave style={{ width: '18px', height: '18px', color: '#36C275' }} />
                    <h3 style={cardTitleStyle}>Tarification & Statut</h3>
                  </div>
                  <div style={cardBodyStyle}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>
                        Coût annuel (MAD) <span style={{ color: '#E53E3E' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#718096',
                          fontWeight: '500'
                        }}>
                          MAD
                        </span>
                        <input
                          type="number"
                          name="cost"
                          value={formData.cost}
                          onChange={onInputChange}
                          step="0.01"
                          min="0"
                          required
                          disabled={loading}
                          placeholder="0.00"
                          style={{
                            ...inputStyle,
                            paddingLeft: '60px'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#36C275';
                            e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = '#E2E8F0';
                            e.target.style.boxShadow = 'none';
                          }}
                        />
                      </div>
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Statut</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={onInputChange}
                        disabled={loading}
                        style={selectStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#36C275';
                          e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        <option value="pending">En attente</option>
                        <option value="active">Active</option>
                        <option value="expired">Expirée</option>
                      </select>
                    </div>
                    
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Type de couverture</label>
                      <input
                        type="text"
                        name="coverage"
                        value={formData.coverage}
                        onChange={onInputChange}
                        disabled={loading}
                        placeholder="Ex: Tous risques, Tiers..."
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#36C275';
                          e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#E2E8F0';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes Card */}
            <div style={{ ...cardStyle, marginBottom: '24px' }}>
              <div style={cardHeaderStyle}>
                <h3 style={cardTitleStyle}>Notes</h3>
              </div>
              <div style={cardBodyStyle}>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={onInputChange}
                  disabled={loading}
                  placeholder="Informations complémentaires (franchise, options, etc.)"
                  rows="3"
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                    padding: '14px'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#36C275';
                    e.target.style.boxShadow = '0 0 0 3px rgba(54,194,117,0.28)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E2E8F0';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Error Message */}
            {submitError && (
              <div style={{
                padding: '14px 18px',
                backgroundColor: '#FED7D7',
                borderRadius: '14px',
                marginBottom: '20px',
                border: '1px solid #FC8181',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                color: '#C53030'
              }}>
                <FaExclamationTriangle style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>
                  {submitError}
                </span>
              </div>
            )}

            {/* Required Fields Reminder */}
            <div style={{
              padding: '14px 18px',
              backgroundColor: '#FFF8E7',
              borderRadius: '14px',
              marginBottom: '24px',
              border: '1px solid #FBD38D',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              color: '#744210'
            }}>
              <FaExclamationTriangle style={{ width: '18px', height: '18px', color: '#DD6B20' }} />
              <span style={{ fontSize: '13px', fontWeight: '500' }}>
                Les champs marqués d'un astérisque (*) sont obligatoires.
              </span>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '16px',
              paddingTop: '8px',
              borderTop: '1px solid #E2E8F0'
            }}>
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: '#4A5568',
                  border: '1.5px solid #CBD5E0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: loading ? 0.6 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#F7FAFC';
                    e.target.style.borderColor = '#A0AEC0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.borderColor = '#CBD5E0';
                  }
                }}
              >
                <FaTimesCircle style={{ width: '16px', height: '16px' }} />
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 28px',
                  backgroundColor: loading ? '#A0AEC0' : '#36C275',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: loading ? 'none' : '0 8px 18px rgba(54,194,117,0.28)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: loading ? 0.8 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#2DA864';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 12px 22px rgba(54,194,117,0.35)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#36C275';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 18px rgba(54,194,117,0.28)';
                  }
                }}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #fff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Traitement...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isEditing ? <FaSave style={{ width: '16px', height: '16px' }} /> : <FaPlus style={{ width: '16px', height: '16px' }} />}
                    {isEditing ? 'Mettre à jour' : 'Créer le contrat'}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const cardStyle = {
  backgroundColor: '#fff',
  borderRadius: '18px',
  padding: '20px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.02)',
  border: '1px solid #EDF2F7'
};

const cardHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '16px',
  borderBottom: '1px solid #EDF2F7',
  paddingBottom: '12px'
};

const cardBodyStyle = {
  paddingTop: '4px'
};

const cardTitleStyle = {
  margin: 0,
  fontSize: '16px',
  fontWeight: '600',
  color: '#1A202C'
};

const fieldStyle = {
  marginBottom: '16px'
};

const labelStyle = {
  display: 'block',
  marginBottom: '6px',
  fontSize: '13px',
  fontWeight: '600',
  color: '#4A5568',
  letterSpacing: '0.3px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#fff',
  border: '1.5px solid #E2E8F0',
  borderRadius: '12px',
  color: '#1A202C',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.15s, boxShadow 0.15s'
};

const selectStyle = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#fff',
  border: '1.5px solid #E2E8F0',
  borderRadius: '12px',
  color: '#1A202C',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.15s, boxShadow 0.15s'
};

const dateInputStyle = {
  width: '100%',
  padding: '12px 16px',
  backgroundColor: '#fff',
  border: '1.5px solid #E2E8F0',
  borderRadius: '12px',
  color: '#1A202C',
  fontSize: '14px',
  outline: 'none',
  transition: 'border 0.15s, boxShadow 0.15s'
};

export default InsuranceFormModal;