import React, { useState } from 'react';
import api from '../utils/api';
import {
  Box,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  Modal,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Avatar,
  LinearProgress
} from '@mui/material';
import {
  Search,
  FilterList,
  Visibility,
  Print,
  CheckCircle,
  Paid,
  Pending,
  DirectionsCar,
  SmartToy,
  Close,
  Receipt,
  Print as PrintIcon,
  Phone,
  Email,
  Business,
  DirectionsCar as CarIcon,
  Garage,
  AttachMoney,
  Build,
  CarCrash,
  Category,
  CheckBox,
  CalendarToday,
  AccountCircle,
  Description,
  LocationOn,
  LocalShipping,
  Speed,
  History,
  Assignment,
  Payment,
  Euro,
  Timer,
  DoneAll,
  Warning,
  Info,
  Star,
  WorkspacePremium,
  Gavel,
  Description as DescriptionIcon,
  NoteAdd,
  BuildCircle,
  CarRepair,
  AutoFixHigh,
  Engineering,
  Settings,
  Palette,
  Dashboard,
  Chair,
  MusicNote,
  BatteryChargingFull,
  OilBarrel,
  TireRepair,
  WaterDrop,
  AcUnit,
  Lightbulb,
  VolumeUp,
  Memory,
  PowerSettingsNew
} from '@mui/icons-material';

// Import the PrintFactureModal component
import PrintFactureModal from './PrintFactureModal';

