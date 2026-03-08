import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Slide,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  CalendarToday,
  TableChart,
  Refresh,
  DirectionsCar,
  Speed,
  Check,
  History,
  ShowChart,
  Edit,
  Visibility,
  PlayArrow,
  Stop,
  Build,
  Warning,
  SmartToy,
  Settings,
  LocationOn,
  LocationOff,
  Person,
  Phone,
  Event,
  Directions,
  TrendingUp
} from '@mui/icons-material';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

const SlideTransition = (props) => {
  return <Slide {...props} direction="up" />;
};

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  
  // Kilometer dialog states
  const [kilometerDialogOpen, setKilometerDialogOpen] = useState(false);
  const [kilometerInput, setKilometerInput] = useState('');
  const [kilometerType, setKilometerType] = useState('depart');
  const [kilometerLoading, setKilometerLoading] = useState(false);
  const [kilometerNotes, setKilometerNotes] = useState('');
  
  // Fix kilometer dialog
  const [fixDialogOpen, setFixDialogOpen] = useState(false);
  const [fixKilometerInput, setFixKilometerInput] = useState('');
  const [fixReason, setFixReason] = useState('');
  const [fixLoading, setFixLoading] = useState(false);
  
  // Vehicle history states
  const [vehicleHistory, setVehicleHistory] = useState([]);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  
  // Luxury cars list (formerly smartCars)
  const [smartCars, setSmartCars] = useState([]);  // internal variable unchanged
  const [loadingSmartCars, setLoadingSmartCars] = useState(false);
  
  // Success/Error states
  const [successMessage, setSuccessMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Fix LuxuryCar document states
  const [fixSmartCarDialogOpen, setFixSmartCarDialogOpen] = useState(false);  // internal variable unchanged
  const [fixSmartCarLoading, setFixSmartCarLoading] = useState(false);        // internal variable unchanged
  
  // Filters
  const [filters] = useState({
    vehicleType: 'all',
    status: 'all'
  });
  
  const [stats, setStats] = useState({
    totalVehicles: 0,
    activeRentals: 0,
    completedRentals: 0,
    vehiclesWithKilometer: 0,
    totalDistanceTraveled: 0,
    smartCars: 0,
    regularVehicles: 0
  });

  // Color palette for vehicles
  const vehicleColors = useMemo(() => [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
    '#073B4C', '#7209B7', '#F72585', '#3A86FF', '#FB5607'
  ], []);

  // Function to generate consistent color
  const getVehicleColor = (vehicleId) => {
    if (!vehicleId) return '#757575';
    let hash = 0;
    for (let i = 0; i < vehicleId.length; i++) {
      hash = vehicleId.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % vehicleColors.length;
    return vehicleColors[index];
  };

  // ==================== API FUNCTIONS ====================

  // Fetch kilometer data from database
  const fetchKilometerDataFromDatabase = async (vehicleId) => {
    try {
      setKilometerLoading(true);
      setError(null);
      
      const response = await api.get(`/maintenance/${vehicleId}/kilometer-data`);
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch kilometer data');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch kilometer data';
      setError(errorMsg);
      return null;
    } finally {
      setKilometerLoading(false);
    }
  };

  // Update kilometer in database - SIMPLIFIED VERSION
  const updateKilometerInDatabase = async (vehicleId, kilometer, type, notes) => {
    try {
      setKilometerLoading(true);
      setError(null);
      
      const payload = {
        kilometer: parseFloat(kilometer),
        type: type,
        notes: notes || `${type === 'depart' ? 'Departure' : 'Return'} kilometer`,
        vehicleId: vehicleId
      };
      
      const response = await api.put(`/maintenance/${vehicleId}/kilometer`, payload);
      
      if (response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message
        };
      } else {
        throw new Error(response.data.message || 'Update failed');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update kilometer';
      setError(errorMsg);
      
      // Check if it's a LuxuryCar validation issue
      if (err.response?.data?.errorType === 'ValidationError' || 
          errorMsg.includes('partnerId') || 
          errorMsg.includes('required')) {
        return {
          success: false,
          error: errorMsg,
          needsSmartCarFix: true
        };
      }
      
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setKilometerLoading(false);
    }
  };

  // Fix kilometer data - SIMPLIFIED
  const fixKilometerInDatabase = async (vehicleId, correctKilometer, reason) => {
    try {
      setFixLoading(true);
      setError(null);
      
      const payload = {
        correctKilometer: parseFloat(correctKilometer),
        reason: reason,
        vehicleId: vehicleId
      };
      
      // Try the fix endpoint first
      try {
        const response = await api.post(`/maintenance/${vehicleId}/fix-kilometer`, payload);
        
        if (response.data.success) {
          setSuccessMessage(response.data.message || 'Kilometer data fixed successfully!');
          setSnackbarOpen(true);
          return {
            success: true,
            data: response.data.data,
            message: response.data.message
          };
        } else {
          throw new Error(response.data.message || 'Fix failed');
        }
      } catch (fixError) {
        // If fix endpoint fails, try regular update with a correction note
        const updatePayload = {
          kilometer: parseFloat(correctKilometer),
          type: 'depart',
          notes: `Kilometer correction: ${reason}`,
          vehicleId: vehicleId
        };
        
        const updateResponse = await api.put(`/maintenance/${vehicleId}/kilometer`, updatePayload);
        
        if (updateResponse.data.success) {
          setSuccessMessage('Kilometer corrected via regular update');
          setSnackbarOpen(true);
          return {
            success: true,
            data: updateResponse.data.data,
            message: 'Kilometer corrected via regular update'
          };
        } else {
          throw new Error(updateResponse.data.message || 'Both fix methods failed');
        }
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fix kilometer data';
      setError(errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    } finally {
      setFixLoading(false);
    }
  };

  // Fix LuxuryCar document issues
  const fixSmartCarDocument = async (vehicleId) => {
    try {
      setFixSmartCarLoading(true);
      setError(null);
      
      const response = await api.post(`/maintenance/${vehicleId}/fix-smartcar`);
      
      if (response.data.success) {
        setSuccessMessage('Luxury car document fixed successfully!');
        setSnackbarOpen(true);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fix Luxury car');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fix Luxury car';
      setError(errorMsg);
      return null;
    } finally {
      setFixSmartCarLoading(false);
    }
  };

  // Get kilometer history
  const fetchKilometerHistory = async (vehicleId) => {
    try {
      setHistoryLoading(true);
      
      const response = await api.get(`/maintenance/${vehicleId}/kilometer-history`);
      
      if (response.data.success) {
        setVehicleHistory(response.data.data.history || []);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch history');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch history';
      setError(errorMsg);
      return null;
    } finally {
      setHistoryLoading(false);
    }
  };

  // Get luxury cars
  const fetchSmartCars = async () => {
    try {
      setLoadingSmartCars(true);
      
      const response = await api.get('/maintenance/vehicles');
      
      if (response.data.success) {
        const allVehicles = response.data.data.vehicles || [];
        const smartCarsList = allVehicles.filter(v => v.type === 'smart' || v.isSmartCar);
        setSmartCars(smartCarsList);
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch vehicles');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch vehicles';
      setError(errorMsg);
      return null;
    } finally {
      setLoadingSmartCars(false);
    }
  };

  // Get all vehicles
  const fetchAllVehicles = async () => {
    try {
      setLoading(true);
      
      const response = await api.get('/maintenance/vehicles');
      
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch vehicles');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch vehicles';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ==================== CALENDAR FUNCTIONS ====================

  // Fetch calendar data
  const fetchCalendarData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (filters.vehicleType !== 'all') params.vehicleType = filters.vehicleType;
      if (filters.status !== 'all') params.status = filters.status;

      const response = await api.get('/calendar/events', { params });

      if (response.data.success) {
        const data = response.data.data;
        
        // Fetch all vehicles to get kilometer data
        const vehiclesResponse = await fetchAllVehicles();
        const allVehicles = vehiclesResponse?.vehicles || [];
        
        // Enhanced events with kilometer data
        const enhancedEvents = data.events.map(event => {
          // Find vehicle in our list
          const vehicle = allVehicles.find(v => v._id === event.vehicleId || v.id === event.vehicleId);
          
          let startKilometer = event.startKilometer || null;
          let endKilometer = event.endKilometer || null;
          let distanceTraveled = null;
          
          // Use vehicle data if available
          if (vehicle) {
            if (!startKilometer && vehicle.kmDepart !== undefined) startKilometer = vehicle.kmDepart;
            if (!endKilometer && vehicle.kmRetour !== undefined) endKilometer = vehicle.kmRetour;
          }
          
          // Calculate distance
          if (startKilometer !== null && endKilometer !== null) {
            distanceTraveled = endKilometer - startKilometer;
          }
          
          // Check if vehicle is luxury car
          const isSmartCar = vehicle?.type === 'smart' || vehicle?.isSmartCar;
          
          // Validate kilometer values
          const hasValidKilometers = 
            (startKilometer === null || startKilometer <= 1000000) &&
            (endKilometer === null || endKilometer <= 1000000);
          
          // Get location information from event
          const startLocation = event.startLocation || event.extendedProps?.startLocation || 
                              event.rentalInfo?.startLocation || 'Not specified';
          const endLocation = event.endLocation || event.extendedProps?.endLocation || 
                            event.rentalInfo?.endLocation || 'Not specified';
          
          return {
            ...event,
            vehicleColor: getVehicleColor(event.vehicleId),
            startKilometer: startKilometer,
            endKilometer: endKilometer,
            startKilometerEntered: startKilometer !== null,
            endKilometerEntered: endKilometer !== null,
            distanceTraveled: distanceTraveled,
            vehicleData: vehicle,
            eventId: event.eventId || event._id || event.id,
            contractNumber: event.contractNumber || `CT${Date.now()}`,
            vehicleName: event.vehicleName || event.title || vehicle?.nomVehicule || vehicle?.name || 'Unknown Vehicle',
            vehicleType: isSmartCar ? 'smart' : (event.vehicleType || 'regular'),
            hasValidKilometers: hasValidKilometers,
            isSmartCar: isSmartCar,
            // Location information
            startLocation: startLocation,
            endLocation: endLocation,
            clientName: event.clientName || event.extendedProps?.clientName || 'Unknown Client',
            clientPhone: event.clientPhone || event.extendedProps?.clientPhone || 'N/A'
          };
        });
        
        setCalendarData({
          ...data,
          events: enhancedEvents
        });

        // Calculate statistics
        calculateStatistics(data, enhancedEvents, allVehicles);
        
      } else {
        setError(response.data.message || 'Failed to fetch data');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to load data';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const calculateStatistics = (data, events, allVehicles) => {
    if (!data) return;

    const smartCarsCount = allVehicles?.filter(v => v.type === 'smart' || v.isSmartCar).length || 0;
    const regularVehiclesCount = allVehicles?.filter(v => v.type === 'regular' || (!v.type && !v.isSmartCar)).length || 0;

    const stats = {
      totalVehicles: allVehicles?.length || 0,
      smartCars: smartCarsCount,
      regularVehicles: regularVehiclesCount,
      activeRentals: events?.filter(e => e.status === 'active').length || 0,
      completedRentals: events?.filter(e => e.status === 'completed' || e.status === 'done').length || 0,
      vehiclesWithKilometer: events?.filter(e => e.hasValidKilometers).length || 0,
      totalDistanceTraveled: events?.reduce((sum, e) => sum + (e.distanceTraveled || 0), 0) || 0
    };

    setStats(stats);
  };

  // ==================== EVENT HANDLERS ====================

  // Handle kilometer update
  const handleKilometerUpdate = async () => {
    if (!kilometerInput || isNaN(kilometerInput)) {
      setError('Please enter a valid kilometer reading');
      return;
    }
    
    const km = parseFloat(kilometerInput);
    if (km < 0 || km > 1000000) {
      setError('Kilometer must be between 0 and 1,000,000 km');
      return;
    }
    
    if (!selectedEvent) {
      setError('No vehicle selected');
      return;
    }
    
    if (kilometerType === 'retour' && selectedEvent.startKilometer) {
      const startKm = parseFloat(selectedEvent.startKilometer);
      if (km < startKm) {
        setError(`Return kilometer (${km} km) cannot be less than departure (${startKm} km)`);
        return;
      }
    }
    
    const result = await updateKilometerInDatabase(
      selectedEvent.vehicleId,
      kilometerInput,
      kilometerType,
      kilometerNotes
    );
    
    if (result.success) {
      setSuccessMessage(result.message || `Kilometer ${kilometerType} updated to ${kilometerInput} km`);
      setSnackbarOpen(true);
      setKilometerDialogOpen(false);
      setKilometerInput('');
      setKilometerNotes('');
      
      await fetchCalendarData();
    } else if (result.needsSmartCarFix) {
      setError(`LuxuryCar validation error: ${result.error}. Please fix the LuxuryCar document first.`);
      setFixSmartCarDialogOpen(true);
    }
  };

  // Handle fix kilometer - WORKING VERSION
  const handleFixKilometer = async () => {
    if (!fixKilometerInput || isNaN(fixKilometerInput)) {
      setError('Please enter a valid kilometer');
      return;
    }
    
    const km = parseFloat(fixKilometerInput);
    if (km < 0 || km > 1000000) {
      setError('Kilometer must be between 0 and 1,000,000 km');
      return;
    }
    
    if (!fixReason || fixReason.trim() === '') {
      setError('Please provide a reason for fixing the kilometer data');
      return;
    }
    
    if (!selectedEvent) {
      setError('No vehicle selected');
      return;
    }
    
    const result = await fixKilometerInDatabase(
      selectedEvent.vehicleId,
      fixKilometerInput,
      fixReason
    );
    
    if (result.success) {
      setSuccessMessage(result.message || 'Kilometer data fixed successfully');
      setSnackbarOpen(true);
      setFixDialogOpen(false);
      setFixKilometerInput('');
      setFixReason('');
      
      await fetchCalendarData();
    } else {
      setError(result.error || 'Failed to fix kilometer data');
    }
  };

  // Handle fix LuxuryCar document
  const handleFixSmartCar = async () => {
    if (!selectedEvent) {
      setError('No vehicle selected');
      return;
    }
    
    const result = await fixSmartCarDocument(selectedEvent.vehicleId);
    
    if (result) {
      setFixSmartCarDialogOpen(false);
      setSuccessMessage('Luxury car document fixed! You can now update kilometer readings.');
      setSnackbarOpen(true);
      await fetchCalendarData();
    }
  };

  // Open kilometer dialog
  const openKilometerDialog = async (event, type) => {
    setSelectedEvent(event);
    setKilometerType(type);
    
    // Fetch current kilometer data
    const kmData = await fetchKilometerDataFromDatabase(event.vehicleId);
    
    if (kmData) {
      if (type === 'depart') {
        setKilometerInput(kmData.kmDepart || kmData.currentKilometer || event.startKilometer || '');
      } else {
        setKilometerInput(kmData.kmRetour || kmData.currentKilometer || event.endKilometer || '');
      }
    } else {
      // Fallback to event data
      if (type === 'depart') {
        setKilometerInput(event.startKilometer || '');
      } else {
        setKilometerInput(event.endKilometer || '');
      }
    }
    
    setKilometerNotes('');
    setError(null);
    setKilometerDialogOpen(true);
  };

  // Open fix dialog - WORKING VERSION
  const openFixDialog = async (event) => {
    setSelectedEvent(event);
    setError(null);
    
    // Try to fetch current kilometer data
    try {
      const kmData = await fetchKilometerDataFromDatabase(event.vehicleId);
      if (kmData) {
        setFixKilometerInput(kmData.currentKilometer || kmData.kmDepart || event.startKilometer || '');
      } else {
        setFixKilometerInput(event.startKilometer || '');
      }
    } catch (err) {
      setFixKilometerInput(event.startKilometer || '');
    }
    
    setFixReason('');
    setFixDialogOpen(true);
  };

  // Open history dialog
  const openHistoryDialog = async (event) => {
    setSelectedEvent(event);
    await fetchKilometerHistory(event.vehicleId);
    setHistoryDialogOpen(true);
  };

  // ==================== RENDER FUNCTIONS ====================

  // Kilometer Dialog
  const renderKilometerDialog = () => {
    const isStart = kilometerType === 'depart';

    return (
      <Dialog 
        open={kilometerDialogOpen} 
        onClose={() => setKilometerDialogOpen(false)}
        maxWidth={isMobile ? "xs" : "sm"}
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ bgcolor: isStart ? '#1976d2' : '#4CAF50', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isStart ? <PlayArrow /> : <Stop />}
            <Typography variant="h6">
              {isStart ? 'Starting Kilometer' : 'Ending Kilometer'}
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ p: 2 }}>
            {selectedEvent && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  <strong>Vehicle:</strong> {selectedEvent.vehicleName}
                </Typography>
                <Typography variant="body2">
                  <strong>Contract:</strong> #{selectedEvent.contractNumber}
                </Typography>
                <Typography variant="body2">
                  <strong>Client:</strong> {selectedEvent.clientName}
                </Typography>
                <Typography variant="body2">
                  <strong>Pick-up:</strong> {selectedEvent.startLocation}
                </Typography>
                <Typography variant="body2">
                  <strong>Drop-off:</strong> {selectedEvent.endLocation}
                </Typography>
              </Alert>
            )}
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom>
                  Select Kilometer Type:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                  <Button
                    variant={kilometerType === 'depart' ? "contained" : "outlined"}
                    color="primary"
                    onClick={() => setKilometerType('depart')}
                    startIcon={<PlayArrow />}
                    fullWidth={isMobile}
                  >
                    Start (Départ)
                  </Button>
                  <Button
                    variant={kilometerType === 'retour' ? "contained" : "outlined"}
                    color="success"
                    onClick={() => setKilometerType('retour')}
                    startIcon={<Stop />}
                    fullWidth={isMobile}
                  >
                    End (Retour)
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label={`${isStart ? 'Starting' : 'Ending'} Kilometer (km)`}
                  type="number"
                  value={kilometerInput}
                  onChange={(e) => setKilometerInput(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Speed sx={{ mr: 1, color: 'text.secondary' }} />,
                    inputProps: { 
                      min: isStart ? 0 : (selectedEvent?.startKilometer || 0),
                      max: 1000000,
                      step: 0.1
                    }
                  }}
                  helperText={`Enter kilometer reading ${isStart ? 'at departure' : 'at return'}`}
                  error={!!error}
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes (Optional)"
                  value={kilometerNotes}
                  onChange={(e) => setKilometerNotes(e.target.value)}
                  multiline
                  rows={2}
                  placeholder="Vehicle condition, issues observed, etc."
                />
              </Grid>
              
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    {error}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setKilometerDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleKilometerUpdate}
            variant="contained"
            disabled={!kilometerInput || kilometerLoading}
            startIcon={kilometerLoading ? <CircularProgress size={20} /> : <Check />}
          >
            {kilometerLoading ? 'Updating...' : 'Update Kilometer'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Fix Kilometer Dialog - WORKING VERSION
  const renderFixDialog = () => {
    if (!selectedEvent) return null;

    return (
      <Dialog 
        open={fixDialogOpen} 
        onClose={() => setFixDialogOpen(false)}
        maxWidth={isMobile ? "xs" : "sm"}
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ bgcolor: '#ff9800', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Build />
            <Typography variant="h6">
              Fix Kilometer Data
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ p: 2 }}>
            <Alert severity="warning" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Important:</strong> This action will correct incorrect kilometer readings.
                Use only if current data is wrong.
              </Typography>
            </Alert>
            
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Vehicle:</strong> {selectedEvent.vehicleName}
              </Typography>
              <Typography variant="body2">
                <strong>Contract:</strong> #{selectedEvent.contractNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Current Kilometer:</strong> {selectedEvent.startKilometer || 0} km
              </Typography>
              <Typography variant="body2">
                <strong>Pick-up:</strong> {selectedEvent.startLocation}
              </Typography>
              <Typography variant="body2">
                <strong>Drop-off:</strong> {selectedEvent.endLocation}
              </Typography>
            </Alert>
            
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Correct Kilometer (km) *"
                  type="number"
                  value={fixKilometerInput}
                  onChange={(e) => setFixKilometerInput(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: <Speed sx={{ mr: 1, color: 'text.secondary' }} />,
                    inputProps: { 
                      min: 0,
                      max: 1000000,
                      step: 0.1
                    }
                  }}
                  helperText="Enter the correct current kilometer reading"
                  error={!!error}
                  autoFocus
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Reason for Correction *"
                  value={fixReason}
                  onChange={(e) => setFixReason(e.target.value)}
                  required
                  multiline
                  rows={3}
                  placeholder="Example: Previous reading was incorrect due to system error, manual entry mistake, etc."
                  helperText="Required: Explain why this correction is needed"
                />
              </Grid>
              
              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    {error}
                  </Alert>
                </Grid>
              )}
            </Grid>
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setFixDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleFixKilometer}
            variant="contained"
            color="warning"
            disabled={!fixKilometerInput || !fixReason || fixLoading}
            startIcon={fixLoading ? <CircularProgress size={20} /> : <Build />}
          >
            {fixLoading ? 'Fixing...' : 'Fix Kilometer Data'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Fix LuxuryCar Dialog
  const renderFixSmartCarDialog = () => {
    return (
      <Dialog 
        open={fixSmartCarDialogOpen} 
        onClose={() => setFixSmartCarDialogOpen(false)}
        maxWidth={isMobile ? "xs" : "sm"}
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ bgcolor: '#9C27B0', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Settings />
            <Typography variant="h6">
              Fix LuxuryCar Document
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ p: 2 }}>
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                This will fix LuxuryCar document issues to enable kilometer updates.
              </Typography>
            </Alert>
            
            {selectedEvent && (
              <Alert severity="warning" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Vehicle:</strong> {selectedEvent.vehicleName}
                </Typography>
                <Typography variant="body2">
                  <strong>Vehicle ID:</strong> {selectedEvent.vehicleId}
                </Typography>
                <Typography variant="body2">
                  <strong>Pick-up:</strong> {selectedEvent.startLocation}
                </Typography>
              </Alert>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setFixSmartCarDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleFixSmartCar}
            variant="contained"
            color="secondary"
            disabled={fixSmartCarLoading}
            startIcon={fixSmartCarLoading ? <CircularProgress size={20} /> : <Build />}
          >
            {fixSmartCarLoading ? 'Fixing...' : 'Fix LuxuryCar'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Vehicle History Dialog
  const renderHistoryDialog = () => {
    return (
      <Dialog 
        open={historyDialogOpen} 
        onClose={() => setHistoryDialogOpen(false)}
        maxWidth={isMobile ? "xs" : "md"}
        fullWidth
        fullScreen={isMobile}
        maxHeight="80vh"
      >
        <DialogTitle sx={{ bgcolor: '#1976d2', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <History />
            <Typography variant="h6">
              Kilometer History
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          {historyLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {selectedEvent && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1">
                    Vehicle: {selectedEvent.vehicleName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total records: {vehicleHistory.length}
                  </Typography>
                </Box>
              )}
              
              {vehicleHistory.length === 0 ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <History sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography color="textSecondary">
                    No kilometer records found.
                  </Typography>
                </Box>
              ) : (
                <TableContainer sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <Table size="small" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell align="right">Kilometer</TableCell>
                        <TableCell>Notes</TableCell>
                        <TableCell>Updated By</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vehicleHistory.map((record, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            {record.date ? new Date(record.date).toLocaleString() : 'N/A'}
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={record.type === 'kilometer_correction' ? 'Correction' : 
                                     record.updateType === 'depart' ? 'Departure' : 
                                     record.updateType === 'retour' ? 'Return' : 
                                     record.type || 'Update'}
                              size="small"
                              color={record.type === 'kilometer_correction' ? 'warning' : 
                                     record.updateType === 'depart' ? 'primary' : 'success'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight="medium">
                              {record.kilometer?.toLocaleString() || '0'} km
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {record.notes || '-'}
                          </TableCell>
                          <TableCell>
                            {record.performedBy || 'System'}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setHistoryDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render calendar view
  const renderCalendarView = () => {
    const events = calendarData?.events?.map(event => ({
      id: event.eventId,
      title: `${event.vehicleName}`,
      start: event.start,
      end: event.end,
      color: event.vehicleColor,
      extendedProps: {
        ...event,
        startLocation: event.startLocation,
        endLocation: event.endLocation
      }
    })) || [];

    return (
      <Paper sx={{ p: 2, height: { xs: 'auto', md: 'calc(100vh - 200px)' }, overflow: 'hidden' }}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">
            Rental Calendar
          </Typography>
          <Button
            size="small"
            startIcon={<Refresh />}
            onClick={fetchCalendarData}
          >
            Refresh
          </Button>
        </Box>

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={isMobile ? "timeGridDay" : "dayGridMonth"}
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          eventClick={(clickInfo) => {
            const event = clickInfo.event.extendedProps;
            setSelectedEvent(event);
            setEventDialogOpen(true);
          }}
          height="100%"
        />
      </Paper>
    );
  };

  // Event Details Dialog - ORGANIZED DATA
  const renderEventDialog = () => {
    if (!selectedEvent) return null;

    const vehicleColor = getVehicleColor(selectedEvent.vehicleId);
    const startKm = selectedEvent.startKilometer || 0;
    const endKm = selectedEvent.endKilometer || 0;
    const hasStartKm = selectedEvent.startKilometerEntered;
    const hasEndKm = selectedEvent.endKilometerEntered;
    const hasInvalidKm = !selectedEvent.hasValidKilometers && startKm > 1000000;
    const isSmartCar = selectedEvent.isSmartCar;

    return (
      <Dialog 
        open={eventDialogOpen} 
        onClose={() => setEventDialogOpen(false)} 
        maxWidth={isMobile ? "xs" : "md"} 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <Box sx={{ 
              width: 16, 
              height: 16, 
              borderRadius: '50%', 
              backgroundColor: vehicleColor 
            }} />
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6">{selectedEvent.vehicleName}</Typography>
                {isSmartCar && (
                  <Chip size="small" label="Luxury Car" color="secondary" />
                )}
              </Box>
              <Typography variant="body2" color="textSecondary">
                Contract #{selectedEvent.contractNumber}
              </Typography>
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers sx={{ overflowY: 'auto' }}>
          <Grid container spacing={3}>
            {/* Vehicle & Contract Info */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <DirectionsCar />
                Vehicle & Contract Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, boxShadow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography variant="body2" color="textSecondary">Vehicle Name</Typography>
                    <Typography variant="body1">{selectedEvent.vehicleName}</Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography variant="body2" color="textSecondary">Vehicle Type</Typography>
                    <Chip 
                      label={isSmartCar ? 'Luxury Car' : 'Regular'} 
                      size="small" 
                      color={isSmartCar ? 'secondary' : 'primary'}
                    />
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography variant="body2" color="textSecondary">Contract Number</Typography>
                    <Typography variant="body1">#{selectedEvent.contractNumber}</Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography variant="body2" color="textSecondary">Status</Typography>
                    <Chip 
                      label={selectedEvent.status}
                      size="small"
                      color={
                        selectedEvent.status === 'active' ? 'success' :
                        selectedEvent.status === 'pending' ? 'warning' : 'default'
                      }
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Client Info */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person />
                Client Information
              </Typography>
              <Paper variant="outlined" sx={{ p: 2, boxShadow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography variant="body2" color="textSecondary">Client Name</Typography>
                    <Typography variant="body1">{selectedEvent.clientName}</Typography>
                  </Grid>
                  <Grid item xs={isMobile ? 12 : 6}>
                    <Typography variant="body2" color="textSecondary">Client Phone</Typography>
                    <Typography variant="body1">{selectedEvent.clientPhone}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Location Info */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Directions />
                Location Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderColor: 'primary.main', boxShadow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOn color="primary" />
                      <Typography variant="subtitle2" color="primary">
                        Pick-up Location
                      </Typography>
                    </Box>
                    <Typography variant="body1">{selectedEvent.startLocation}</Typography>
                    <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                      <Event sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                      {new Date(selectedEvent.start).toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={isMobile ? 12 : 6}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%', borderColor: 'secondary.main', boxShadow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <LocationOff color="secondary" />
                      <Typography variant="subtitle2" color="secondary">
                        Drop-off Location
                      </Typography>
                    </Box>
                    <Typography variant="body1">{selectedEvent.endLocation}</Typography>
                    <Typography variant="caption" color="textSecondary" display="block" sx={{ mt: 1 }}>
                      <Event sx={{ fontSize: 14, verticalAlign: 'middle', mr: 0.5 }} />
                      {new Date(selectedEvent.end).toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            {/* Kilometer Info */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <TrendingUp />
                Kilometer Information
              </Typography>
              
              {hasInvalidKm && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  <Typography variant="body2">
                    <strong>Invalid Kilometer Data:</strong> Current readings appear incorrect.
                  </Typography>
                  <Button 
                    size="small" 
                    color="error"
                    sx={{ mt: 1 }}
                    onClick={() => openFixDialog(selectedEvent)}
                    startIcon={<Build />}
                  >
                    Fix Kilometer Data
                  </Button>
                </Alert>
              )}
              
              <Grid container spacing={2}>
                {/* Start Kilometer */}
                <Grid item xs={isMobile ? 12 : 4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: 'primary.main', boxShadow: 1 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Starting Kilometer
                    </Typography>
                    <Typography variant="h5" color="primary" gutterBottom>
                      {startKm.toLocaleString()} km
                    </Typography>
                    <Button 
                      size="small" 
                      variant={hasStartKm ? "outlined" : "contained"}
                      color="primary"
                      startIcon={hasStartKm ? <Edit /> : <PlayArrow />}
                      onClick={() => openKilometerDialog(selectedEvent, 'depart')}
                      fullWidth
                    >
                      {hasStartKm ? 'Update' : 'Record Start'}
                    </Button>
                  </Paper>
                </Grid>
                
                {/* End Kilometer */}
                <Grid item xs={isMobile ? 12 : 4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: 'success.main', boxShadow: 1 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Ending Kilometer
                    </Typography>
                    <Typography variant="h5" color="success" gutterBottom>
                      {endKm.toLocaleString()} km
                    </Typography>
                    <Button 
                      size="small" 
                      variant={hasEndKm ? "outlined" : "contained"}
                      color="success"
                      startIcon={hasEndKm ? <Edit /> : <Stop />}
                      onClick={() => openKilometerDialog(selectedEvent, 'retour')}
                      fullWidth
                    >
                      {hasEndKm ? 'Update' : 'Record End'}
                    </Button>
                  </Paper>
                </Grid>
                
                {/* Distance Traveled */}
                <Grid item xs={isMobile ? 12 : 4}>
                  <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: 'warning.main', boxShadow: 1 }}>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                      Distance Traveled
                    </Typography>
                    <Typography variant="h5" color="warning" gutterBottom>
                      {selectedEvent.distanceTraveled ? 
                        `${selectedEvent.distanceTraveled.toLocaleString()} km` : 'N/A'}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      From {startKm.toLocaleString()} km to {endKm.toLocaleString()} km
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>

            {/* Actions */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={isMobile ? 12 : 4}>
                  <Button 
                    variant="outlined"
                    fullWidth
                    onClick={() => openHistoryDialog(selectedEvent)}
                    startIcon={<History />}
                  >
                    View History
                  </Button>
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                  <Button 
                    variant="outlined"
                    fullWidth
                    onClick={fetchCalendarData}
                    startIcon={<Refresh />}
                  >
                    Refresh Data
                  </Button>
                </Grid>
                <Grid item xs={isMobile ? 12 : 4}>
                  <Button 
                    variant="outlined"
                    fullWidth
                    color="warning"
                    onClick={() => openFixDialog(selectedEvent)}
                    startIcon={<Build />}
                  >
                    Fix Kilometer
                  </Button>
                </Grid>
                {isSmartCar && (
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined"
                      fullWidth
                      color="secondary"
                      onClick={() => setFixSmartCarDialogOpen(true)}
                      startIcon={<Settings />}
                    >
                      Fix LuxuryCar Document
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setEventDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render statistics cards
  const renderStatistics = () => {
    const statCards = [
      { 
        title: 'Total Vehicles', 
        value: stats.totalVehicles, 
        icon: <DirectionsCar />, 
        color: '#1976d2'
      },
      { 
        title: 'Luxury Cars', 
        value: stats.smartCars, 
        icon: <SmartToy />, 
        color: '#9C27B0'
      },
      { 
        title: 'Active Rentals', 
        value: stats.activeRentals, 
        icon: <PlayArrow />, 
        color: '#4CAF50'
      },
      { 
        title: 'With Valid KM', 
        value: stats.vehiclesWithKilometer, 
        icon: <Speed />, 
        color: '#2196F3'
      },
      { 
        title: 'Total Distance', 
        value: `${stats.totalDistanceTraveled.toLocaleString()} km`, 
        icon: <ShowChart />, 
        color: '#FF9800'
      }
    ];

    return (
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {statCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} lg={2.4} key={index}>
            <Card sx={{ height: '100%', boxShadow: 3, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="body2">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                  <Box sx={{ 
                    backgroundColor: `${stat.color}15`, 
                    borderRadius: '50%', 
                    width: 48, 
                    height: 48, 
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

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchCalendarData();
    }
  }, [user]);

  if (loading && !calendarData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

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
          action={
            <Button color="inherit" size="small" onClick={() => setError(null)}>
              Dismiss
            </Button>
          }
        >
          {error}
        </Alert>
      )}

      {/* Dialogs */}
      {renderKilometerDialog()}
      {renderFixDialog()}
      {renderFixSmartCarDialog()}
      {renderHistoryDialog()}
      {renderEventDialog()}
      
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
          <Grid item xs={12} md="auto">
            <Typography variant="h4" component="h1" gutterBottom>
              Vehicle Rentals Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage kilometer readings and rental locations
            </Typography>
          </Grid>
          <Grid item xs={12} md="auto">
            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                variant="contained"
                startIcon={<Refresh />}
                onClick={fetchCalendarData}
                fullWidth={isMobile}
              >
                Refresh
              </Button>
              <Button
                variant="outlined"
                startIcon={<SmartToy />}
                onClick={fetchSmartCars}
                fullWidth={isMobile}
              >
                Luxury Cars ({smartCars.length})
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Statistics */}
        {renderStatistics()}
      </Box>

      {/* Main Content */}
      <Paper sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)} 
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': { py: 2 }
          }}
        >
          <Tab 
            icon={<CalendarToday />} 
            label="Calendar View" 
            iconPosition="start"
          />
          <Tab 
            icon={<TableChart />} 
            label="Rentals List" 
            iconPosition="start"
          />
        </Tabs>
        
        <Box sx={{ p: 2 }}>
          {activeTab === 0 ? renderCalendarView() : (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                All Rentals ({calendarData?.events?.length || 0})
              </Typography>
              
              {calendarData?.events?.map((task) => {
                const vehicleColor = getVehicleColor(task.vehicleId);
                const hasStartKm = task.startKilometerEntered;
                const hasEndKm = task.endKilometerEntered;
                const isSmartCar = task.isSmartCar;
                
                return (
                  <Paper 
                    key={task.eventId} 
                    variant="outlined" 
                    sx={{ 
                      p: 2, 
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: 1,
                      transition: '0.3s',
                      '&:hover': { 
                        boxShadow: 4,
                        cursor: 'pointer' 
                      }
                    }}
                    onClick={() => {
                      setSelectedEvent(task);
                      setEventDialogOpen(true);
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: vehicleColor 
                          }} />
                          <Box>
                            <Typography variant="body1" fontWeight="medium">
                              {task.vehicleName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography variant="caption" color="textSecondary">
                                #{task.contractNumber}
                              </Typography>
                              {isSmartCar && (
                                <Chip size="small" label="Luxury" color="secondary" />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={3}>
                        <Typography variant="body2" color="textSecondary">Client</Typography>
                        <Typography variant="body1">{task.clientName}</Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={2}>
                        <Typography variant="body2" color="textSecondary">Dates</Typography>
                        <Typography variant="body2">
                          {new Date(task.start).toLocaleDateString()} - {new Date(task.end).toLocaleDateString()}
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12} md={2}>
                        <Typography variant="body2" color="textSecondary">Kilometer</Typography>
                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {hasStartKm ? (
                            <Chip 
                              size="small" 
                              label={`${task.startKilometer?.toLocaleString()} km`}
                              color="primary"
                              variant="outlined"
                            />
                          ) : (
                            <Typography variant="caption" color="error">
                              No start KM
                            </Typography>
                          )}
                          {hasEndKm && (
                            <Chip 
                              size="small" 
                              label={`${task.endKilometer?.toLocaleString()} km`}
                              color="success"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={2}>
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}>
                          <Tooltip title="View Details">
                            <IconButton size="small">
                              <Visibility fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Kilometer History">
                            <IconButton 
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                openHistoryDialog(task);
                              }}
                            >
                              <History fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                );
              })}
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default AnalyticsDashboard;