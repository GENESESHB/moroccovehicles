import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import Overview from './components/Overview';
import VehiclesManagement from './components/VehiclesManagement';
import ContractsManagement from './components/ContractsManagement';
import BlacklistManagement from './components/BlacklistManagement';
import InsuranceManagement from './components/InsuranceManagement';
import ClientsManagement from './components/ClientsManagement';
import SmartCarsControllers from './components/SmartCarsControllers';
import SmartContra from './components/SmartContra';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import MaintenanceManagement from './components/MaintenanceManagement';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  
  // 📊 DONNÉES RÉCUPÉRÉES DE L'API
  const [vehicles, setVehicles] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [blacklist, setBlacklist] = useState([]);
  const [clients, setClients] = useState([]);
  const [smartCars, setSmartCars] = useState([]);
  const [smartContracts, setSmartContracts] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);
  const [showMoreIcons, setShowMoreIcons] = useState(false);
  const [showFullPage, setShowFullPage] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dataStatus, setDataStatus] = useState('En direct');
  const [isDataFresh, setIsDataFresh] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState('');

  // 📁 DONNÉES COMPLÈTES POUR L'AFFICHAGE
  const [allData, setAllData] = useState(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Vérifier la fraîcheur des données toutes les 30 secondes
  useEffect(() => {
    const checkDataFreshness = () => {
      const now = new Date();
      const diffInMinutes = Math.floor((now - lastUpdate) / (1000 * 60));
      
      if (diffInMinutes < 1) {
        setDataStatus('En direct');
        setIsDataFresh(true);
      } else if (diffInMinutes < 5) {
        setDataStatus('À jour');
        setIsDataFresh(true);
      } else {
        setDataStatus(`Mis à jour il y a ${diffInMinutes} min`);
        setIsDataFresh(false);
      }
    };

    checkDataFreshness();
    
    const interval = setInterval(checkDataFreshness, 30000);
    
    return () => clearInterval(interval);
  }, [lastUpdate]);

  useEffect(() => {
    if (user) {
      console.log('👤 User connecté:', user);
      loadAllData();
    }
  }, [user]);

  // 📥 LOAD VEHICLES FROM API
  const loadVehicles = async () => {
    try {
      const res = await api.get('/vehicles/my-vehicles');
      return res.data?.vehicles || [];
    } catch (err) {
      console.error('❌ Erreur loading vehicles:', err);
      setMessage('Erreur lors du chargement des véhicules');
      return [];
    }
  };

  // 📥 LOAD CONTRACTS FROM API
  const loadContracts = async () => {
    try {
      const res = await api.get('/contracts/my-contracts');
      return res.data?.contracts || [];
    } catch (err) {
      console.error('❌ Erreur loading contracts:', err);
      setMessage('Erreur lors du chargement des contrats');
      return [];
    }
  };

  // 📥 LOAD SMART CONTRACTS FROM API
  const loadSmartContracts = async () => {
    try {
      const res = await api.get('/contrasmart');
      return res.data?.contrasmarts || res.data || [];
    } catch (err) {
      console.error('❌ Erreur loading smart contracts:', err);
      setMessage('Erreur lors du chargement des smart contracts');
      return [];
    }
  };

  // 📥 LOAD BLACKLIST FROM API
  const loadBlacklist = async () => {
    try {
      const res = await api.get('/blacklist');
      return res.data?.blacklist || [];
    } catch (err) {
      console.error('❌ Erreur loading blacklist:', err);
      setMessage('Erreur lors du chargement de la liste noire');
      return [];
    }
  };

  // 📥 LOAD CLIENTS FROM API
  const loadClients = async () => {
    try {
      const res = await api.get('/clients/my-clients');
      return res.data?.clients || [];
    } catch (err) {
      console.error('❌ Erreur loading clients:', err);
      setMessage('Erreur lors du chargement des clients');
      return [];
    }
  };

  // 📥 LOAD SMART CARS FROM API
  const loadSmartCars = async () => {
    try {
      const res = await api.get('/smart-cars');
      return res.data?.smartCars || res.data || [];
    } catch (err) {
      console.error('❌ Erreur loading smart cars:', err);
      setMessage('Erreur lors du chargement des voitures Luxury');
      return [];
    }
  };

  // 🎯 AMÉLIORÉ: LOAD ALL DATA FROM API AVEC PROGRESSION
  const loadAllData = async () => {
    try {
      setLoading(true);
      setMessage('');
      setProgress(0);
      setLoadingStep('Initialisation...');
      console.log('🔄 Chargement des données depuis l\'API...');

      // Simulation de progression pour UX améliorée
      const updateProgress = (step, value) => {
        setLoadingStep(step);
        setProgress(value);
      };

      // Charger les données avec progression
      updateProgress('Chargement des véhicules...', 15);
      const vehiclesData = await loadVehicles();
      
      updateProgress('Chargement des contrats...', 30);
      const contractsData = await loadContracts();
      
      updateProgress('Chargement des smart contracts...', 45);
      const smartContractsData = await loadSmartContracts();
      
      updateProgress('Chargement de la liste noire...', 60);
      const blacklistData = await loadBlacklist();
      
      updateProgress('Chargement des clients...', 75);
      const clientsData = await loadClients();
      
      updateProgress('Chargement des voitures Luxury...', 90);
      const smartCarsData = await loadSmartCars();

      // Mettre à jour les états
      setVehicles(vehiclesData);
      setContracts(contractsData);
      setSmartContracts(smartContractsData);
      setBlacklist(blacklistData);
      setClients(clientsData);
      setSmartCars(smartCarsData);

      // Préparer les données pour l'affichage
      const formattedData = {
        metadata: {
          generatedAt: new Date().toISOString(),
          userId: user?._id,
          company: user?.entreprise,
          userName: user?.name,
          email: user?.email
        },
        summary: {
          totalVehicles: vehiclesData.length,
          totalContracts: contractsData.length,
          totalSmartContracts: smartContractsData.length,
          totalClients: clientsData.length,
          totalBlacklisted: blacklistData.length,
          totalSmartCars: smartCarsData.length
        },
        data: {
          vehicles: vehiclesData,
          contracts: contractsData,
          smartContracts: smartContractsData,
          clients: clientsData,
          blacklist: blacklistData,
          smartCars: smartCarsData
        }
      };

      setAllData(formattedData);
      setLastUpdate(new Date());
      setDataStatus('En direct');
      setIsDataFresh(true);
      
      updateProgress('Finalisation...', 100);
      
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
        setMessage('✅ Données actualisées avec succès!');
        setTimeout(() => setMessage(''), 3000);
      }, 500);
      
      console.log('✅ Données chargées avec succès!', formattedData.summary);

    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error);
      setMessage('❌ Erreur lors du chargement des données');
      setDataStatus('Erreur de connexion');
      setIsDataFresh(false);
      setLoading(false);
      setProgress(0);
    }
  };

  // PROPS COMMUNES POUR TOUS LES COMPOSANTS
  const commonProps = {
    user: user || {},
    vehicles: vehicles || [],
    contracts: contracts || [],
    blacklist: blacklist || [],
    clients: clients || [],
    smartCars: smartCars || [],
    smartContracts: smartContracts || [],
    allData: allData || {},
    loading: loading,
    message: message,
    lastUpdate: lastUpdate,
    dataStatus: dataStatus,
    isDataFresh: isDataFresh,
    setMessage: setMessage,
    setVehicles: setVehicles,
    setContracts: setContracts,
    setBlacklist: setBlacklist,
    setClients: setClients,
    setSmartCars: setSmartCars,
    setSmartContracts: setSmartContracts,
    loadAllData: loadAllData,
    loadVehicles: loadVehicles,
    loadContracts: loadContracts,
    loadBlacklist: loadBlacklist,
    loadClients: loadClients,
    loadSmartCars: loadSmartCars,
    loadSmartContracts: loadSmartContracts
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview {...commonProps} />;
      case 'vehicles':
        return <VehiclesManagement {...commonProps} />;
      case 'contracts':
        return <ContractsManagement {...commonProps} />;
      case 'blacklist':
        return <BlacklistManagement {...commonProps} />;
      case 'clients':
        return <ClientsManagement {...commonProps} />;
      case 'assurance':
        return <InsuranceManagement {...commonProps} />;
      case 'smart-cars':
        return <SmartCarsControllers {...commonProps} />;
      case 'smart-contra':
        return <SmartContra {...commonProps} />;
      case 'analytics':
        return <AnalyticsDashboard {...commonProps} />;
      case 'maintenance':
        return <MaintenanceManagement {...commonProps} />;
      default:
        return <Overview {...commonProps} />;
    }
  };

  // ICÔNES SVG - Plus petites pour mobile
  const OverviewIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  );

  const MaintenanceIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
      <path d="M12 5v14"></path>
      <path d="M9.5 9h5"></path>
      <path d="M9.5 12h5"></path>
      <path d="M9.5 15h5"></path>
    </svg>
  );

  const VehiclesIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path>
      <path d="M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path>
      <path d="M5 17H3v-6l2-5h14l2 5v6h-2m-4 0H9"></path>
      <line x1="8" y1="12" x2="14" y2="12"></line>
    </svg>
  );

  const ContractsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  );

  const ClientsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const BlacklistIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
      <path d="M12 2v6m0 4v6m0 4v2"></path>
    </svg>
  );

  const InsuranceIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5Z"></path>
      <path d="M12 5L8 21l4-7 4 7-4-16Z"></path>
    </svg>
  );

  const SmartCarsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path>
      <path d="M15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"></path>
      <path d="M5 17H3v-6l2-5h14l2 5v6h-2m-4 0H9"></path>
      <line x1="8" y1="12" x2="14" y2="12"></line>
      <path d="M7 4h10"></path>
      <path d="M12 4v3"></path>
    </svg>
  );

  const SmartContractsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
      <path d="M2 17l10 5 10-5"></path>
      <path d="M2 12l10 5 10-5"></path>
    </svg>
  );

  // 🗓️ NOUVELLE ICÔNE CALENDRIER POUR ANALYTICS
  const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );

  const MoreIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1"></circle>
      <circle cx="12" cy="5" r="1"></circle>
      <circle cx="12" cy="19" r="1"></circle>
    </svg>
  );

  const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const RefreshIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
    </svg>
  );

  // Menu items avec le nouveau libellé "Calendrier" et l'icône calendrier
  const menuItems = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: <OverviewIcon /> },
    { id: 'vehicles', label: 'Véhicules', icon: <VehiclesIcon /> },
    { id: 'contracts', label: 'Contrats', icon: <ContractsIcon /> },
    { id: 'smart-cars', label: 'Luxury Voitures', icon: <SmartCarsIcon /> },
    { id: 'smart-contra', label: 'Luxury Contracts', icon: <SmartContractsIcon /> },
    { id: 'analytics', label: 'Calendrier', icon: <CalendarIcon /> }, // ← Changé ici
    { id: 'clients', label: 'Clients', icon: <ClientsIcon /> },
    { id: 'assurance', label: 'Assurance', icon: <InsuranceIcon /> },
    { id: 'maintenance', label: 'Maintenance', icon: <MaintenanceIcon /> },
    { id: 'blacklist', label: 'Liste Noire', icon: <BlacklistIcon /> },
  ];

  const primaryMobileNavItems = menuItems.slice(0, 6);
  const secondaryMobileNavItems = menuItems.slice(6);

  const handleNavClick = (itemId) => {
    setActiveSection(itemId);
    setShowMoreIcons(false);
  };

  const handleMoreClick = () => {
    setShowMoreIcons(!showMoreIcons);
  };

  const handleFullPageToggle = () => {
    setShowFullPage(!showFullPage);
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#0B0E11',
      color: '#EAECEF',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
      position: 'relative'
    }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside style={{
          width: sidebarCollapsed ? '80px' : '280px',
          backgroundColor: '#1E2329',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)',
          position: 'fixed',
          height: '100vh',
          zIndex: 100,
          transition: 'width 0.3s ease'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #2B3139',
            display: 'flex',
            alignItems: 'center',
            justifyContent: sidebarCollapsed ? 'center' : 'space-between'
          }}>
            {!sidebarCollapsed && user?.logoEntreprise && (
              <img
                src={user.logoEntreprise}
                alt="Logo entreprise"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  marginRight: '12px'
                }}
              />
            )}
            {!sidebarCollapsed && (
              <div>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '18px', 
                  fontWeight: '600',
                  color: '#F0B90B'
                }}>
                  {user?.entreprise || 'Entreprise'}
                </h2>
                <p style={{ 
                  margin: 0, 
                  fontSize: '14px', 
                  color: '#848E9C' 
                }}>
                  Dashboard Location
                </p>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              style={{
                background: 'none',
                border: 'none',
                color: '#848E9C',
                cursor: 'pointer',
                padding: '5px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav style={{ 
            flex: 1, 
            padding: '20px 0',
            overflowY: 'auto'
          }}>
            {menuItems.map(item => (
              <button
                key={item.id}
                style={{
                  width: '100%',
                  padding: sidebarCollapsed ? '15px' : '12px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                  backgroundColor: activeSection === item.id ? '#F0B90B20' : 'transparent',
                  borderLeft: activeSection === item.id ? '3px solid #F0B90B' : '3px solid transparent',
                  color: activeSection === item.id ? '#F0B90B' : '#EAECEF',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  textAlign: 'left',
                  fontSize: '16px',
                  fontWeight: '500'
                }}
                onClick={() => setActiveSection(item.id)}
                onMouseEnter={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.backgroundColor = '#2B3139';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== item.id) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
                title={sidebarCollapsed ? item.label : ''}
              >
                <span style={{ 
                  marginRight: sidebarCollapsed ? '0' : '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.icon}
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>

          <div style={{
            padding: '20px',
            borderTop: '1px solid #2B3139'
          }}>
            {!sidebarCollapsed && (
              <div style={{ marginBottom: '15px' }}>
                <p style={{ 
                  margin: '0 0 5px 0', 
                  fontSize: '14px',
                  color: '#848E9C'
                }}>
                  Bonjour, <strong style={{ color: '#EAECEF' }}>{user?.name || 'Utilisateur'}</strong>
                </p>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  fontSize: '12px',
                  color: isDataFresh ? '#36c275' : '#848E9C'
                }}>
                  {isDataFresh ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#36c275',
                        animation: 'pulse 2s infinite'
                      }}></span>
                      <span>{dataStatus}</span>
                    </>
                  ) : (
                    <span>{dataStatus}</span>
                  )}
                </div>
              </div>
            )}
            <button 
              onClick={logout}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#2B3139',
                color: '#EAECEF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                gap: sidebarCollapsed ? '0' : '10px'
              }}
              title={sidebarCollapsed ? 'Déconnexion' : ''}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              {!sidebarCollapsed && 'Déconnexion'}
            </button>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        backgroundColor: '#0B0E11',
        overflow: 'hidden',
        marginLeft: isMobile ? '0' : (sidebarCollapsed ? '80px' : '280px'),
        paddingBottom: isMobile ? '60px' : '0',
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Mobile Header */}
        {isMobile && (
          <header style={{
            padding: '12px 16px',
            borderBottom: '1px solid #2B3139',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1E2329'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user?.logoEntreprise && (
                <img
                  src={user.logoEntreprise}
                  alt="Logo entreprise"
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '6px',
                    marginRight: '8px'
                  }}
                />
              )}
              <div>
                <h1 style={{ 
                  margin: 0, 
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#F0B90B'
                }}>
                  {user?.entreprise || 'Entreprise'}
                </h1>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '10px',
                  color: isDataFresh ? '#36c275' : '#848E9C'
                }}>
                  {isDataFresh ? (
                    <>
                      <span style={{
                        display: 'inline-block',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#36c275',
                        animation: 'pulse 2s infinite'
                      }}></span>
                      <span>{dataStatus}</span>
                    </>
                  ) : (
                    <span>{dataStatus}</span>
                  )}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button 
                onClick={loadAllData}
                disabled={loading}
                style={{
                  padding: '6px',
                  backgroundColor: '#2B3139',
                  color: '#EAECEF',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <RefreshIcon />
              </button>
            </div>
          </header>
        )}

        {/* Desktop Header */}
        {!isMobile && (
          <header style={{
            padding: '20px 30px',
            borderBottom: '1px solid #2B3139',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ 
                margin: 0, 
                fontSize: '24px',
                fontWeight: '600',
                color: '#EAECEF'
              }}>
                {menuItems.find(item => item.id === activeSection)?.label || 'Vue d\'ensemble'}
              </h1>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px'
            }}>
              {/* 🔴 INDICATEUR EN DIRECT AVEC NOUVELLES COULEURS */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                backgroundColor: isDataFresh ? 'rgba(54, 194, 117, 0.15)' : 'rgba(132, 142, 156, 0.1)',
                borderRadius: '20px',
                border: isDataFresh ? '1px solid rgba(54, 194, 117, 0.3)' : '1px solid rgba(132, 142, 156, 0.2)',
                minWidth: '120px'
              }}>
                {loading ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      border: '2px solid #36c275',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span style={{ 
                      color: '#36c275',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Chargement
                    </span>
                  </div>
                ) : isDataFresh ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#36c275',
                      animation: 'pulse 1.5s infinite'
                    }}></div>
                    <span style={{ 
                      color: '#36c275',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {dataStatus}
                    </span>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#848E9C'
                    }}></div>
                    <span style={{ 
                      color: '#848E9C',
                      fontSize: '14px'
                    }}>
                      {dataStatus}
                    </span>
                  </div>
                )}
              </div>

              {/* BOUTON ACTUALISER AMÉLIORÉ */}
              <button 
                onClick={loadAllData}
                disabled={loading}
                style={{
                  padding: loading ? '8px 16px' : '8px 16px',
                  backgroundColor: loading ? '#1E2329' : '#2B3139',
                  color: '#EAECEF',
                  border: loading ? '1px solid #36c275' : '1px solid #3A4249',
                  borderRadius: '8px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  height: '38px',
                  opacity: loading ? 0.8 : 1
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#3A4249';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 4px 12px rgba(243, 186, 47, 0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.target.style.backgroundColor = '#2B3139';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid #f3ba2f',
                      borderTop: '2px solid transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }}></div>
                    <span>Chargement...</span>
                  </>
                ) : (
                  <>
                    <RefreshIcon />
                    <span>Actualiser</span>
                  </>
                )}
              </button>
            </div>
          </header>
        )}

        {/* 🎯 LOADER: RADAR ONLY - NO TEXT - COLORS: GREEN & ORANGE */}
        {loading && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: isMobile ? 0 : (sidebarCollapsed ? '80px' : '280px'),
            right: 0,
            bottom: 0,
            background: '#0B0E11',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.3s ease'
          }}>
            {/* Main Container */}
            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            }}>
              
              {/* RADAR CONTAINER */}
              <div style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                // Subtle breathing for the whole container
                animation: 'container-breathe 4s ease-in-out infinite'
              }}>
                
                {/* 1. Rotating Sweep (Gradient: Orange to Green) */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0deg, rgba(240, 185, 11, 0.1) 200deg, rgba(54, 194, 117, 0.5) 360deg)',
                  animation: 'radar-spin 2s linear infinite',
                  zIndex: 1
                }}></div>
                
                {/* 2. Static Grid Circles (Radar Lines) */}
                <div style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  border: '1px solid rgba(240, 185, 11, 0.1)',
                  zIndex: 2
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '66%',
                  height: '66%',
                  borderRadius: '50%',
                  border: '1px solid rgba(240, 185, 11, 0.1)',
                  zIndex: 2
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '33%',
                  height: '33%',
                  borderRadius: '50%',
                  border: '1px solid rgba(54, 194, 117, 0.2)',
                  zIndex: 2,
                  background: 'rgba(54, 194, 117, 0.05)'
                }}></div>

                {/* 3. Growing Rings (Pulse Outwards - Orange & Green) */}
                <div style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '2px solid #F0B90B', // Orange
                  opacity: 0,
                  animation: 'radar-pulse 3s ease-out infinite',
                  zIndex: 1
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '2px solid #36c275', // Green
                  opacity: 0,
                  animation: 'radar-pulse 3s ease-out infinite',
                  animationDelay: '1s',
                  zIndex: 1
                }}></div>
                <div style={{
                  position: 'absolute',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '2px solid #F0B90B', // Orange
                  opacity: 0,
                  animation: 'radar-pulse 3s ease-out infinite',
                  animationDelay: '2s',
                  zIndex: 1
                }}></div>

                {/* 4. Center Logo Wrapper - UP AND DOWN MOVEMENT */}
                <div style={{
                  position: 'relative',
                  width: '90px',
                  height: '90px',
                  zIndex: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#1E2329',
                  borderRadius: '20px',
                  boxShadow: '0 0 40px rgba(240, 185, 11, 0.3)',
                  border: '2px solid rgba(240, 185, 11, 0.4)',
                  // 🚀 KEY ANIMATION: Moves UP and DOWN
                  animation: 'float-vertical 2s ease-in-out infinite'
                }}>
                  {user?.logoEntreprise ? (
                    <img
                      src={user.logoEntreprise}
                      alt="Logo"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '12px',
                        borderRadius: '14px'
                      }}
                    />
                  ) : (
                    <span style={{
                      fontSize: '36px',
                      fontWeight: '700',
                      background: 'linear-gradient(135deg, #F0B90B 0%, #36c275 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {user?.entreprise?.charAt(0) || 'D'}
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Background Grid Effect (Subtle) */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `
                linear-gradient(rgba(240, 185, 11, 0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(240, 185, 11, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
              pointerEvents: 'none',
              zIndex: 0
            }}></div>
            
            {/* Vignette Effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at center, transparent 0%, rgba(11, 14, 17, 0.9) 100%)',
              pointerEvents: 'none',
              zIndex: 1
            }}></div>

          </div>
        )}

        {/* Message Toast amélioré */}
        {message && (
          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            backgroundColor: message.includes('✅') ? 'rgba(14, 63, 46, 0.9)' : 'rgba(62, 21, 21, 0.9)',
            color: message.includes('✅') ? '#36c275' : '#f3ba2f',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 1001,
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
            border: message.includes('✅') ? '1px solid rgba(54, 194, 117, 0.2)' : '1px solid rgba(243, 186, 47, 0.2)',
            animation: 'slideIn 0.3s ease-out',
            maxWidth: '400px',
            backdropFilter: 'blur(10px)'
          }}>
            {message.includes('✅') ? (
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(54, 194, 117, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #36c275'
              }}>
                ✓
              </div>
            ) : (
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: 'rgba(243, 186, 47, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid #f3ba2f'
              }}>
                ✕
              </div>
            )}
            <span style={{ fontWeight: '500' }}>{message}</span>
          </div>
        )}

        {/* Content Area */}
        <div style={{
          flex: 1,
          padding: isMobile ? '15px' : '30px',
          overflowY: 'auto',
          opacity: loading ? 0.5 : 1,
          transition: 'opacity 0.3s ease'
        }}>
          {renderActiveSection()}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Icônes uniquement et plus petites */}
      {isMobile && (
        <nav style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#1E2329',
          borderTop: '1px solid #2B3139',
          display: 'flex',
          justifyContent: 'space-around',
          padding: '8px 0',
          zIndex: 1000,
          paddingBottom: 'env(safe-area-inset-bottom, 8px)'
        }}>
          {primaryMobileNavItems.map(item => (
            <button
              key={item.id}
              style={{
                flex: 1,
                padding: '8px 4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: activeSection === item.id ? 'rgba(54, 194, 117, 0.1)' : 'transparent',
                color: activeSection === item.id ? '#36c275' : '#848E9C',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: 'none',
                borderRadius: '8px',
                margin: '0 2px'
              }}
              onClick={() => handleNavClick(item.id)}
              title={item.label}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
            </button>
          ))}
          <button
            style={{
              flex: 1,
              padding: '8px 4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: showMoreIcons ? 'rgba(54, 194, 117, 0.1)' : 'transparent',
              color: showMoreIcons ? '#36c275' : '#848E9C',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              border: 'none',
              borderRadius: '8px',
              margin: '0 2px'
            }}
            onClick={handleMoreClick}
            title="Plus"
          >
            <span style={{ fontSize: '18px' }}><MoreIcon /></span>
          </button>
        </nav>
      )}

      {/* Mobile More Icons Menu - Icônes uniquement et plus petites */}
      {isMobile && showMoreIcons && (
        <div style={{
          position: 'fixed',
          bottom: '70px',
          left: '15px',
          right: '15px',
          backgroundColor: '#1E2329',
          borderRadius: '16px',
          padding: '12px',
          zIndex: 999,
          maxHeight: '180px',
          overflowY: 'auto',
          boxShadow: '0 -10px 30px rgba(0, 0, 0, 0.3)',
          border: '1px solid #2B3139'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px'
          }}>
            {secondaryMobileNavItems.map(item => (
              <button
                key={item.id}
                style={{
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: activeSection === item.id ? 'rgba(54, 194, 117, 0.1)' : 'transparent',
                  color: activeSection === item.id ? '#36c275' : '#848E9C',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  borderRadius: '12px'
                }}
                onClick={() => handleNavClick(item.id)}
                title={item.label}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Styles d'animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { 
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(54, 194, 117, 0.7);
          }
          70% { 
            transform: scale(1.05);
            opacity: 0.7;
            box-shadow: 0 0 0 10px rgba(54, 194, 117, 0);
          }
          100% { 
            transform: scale(1);
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(54, 194, 117, 0);
          }
        }

        /* RADAR ANIMATIONS */
        @keyframes radar-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes radar-pulse {
          0% { 
            width: 100px; 
            height: 100px; 
            opacity: 0.8;
            border-width: 3px;
          }
          100% { 
            width: 380px; 
            height: 380px; 
            opacity: 0;
            border-width: 0px;
          }
        }

        /* 🚀 UP AND DOWN MOVEMENT (Float) */
        @keyframes float-vertical {
          0% { transform: translateY(0); }
          50% { transform: translateY(-15px); } /* Move UP */
          100% { transform: translateY(0); } /* Move DOWN back */
        }

        /* Slight breathing for the whole container */
        @keyframes container-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;