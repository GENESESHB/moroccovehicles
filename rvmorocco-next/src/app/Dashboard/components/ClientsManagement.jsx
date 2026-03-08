import React, { useState, useRef } from 'react';
import api from '../utils/api';
import { 
  FaUser, 
  FaPhone, 
  FaIdCard, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaIdBadge,
  FaEdit, 
  FaBan, 
  FaTrash, 
  FaPlus, 
  FaTimes, 
  FaLock, 
  FaExclamationTriangle,
  FaUserAlt,
  FaSearch,
  FaEllipsisV,
  FaSave,
  FaCheck,
  FaTimesCircle,
  FaClipboardList
} from 'react-icons/fa';

const ClientsManagement = ({ user, clients, setClients, setMessage, loadClients, blacklist }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    birthDate: '',
    phone: '',
    address: '',
    passport: '',
    cin: '',
    licenseNumber: '',
    licenseIssueDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActions, setShowActions] = useState({});

  // New states for blacklist functionality
  const [showBlacklistForm, setShowBlacklistForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [blacklistReason, setBlacklistReason] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Check if client is in blacklist using existing blacklist array
  const checkBlacklist = (clientData) => {
    if (!blacklist || blacklist.length === 0) {
      return false;
    }

    const { cin, passport, licenseNumber } = clientData;
    
    // Check if any identifier matches blacklist
    const isBlacklisted = blacklist.some(blacklisted => {
      return (
        (cin && blacklisted.cin === cin) ||
        (passport && blacklisted.passport === passport) ||
        (licenseNumber && blacklisted.licenseNumber === licenseNumber)
      );
    });

    return isBlacklisted;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // CHECK BLACKLIST BEFORE ADDING NEW CLIENT
      if (!editingClient) {
        const isBlacklisted = checkBlacklist(formData);
        
        if (isBlacklisted) {
          setMessage('❌ Ce client est dans la liste noire et ne peut pas être ajouté');
          setLoading(false);
          return;
        }
      }

      if (editingClient) {
        // Update client
        const res = await api.put(`/clients/${editingClient._id}`, formData);
        setMessage('✅ Client modifié avec succès');
      } else {
        // Create new client
        const res = await api.post('/clients', formData);
        setMessage('✅ Client ajouté avec succès');
      }

      setShowForm(false);
      setEditingClient(null);
      setFormData({
        lastName: '',
        firstName: '',
        birthDate: '',
        phone: '',
        address: '',
        passport: '',
        cin: '',
        licenseNumber: '',
        licenseIssueDate: ''
      });
      loadClients();
    } catch (err) {
      console.error('❌ Erreur:', err);
      
      // Handle specific error cases
      if (err.response?.status === 409) {
        setMessage('❌ Ce client existe déjà dans le système');
      } else if (err.response?.data?.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else {
        setMessage('❌ Erreur lors de la sauvegarde du client');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      lastName: client.lastName || '',
      firstName: client.firstName || '',
      birthDate: client.birthDate ? client.birthDate.split('T')[0] : '',
      phone: client.phone || '',
      address: client.address || '',
      passport: client.passport || '',
      cin: client.cin || '',
      licenseNumber: client.licenseNumber || '',
      licenseIssueDate: client.licenseIssueDate ? client.licenseIssueDate.split('T')[0] : ''
    });
    setShowForm(true);
  };

  const handleDelete = async (clientId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      try {
        await api.delete(`/clients/${clientId}`);
        setMessage('✅ Client supprimé avec succès');
        loadClients();
      } catch (err) {
        console.error('❌ Erreur:', err);
        setMessage('❌ Erreur lors de la suppression du client');
      }
    }
  };

  // Open blacklist form with client information
  const handleOpenBlacklistForm = (client) => {
    setSelectedClient(client);
    setBlacklistReason('');
    setShowBlacklistForm(true);
  };

  // Submit blacklist with custom reason - UPDATED TO REMOVE CLIENT AUTOMATICALLY
  const handleBlacklistSubmit = async (e) => {
    e.preventDefault();

    if (!blacklistReason.trim()) {
      setMessage('❌ Veuillez saisir une raison pour la liste noire');
      return;
    }

    // Check if client has at least one identifier
    if (!selectedClient.cin && !selectedClient.passport && !selectedClient.licenseNumber) {
      setMessage('❌ Le client doit avoir au moins un CIN, Passeport ou Numéro de permis');
      return;
    }

    try {
      // Add to blacklist
      await api.post('/blacklist', {
        cin: selectedClient.cin || undefined,
        passport: selectedClient.passport || undefined,
        licenseNumber: selectedClient.licenseNumber || undefined,
        reason: blacklistReason
      });

      // AUTOMATICALLY REMOVE CLIENT FROM CLIENTS LIST
      await api.delete(`/clients/${selectedClient._id}`);
      
      setMessage('✅ Client ajouté à la liste noire et supprimé de la liste des clients avec succès');
      setShowBlacklistForm(false);
      setSelectedClient(null);
      setBlacklistReason('');
      
      // Refresh clients list to reflect removal
      loadClients();
    } catch (err) {
      console.error('❌ Erreur:', err);
      if (err.response?.data?.message) {
        setMessage(`❌ ${err.response.data.message}`);
      } else if (err.response?.data?.error) {
        setMessage(`❌ ${err.response.data.error}`);
      } else {
        setMessage('❌ Erreur lors de l\'ajout à la liste noire ou de la suppression du client');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const ClientRow = ({ client, isLastRow }) => {
    const [localShowActions, setLocalShowActions] = useState(false);
    const [showActionMenu, setShowActionMenu] = useState(false);
    const [dropdownPosition, setDropdownPosition] = useState('bottom');
    const buttonRef = useRef(null);

    const toggleDropdown = () => {
      if (!showActionMenu && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;
        const dropdownHeight = 150; // Approximate height of dropdown
        
        // If not enough space below, show above
        if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
          setDropdownPosition('top');
        } else {
          setDropdownPosition('bottom');
        }
      }
      setShowActionMenu(!showActionMenu);
    };

    return (
      <tr 
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={() => setLocalShowActions(true)}
        onMouseLeave={() => {
          setLocalShowActions(false);
          setShowActionMenu(false);
        }}
      >
        {/* Client Avatar and Name */}
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
              <span style={{ 
                color: '#000', 
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {(client.lastName?.[0] + client.firstName?.[0])?.toUpperCase() || 'C'}
              </span>
            </div>
            
            <div>
              <div style={{ 
                color: '#333333', 
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '2px'
              }}>
                {client.lastName} {client.firstName}
              </div>
              <div style={{ 
                color: '#666666', 
                fontSize: '12px' 
              }}>
                ID: {client._id.slice(-6)}
              </div>
            </div>
          </div>
        </td>

        {/* Contact Info */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <FaPhone style={{ width: '12px', height: '12px', color: '#4CAF50' }} />
              <span>{client.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FaIdCard style={{ width: '12px', height: '12px', color: '#2196F3' }} />
              <span>{client.cin || 'N/A'}</span>
            </div>
          </div>
        </td>

        {/* Documents */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '4px' }}>
              <span style={{ color: '#666666', fontSize: '11px' }}>Passeport: </span>
              <span style={{ fontWeight: '500' }}>{client.passport || 'N/A'}</span>
            </div>
            <div>
              <span style={{ color: '#666666', fontSize: '11px' }}>Permis: </span>
              <span style={{ fontWeight: '500' }}>{client.licenseNumber || 'N/A'}</span>
            </div>
          </div>
        </td>

        {/* Birth Date */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <FaCalendarAlt style={{ width: '12px', height: '12px', color: '#FF9800' }} />
            <span>{formatDate(client.birthDate)}</span>
          </div>
        </td>

        {/* Address */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <FaMapMarkerAlt style={{ width: '12px', height: '12px', color: '#9C27B0', flexShrink: 0 }} />
            <span style={{ 
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '150px'
            }}>
              {client.address || 'N/A'}
            </span>
          </div>
        </td>

        {/* Actions */}
        <td style={{ padding: '12px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            opacity: localShowActions ? 1 : 0.9,
            transition: 'opacity 0.2s ease',
            alignItems: 'center'
          }}>
            {/* Edit Button */}
            <button
              onClick={() => handleEdit(client)}
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
                transition: 'all 0.2s ease'
              }}
              title="Modifier"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
            >
              <FaEdit style={{ width: '14px', height: '14px' }} />
            </button>

            {/* Blacklist Button */}
            <button
              onClick={() => handleOpenBlacklistForm(client)}
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
                transition: 'all 0.2s ease'
              }}
              title="Ajouter à la liste noire"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F57C00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9800'}
            >
              <FaBan style={{ width: '14px', height: '14px' }} />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(client._id)}
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#F44336',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              title="Supprimer"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#D32F2F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#F44336'}
            >
              <FaTrash style={{ width: '14px', height: '14px' }} />
            </button>

            {/* More Actions Menu */}
            <div style={{ position: 'relative' }}>
              <button
                ref={buttonRef}
                onClick={toggleDropdown}
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
                  transition: 'all 0.2s ease'
                }}
                title="Plus d'actions"
                onMouseEnter={(e) => e.target.style.backgroundColor = '#E0E0E0'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#F5F5F5'}
              >
                <FaEllipsisV style={{ width: '14px', height: '14px' }} />
              </button>

              {showActionMenu && (
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
                  borderRadius: '6px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  zIndex: 99999,
                  minWidth: '180px',
                  overflow: 'hidden'
                }}>
                  <button 
                    onClick={() => {
                      setShowActionMenu(false);
                      handleEdit(client);
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
                      setShowActionMenu(false);
                      handleOpenBlacklistForm(client);
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
                    <FaBan style={{ width: '12px', height: '12px' }} /> Liste noire
                  </button>
                  <button 
                    onClick={() => {
                      setShowActionMenu(false);
                      handleDelete(client._id);
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
                    <FaTrash style={{ width: '12px', height: '12px' }} /> Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>
    );
  };

  // Filter clients based on search
  const filteredClients = clients.filter(client => {
    const fullName = `${client.lastName} ${client.firstName}`.toLowerCase();
    const phone = client.phone?.toLowerCase() || '';
    const cin = client.cin?.toLowerCase() || '';
    const passport = client.passport?.toLowerCase() || '';
    
    return fullName.includes(searchTerm.toLowerCase()) ||
           phone.includes(searchTerm.toLowerCase()) ||
           cin.includes(searchTerm.toLowerCase()) ||
           passport.includes(searchTerm.toLowerCase());
  });

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#333333'
    }}>
      {/* Header with Stats and Search */}
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
              Gestion des Clients
            </h2>
            <span style={{
              fontSize: '14px',
              color: '#666666'
            }}>
              ({filteredClients.length} sur {clients.length})
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
                placeholder="Rechercher un client..."
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
              <FaSearch style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '16px',
                height: '16px',
                color: '#666666'
              }} />
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
              Total: <strong style={{ fontSize: '14px' }}>{clients.length}</strong>
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
              Liste noire: <strong style={{ fontSize: '14px' }}>{blacklist?.length || 0}</strong>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#2196F3',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
          >
            <FaPlus style={{ width: '10px', height: '10px' }} /> Nouveau Client
          </button>
        </div>
      </div>

      {/* Clients Table */}
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
            {filteredClients.length} client(s) trouvé(s)
          </div>
        </div>

        <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
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
                  letterSpacing: '0.5px',
                  width: '20%'
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
                  width: '20%'
                }}>
                  Contact
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  width: '20%'
                }}>
                  Documents
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
                  Naissance
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
                  Adresse
                </th>
                <th style={{
                  padding: '12px',
                  textAlign: 'left',
                  color: '#333333',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  width: '10%'
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client, index) => (
                <ClientRow 
                  key={client._id} 
                  client={client} 
                  isLastRow={index === filteredClients.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredClients.length === 0 && (
          <div style={{
            padding: '40px 20px',
            textAlign: 'center',
            color: '#666666',
            backgroundColor: '#FAFAFA'
          }}>
            <FaUserAlt style={{ 
              width: '48px', 
              height: '48px', 
              color: '#9E9E9E', 
              marginBottom: '16px' 
            }} />
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>
              Aucun client trouvé
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              Ajoutez votre premier client pour commencer
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
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                margin: '16px auto 0'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
            >
              <FaPlus style={{ width: '10px', height: '10px' }} /> Ajouter
            </button>
          </div>
        )}

        {/* Table Footer */}
        {filteredClients.length > 0 && (
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
              Affichage de 1 à {filteredClients.length} sur {clients.length} clients
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                style={{
                  padding: '6px 8px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
              >
                ← Précédent
              </button>
              <span style={{ color: '#333333' }}>Page 1 sur 1</span>
              <button
                style={{
                  padding: '6px 8px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
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

      {/* Client Form Modal - Redesigned */}
      {showForm && (
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
            maxWidth: '800px',
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
              backgroundColor: editingClient ? '#FFB300' : '#4CAF50',
              color: '#FFFFFF'
            }}>
              <div>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  {editingClient ? 'Modifier le Client' : 'Nouveau Client'}
                </h2>
                <p style={{ 
                  margin: '5px 0 0 0', 
                  fontSize: '13px',
                  opacity: 0.9
                }}>
                  {editingClient ? 'Modifiez les informations du client ci-dessous' : 'Remplissez les informations du nouveau client'}
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingClient(null);
                  setFormData({
                    lastName: '',
                    firstName: '',
                    birthDate: '',
                    phone: '',
                    address: '',
                    passport: '',
                    cin: '',
                    licenseNumber: '',
                    licenseIssueDate: ''
                  });
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '20px',
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
                <FaTimes />
              </button>
            </div>

            {/* Form Content */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '30px'
            }}>
              <form onSubmit={handleSubmit}>
                {/* Security Notice */}
                <div style={{ 
                  display: 'flex', 
                  gap: '12px',
                  padding: '15px',
                  backgroundColor: '#FFF3E0', 
                  borderRadius: '8px', 
                  marginBottom: '25px',
                  border: '1px solid #FFB300'
                }}>
                  <FaLock style={{ 
                    width: '20px', 
                    height: '20px', 
                    color: '#FF9800',
                    flexShrink: 0,
                    marginTop: '2px'
                  }} />
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#333333',
                      marginBottom: '4px'
                    }}>
                      Vérification de sécurité
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666666',
                      marginBottom: '4px'
                    }}>
                      Le système vérifiera automatiquement si ce client se trouve dans la liste noire avant l'ajout.
                    </div>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#FF9800' 
                    }}>
                      {blacklist && blacklist.length > 0 
                        ? `📊 ${blacklist.length} client(s) dans la liste noire - Vérification active`
                        : '✅ Aucun client dans la liste noire'
                      }
                    </div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '20px',
                  marginBottom: '25px'
                }}>
                  
                  {/* Informations Personnelles */}
                  <div style={{
                    backgroundColor: '#F8F9FA',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0'
                  }}>
                    <h3 style={{
                      margin: '0 0 15px 0',
                      color: '#333333',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderBottom: '2px solid #2196F3',
                      paddingBottom: '10px'
                    }}>Informations Personnelles</h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#333333',
                        fontSize: '13px'
                      }}>
                        Nom: <span style={{color: '#F44336'}}>*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
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
                        fontSize: '13px'
                      }}>
                        Prénom: <span style={{color: '#F44336'}}>*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
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
                        fontSize: '13px'
                      }}>
                        Date de naissance: <span style={{color: '#F44336'}}>*</span>
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
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
                        fontSize: '13px'
                      }}>
                        Téléphone: <span style={{color: '#F44336'}}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #E0E0E0',
                          borderRadius: '6px',
                          color: '#333333',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                  </div>

                  {/* Documents */}
                  <div style={{
                    backgroundColor: '#F8F9FA',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #E0E0E0'
                  }}>
                    <h3 style={{
                      margin: '0 0 15px 0',
                      color: '#333333',
                      fontSize: '16px',
                      fontWeight: '600',
                      borderBottom: '2px solid #2196F3',
                      paddingBottom: '10px'
                    }}>Documents</h3>
                    
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{
                        display: 'block',
                        marginBottom: '8px',
                        fontWeight: '500',
                        color: '#333333',
                        fontSize: '13px'
                      }}>
                        CIN: <span style={{color: '#F44336'}}>*</span>
                      </label>
                      <input
                        type="text"
                        name="cin"
                        value={formData.cin}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '10px',
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
                        fontSize: '13px'
                      }}>
                        Passeport:
                      </label>
                      <input
                        type="text"
                        name="passport"
                        value={formData.passport}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '10px',
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
                        fontSize: '13px'
                      }}>
                        Numéro de permis:
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '10px',
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
                        fontSize: '13px'
                      }}>
                        Date d'émission permis:
                      </label>
                      <input
                        type="date"
                        name="licenseIssueDate"
                        value={formData.licenseIssueDate}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '10px',
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

                {/* Address Section */}
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
                    fontSize: '16px',
                    fontWeight: '600',
                    borderBottom: '2px solid #2196F3',
                    paddingBottom: '10px'
                  }}>Adresse</h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: '#333333',
                      fontSize: '13px'
                    }}>
                      Adresse:
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #E0E0E0',
                        borderRadius: '6px',
                        color: '#333333',
                        fontSize: '14px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>

                {/* Required Fields Alert */}
                <div style={{ 
                  padding: '12px', 
                  backgroundColor: '#FFF3E0', 
                  borderRadius: '6px', 
                  marginBottom: '25px',
                  border: '1px solid #FFB300',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <FaExclamationTriangle style={{ 
                    width: '16px', 
                    height: '16px', 
                    color: '#FF9800',
                    flexShrink: 0 
                  }} />
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#333333' 
                  }}>
                    <strong>Note:</strong> Tous les champs marqués d'un astérisque (*) sont obligatoires.
                  </span>
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid #E0E0E0'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingClient(null);
                      setFormData({
                        lastName: '',
                        firstName: '',
                        birthDate: '',
                        phone: '',
                        address: '',
                        passport: '',
                        cin: '',
                        licenseNumber: '',
                        licenseIssueDate: ''
                      });
                    }}
                    disabled={loading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: '1px solid #E0E0E0',
                      borderRadius: '6px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FaTimesCircle style={{ width: '14px', height: '14px' }} /> Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: loading ? '#BDBDBD' : (editingClient ? '#FFB300' : '#4CAF50'),
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      boxShadow: loading ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {loading ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 12"></polyline>
                        </svg>
                        En cours...
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {editingClient ? <FaSave style={{ width: '14px', height: '14px' }} /> : <FaPlus style={{ width: '14px', height: '14px' }} />}
                        {editingClient ? 'Mettre à jour' : 'Ajouter le Client'}
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Blacklist Form Modal - Redesigned */}
      {showBlacklistForm && selectedClient && (
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
            maxWidth: '600px',
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
              backgroundColor: '#F44336',
              color: '#FFFFFF'
            }}>
              <div>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  Ajouter à la Liste Noire
                </h2>
                <p style={{ 
                  margin: '5px 0 0 0', 
                  fontSize: '13px',
                  opacity: 0.9
                }}>
                  Client: {selectedClient.lastName} {selectedClient.firstName}
                </p>
              </div>
              
              <button
                onClick={() => {
                  setShowBlacklistForm(false);
                  setSelectedClient(null);
                  setBlacklistReason('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#FFFFFF',
                  fontSize: '20px',
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
                <FaTimes />
              </button>
            </div>

            {/* Form Content */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '30px'
            }}>
              <form onSubmit={handleBlacklistSubmit}>
                {/* Client Preview */}
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
                    fontSize: '16px',
                    fontWeight: '600',
                    borderBottom: '2px solid #2196F3',
                    paddingBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <FaUserAlt style={{ width: '16px', height: '16px', color: '#2196F3' }} />
                    Informations du Client
                  </h3>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '15px'
                  }}>
                    <div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666666',
                        marginBottom: '2px'
                      }}>
                        Nom complet
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '600',
                        color: '#333333'
                      }}>
                        {selectedClient.lastName} {selectedClient.firstName}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666666',
                        marginBottom: '2px'
                      }}>
                        Téléphone
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '600',
                        color: '#333333'
                      }}>
                        {selectedClient.phone}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666666',
                        marginBottom: '2px'
                      }}>
                        CIN
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        color: '#333333'
                      }}>
                        {selectedClient.cin || 'N/A'}
                      </div>
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666666',
                        marginBottom: '2px'
                      }}>
                        Passeport
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        color: '#333333'
                      }}>
                        {selectedClient.passport || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Reason Input */}
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
                    fontSize: '16px',
                    fontWeight: '600',
                    borderBottom: '2px solid #F44336',
                    paddingBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <FaClipboardList style={{ width: '16px', height: '16px', color: '#F44336' }} />
                    Raison de l'ajout à la liste noire: <span style={{color: '#F44336'}}>*</span>
                  </h3>
                  
                  <textarea
                    value={blacklistReason}
                    onChange={(e) => setBlacklistReason(e.target.value)}
                    placeholder="Saisissez la raison détaillée pour laquelle ce client est ajouté à la liste noire..."
                    rows="4"
                    required
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
                </div>

                {/* Warning Message */}
                <div style={{ 
                  display: 'flex', 
                  gap: '12px',
                  padding: '15px',
                  backgroundColor: '#FFEBEE', 
                  borderRadius: '8px', 
                  marginBottom: '25px',
                  border: '1px solid #F44336'
                }}>
                  <FaExclamationTriangle style={{ 
                    width: '20px', 
                    height: '20px', 
                    color: '#F44336',
                    flexShrink: 0,
                    marginTop: '2px'
                  }} />
                  <div>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: '600', 
                      color: '#F44336',
                      marginBottom: '4px'
                    }}>
                      Attention - Action Irréversible
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666666'
                    }}>
                      Ce client sera automatiquement supprimé de la liste des clients et ajouté à la liste noire de manière permanente.
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '10px',
                  marginTop: '20px',
                  paddingTop: '20px',
                  borderTop: '1px solid #E0E0E0'
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBlacklistForm(false);
                      setSelectedClient(null);
                      setBlacklistReason('');
                    }}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#FFFFFF',
                      color: '#333333',
                      border: '1px solid #E0E0E0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FaTimesCircle style={{ width: '14px', height: '14px' }} /> Annuler
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#F44336',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '600',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#D32F2F'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#F44336'}
                  >
                    <FaBan style={{ width: '14px', height: '14px' }} /> Confirmer la liste noire
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientsManagement;