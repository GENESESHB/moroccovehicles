import React, { useState, useRef, useEffect } from 'react';
import {
  FaCar,
  FaUser,
  FaCalendarAlt,
  FaPrint,
  FaEdit,
  FaTrashAlt,
  FaEllipsisV,
  FaFilePdf,
  FaDownload,
  FaTimes,
  FaCheckCircle,
  FaClock,
  FaBan,
  FaEye,
  FaIdCard
} from 'react-icons/fa';

const SmartContraList = ({
  smartContracts,
  loading,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  filteredContracts,
  handleEdit,
  handleDelete,
  handlePrint,
  handleDownload,
  handleStatusUpdate,
  getStatusColor,
  formatDate,
  calculateDays,
  setMessage,
  setShowForm,
  carPartsData,
  generateCarSVG,
  user
}) => {
  const [showActionMenu, setShowActionMenu] = useState({});
  const [localShowActions, setLocalShowActions] = useState({});
  const [menuPosition, setMenuPosition] = useState({});
  const menuRefs = useRef({});

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(showActionMenu).forEach(contractId => {
        if (showActionMenu[contractId] && 
            menuRefs.current[contractId] && 
            !menuRefs.current[contractId].contains(event.target) &&
            !event.target.closest(`[data-contract-id="${contractId}"]`)) {
          setShowActionMenu(prev => ({ ...prev, [contractId]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showActionMenu]);

  const handleMenuClick = (contractId, event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate position for dropdown
    setMenuPosition(prev => ({
      ...prev,
      [contractId]: {
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        right: window.innerWidth - rect.right
      }
    }));
    
    // Toggle menu
    setShowActionMenu(prev => ({
      ...prev,
      [contractId]: !prev[contractId]
    }));
  };

  // Contract Row Component
  const ContractRow = ({ contract }) => {
    const days = calculateDays(contract.startDate, contract.endDate);
    
    // Correct variable names matching SmartContraPrintTemplate.js
    const clientData = contract.clientSnapshot || {};
    const vehicleData = contract.vehicleSnapshot || {};
    const conducteur = contract.conducteur || {};

    return (
      <tr 
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={() => setLocalShowActions(prev => ({ ...prev, [contract._id]: true }))}
        onMouseLeave={() => {
          setLocalShowActions(prev => ({ ...prev, [contract._id]: false }));
          // Don't close menu on row leave if it's open
        }}
      >
        <td style={{ padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FCD535',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <FaCar style={{ color: '#000', fontSize: '14px' }} />
            </div>
            <div>
              <div style={{ color: '#333333', fontWeight: '600', fontSize: '14px', marginBottom: '2px' }}>
                {contract.contractNumber || `#${contract._id?.slice(-6)}`}
              </div>
              <div style={{ color: '#666666', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <FaCar style={{ width: '10px', height: '10px' }} />
                Contrat Intelligent
              </div>
            </div>
          </div>
        </td>

        <td style={{ padding: '12px' }}>
          <div style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '4px' }}>
              <strong>{clientData.firstName} {clientData.lastName}</strong>
            </div>
            <div style={{ color: '#666666', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaIdCard style={{ width: '10px', height: '10px' }} />
              {clientData.cin || clientData.passport || 'ID non spécifié'}
            </div>
            {conducteur.nom && (
              <div style={{ color: '#888888', fontSize: '10px', marginTop: '4px', fontStyle: 'italic' }}>
                + Conducteur: {conducteur.prenom} {conducteur.nom}
              </div>
            )}
          </div>
        </td>

        <td style={{ padding: '12px' }}>
          <div style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '4px' }}>
              <strong>{vehicleData.nomVehicule || vehicleData.name}</strong>
            </div>
            <div style={{ color: '#666666', fontSize: '11px' }}>
              {vehicleData.numeroMatricule || vehicleData.matricule}
            </div>
          </div>
        </td>

        <td style={{ padding: '12px' }}>
          <div style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <FaCalendarAlt style={{ width: '12px', height: '12px', color: '#2196F3' }} />
              <span>{formatDate(contract.startDate)}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#666666' }}>
              {days} jour(s)
            </div>
          </div>
        </td>

        <td style={{ padding: '12px' }}>
          <div style={{ color: '#333333', fontSize: '12px', lineHeight: '1.4' }}>
            <div style={{ marginBottom: '4px', fontWeight: '600' }}>
               MAD {contract.prixTotal || 0}
            </div>
            <div style={{ color: '#666666', fontSize: '11px' }}>
              {contract.methodPaiement}
            </div>
          </div>
        </td>

        <td style={{ padding: '12px' }}>
          <div style={{
            padding: '4px 8px',
            backgroundColor: `${getStatusColor(contract.status)}20`,
            color: getStatusColor(contract.status),
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'inline-block',
            border: `1px solid ${getStatusColor(contract.status)}`
          }}>
            {contract.status}
          </div>
        </td>

        <td style={{ padding: '12px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            opacity: localShowActions[contract._id] || showActionMenu[contract._id] ? 1 : 0.9,
            transition: 'opacity 0.2s ease',
            alignItems: 'center'
          }}>
            <button
              onClick={() => handlePrint(contract)}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#2196F3',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1
              }}
              title="Imprimer"
            >
              <FaPrint style={{ width: '14px', height: '14px' }} />
            </button>

            <button
              onClick={() => handleEdit(contract)}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#FF9800',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                zIndex: 1
              }}
              title="Modifier"
            >
              <FaEdit style={{ width: '14px', height: '14px' }} />
            </button>

            <div style={{ position: 'relative' }}>
              <button
                data-contract-id={contract._id}
                onClick={(e) => handleMenuClick(contract._id, e)}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#F5F5F5',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  zIndex: 100,
                  position: 'relative'
                }}
                title="Plus d'actions"
              >
                <FaEllipsisV style={{ width: '14px', height: '14px' }} />
              </button>

              {showActionMenu[contract._id] && (
                <div 
                  ref={el => menuRefs.current[contract._id] = el}
                  style={{
                    position: 'fixed',
                    top: `${menuPosition[contract._id]?.top || 0}px`,
                    left: `${(menuPosition[contract._id]?.right || 0) < 200 ? 
                           (menuPosition[contract._id]?.left || 0) : 
                           (menuPosition[contract._id]?.left || 0) - 180}px`,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '6px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    zIndex: 9999,
                    minWidth: '180px',
                    maxWidth: '200px',
                    marginTop: '4px'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    onClick={() => {
                      setShowActionMenu(prev => ({ ...prev, [contract._id]: false }));
                      handleEdit(contract);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: 'none',
                      borderBottom: '1px solid #E0E0E0',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                  >
                    <FaEdit style={{ width: '12px', height: '12px' }} /> Modifier
                  </button>
                  <button 
                    onClick={() => {
                      setShowActionMenu(prev => ({ ...prev, [contract._id]: false }));
                      handlePrint(contract);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: 'none',
                      borderBottom: '1px solid #E0E0E0',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                  >
                    <FaPrint style={{ width: '12px', height: '12px' }} /> Imprimer
                  </button>
                  <button 
                    onClick={() => {
                      setShowActionMenu(prev => ({ ...prev, [contract._id]: false }));
                      handleDownload(contract);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: 'none',
                      borderBottom: '1px solid #E0E0E0',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                  >
                    <FaFilePdf style={{ width: '12px', height: '12px' }} /> PDF
                  </button>
                  <button 
                    onClick={() => {
                      setShowActionMenu(prev => ({ ...prev, [contract._id]: false }));
                      // View details - you can implement this function
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: 'none',
                      borderBottom: '1px solid #E0E0E0',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                  >
                    <FaEye style={{ width: '12px', height: '12px' }} /> Voir détails
                  </button>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid #E0E0E0' }}>
                    <div style={{ fontSize: '10px', color: '#666666', fontWeight: '600', marginBottom: '4px' }}>
                      Changer statut:
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {['pending', 'active', 'completed', 'cancelled'].map(status => (
                        <button
                          key={status}
                          onClick={() => {
                            setShowActionMenu(prev => ({ ...prev, [contract._id]: false }));
                            handleStatusUpdate(contract._id, status);
                          }}
                          style={{
                            padding: '4px 8px',
                            backgroundColor: contract.status === status ? getStatusColor(status) : '#FFFFFF',
                            color: contract.status === status ? '#FFF' : getStatusColor(status),
                            border: `1px solid ${getStatusColor(status)}`,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '10px',
                            fontWeight: '500'
                          }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowActionMenu(prev => ({ ...prev, [contract._id]: false }));
                      handleDelete(contract._id);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 16px',
                      backgroundColor: '#FFFFFF',
                      color: '#F44336',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '12px',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
                  >
                    <FaTrashAlt style={{ width: '12px', height: '12px' }} /> Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid #E0E0E0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      position: 'relative'
    }}>
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #E0E0E0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F8F9FA'
      }}>
        <div style={{ color: '#333333', fontSize: '14px', fontWeight: '500' }}>
          {filteredContracts.length} contrat(s) trouvé(s)
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666666' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <div style={{
              width: '20px',
              height: '20px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #2196F3',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <span>Chargement...</span>
          </div>
        </div>
      ) : (
        <>
          <div style={{ 
            overflowX: 'auto',
            position: 'relative'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse', 
              minWidth: '900px',
              position: 'relative'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '2px solid #E0E0E0' }}>
                  {['Contrat', 'Client', 'Véhicule', 'Période', 'Montant', 'Statut', 'Actions'].map((header, idx) => (
                    <th key={idx} style={{
                      padding: '12px',
                      textAlign: 'left',
                      color: '#333333',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      position: 'relative'
                    }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredContracts.map(contract => (
                  <ContractRow key={contract._id} contract={contract} />
                ))}
              </tbody>
            </table>
          </div>

          {filteredContracts.length === 0 && (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              color: '#666666',
              backgroundColor: '#FAFAFA'
            }}>
              <FaCar style={{ width: '48px', height: '48px', color: '#9E9E9E', marginBottom: '16px' }} />
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>
                Aucun contrat trouvé
              </div>
              <button
                onClick={() => setShowForm(true)}
                style={{
                  marginTop: '16px',
                  padding: '6px 12px',
                  backgroundColor: '#2196F3',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                <FaCar style={{ width: '10px', height: '10px' }} /> Nouveau Contrat
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Add CSS for spinner animation */}
      <style jsx="true">{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SmartContraList;