import React, { useState, useRef } from 'react';
import {
  FaShieldAlt,
  FaCar,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaSearch,
  FaFilter,
  FaEllipsisV,
  FaPrint,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaPlus,
  FaRobot
} from 'react-icons/fa';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
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
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getTimeRemaining = (endDate) => {
  if (!endDate) return null;
  const end = new Date(endDate);
  const now = new Date();
  const diffTime = end - now;
  if (diffTime < 0) {
    return {
      text: 'Expirée',
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)'
    };
  }
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) {
    return {
      text: "Aujourd'hui",
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)'
    };
  }
  if (diffDays <= 7) {
    return {
      text: `${diffDays} jour(s)`,
      color: '#f59e0b',
      bgColor: 'rgba(245, 158, 11, 0.1)',
      borderColor: 'rgba(245, 158, 11, 0.3)'
    };
  }
  if (diffDays <= 30) {
    return {
      text: `${diffDays} jour(s)`,
      color: '#FCD535',
      bgColor: 'rgba(252, 213, 53, 0.1)',
      borderColor: 'rgba(252, 213, 53, 0.3)'
    };
  }
  return {
    text: `${diffDays} jour(s)`,
    color: '#36c275',
    bgColor: 'rgba(54, 194, 117, 0.1)',
    borderColor: 'rgba(54, 194, 117, 0.3)'
  };
};

const getStatusConfig = (status) => {
  const configs = {
    active: {
      color: '#36c275',
      label: 'Active',
      icon: <FaCheckCircle />
    },
    pending: {
      color: '#f59e0b',
      label: 'En attente',
      icon: <FaHourglassHalf />
    },
    expired: {
      color: '#ef4444',
      label: 'Expirée',
      icon: <FaTimesCircle />
    },
    'no-insurance': {
      color: '#6b7280',
      label: 'Non assuré',
      icon: <FaExclamationTriangle />
    }
  };
  return configs[status] || configs['no-insurance'];
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return '#4CAF50';
    case 'pending': return '#FF9800';
    case 'expired': return '#F44336';
    case 'no-insurance': return '#9E9E9E';
    default: return '#9E9E9E';
  }
};

const SmartCarBadge = () => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '2px 8px',
    backgroundColor: 'rgba(156, 39, 176, 0.1)',
    color: '#9C27B0',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: '600',
    marginLeft: '6px',
    border: '1px solid rgba(156, 39, 176, 0.3)'
  }}>
    <FaRobot style={{ width: '8px', height: '8px' }} />
    <span>Luxury</span>
  </div>
);

