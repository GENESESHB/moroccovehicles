import React, { useState, useEffect } from 'react';

const VehicleCard = ({ vehicle, onEdit, onDelete, onToggleAvailability }) => {
  const [daysUntilAssurance, setDaysUntilAssurance] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Calculate days remaining for assurance
  useEffect(() => {
    const calculateDaysRemaining = () => {
      if (vehicle.assuranceEndDate) {
        const now = new Date();
        const assuranceEnd = new Date(vehicle.assuranceEndDate);
        const diffTime = assuranceEnd - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysUntilAssurance(diffDays);
      }
    };

    calculateDaysRemaining();
    const interval = setInterval(calculateDaysRemaining, 3600000);
    return () => clearInterval(interval);
  }, [vehicle.assuranceEndDate]);

  // Hide scrollbar when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [showModal]);

  const getStatusColor = (days) => {
    if (days === null || days === undefined) return '#666';
    if (days < 0) return '#dc2626';
    if (days <= 7) return '#ea580c';
    if (days <= 30) return '#d97706';
    return '#16a34a';
  };

  const getStatusText = (days) => {
    if (days === null || days === undefined) return 'Non définie';
    if (days < 0) return `Expirée (${Math.abs(days)}j)`;
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return '1 jour';
    return `${days} jours`;
  };

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le véhicule "${vehicle.name}" ?`)) {
      onDelete(vehicle._id);
    }
  };

  const handleToggleAvailability = () => {
    onToggleAvailability(vehicle._id, !vehicle.available);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <>
      <div 
        className="vehicle-card" 
        onClick={() => setShowModal(true)}
        style={{
          background: '#181A20',
          borderRadius: '16px',
          overflow: 'hidden',
          marginBottom: '20px',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        {/* Action Buttons */}
        {showActions && !isMobile && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(vehicle);
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: '#FCD535',
                color: '#000',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Modifier
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleAvailability();
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: vehicle.available ? '#FCD535' : '#dc2626',
                color: vehicle.available ? '#000' : '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {vehicle.available ? 'Désactiver' : 'Activer'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              style={{
                padding: '8px 12px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              Supprimer
            </button>
          </div>
        )}

        {/* Popular Badge */}
        {vehicle.populaire && (
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            backgroundColor: '#FCD535',
            color: '#000',
            padding: isMobile ? '4px 12px' : '6px 16px',
            borderRadius: '20px',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: 'bold',
            zIndex: 5
          }}>
            Populaire
          </div>
        )}

        {/* Vehicle Image - Full Width */}
        <div style={{ 
          height: isMobile ? '180px' : '220px', 
          position: 'relative', 
          backgroundColor: '#2B3139' 
        }}>
          {imageError ? (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#848E9C',
              fontSize: '14px'
            }}>
              Image non disponible
            </div>
          ) : (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              onError={handleImageError}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => !isMobile && (e.target.style.transform = 'scale(1.05)')}
              onMouseOut={(e) => !isMobile && (e.target.style.transform = 'scale(1)')}
            />
          )}
          
          {/* Overlay Gradient */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
          }} />
        </div>

        {/* Vehicle Info - Simplified */}
        <div style={{ padding: isMobile ? '16px' : '24px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            marginBottom: '16px',
            flexDirection: isMobile ? 'column' : 'row'
          }}>
            <div style={{ flex: 1, marginBottom: isMobile ? '12px' : 0 }}>
              <h3 style={{ 
                margin: 0, 
                color: '#fff', 
                fontSize: isMobile ? '20px' : '24px', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                {vehicle.name}
              </h3>
              {!vehicle.available && (
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: 'rgba(220, 38, 38, 0.2)',
                  color: '#dc2626',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  INDISPONIBLE
                </span>
              )}
            </div>
          </div>

          {/* Price and Assurance Info */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px 0',
            borderTop: '1px solid #2B3139',
            borderBottom: '1px solid #2B3139',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}>
            <div style={{ marginBottom: isMobile ? '12px' : 0 }}>
              <div style={{ color: '#848E9C', fontSize: isMobile ? '13px' : '14px', marginBottom: '4px' }}>Prix par jour</div>
              <div style={{ color: '#FCD535', fontSize: isMobile ? '24px' : '28px', fontWeight: 'bold' }}>
                {vehicle.pricePerDay} <span style={{ fontSize: isMobile ? '14px' : '16px', fontWeight: 'normal', color: '#848E9C' }}>MAD</span>
              </div>
            </div>
            
            <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
              <div style={{ color: '#848E9C', fontSize: isMobile ? '13px' : '14px', marginBottom: '4px' }}>Assurance</div>
              <div style={{ 
                color: getStatusColor(daysUntilAssurance), 
                fontSize: isMobile ? '14px' : '16px', 
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: getStatusColor(daysUntilAssurance)
                }} />
                {getStatusText(daysUntilAssurance)}
              </div>
            </div>
          </div>

          {/* View Details Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            style={{
              width: '100%',
              padding: isMobile ? '12px' : '14px',
              backgroundColor: '#FCD535',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: isMobile ? '14px' : '16px',
              fontWeight: 'bold',
              marginTop: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (!isMobile) {
                e.target.style.backgroundColor = '#e5c030';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseOut={(e) => {
              if (!isMobile) {
                e.target.style.backgroundColor = '#FCD535';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            Voir les détails
          </button>

          {/* Mobile Action Buttons */}
          {isMobile && (
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '12px'
            }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(vehicle);
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#FCD535',
                  color: '#000',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Modifier
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleAvailability();
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: vehicle.available ? '#FCD535' : '#dc2626',
                  color: vehicle.available ? '#000' : '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                {vehicle.available ? 'Désactiver' : 'Activer'}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                style={{
                  flex: 1,
                  padding: '10px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Supprimer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal for detailed information */}
      {showModal && (
        <>
          {/* Global styles for hiding scrollbar */}
          <style>{`
            .modal-scroll-hide::-webkit-scrollbar {
              display: none;
              width: 0;
            }
            .modal-scroll-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
          
          <div 
            className="modal-overlay" 
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: isMobile ? 'flex-start' : 'center',
              zIndex: 1000,
              padding: isMobile ? '0' : '20px',
              overflow: isMobile ? 'auto' : 'hidden'
            }}
          >
            <div 
              className="modal-content modal-scroll-hide"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: '#181A20',
                color: '#fff',
                borderRadius: isMobile ? '0' : '16px',
                width: isMobile ? '100%' : '95%',
                maxWidth: '1000px',
                height: isMobile ? '100%' : '90vh',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: isMobile ? '12px' : '20px',
                  right: isMobile ? '12px' : '20px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: 'none',
                  color: '#fff',
                  fontSize: isMobile ? '24px' : '28px',
                  cursor: 'pointer',
                  padding: '0',
                  width: isMobile ? '36px' : '44px',
                  height: isMobile ? '36px' : '44px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  transition: 'background 0.2s ease',
                  zIndex: 1001
                }}
              >
                ×
              </button>

              {/* Modal Body - Scrollable */}
              <div 
                className="modal-scroll-hide"
                style={{ 
                  overflowY: 'auto',
                  height: '100%',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {/* Vehicle Image - Flexible Height */}
                <div style={{ 
                  position: 'relative',
                  backgroundColor: '#2B3139',
                  minHeight: isMobile ? '250px' : '300px',
                  maxHeight: isMobile ? '350px' : '500px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {imageError ? (
                    <div style={{
                      color: '#848E9C',
                      fontSize: isMobile ? '16px' : '18px',
                      textAlign: 'center',
                      padding: '40px'
                    }}>
                      Image non disponible
                    </div>
                  ) : (
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      onError={handleImageError}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        maxHeight: isMobile ? '350px' : '500px'
                      }}
                    />
                  )}
                  
                  {/* Popular Badge */}
                  {vehicle.populaire && (
                    <div style={{
                      position: 'absolute',
                      top: isMobile ? '16px' : '20px',
                      left: isMobile ? '16px' : '20px',
                      backgroundColor: '#FCD535',
                      color: '#000',
                      padding: isMobile ? '6px 12px' : '8px 20px',
                      borderRadius: '20px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: 'bold',
                      zIndex: 5
                    }}>
                      Populaire
                    </div>
                  )}
                </div>

                {/* Vehicle Details */}
                <div style={{ 
                  padding: isMobile ? '20px' : '32px',
                  paddingBottom: isMobile ? '100px' : '32px' // Extra space for fixed footer on mobile
                }}>
                  {/* Title and Price */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start', 
                    marginBottom: '24px',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '16px' : '0'
                  }}>
                    <div>
                      <h2 style={{ 
                        margin: 0, 
                        fontSize: isMobile ? '24px' : '32px', 
                        fontWeight: 'bold', 
                        marginBottom: '8px' 
                      }}>
                        {vehicle.name}
                      </h2>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '12px', 
                        flexWrap: 'wrap'
                      }}>
                        {!vehicle.available && (
                          <span style={{
                            padding: '4px 12px',
                            backgroundColor: 'rgba(220, 38, 38, 0.2)',
                            color: '#dc2626',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            INDISPONIBLE
                          </span>
                        )}
                        <div style={{ 
                          color: getStatusColor(daysUntilAssurance), 
                          fontSize: isMobile ? '14px' : '16px', 
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: getStatusColor(daysUntilAssurance)
                          }} />
                          Assurance: {getStatusText(daysUntilAssurance)}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                      <div style={{ 
                        color: '#848E9C', 
                        fontSize: isMobile ? '14px' : '16px', 
                        marginBottom: '4px' 
                      }}>
                        Prix par jour
                      </div>
                      <div style={{ 
                        color: '#FCD535', 
                        fontSize: isMobile ? '28px' : '36px', 
                        fontWeight: 'bold' 
                      }}>
                        {vehicle.pricePerDay} <span style={{ 
                          fontSize: isMobile ? '16px' : '20px', 
                          fontWeight: 'normal', 
                          color: '#848E9C' 
                        }}>
                          MAD
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Info Grid */}
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '12px',
                    marginBottom: '24px'
                  }}>
                    <div style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: isMobile ? '13px' : '14px', color: '#848E9C', marginBottom: '8px' }}>Type</div>
                      <div style={{ fontSize: isMobile ? '16px' : '18px', color: '#EAECEF', fontWeight: 'bold' }}>{vehicle.type}</div>
                    </div>
                    <div style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: isMobile ? '13px' : '14px', color: '#848E9C', marginBottom: '8px' }}>Boîte de vitesse</div>
                      <div style={{ fontSize: isMobile ? '16px' : '18px', color: '#EAECEF', fontWeight: 'bold' }}>{vehicle.boiteVitesse}</div>
                    </div>
                    <div style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: isMobile ? '13px' : '14px', color: '#848E9C', marginBottom: '8px' }}>Carburant</div>
                      <div style={{ fontSize: isMobile ? '16px' : '18px', color: '#EAECEF', fontWeight: 'bold' }}>{vehicle.carburant || 'Non spécifié'}</div>
                    </div>
                  </div>

                  {/* Description */}
                  {vehicle.description && (
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '18px' : '20px', 
                        marginBottom: '12px', 
                        color: '#FCD535' 
                      }}>
                        Description
                      </h3>
                      <p style={{ 
                        color: '#EAECEF', 
                        fontSize: isMobile ? '14px' : '16px', 
                        lineHeight: '1.6', 
                        margin: 0 
                      }}>
                        {vehicle.description}
                      </p>
                    </div>
                  )}

                  {/* Vehicle Details Grid */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '18px' : '20px', 
                      marginBottom: '16px', 
                      color: '#FCD535' 
                    }}>
                      Informations détaillées
                    </h3>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', 
                      gap: '12px' 
                    }}>
                      {[
                        { label: 'Niveau réservoir', value: vehicle.niveauReservoir },
                        { label: 'Matricule', value: vehicle.matricule },
                        { label: 'KM Départ', value: vehicle.kmDepart },
                        { label: 'KM Retour', value: vehicle.kmRetour },
                        { label: 'Vidange', value: vehicle.vidangeInterval ? `${vehicle.vidangeInterval} KM` : null },
                      ].map((item, index) => (
                        item.value && (
                          <div key={index} style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                            <div style={{ 
                              fontSize: isMobile ? '13px' : '14px', 
                              color: '#848E9C', 
                              marginBottom: '8px' 
                            }}>
                              {item.label}
                            </div>
                            <div style={{ 
                              fontSize: isMobile ? '15px' : '16px', 
                              color: '#EAECEF' 
                            }}>
                              {item.value || 'Non spécifié'}
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>

                  {/* Equipment */}
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '18px' : '20px', 
                      marginBottom: '12px', 
                      color: '#FCD535' 
                    }}>
                      Équipements
                    </h3>
                    <div style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                      <div style={{ fontSize: isMobile ? '15px' : '16px', color: '#EAECEF' }}>
                        {[
                          vehicle.radio && '🎵 Radio',
                          vehicle.gps && '📍 GPS',
                          vehicle.mp3 && '🎶 MP3',
                          vehicle.cd && '💿 CD',
                        ].filter(Boolean).join(' • ') || 'Aucun équipement'}
                      </div>
                    </div>
                  </div>

                  {/* Damages */}
                  {vehicle.dommages && vehicle.dommages.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '18px' : '20px', 
                        marginBottom: '12px', 
                        color: '#FCD535' 
                      }}>
                        Dommages
                      </h3>
                      <div style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                        <div style={{ 
                          fontSize: isMobile ? '15px' : '16px', 
                          color: '#EAECEF', 
                          marginBottom: '8px' 
                        }}>
                          {vehicle.dommages.length} dommage(s)
                        </div>
                        <div style={{ 
                          fontSize: isMobile ? '13px' : '14px', 
                          color: '#dc2626', 
                          lineHeight: '1.5' 
                        }}>
                          Parties endommagées: {vehicle.dommages.join(', ')}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Remarks */}
                  {vehicle.remarques && (
                    <div style={{ marginBottom: '24px' }}>
                      <h3 style={{ 
                        fontSize: isMobile ? '18px' : '20px', 
                        marginBottom: '12px', 
                        color: '#FCD535' 
                      }}>
                        Remarques
                      </h3>
                      <div style={{ backgroundColor: '#2B3139', padding: '16px', borderRadius: '12px' }}>
                        <div style={{ 
                          fontSize: isMobile ? '14px' : '16px', 
                          color: '#EAECEF', 
                          lineHeight: '1.5' 
                        }}>
                          {vehicle.remarques}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Last Updated */}
                  <div style={{
                    fontSize: isMobile ? '12px' : '14px',
                    color: '#848E9C',
                    textAlign: 'right',
                    marginTop: '20px',
                    paddingTop: '16px',
                    borderTop: '1px solid #2B3139'
                  }}>
                    Mis à jour: {new Date(vehicle.updatedAt || vehicle.createdAt).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>

              {/* Modal Footer - Fixed at bottom */}
              <div style={{ 
                position: isMobile ? 'fixed' : 'static',
                bottom: 0,
                left: 0,
                right: 0,
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: isMobile ? '16px' : '20px 32px',
                borderTop: '1px solid #2B3139',
                backgroundColor: '#1a1d23',
                flexShrink: 0,
                zIndex: 100,
                boxShadow: isMobile ? '0 -4px 12px rgba(0,0,0,0.3)' : 'none'
              }}>
                <div style={{ 
                  color: '#FCD535', 
                  fontSize: isMobile ? '20px' : '24px', 
                  fontWeight: 'bold' 
                }}>
                  {vehicle.pricePerDay} <span style={{ 
                    fontSize: isMobile ? '14px' : '16px', 
                    fontWeight: 'normal', 
                    color: '#848E9C' 
                  }}>
                    MAD/jour
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  gap: isMobile ? '8px' : '12px',
                  flexDirection: isMobile ? 'column' : 'row'
                }}>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      onEdit(vehicle);
                    }}
                    style={{
                      padding: isMobile ? '10px 16px' : '12px 24px',
                      backgroundColor: 'transparent',
                      color: '#FCD535',
                      border: '1px solid #FCD535',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      minWidth: isMobile ? '80px' : 'auto'
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleToggleAvailability();
                    }}
                    style={{
                      padding: isMobile ? '10px 16px' : '12px 24px',
                      backgroundColor: vehicle.available ? '#FCD535' : '#dc2626',
                      color: vehicle.available ? '#000' : '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      minWidth: isMobile ? '80px' : 'auto'
                    }}
                  >
                    {vehicle.available ? 'Désactiver' : 'Activer'}
                  </button>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      handleDelete();
                    }}
                    style={{
                      padding: isMobile ? '10px 16px' : '12px 24px',
                      backgroundColor: 'transparent',
                      color: '#dc2626',
                      border: '1px solid #dc2626',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.2s ease',
                      minWidth: isMobile ? '80px' : 'auto'
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VehicleCard;