import React, { useState, useMemo } from 'react';
import api from '../utils/api';
import {
  Grid,
  Paper,
  Typography,
  Box,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Badge,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Divider
} from '@mui/material';
import {
  CalendarToday,
  DirectionsCar,
  Speed,
  Check,
  Build,
  Warning,
  SmartToy,
  CheckCircle,
  Info,
  ExpandMore,
  CarCrash,
  Receipt,
  Add,
  AttachMoney,
  Phone,
  Garage,
  Description,
  DateRange,
  LocalShipping,
  AirportShuttle,
  TwoWheeler,
  DirectionsBus,
  Close,
  Save,
  Cancel,
  TouchApp,
  BuildCircle,
  Verified,
  LocalCarWash,
  TireRepair,
  OilBarrel,
  Construction,
  CheckBox,
  Numbers,
  FormatListNumbered,
  LocationOn,
  Business,
  AccountBalance,
  AccountCircle,
  Star,
  StarBorder
} from '@mui/icons-material';
import MaintenanceFormDialog from './MaintenanceFormDialog';

const VehicleMaintenanceTab = ({
  loading,
  error,
  filteredVehicles,
  filters,
  user,
  setError,
  setSuccessMessage,
  setSnackbarOpen,
  handleFilterChange,
  fetchMaintenanceVehicles,
  maintenanceStats
}) => {
  const [kilometerDialogOpen, setKilometerDialogOpen] = useState(false);
  const [kilometerInput, setKilometerInput] = useState('');
  const [kilometerType, setKilometerType] = useState('depart');
  const [kilometerLoading, setKilometerLoading] = useState(false);
  const [damageDialogOpen, setDamageDialogOpen] = useState(false);
  const [damageLoading, setDamageLoading] = useState(false);
  const [maintenanceFormOpen, setMaintenanceFormOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  
  // Car parts for damage selection with description field for each
  const [carParts, setCarParts] = useState([
    { id: 0, name: 'Pare-chocs Avant', selected: false, description: '' },
    { id: 1, name: 'Pare-chocs Arrière', selected: false, description: '' },
    { id: 2, name: 'Porte Avant Gauche', selected: false, description: '' },
    { id: 3, name: 'Porte Avant Droite', selected: false, description: '' },
    { id: 4, name: 'Porte Arrière Gauche', selected: false, description: '' },
    { id: 5, name: 'Porte Arrière Droite', selected: false, description: '' },
    { id: 6, name: 'Aile Avant Gauche', selected: false, description: '' },
    { id: 7, name: 'Aile Avant Droite', selected: false, description: '' },
    { id: 8, name: 'Aile Arrière Gauche', selected: false, description: '' },
    { id: 9, name: 'Aile Arrière Droite', selected: false, description: '' },
    { id: 10, name: 'Capot', selected: false, description: '' },
    { id: 11, name: 'Coffre', selected: false, description: '' },
    { id: 12, name: 'Toit', selected: false, description: '' },
    { id: 13, name: 'Rétroviseur Gauche', selected: false, description: '' },
    { id: 14, name: 'Rétroviseur Droit', selected: false, description: '' },
    { id: 15, name: 'Phare Avant Gauche', selected: false, description: '' },
    { id: 16, name: 'Phare Avant Droit', selected: false, description: '' },
    { id: 17, name: 'Feu Arrière Gauche', selected: false, description: '' },
    { id: 18, name: 'Feu Arrière Droit', selected: false, description: '' },
    { id: 19, name: 'Vitre Avant', selected: false, description: '' },
    { id: 20, name: 'Vitre Arrière', selected: false, description: '' },
    { id: 21, name: 'Jante Avant Gauche', selected: false, description: '' },
    { id: 22, name: 'Jante Avant Droite', selected: false, description: '' },
    { id: 23, name: 'Jante Arrière Gauche', selected: false, description: '' },
    { id: 24, name: 'Jante Arrière Droite', selected: false, description: '' }
  ]);

  // Color palette for vehicle types
  const typeColors = {
    smart: '#9C27B0',
    car: '#1976d2',
    truck: '#FF9800',
    van: '#4CAF50',
    motorcycle: '#F44336',
    bus: '#795548',
    default: '#757575'
  };

  // Vehicle type icons
  const getVehicleTypeIcon = (type) => {
    switch (type) {
      case 'smart': return <SmartToy />;
      case 'car': return <DirectionsCar />;
      case 'truck': return <LocalShipping />;
      case 'van': return <AirportShuttle />;
      case 'motorcycle': return <TwoWheeler />;
      case 'bus': return <DirectionsBus />;
      default: return <DirectionsCar />;
    }
  };

  // Function to handle car part selection
  const handleCarPartSelect = (partId) => {
    setCarParts(prev => prev.map(part => {
      if (part.id === partId) {
        return { ...part, selected: !part.selected };
      }
      return part;
    }));
  };

  // Function to handle description change for a specific part
  const handleDescriptionChange = (partId, description) => {
    setCarParts(prev => prev.map(part => {
      if (part.id === partId) {
        return { ...part, description };
      }
      return part;
    }));
  };

  // Update this function in your frontend file
  const sendDamageToBackend = async (vehicleId, damagesArray) => {
    try {
      console.log('Sending damages array to backend:', damagesArray);
    
      const vehicle = filteredVehicles.find(v => v.id === vehicleId);
      const vehicleType = vehicle?.vehicleType || (vehicle?.isSmartCar ? 'smart' : 'regular');
    
      // Send to the new accident endpoint
      const response = await api.put(`/accidents/vehicles/${vehicleId}/damages`, {
        damages: damagesArray,
        vehicleType: vehicleType,
        location: 'Garage', // You can add a location input in your dialog
        description: 'Damage reported during maintenance check'
      });
    
      if (response.data.success) {
        console.log('Damages sent successfully:', response.data);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to send damages');
      }
    
    } catch (error) {
      console.error('Error sending damages:', error);
      throw error;
    }
  };

  // Open kilometer dialog
  const openKilometerDialog = (vehicle, type) => {
    setSelectedVehicle(vehicle);
    setKilometerType(type);
    setKilometerInput(type === 'depart' ? vehicle.kmDepart || '' : vehicle.kmRetour || '');
    setKilometerDialogOpen(true);
  };

  // Open damage dialog
  const openDamageDialog = (vehicle) => {
    setSelectedVehicle(vehicle);
    // Reset car parts selection and descriptions
    setCarParts(prev => prev.map(part => ({ 
      ...part, 
      selected: false, 
      description: '' 
    })));
    setDamageDialogOpen(true);
  };

  // Open maintenance form dialog
  const openMaintenanceFormDialog = (vehicle) => {
    setSelectedVehicle(vehicle);
    setMaintenanceFormOpen(true);
  };

  // Update kilometer
  const updateKilometer = async () => {
    if (!selectedVehicle || !kilometerInput || isNaN(kilometerInput)) {
      setError('Please enter a valid kilometer reading');
      return;
    }
    
    try {
      setKilometerLoading(true);
      
      const payload = {
        kilometer: parseFloat(kilometerInput),
        type: kilometerType,
        vehicleType: selectedVehicle.vehicleType || (selectedVehicle.isSmartCar ? 'smart' : 'regular'),
        notes: `Maintenance: ${kilometerType === 'depart' ? 'Start' : 'End'} reading`
      };
      
      const response = await api.put(`/factures/maintenance/${selectedVehicle.id}/kilometer`, payload);
      
      if (response.data.success) {
        setSuccessMessage(`Kilometer updated to ${kilometerInput} km`);
        setSnackbarOpen(true);
        setKilometerDialogOpen(false);
        setKilometerInput('');
        
        await fetchMaintenanceVehicles();
      } else {
        throw new Error(response.data.message || 'Failed to update kilometer');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to update kilometer';
      setError(errorMsg);
    } finally {
      setKilometerLoading(false);
    }
  };

  // Add new damage - Each with its own description
  const addDamage = async () => {
    // Get selected damages with their descriptions
    const selectedDamages = carParts
      .filter(part => part.selected)
      .map(part => ({
        id: part.id,
        name: part.name,
        description: part.description || `${part.name} - endommagé`
      }));
    
    console.log('Selected damages with descriptions:', selectedDamages);
    
    if (!selectedVehicle || selectedDamages.length === 0) {
      setError('Please select at least one damaged area');
      return;
    }
    
    // Validate that all selected damages have descriptions
    const damagesWithoutDesc = selectedDamages.filter(d => !d.description.trim());
    if (damagesWithoutDesc.length > 0) {
      setError(`Please add description for: ${damagesWithoutDesc.map(d => d.name).join(', ')}`);
      return;
    }
    
    try {
      setDamageLoading(true);
      
      console.log('Sending damages for vehicle:', selectedVehicle.id);
      console.log('Damages to send:', selectedDamages);
      
      // Send damages array to backend
      const response = await sendDamageToBackend(selectedVehicle.id, selectedDamages);
      
      if (response.success) {
        setSuccessMessage(`${selectedDamages.length} damage(s) added to ${selectedVehicle.name}`);
        setSnackbarOpen(true);
        setDamageDialogOpen(false);
        
        // Reset car parts selection
        setCarParts(prev => prev.map(part => ({ 
          ...part, 
          selected: false, 
          description: '' 
        })));
        
        // Refresh the list
        await fetchMaintenanceVehicles();
      } else {
        throw new Error(response.message || 'Failed to add damage');
      }
      
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to add damage';
      setError(errorMsg);
      console.error('Add damage error details:', err);
    } finally {
      setDamageLoading(false);
    }
  };

  // Render maintenance status chip
  const renderMaintenanceStatus = (vehicle) => {
    let color = 'default';
    let icon = null;
    let label = 'Unknown';
    
    if (vehicle.damageCount > 0) {
      color = 'error';
      icon = <CarCrash />;
      label = `${vehicle.damageCount} Damage(s)`;
    } else if (vehicle.maintenanceStatus === 'due') {
      color = 'error';
      icon = <Warning />;
      label = 'Due';
    } else if (vehicle.maintenanceStatus === 'due_soon') {
      color = 'warning';
      icon = <Info />;
      label = 'Due Soon';
    } else if (vehicle.maintenanceStatus === 'ok') {
      color = 'success';
      icon = <CheckCircle />;
      label = 'OK';
    } else {
      color = 'success';
      icon = <CheckCircle />;
      label = 'OK';
    }
    
    return (
      <Chip
        icon={icon}
        label={label}
        color={color}
        size="small"
        variant="outlined"
      />
    );
  };

  // Render maintenance progress bar
  const renderMaintenanceProgress = (vehicle) => {
    const progress = vehicle.maintenanceProgress || 0;
    
    let color = '#4CAF50'; // Green
    if (progress >= 80) color = '#FF9800'; // Orange
    if (progress >= 100) color = '#F44336'; // Red
    
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
          <Typography variant="caption" color="textSecondary">
            Maintenance Progress
          </Typography>
          <Typography variant="caption" fontWeight="medium">
            {progress}%
          </Typography>
        </Box>
        <Box sx={{
          height: 8,
          backgroundColor: 'grey.200',
          borderRadius: 4,
          overflow: 'hidden'
        }}>
          <Box sx={{
            height: '100%',
            width: `${Math.min(100, progress)}%`,
            backgroundColor: color,
            transition: 'width 0.3s ease'
          }} />
        </Box>
        <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
          Next due at: {vehicle.nextMaintenanceDue?.toLocaleString() || 'Unknown'} km
        </Typography>
      </Box>
    );
  };

  // Render kilometer dialog
  const renderKilometerDialog = () => {
    if (!selectedVehicle) return null;
    return (
      <Dialog
        open={kilometerDialogOpen}
        onClose={() => setKilometerDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Speed />
            Update Kilometer Reading - {selectedVehicle.name}
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Current {kilometerType === 'depart' ? 'Depart' : 'Retour'}: {kilometerType === 'depart' ? selectedVehicle.kmDepart || 0 : selectedVehicle.kmRetour || 0} km
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Current Kilometer: {selectedVehicle.currentKilometer?.toLocaleString() || 0} km
            </Typography>
          </Box>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Update Type</InputLabel>
            <Select
              value={kilometerType}
              label="Update Type"
              onChange={(e) => setKilometerType(e.target.value)}
            >
              <MenuItem value="depart">Depart Kilometer</MenuItem>
              <MenuItem value="retour">Retour Kilometer</MenuItem>
              <MenuItem value="current">Current Kilometer</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label={`New ${kilometerType === 'depart' ? 'Depart' : kilometerType === 'retour' ? 'Retour' : 'Current'} Kilometer`}
            value={kilometerInput}
            onChange={(e) => setKilometerInput(e.target.value)}
            type="number"
            InputProps={{
              endAdornment: <Typography color="textSecondary">km</Typography>,
            }}
          />
          
          <Alert severity="info" sx={{ mt: 2 }}>
            {kilometerType === 'depart'
              ? 'This is the starting kilometer reading when the vehicle is rented.'
              : kilometerType === 'retour'
              ? 'This is the ending kilometer reading when the vehicle is returned.'
              : 'This updates the current kilometer reading directly.'}
          </Alert>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setKilometerDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={updateKilometer}
            disabled={kilometerLoading}
            startIcon={kilometerLoading ? <CircularProgress size={20} /> : <Save />}
          >
            {kilometerLoading ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render damage dialog with individual descriptions
  const renderDamageDialog = () => {
    if (!selectedVehicle) return null;
    const selectedCount = carParts.filter(part => part.selected).length;
    
    return (
      <Dialog
        open={damageDialogOpen}
        onClose={() => {
          setDamageDialogOpen(false);
          // Reset selections when dialog closes
          setCarParts(prev => prev.map(part => ({ 
            ...part, 
            selected: false, 
            description: '' 
          })));
        }}
        maxWidth="md"
        fullWidth
        sx={{ '& .MuiDialog-paper': { maxHeight: '80vh' } }}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CarCrash />
            <Typography variant="h6">
              Report Damage - {selectedVehicle.name}
            </Typography>
          </Box>
        </DialogTitle>
        
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Select Damaged Areas and Add Description for Each *
              </Typography>
              
              <Paper 
                variant="outlined" 
                sx={{ 
                  p: 2, 
                  maxHeight: '50vh', 
                  overflow: 'auto',
                  backgroundColor: 'background.default'
                }}
              >
                {carParts.map((part) => (
                  <Box 
                    key={part.id} 
                    sx={{ 
                      mb: 2,
                      p: 2,
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: part.selected ? 'primary.main' : 'divider',
                      backgroundColor: part.selected ? 'primary.light' : 'background.paper',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={part.selected}
                              onChange={() => handleCarPartSelect(part.id)}
                              icon={<CheckBox sx={{ color: 'text.disabled' }} />}
                              checkedIcon={<CheckBox color="primary" />}
                            />
                          }
                          label={
                            <Box>
                              <Typography variant="body2" fontWeight="medium">
                                {part.id}: {part.name}
                              </Typography>
                            </Box>
                          }
                        />
                      </Grid>
                      
                      <Grid item xs={12} sm={8}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Description du dommage"
                          placeholder={`Ex: ${part.name} - rayé/bossé/fêlé`}
                          value={part.description}
                          onChange={(e) => handleDescriptionChange(part.id, e.target.value)}
                          disabled={!part.selected}
                          InputProps={{
                            startAdornment: <Description fontSize="small" sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                          helperText="Décrivez le dommage spécifique"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </Paper>
              
              <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                Selected: {selectedCount} area(s)
              </Typography>
              
              {selectedCount > 0 && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Les dommages seront stockés comme:
                  </Typography>
                  {carParts
                    .filter(p => p.selected)
                    .map(p => (
                      <Typography key={p.id} variant="caption" component="div">
                        • {p.id}: {p.description || 'Pas de description'}
                      </Typography>
                    ))}
                </Alert>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={() => {
              setDamageDialogOpen(false);
              setCarParts(prev => prev.map(part => ({ 
                ...part, 
                selected: false, 
                description: '' 
              })));
            }}
            startIcon={<Close />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={addDamage}
            disabled={damageLoading || selectedCount === 0}
            startIcon={damageLoading ? <CircularProgress size={20} /> : <Add />}
          >
            {damageLoading ? 'Adding Damage...' : `Add Damage (${selectedCount})`}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // Render vehicle list
  const renderVehicleList = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (filteredVehicles.length === 0) {
      return (
        <Alert severity="info">
          No vehicles found matching your filters.
        </Alert>
      );
    }
    return (
      <>
        {/* Vehicle table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Vehicle</TableCell>
                <TableCell>Kilometers</TableCell>
                <TableCell>Maintenance</TableCell>
                <TableCell>Damages</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredVehicles.map((vehicle) => {
                const kmDifference = vehicle.kmDifference || 0;
                const maintenanceNeeded = kmDifference > 10000;
                
                return (
                  <TableRow
                    key={vehicle.id}
                    sx={{
                      '&:hover': { backgroundColor: 'action.hover' },
                      borderLeft: `4px solid ${vehicle.isSmartCar ? '#9C27B0' : (typeColors[vehicle.type] || typeColors.default)}`,
                      backgroundColor: maintenanceNeeded ? 'warning.light' : 'inherit'
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ color: vehicle.isSmartCar ? '#9C27B0' : (typeColors[vehicle.type] || typeColors.default) }}>
                          {vehicle.isSmartCar ? <SmartToy /> : getVehicleTypeIcon(vehicle.type)}
                        </Box>
                        <Box>
                          <Typography fontWeight="medium">{vehicle.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <Typography variant="body2" color="textSecondary">
                              {vehicle.matricule}
                            </Typography>
                            {vehicle.isSmartCar && (
                              <Chip
                                label="Luxury Car"
                                size="small"
                                sx={{ backgroundColor: '#9C27B0', color: 'white', height: 20, fontSize: '0.7rem' }}
                              />
                            )}
                            {maintenanceNeeded && (
                              <Chip
                                label="MAINTENANCE NEEDED"
                                size="small"
                                color="warning"
                                sx={{ fontWeight: 'bold', fontSize: '0.6rem' }}
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">
                          Départ: {vehicle.kmDepart?.toLocaleString() || 0} km
                        </Typography>
                        <Typography variant="body2">
                          Retour: {vehicle.kmRetour?.toLocaleString() || 0} km
                        </Typography>
                        <Typography variant="body2" fontWeight="bold">
                          Current: {vehicle.currentKilometer?.toLocaleString() || 0} km
                        </Typography>
                        {maintenanceNeeded && (
                          <Typography variant="caption" color="warning.dark" fontWeight="bold">
                             Distance: {kmDifference.toLocaleString()} km (exceeds 10,000 km limit)
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ width: 180 }}>
                        {renderMaintenanceProgress(vehicle)}
                        <Box sx={{ mt: 1 }}>
                          {renderMaintenanceStatus(vehicle)}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {vehicle.damageCount > 0 ? (
                        <Chip
                          label={`${vehicle.damageCount} damage(s)`}
                          color="error"
                          size="small"
                          variant="outlined"
                          icon={<CarCrash />}
                        />
                      ) : (
                        <Chip
                          label="No damages"
                          color="success"
                          size="small"
                          variant="outlined"
                          icon={<Check />}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Tooltip title="Create Facture">
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => openMaintenanceFormDialog(vehicle)}
                          >
                            <Receipt />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Add Damage">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => openDamageDialog(vehicle)}
                          >
                            <CarCrash />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Update Kilometers">
                          <IconButton
                            size="small"
                            color="info"
                            onClick={() => openKilometerDialog(vehicle, 'depart')}
                          >
                            <Speed />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  return (
    <>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          {`${filteredVehicles.length} vehicles`}
        </Typography>
      </Box>
      
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3, boxShadow: 2, borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Filters
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Vehicle Type</InputLabel>
              <Select
                value={filters.vehicleType}
                label="Vehicle Type"
                onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="smart">Luxury Cars</MenuItem>
                <MenuItem value="regular">Regular Vehicles</MenuItem>
                <MenuItem value="car">Cars</MenuItem>
                <MenuItem value="truck">Trucks</MenuItem>
                <MenuItem value="van">Vans</MenuItem>
                <MenuItem value="motorcycle">Motorcycles</MenuItem>
                <MenuItem value="bus">Buses</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Maintenance Status</InputLabel>
              <Select
                value={filters.maintenanceStatus}
                label="Maintenance Status"
                onChange={(e) => handleFilterChange('maintenanceStatus', e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="due">Due</MenuItem>
                <MenuItem value="due_soon">Due Soon</MenuItem>
                <MenuItem value="ok">OK</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      
      {renderVehicleList()}
      
      {/* Dialogs */}
      {renderKilometerDialog()}
      {renderDamageDialog()}
      
      <MaintenanceFormDialog
        open={maintenanceFormOpen}
        onClose={() => setMaintenanceFormOpen(false)}
        selectedVehicle={selectedVehicle}
        user={user}
        setError={setError}
        setSuccessMessage={setSuccessMessage}
        setSnackbarOpen={setSnackbarOpen}
        fetchMaintenanceVehicles={fetchMaintenanceVehicles}
      />
    </>
  );
};

export default VehicleMaintenanceTab;