const VehicleRow = ({ vehicle, onView, onEdit, onPrint, onDelete }) => {
  const [localShowActions, setLocalShowActions] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const actionButtonRef = useRef(null);

  const statusConfig = getStatusConfig(vehicle.insuranceInfo.status);
  const timeRemaining = getTimeRemaining(vehicle.insuranceInfo.endDate);
  const isSmart = vehicle.isSmartCar;

  const toggleActionMenu = () => {
    if (!showActionMenu && actionButtonRef.current) {
      const rect = actionButtonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      if (spaceBelow < 200 && rect.top > 200) {
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
        backgroundColor: isSmart ? 'rgba(156, 39, 176, 0.02)' : '#FFFFFF',
        borderBottom: '1px solid #E0E0E0',
        borderLeft: isSmart ? '3px solid #9C27B0' : 'none',
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={() => setLocalShowActions(true)}
      onMouseLeave={() => {
        setLocalShowActions(false);
        setShowActionMenu(false);
      }}
    >
      {/* Vehicle Info */}
      <td style={{ padding: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: isSmart ? 'rgba(156, 39, 176, 0.1)' : '#F8F9FA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${isSmart ? 'rgba(156, 39, 176, 0.3)' : '#E0E0E0'}`
          }}>
            {isSmart ? (
              <FaRobot style={{ color: '#9C27B0', fontSize: '14px' }} />
            ) : (
              <FaCar style={{ color: '#36c275', fontSize: '14px' }} />
            )}
          </div>
          <div>
            <div style={{
              fontWeight: '600',
              fontSize: '14px',
              marginBottom: '2px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {vehicle.name || 'Véhicule sans nom'}
              {isSmart && <SmartCarBadge />}
            </div>
            <div style={{ color: '#666666', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isSmart ? 'Luxury Car' : vehicle.type} • {vehicle.matricule || 'Pas de plaque'}
            </div>
          </div>
        </div>
      </td>

      {/* Insurance Company */}
      <td style={{ padding: '12px' }}>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
          <div style={{ marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <strong>{vehicle.insuranceInfo.company || 'Non spécifié'}</strong>
          </div>
          <div style={{ color: '#666666', fontSize: '11px' }}>
            {vehicle.insuranceInfo.policyNumber || 'N/A'}
          </div>
        </div>
      </td>

      {/* Period */}
      <td style={{ padding: '12px' }}>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <FaCalendarAlt style={{ width: '12px', height: '12px', color: '#2196F3' }} />
            <span>{formatDate(vehicle.insuranceInfo.startDate)}</span>
          </div>
          <div style={{ fontSize: '11px', color: '#666666' }}>
            {vehicle.insuranceInfo.endDate ? `jusqu'au ${formatDate(vehicle.insuranceInfo.endDate)}` : 'Date de fin inconnue'}
          </div>
        </div>
      </td>

      {/* Time Remaining */}
      <td style={{ padding: '12px' }}>
        {vehicle.insuranceInfo.status === 'active' && vehicle.insuranceInfo.endDate ? (
          <div style={{ fontSize: '12px' }}>
            <div style={{
              padding: '4px 8px',
              backgroundColor: timeRemaining?.bgColor,
              color: timeRemaining?.color,
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              display: 'inline-block',
              border: `1px solid ${timeRemaining?.borderColor}`
            }}>
              {timeRemaining?.text}
            </div>
          </div>
        ) : vehicle.insuranceInfo.status === 'pending' && vehicle.insuranceInfo.startDate ? (
          <div style={{ fontSize: '12px' }}>
            <div style={{
              padding: '4px 8px',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              color: '#f59e0b',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              display: 'inline-block',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              Démarre dans {getDaysRemaining(vehicle.insuranceInfo.startDate)} jour(s)
            </div>
          </div>
        ) : (
          <div style={{ color: '#666666', fontSize: '12px', fontStyle: 'italic' }}>N/A</div>
        )}
      </td>

      {/* Status */}
      <td style={{ padding: '12px' }}>
        <div style={{
          padding: '4px 8px',
          backgroundColor: `${getStatusColor(vehicle.insuranceInfo.status)}20`,
          color: getStatusColor(vehicle.insuranceInfo.status),
          borderRadius: '4px',
          fontSize: '11px',
          fontWeight: '600',
          display: 'inline-flex',
          border: `1px solid ${getStatusColor(vehicle.insuranceInfo.status)}`,
          alignItems: 'center',
          gap: '4px'
        }}>
          {statusConfig.icon}
          {statusConfig.label}
        </div>
      </td>

      {/* Cost */}
      <td style={{ padding: '12px' }}>
        <div style={{ fontSize: '12px', lineHeight: '1.4' }}>
          <div style={{ marginBottom: '4px', fontWeight: '600' }}>
            €{vehicle.insuranceInfo.cost || '0'}
          </div>
          <div style={{ color: '#666666', fontSize: '11px' }}>
            Coût annuel
          </div>
        </div>
      </td>

      {/* Actions */}
      <td style={{ padding: '12px' }}>
        <div style={{
          display: 'flex',
          gap: '6px',
          opacity: localShowActions ? 1 : 0.9,
          transition: 'opacity 0.2s ease',
          alignItems: 'center'
        }}>
          <button
            onClick={() => onView(vehicle)}
            style={actionButtonStyle('#2196F3', '#1976D2')}
            title="Voir détails"
          >
            <FaEye style={{ width: '14px', height: '14px' }} />
          </button>
          <button
            onClick={() => onEdit(vehicle)}
            style={actionButtonStyle('#FF9800', '#F57C00')}
            title="Modifier"
          >
            <FaEdit style={{ width: '14px', height: '14px' }} />
          </button>
          <div style={{ position: 'relative' }}>
            <button
              ref={actionButtonRef}
              onClick={toggleActionMenu}
              style={actionButtonStyle('#F5F5F5', '#E0E0E0', '#333333')}
              title="Plus d'actions"
            >
              <FaEllipsisV style={{ width: '14px', height: '14px' }} />
            </button>
            {showActionMenu && (
              <div style={{
                position: 'fixed',
                ...(dropdownPosition === 'bottom'
                  ? { top: actionButtonRef.current?.getBoundingClientRect().bottom + 4 }
                  : { bottom: window.innerHeight - (actionButtonRef.current?.getBoundingClientRect().top || 0) + 4 }),
                right: window.innerWidth - (actionButtonRef.current?.getBoundingClientRect().right || 0),
                backgroundColor: '#FFFFFF',
                border: '1px solid #E0E0E0',
                borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 99999,
                minWidth: '200px',
                overflow: 'hidden'
              }}>
                <ActionMenuItem onClick={() => { setShowActionMenu(false); onView(vehicle); }} icon={<FaEye />} label="Voir détails" />
                <ActionMenuItem onClick={() => { setShowActionMenu(false); onEdit(vehicle); }} icon={<FaEdit />} label="Modifier" />
                <ActionMenuItem onClick={() => { setShowActionMenu(false); onPrint(vehicle); }} icon={<FaPrint />} label="Imprimer" />
                <ActionMenuItem onClick={() => { setShowActionMenu(false); onDelete(vehicle); }} icon={<FaTrashAlt />} label="Supprimer" color="#F44336" />
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
};

const actionButtonStyle = (bg, hoverBg, color = '#FFFFFF') => ({
  width: '32px',
  height: '32px',
  backgroundColor: bg,
  color: color,
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease'
});

const ActionMenuItem = ({ onClick, icon, label, color = '#333333' }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '10px 16px',
      backgroundColor: '#FFFFFF',
      color: color,
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
    {icon}
    {label}
  </button>
);

const InsuranceVehicleList = ({
  vehiclesWithInsurance,
  filteredVehicles,
  stats,
  filter,
  setFilter,
  vehicleTypeFilter,
  setVehicleTypeFilter,
  searchTerm,
  setSearchTerm,
  loading,
  onAddClick,
  onView,
  onEdit,
  onPrint,
  onDelete
}) => {
  return (
    <>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{
              margin: 0,
              fontSize: '16px',
              fontWeight: '600',
              color: '#333333',
              whiteSpace: 'nowrap'
            }}>
              Gestion des Assurances
            </h2>
            <span style={{ fontSize: '14px', color: '#666666' }}>
              ({filteredVehicles.length} sur {vehiclesWithInsurance.length})
            </span>
          </div>
          <div style={{ flex: 1, maxWidth: '300px', position: 'relative' }}>
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

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          marginBottom: '12px',
          flexWrap: 'wrap'
        }}>
          <StatItem color="#2196F3" label="Total" value={stats.total} />
          <StatItem color="#9C27B0" label="Luxury Cars" value={stats.smartCars} />
          <StatItem color="#36c275" label="Actives" value={stats.active} />
          <StatItem color="#FF9800" label="En attente" value={stats.pending} />
          <StatItem color="#F44336" label="Expirées" value={stats.expired} />
        </div>

        {/* Filter Buttons and Action Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {/* Insurance Status Filters */}
            <FilterButton
              label="Tous"
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              icon={<FaFilter style={{ width: '10px', height: '10px' }} />}
              activeColor="#2196F3"
            />
            <FilterButton
              label="Actives"
              active={filter === 'active'}
              onClick={() => setFilter('active')}
              activeColor="#36c275"
            />
            <FilterButton
              label="En attente"
              active={filter === 'pending'}
              onClick={() => setFilter('pending')}
              activeColor="#FF9800"
            />
            <FilterButton
              label="Expirées"
              active={filter === 'expired'}
              onClick={() => setFilter('expired')}
              activeColor="#F44336"
            />

            {/* Vehicle Type Filters */}
            <div style={{ marginLeft: '8px', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#666666', marginRight: '4px' }}>Type:</span>
              <FilterButton
                label="Tous"
                active={vehicleTypeFilter === 'all'}
                onClick={() => setVehicleTypeFilter('all')}
                activeColor="#666666"
                size="small"
              />
              <FilterButton
                label={<><FaRobot style={{ width: '8px', height: '8px' }} /> Luxury</>}
                active={vehicleTypeFilter === 'smart'}
                onClick={() => setVehicleTypeFilter('smart')}
                activeColor="#9C27B0"
                size="small"
              />
              <FilterButton
                label="Réguliers"
                active={vehicleTypeFilter === 'regular'}
                onClick={() => setVehicleTypeFilter('regular')}
                activeColor="#2196F3"
                size="small"
              />
            </div>
          </div>

          <button
            onClick={onAddClick}
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
            <FaPlus style={{ width: '10px', height: '10px' }} /> Nouvelle Assurance
          </button>
        </div>
      </div>

      {/* Vehicles Table */}
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
            fontSize: '14px',
            fontWeight: '500',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {filteredVehicles.length} véhicule(s) trouvé(s)
            {vehicleTypeFilter === 'smart' && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '2px 8px',
                backgroundColor: 'rgba(156, 39, 176, 0.1)',
                color: '#9C27B0',
                borderRadius: '12px',
                fontSize: '10px',
                fontWeight: '600'
              }}>
                <FaRobot style={{ width: '10px', height: '10px' }} />
                Luxury Cars
              </div>
            )}
          </div>
          <div style={{ fontSize: '11px', color: '#666666' }}>
            {stats.smartCars}  Luxury Cars • {stats.regularVehicles} Véhicules réguliers
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
              <span>Chargement des assurances...</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#F5F5F5', borderBottom: '2px solid #E0E0E0' }}>
                    <th style={tableHeaderStyle}>Véhicule</th>
                    <th style={tableHeaderStyle}>Compagnie</th>
                    <th style={tableHeaderStyle}>Période</th>
                    <th style={tableHeaderStyle}>Temps restant</th>
                    <th style={tableHeaderStyle}>Statut</th>
                    <th style={tableHeaderStyle}>Coût</th>
                    <th style={tableHeaderStyle}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map(vehicle => (
                    <VehicleRow
                      key={vehicle._id}
                      vehicle={vehicle}
                      onView={onView}
                      onEdit={onEdit}
                      onPrint={onPrint}
                      onDelete={onDelete}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {filteredVehicles.length === 0 && (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: '#666666', backgroundColor: '#FAFAFA' }}>
                <FaShieldAlt style={{ width: '48px', height: '48px', color: '#9E9E9E', marginBottom: '16px' }} />
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#333333' }}>Aucune assurance trouvée</div>
                <div style={{ fontSize: '14px', marginTop: '8px' }}>
                  {searchTerm ? 'Aucun résultat pour votre recherche' : 'Ajoutez la première assurance'}
                </div>
                {vehicleTypeFilter === 'smart' && (
                  <div style={{ fontSize: '12px', marginTop: '8px', color: '#9C27B0' }}>
                    <FaRobot style={{ marginRight: '4px' }} />
                    Aucun Luxury Car avec assurance trouvé
                  </div>
                )}
                <button
                  onClick={onAddClick}
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
                  <FaPlus style={{ width: '10px', height: '10px' }} /> Nouvelle Assurance
                </button>
              </div>
            )}
          </>
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
              Affichage de 1 à {filteredVehicles.length} sur {vehiclesWithInsurance.length} véhicules
              <span style={{ marginLeft: '10px', color: '#9C27B0' }}>
                {filteredVehicles.filter(v => v.isSmartCar).length} Luxury Cars
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button style={paginationButtonStyle}>← Précédent</button>
              <span style={{ color: '#333333' }}>Page 1 sur 1</span>
              <button style={paginationButtonStyle}>Suivant →</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const StatItem = ({ color, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{ width: '12px', height: '12px', backgroundColor: color, borderRadius: '2px' }} />
    <span style={{ fontSize: '12px', color: '#333333', fontWeight: '500' }}>
      {label}: <strong style={{ fontSize: '14px' }}>{value}</strong>
    </span>
  </div>
);

const FilterButton = ({ label, active, onClick, activeColor, icon, size = 'default' }) => {
  const padding = size === 'small' ? '6px 10px' : '6px 12px';
  const fontSize = size === 'small' ? '10px' : '11px';
  return (
    <button
      onClick={onClick}
      style={{
        padding,
        backgroundColor: active ? activeColor : '#FFFFFF',
        color: active ? '#FFFFFF' : '#333333',
        border: '1px solid #E0E0E0',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize,
        fontWeight: '500',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      onMouseEnter={(e) => { if (!active) e.target.style.backgroundColor = '#F5F5F5'; }}
      onMouseLeave={(e) => { if (!active) e.target.style.backgroundColor = '#FFFFFF'; }}
    >
      {icon}
      {label}
    </button>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  color: '#333333',
  fontSize: '11px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const paginationButtonStyle = {
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
};

export default InsuranceVehicleList;