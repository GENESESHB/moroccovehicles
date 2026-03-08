import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Tabs,
  Tab,
  Badge,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Slide,
  useMediaQuery,
  useTheme,
  Card,
  CardContent
} from '@mui/material';
import {
  Refresh,
  CarRepair,
  DirectionsCar,
  Warning,
  Info,
  CheckCircle,
  ReceiptLong
} from '@mui/icons-material';
import VehicleMaintenanceTab from './mnt/VehicleMaintenanceTab';
import FacturesTab from './mnt/FacturesTab';

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const MaintenanceDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Main state
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Shared data
  const [maintenanceVehicles, setMaintenanceVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [maintenanceStats, setMaintenanceStats] = useState({
    total: 0,
    due: 0,
    dueSoon: 0,
    ok: 0,
    regular: 0,
    smart: 0
  });
  
  // Filters
  const [filters, setFilters] = useState({
    vehicleType: 'all',
    maintenanceStatus: 'all'
  });
  
  const [factures, setFactures] = useState([]);
  const [facturesLoading, setFacturesLoading] = useState(false);

  // Fetch all vehicles for maintenance
  const fetchMaintenanceVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/factures/maintenance/vehicles');
      
      if (response.data.success) {
        const data = response.data.data;
        const vehicles = data.vehicles || [];
        
        // Set maintenance statistics
        if (data.statistics) {
          setMaintenanceStats(data.statistics);
        }
        
        // Calculate maintenance needed based on kilometer difference
        const vehiclesWithMaintenanceCheck = vehicles.map(vehicle => {
          const kmStart = vehicle.kmDepart || 0;
          const kmEnd = vehicle.kmRetour || 0;
          const kmDifference = kmEnd - kmStart;
          const maintenanceNeeded = kmDifference > 10000;
          
          return {
            ...vehicle,
            kmDifference,
            maintenanceNeeded,
            maintenanceStatus: maintenanceNeeded ? 'due' : (vehicle.maintenanceStatus || 'ok')
          };
        });
        
        setMaintenanceVehicles(vehiclesWithMaintenanceCheck);
        applyFilters(vehiclesWithMaintenanceCheck, filters);
        
      } else {
        throw new Error(response.data.message || 'Failed to fetch vehicles');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load vehicles';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all factures (invoices)
  const fetchFactures = async () => {
    try {
      setFacturesLoading(true);
      
      const response = await api.get('/factures');
      
      if (response.data.success) {
        setFactures(response.data.data.factures || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch factures');
      }
      
    } catch (err) {
      console.error('Error fetching factures:', err);
    } finally {
      setFacturesLoading(false);
    }
  };

  // Apply filters
  const applyFilters = (vehicles, filterValues) => {
    let filtered = [...vehicles];
    
    // Filter by vehicle type
    if (filterValues.vehicleType !== 'all') {
      if (filterValues.vehicleType === 'smart') {
        filtered = filtered.filter(v => v.isSmartCar === true);
      } else if (filterValues.vehicleType === 'regular') {
        filtered = filtered.filter(v => v.isSmartCar === false);
      } else {
        filtered = filtered.filter(v => v.type === filterValues.vehicleType);
      }
    }
    
    // Filter by maintenance status
    if (filterValues.maintenanceStatus !== 'all') {
      if (filterValues.maintenanceStatus === 'due') {
        filtered = filtered.filter(v => v.maintenanceStatus === 'due');
      } else if (filterValues.maintenanceStatus === 'due_soon') {
        filtered = filtered.filter(v => v.maintenanceStatus === 'due_soon');
      } else if (filterValues.maintenanceStatus === 'ok') {
        filtered = filtered.filter(v => v.maintenanceStatus === 'ok');
      }
    }
    
    setFilteredVehicles(filtered);
  };

  // Handle filter change
  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    applyFilters(maintenanceVehicles, newFilters);
  };

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    
    // Apply filter based on selected tab
    let newFilters = { ...filters, maintenanceStatus: 'all' };
    
    switch (newValue) {
      case 1: // Due for Maintenance
        newFilters.maintenanceStatus = 'due';
        break;
      case 2: // Due Soon
        newFilters.maintenanceStatus = 'due_soon';
        break;
      case 3: // OK
        newFilters.maintenanceStatus = 'ok';
        break;
      case 4: // Factures
        // No filter change for factures tab
        break;
      default:
        newFilters.maintenanceStatus = 'all';
    }
    
    setFilters(newFilters);
    applyFilters(maintenanceVehicles, newFilters);
  };

  // Initial fetch
  useEffect(() => {
    if (user) {
      fetchMaintenanceVehicles();
      fetchFactures();
    }
  }, [user]);

  // Render statistics cards
  const renderStatistics = () => {
    const statCards = [
      {
        title: 'Total Vehicles',
        value: maintenanceStats.total,
        icon: <DirectionsCar />,
        color: '#1976d2',
        subtitle: `${maintenanceStats.regular} regular, ${maintenanceStats.smart} smart`
      },
      {
        title: 'Due for Maintenance',
        value: maintenanceStats.due,
        icon: <Warning />,
        color: '#F44336',
        badge: true
      },
      {
        title: 'Due Soon',
        value: maintenanceStats.dueSoon,
        icon: <Info />,
        color: '#FF9800',
        badge: true
      },
      {
        title: 'OK',
        value: maintenanceStats.ok,
        icon: <CheckCircle />,
        color: '#4CAF50'
      },
      {
        title: 'Total Factures',
        value: factures.length,
        icon: <ReceiptLong />,
        color: '#9C27B0'
      }
    ];

    return (
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Card sx={{ 
              height: '100%', 
              boxShadow: 2,
              borderLeft: `4px solid ${stat.color}`,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-2px)' }
            }}>
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography color="textSecondary" variant="caption" display="block">
                      {stat.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                      {stat.value}
                    </Typography>
                    {stat.subtitle && (
                      <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 0.5 }}>
                        {stat.subtitle}
                      </Typography>
                    )}
                  </Box>
                  <Box sx={{ 
                    backgroundColor: `${stat.color}15`,
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: stat.color
                  }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        TransitionComponent={SlideTransition}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error Alert */}
      {error && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }} 
          onClose={() => setError(null)}
        >
          {error}
        </Alert>
      )}

      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} md="auto">
            <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CarRepair />
              Vehicle Maintenance & Factures Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage maintenance for both regular vehicles and Luxury cars. Create factures and track maintenance status.
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={async () => {
                await fetchMaintenanceVehicles();
                await fetchFactures();
              }}
              sx={{ borderRadius: 2 }}
            >
              Refresh All Data
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Statistics */}
      {renderStatistics()}

      {/* Main Content */}
      <Paper sx={{ p: 2, boxShadow: 2, borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "fullWidth"}
          sx={{ mb: 3 }}
        >
          <Tab label="All Vehicles" />
          <Tab 
            label={
              <Badge 
                badgeContent={maintenanceStats.due} 
                color="error"
                sx={{ '& .MuiBadge-badge': { top: 8, right: -10 } }}
              >
                Due
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge 
                badgeContent={maintenanceStats.dueSoon} 
                color="warning"
                sx={{ '& .MuiBadge-badge': { top: 8, right: -10 } }}
              >
                Due Soon
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge 
                badgeContent={maintenanceStats.ok} 
                color="success"
                sx={{ '& .MuiBadge-badge': { top: 8, right: -10 } }}
              >
                OK
              </Badge>
            } 
          />
          <Tab 
            label={
              <Badge 
                badgeContent={factures.length} 
                color="primary"
                sx={{ '& .MuiBadge-badge': { top: 8, right: -10 } }}
              >
                Factures
              </Badge>
            } 
          />
        </Tabs>
        
        <Box sx={{ p: 1 }}>
          {activeTab === 4 ? (
            <FacturesTab
              factures={factures}
              loading={facturesLoading}
              user={user}
              setError={setError}
              setSuccessMessage={setSuccessMessage}
              setSnackbarOpen={setSnackbarOpen}
              fetchFactures={fetchFactures}
            />
          ) : (
            <VehicleMaintenanceTab
              loading={loading}
              error={error}
              filteredVehicles={filteredVehicles}
              filters={filters}
              user={user}
              setError={setError}
              setSuccessMessage={setSuccessMessage}
              setSnackbarOpen={setSnackbarOpen}
              handleFilterChange={handleFilterChange}
              fetchMaintenanceVehicles={fetchMaintenanceVehicles}
              maintenanceStats={maintenanceStats}
            />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default MaintenanceDashboard;