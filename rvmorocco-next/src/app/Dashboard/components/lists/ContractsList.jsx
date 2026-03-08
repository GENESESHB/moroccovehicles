import React, { useState, useEffect, useRef } from 'react';
import { 
  FaPencilAlt, 
  FaFileDownload, 
  FaTrashAlt, 
  FaCar, 
  FaPhone, 
  FaIdCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaEllipsisV,
  FaUser,
  FaCarSide,
  FaEye
} from 'react-icons/fa';

const ContractRow = ({ contract, vehicles, onEdit, onDelete, onDownload, onUpdateStatus, isLastRow }) => {
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [contractStatus, setContractStatus] = useState(contract.status || 'pending');
  const [showActions, setShowActions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const buttonRef = useRef(null);

  // Helper functions to handle both old and new data structures
  const getClientInfo = () => {
    if (contract.clientInfo) {
      return {
        name: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
        phone: contract.clientInfo.phone,
        cin: contract.clientInfo.cin,
        passport: contract.clientInfo.passport
      };
    }
    return {
      name: contract.clientName || 'Client non spécifié',
      phone: contract.clientPhone || 'Non spécifié',
      cin: contract.clientCIN || 'Non spécifié',
      passport: contract.clientPassport || 'Non spécifié'
    };
  };

  const getVehicleInfo = () => {
    if (contract.vehicleInfo) {
      return contract.vehicleInfo;
    }
    return vehicles.find(v => v._id === contract.vehicleId) || {};
  };

  const getRentalInfo = () => {
    if (contract.rentalInfo) {
      return {
        startDate: contract.rentalInfo.startDateTime,
        endDate: contract.rentalInfo.endDateTime,
        prixTotal: contract.rentalInfo.prixTotal,
        prixParJour: contract.rentalInfo.prixParJour,
        rentalDays: contract.rentalInfo.rentalDays,
        startLocation: contract.rentalInfo.startLocation,
        endLocation: contract.rentalInfo.endLocation
      };
    }
    return {
      startDate: contract.startDateTime || contract.startDate,
      endDate: contract.endDateTime || contract.endDate,
      prixTotal: contract.prixTotal || contract.totalPrice || 0,
      prixParJour: contract.prixParJour || 0,
      rentalDays: contract.rentalDays || contract.durationDays || 1,
      startLocation: contract.startLocation || 'Non spécifié',
      endLocation: contract.endLocation || 'Non spécifié'
    };
  };

  // Calculate days remaining and update status
  useEffect(() => {
    const calculateStatus = () => {
      const now = new Date();
      const rentalInfo = getRentalInfo();
      const startDate = new Date(rentalInfo.startDate);
      const endDate = new Date(rentalInfo.endDate);

      const diffTime = endDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysRemaining(diffDays);

      if (!contract.status) {
        if (now < startDate) {
          setContractStatus('pending');
        } else if (now > endDate) {
          setContractStatus('completed');
        } else {
          setContractStatus('active');
        }
      }
    };

    calculateStatus();
    const interval = setInterval(calculateStatus, 3600000);
    return () => clearInterval(interval);
  }, [contract]);

  const getStatusColor = () => {
    switch (contractStatus) {
      case 'pending': return '#FF9800';
      case 'active': return '#4CAF50';
      case 'completed': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = () => {
    switch (contractStatus) {
      case 'pending': return 'En attente';
      case 'active': return 'Actif';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return contract.status || 'Inconnu';
    }
  };

  const handleDelete = () => {
    const clientInfo = getClientInfo();
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le contrat de ${clientInfo.name} ?`)) {
      onDelete(contract._id);
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(contract._id, newStatus);
    setContractStatus(newStatus);
    setShowStatusOptions(false);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const toggleDropdown = () => {
    if (!showStatusOptions && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const dropdownHeight = 120; // Approximate height of dropdown
      
      // If not enough space below, show above
      if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
        setDropdownPosition('top');
      } else {
        setDropdownPosition('bottom');
      }
    }
    setShowStatusOptions(!showStatusOptions);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const clientInfo = getClientInfo();
  const vehicleInfo = getVehicleInfo();
  const rentalInfo = getRentalInfo();

  const startDate = new Date(rentalInfo.startDate);
  const endDate = new Date(rentalInfo.endDate);

  return (
    <tr 
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        transition: 'all 0.2s ease',
        position: 'relative'
      }}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowStatusOptions(false);
      }}
    >
      {/* Vehicle Info avec image */}
      <td style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '60px',
            height: '40px',
            borderRadius: '6px',
            overflow: 'hidden',
            backgroundColor: '#F5F5F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #E0E0E0',
            flexShrink: 0
          }}>
            {imageError ? (
              <div style={{
                color: '#9E9E9E',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                <FaCarSide />
              </div>
            ) : vehicleInfo.image ? (
              <img
                src={vehicleInfo.image}
                alt={vehicleInfo.name}
                onError={handleImageError}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div style={{
                color: '#9E9E9E',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                <FaCarSide />
              </div>
            )}
          </div>
          
          <div>
            <div style={{ 
              color: '#333333', 
              fontWeight: '600',
              fontSize: '14px',
              marginBottom: '4px'
            }}>
              {vehicleInfo.name || 'Véhicule non spécifié'}
            </div>
            <div style={{ 
              color: '#666666', 
              fontSize: '12px' 
            }}>
              {vehicleInfo.brand || ''} {vehicleInfo.model || ''} {vehicleInfo.year ? `• ${vehicleInfo.year}` : ''}
            </div>
          </div>
        </div>
      </td>

      {/* Client Info */}
      <td style={{ padding: '12px' }}>
        <div>
          <div style={{ 
            color: '#333333', 
            fontWeight: '600',
            fontSize: '14px',
            marginBottom: '6px'
          }}>
            {clientInfo.name}
          </div>
          <div style={{ 
            color: '#666666', 
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
              <FaPhone style={{ width: '12px', height: '12px', color: '#666666' }} /> 
              <span>{clientInfo.phone}</span>
            </div>
            {clientInfo.cin && clientInfo.cin !== 'Non spécifié' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FaIdCard style={{ width: '12px', height: '12px', color: '#666666' }} /> 
                <span>{clientInfo.cin}</span>
              </div>
            )}
          </div>
        </div>
      </td>

      {/* Rental Period */}
      <td style={{ padding: '12px' }}>
        <div style={{ 
          color: '#333333', 
          fontSize: '12px',
          lineHeight: '1.4',
          marginBottom: '6px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
            <FaCalendarAlt style={{ width: '12px', height: '12px', color: '#666666' }} /> 
            <span>{formatDate(rentalInfo.startDate)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
            <FaCalendarAlt style={{ width: '12px', height: '12px', color: '#666666' }} /> 
            <span>{formatDate(rentalInfo.endDate)}</span>
          </div>
          <div style={{ 
            color: '#2196F3', 
            fontSize: '12px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <FaClock style={{ width: '12px', height: '12px' }} />
            <span>{rentalInfo.rentalDays} jour{rentalInfo.rentalDays !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </td>

      {/* Locations */}
      <td style={{ padding: '12px' }}>
        <div style={{ 
          color: '#333333', 
          fontSize: '12px',
          lineHeight: '1.4'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <FaMapMarkerAlt style={{ width: '12px', height: '12px', color: '#4CAF50', flexShrink: 0 }} />
            <span>{rentalInfo.startLocation}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FaMapMarkerAlt style={{ width: '12px', height: '12px', color: '#F44336', flexShrink: 0 }} />
            <span>{rentalInfo.endLocation}</span>
          </div>
        </div>
      </td>

      {/* Price */}
      <td style={{ padding: '12px' }}>
        <div>
          <div style={{ 
            color: '#2196F3', 
            fontWeight: '600',
            fontSize: '16px',
            marginBottom: '4px'
          }}>
            {rentalInfo.prixTotal.toLocaleString()} MAD
          </div>
          <div style={{ 
            color: '#666666', 
            fontSize: '12px' 
          }}>
            {rentalInfo.prixParJour.toLocaleString()} MAD/jour
          </div>
        </div>
      </td>

      {/* Status */}
      <td style={{ padding: '12px' }}>
        <div>
          <div style={{ 
            color: getStatusColor(), 
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '4px'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getStatusColor()
            }} />
            {getStatusText()}
          </div>
          {daysRemaining !== null && contractStatus === 'active' && (
            <div style={{ 
              color: getStatusColor(), 
              fontSize: '11px',
              opacity: 0.8
            }}>
              ({daysRemaining > 0 ? '+' : ''}{daysRemaining}j)
            </div>
          )}
        </div>
      </td>

      {/* Actions */}
      <td style={{ padding: '12px', position: 'relative' }}>
        <div style={{
          display: 'flex',
          gap: '6px',
          opacity: showActions ? 1 : 0.9,
          transition: 'opacity 0.2s ease',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => onEdit(contract)}
            style={{
              padding: '6px 10px',
              backgroundColor: '#2196F3',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              minWidth: '80px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            <FaPencilAlt style={{ width: '10px', height: '10px' }} /> Modifier
          </button>
          
          <div style={{ position: 'relative' }}>
            <button
              ref={buttonRef}
              onClick={toggleDropdown}
              style={{
                padding: '6px 10px',
                backgroundColor: '#FFFFFF',
                color: '#333333',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                minWidth: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
            >
              <FaEllipsisV />
            </button>
            
            {showStatusOptions && (
              <div style={{
                position: 'fixed',
                ...(dropdownPosition === 'bottom' ? {
                  top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 4 : 0,
                } : {
                  bottom: window.innerHeight - (buttonRef.current ? buttonRef.current.getBoundingClientRect().top : 0) + 4,
                }),
                right: window.innerWidth - (buttonRef.current ? buttonRef.current.getBoundingClientRect().right : 0),
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 99999,
                minWidth: '180px',
                overflow: 'hidden'
              }}>
                <button 
                  onClick={() => handleStatusChange('active')}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#FFFFFF',
                    color: '#333333',
                    border: 'none',
                    borderBottom: '1px solid #E0E0E0',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                >
                  Marquer comme actif
                </button>
                <button 
                  onClick={() => handleStatusChange('completed')}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#FFFFFF',
                    color: '#333333',
                    border: 'none',
                    borderBottom: '1px solid #E0E0E0',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                >
                  Marquer comme terminé
                </button>
                <button 
                  onClick={() => handleStatusChange('cancelled')}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    backgroundColor: '#FFFFFF',
                    color: '#F44336',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '12px',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                >
                  Annuler le contrat
                </button>
              </div>
            )}
          </div>
          
          <button
            onClick={() => onDownload(contract)}
            style={{
              padding: '6px 10px',
              backgroundColor: '#4CAF50',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              minWidth: '60px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#388E3C'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            <FaFileDownload style={{ width: '10px', height: '10px' }} /> PDF
          </button>
          
          {contractStatus !== 'active' && contractStatus !== 'completed' && (
            <button
              onClick={handleDelete}
              style={{
                padding: '6px 10px',
                backgroundColor: '#F44336',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                minWidth: '60px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#D32F2F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#F44336'}
            >
              <FaTrashAlt style={{ width: '10px', height: '10px' }} /> Supp.
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const ContractsList = ({ contracts, vehicles, onEdit, onDelete, onDownload, onUpdateStatus }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  if (!contracts || contracts.length === 0) {
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
          Aucun contrat trouvé
        </h2>
        <p style={{ 
          fontSize: '16px',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          Créez votre premier contrat pour commencer
        </p>
      </div>
    );
  }

  // Helper function to get contract status based on dates and status field with new structure
  const getContractStatus = (contract) => {
    // If contract has explicit status, use it
    if (contract.status) {
      return contract.status;
    }

    // Use new nested structure for dates
    const now = new Date();
    const startDateTime = contract.rentalInfo ? new Date(contract.rentalInfo.startDateTime) : new Date(contract.startDateTime);
    const endDateTime = contract.rentalInfo ? new Date(contract.rentalInfo.endDateTime) : new Date(contract.endDateTime);

    if (now < startDateTime) {
      return 'pending';
    } else if (now >= startDateTime && now <= endDateTime) {
      return 'active';
    } else if (now > endDateTime) {
      return 'completed';
    }

    return 'pending'; // default
  };

  // Filter contracts based on search and filter
  const filteredContracts = contracts.filter(contract => {
    const clientInfo = contract.clientInfo ? 
      `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}` : 
      contract.clientName || '';
    const vehicleInfo = contract.vehicleInfo ? contract.vehicleInfo.name : '';
    
    const matchesSearch = 
      clientInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contract.clientInfo?.phone || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return getContractStatus(contract) === 'pending' && matchesSearch;
    if (filter === 'active') return getContractStatus(contract) === 'active' && matchesSearch;
    if (filter === 'completed') return getContractStatus(contract) === 'completed' && matchesSearch;
    if (filter === 'cancelled') return getContractStatus(contract) === 'cancelled' && matchesSearch;
    
    return matchesSearch;
  });

  const pendingContracts = contracts.filter(c => getContractStatus(c) === 'pending');
  const activeContracts = contracts.filter(c => getContractStatus(c) === 'active');
  const completedContracts = contracts.filter(c => getContractStatus(c) === 'completed');
  const cancelledContracts = contracts.filter(c => getContractStatus(c) === 'cancelled');

  // Calculate statistics
  const totalContracts = contracts.length;
  const totalRevenue = contracts.reduce((sum, contract) => {
    const total = contract.rentalInfo?.prixTotal || contract.prixTotal || 0;
    return sum + total;
  }, 0);
  const upcomingReturns = activeContracts.filter(contract => {
    const endDate = contract.rentalInfo ? new Date(contract.rentalInfo.endDateTime) : new Date(contract.endDateTime);
    const now = new Date();
    const diffTime = endDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3;
  });

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
              Liste des Contrats
            </h2>
            <span style={{
              fontSize: '14px',
              color: '#666666'
            }}>
              ({filteredContracts.length} sur {contracts.length})
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
              Total: <strong style={{ fontSize: '14px' }}>{totalContracts}</strong>
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
              CA Total: <strong style={{ fontSize: '14px' }}>{totalRevenue.toLocaleString()} MAD</strong>
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
              backgroundColor: '#FF9800',
              borderRadius: '2px'
            }} />
            <span style={{
              fontSize: '12px',
              color: '#333333',
              fontWeight: '500'
            }}>
              Actifs: <strong style={{ fontSize: '14px' }}>{activeContracts.length}</strong>
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
              Retours sous 3j: <strong style={{ fontSize: '14px' }}>{upcomingReturns.length}</strong>
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
            Tous ({contracts.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'pending' ? '#FF9800' : '#F5F5F5',
              color: filter === 'pending' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            En attente ({pendingContracts.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'active' ? '#4CAF50' : '#F5F5F5',
              color: filter === 'active' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Actifs ({activeContracts.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'completed' ? '#9E9E9E' : '#F5F5F5',
              color: filter === 'completed' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Terminés ({completedContracts.length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            style={{
              padding: '6px 12px',
              backgroundColor: filter === 'cancelled' ? '#F44336' : '#F5F5F5',
              color: filter === 'cancelled' ? '#FFFFFF' : '#666666',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            Annulés ({cancelledContracts.length})
          </button>
        </div>
      </div>

      {/* Contracts Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'visible',
        border: '1px solid #E0E0E0',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        zIndex: 1
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
            {filteredContracts.length} contrat(s) trouvé(s)
          </div>
        </div>

        <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            minWidth: '1100px'
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
                  letterSpacing: '0.5px',
                  width: '15%'
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
                  letterSpacing: '0.5px',
                  width: '15%'
                }}>
                  Client
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  width: '15%'
                }}>
                  Période
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  width: '15%'
                }}>
                  Lieux
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  width: '12%'
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
                  letterSpacing: '0.5px',
                  width: '13%'
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
                  letterSpacing: '0.5px',
                  width: '15%'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract, index) => (
                <ContractRow
                  key={contract._id}
                  contract={contract}
                  vehicles={vehicles}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onDownload={onDownload}
                  onUpdateStatus={onUpdateStatus}
                  isLastRow={index === filteredContracts.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredContracts.length === 0 && (
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
              Aucun contrat ne correspond à votre recherche
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              Essayez de modifier vos critères de recherche
            </div>
          </div>
        )}

        {filteredContracts.length > 0 && (
          <div style={{
            padding: '15px 20px',
            borderTop: '1px solid #E0E0E0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#666666',
            fontSize: '14px',
            backgroundColor: '#F8F9FA',
            position: 'relative',
            zIndex: 0
          }}>
            <div>
              Affichage de 1 à {filteredContracts.length} sur {contracts.length} contrats
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
          Légende des statuts:
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
              backgroundColor: '#FF9800',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>En attente</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#4CAF50',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Actif (avec jours restants)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#9E9E9E',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Terminé</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#F44336',
              borderRadius: '50%'
            }} />
            <span style={{ color: '#333333', fontSize: '12px' }}>Annulé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractsList;