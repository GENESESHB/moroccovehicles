import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  Print as PrintIcon,
  Close,
  Phone,
  Email,
  LocationOn,
  DirectionsCar,
  Speed,
  History,
  Build,
  CarCrash,
  Euro,
  CheckCircle,
  Garage,
  Description,
  Assignment,
  Receipt,
  CheckCircle as CheckCircleIcon,
  SmartToy,
  BuildCircle,
  CarRepair,
  Settings,
  Dashboard,
  BatteryChargingFull,
  TireRepair,
  AcUnit,
  Lightbulb,
  VolumeUp,
  Memory,
  Category,
  CalendarToday,
  AccountCircle,
  Star,
  Info,
  Business
} from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';

const PrintFactureModal = ({
  open,
  onClose,
  printFactureData,
  getPartsFromFacture,
  getDamagesFromFacture,
  getPartIcon
}) => {
  if (!printFactureData) return null;

  const { 
    facture, 
    agencyInfo = {}, 
    garageInfo = {}, 
    vehicle = {}, 
    registeredBy = {}, 
    printDate, 
    printTime,
    financialInfo = {},
    maintenanceDetails = {},
    damageRepairs = [],
    isSmartCar = false
  } = printFactureData;

  // Ensure all data has defaults
  const safeAgencyInfo = {
    name: agencyInfo.entreprise || agencyInfo.name || 'Company Name',
    logo: agencyInfo.logoEntreprise || agencyInfo.logo || '',
    country: agencyInfo.country || '',
    city: agencyInfo.city || '',
    address: agencyInfo.address || '',
    phone: agencyInfo.phone || 'N/A',
    email: agencyInfo.email || 'N/A',
    siret: agencyInfo.siret || '',
    vatNumber: agencyInfo.vatNumber || ''
  };

  const safeGarageInfo = {
    name: garageInfo.name || 'N/A',
    phone: garageInfo.phone || 'N/A',
    address: garageInfo.address || '',
    email: garageInfo.email || ''
  };

  const safeVehicle = {
    name: vehicle.name || facture.vehicleName || 'Unknown Vehicle',
    matricule: vehicle.matricule || facture.matricule || 'N/A',
    type: vehicle.type || facture.vehicleType || 'car',
    currentKilometer: vehicle.currentKilometer || facture.kmEnd || 0,
    lastMaintenanceKm: vehicle.lastMaintenanceKm || 0,
    nextMaintenanceDue: vehicle.nextMaintenanceDue || 0,
    isSmartCar: isSmartCar || vehicle.isSmartCar || false
  };

  const safeRegisteredBy = {
    name: registeredBy.userName || registeredBy.name || 'System',
    email: registeredBy.userEmail || registeredBy.email || '',
    role: registeredBy.userRole || registeredBy.role || 'user',
    entreprise: registeredBy.entreprise || '',
    logoEntreprise: registeredBy.logoEntreprise || '',
    phone: registeredBy.phone || ''
  };

  // Calculate totals from parts and damages
  const parts = getPartsFromFacture(facture);
  const damages = getDamagesFromFacture(facture) || damageRepairs;
  
  const partsTotal = parts.reduce((sum, part) => sum + (part.total || part.estimatedPrice || 0), 0);
  const damagesTotal = damages.reduce((sum, damage) => sum + (damage.cost || damage.estimatedPrice || 0), 0);
  
  const laborCost = maintenanceDetails?.laborTotal || facture.maintenanceDetails?.laborTotal || 0;
  const subtotal = financialInfo.subtotal || facture.subtotal || facture.amount || 0;
  const tax = financialInfo.tax || facture.tax || 0;
  const discount = financialInfo.discount || facture.discount || 0;
  const total = financialInfo.totalAmount || facture.totalAmount || facture.amount || 0;

  // Function to format damage name for display
  const formatDamageName = (name) => {
    if (!name) return '';
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Fonction d'impression simplifiée
  const handlePrint = () => {
    // Créer une nouvelle fenêtre pour l'impression
    const printWindow = window.open('', 'moroccovehicles');
    
    if (!printWindow) {
      alert('Veuillez autoriser les pop-ups pour imprimer la facture.');
      return;
    }

    // Encoder l'URL du logo pour l'utiliser en base64 si nécessaire
    const logoDataUrl = safeAgencyInfo.logo || '';

    // HTML minimal pour l'impression avec police plus petite et logo
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Facture ${facture.factureNumber || 'N/A'} - moroccovehicles</title>
        <style>
          @page {
            margin: 10mm 15mm;
            size: A4;
          }
          
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #000;
            font-size: 11px;
            line-height: 1.3;
          }
          
          .print-container {
            max-width: 190mm;
            margin: 0 auto;
            padding: 5mm;
            border: 1px solid #000;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid #666;
            page-break-after: avoid;
          }
          
          .company-info {
            flex: 1;
            font-size: 10px;
          }
          
          .company-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
          }
          
          .company-logo-img {
            width: 50px;
            height: 50px;
            object-fit: contain;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
          
          .invoice-header {
            text-align: right;
            font-size: 10px;
          }
          
          .invoice-number {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 5px;
            color: #000;
          }
          
          .section {
            margin-bottom: 15px;
            page-break-inside: avoid;
          }
          
          .section-title {
            font-size: 13px;
            font-weight: bold;
            margin-bottom: 8px;
            padding-bottom: 4px;
            border-bottom: 1px solid #666;
          }
          
          .info-box {
            border: 1px solid #ccc;
            border-radius: 3px;
            padding: 8px;
            margin-bottom: 10px;
            background: #f8f8f8;
            font-size: 10px;
          }
          
          .info-box-title {
            font-weight: bold;
            margin-bottom: 5px;
            font-size: 11px;
          }
          
          .compact-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
            font-size: 10px;
          }
          
          .compact-table th, 
          .compact-table td {
            border: 1px solid #000;
            padding: 6px 8px;
            text-align: left;
          }
          
          .compact-table th {
            background: #eee;
            font-weight: bold;
          }
          
          .total-row {
            font-weight: bold;
            background: #f0f0f0;
          }
          
          .signature-box {
            border: 1px solid #999;
            border-radius: 3px;
            padding: 15px;
            text-align: center;
            height: 80px;
            margin-top: 20px;
            font-size: 10px;
          }
          
          .footer {
            margin-top: 20px;
            padding-top: 10px;
            border-top: 1px solid #666;
            text-align: center;
            font-size: 9px;
            color: #666;
          }
          
          .status-paid {
            background: #4caf50;
            color: white;
            padding: 3px 10px;
            border-radius: 3px;
            font-weight: bold;
            display: inline-block;
            font-size: 10px;
          }
          
          .status-pending {
            background: #ff9800;
            color: white;
            padding: 3px 10px;
            border-radius: 3px;
            font-weight: bold;
            display: inline-block;
            font-size: 10px;
          }
          
          .parts-list {
            column-count: 3;
            column-gap: 15px;
            margin: 0;
            padding: 0;
            font-size: 9px;
          }
          
          .parts-list li {
            margin-bottom: 3px;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .damage-list {
            column-count: 3;
            column-gap: 15px;
            margin: 0;
            padding: 0;
            font-size: 9px;
          }
          
          .damage-list li {
            margin-bottom: 3px;
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          .small-text {
            font-size: 9px;
            line-height: 1.2;
          }
          
          .compact-info {
            margin-bottom: 3px;
          }
          
          .no-print {
            display: none !important;
          }
          
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            
            .print-container {
              border: none;
              padding: 0;
              max-height: 277mm; /* Hauteur A4 - marges */
              overflow: hidden;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* Force tout sur une page */
            .section, table, .info-box {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            .header {
              page-break-after: avoid !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-container">
          <!-- Header -->
          <div class="header">
            <div class="company-info">
              <div class="company-logo">
                ${safeAgencyInfo.logo ? `
                  <img src="${safeAgencyInfo.logo}" alt="${safeAgencyInfo.name}" class="company-logo-img" />
                ` : ''}
                <div>
                  <div style="font-size: 14px; font-weight: bold;">${safeAgencyInfo.name}</div>
                  ${safeAgencyInfo.siret ? `<div class="small-text"><strong>SIRET:</strong> ${safeAgencyInfo.siret}</div>` : ''}
                </div>
              </div>
              <div class="small-text">
                ${safeAgencyInfo.address ? `<div class="compact-info"><strong>Adresse:</strong> ${safeAgencyInfo.address}</div>` : ''}
                <div class="compact-info"><strong>Téléphone:</strong> ${safeAgencyInfo.phone}</div>
                <div class="compact-info"><strong>Email:</strong> ${safeAgencyInfo.email}</div>
              </div>
            </div>
            
            <div class="invoice-header">
              <div class="invoice-number">FACTURE</div>
              <div class="small-text">
                <div class="compact-info"><strong>N°:</strong> ${facture.factureNumber || 'N/A'}</div>
                <div class="compact-info"><strong>Date:</strong> ${facture.date}</div>
                <div class="compact-info">Système moroccovehicles</div>
              </div>
              <div style="margin-top: 8px;">
                <span class="${facture.status === 'paid' ? 'status-paid' : 'status-pending'}">
                  ${facture.status === 'paid' ? 'PAYÉ' : 'EN ATTENTE'}
                </span>
              </div>
            </div>
          </div>
          
          <!-- Information du Garage -->
          <div class="section">
            <div class="section-title">Information du Garage</div>
            <div class="info-box">
              <div class="info-box-title">${safeGarageInfo.name}</div>
              <div class="small-text">
                ${safeGarageInfo.address ? `<div class="compact-info"><strong>Adresse:</strong> ${safeGarageInfo.address}</div>` : ''}
                <div class="compact-info"><strong>Téléphone:</strong> ${safeGarageInfo.phone}</div>
                ${safeGarageInfo.email ? `<div class="compact-info"><strong>Email:</strong> ${safeGarageInfo.email}</div>` : ''}
              </div>
            </div>
          </div>
          
          <!-- Information du Véhicule -->
          <div class="section">
            <div class="section-title">Information du Véhicule</div>
            <div class="info-box">
              <div class="small-text">
                <div class="compact-info"><strong>Véhicule:</strong> ${safeVehicle.name}</div>
                <div class="compact-info"><strong>Matricule:</strong> ${safeVehicle.matricule}</div>
                <div class="compact-info"><strong>Kilométrage:</strong> ${safeVehicle.currentKilometer?.toLocaleString() || 0} km</div>
                ${safeVehicle.isSmartCar ? '<div class="compact-info"><strong>Type:</strong> Voiture Smart</div>' : ''}
              </div>
            </div>
          </div>
          
          <!-- Détails de la Maintenance -->
          <div class="section">
            <div class="section-title">Détails de la Maintenance</div>
            
            <!-- Pièces Mécaniques -->
            ${parts.length > 0 ? `
              <div style="margin-bottom: 15px;">
                <div style="font-weight: bold; margin-bottom: 5px; font-size: 11px;">
                  Pièces Mécaniques (${parts.length})
                </div>
                <div class="info-box">
                  <ul class="parts-list">
                    ${parts.map(part => `
                      <li>
                        <strong>${part.name}</strong>
                        ${part.quantity ? ` (Qté: ${part.quantity})` : ''}
                        ${part.estimatedPrice ? ` - ${part.estimatedPrice.toFixed(2)} MAD` : ''}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            ` : ''}
            
            <!-- Zones Endommagées -->
            ${damages.length > 0 ? `
              <div style="margin-bottom: 15px;">
                <div style="font-weight: bold; margin-bottom: 5px; font-size: 11px;">
                  Zones Endommagées (${damages.length})
                </div>
                <div class="info-box">
                  <ul class="damage-list">
                    ${damages.map(damage => `
                      <li>
                        <strong>${formatDamageName(damage.damageArea || damage.name)}</strong>
                        ${damage.description ? ` - ${damage.description}` : ''}
                        ${damage.estimatedPrice ? ` - ${damage.estimatedPrice.toFixed(2)} MAD` : ''}
                      </li>
                    `).join('')}
                  </ul>
                </div>
              </div>
            ` : ''}
          </div>
          
          <!-- Récapitulatif des Coûts -->
          <div class="section">
            <div class="section-title">Récapitulatif des Coûts</div>
            <table class="compact-table">
              <thead>
                <tr>
                  <th style="width: 70%;">Description</th>
                  <th style="width: 30%; text-align: right;">Montant (MAD)</th>
                </tr>
              </thead>
              <tbody>
                ${partsTotal > 0 ? `
                  <tr>
                    <td>Pièces mécaniques</td>
                    <td style="text-align: right;">${partsTotal.toFixed(2)}</td>
                  </tr>
                ` : ''}
                
                ${damagesTotal > 0 ? `
                  <tr>
                    <td>Réparation carrosserie</td>
                    <td style="text-align: right;">${damagesTotal.toFixed(2)}</td>
                  </tr>
                ` : ''}
                
                ${laborCost > 0 ? `
                  <tr>
                    <td>Main d'œuvre</td>
                    <td style="text-align: right;">${laborCost.toFixed(2)}</td>
                  </tr>
                ` : ''}
                
                <tr style="border-top: 1px solid #000;">
                  <td><strong>Sous-total</strong></td>
                  <td style="text-align: right;"><strong>${subtotal.toFixed(2)}</strong></td>
                </tr>
                
                ${tax > 0 ? `
                  <tr>
                    <td>Taxe</td>
                    <td style="text-align: right;">${tax.toFixed(2)}</td>
                  </tr>
                ` : ''}
                
                ${discount > 0 ? `
                  <tr>
                    <td>Remise</td>
                    <td style="text-align: right; color: green;">-${discount.toFixed(2)}</td>
                  </tr>
                ` : ''}
                
                <tr class="total-row">
                  <td><strong>TOTAL</strong></td>
                  <td style="text-align: right; font-size: 12px;"><strong>${total.toFixed(2)} MAD</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Notes -->
          ${facture.notes ? `
            <div class="section">
              <div class="info-box">
                <div class="info-box-title">Notes</div>
                <div class="small-text" style="white-space: pre-line;">${facture.notes}</div>
              </div>
            </div>
          ` : ''}
          
          <!-- Signatures -->
          <div class="section">
            <div style="display: flex; gap: 15px; margin-top: 15px;">
              <div class="signature-box" style="flex: 1;">
                <div class="small-text">Pour ${safeAgencyInfo.name}</div>
                <div style="height: 1px; background: #000; margin: 10px 0;"></div>
                <div class="small-text"><strong>Signature et Cachet</strong></div>
                <div class="small-text" style="font-size: 8px;">Représentant autorisé</div>
              </div>
              
              <div class="signature-box" style="flex: 1;">
                <div class="small-text">Pour acceptation</div>
                <div style="height: 1px; background: #000; margin: 10px 0;"></div>
                <div class="small-text"><strong>Signature du garage</strong></div>
                <div class="small-text" style="font-size: 8px;">Représentant autorisé</div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <div style="font-weight: bold; margin-bottom: 3px; font-size: 10px;">
              Merci pour votre confiance !
            </div>
            <div class="small-text">
              ${safeAgencyInfo.name} • ${safeAgencyInfo.phone} • ${safeAgencyInfo.email}
            </div>
            <div class="small-text" style="font-size: 8px;">
              moroccovehicles system gestion park delivre a notre partenaire agence
            </div>
            <div class="small-text" style="font-size: 8px;">
              Imprimée le: ${printDate} à ${printTime}
            </div>
          </div>
        </div>
        
        <script>
          // Imprimer automatiquement et fermer la fenêtre
          window.onload = function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => {
                window.close();
              }, 500);
            }, 100);
          };
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'white',
          boxShadow: 24,
          p: 4,
          width: '100%',
          maxWidth: 900,
          maxHeight: '90vh',
          overflow: 'auto',
          borderRadius: 2,
        }}
      >
        {/* Print Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Typography variant="h5" fontWeight="bold" sx={{ color: 'grey.900' }}>
            <PrintIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Prévisualisation de la Facture
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={onClose}
              startIcon={<Close />}
              sx={{ color: 'grey.800', borderColor: 'grey.400' }}
            >
              Fermer
            </Button>
            <Button
              variant="contained"
              onClick={handlePrint}
              startIcon={<PrintIcon />}
              sx={{ 
                fontWeight: 'bold',
                backgroundColor: 'grey.900',
                '&:hover': {
                  backgroundColor: 'grey.800',
                }
              }}
            >
              Imprimer la Facture
            </Button>
          </Box>
        </Box>

        {/* Preview Content */}
        <Box sx={{ 
          p: 3, 
          border: '2px solid', 
          borderColor: 'grey.900', 
          borderRadius: 2, 
          backgroundColor: 'white',
          color: 'grey.900'
        }}>
          {/* Header with Logo and Invoice Info */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start', 
            mb: 4, 
            pb: 3, 
            borderBottom: '3px double', 
            borderColor: 'grey.400' 
          }}>
            {/* Company Info - Left Side */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                {safeAgencyInfo.logo && (
                  <Box sx={{ 
                    width: 60, 
                    height: 60, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid',
                    borderColor: 'grey.300',
                    borderRadius: 1,
                    p: 1
                  }}>
                    <img 
                      src={safeAgencyInfo.logo} 
                      alt={safeAgencyInfo.name}
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </Box>
                )}
                <Box>
                  <Typography variant="h5" fontWeight="bold" sx={{ color: 'grey.900' }}>
                    {safeAgencyInfo.name}
                  </Typography>
                  {safeAgencyInfo.siret && (
                    <Typography variant="body2" sx={{ color: 'grey.600' }}>
                      <strong>SIRET:</strong> {safeAgencyInfo.siret}
                    </Typography>
                  )}
                </Box>
              </Box>
              
              <List dense disablePadding>
                {safeAgencyInfo.address && (
                  <ListItem disableGutters disablePadding sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                      <LocationOn fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={safeAgencyInfo.address}
                      primaryTypographyProps={{ variant: 'body2', color: 'grey.700' }}
                    />
                  </ListItem>
                )}
                <ListItem disableGutters disablePadding sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                    <Phone fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={safeAgencyInfo.phone}
                    primaryTypographyProps={{ variant: 'body2', color: 'grey.700' }}
                  />
                </ListItem>
                <ListItem disableGutters disablePadding sx={{ py: 0.25 }}>
                  <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                    <Email fontSize="small" />
                  </ListItemIcon>
                  <ListItemText 
                    primary={safeAgencyInfo.email}
                    primaryTypographyProps={{ variant: 'body2', color: 'grey.700' }}
                  />
                </ListItem>
              </List>
            </Box>

            {/* Invoice Header - Right Side */}
            <Box sx={{ textAlign: 'right' }}>
              <Typography variant="h3" fontWeight="bold" sx={{ color: 'grey.900', mb: 1 }}>
                FACTURE
              </Typography>
              <List dense disablePadding>
                <ListItem disableGutters disablePadding sx={{ py: 0.25, justifyContent: 'flex-end' }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" sx={{ color: 'grey.900' }}>
                        <strong>N°:</strong> {facture.factureNumber || 'N/A'}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disableGutters disablePadding sx={{ py: 0.25, justifyContent: 'flex-end' }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body1" sx={{ color: 'grey.900' }}>
                        <strong>Date:</strong> {facture.date}
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem disableGutters disablePadding sx={{ py: 0.25, justifyContent: 'flex-end' }}>
                  <ListItemText 
                    primary={
                      <Typography variant="body2" sx={{ color: 'grey.600' }}>
                        Système moroccovehicles
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2 }}>
                <Chip
                  label={facture.status === 'paid' ? 'PAYÉ' : 'EN ATTENTE'}
                  color={facture.status === 'paid' ? 'success' : 'warning'}
                  size="medium"
                  sx={{ 
                    fontWeight: 'bold',
                    fontSize: '0.9rem',
                    px: 2,
                    py: 1,
                    border: '2px solid',
                    borderColor: facture.status === 'paid' ? 'success.main' : 'warning.main'
                  }}
                />
              </Box>
            </Box>
          </Box>

          {/* Garage and Vehicle Information */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'grey.300', 
                borderRadius: 1, 
                height: '100%',
                backgroundColor: 'grey.50'
              }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'grey.900', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Garage fontSize="small" />
                  Information du Garage
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                      <Business fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ color: 'grey.900' }}>
                          <strong>Nom:</strong> {safeGarageInfo.name}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {safeGarageInfo.address && (
                    <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                        <LocationOn fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="body2" sx={{ color: 'grey.700' }}>
                            {safeGarageInfo.address}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                  <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ color: 'grey.700' }}>
                          {safeGarageInfo.phone}
                        </Typography>
                      }
                    />
                  </ListItem>
                  {safeGarageInfo.email && (
                    <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                        <Email fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="body2" sx={{ color: 'grey.700' }}>
                            {safeGarageInfo.email}
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper sx={{ 
                p: 2, 
                border: '1px solid', 
                borderColor: 'grey.300', 
                borderRadius: 1, 
                height: '100%',
                backgroundColor: 'grey.50'
              }}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'grey.900', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <DirectionsCar fontSize="small" />
                  Information du Véhicule
                </Typography>
                <List dense disablePadding>
                  <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                      <DirectionsCar fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ color: 'grey.900' }}>
                          <strong>Véhicule:</strong> {safeVehicle.name}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                      <Assignment fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ color: 'grey.700' }}>
                          <strong>Matricule:</strong> {safeVehicle.matricule}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                      <Speed fontSize="small" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ color: 'grey.700' }}>
                          <strong>Kilométrage:</strong> {safeVehicle.currentKilometer?.toLocaleString() || 0} km
                        </Typography>
                      }
                    />
                  </ListItem>
                  {safeVehicle.isSmartCar && (
                    <ListItem disableGutters disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 30, color: 'grey.700' }}>
                        <SmartToy fontSize="small" />
                      </ListItemIcon>
                      <ListItemText 
                        primary={
                          <Typography variant="body2" sx={{ color: 'grey.700' }}>
                            Voiture Luxury
                          </Typography>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>

          {/* Maintenance Details */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ 
              color: 'grey.900', 
              mb: 2, 
              pb: 1, 
              borderBottom: '2px solid', 
              borderColor: 'grey.400' 
            }}>
              Détails de la Maintenance
            </Typography>
            
            {/* Parts Section */}
            {parts.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ 
                  color: 'grey.900', 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}>
                  <Build />
                  Pièces Mécaniques ({parts.length})
                </Typography>
                <Paper variant="outlined" sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderColor: 'grey.300',
                  backgroundColor: 'grey.50'
                }}>
                  <List dense sx={{ 
                    columnCount: { xs: 1, sm: 2 },
                    columnGap: 4
                  }}>
                    {parts.map((part, index) => (
                      <ListItem 
                        key={index}
                        disableGutters
                        sx={{ 
                          py: 0.75,
                          borderBottom: index < parts.length - 1 ? '1px dashed' : 'none',
                          borderColor: 'grey.300'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: 'grey.700' }}>
                          <CircleIcon sx={{ fontSize: 8 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="body2" sx={{ color: 'grey.900' }}>
                              <strong>{part.name}</strong>
                            </Typography>
                          }
                          secondary={
                            part.quantity && (
                              <Typography variant="caption" sx={{ color: 'grey.600', fontStyle: 'italic' }}>
                                Quantité: {part.quantity}
                              </Typography>
                            )
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}
            
            {/* Damage Areas Section - UPDATED TO LIST */}
            {damages.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ 
                  color: 'grey.900', 
                  mb: 2, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1 
                }}>
                  <CarCrash />
                  Zones Endommagées ({damages.length})
                </Typography>
                <Paper variant="outlined" sx={{ 
                  p: 2, 
                  mb: 2, 
                  borderColor: 'grey.300',
                  backgroundColor: 'grey.50'
                }}>
                  <List dense sx={{ 
                    columnCount: { xs: 1, sm: 2 },
                    columnGap: 4
                  }}>
                    {damages.map((damage, index) => (
                      <ListItem 
                        key={index}
                        disableGutters
                        sx={{ 
                          py: 0.75,
                          borderBottom: index < damages.length - 1 ? '1px dashed' : 'none',
                          borderColor: 'grey.300'
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 32, color: 'grey.700' }}>
                          <CircleIcon sx={{ fontSize: 8 }} />
                        </ListItemIcon>
                        <ListItemText 
                          primary={
                            <Typography variant="body2" sx={{ color: 'grey.900' }}>
                              <strong>{formatDamageName(damage.damageArea || damage.name)}</strong>
                            </Typography>
                          }
                          secondary={
                            damage.description && (
                              <Typography variant="caption" sx={{ color: 'grey.600', fontStyle: 'italic' }}>
                                {damage.description}
                              </Typography>
                            )
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Box>
            )}
          </Box>

          {/* Cost Summary */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ 
              color: 'grey.900', 
              mb: 2, 
              pb: 1, 
              borderBottom: '2px solid', 
              borderColor: 'grey.400' 
            }}>
              Récapitulatif des Coûts
            </Typography>
            
            <TableContainer component={Paper} variant="outlined" sx={{ borderColor: 'grey.300' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell sx={{ color: 'grey.900', fontWeight: 'bold' }}>Description</TableCell>
                    <TableCell align="right" sx={{ color: 'grey.900', fontWeight: 'bold' }}>Montant (MAD)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Parts Total */}
                  {partsTotal > 0 && (
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ color: 'grey.800' }}>Pièces mécaniques</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: 'grey.800' }}>{partsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {/* Damages Total */}
                  {damagesTotal > 0 && (
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ color: 'grey.800' }}>Réparation carrosserie</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: 'grey.800' }}>{damagesTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {/* Labor Cost */}
                  {laborCost > 0 && (
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ color: 'grey.800' }}>Main d'œuvre</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: 'grey.800' }}>{laborCost.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {/* Subtotal */}
                  <TableRow sx={{ borderTop: '2px solid', borderColor: 'grey.300' }}>
                    <TableCell>
                      <Typography sx={{ color: 'grey.900', fontWeight: 'bold' }}>Sous-total</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography sx={{ color: 'grey.900', fontWeight: 'bold' }}>{subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                    </TableCell>
                  </TableRow>
                  
                  {/* Tax */}
                  {tax > 0 && (
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ color: 'grey.800' }}>Taxe</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: 'grey.800' }}>{tax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {/* Discount */}
                  {discount > 0 && (
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ color: 'success.main' }}>Remise</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography sx={{ color: 'success.main' }}>-{discount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                  
                  {/* Total */}
                  <TableRow sx={{ backgroundColor: 'grey.100' }}>
                    <TableCell>
                      <Typography variant="h6" sx={{ color: 'grey.900', fontWeight: 'bold' }}>
                        TOTAL
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6" sx={{ color: 'grey.900', fontWeight: 'bold' }}>
                        {total.toLocaleString(undefined, { minimumFractionDigits: 2 })} MAD
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Notes */}
          {facture.notes && (
            <Box sx={{ 
              mb: 4, 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1, 
              border: '1px solid', 
              borderColor: 'grey.300' 
            }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'grey.700', mb: 1 }}>
                <Info fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Notes:
              </Typography>
              <Typography variant="body2" sx={{ color: 'grey.800', whiteSpace: 'pre-line' }}>
                {facture.notes}
              </Typography>
            </Box>
          )}

          {/* Signature Section */}
          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 2, 
                border: '1px solid', 
                borderColor: 'grey.300', 
                borderRadius: 1, 
                height: '100%', 
                minHeight: 120 
              }}>
                <Typography variant="body2" sx={{ color: 'grey.700', mb: 2 }}>
                  Pour {safeAgencyInfo.name}
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'grey.400' }} />
                <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: 'bold', mb: 1 }}>
                  Signature et Cachet
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  Représentant autorisé
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                textAlign: 'center', 
                p: 2, 
                border: '1px solid', 
                borderColor: 'grey.300', 
                borderRadius: 1, 
                height: '100%', 
                minHeight: 120 
              }}>
                <Typography variant="body2" sx={{ color: 'grey.700', mb: 2 }}>
                  Pour acceptation
                </Typography>
                <Divider sx={{ mb: 2, borderColor: 'grey.400' }} />
                <Typography variant="body2" sx={{ color: 'grey.900', fontWeight: 'bold', mb: 1 }}>
                  Signature du garage
                </Typography>
                <Typography variant="caption" sx={{ color: 'grey.600' }}>
                  Représentant autorisé
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* Footer */}
          <Box sx={{ 
            mt: 4, 
            pt: 3, 
            borderTop: '2px solid', 
            borderColor: 'grey.400', 
            textAlign: 'center' 
          }}>
            <Typography variant="body1" sx={{ color: 'grey.900', fontWeight: 'bold', mb: 1 }}>
              Merci pour votre confiance !
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.600', mb: 0.5 }}>
              {safeAgencyInfo.name} • {safeAgencyInfo.phone} • {safeAgencyInfo.email}
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.500', display: 'block' }}>
              moroccovehicles system gestion park delivre a notre partenaire agence
            </Typography>
            <Typography variant="caption" sx={{ color: 'grey.500' }}>
              Imprimée le: {printDate} à {printTime}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PrintFactureModal;