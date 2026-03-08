import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import VehicleFormPopup from './forms/VehicleFormPopup';
import VehiclesList from './lists/VehiclesList';

const VehiclesManagement = ({ user, vehicles, setVehicles, setMessage, loadVehicles }) => {
  const [vehicleForm, setVehicleForm] = useState({
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

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Reset form when popup closes
  useEffect(() => {
    if (!showPopup) {
      resetForm();
    }
  }, [showPopup]);

  const resetForm = () => {
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
    setErrors({});
    setEditingVehicle(null);
    setIsEditing(false);
  };

  const handleVehicleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // Handle checkboxes
    if (type === 'checkbox') {
      setVehicleForm(prevData => ({
        ...prevData,
        [name]: checked
      }));
      return;
    }

    // Validate input to ensure it contains a maximum of 10 words (for text fields)
    if (!files) {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 10 && (name === 'name' || name === 'type' || name === 'description' || name === 'remarques')) {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: 'Ce champ ne doit pas dépasser 10 mots.'
        }));
        return;
      } else {
        setErrors(prevErrors => ({
          ...prevErrors,
          [name]: ''
        }));
      }
    }

    if (files) {
      const file = files[0];
      if (file) {
        // Check file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
          setErrors(prevErrors => ({
            ...prevErrors,
            image: 'Format de fichier non supporté. Utilisez JPEG, JPG, PNG ou GIF.'
          }));
          setImagePreview(null);
          return;
        } else {
          setErrors(prevErrors => ({
            ...prevErrors,
            image: ''
          }));
        }

        setVehicleForm(prevData => ({ ...prevData, [name]: file }));
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setVehicleForm(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for errors before submitting
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setMessage('Veillez corriger les erreurs dans le formulaire.');
      setLoading(false);
      return;
    }

    // Basic validation for required fields
    // RETIRÉ 'kmRetour', 'description', 'remarques' des champs obligatoires
    const requiredFields = [
      'name', 'type', 'boiteVitesse', 'pricePerDay', 'carburant', 
      'niveauReservoir', 'matricule', 'kmDepart', // CHANGÉ ICI
      'assuranceStartDate', 'assuranceEndDate', 'vidangeInterval'
    ];

    const missingFields = requiredFields.filter(field => !vehicleForm[field]);
    if (missingFields.length > 0 || (!vehicleForm.image && !isEditing)) {
      setMessage('Veillez remplir tous les champs obligatoires.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append all form data
      Object.keys(vehicleForm).forEach(key => {
        if (vehicleForm[key] !== null && vehicleForm[key] !== '') {
          if (key === 'dommages' && Array.isArray(vehicleForm[key])) {
            // Handle damages array
            vehicleForm[key].forEach((damage, index) => {
              formData.append(`dommages[${index}]`, damage);
            });
          } else if (typeof vehicleForm[key] === 'boolean') {
            // Handle boolean fields
            formData.append(key, vehicleForm[key].toString());
          } else {
            formData.append(key, vehicleForm[key]);
          }
        }
      });

      // Add partner information
      formData.append('partnerId', user.id);
      formData.append('partnerName', user.name);
      if (user.logoEntreprise) {
        formData.append('partnerLogo', user.logoEntreprise);
      }

      const res = await api.post('/vehicles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Véhicule ajouté:', res.data);

      // Reset form and close popup
      resetForm();
      setShowPopup(false);

      // Reload vehicles list
      await loadVehicles();

      setMessage('Véhicule ajouté avec succès!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur ajout véhicule:', err);
      console.error('Détails erreur:', err.response?.data);
      setMessage('Erreur lors de l\'ajout du véhicule: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const updateVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check for errors before submitting
    const hasErrors = Object.values(errors).some(error => error !== '');
    if (hasErrors) {
      setMessage('Veillez corriger les erreurs dans le formulaire.');
      setLoading(false);
      return;
    }

    // Basic validation for required fields
    // RETIRÉ 'kmRetour', 'description', 'remarques' des champs obligatoires
    const requiredFields = [
      'name', 'type', 'boiteVitesse', 'pricePerDay', 'carburant', 
      'niveauReservoir', 'matricule', 'kmDepart', // CHANGÉ ICI
      'assuranceStartDate', 'assuranceEndDate', 'vidangeInterval'
    ];

    const missingFields = requiredFields.filter(field => !vehicleForm[field]);
    if (missingFields.length > 0) {
      setMessage('Veillez remplir tous les champs obligatoires.');
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();

      // Append all form data
      Object.keys(vehicleForm).forEach(key => {
        if (vehicleForm[key] !== null && vehicleForm[key] !== '') {
          if (key === 'dommages' && Array.isArray(vehicleForm[key])) {
            // Handle damages array
            vehicleForm[key].forEach((damage, index) => {
              formData.append(`dommages[${index}]`, damage);
            });
          } else if (typeof vehicleForm[key] === 'boolean') {
            // Handle boolean fields
            formData.append(key, vehicleForm[key].toString());
          } else {
            formData.append(key, vehicleForm[key]);
          }
        }
      });

      const res = await api.put(`/vehicles/${editingVehicle._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      console.log('Véhicule modifié:', res.data);

      // Reset form and editing state
      resetForm();
      setShowPopup(false);

      // Reload vehicles list
      await loadVehicles();

      setMessage('Véhicule modifié avec succès!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur modification véhicule:', err);
      console.error('Détails erreur:', err.response?.data);
      setMessage('Erreur lors de la modification du véhicule: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (vehicleId) => {
    try {
      await api.delete(`/vehicles/${vehicleId}`);

      // Update local state immediately
      setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));

      setMessage('Véhicule supprimé avec succès!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur suppression véhicule:', err);
      setMessage('Erreur lors de la suppression du véhicule: ' + (err.response?.data?.message || err.message));
    }
  };

  const toggleVehicleAvailability = async (vehicleId, available) => {
    try {
      const res = await api.patch(`/vehicles/${vehicleId}`, { available });

      // Update local state immediately
      setVehicles(vehicles.map(vehicle =>
        vehicle._id === vehicleId ? { ...vehicle, available } : vehicle
      ));

      setMessage(`Véhicule ${available ? 'activé' : 'désactivé'} avec succès!`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Erreur changement statut véhicule:', err);
      setMessage('Erreur lors du changement de statut: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleAddVehicle = () => {
    resetForm();
    setIsEditing(false);
    setShowPopup(true);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setIsEditing(true);
    
    // Populate form with vehicle data
    setVehicleForm({
      name: vehicle.name || '',
      type: vehicle.type || '',
      boiteVitesse: vehicle.boiteVitesse || '',
      description: vehicle.description || '',
      image: null,
      existingImage: vehicle.image,
      pricePerDay: vehicle.pricePerDay || '',
      carburant: vehicle.carburant || '',
      niveauReservoir: vehicle.niveauReservoir || '',
      gps: vehicle.gps || false,
      mp3: vehicle.mp3 || false,
      cd: vehicle.cd || false,
      radio: vehicle.radio || false,
      matricule: vehicle.matricule || '', // CHANGÉ ICI
      kmDepart: vehicle.kmDepart || '',
      kmRetour: vehicle.kmRetour || '',
      impot2026: vehicle.impot2026 || false,
      impot2027: vehicle.impot2027 || false,
      impot2028: vehicle.impot2028 || false,
      impot2029: vehicle.impot2029 || false,
      assuranceStartDate: vehicle.assuranceStartDate ? vehicle.assuranceStartDate.split('T')[0] : '',
      assuranceEndDate: vehicle.assuranceEndDate ? vehicle.assuranceEndDate.split('T')[0] : '',
      vidangeInterval: vehicle.vidangeInterval || '',
      remarques: vehicle.remarques || '',
      dommages: vehicle.dommages || []
    });
    
    setImagePreview(null);
    setShowPopup(true);
    setErrors({});
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    resetForm();
  };

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Main Content */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Header with Add Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '600',
              color: '#333333',
              margin: 0
            }}>
              Gestion des Véhicules
            </h1>
            <p style={{
              color: '#666666',
              marginTop: '5px',
              fontSize: '14px'
            }}>
              Gérez votre flotte de véhicules
            </p>
          </div>
          
          <button
            onClick={handleAddVehicle}
            style={{
              padding: '12px 24px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(33, 150, 243, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(33, 150, 243, 0.4)';
              e.target.style.backgroundColor = '#1976D2';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(33, 150, 243, 0.3)';
              e.target.style.backgroundColor = '#2196F3';
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Ajouter un Véhicule
          </button>
        </div>

        {/* Vehicles List */}
        <VehiclesList
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={deleteVehicle}
          onToggleAvailability={toggleVehicleAvailability}
        />
      </div>

      {/* Popup Form */}
      {showPopup && (
        <VehicleFormPopup
          vehicleForm={vehicleForm}
          imagePreview={imagePreview}
          errors={errors}
          loading={loading}
          isEditing={isEditing}
          handleVehicleChange={handleVehicleChange}
          addVehicle={addVehicle}
          updateVehicle={updateVehicle}
          onClose={handleClosePopup}
          setVehicleForm={setVehicleForm}
          setImagePreview={setImagePreview}
          setErrors={setErrors}
        />
      )}
    </div>
  );
};

export default VehiclesManagement;