const FacturesTab = ({
  factures,
  loading,
  user,
  setError,
  setSuccessMessage,
  setSnackbarOpen,
  fetchFactures
}) => {
  const [factureDetailsOpen, setFactureDetailsOpen] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);
  const [factureFilter, setFactureFilter] = useState('all');
  const [factureSearch, setFactureSearch] = useState('');
  const [printFactureOpen, setPrintFactureOpen] = useState(false);
  const [printFactureData, setPrintFactureData] = useState(null);
  const [printLoading, setPrintLoading] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState(0);

  // Helper function to get parts from facture (handles both old and new format)
  const getPartsFromFacture = (facture) => {
    if (!facture) return [];
    
    // First try to get from maintenanceDetails.partsReplaced (new format)
    if (facture.maintenanceDetails && Array.isArray(facture.maintenanceDetails.partsReplaced)) {
      return facture.maintenanceDetails.partsReplaced.map(part => ({
        ...part,
        name: part.partName || part.name || 'Pièce non nommée',
        estimatedPrice: part.unitPrice || part.total || part.estimatedPrice || 0,
        category: part.category || 'Mécanique',
        type: part.type || 'mechanical'
      }));
    }
    
    // Fallback to selectedParts (old format)
    if (Array.isArray(facture.selectedParts)) {
      return facture.selectedParts;
    }
    
    // Try to parse if it's a string
    if (typeof facture.selectedParts === 'string') {
      try {
        return JSON.parse(facture.selectedParts || '[]');
      } catch (err) {
        console.error('Error parsing selectedParts:', err);
      }
    }
    
    return [];
  };

  // Helper function to get damages from facture (handles both old and new format)
  const getDamagesFromFacture = (facture) => {
    if (!facture) return [];
    
    // First try to get from damageRepairs (new format)
    if (Array.isArray(facture.damageRepairs)) {
      return facture.damageRepairs.map(damage => ({
        ...damage,
        name: damage.damageArea || damage.name || 'Zone non nommée',
        estimatedPrice: damage.cost || damage.estimatedPrice || 0,
        category: damage.category || 'Carrosserie',
        type: damage.type || 'damage'
      }));
    }
    
    // Fallback to damageAreas (old format)
    if (Array.isArray(facture.damageAreas)) {
      return facture.damageAreas;
    }
    
    // Try to parse if it's a string
    if (typeof facture.damageAreas === 'string') {
      try {
        return JSON.parse(facture.damageAreas || '[]');
      } catch (err) {
        console.error('Error parsing damageAreas:', err);
      }
    }
    
    return [];
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Mécanique': return <Build />;
      case 'Électrique': return <BatteryChargingFull />;
      case 'Climatisation': return <AcUnit />;
      case 'Refroidissement': return <WaterDrop />;
      case 'Filtres': return <OilBarrel />;
      case 'Roues': return <TireRepair />;
      case 'Direction': return <Dashboard />;
      case 'Extérieur': return <Palette />;
      case 'Intérieur': return <Chair />;
      case 'Divertissement': return <MusicNote />;
      case 'Avant': return <DirectionsCar />;
      case 'Arrière': return <DirectionsCar />;
      case 'Côté Gauche': return <DirectionsCar />;
      case 'Côté Droit': return <DirectionsCar />;
      case 'Haut': return <DirectionsCar />;
      default: return <Build />;
    }
  };

  // Get part icon
  const getPartIcon = (partName) => {
    if (!partName) return <Build />;
    
    const name = partName.toLowerCase();
    if (name.includes('moteur')) return <PowerSettingsNew />;
    if (name.includes('transmission')) return <Settings />;
    if (name.includes('frein')) return <Gavel />;
    if (name.includes('suspension')) return <CarRepair />;
    if (name.includes('échappement')) return <LocalShipping />;
    if (name.includes('batterie')) return <BatteryChargingFull />;
    if (name.includes('alternateur')) return <Memory />;
    if (name.includes('démarreur')) return <PowerSettingsNew />;
    if (name.includes('éclairage')) return <Lightbulb />;
    if (name.includes('climatisation')) return <AcUnit />;
    if (name.includes('radiateur')) return <WaterDrop />;
    if (name.includes('pompe')) return <WaterDrop />;
    if (name.includes('filtre')) return <OilBarrel />;
    if (name.includes('pneu') || name.includes('roue') || name.includes('jante')) return <TireRepair />;
    if (name.includes('direction')) return <Dashboard />;
    if (name.includes('carrosserie') || name.includes('peinture')) return <Palette />;
    if (name.includes('vitre')) return <Description />;
    if (name.includes('siège')) return <Chair />;
    if (name.includes('tableau')) return <Dashboard />;
    if (name.includes('audio')) return <VolumeUp />;
    if (name.includes('électronique')) return <Memory />;
    if (name.includes('phare') || name.includes('feu')) return <Lightbulb />;
    if (name.includes('rétroviseur')) return <Visibility />;
    if (name.includes('pare-chocs')) return <CarRepair />;
    if (name.includes('porte')) return <CarRepair />;
    if (name.includes('aile')) return <CarRepair />;
    if (name.includes('capot')) return <CarRepair />;
    if (name.includes('coffre')) return <CarRepair />;
    if (name.includes('toit')) return <CarRepair />;
    return <Build />;
  };

  // Fetch facture for printing - UPDATED to use print endpoint
  const fetchFactureForPrint = async (factureId) => {
    try {
      setPrintLoading(true);
      
      // Try the print endpoint first
      try {
        const response = await api.get(`/factures/${factureId}/print`);
        
        if (response.data.success) {
          const printData = response.data.data;
          console.log('Print endpoint data:', printData);
          
          // Get parts and damages using helper functions
          const selectedParts = getPartsFromFacture(printData.fullFacture || printData.facture || {});
          const damageAreas = getDamagesFromFacture(printData.fullFacture || printData.facture || {});
          
          // Format data for printing
          const formattedPrintData = {
            facture: {
              ...printData.fullFacture || printData.facture || {},
              date: printData.facture?.date || 
                   (printData.fullFacture?.date ? new Date(printData.fullFacture.date).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    }) : 'N/A'),
              selectedParts: selectedParts,
              damageAreas: damageAreas,
              // Additional facture details
              notes: printData.fullFacture?.notes || printData.facture?.notes || '',
              description: printData.fullFacture?.description || printData.facture?.description || `Maintenance chez ${printData.fullFacture?.garageName || 'le garage'}`,
              garageName: printData.fullFacture?.garageName || printData.facture?.garageName || 'N/A',
              phoneNumber: printData.fullFacture?.phoneNumber || printData.facture?.phoneNumber || 'N/A',
              vehicleName: printData.fullFacture?.vehicleName || printData.facture?.vehicleName || 'N/A',
              matricule: printData.fullFacture?.matricule || printData.facture?.matricule || 'N/A',
              vehicleType: printData.fullFacture?.vehicleType || printData.facture?.vehicleType || 'regular',
              factureNumber: printData.fullFacture?.factureNumber || printData.facture?.factureNumber || `FACT-${printData.fullFacture?._id?.slice(-8) || '000000'}`,
              status: printData.fullFacture?.status || printData.facture?.status || 'pending',
              // Use formatted amounts from backend if available
              amountFormatted: printData.financialInfo?.amountFormatted || `${(printData.fullFacture?.amount || 0).toFixed(2)} MAD`,
              taxFormatted: printData.financialInfo?.taxFormatted || `${(printData.fullFacture?.tax || 0).toFixed(2)} MAD`,
              discountFormatted: printData.financialInfo?.discountFormatted || `${(printData.fullFacture?.discount || 0).toFixed(2)} MAD`,
              totalAmountFormatted: printData.financialInfo?.totalAmountFormatted || `${(printData.fullFacture?.totalAmount || printData.fullFacture?.amount || 0).toFixed(2)} MAD`,
              subtotalFormatted: printData.financialInfo?.subtotalFormatted || `${(printData.fullFacture?.subtotal || printData.fullFacture?.amount || 0).toFixed(2)} MAD`,
            },
            vehicle: printData.vehicle || {},
            agencyInfo: printData.agencyInfo || {},
            garageInfo: printData.garageInfo || {},
            registeredBy: printData.registeredBy || {},
            printDate: printData.printDate || new Date().toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }),
            printTime: printData.printTime || new Date().toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            }),
          };
          
          console.log('Formatted print data:', formattedPrintData);
          setPrintFactureData(formattedPrintData);
          setPrintFactureOpen(true);
        } else {
          throw new Error(response.data.message || 'Failed to fetch facture for printing');
        }
      } catch (printError) {
        console.warn('Print endpoint failed, falling back to regular endpoint:', printError);
        
        // Fallback to regular endpoint
        const response = await api.get(`/factures/${factureId}`);
        
        if (response.data.success) {
          const { facture, vehicle, registeredBy } = response.data.data;
          
          // Get parts and damages using helper functions
          const selectedParts = getPartsFromFacture(facture);
          const damageAreas = getDamagesFromFacture(facture);
          
          // Format data for printing
          const printData = {
            facture: {
              ...facture,
              date: facture.date ? new Date(facture.date).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }) : 'N/A',
              selectedParts: selectedParts,
              damageAreas: damageAreas,
              amountFormatted: `${(facture.amount || 0).toFixed(2)} MAD`,
              taxFormatted: `${(facture.tax || 0).toFixed(2)} MAD`,
              discountFormatted: `${(facture.discount || 0).toFixed(2)} MAD`,
              totalAmountFormatted: `${(facture.totalAmount || facture.amount || 0).toFixed(2)} MAD`,
              subtotalFormatted: `${(facture.subtotal || facture.amount || 0).toFixed(2)} MAD`,
            },
            vehicle: vehicle || {},
            agencyInfo: {
              name: registeredBy?.entreprise || user?.entreprise || 'Company Name',
              logo: registeredBy?.logoEntreprise || user?.logoEntreprise || '',
              country: registeredBy?.country || user?.country || '',
              city: registeredBy?.city || user?.city || '',
              phone: registeredBy?.phone || user?.number || '',
              email: registeredBy?.userEmail || user?.email || '',
            },
            garageInfo: {
              name: facture.garageName || 'N/A',
              phone: facture.phoneNumber || 'N/A',
            },
            registeredBy: registeredBy || {},
            printDate: new Date().toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            }),
            printTime: new Date().toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            }),
          };
          
          setPrintFactureData(printData);
          setPrintFactureOpen(true);
        } else {
          throw new Error(response.data.message || 'Failed to fetch facture for printing');
        }
      }
    } catch (err) {
      console.error('Error fetching facture for print:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Failed to fetch facture for printing';
      setError(errorMsg);
      setSnackbarOpen(true);
    } finally {
      setPrintLoading(false);
    }
  };

  // Mark facture as paid
  const handleMarkAsPaid = async (factureId) => {
    try {
      const response = await api.put(`/factures/${factureId}/pay`, {
        paymentMethod: 'cash',
        paymentDate: new Date().toISOString(),
        paymentReference: `PAY-${Date.now()}`
      });
      
      if (response.data.success) {
        setSuccessMessage('Facture marked as paid successfully');
        setSnackbarOpen(true);
        await fetchFactures();
      } else {
        throw new Error(response.data.message || 'Failed to mark as paid');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Failed to mark as paid';
      setError(errorMsg);
    }
  };

  // Render factures table
  const renderFacturesTable = () => {
    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }

    if (factures.length === 0) {
      return (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="body1">
            No factures found. Create your first facture by scheduling maintenance for a vehicle.
          </Typography>
        </Alert>
      );
    }

    // Filter factures
    let filteredFactures = [...factures];
    
    // Apply status filter
    if (factureFilter !== 'all') {
      filteredFactures = filteredFactures.filter(f => f.status === factureFilter);
    }
    
    // Apply search filter
    if (factureSearch) {
      const searchLower = factureSearch.toLowerCase();
      filteredFactures = filteredFactures.filter(f => 
        (f.factureNumber && f.factureNumber.toLowerCase().includes(searchLower)) ||
        (f.vehicleName && f.vehicleName.toLowerCase().includes(searchLower)) ||
        (f.matricule && f.matricule.toLowerCase().includes(searchLower)) ||
        (f.garageName && f.garageName.toLowerCase().includes(searchLower)) ||
        (f.description && f.description.toLowerCase().includes(searchLower))
      );
    }

    if (filteredFactures.length === 0) {
      return (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          <Typography variant="body1">
            No factures match your search criteria.
          </Typography>
        </Alert>
      );
    }

    return (
      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.light' }}>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Facture #</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Vehicle</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Matricule</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Garage</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'primary.dark' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFactures.map((facture) => {
              const parts = getPartsFromFacture(facture);
              const damages = getDamagesFromFacture(facture);
              const partsCount = parts.length;
              const damagesCount = damages.length;
              
              return (
                <TableRow 
                  key={facture._id || facture.id}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: facture.status === 'paid' ? '#E8F5E9' : '#FFF3E0',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s'
                    },
                    borderLeft: facture.status === 'paid' ? '4px solid #4CAF50' : '4px solid #FF9800',
                    cursor: 'pointer'
                  }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Receipt color="primary" fontSize="small" />
                      <Typography variant="body2" fontWeight="bold">
                        {facture.factureNumber || `FACT-${(facture._id || '000000').slice(-8)}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ 
                        width: 32, 
                        height: 32, 
                        bgcolor: facture.isSmartCar ? '#9C27B0' : '#2196F3',
                        fontSize: 14 
                      }}>
                        {facture.isSmartCar ? <SmartToy /> : <DirectionsCar />}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="medium">
                          {facture.vehicleName || 'Unknown Vehicle'}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                          {partsCount > 0 && (
                            <Chip 
                              label={`${partsCount} pièces`} 
                              size="small" 
                              variant="outlined"
                              icon={<Build fontSize="small" />}
                            />
                          )}
                          {damagesCount > 0 && (
                            <Chip 
                              label={`${damagesCount} dommages`} 
                              size="small" 
                              variant="outlined"
                              icon={<CarCrash fontSize="small" />}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={facture.matricule || 'N/A'} 
                      size="small" 
                      variant="outlined"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Garage color="action" fontSize="small" />
                      <Typography variant="body2">
                        {facture.garageName || 'N/A'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {facture.date ? new Date(facture.date).toLocaleDateString('fr-FR') : 'N/A'}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {facture.date ? new Date(facture.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) : ''}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Euro fontSize="small" color="success" />
                      <Typography variant="body1" fontWeight="bold" color="success.dark">
                        {(facture.totalAmount || facture.amount || 0).toLocaleString()} MAD
                      </Typography>
                    </Box>
                    {facture.discount > 0 && (
                      <Typography variant="caption" color="warning.main">
                        -{(facture.discount || 0).toLocaleString()} MAD discount
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={facture.status === 'paid' ? 'PAID' : 'PENDING'}
                      color={facture.status === 'paid' ? 'success' : 'warning'}
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5
                      }}
                      icon={facture.status === 'paid' ? <Paid /> : <Pending />}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Tooltip title="View Details">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => {
                            setSelectedFacture(facture);
                            setFactureDetailsOpen(true);
                          }}
                          sx={{ 
                            backgroundColor: 'primary.light',
                            '&:hover': { backgroundColor: 'primary.main', color: 'white' }
                          }}
                        >
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Print Facture">
                        <IconButton 
                          size="small" 
                          color="secondary"
                          onClick={() => fetchFactureForPrint(facture._id || facture.id)}
                          disabled={printLoading}
                          sx={{ 
                            backgroundColor: 'secondary.light',
                            '&:hover': { backgroundColor: 'secondary.main', color: 'white' }
                          }}
                        >
                          {printLoading ? <CircularProgress size={16} /> : <Print fontSize="small" />}
                        </IconButton>
                      </Tooltip>
                      {facture.status === 'pending' && (
                        <Tooltip title="Mark as Paid">
                          <IconButton 
                            size="small" 
                            color="success"
                            onClick={() => handleMarkAsPaid(facture._id || facture.id)}
                            sx={{ 
                              backgroundColor: 'success.light',
                              '&:hover': { backgroundColor: 'success.main', color: 'white' }
                            }}
                          >
                            <CheckCircle fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  // Render mechanical parts section
  const renderMechanicalParts = () => {
    if (!selectedFacture) return null;
    
    const parts = getPartsFromFacture(selectedFacture);
    
    if (parts.length === 0) {
      return (
        <Alert severity="info" sx={{ borderRadius: 2, mb: 3 }}>
          <Typography variant="body2">
            No mechanical parts selected for this maintenance.
          </Typography>
        </Alert>
      );
    }

    // Group parts by category
    const partsByCategory = parts.reduce((acc, part) => {
      const category = part.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(part);
      return acc;
    }, {});

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <Build />
          Pièces Mécaniques ({parts.length})
        </Typography>
        
        {Object.entries(partsByCategory).map(([category, categoryParts]) => (
          <Paper key={category} sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            <Box sx={{ 
              p: 2, 
              backgroundColor: 'primary.light', 
              borderBottom: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              {getCategoryIcon(category)}
              <Typography variant="subtitle1" fontWeight="bold">
                {category}
              </Typography>
              <Chip 
                label={`${categoryParts.length} pièces`} 
                size="small" 
                sx={{ ml: 'auto', backgroundColor: 'white' }}
              />
            </Box>
            
            <Grid container spacing={1} sx={{ p: 2 }}>
              {categoryParts.map((part, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:hover': { borderColor: 'primary.main' }
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32, 
                          backgroundColor: part.color || '#1976d2',
                          color: 'white'
                        }}>
                          {getPartIcon(part.name)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {part.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Type: {part.type || 'mechanical'}
                      </Typography>
                      {part.estimatedPrice > 0 && (
                        <Typography variant="caption" color="success.main" display="block" fontWeight="bold">
                          Estimé: {part.estimatedPrice.toLocaleString()} MAD
                        </Typography>
                      )}
                      {part.quantity > 1 && (
                        <Typography variant="caption" color="textSecondary" display="block">
                          Quantité: {part.quantity}
                        </Typography>
                      )}
                      {part.unitPrice > 0 && (
                        <Typography variant="caption" color="textSecondary" display="block">
                          Prix unitaire: {part.unitPrice.toLocaleString()} MAD
                        </Typography>
                      )}
                      {part.total > 0 && (
                        <Typography variant="caption" color="success.main" display="block" fontWeight="bold">
                          Total: {part.total.toLocaleString()} MAD
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
      </Box>
    );
  };

  // Render damage areas section
  const renderDamageAreas = () => {
    if (!selectedFacture) return null;
    
    const damages = getDamagesFromFacture(selectedFacture);
    
    if (damages.length === 0) {
      return (
        <Alert severity="info" sx={{ borderRadius: 2, mb: 3 }}>
          <Typography variant="body2">
            No damage areas selected for this maintenance.
          </Typography>
        </Alert>
      );
    }

    // Group damages by category
    const damagesByCategory = damages.reduce((acc, damage) => {
      const category = damage.category || 'Uncategorized';
      if (!acc[category]) acc[category] = [];
      acc[category].push(damage);
      return acc;
    }, {});

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <CarCrash />
          Zones Endommagées ({damages.length})
          {selectedFacture.autoRemoveDamages && (
            <Chip 
              label="Auto-réparé" 
              size="small" 
              color="success"
              icon={<AutoFixHigh />}
              sx={{ ml: 2 }}
            />
          )}
        </Typography>
        
        {Object.entries(damagesByCategory).map(([category, categoryDamages]) => (
          <Paper key={category} sx={{ mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider', overflow: 'hidden' }}>
            <Box sx={{ 
              p: 2, 
              backgroundColor: 'warning.light', 
              borderBottom: '1px solid', 
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Category />
              <Typography variant="subtitle1" fontWeight="bold">
                {category}
              </Typography>
              <Chip 
                label={`${categoryDamages.length} zones`} 
                size="small" 
                sx={{ ml: 'auto', backgroundColor: 'white' }}
              />
            </Box>
            
            <Grid container spacing={1} sx={{ p: 2 }}>
              {categoryDamages.map((damage, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card variant="outlined" sx={{ 
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: selectedFacture.autoRemoveDamages ? '#E8F5E9' : 'background.paper',
                    '&:hover': { borderColor: 'warning.main' }
                  }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32, 
                          backgroundColor: damage.color || '#FF9800',
                          color: 'white'
                        }}>
                          {getPartIcon(damage.name)}
                        </Avatar>
                        <Typography variant="body2" fontWeight="medium">
                          {damage.name}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="textSecondary" display="block">
                        Type: {damage.type || 'carrosserie'}
                      </Typography>
                      {damage.estimatedPrice > 0 && (
                        <Typography variant="caption" color="warning.main" display="block" fontWeight="bold">
                          Coût: {damage.estimatedPrice.toLocaleString()} MAD
                        </Typography>
                      )}
                      {damage.description && (
                        <Typography variant="caption" color="textSecondary" display="block">
                          {damage.description}
                        </Typography>
                      )}
                      {selectedFacture.autoRemoveDamages && (
                        <Typography variant="caption" color="success.main" display="block" fontWeight="bold">
                          ✓ Marqué comme réparé
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
      </Box>
    );
  };

  // Render facture details modal
  const renderFactureDetails = () => {
    if (!selectedFacture) return null;

    // Get parts and damages using helper functions
    const selectedParts = getPartsFromFacture(selectedFacture);
    const damageAreas = getDamagesFromFacture(selectedFacture);
    const totalParts = selectedParts.length + damageAreas.length;

    return (
      <Dialog
        open={factureDetailsOpen}
        onClose={() => setFactureDetailsOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Receipt sx={{ fontSize: 32 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                Détails de la Facture
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                {selectedFacture.factureNumber || `FACT-${(selectedFacture._id || '000000').slice(-8)}`}
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={() => setFactureDetailsOpen(false)} 
            sx={{ color: 'white' }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ p: 0 }}>
          <Tabs 
            value={activeDetailTab} 
            onChange={(e, newValue) => setActiveDetailTab(newValue)}
            sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              px: 3,
              pt: 2,
              '& .MuiTab-root': {
                fontWeight: 'bold',
                textTransform: 'none'
              }
            }}
          >
            <Tab label="Résumé" icon={<Assignment />} iconPosition="start" />
            <Tab label="Pièces Mécaniques" icon={<Build />} iconPosition="start" />
            <Tab label="Carrosserie" icon={<CarCrash />} iconPosition="start" />
            <Tab label="Paiement" icon={<Payment />} iconPosition="start" />
          </Tabs>
          
          <Box sx={{ p: 3 }}>
            {activeDetailTab === 0 && (
              <Grid container spacing={3}>
                {/* Vehicle Info */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, border: '2px solid', borderColor: 'primary.light', height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DirectionsCar />
                      Information du Véhicule
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Nom du véhicule
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.vehicleName || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Immatriculation
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.matricule || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Type de véhicule
                          </Typography>
                          <Chip
                            label={selectedFacture.isSmartCar ? 'Voiture Smart' : 'Véhicule Standard'}
                            color={selectedFacture.isSmartCar ? 'secondary' : 'primary'}
                            size="small"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Kilométrage
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.kmEnd?.toLocaleString() || 0} km
                          </Typography>
                        </Box>
                      </Grid>
                      {selectedFacture.kmStart && (
                        <Grid item xs={12}>
                          <Box sx={{ p: 2, backgroundColor: 'info.light', borderRadius: 1 }}>
                            <Typography variant="body2">
                              <strong>Distance parcourue:</strong> {selectedFacture.kmDifference?.toLocaleString() || 0} km
                            </Typography>
                            {selectedFacture.maintenanceNeeded && (
                              <Typography variant="body2" color="warning.main" sx={{ mt: 0.5 }}>
                                <Warning fontSize="small" sx={{ mr: 0.5, verticalAlign: 'middle' }} />
                                Maintenance nécessaire
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      )}
                    </Grid>
                  </Paper>
                </Grid>
                
                {/* Garage Info */}
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, border: '2px solid', borderColor: 'info.light', height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="info.main" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Garage />
                      Information du Garage
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Nom du garage
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.garageName || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Numéro de téléphone
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.phoneNumber || 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Date de début
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.maintenanceDetails?.startDate ? new Date(selectedFacture.maintenanceDetails.startDate).toLocaleDateString('fr-FR') : 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Date de fin
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedFacture.maintenanceDetails?.endDate ? new Date(selectedFacture.maintenanceDetails.endDate).toLocaleDateString('fr-FR') : 'N/A'}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                {/* Summary Stats */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, borderRadius: 2, border: '2px solid', borderColor: 'success.light' }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="success.main" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assignment />
                      Résumé de la Maintenance
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'primary.light', borderRadius: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="primary.main">
                            {selectedParts.length}
                          </Typography>
                          <Typography variant="body2" color="primary.dark">
                            Pièces Mécaniques
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'warning.light', borderRadius: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="warning.main">
                            {damageAreas.length}
                          </Typography>
                          <Typography variant="body2" color="warning.dark">
                            Zones Endommagées
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'info.light', borderRadius: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="info.main">
                            {totalParts}
                          </Typography>
                          <Typography variant="body2" color="info.dark">
                            Total des Éléments
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6} md={3}>
                        <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'success.light', borderRadius: 2 }}>
                          <Typography variant="h4" fontWeight="bold" color="success.main">
                            {(selectedFacture.totalAmount || selectedFacture.amount || 0).toLocaleString()}
                          </Typography>
                          <Typography variant="body2" color="success.dark">
                            Montant Total (MAD)
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                {/* Notes */}
                {selectedFacture.notes && (
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3, borderRadius: 2, border: '2px solid', borderColor: 'grey.300' }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <NoteAdd />
                        Notes
                      </Typography>
                      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                        {selectedFacture.notes}
                      </Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            )}
            
            {activeDetailTab === 1 && renderMechanicalParts()}
            
            {activeDetailTab === 2 && renderDamageAreas()}
            
            {activeDetailTab === 3 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, border: '2px solid', borderColor: 'success.light', height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="success.main" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Payment />
                      Détails du Paiement
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Statut
                      </Typography>
                      <Chip
                        label={selectedFacture.status === 'paid' ? 'PAYÉ' : 'EN ATTENTE'}
                        color={selectedFacture.status === 'paid' ? 'success' : 'warning'}
                        size="large"
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1rem',
                          py: 2,
                          px: 3
                        }}
                        icon={selectedFacture.status === 'paid' ? <DoneAll /> : <Timer />}
                      />
                    </Box>
                    
                    {selectedFacture.paymentDate && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Date de paiement
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {new Date(selectedFacture.paymentDate).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      </Box>
                    )}
                    
                    {selectedFacture.paymentMethod && (
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Méthode de paiement
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedFacture.paymentMethod === 'cash' ? 'Espèces' : 
                           selectedFacture.paymentMethod === 'card' ? 'Carte bancaire' : 
                           selectedFacture.paymentMethod === 'transfer' ? 'Virement bancaire' : 
                           selectedFacture.paymentMethod}
                        </Typography>
                      </Box>
                    )}
                    
                    {selectedFacture.paymentReference && (
                      <Box>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Référence de paiement
                        </Typography>
                        <Typography variant="body1" fontWeight="medium">
                          {selectedFacture.paymentReference}
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ p: 3, borderRadius: 2, border: '2px solid', borderColor: 'primary.light', height: '100%' }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney />
                      Détails des Coûts
                    </Typography>
                    
                    <Grid container spacing={1} sx={{ mb: 3 }}>
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Montant:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="body2" fontWeight="bold">
                          {(selectedFacture.amount || 0).toLocaleString()} MAD
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Taxe:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="body2">
                          {(selectedFacture.tax || 0).toLocaleString()} MAD
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="body2" color="textSecondary">
                          Remise:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="body2" color="success.main">
                          -{(selectedFacture.discount || 0).toLocaleString()} MAD
                        </Typography>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 1 }} />
                      </Grid>
                      
                      <Grid item xs={6}>
                        <Typography variant="body1" fontWeight="bold">
                          Total:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} textAlign="right">
                        <Typography variant="h6" fontWeight="bold" color="success.main">
                          {(selectedFacture.totalAmount || selectedFacture.amount || 0).toLocaleString()} MAD
                        </Typography>
                      </Grid>
                    </Grid>
                    
                    {selectedFacture.status === 'pending' && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        size="large"
                        startIcon={<CheckCircle />}
                        onClick={() => {
                          handleMarkAsPaid(selectedFacture._id || selectedFacture.id);
                          setFactureDetailsOpen(false);
                        }}
                        sx={{ mt: 2, py: 1.5, fontWeight: 'bold' }}
                      >
                        Marquer comme Payé
                      </Button>
                    )}
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 3, backgroundColor: 'grey.50' }}>
          <Button 
            onClick={() => setFactureDetailsOpen(false)}
            variant="outlined"
          >
            Fermer
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Print />}
            onClick={() => fetchFactureForPrint(selectedFacture._id || selectedFacture.id)}
            disabled={printLoading}
          >
            {printLoading ? 'Chargement...' : 'Imprimer la Facture'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Receipt sx={{ fontSize: 40, color: 'primary.main' }} />
          Gestion des Factures
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Gérez et suivez toutes vos factures de maintenance
        </Typography>
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Rechercher par numéro, véhicule, matricule, garage..."
              value={factureSearch}
              onChange={(e) => setFactureSearch(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth size="medium">
                <InputLabel>Filtrer par statut</InputLabel>
                <Select
                  value={factureFilter}
                  label="Filtrer par statut"
                  onChange={(e) => setFactureFilter(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">Toutes les factures</MenuItem>
                  <MenuItem value="paid">Payées</MenuItem>
                  <MenuItem value="pending">En attente</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => {
                  setFactureFilter('all');
                  setFactureSearch('');
                }}
                sx={{ borderRadius: 2, px: 3 }}
              >
                Réinitialiser
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Stats Summary */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h3" fontWeight="bold" color="primary">
              {factures.length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Factures totales
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h3" fontWeight="bold" color="warning.main">
              {factures.filter(f => f.status === 'pending').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              En attente
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h3" fontWeight="bold" color="success.main">
              {factures.filter(f => f.status === 'paid').length}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Payées
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3, borderRadius: 2, textAlign: 'center', border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="h3" fontWeight="bold" color="secondary.main">
              {factures.reduce((sum, f) => sum + (f.totalAmount || f.amount || 0), 0).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Total (MAD)
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Factures Table */}
      {renderFacturesTable()}
      
      {/* Modals */}
      {renderFactureDetails()}
      
      {/* Print Facture Modal */}
      <PrintFactureModal
        open={printFactureOpen}
        onClose={() => setPrintFactureOpen(false)}
        printFactureData={printFactureData}
        getPartsFromFacture={getPartsFromFacture}
        getDamagesFromFacture={getDamagesFromFacture}
        getPartIcon={getPartIcon}
      />
    </>
  );
};

export default FacturesTab;