import React, { useState, useEffect } from 'react';
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
  FaCarSide
} from 'react-icons/fa';

const ContractList = ({ contract, vehicles, onEdit, onDelete, onDownload, onUpdateStatus }) => {
  const [daysRemaining, setDaysRemaining] = useState(null);
  const [contractStatus, setContractStatus] = useState(contract.status || 'pending');
  const [showActions, setShowActions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);

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
      case 'pending': return { bg: '#fef3c7', text: '#92400e', border: '#fbbf24' };
      case 'active': return { bg: '#d1fae5', text: '#065f46', border: '#10b981' };
      case 'completed': return { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' };
      default: return { bg: '#f3f4f6', text: '#374151', border: '#9ca3af' };
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

  const clientInfo = getClientInfo();
  const vehicleInfo = getVehicleInfo();
  const rentalInfo = getRentalInfo();

  const startDate = new Date(rentalInfo.startDate);
  const endDate = new Date(rentalInfo.endDate);
  const statusColors = getStatusColor();

  return (
    <div className="contract-list-item" onMouseLeave={() => {
      setShowActions(false);
      setShowStatusOptions(false);
    }}>
      {/* Vehicle Information */}
      <div className="list-cell vehicle-cell">
        <div className="vehicle-info">
          <div className="vehicle-image">
            {vehicleInfo.image ? (
              <img src={vehicleInfo.image} alt={vehicleInfo.name} />
            ) : (
              <div className="no-image">
                <FaCarSide />
              </div>
            )}
          </div>
          <div className="vehicle-details">
            <div className="vehicle-name">{vehicleInfo.name || 'Véhicule non spécifié'}</div>
            <div className="vehicle-meta">
              {vehicleInfo.brand && <span>{vehicleInfo.brand}</span>}
              {vehicleInfo.model && <span> • {vehicleInfo.model}</span>}
              {vehicleInfo.year && <span> • {vehicleInfo.year}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="list-cell client-cell">
        <div className="client-info">
          <div className="client-name">
            <FaUser /> {clientInfo.name}
          </div>
          <div className="client-contact">
            <div className="contact-item">
              <FaPhone /> {clientInfo.phone}
            </div>
            {clientInfo.cin && clientInfo.cin !== 'Non spécifié' && (
              <div className="contact-item">
                <FaIdCard /> {clientInfo.cin}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rental Period */}
      <div className="list-cell period-cell">
        <div className="period-info">
          <div className="period-dates">
            <div className="date-item">
              <div className="date-label">Début</div>
              <div className="date-value">{startDate.toLocaleDateString('fr-FR')}</div>
            </div>
            <div className="date-separator">→</div>
            <div className="date-item">
              <div className="date-label">Fin</div>
              <div className="date-value">{endDate.toLocaleDateString('fr-FR')}</div>
            </div>
          </div>
          <div className="period-duration">
            <FaClock /> {rentalInfo.rentalDays} jour{rentalInfo.rentalDays !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Locations */}
      <div className="list-cell location-cell">
        <div className="location-info">
          <div className="location-item">
            <FaMapMarkerAlt /> {rentalInfo.startLocation}
          </div>
          <div className="location-item">
            <FaMapMarkerAlt /> {rentalInfo.endLocation}
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="list-cell price-cell">
        <div className="price-info">
          <div className="daily-price">
            <FaMoneyBillWave /> {rentalInfo.prixParJour} DH/jour
          </div>
          <div className="total-price">
            {rentalInfo.prixTotal} DH
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="list-cell status-cell">
        <div className="status-container">
          <div 
            className="status-badge" 
            style={{ 
              backgroundColor: statusColors.bg,
              color: statusColors.text,
              border: `1px solid ${statusColors.border}`
            }}
            onClick={() => setShowStatusOptions(!showStatusOptions)}
          >
            {getStatusText()}
            {daysRemaining !== null && contractStatus === 'active' && (
              <span className="days-remaining">
                ({daysRemaining}j)
              </span>
            )}
          </div>
          
          {showStatusOptions && (
            <div className="status-dropdown">
              {contractStatus !== 'active' && (
                <button className="dropdown-item" onClick={() => handleStatusChange('active')}>
                  Marquer comme actif
                </button>
              )}
              {contractStatus !== 'completed' && (
                <button className="dropdown-item" onClick={() => handleStatusChange('completed')}>
                  Marquer comme terminé
                </button>
              )}
              {contractStatus !== 'cancelled' && (
                <button className="dropdown-item" onClick={() => handleStatusChange('cancelled')}>
                  Annuler le contrat
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="list-cell actions-cell">
        <div className="actions-container">
          <button 
            className="action-btn more" 
            onClick={() => setShowActions(!showActions)}
            onMouseEnter={() => setShowActions(true)}
          >
            <FaEllipsisV />
          </button>
          
          {showActions && (
            <div className="action-dropdown">
              <button className="dropdown-item" onClick={() => onEdit(contract)}>
                <FaPencilAlt /> Modifier
              </button>
              <button className="dropdown-item" onClick={() => onDownload(contract)}>
                <FaFileDownload /> Télécharger
              </button>
              {contractStatus !== 'active' && contractStatus !== 'completed' && (
                <button className="dropdown-item delete" onClick={handleDelete}>
                  <FaTrashAlt /> Supprimer
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .contract-list-item {
          background: white;
          border-radius: 8px;
          padding: 16px;
          display: grid;
          grid-template-columns: 1.5fr 1.2fr 1.2fr 1fr 1fr auto auto;
          gap: 16px;
          align-items: center;
          border: 1px solid #e5e7eb;
          margin-bottom: 8px;
          transition: all 0.2s ease;
          position: relative;
        }

        .contract-list-item:hover {
          background: #f9fafb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .list-cell {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
        }

        /* Vehicle Cell */
        .vehicle-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .vehicle-image {
          width: 50px;
          height: 50px;
          border-radius: 6px;
          overflow: hidden;
          background: #f3f4f6;
          flex-shrink: 0;
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
          color: #9ca3af;
        }

        .no-image svg {
          width: 24px;
          height: 24px;
        }

        .vehicle-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .vehicle-meta {
          font-size: 12px;
          color: #6b7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Client Cell */
        .client-name {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .client-name svg {
          width: 12px;
          height: 12px;
          color: #9ca3af;
        }

        .client-contact {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .contact-item {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .contact-item svg {
          width: 10px;
          height: 10px;
          color: #9ca3af;
        }

        /* Period Cell */
        .period-dates {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
        }

        .date-item {
          display: flex;
          flex-direction: column;
        }

        .date-label {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .date-value {
          font-size: 13px;
          font-weight: 600;
          color: #111827;
          white-space: nowrap;
        }

        .date-separator {
          color: #9ca3af;
          font-weight: 600;
          font-size: 12px;
        }

        .period-duration {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .period-duration svg {
          width: 10px;
          height: 10px;
        }

        /* Location Cell */
        .location-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .location-item {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .location-item svg {
          width: 10px;
          height: 10px;
          color: #9ca3af;
          flex-shrink: 0;
        }

        /* Price Cell */
        .price-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .daily-price {
          font-size: 12px;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        }

        .daily-price svg {
          width: 10px;
          height: 10px;
          color: #9ca3af;
        }

        .total-price {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
        }

        /* Status Cell */
        .status-container {
          position: relative;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 16px;
          font-size: 11px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          justify-content: center;
          min-width: 80px;
        }

        .status-badge:hover {
          transform: scale(1.05);
        }

        .days-remaining {
          font-size: 10px;
          opacity: 0.9;
        }

        .status-dropdown {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-top: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
          min-width: 180px;
          overflow: hidden;
        }

        /* Actions Cell */
        .actions-container {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .action-btn.more {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border: none;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn.more:hover {
          background: #e5e7eb;
        }

        .action-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          z-index: 100;
          min-width: 160px;
          overflow: hidden;
        }

        .dropdown-item {
          width: 100%;
          padding: 10px 12px;
          text-align: left;
          background: none;
          border: none;
          font-size: 12px;
          color: #374151;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }

        .dropdown-item:hover {
          background: #f9fafb;
        }

        .dropdown-item.delete {
          color: #dc2626;
        }

        .dropdown-item svg {
          width: 12px;
          height: 12px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .contract-list-item {
            grid-template-columns: 1.5fr 1fr 1fr auto auto auto;
          }
          .location-cell {
            display: none;
          }
        }

        @media (max-width: 992px) {
          .contract-list-item {
            grid-template-columns: 1fr 1fr auto auto;
            gap: 12px;
          }
          .location-cell, .price-cell {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .contract-list-item {
            grid-template-columns: 1fr auto auto;
            padding: 12px;
          }
          .period-cell, .price-cell {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .contract-list-item {
            grid-template-columns: 1fr auto;
            gap: 8px;
          }
          .client-cell {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default ContractList;