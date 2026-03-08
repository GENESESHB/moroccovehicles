import React from 'react';
import { 
  FaCar, 
  FaShieldAlt, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaHourglassHalf,
  FaTimesCircle 
} from 'react-icons/fa';

const InsuranceList = ({
  vehicles,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Non définie';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysRemaining = (endDate) => {
    if (!endDate) return null;

    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const getTimeRemaining = (endDate) => {
    if (!endDate) return null;

    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;

    // If already expired
    if (diffTime < 0) {
      return {
        text: 'Expirée',
        color: '#ef4444',
        bgColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.3)'
      };
    }

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If expires today
    if (diffDays === 0) {
      return {
        text: "Aujourd'hui",
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgba(245, 158, 11, 0.3)'
      };
    }

    // If expires within a week
    if (diffDays <= 7) {
      return {
        text: `${diffDays} jour(s)`,
        color: '#f59e0b',
        bgColor: 'rgba(245, 158, 11, 0.1)',
        borderColor: 'rgba(245, 158, 11, 0.3)'
      };
    }

    // If expires within a month
    if (diffDays <= 30) {
      return {
        text: `${diffDays} jour(s)`,
        color: '#FCD535',
        bgColor: 'rgba(252, 213, 53, 0.1)',
        borderColor: 'rgba(252, 213, 53, 0.3)'
      };
    }

    // More than a month - Using Requested Green Color
    return {
      text: `${diffDays} jour(s)`,
      color: '#36c275',
      bgColor: 'rgba(54, 194, 117, 0.1)',
      borderColor: 'rgba(54, 194, 117, 0.3)'
    };
  };

  const getStatusConfig = (status, endDate) => {
    const timeRemaining = getTimeRemaining(endDate);

    const configs = {
      'active': {
        color: '#36c275', // Updated to Requested Green
        label: 'Active',
        icon: <FaCheckCircle />
      },
      'pending': {
        color: '#f59e0b',
        label: 'En attente',
        icon: <FaHourglassHalf />
      },
      'expired': {
        color: '#ef4444',
        label: 'Expirée',
        icon: <FaTimesCircle />
      },
      'no-insurance': {
        color: '#6b7280',
        label: 'Non assuré',
        icon: <FaExclamationCircle />
      }
    };

    const config = configs[status] || configs['no-insurance'];
    
    // Add time remaining for active insurance
    if (status === 'active' && timeRemaining) {
      config.timeRemaining = timeRemaining;
    }

    return config;
  };

  if (vehicles.length === 0) {
    return (
      <div className="insurance-list-container">
        <div className="filters-section">
          <div className="filters">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Assurances actives</option>
              <option value="pending">En attente</option>
              <option value="expired">Expirées</option>
              <option value="no-insurance">Non assurés</option>
            </select>

            <input
              type="text"
              placeholder="Rechercher un véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="empty-state">
          <div className="empty-icon"><FaShieldAlt /></div>
          <h3>Aucun véhicule trouvé</h3>
          <p>Aucun véhicule ne correspond à vos critères de recherche</p>
        </div>
      </div>
    );
  }

  return (
    <div className="insurance-list-container">
      {/* Header */}
      <div className="list-header">
        <div className="header-content">
          <h1>Gestion des Assurances</h1>
          <p>Suivez les périodes d'assurance de votre flotte</p>
        </div>
        <div className="header-icon" style={{ color: '#36c275' }}>
            <FaShieldAlt />
        </div>
      </div>

      {/* Filters and Search */}
      <div className="filters-section">
        <div className="filters">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Assurances actives</option>
            <option value="pending">En attente</option>
            <option value="expired">Expirées</option>
            <option value="no-insurance">Non assurés</option>
          </select>

          <input
            type="text"
            placeholder="Rechercher un véhicule..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="stats">
          <span>{vehicles.length} véhicule(s) trouvé(s)</span>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="vehicles-grid">
        {vehicles.map(vehicle => {
          const statusConfig = getStatusConfig(vehicle.insuranceInfo.status, vehicle.insuranceInfo.endDate);

          return (
            <div key={vehicle._id} className="vehicle-card">
              {/* Vehicle Header */}
              <div className="card-header">
                <div className="vehicle-image">
                  {vehicle.image ? (
                    <img src={vehicle.image} alt={vehicle.name} />
                  ) : (
                    <div className="no-image"><FaCar /></div>
                  )}
                </div>
                <div className="vehicle-info">
                  <h3>{vehicle.name}</h3>
                  <p>{vehicle.type} • {vehicle.boiteVitesse}</p>
                  {vehicle.matricule && (
                    <div className="matricule">{vehicle.matricule}</div>
                  )}
                </div>
                <div className="status-badge" style={{
                  backgroundColor: statusConfig.color,
                  opacity: 0.2,
                  color: statusConfig.color
                }}>
                  {statusConfig.icon}
                </div>
              </div>

              {/* Insurance Information - Focused on Time Remaining */}
              <div className="insurance-info">
                <div className="time-remaining-section">
                  <div className="time-label">Temps restant</div>
                  {vehicle.insuranceInfo.status === 'active' && vehicle.insuranceInfo.endDate && (
                    <div className="time-remaining" style={{
                      backgroundColor: statusConfig.timeRemaining?.bgColor,
                      borderColor: statusConfig.timeRemaining?.borderColor,
                      color: statusConfig.timeRemaining?.color
                    }}>
                      <div className="time-value">
                        {statusConfig.timeRemaining?.text}
                      </div>
                      <div className="time-date">
                         <FaCalendarAlt style={{marginRight: '5px', fontSize: '12px'}}/>
                         {formatDate(vehicle.insuranceInfo.endDate)}
                      </div>
                    </div>
                  )}
                  {vehicle.insuranceInfo.status === 'expired' && (
                    <div className="time-remaining expired">
                      <div className="time-value">
                        Expirée depuis {Math.abs(getDaysRemaining(vehicle.insuranceInfo.endDate))} jour(s)
                      </div>
                      <div className="time-date">
                        <FaCalendarAlt style={{marginRight: '5px', fontSize: '12px'}}/>
                        {formatDate(vehicle.insuranceInfo.endDate)}
                      </div>
                    </div>
                  )}
                  {vehicle.insuranceInfo.status === 'pending' && (
                    <div className="time-remaining pending">
                      <div className="time-value">
                        Commence dans {getDaysRemaining(vehicle.insuranceInfo.startDate)} jour(s)
                      </div>
                      <div className="time-date">
                        <FaCalendarAlt style={{marginRight: '5px', fontSize: '12px'}}/>
                        {formatDate(vehicle.insuranceInfo.startDate)}
                      </div>
                    </div>
                  )}
                  {vehicle.insuranceInfo.status === 'no-insurance' && (
                    <div className="time-remaining no-insurance">
                      <div className="time-value">
                        Non assuré
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Bar for Active Insurance */}
                {vehicle.insuranceInfo.startDate && vehicle.insuranceInfo.endDate && vehicle.insuranceInfo.status === 'active' && (
                  <div className="progress-section">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${Math.max(0, Math.min(100, (getDaysRemaining(vehicle.insuranceInfo.endDate) / 365) * 100))}%`,
                          backgroundColor: statusConfig.timeRemaining?.color || '#36c275'
                        }}
                      ></div>
                    </div>
                    <div className="progress-labels">
                      <span>Début: {formatDate(vehicle.insuranceInfo.startDate)}</span>
                      <span>Fin: {formatDate(vehicle.insuranceInfo.endDate)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .insurance-list-container {
          background-color: #1E2329; /* Match ContractCard/Blacklist */
          color: #EAECEF;
          padding: 24px;
          border-radius: 12px;
        }

        .list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding: 24px;
          background-color: #2B3139; /* Slightly lighter for header */
          border-radius: 12px;
          border: 1px solid #363e4a;
        }

        .header-content h1 {
          margin: 0 0 8px 0;
          font-size: 24px;
          font-weight: 600;
          color: #FCD535;
        }

        .header-content p {
          margin: 0;
          color: #848E9C;
          font-size: 14px;
        }

        .header-icon {
          font-size: 36px; /* Reduced size for icon */
          display: flex;
          align-items: center;
            justify-content: center;
        }

        .filters-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding: 20px;
          background-color: #2B3139;
          border-radius: 12px;
          border: 1px solid #363e4a;
        }

        .filters {
          display: flex;
          gap: 12px;
        }

        .filter-select,
        .search-input {
          padding: 10px 16px;
          background-color: #1E2329;
          border: 1px solid #3B414A;
          border-radius: 8px;
          color: #EAECEF;
          font-size: 14px;
          transition: border-color 0.2s ease;
        }

        .filter-select:focus,
        .search-input:focus {
          outline: none;
          border-color: #FCD535;
        }

        .search-input {
          width: 250px;
        }

        .stats {
          color: #848E9C;
          font-size: 14px;
        }

        .vehicles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 20px;
        }

        .vehicle-card {
          background-color: #2B3139;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #363e4a;
          transition: all 0.3s ease;
        }

        .vehicle-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          border-color: #36c275;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 12px;
        }

        .vehicle-image {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
          background-color: #1E2329;
          display: flex;
          align-items: center;
            justify-content: center;
        }

        .vehicle-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .no-image {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
            color: #36c275; /* Requested Green */
            font-size: 24px;
        }

        .vehicle-info {
          flex: 1;
        }

        .vehicle-info h3 {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 600;
          color: #EAECEF;
        }

        .vehicle-info p {
          margin: 0 0 4px 0;
          font-size: 14px;
          color: #848E9C;
        }

        .matricule {
          background-color: #1E2329;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 12px;
          color: #FCD535;
          display: inline-block;
        }

        .status-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
            font-size: 16px;
        }
        
        .status-badge svg {
            width: 18px;
            height: 18px;
        }

        .insurance-info {
          background-color: #1E2329;
          border-radius: 8px;
          padding: 16px;
        }

        .time-remaining-section {
          margin-bottom: 16px;
        }

        .time-label {
          font-size: 12px;
          color: #848E9C;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .time-remaining {
          padding: 12px;
          border-radius: 8px;
          border: 1px solid;
          text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
        }

        .time-remaining.expired {
          border-color: rgba(239, 68, 68, 0.3);
            background-color: rgba(239, 68, 68, 0.05);
        }

        .time-remaining.pending {
          border-color: rgba(245, 158, 11, 0.3);
            background-color: rgba(245, 158, 11, 0.05);
        }

        .time-remaining.no-insurance {
          border-color: rgba(107, 114, 128, 0.3);
            background-color: rgba(107, 114, 128, 0.05);
        }

        .time-value {
          font-size: 18px;
          font-weight: 600;
        }

        .time-date {
          font-size: 12px;
            opacity: 0.9;
            display: flex;
            align-items: center;
        }

        .progress-section {
          margin-top: 12px;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background-color: #2B3139;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 8px;
        }

        .progress-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #848E9C;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          text-align: center;
          background-color: #2B3139;
          border-radius: 12px;
            border: 1px solid #363e4a;
        }

        .empty-icon {
            font-size: 48px;
            margin-bottom: 16px;
            color: #3B414A;
        }

        .empty-state h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          color: #EAECEF;
        }

        .empty-state p {
          margin: 0;
          color: #848E9C;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .insurance-list-container {
            padding: 16px;
          }

          .list-header {
            flex-direction: column;
            gap: 16px;
            text-align: center;
            padding: 16px;
          }

          .filters-section {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
          }

          .filters {
            width: 100%;
            justify-content: space-between;
          }

          .search-input {
            width: 100%;
          }

          .vehicles-grid {
            grid-template-columns: 1fr;
          }

          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }

          .status-badge {
            align-self: flex-start;
            margin-top: 8px;
          }
        }

        @media (max-width: 480px) {
          .filters {
            flex-direction: column;
            gap: 8px;
          }

          .filter-select,
          .search-input {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default InsuranceList;