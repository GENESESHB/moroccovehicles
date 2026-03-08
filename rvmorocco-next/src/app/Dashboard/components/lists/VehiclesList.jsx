import React, { useState, useEffect } from 'react';

const VehicleRow = ({ vehicle, onEdit, onDelete, onToggleAvailability }) => {
  const [daysUntilAssurance, setDaysUntilAssurance] = useState(null);
  const [showActions, setShowActions] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const getStatusColor = (days) => {
    if (days === null || days === undefined) return '#9E9E9E';
    if (days < 0) return '#F44336';
    if (days <= 7) return '#FF9800';
    if (days <= 30) return '#FFB300';
    return '#4CAF50';
  };

  const getStatusText = (days) => {
    if (days === null || days === undefined) return 'Non définie';
    if (days < 0) return `Expirée (${Math.abs(days)}j)`;
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return '1 jour';
    return `${days} jours`;
  };

  const handleDelete = () => {
    if (window.confirm(`Etes-vous sûr de vouloir supprimer le véhicule "${vehicle.name}" ?`)) {
      onDelete(vehicle._id);
    }
  };

  const handleToggleAvailability = () => {
    onToggleAvailability(vehicle._id, !vehicle.available);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <tr 
      style={{
        backgroundColor: vehicle.available ? '#FFFFFF' : '#FFF3E0',
        borderBottom: '1px solid #E0E0E0',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image */}
      <td style={{ padding: '12px' }}>
        <div style={{
          width: '60px',
          height: '40px',
          borderRadius: '6px',
          overflow: 'hidden',
          backgroundColor: '#F5F5F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #E0E0E0'
        }}>
          {imageError ? (
            <div style={{
              color: '#9E9E9E',
              fontSize: '12px',
              textAlign: 'center'
            }}>
              No Img
            </div>
          ) : (
            <img
              src={vehicle.image}
              alt={vehicle.name}
              onError={handleImageError}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          )}
        </div>
      </td>

      {/* Vehicle Info */}
      <td style={{ padding: '12px' }}>
        <div>
          <div style={{ 
            color: '#333333', 
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '4px'
          }}>
            {vehicle.name}
            {!vehicle.available && (
              <span style={{
                marginLeft: '8px',
                padding: '2px 6px',
                backgroundColor: '#F44336',
                color: 'white',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 'normal'
              }}>
                INDISPONIBLE
              </span>
            )}
          </div>
          <div style={{ 
            color: '#666666', 
            fontSize: '12px' 
          }}>
            {vehicle.type} • {vehicle.boiteVitesse}
          </div>
        </div>
      </td>

      {/* Specifications */}
      <td style={{ padding: '12px' }}>
        <div style={{ 
          color: '#333333', 
          fontSize: '12px',
          lineHeight: '1.4'
        }}>
          <div><strong>Carburant:</strong> {vehicle.carburant || 'N/A'}</div>
          <div><strong>Immatriculation:</strong> {vehicle.nombreCles || 'N/A'}</div>
        </div>
      </td>

      {/* Price */}
      <td style={{ padding: '12px' }}>
        <div style={{ 
          color: '#2196F3', 
          fontWeight: '600',
          fontSize: '16px'
        }}>
          {vehicle.pricePerDay} MAD
        </div>
        <div style={{ 
          color: '#666666', 
          fontSize: '11px' 
        }}>
          par jour
        </div>
      </td>

      {/* Assurance */}
      <td style={{ padding: '12px' }}>
        <div style={{ 
          color: getStatusColor(daysUntilAssurance), 
          fontSize: '12px',
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
        <div style={{ 
          color: '#666666', 
          fontSize: '11px' 
        }}>
          Jusqu'au: {formatDate(vehicle.assuranceEndDate)}
        </div>
      </td>

      {/* Damages */}
      <td style={{ padding: '12px' }}>
        <div style={{ 
          color: vehicle.dommages && vehicle.dommages.length > 0 ? '#F44336' : '#4CAF50', 
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {vehicle.dommages && vehicle.dommages.length > 0 
            ? `${vehicle.dommages.length} dommage(s)` 
            : 'Aucun'}
        </div>
      </td>

      {/* Status */}
      <td style={{ padding: '12px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: vehicle.available ? '#4CAF50' : '#F44336'
          }} />
          <span style={{ 
            color: vehicle.available ? '#4CAF50' : '#F44336',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {vehicle.available ? 'Disponible' : 'Indisponible'}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td style={{ padding: '12px' }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          opacity: showActions ? 1 : 0.9,
          transition: 'opacity 0.2s ease'
        }}>
          <button
            onClick={() => onEdit(vehicle)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#2196F3',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            Modifier
          </button>
          <button
            onClick={handleToggleAvailability}
            style={{
              padding: '6px 12px',
              backgroundColor: vehicle.available ? '#FF9800' : '#4CAF50',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.backgroundColor = vehicle.available ? '#F57C00' : '#388E3C'}
            onMouseLeave={(e) => e.target.backgroundColor = vehicle.available ? '#FF9800' : '#4CAF50'}
          >
            {vehicle.available ? 'Désactiver' : 'Activer'}
          </button>
          <button
            onClick={handleDelete}
            style={{
              padding: '6px 12px',
              backgroundColor: '#F44336',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#D32F2F'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#F44336'}
          >
            Supprimer
          </button>
        </div>
      </td>
    </tr>
  );
};

const VehiclesList = ({ vehicles, onEdit, onDelete, onToggleAvailability }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!vehicles || vehicles.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '40px 20px',
        color: '#666666',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E0E0E0'
      }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="1.5" style={{ marginBottom: '20px' }}>
          <path d="M9 9h6v6h6V9m0 6v6h6V9" />
        </svg>
        <h2 style={{ 
          fontSize: '24px',
          fontWeight: '600',
          margin: '0 0 10px 0',
          color: '#333333'
        }}>
          Aucun véhicule trouvé
        </h2>
        <p style={{ 
          fontSize: '16px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          Ajoutez votre premier véhicule pour commencer
        </p>
      </div>
    );
  }

  // Filter vehicles based on search and filter
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.nombreCles.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'available') return vehicle.available && matchesSearch;
    if (filter === 'unavailable') return !vehicle.available && matchesSearch;
    
    return matchesSearch;
  });

  const availableVehicles = vehicles.filter(v => v.available);
  const unavailableVehicles = vehicles.filter(v => !v.available);

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#333333'
    }}>
      {/* Header with Stats and Search - COMPACT VERSION */}
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
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#333333',
              whiteSpace: 'nowrap'
            }}>
              Liste des Véhicules
            </h2>
            <span style={{
              fontSize: '14px',
              color: '#666666'
            }}>
              ({filteredVehicles.length} sur {vehicles.length})
            </span>
          </div>
          
          <div style={{
            flex: 1,
            maxWidth: '300px'
          }}>
            <div style={{
              position: 'relative'
            }}>
              <input
                type="text"
                placeholder="Rechercher un véhicule..."
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666666" style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Stats Row - Compact */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#2196F3',
              borderRadius: '2px'
            }} />
            <span style={{
              fontSize: '12px',
              color: '#333333',
              fontWeight: '500'
            }}>
              Total: <strong style={{ fontSize: '14px' }}>{vehicles.length}</strong>
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#4CAF50',
              borderRadius: '2px'
            }} />
            <span style={{
              fontSize: '12px',
              color: '#333333',
              fontWeight: '500'
            }}>
              Disponibles: <strong style={{ fontSize: '14px' }}>{availableVehicles.length}</strong>
            </span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#F44336',
              borderRadius: '2px'
            }} />
            <span style={{
              fontSize: '12px',
              color: '#333333',
              fontWeight: '500'
            }}>
              Indisponibles: <strong style={{ fontSize: '14px' }}>{unavailableVehicles.length}</strong>
            </span>
          </div>
        </div>

        {/* Filter Tabs - Compact */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'all' ? '#2196F3' : '#F5F5F5',
              color: filter === 'all' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Tous ({vehicles.length})
          </button>
          <button
            onClick={() => setFilter('available')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'available' ? '#4CAF50' : '#F5F5F5',
              color: filter === 'available' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Disponibles ({availableVehicles.length})
          </button>
          <button
            onClick={() => setFilter('unavailable')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'unavailable' ? '#F44336' : '#F5F5F5',
              color: filter === 'unavailable' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Indisponibles ({unavailableVehicles.length})
          </button>
        </div>
      </div>

      {/* Vehicles Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid #E0E0E0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F8F9FA'
        }}>
          <div style={{
            color: '#333333',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {filteredVehicles.length} véhicule(s) trouvé(s)
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '900px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: '#F5F5F5',
                borderBottom: '2px solid #E0E0E0'
              }}>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Image
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Véhicule
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Spécifications
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Prix
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Assurance
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Dommages
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Statut
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map(vehicle => (
                <VehicleRow
                  key={vehicle._id}
                  vehicle={vehicle}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggleAvailability={onToggleAvailability}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredVehicles.length === 0 && (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#666666',
            backgroundColor: '#FAFAFA'
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" strokeWidth="1.5" style={{ marginBottom: '16px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>
              Aucun véhicule ne correspond à votre recherche
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              Essayez de modifier vos critères de recherche
            </div>
          </div>
        )}

        {filteredVehicles.length > 0 && (
          <div style={{
            padding: '15px 20px',
            borderTop: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#666666',
            fontSize: '14px',
            backgroundColor: '#F8F9FA'
          }}>
            <div>
              Affichage de 1 à {filteredVehicles.length} sur {vehicles.length} véhicules
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
              >
                ← Précédent
              </button>
              <span style={{ color: '#333333' }}>Page 1 sur 1</span>
              <button
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
              >
                Suivant →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ 
          color: '#333333', 
          fontSize: '14px',
          marginBottom: '10px',
          fontWeight: '600'
        }}>
          Légende:
        </div>
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Assurance valide (&gt;30 jours)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#FFB300',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Assurance expire bientôt (8-30 jours)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#FF9800',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Assurance expire très bientôt (1-7 jours)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#F44336',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Assurance expirée</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesList;