import React, { useEffect } from 'react';
// Importing icons from react-icons
import { 
  FaPencilAlt, 
  FaFileAlt, 
  FaTimes, 
  FaUser, 
  FaUsers, 
  FaCar, 
  FaMoneyBillWave, 
  FaCalendarAlt 
} from 'react-icons/fa';

const ContractForm = ({
  contractForm,
  vehicles,
  errors,
  loading,
  isEditing,
  handleContractChange,
  createContract,
  updateContract,
  setShowForm,
  setContractForm,
  setErrors
}) => {
  // Calculate total price when dates, vehicle, or custom price changes
  useEffect(() => {
    if (contractForm.vehicleId && contractForm.startDateTime && contractForm.endDateTime) {
      calculateTotalPrix();
    }
  }, [contractForm.vehicleId, contractForm.startDateTime, contractForm.endDateTime, contractForm.prixParJour]);

  const calculateTotalPrix = () => {
    if (!contractForm.startDateTime || !contractForm.endDateTime) return;

    const start = new Date(contractForm.startDateTime);
    const end = new Date(contractForm.endDateTime);

    // Calculate difference in days
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If same day, minimum 1 day
    const rentalDays = diffDays === 0 ? 1 : diffDays;

    const vehicle = vehicles.find(v => v._id === contractForm.vehicleId);
    if (vehicle && rentalDays > 0) {
      // Use custom price if set, otherwise use vehicle's price per day
      const prixParJour = contractForm.prixParJour || vehicle.pricePerDay;
      const total = rentalDays * prixParJour;
      setContractForm(prev => ({ ...prev, prixTotal: total }));
    } else {
      setContractForm(prev => ({ ...prev, prixTotal: 0 }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateContract(e);
    } else {
      createContract(e);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setContractForm({
      // Client information
      clientLastName: '',
      clientFirstName: '',
      clientBirthDate: '',
      clientPhone: '',
      clientAddress: '',
      clientPassport: '',
      clientCIN: '',
      clientLicenseNumber: '',
      clientLicenseIssueDate: '',

      // Second driver information
      secondDriverLastName: '',
      secondDriverFirstName: '',
      secondDriverLicenseNumber: '',
      secondDriverLicenseIssueDate: '',

      // Rental information
      vehicleId: '',
      startDateTime: '',
      endDateTime: '',
      startLocation: '',
      endLocation: '',
      prixParJour: '', // Custom price per day (optional)
      prixTotal: 0
    });
    setErrors({});
  };

  const getSelectedVehicle = () => {
    return vehicles.find(v => v._id === contractForm.vehicleId);
  };

  // Handle vehicle selection change
  const handleVehicleChange = (e) => {
    const vehicleId = e.target.value;
    const vehicle = vehicles.find(v => v._id === vehicleId);

    // Update form with vehicle data
    setContractForm(prev => ({
      ...prev,
      vehicleId: vehicleId,
      prixParJour: vehicle ? vehicle.pricePerDay : '' // Set default price from vehicle
    }));
  };

  // Calculate rental days for display
  const calculateRentalDays = () => {
    if (!contractForm.startDateTime || !contractForm.endDateTime) return 0;

    const start = new Date(contractForm.startDateTime);
    const end = new Date(contractForm.endDateTime);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays === 0 ? 1 : diffDays;
  };

  // Get current price per day (custom or from vehicle)
  const getCurrentPricePerDay = () => {
    const vehicle = getSelectedVehicle();
    return contractForm.prixParJour || (vehicle ? vehicle.pricePerDay : 0);
  };

  return (
    <div className="contract-form-wrapper">
      <form onSubmit={handleSubmit} className="contract-form">
        {/* Header */}
        <div className="form-header">
          <div className="header-content">
            <div className="header-icon">
              {isEditing ? <FaPencilAlt /> : <FaFileAlt />}
            </div>
            <div className="header-text">
              <h1>{isEditing ? 'Modifier le Contrat' : 'Créer un Nouveau Contrat'}</h1>
              <p>{isEditing ? 'Modifiez les informations du contrat ci-dessous' : 'Remplissez les informations pour créer un nouveau contrat'}</p>
            </div>
          </div>
          <div className="header-actions">
            <button type="button" onClick={handleCancel} className="close-btn">
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="form-main">
          <div className="form-container">
            {/* Left Column - Client Information */}
            <div className="form-column">
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon"><FaUser /></div>
                  <h3>Informations du Locataire Principal</h3>
                </div>
                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom</label>
                      <input
                        type="text"
                        name="clientLastName"
                        value={contractForm.clientLastName}
                        onChange={handleContractChange}
                        className={errors.clientLastName ? 'error' : ''}
                      />
                      {errors.clientLastName && <span className="error-message">{errors.clientLastName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Prénom</label>
                      <input
                        type="text"
                        name="clientFirstName"
                        value={contractForm.clientFirstName}
                        onChange={handleContractChange}
                        className={errors.clientFirstName ? 'error' : ''}
                      />
                      {errors.clientFirstName && <span className="error-message">{errors.clientFirstName}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date de Naissance</label>
                      <input
                        type="date"
                        name="clientBirthDate"
                        value={contractForm.clientBirthDate}
                        onChange={handleContractChange}
                        className={errors.clientBirthDate ? 'error' : ''}
                      />
                      {errors.clientBirthDate && <span className="error-message">{errors.clientBirthDate}</span>}
                    </div>
                    <div className="form-group">
                      <label>Téléphone</label>
                      <input
                        type="tel"
                        name="clientPhone"
                        value={contractForm.clientPhone}
                        onChange={handleContractChange}
                        className={errors.clientPhone ? 'error' : ''}
                      />
                      {errors.clientPhone && <span className="error-message">{errors.clientPhone}</span>}
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Adresse au Maroc</label>
                    <input
                      type="text"
                      name="clientAddress"
                      value={contractForm.clientAddress}
                      onChange={handleContractChange}
                      className={errors.clientAddress ? 'error' : ''}
                    />
                    {errors.clientAddress && <span className="error-message">{errors.clientAddress}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Passeport</label>
                      <input
                        type="text"
                        name="clientPassport"
                        value={contractForm.clientPassport}
                        onChange={handleContractChange}
                        className={errors.clientPassport ? 'error' : ''}
                      />
                      {errors.clientPassport && <span className="error-message">{errors.clientPassport}</span>}
                    </div>
                    <div className="form-group">
                      <label>CIN</label>
                      <input
                        type="text"
                        name="clientCIN"
                        value={contractForm.clientCIN}
                        onChange={handleContractChange}
                        className={errors.clientCIN ? 'error' : ''}
                      />
                      {errors.clientCIN && <span className="error-message">{errors.clientCIN}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Permis de Conduire N°</label>
                      <input
                        type="text"
                        name="clientLicenseNumber"
                        value={contractForm.clientLicenseNumber}
                        onChange={handleContractChange}
                        className={errors.clientLicenseNumber ? 'error' : ''}
                      />
                      {errors.clientLicenseNumber && <span className="error-message">{errors.clientLicenseNumber}</span>}
                    </div>
                    <div className="form-group">
                      <label>Délivré le</label>
                      <input
                        type="date"
                        name="clientLicenseIssueDate"
                        value={contractForm.clientLicenseIssueDate}
                        onChange={handleContractChange}
                        className={errors.clientLicenseIssueDate ? 'error' : ''}
                      />
                      {errors.clientLicenseIssueDate && <span className="error-message">{errors.clientLicenseIssueDate}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Second Driver Information */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon"><FaUsers /></div>
                  <h3>Informations du Deuxième Conducteur</h3>
                </div>
                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nom</label>
                      <input
                        type="text"
                        name="secondDriverLastName"
                        value={contractForm.secondDriverLastName}
                        onChange={handleContractChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Prénom</label>
                      <input
                        type="text"
                        name="secondDriverFirstName"
                        value={contractForm.secondDriverFirstName}
                        onChange={handleContractChange}
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Permis de Conduire N°</label>
                      <input
                        type="text"
                        name="secondDriverLicenseNumber"
                        value={contractForm.secondDriverLicenseNumber}
                        onChange={handleContractChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Délivré le</label>
                      <input
                        type="date"
                        name="secondDriverLicenseIssueDate"
                        value={contractForm.secondDriverLicenseIssueDate}
                        onChange={handleContractChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Vehicle & Rental Information */}
            <div className="form-column">
              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon"><FaCar /></div>
                  <h3>Sélection du Véhicule</h3>
                </div>
                <div className="form-fields">
                  <div className="form-group full-width">
                    <label>Véhicule</label>
                    <select
                      name="vehicleId"
                      value={contractForm.vehicleId}
                      onChange={handleVehicleChange}
                      className={errors.vehicleId ? 'error' : ''}
                    >
                      <option value="">Sélectionnez un véhicule</option>
                      {vehicles
                        .filter(vehicle => vehicle.available)
                        .map(vehicle => (
                          <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.name} - {vehicle.type} - {vehicle.boiteVitesse} - {vehicle.carburant} - {vehicle.pricePerDay}€/jour
                          </option>
                        ))
                      }
                    </select>
                    {errors.vehicleId && <span className="error-message">{errors.vehicleId}</span>}
                  </div>

                  {/* Selected Vehicle Info */}
                  {contractForm.vehicleId && getSelectedVehicle() && (
                    <div className="selected-vehicle">
                      <div className="vehicle-header">
                        <h4>Informations du Véhicule</h4>
                      </div>
                      <div className="vehicle-content">
                        <div className="vehicle-image">
                          {getSelectedVehicle().image && (
                            <img src={getSelectedVehicle().image} alt={getSelectedVehicle().name} />
                          )}
                        </div>
                        <div className="vehicle-info">
                          <div className="vehicle-name">{getSelectedVehicle().name}</div>
                          <div className="vehicle-specs">
                            <div className="spec-item">
                              <span className="spec-label">Type</span>
                              <span className="spec-value">{getSelectedVehicle().type}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Boîte</span>
                              <span className="spec-value">{getSelectedVehicle().boiteVitesse}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Carburant</span>
                              <span className="spec-value">{getSelectedVehicle().carburant}</span>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">Prix/jour</span>
                              <span className="spec-value">{getSelectedVehicle().pricePerDay}€</span>
                            </div>
                          </div>
                          <div className="vehicle-equipment">
                            <div className={`equipment-item ${getSelectedVehicle().radio ? 'available' : ''}`}>
                              Radio
                            </div>
                            <div className={`equipment-item ${getSelectedVehicle().gps ? 'available' : ''}`}>
                              GPS
                            </div>
                            <div className={`equipment-item ${getSelectedVehicle().mp3 ? 'available' : ''}`}>
                              MP3
                            </div>
                            <div className={`equipment-item ${getSelectedVehicle().cd ? 'available' : ''}`}>
                              CD
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon"><FaMoneyBillWave /></div>
                  <h3>Configuration du Prix</h3>
                </div>
                <div className="form-fields">
                  <div className="form-group">
                    <label>Prix par Jour (€)</label>
                    <input
                      type="number"
                      name="prixParJour"
                      value={contractForm.prixParJour || (getSelectedVehicle() ? getSelectedVehicle().pricePerDay : '')}
                      onChange={handleContractChange}
                      placeholder={getSelectedVehicle() ? `Prix par défaut: ${getSelectedVehicle().pricePerDay}€` : 'Sélectionnez un véhicule'}
                      min="0"
                      step="0.01"
                    />
                    <small>
                      {getSelectedVehicle() && `Prix par défaut: ${getSelectedVehicle().pricePerDay}€`}
                    </small>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <div className="section-header">
                  <div className="section-icon"><FaCalendarAlt /></div>
                  <h3>Période et Lieux de Location</h3>
                </div>
                <div className="form-fields">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date et Heure de Départ</label>
                      <input
                        type="datetime-local"
                        name="startDateTime"
                        value={contractForm.startDateTime}
                        onChange={handleContractChange}
                        className={errors.startDateTime ? 'error' : ''}
                        min={new Date().toISOString().slice(0, 16)}
                      />
                      {errors.startDateTime && <span className="error-message">{errors.startDateTime}</span>}
                    </div>
                    <div className="form-group">
                      <label>Date et Heure de Retour</label>
                      <input
                        type="datetime-local"
                        name="endDateTime"
                        value={contractForm.endDateTime}
                        onChange={handleContractChange}
                        className={errors.endDateTime ? 'error' : ''}
                        min={contractForm.startDateTime || new Date().toISOString().slice(0, 16)}
                      />
                      {errors.endDateTime && <span className="error-message">{errors.endDateTime}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Lieu de Départ</label>
                      <input
                        type="text"
                        name="startLocation"
                        value={contractForm.startLocation}
                        onChange={handleContractChange}
                        className={errors.startLocation ? 'error' : ''}
                      />
                      {errors.startLocation && <span className="error-message">{errors.startLocation}</span>}
                    </div>
                    <div className="form-group">
                      <label>Lieu de Retour</label>
                      <input
                        type="text"
                        name="endLocation"
                        value={contractForm.endLocation}
                        onChange={handleContractChange}
                        className={errors.endLocation ? 'error' : ''}
                      />
                      {errors.endLocation && <span className="error-message">{errors.endLocation}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="price-summary">
          <div className="price-content">
            <h3>Récapitulatif du Prix</h3>
            {contractForm.startDateTime && contractForm.endDateTime && contractForm.vehicleId ? (
              <div className="price-details">
                <div className="price-item">
                  <span className="price-label">Durée de location</span>
                  <span className="price-value">{calculateRentalDays()} jour(s)</span>
                </div>
                <div className="price-item">
                  <span className="price-label">Prix par jour</span>
                  <span className="price-value">{getCurrentPricePerDay()}€</span>
                </div>
                <div className="price-total">
                  <span className="price-label">Prix Total</span>
                  <span className="price-value">{contractForm.prixTotal}€</span>
                </div>
              </div>
            ) : (
              <p>Sélectionnez un véhicule et les dates pour calculer le prix</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'En cours...' : (isEditing ? 'Mettre à jour' : 'Créer le Contrat')}
          </button>
          <button type="button" className="btn-secondary" onClick={handleCancel} disabled={loading}>
            Annuler
          </button>
        </div>
      </form>

      <style>{`
        .contract-form-wrapper {
          width: 100%;
          background-color: #181A20;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .contract-form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .form-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 32px;
          background-color: #1E2329;
          border-bottom: 1px solid #2B3139;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          width: 56px;
          height: 56px;
          background-color: #FCD535;
          color: #000;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        
        .header-icon svg {
            width: 24px;
            height: 24px;
        }

        .header-text h1 {
          margin: 0 0 4px 0;
          font-size: 24px;
          font-weight: 600;
          color: #fff;
        }

        .header-text p {
          margin: 0;
          color: #848E9C;
          font-size: 14px;
        }

        .close-btn {
          width: 40px;
          height: 40px;
          background-color: #2B3139;
          border: none;
          border-radius: 50%;
          color: #848E9C;
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background-color: #3B414A;
          color: #fff;
        }
        
        .close-btn svg {
            width: 18px;
            height: 18px;
        }

        .form-main {
          padding: 32px;
        }

        .form-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .form-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-section {
          background-color: #1E2329;
          border-radius: 12px;
          padding: 24px;
          border: 1px solid #2B3139;
        }

        .section-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #2B3139;
        }

        .section-icon {
          width: 36px;
          height: 36px;
          background-color: #2B3139;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #FCD535;
        }
        
        .section-icon svg {
            width: 18px;
            height: 18px;
        }

        .section-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #FCD535;
        }

        .form-fields {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 500;
          color: #848E9C;
        }

        .form-group input,
        .form-group select {
          padding: 10px 12px;
          background-color: #2B3139;
          border: 1px solid #3B414A;
          border-radius: 6px;
          color: #EAECEF;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #FCD535;
          box-shadow: 0 0 0 3px rgba(252, 213, 53, 0.1);
        }

        .form-group input.error,
        .form-group select.error {
          border-color: #EF4444;
        }

        .form-group small {
          margin-top: 4px;
          font-size: 12px;
          color: #848E9C;
        }

        .error-message {
          margin-top: 4px;
          font-size: 12px;
          color: #EF4444;
        }

        .selected-vehicle {
          background-color: #2B3139;
          border-radius: 8px;
          padding: 16px;
          margin-top: 16px;
        }

        .vehicle-header h4 {
          margin: 0 0 12px 0;
          font-size: 14px;
          color: #FCD535;
        }

        .vehicle-content {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 16px;
        }

        .vehicle-image img {
          width: 100%;
          height: 90px;
          object-fit: cover;
          border-radius: 6px;
        }

        .vehicle-name {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 8px;
        }

        .vehicle-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
          margin-bottom: 12px;
        }

        .spec-item {
          display: flex;
          justify-content: space-between;
          padding: 4px 0;
        }

        .spec-label {
          color: #848E9C;
          font-size: 12px;
        }

        .spec-value {
          color: #EAECEF;
          font-size: 12px;
          font-weight: 500;
        }

        .vehicle-equipment {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .equipment-item {
          padding: 4px 8px;
          background-color: #3B414A;
          border-radius: 4px;
          font-size: 11px;
          color: #848E9C;
        }

        .equipment-item.available {
          background-color: rgba(252, 213, 53, 0.2);
          color: #FCD535;
        }

        .price-summary {
          background-color: #1E2329;
          padding: 24px 32px;
          border-top: 1px solid #2B3139;
        }

        .price-content h3 {
          margin: 0 0 16px 0;
          font-size: 16px;
          font-weight: 600;
          color: #FCD535;
        }

        .price-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .price-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #2B3139;
        }

        .price-total {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: none;
          border-top: 1px solid #2B3139;
          margin-top: 8px;
        }

        .price-label {
          color: #848E9C;
          font-size: 14px;
        }

        .price-value {
          color: #EAECEF;
          font-size: 14px;
          font-weight: 500;
        }

        .price-total .price-value {
          color: #FCD535;
          font-size: 18px;
          font-weight: 600;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 24px 32px;
          background-color: #1E2329;
          border-top: 1px solid #2B3139;
        }

        .btn-primary,
        .btn-secondary {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background-color: #FCD535;
          color: #000;
        }

        .btn-primary:hover:not(:disabled) {
          background-color: #e5c030;
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-secondary {
          background-color: #2B3139;
          color: #EAECEF;
        }

        .btn-secondary:hover:not(:disabled) {
          background-color: #3B414A;
        }

        .btn-secondary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
          .form-container {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 768px) {
          .form-header {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
          }

          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .form-main {
            padding: 20px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .vehicle-content {
            grid-template-columns: 1fr;
          }

          .vehicle-specs {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .form-section {
            padding: 16px;
          }

          .form-header {
            padding: 16px;
          }

          .form-main {
            padding: 16px;
          }

          .price-summary {
            padding: 16px;
          }

          .form-actions {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContractForm;