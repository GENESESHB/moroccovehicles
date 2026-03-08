import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import {
  FaCar,
  FaEdit,
  FaTrash,
  FaPlus,
  FaEye,
  FaTimes,
  FaCheck,
  FaClock,
  FaBan,
  FaEllipsisV,
  FaSave,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaPrint,
  FaFilePdf,
  FaDownload,
  FaCog,
  FaWrench,
  FaGasPump,
  FaKey,
  FaCalendar,
  FaMoneyBill,
  FaSync,
  FaImage,
  FaUpload,
  FaInfoCircle
} from 'react-icons/fa';
import './SmartCarsControllers.css';

const SmartCarsControllers = ({
  user,
  smartCars,
  setSmartCars,
  setMessage,
  loadSmartCars
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Use refs to track action menu state per car
  const [openMenuId, setOpenMenuId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const menuRefs = useRef({});
  const actionButtonRefs = useRef({});

  // Form state for adding new car
  const [formData, setFormData] = useState({
    nomVehicule: '',
    typeVehicule: '',
    boiteVitesse: '',
    prixJour: '',
    typeCarburant: '',
    equipementsAudio: [],
    nombreClesSecurite: '',
    intervalleVidange: '',
    imageVehicule: null,
    carteGriseRecto: null,
    carteGriseVerso: null,
    numeroMatricule: ''
  });

  const [imagePreview, setImagePreview] = useState({
    imageVehicule: null,
    carteGriseRecto: null,
    carteGriseVerso: null
  });

  // Form state for editing car
  const [editFormData, setEditFormData] = useState({
    nomVehicule: '',
    typeVehicule: '',
    boiteVitesse: '',
    prixJour: '',
    typeCarburant: '',
    equipementsAudio: [],
    nombreClesSecurite: '',
    intervalleVidange: '',
    numeroMatricule: ''
  });

  const vehicleTypes = ['Berline', 'SUV', 'Compact', 'Citadine', 'Sport', 'Utilitaire', '4x4', 'Monospace'];
  const gearboxTypes = ['Manuelle', 'Automatique', 'Séquentielle'];
  const fuelTypes = ['Essence', 'Diesel', 'Électrique', 'Hybride', 'GPL'];
  const oilChangeIntervals = ['8000 km', '10000 km', '12000 km'];
  const audioEquipment = ['Radio', 'GPS', 'MP3', 'CD'];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && menuRefs.current[openMenuId]) {
        if (!menuRefs.current[openMenuId].contains(event.target)) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside, true);
    };
  }, [openMenuId]);

  // ===== ADD CAR FUNCTIONALITY =====
  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, [name]: file }));

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(prev => ({ ...prev, [name]: e.target.result }));
        };
        reader.readAsDataURL(file);
      }
    } else if (name === 'equipementsAudio') {
      setFormData(prev => ({
        ...prev,
        equipementsAudio: checked
          ? [...prev.equipementsAudio, value]
          : prev.equipementsAudio.filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCar = async (e) => {
    e.preventDefault();

    if (!user._id && !user.id) {
      setMessage('❌ Erreur: Utilisateur non identifié');
      return;
    }

    setIsSubmitting(true);

    try {
      setMessage('🔄 Enregistrement de la voiture...');

      const submitData = new FormData();

      Object.keys(formData).forEach(key => {
        if (key === 'equipementsAudio') {
          submitData.append(key, JSON.stringify(formData[key]));
        } else if (formData[key] !== null && formData[key] !== '') {
          submitData.append(key, formData[key]);
        }
      });

      const response = await api.post('/smart-cars', submitData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const result = response.data;

      if (result.success && result.car) {
        setSmartCars(prev => [...prev, result.car]);
        setMessage('✅ Voiture enregistrée avec succès!');

        // Reset form and hide it
        setFormData({
          nomVehicule: '', typeVehicule: '', boiteVitesse: '', prixJour: '',
          typeCarburant: '', equipementsAudio: [], nombreClesSecurite: '',
          intervalleVidange: '', imageVehicule: null, carteGriseRecto: null,
          carteGriseVerso: null, numeroMatricule: ''
        });
        setImagePreview({ imageVehicule: null, carteGriseRecto: null, carteGriseVerso: null });
        setShowAddForm(false);
      } else {
        throw new Error(result.message || 'Erreur lors de l\'enregistrement');
      }

    } catch (error) {
      console.error('Erreur détaillée:', error);
      
      let errorMessage = 'Erreur lors de l\'enregistrement';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMessage(`❌ ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAddForm = () => {
    setFormData({
      nomVehicule: '', typeVehicule: '', boiteVitesse: '', prixJour: '',
      typeCarburant: '', equipementsAudio: [], nombreClesSecurite: '',
      intervalleVidange: '', imageVehicule: null, carteGriseRecto: null,
      carteGriseVerso: null, numeroMatricule: ''
    });
    setImagePreview({ imageVehicule: null, carteGriseRecto: null, carteGriseVerso: null });
  };

  // ===== EDIT CAR FUNCTIONALITY =====
  const openEditModal = (car) => {
    setOpenMenuId(null); // Close any open menu
    setEditingCar(car);
    setEditFormData({
      nomVehicule: car.nomVehicule || '',
      typeVehicule: car.typeVehicule || '',
      boiteVitesse: car.boiteVitesse || '',
      prixJour: car.prixJour || '',
      typeCarburant: car.typeCarburant || '',
      equipementsAudio: car.equipementsAudio || [],
      nombreClesSecurite: car.nombreClesSecurite || '',
      intervalleVidange: car.intervalleVidange || '',
      numeroMatricule: car.numeroMatricule || ''
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'equipementsAudio') {
      setEditFormData(prev => ({
        ...prev,
        equipementsAudio: checked
          ? [...prev.equipementsAudio, value]
          : prev.equipementsAudio.filter(item => item !== value)
      }));
    } else {
      setEditFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleEditCar = async (e) => {
    e.preventDefault();

    if (!editingCar) return;

    setIsSubmitting(true);

    try {
      setMessage('🔄 Modification en cours...');

      const response = await api.put(`/smart-cars/${editingCar._id}`, editFormData);

      if (response.data.success) {
        setSmartCars(prev =>
          prev.map(car =>
            car._id === editingCar._id ? { ...car, ...editFormData } : car
          )
        );
        setMessage('✅ Voiture modifiée avec succès!');
        setEditingCar(null);
      }
    } catch (error) {
      console.error('Error updating car:', error);
      setMessage(`❌ Erreur lors de la modification: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ===== STATUS MANAGEMENT =====
  const handleStatusChange = async (carId, newStatus) => {
    try {
      setMessage('🔄 Modification du statut...');

      const response = await api.put(`/smart-cars/${carId}`, { status: newStatus });

      if (response.data.success) {
        setSmartCars(prev =>
          prev.map(car =>
            car._id === carId ? { ...car, status: newStatus } : car
          )
        );
        setMessage(`✅ Statut modifié avec succès!`);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage(`❌ Erreur lors de la modification du statut: ${error.response?.data?.message || error.message}`);
    }
  };

  // ===== DELETE FUNCTIONALITY =====
  const confirmDelete = (car) => {
    setOpenMenuId(null); // Close any open menu
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  const handleDeleteCar = async (carId) => {
    try {
      setMessage('🔄 Suppression en cours...');

      const response = await api.delete(`/smart-cars/${carId}`);

      if (response.data.success) {
        setSmartCars(prev => prev.filter(car => car._id !== carId));
        setMessage('✅ Voiture supprimée avec succès!');
        setShowDeleteModal(false);
        setCarToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting car:', error);
      setMessage(`❌ Erreur lors de la suppression: ${error.response?.data?.message || error.message}`);
    }
  };

  // ===== VIEW DETAILS =====
  const showCarDetails = (car) => {
    setOpenMenuId(null); // Close any open menu
    setSelectedCar(car);
    setShowDetailsModal(true);
  };

  // ===== FILTER AND SEARCH =====
  const filteredCars = smartCars.filter(car => {
    if (!car) return false;

    const matchesFilter = filter === 'all' || car.status === filter;
    const matchesSearch =
      car.nomVehicule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.numeroMatricule?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.typeVehicule?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // ===== UTILITY FUNCTIONS =====
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'maintenance': return 'status-maintenance';
      case 'rented': return 'status-rented';
      default: return 'status-active';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'maintenance': return 'Maintenance';
      case 'rented': return 'Loué';
      default: return 'Actif';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'inactive': return '#F44336';
      case 'maintenance': return '#FF9800';
      case 'rented': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  // ===== BEAUTIFUL FORM COMPONENT =====
  const renderVehicleForm = ({ formData, handleSubmit, handleChange, imagePreview, isEditing, onClose, resetForm }) => (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      width: '90%',
      maxWidth: '1200px',
      maxHeight: '90vh',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
      borderRadius: '12px',
      border: '2px solid rgba(255, 255, 255, 0.2)'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
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
            onClick={onClose}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
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
                    name="nomVehicule"
                    value={formData.nomVehicule}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Tesla Model S, BMW i4..."
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
                    Type de Véhicule: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="typeVehicule"
                    value={formData.typeVehicule}
                    onChange={handleChange}
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
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
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
                    Boîte de Vitesse: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <select
                    name="boiteVitesse"
                    value={formData.boiteVitesse}
                    onChange={handleChange}
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
                    {gearboxTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
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
                    Prix par Jour (MAD): <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="number"
                    name="prixJour"
                    value={formData.prixJour}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    placeholder="50.00"
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

              {/* Spécifications Techniques */}
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
                }}>Spécifications Techniques</h3>
                
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
                    name="typeCarburant"
                    value={formData.typeCarburant}
                    onChange={handleChange}
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
                    {fuelTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
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
                    Équipements Audio:
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(2, 1fr)', 
                    gap: '10px',
                    marginTop: '8px'
                  }}>
                    {audioEquipment.map(equipment => (
                      <label key={equipment} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        padding: '10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        backgroundColor: formData.equipementsAudio.includes(equipment) ? '#E3F2FD' : 'transparent',
                        border: `1px solid ${formData.equipementsAudio.includes(equipment) ? '#2196F3' : '#E0E0E0'}`
                      }}>
                        <input
                          type="checkbox"
                          name="equipementsAudio"
                          value={equipment}
                          checked={formData.equipementsAudio.includes(equipment)}
                          onChange={handleChange}
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
                          backgroundColor: formData.equipementsAudio.includes(equipment) ? '#2196F3' : 'transparent'
                        }}>
                          {formData.equipementsAudio.includes(equipment) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </span>
                        <span style={{ color: '#333333', fontSize: '13px' }}>{equipment}</span>
                      </label>
                    ))}
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
                    Nombre de Clés de Sécurité: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="number"
                    name="nombreClesSecurite"
                    value={formData.nombreClesSecurite}
                    onChange={handleChange}
                    required
                    min="1"
                    max="10"
                    placeholder="2"
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
                    name="intervalleVidange"
                    value={formData.intervalleVidange}
                    onChange={handleChange}
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
                    {oilChangeIntervals.map(interval => (
                      <option key={interval} value={interval}>{interval}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Documents et Images */}
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
                }}>
                  Documents et Images
                  {!isEditing && <span style={{color: '#F44336'}}> *</span>}
                </h3>
                
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Numéro Matricule: <span style={{color: '#F44336'}}>*</span>
                  </label>
                  <input
                    type="text"
                    name="numeroMatricule"
                    value={formData.numeroMatricule}
                    onChange={handleChange}
                    required
                    placeholder="Ex: AB-123-CD"
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

                {/* Image du Véhicule */}
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333333',
                    fontSize: '14px'
                  }}>
                    Image du Véhicule: 
                    {!isEditing && <span style={{color: '#F44336'}}> *</span>}
                  </label>
                  <div style={{
                    border: '2px dashed #BDBDBD',
                    borderRadius: '8px',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }}>
                    <input
                      type="file"
                      name="imageVehicule"
                      onChange={handleChange}
                      accept=".jpg,.jpeg,.png,.gif"
                      required={!isEditing}
                      style={{ display: 'none' }}
                      id="imageVehicule"
                    />
                    <label htmlFor="imageVehicule" style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}>
                      <FaImage style={{ fontSize: '32px', color: '#666666', marginBottom: '10px' }} />
                      <span style={{ color: '#666666', fontSize: '14px' }}>
                        Cliquez pour télécharger l'image
                      </span>
                      {formData.imageVehicule && (
                        <span style={{ color: '#4CAF50', fontSize: '12px', marginTop: '5px' }}>
                          ✓ {formData.imageVehicule.name}
                        </span>
                      )}
                    </label>
                  </div>
                  {imagePreview?.imageVehicule && (
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                      <img
                        src={imagePreview.imageVehicule}
                        alt="Aperçu véhicule"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '150px',
                          borderRadius: '6px',
                          border: '1px solid #E0E0E0'
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Required Fields Alert */}
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#FFF3E0', 
              borderRadius: '8px', 
              marginBottom: '25px',
              border: '1px solid #FFB300',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <FaInfoCircle style={{ 
                fontSize: '18px', 
                color: '#FF9800',
                flexShrink: 0 
              }} />
              <span style={{ 
                fontSize: '14px', 
                color: '#333333' 
              }}>
                <strong>Note:</strong> Tous les champs marqués d'un astérisque (*) sont obligatoires.
              </span>
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
                onClick={resetForm || onClose}
                disabled={isSubmitting}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
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
                disabled={isSubmitting}
                style={{
                  padding: '12px 40px',
                  backgroundColor: isSubmitting ? '#BDBDBD' : (isEditing ? '#FFB300' : '#4CAF50'),
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.2s',
                  boxShadow: isSubmitting ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.1)',
                  minWidth: '180px'
                }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #fff',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    En cours...
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isEditing ? <FaSave /> : <FaPlus />}
                    {isEditing ? 'Enregistrer les modifications' : 'Ajouter le Véhicule'}
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // ===== RENDER CAR ROW =====
  const CarRow = ({ car }) => {
    const [localShowActions, setLocalShowActions] = useState(false);
    const [localDropdownPosition, setLocalDropdownPosition] = useState('bottom');
    const isMenuOpen = openMenuId === car._id;

    const toggleMenu = (e) => {
      e.stopPropagation();
      
      if (!isMenuOpen && actionButtonRefs.current[car._id]) {
        const rect = actionButtonRefs.current[car._id].getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const spaceBelow = windowHeight - rect.bottom;
        const dropdownHeight = 200; // Approximate height of dropdown
        
        // If not enough space below, show above
        if (spaceBelow < dropdownHeight && rect.top > dropdownHeight) {
          setLocalDropdownPosition('top');
        } else {
          setLocalDropdownPosition('bottom');
        }
      }
      
      setOpenMenuId(isMenuOpen ? null : car._id);
    };

    const handleMenuAction = (action) => {
      setOpenMenuId(null);
      action();
    };

    return (
      <tr 
        style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E0E0E0',
          transition: 'all 0.2s ease',
          position: 'relative'
        }}
        onMouseEnter={() => setLocalShowActions(true)}
        onMouseLeave={() => {
          if (!isMenuOpen) {
            setLocalShowActions(false);
          }
        }}
      >
        {/* Car Info */}
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
              <FaCar style={{ 
                color: '#000', 
                fontSize: '14px'
              }} />
            </div>
            
            <div>
              <div style={{ 
                color: '#333333', 
                fontWeight: '600',
                fontSize: '14px',
                marginBottom: '2px'
              }}>
                {car.nomVehicule}
              </div>
              <div style={{ 
                color: '#666666', 
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <FaCar style={{ width: '10px', height: '10px' }} />
                {car.typeVehicule}
              </div>
            </div>
          </div>
        </td>

        {/* Details */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '4px' }}>
              <strong>{car.numeroMatricule}</strong>
            </div>
            <div style={{ 
              color: '#666666', 
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <FaGasPump style={{ width: '10px', height: '10px' }} />
              {car.typeCarburant}
            </div>
          </div>
        </td>

        {/* Technical Info */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <div style={{ marginBottom: '4px' }}>
              <strong>{car.boiteVitesse}</strong>
            </div>
            <div style={{ 
              color: '#666666', 
              fontSize: '11px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <FaKey style={{ width: '10px', height: '10px' }} />
              {car.nombreClesSecurite} clés
            </div>
          </div>
        </td>

        {/* Price */}
        <td style={{ padding: '12px' }}>
          <div style={{ 
            color: '#333333', 
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <FaMoneyBill style={{ width: '12px', height: '12px', color: '#4CAF50' }} />
              <span style={{ fontWeight: '600' }}>{car.prixJour} MAD/jour</span>
            </div>
            <div style={{ fontSize: '11px', color: '#666666' }}>
              {car.intervalleVidange}
            </div>
          </div>
        </td>

        {/* Status */}
        <td style={{ padding: '12px' }}>
          <div style={{
            padding: '4px 8px',
            backgroundColor: `${getStatusColor(car.status)}20`,
            color: getStatusColor(car.status),
            borderRadius: '4px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'inline-block',
            border: `1px solid ${getStatusColor(car.status)}`
          }}>
            {getStatusText(car.status)}
          </div>
        </td>

        {/* Actions */}
        <td style={{ 
          padding: '12px',
          position: 'relative'
        }}>
          <div style={{
            display: 'flex',
            gap: '6px',
            opacity: localShowActions || isMenuOpen ? 1 : 0.9,
            transition: 'opacity 0.2s ease',
            alignItems: 'center'
          }}>
            {/* View Details Button */}
            <button
              onClick={() => showCarDetails(car)}
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
              title="Voir détails"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
            >
              <FaEye style={{ width: '14px', height: '14px' }} />
            </button>

            {/* Edit Button */}
            <button
              onClick={() => openEditModal(car)}
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
              title="Modifier"
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F57C00'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FF9800'}
            >
              <FaEdit style={{ width: '14px', height: '14px' }} />
            </button>

            {/* More Actions Menu - FIXED: Using fixed positioning with smart calculation */}
            <div 
              ref={el => menuRefs.current[car._id] = el}
              style={{ position: 'relative', zIndex: isMenuOpen ? 9999 : 'auto' }}
            >
              <button
                ref={el => actionButtonRefs.current[car._id] = el}
                onClick={toggleMenu}
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: isMenuOpen ? '#E0E0E0' : '#F5F5F5',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  zIndex: isMenuOpen ? 9999 : 'auto'
                }}
                title="Plus d'actions"
                onMouseEnter={(e) => {
                  if (!isMenuOpen) e.target.style.backgroundColor = '#E0E0E0';
                }}
                onMouseLeave={(e) => {
                  if (!isMenuOpen) e.target.style.backgroundColor = '#F5F5F5';
                }}
              >
                <FaEllipsisV style={{ width: '14px', height: '14px' }} />
              </button>

              {isMenuOpen && (
                <div 
                  ref={el => menuRefs.current[car._id] = el}
                  style={{
                    position: 'fixed',
                    ...(localDropdownPosition === 'bottom' ? {
                      top: actionButtonRefs.current[car._id] ? actionButtonRefs.current[car._id].getBoundingClientRect().bottom + 4 : 0,
                    } : {
                      bottom: window.innerHeight - (actionButtonRefs.current[car._id] ? actionButtonRefs.current[car._id].getBoundingClientRect().top : 0) + 4,
                    }),
                    right: window.innerWidth - (actionButtonRefs.current[car._id] ? actionButtonRefs.current[car._id].getBoundingClientRect().right : 0),
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E0E0E0',
                    borderRadius: '6px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    zIndex: 99999,
                    minWidth: '180px',
                    overflow: 'hidden'
                  }}
                >
                  <button 
                    onClick={() => handleMenuAction(() => openEditModal(car))}
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
                    onClick={() => handleMenuAction(() => handleStatusChange(car._id, 'active'))}
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
                    <FaCheck style={{ width: '12px', height: '12px', color: '#4CAF50' }} /> Activer
                  </button>
                  <button 
                    onClick={() => handleMenuAction(() => handleStatusChange(car._id, 'maintenance'))}
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
                    <FaWrench style={{ width: '12px', height: '12px', color: '#FF9800' }} /> Maintenance
                  </button>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid #E0E0E0' }}>
                    <div style={{ fontSize: '10px', color: '#666666', fontWeight: '600', marginBottom: '4px' }}>
                      Changer statut:
                    </div>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleMenuAction(() => handleStatusChange(car._id, 'active'))}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: car.status === 'active' ? '#4CAF50' : '#E8F5E9',
                          color: car.status === 'active' ? '#FFF' : '#4CAF50',
                          border: '1px solid #4CAF50',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '10px',
                          fontWeight: '500'
                        }}
                      >
                        Actif
                      </button>
                      <button
                        onClick={() => handleMenuAction(() => handleStatusChange(car._id, 'inactive'))}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: car.status === 'inactive' ? '#F44336' : '#FFEBEE',
                          color: car.status === 'inactive' ? '#FFF' : '#F44336',
                          border: '1px solid #F44336',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '10px',
                          fontWeight: '500'
                        }}
                      >
                        Inactif
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleMenuAction(() => confirmDelete(car))}
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

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#333333',
      position: 'relative'
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
              Luxury Véhicules
            </h2>
            <span style={{
              fontSize: '14px',
              color: '#666666'
            }}>
              ({filteredCars.length} sur {smartCars.length})
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
              Total: <strong style={{ fontSize: '14px' }}>{smartCars.length}</strong>
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
              Actifs: <strong style={{ fontSize: '14px' }}>{smartCars.filter(c => c.status === 'active').length}</strong>
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
              Maintenance: <strong style={{ fontSize: '14px' }}>{smartCars.filter(c => c.status === 'maintenance').length}</strong>
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
              Inactifs: <strong style={{ fontSize: '14px' }}>{smartCars.filter(c => c.status === 'inactive').length}</strong>
            </span>
          </div>
        </div>

        {/* Filter Buttons and Action Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '6px 12px',
                backgroundColor: filter === 'all' ? '#2196F3' : '#FFFFFF',
                color: filter === 'all' ? '#FFFFFF' : '#333333',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'all') e.target.style.backgroundColor = '#F5F5F5';
              }}
              onMouseLeave={(e) => {
                if (filter !== 'all') e.target.style.backgroundColor = '#FFFFFF';
              }}
            >
              <FaFilter style={{ width: '10px', height: '10px' }} /> Tous
            </button>
            <button
              onClick={() => setFilter('active')}
              style={{
                padding: '6px 12px',
                backgroundColor: filter === 'active' ? '#4CAF50' : '#FFFFFF',
                color: filter === 'active' ? '#FFFFFF' : '#333333',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'active') e.target.style.backgroundColor = '#F5F5F5';
              }}
              onMouseLeave={(e) => {
                if (filter !== 'active') e.target.style.backgroundColor = '#FFFFFF';
              }}
            >
              Actifs
            </button>
            <button
              onClick={() => setFilter('maintenance')}
              style={{
                padding: '6px 12px',
                backgroundColor: filter === 'maintenance' ? '#FF9800' : '#FFFFFF',
                color: filter === 'maintenance' ? '#FFFFFF' : '#333333',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'maintenance') e.target.style.backgroundColor = '#F5F5F5';
              }}
              onMouseLeave={(e) => {
                if (filter !== 'maintenance') e.target.style.backgroundColor = '#FFFFFF';
              }}
            >
              Maintenance
            </button>
            <button
              onClick={() => setFilter('inactive')}
              style={{
                padding: '6px 12px',
                backgroundColor: filter === 'inactive' ? '#F44336' : '#FFFFFF',
                color: filter === 'inactive' ? '#FFFFFF' : '#333333',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (filter !== 'inactive') e.target.style.backgroundColor = '#F5F5F5';
              }}
              onMouseLeave={(e) => {
                if (filter !== 'inactive') e.target.style.backgroundColor = '#FFFFFF';
              }}
            >
              Inactifs
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={loadSmartCars}
              style={{
                padding: '6px 12px',
                backgroundColor: '#FFFFFF',
                color: '#333333',
                border: '1px solid #E0E0E0',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F5F5F5'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
            >
              <FaSync style={{ width: '10px', height: '10px' }} /> Actualiser
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
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
              onMouseEnter={(e) => e.target.style.backgroundColor = '#388E3C'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
            >
              <FaPlus style={{ width: '10px', height: '10px' }} /> Nouveau Véhicule
            </button>
          </div>
        </div>
      </div>

      {/* Cars Table - FIXED: Changed overflow to visible */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '8px',
        overflow: 'visible', // Changed from 'hidden' to 'visible'
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
            {filteredCars.length} véhicule(s) trouvé(s)
          </div>
        </div>

        {smartCars.length === 0 ? (
          <div style={{
            padding: '60px 20px',
            textAlign: 'center',
            color: '#666666',
            backgroundColor: '#FAFAFA'
          }}>
            <FaCar style={{ 
              width: '48px', 
              height: '48px', 
              color: '#9E9E9E', 
              marginBottom: '16px' 
            }} />
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>
              Aucun véhicule trouvé
            </div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>
              {searchTerm ? 'Aucun résultat pour votre recherche' : 'Ajoutez votre premier véhicule intelligent'}
            </div>
            <button
              onClick={() => setShowAddForm(true)}
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
              <FaPlus style={{ width: '10px', height: '10px' }} /> Ajouter un Véhicule
            </button>
          </div>
        ) : (
          <>
            {/* FIXED: Changed overflow to visible to allow dropdown to escape container */}
            <div style={{ overflowX: 'auto', overflowY: 'visible', position: 'relative' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                minWidth: '900px',
                position: 'relative'
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
                      width: '20%'
                    }}>
                      Détails
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
                      Technique
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
                      width: '10%'
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
                      width: '10%'
                    }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCars.map(car => (
                    <CarRow key={car._id} car={car} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* No Results for Filter */}
            {filteredCars.length === 0 && smartCars.length > 0 && (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666666',
                backgroundColor: '#FAFAFA'
              }}>
                <FaSearch style={{ 
                  width: '48px', 
                  height: '48px', 
                  color: '#9E9E9E', 
                  marginBottom: '16px' 
                }} />
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>
                  Aucun véhicule trouvé
                </div>
                <div style={{ fontSize: '14px', marginTop: '8px' }}>
                  Aucun résultat pour votre recherche ou filtre
                </div>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilter('all');
                  }}
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
                  <FaFilter style={{ width: '10px', height: '10px' }} /> Réinitialiser les filtres
                </button>
              </div>
            )}
          </>
        )}

        {/* Table Footer */}
        {filteredCars.length > 0 && (
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
              Affichage de 1 à {filteredCars.length} sur {smartCars.length} véhicules
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

      {/* Add Car Form Modal */}
      {showAddForm && renderVehicleForm({
        formData,
        handleSubmit: handleAddCar,
        handleChange: handleInputChange,
        imagePreview,
        isEditing: false,
        onClose: () => {
          setShowAddForm(false);
          resetAddForm();
        },
        resetForm: resetAddForm
      })}

      {/* Edit Car Modal */}
      {editingCar && renderVehicleForm({
        formData: editFormData,
        handleSubmit: handleEditCar,
        handleChange: handleEditInputChange,
        imagePreview: editingCar.imageVehicule?.url ? { imageVehicule: editingCar.imageVehicule.url } : null,
        isEditing: true,
        onClose: () => setEditingCar(null),
        resetForm: null
      })}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && carToDelete && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          borderRadius: '12px',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
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
                  Confirmation de suppression
                </h2>
              </div>
              
              <button
                onClick={() => setShowDeleteModal(false)}
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

            <div style={{ padding: '30px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#FFEBEE',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <FaTrash style={{ fontSize: '32px', color: '#F44336' }} />
                </div>
                
                <h3 style={{ color: '#333333', fontSize: '18px', marginBottom: '10px' }}>
                  Supprimer {carToDelete.nomVehicule} ?
                </h3>
                
                <p style={{ color: '#666666', fontSize: '14px', marginBottom: '20px' }}>
                  Êtes-vous sûr de vouloir supprimer ce véhicule intelligent ?
                </p>
                
                <div style={{
                  backgroundColor: '#FFF3E0',
                  padding: '15px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  border: '1px solid #FFB300'
                }}>
                  <div style={{ fontSize: '13px', color: '#333333', marginBottom: '8px' }}>
                    <strong>Véhicule:</strong> {carToDelete.nomVehicule}
                  </div>
                  <div style={{ fontSize: '13px', color: '#666666' }}>
                    <strong>Matricule:</strong> {carToDelete.numeroMatricule}
                  </div>
                </div>
                
                <p style={{ 
                  color: '#F44336', 
                  fontSize: '12px', 
                  fontWeight: '600',
                  marginBottom: '20px'
                }}>
                  ⚠️ Cette action est irréversible !
                </p>
              </div>
            </div>

            <div style={{
              padding: '20px 30px',
              borderTop: '1px solid #E0E0E0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              <button
                onClick={() => setShowDeleteModal(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Annuler
              </button>
              <button
                onClick={() => handleDeleteCar(carToDelete._id)}
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
              >
                <FaTrash style={{ width: '14px', height: '14px' }} />
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Car Details Modal */}
      {showDetailsModal && selectedCar && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1000,
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
          borderRadius: '12px',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            maxHeight: '90vh',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 30px',
              backgroundColor: '#2196F3',
              color: '#FFFFFF'
            }}>
              <div>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '20px',
                  fontWeight: '600'
                }}>
                  Détails: {selectedCar.nomVehicule}
                </h2>
                <p style={{ 
                  margin: '5px 0 0 0', 
                  fontSize: '13px',
                  opacity: 0.9
                }}>
                  Informations complètes du véhicule
                </p>
              </div>
              
              <button
                onClick={() => setShowDetailsModal(false)}
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

            <div style={{ padding: '30px', overflowY: 'auto', maxHeight: 'calc(90vh - 120px)' }}>
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
                    fontSize: '16px',
                    fontWeight: '600',
                    borderBottom: '2px solid #2196F3',
                    paddingBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FaCar style={{ width: '16px', height: '16px' }} />
                    Informations de Base
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Nom du Véhicule
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.nomVehicule}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Type de Véhicule
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.typeVehicule}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Boîte de Vitesse
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.boiteVitesse}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Prix par Jour
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.prixJour} MAD
                    </div>
                  </div>
                </div>

                {/* Spécifications Techniques */}
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
                    paddingBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FaCog style={{ width: '16px', height: '16px' }} />
                    Spécifications Techniques
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Type de Carburant
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.typeCarburant}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Clés de sécurité
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.nombreClesSecurite}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Intervalle Vidange
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.intervalleVidange}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Équipements audio
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.equipementsAudio?.join(', ') || 'Aucun'}
                    </div>
                  </div>
                </div>

                {/* Documents et Statut */}
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
                    paddingBottom: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <FaFilePdf style={{ width: '16px', height: '16px' }} />
                    Documents et Statut
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Numéro Matricule
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {selectedCar.numeroMatricule}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Statut
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: `${getStatusColor(selectedCar.status)}20`,
                      color: getStatusColor(selectedCar.status),
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block',
                      border: `1px solid ${getStatusColor(selectedCar.status)}`
                    }}>
                      {getStatusText(selectedCar.status)}
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>
                      Date de création
                    </div>
                    <div style={{ fontSize: '14px', color: '#333333', fontWeight: '500' }}>
                      {new Date(selectedCar.dateCreation).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Image du Véhicule */}
              {selectedCar.imageVehicule?.url && (
                <div style={{
                  backgroundColor: '#F8F9FA',
                  padding: '20px',
                  borderRadius: '8px',
                  border: '1px solid #E0E0E0',
                  marginTop: '20px'
                }}>
                  <h3 style={{
                    margin: '0 0 15px 0',
                    color: '#333333',
                    fontSize: '16px',
                    fontWeight: '600',
                    borderBottom: '2px solid #2196F3',
                    paddingBottom: '10px'
                  }}>
                    Image du Véhicule
                  </h3>
                  
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={selectedCar.imageVehicule.url} 
                      alt="Véhicule" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '300px', 
                        borderRadius: '8px',
                        border: '1px solid #E0E0E0'
                      }} 
                    />
                  </div>
                </div>
              )}
            </div>

            <div style={{
              padding: '20px 30px',
              borderTop: '1px solid #E0E0E0',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px'
            }}>
              <button
                onClick={() => setShowDetailsModal(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#FFFFFF',
                  color: '#333333',
                  border: '1px solid #E0E0E0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'all 0.2s'
                }}
              >
                Fermer
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openEditModal(selectedCar);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#2196F3',
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
              >
                <FaEdit style={{ width: '14px', height: '14px' }} />
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SmartCarsControllers;