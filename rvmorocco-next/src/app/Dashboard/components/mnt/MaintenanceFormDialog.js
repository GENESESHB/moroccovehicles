import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  CircularProgress,
  Chip,
  Card,
  CardContent,
  Alert,
  Divider,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
  Tooltip,
  Badge,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  InputAdornment
} from '@mui/material';
import {
  Close,
  Receipt,
  DirectionsCar,
  Garage,
  AttachMoney,
  Phone,
  Build,
  CarCrash,
  CheckCircle,
  Cancel,
  TouchApp,
  Warning,
  AutoFixHigh,
  AssignmentTurnedIn,
  Category,
  Settings,
  Percent,
  LocalOffer,
  Calculate
} from '@mui/icons-material';

const MaintenanceFormDialog = ({
  open,
  onClose,
  selectedVehicle,
  user,
  setError,
  setSuccessMessage,
  setSnackbarOpen,
  fetchMaintenanceVehicles
}) => {
  const [maintenanceFormData, setMaintenanceFormData] = useState({
    garageName: '',
    phoneNumber: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    notes: '',
    // Nouveaux champs financiers
    subtotal: 0, // Prix HT
    tvaRate: 20, // Taux de TVA par défaut (20%)
    tvaAmount: 0, // Montant TVA calculé
    taxAmount: 0, // Autres taxes
    discount: 0, // Remise
    discountType: 'fixed', // 'fixed' ou 'percentage'
    totalAmount: 0 // Total TTC
  });
  
  const [vehicleParts, setVehicleParts] = useState([
    { id: 'engine', name: 'Moteur', category: 'Mécanique', color: '#FF6B6B' },
    { id: 'transmission', name: 'Transmission', category: 'Mécanique', color: '#FF6B6B' },
    { id: 'brakes', name: 'Système de freins', category: 'Mécanique', color: '#FF6B6B' },
    { id: 'suspension', name: 'Suspension', category: 'Mécanique', color: '#FF6B6B' },
    { id: 'exhaust', name: 'Système d\'échappement', category: 'Mécanique', color: '#FF6B6B' },
    { id: 'battery', name: 'Batterie', category: 'Électrique', color: '#4ECDC4' },
    { id: 'alternator', name: 'Alternateur', category: 'Électrique', color: '#4ECDC4' },
    { id: 'starter', name: 'Démarreur', category: 'Électrique', color: '#4ECDC4' },
    { id: 'lights', name: 'Système d\'éclairage', category: 'Électrique', color: '#4ECDC4' },
    { id: 'ac', name: 'Système de climatisation', category: 'Climatisation', color: '#45B7D1' },
    { id: 'radiator', name: 'Radiateur', category: 'Refroidissement', color: '#96CEB4' },
    { id: 'water_pump', name: 'Pompe à eau', category: 'Refroidissement', color: '#96CEB4' },
    { id: 'oil_filter', name: 'Filtre à huile', category: 'Filtres', color: '#FFEAA7' },
    { id: 'air_filter', name: 'Filtre à air', category: 'Filtres', color: '#FFEAA7' },
    { id: 'fuel_filter', name: 'Filtre à carburant', category: 'Filtres', color: '#FFEAA7' },
    { id: 'tires', name: 'Pneus (4)', category: 'Roues', color: '#DDA0DD' },
    { id: 'wheels', name: 'Roues', category: 'Roues', color: '#DDA0DD' },
    { id: 'steering', name: 'Système de direction', category: 'Direction', color: '#FFB347' },
    { id: 'body', name: 'Carrosserie', category: 'Extérieur', color: '#77DD77' },
    { id: 'paint', name: 'Peinture', category: 'Extérieur', color: '#77DD77' },
    { id: 'windows', name: 'Vitres', category: 'Extérieur', color: '#77DD77' },
    { id: 'seats', name: 'Sièges', category: 'Intérieur', color: '#AEC6CF' },
    { id: 'dashboard', name: 'Tableau de bord', category: 'Intérieur', color: '#AEC6CF' },
    { id: 'audio', name: 'Système audio', category: 'Divertissement', color: '#F49AC2' },
    { id: 'electronics', name: 'Électronique', category: 'Électrique', color: '#4ECDC4' }
  ]);
  
  const [carParts, setCarParts] = useState([
    { id: 'pare-chocs-avant', name: 'Pare-chocs Avant', category: 'Avant', color: '#FF6B6B' },
    { id: 'pare-chocs-arriere', name: 'Pare-chocs Arrière', category: 'Arrière', color: '#4ECDC4' },
    { id: 'porte-avant-gauche', name: 'Porte Avant Gauche', category: 'Côté Gauche', color: '#45B7D1' },
    { id: 'porte-avant-droite', name: 'Porte Avant Droite', category: 'Côté Droit', color: '#96CEB4' },
    { id: 'porte-arriere-gauche', name: 'Porte Arrière Gauche', category: 'Côté Gauche', color: '#45B7D1' },
    { id: 'porte-arriere-droite', name: 'Porte Arrière Droite', category: 'Côté Droit', color: '#96CEB4' },
    { id: 'aile-avant-gauche', name: 'Aile Avant Gauche', category: 'Côté Gauche', color: '#45B7D1' },
    { id: 'aile-avant-droite', name: 'Aile Avant Droite', category: 'Côté Droit', color: '#96CEB4' },
    { id: 'aile-arriere-gauche', name: 'Aile Arrière Gauche', category: 'Côté Gauche', color: '#45B7D1' },
    { id: 'aile-arriere-droite', name: 'Aile Arrière Droite', category: 'Côté Droit', color: '#96CEB4' },
    { id: 'capot', name: 'Capot', category: 'Avant', color: '#FF6B6B' },
    { id: 'coffre', name: 'Coffre', category: 'Arrière', color: '#4ECDC4' },
    { id: 'toit', name: 'Toit', category: 'Haut', color: '#FFEAA7' },
    { id: 'retroviseur-gauche', name: 'Rétroviseur Gauche', category: 'Côté Gauche', color: '#45B7D1' },
    { id: 'retroviseur-droit', name: 'Rétroviseur Droit', category: 'Côté Droit', color: '#96CEB4' },
    { id: 'phare-avant-gauche', name: 'Phare Avant Gauche', category: 'Avant', color: '#FF6B6B' },
    { id: 'phare-avant-droit', name: 'Phare Avant Droit', category: 'Avant', color: '#FF6B6B' },
    { id: 'feu-arriere-gauche', name: 'Feu Arrière Gauche', category: 'Arrière', color: '#4ECDC4' },
    { id: 'feu-arriere-droit', name: 'Feu Arrière Droit', category: 'Arrière', color: '#4ECDC4' },
    { id: 'vitre-avant', name: 'Vitre Avant', category: 'Avant', color: '#FF6B6B' },
    { id: 'vitre-arriere', name: 'Vitre Arrière', category: 'Arrière', color: '#4ECDC4' },
    { id: 'jante-avant-gauche', name: 'Jante Avant Gauche', category: 'Roues', color: '#DDA0DD' },
    { id: 'jante-avant-droite', name: 'Jante Avant Droite', category: 'Roues', color: '#DDA0DD' },
    { id: 'jante-arriere-gauche', name: 'Jante Arrière Gauche', category: 'Roues', color: '#DDA0DD' },
    { id: 'jante-arriere-droite', name: 'Jante Arrière Droite', category: 'Roues', color: '#DDA0DD' }
  ]);

  // Options de taux de TVA
  const [tvaOptions] = useState([
    { value: 0, label: '0% (Exonéré)' },
    { value: 7, label: '7% (Taux réduit)' },
    { value: 10, label: '10% (Taux intermédiaire)' },
    { value: 14, label: '14%' },
    { value: 20, label: '20% (Taux normal)' }
  ]);
  
  const [selectedParts, setSelectedParts] = useState([]);
  const [selectedDamageAreas, setSelectedDamageAreas] = useState([]);
  const [maintenanceLoading, setMaintenanceLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [autoRemoveDamages, setAutoRemoveDamages] = useState(true);
  const [vehicleDamages, setVehicleDamages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDamageCategory, setSelectedDamageCategory] = useState('all');
  const [manualSubtotal, setManualSubtotal] = useState(0);

  // Vérifier si l'appareil est mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 600);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Réinitialiser le formulaire quand un véhicule est sélectionné
  useEffect(() => {
    if (selectedVehicle) {
      setMaintenanceFormData({
        garageName: '',
        phoneNumber: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        notes: '',
        subtotal: 0,
        tvaRate: 20,
        tvaAmount: 0,
        taxAmount: 0,
        discount: 0,
        discountType: 'fixed',
        totalAmount: 0
      });
      setSelectedParts([]);
      setSelectedDamageAreas([]);
      setActiveTab(0);
      setAutoRemoveDamages(true);
      setSelectedCategory('all');
      setSelectedDamageCategory('all');
      setManualSubtotal(0);
      loadVehicleDamages();
    }
  }, [selectedVehicle]);

  // Calculer les totaux automatiquement
  useEffect(() => {
    calculateTotals();
  }, [
    manualSubtotal,
    maintenanceFormData.tvaRate,
    maintenanceFormData.taxAmount,
    maintenanceFormData.discount,
    maintenanceFormData.discountType
  ]);

  // Fonction pour calculer les totaux
  const calculateTotals = () => {
    const subtotal = manualSubtotal > 0 ? manualSubtotal : maintenanceFormData.subtotal;
    const tvaRate = parseFloat(maintenanceFormData.tvaRate) || 0;
    const tvaAmount = subtotal * (tvaRate / 100);
    const taxAmount = parseFloat(maintenanceFormData.taxAmount) || 0;
    const discount = parseFloat(maintenanceFormData.discount) || 0;
    
    let discountAmount = 0;
    if (maintenanceFormData.discountType === 'percentage') {
      discountAmount = subtotal * (discount / 100);
    } else {
      discountAmount = discount;
    }
    
    const totalAmount = subtotal + tvaAmount + taxAmount - discountAmount;
    
    setMaintenanceFormData(prev => ({
      ...prev,
      subtotal: subtotal,
      tvaAmount: tvaAmount,
      totalAmount: totalAmount
    }));
  };

  // Charger les dommages du véhicule depuis la base de données
  const loadVehicleDamages = async () => {
    if (!selectedVehicle) return;
    
    try {
      const response = await api.get(`/vehicles/${selectedVehicle.id}/damages`);
      if (response.data.success) {
        const damages = response.data.data.damages || [];
        const validDamages = damages.filter(d => d && (d.description || (typeof d === 'string' && d.trim())));
        
        setVehicleDamages(validDamages);
        
        // Sélectionner automatiquement les zones endommagées qui nécessitent réparation
        const unrepairedDamages = validDamages.filter(d => !d.repaired);
        if (unrepairedDamages.length > 0) {
          const damagePartNames = unrepairedDamages.map(d => 
            d.description || (typeof d === 'string' ? d : '')
          ).filter(name => name.trim());
          
          const partsToSelect = carParts.filter(part => 
            damagePartNames.some(name => 
              name.toLowerCase().includes(part.name.toLowerCase())
            )
          ).map(part => part.id);
          
          if (partsToSelect.length > 0) {
            setSelectedDamageAreas(prev => [...new Set([...prev, ...partsToSelect])]);
          }
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des dommages du véhicule:', error);
    }
  };

  // Gérer les changements dans le formulaire
  const handleFormInputChange = (field, value) => {
    setMaintenanceFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Gérer la sélection des pièces mécaniques
  const handlePartSelection = (partId) => {
    setSelectedParts(prev => {
      if (prev.includes(partId)) {
        return prev.filter(id => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  // Gérer la sélection des pièces de carrosserie
  const handleCarPartSelection = (partId) => {
    setSelectedDamageAreas(prev => {
      if (prev.includes(partId)) {
        return prev.filter(id => id !== partId);
      } else {
        return [...prev, partId];
      }
    });
  };

  // Marquer les dommages comme réparés dans la base de données
  const removeRepairedDamages = async (vehicleId, repairedPartIds) => {
    if (!autoRemoveDamages || repairedPartIds.length === 0) {
      console.log('Suppression automatique désactivée ou aucun dommage à supprimer');
      return;
    }
  
    try {
      console.log('=== SUPPRESSION DES DOMMAGES ===');
      console.log('ID du véhicule:', vehicleId);
      console.log('IDs des pièces à marquer comme réparées:', repairedPartIds);
      
      const response = await api.put(`/vehicles/${vehicleId}/damages/mark-repaired`, {
        damageIds: repairedPartIds
      });
    
      console.log('✅ Réponse du serveur:', response.data);
    
      if (response.data.success) {
        console.log(`✅ ${repairedPartIds.length} dommages marqués comme réparés`);
      } else {
        console.warn('⚠️ Réponse du serveur non réussie:', response.data);
      }
    } catch (error) {
      console.error('❌ Erreur lors du marquage des dommages comme réparés:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
    }
  };

  // Créer l'objet partsReplaced pour l'envoi
  const createPartsReplacedArray = () => {
    // Pour les pièces mécaniques sélectionnées
    const mechanicalParts = selectedParts.map(partId => {
      const part = vehicleParts.find(p => p.id === partId);
      return {
        partName: part ? part.name : partId,
        quantity: 1,
        unitPrice: 0,
        total: 0
        // Le _id sera généré par MongoDB
      };
    });

    // Pour les dommages de carrosserie sélectionnés
    const bodyParts = selectedDamageAreas.map(partId => {
      const part = carParts.find(p => p.id === partId);
      return {
        partName: part ? part.name : partId,
        quantity: 1,
        unitPrice: 0,
        total: 0
        // Le _id sera généré par MongoDB
      };
    });

    return [...mechanicalParts, ...bodyParts];
  };

  // Créer l'objet damageRepairs pour l'envoi
  const createDamageRepairsArray = () => {
    return selectedDamageAreas.map(partId => {
      const part = carParts.find(p => p.id === partId);
      return {
        damageArea: partId,
        description: `Repair for ${part ? part.name : partId}`,
        cost: 0,
        repairedDate: new Date().toISOString(),
        repairedBy: user?.name || user?.username || 'Technician'
        // Le _id sera généré par MongoDB
      };
    });
  };

  // Soumettre le formulaire de maintenance
  const submitMaintenanceForm = async () => {
    if (!selectedVehicle) return;
    
    // Validation
    if (!maintenanceFormData.garageName.trim()) {
      setError('Veuillez saisir le nom du garage');
      return;
    }
    
    if (!maintenanceFormData.phoneNumber.trim()) {
      setError('Veuillez saisir le numéro de téléphone');
      return;
    }
    
    if (maintenanceFormData.totalAmount <= 0) {
      setError('Le montant total doit être supérieur à 0');
      return;
    }
    
    try {
      setMaintenanceLoading(true);
      
      // Créer les tableaux avec la structure correcte
      const partsReplacedArray = createPartsReplacedArray();
      const damageRepairsArray = createDamageRepairsArray();
      
      console.log('=== DEBUG ===');
      console.log('partsReplaced:', partsReplacedArray);
      console.log('damageRepairs:', damageRepairsArray);
      
      // IDs des pièces à réparer
      const repairedPartIds = selectedDamageAreas;
      
      // Calculer le montant TVA correctement
      const tax = maintenanceFormData.tvaAmount + maintenanceFormData.taxAmount;
      
      // Préparer les données pour la facture avec la structure CORRECTE
      const facturePayload = {
        vehicleId: selectedVehicle.id,
        vehicleModel: selectedVehicle.model || "Vehicle",
        vehicleName: selectedVehicle.name,
        matricule: selectedVehicle.matricule || "N/A",
        vehicleType: selectedVehicle.vehicleType || (selectedVehicle.isSmartCar ? 'smart' : 'car'),
        amount: maintenanceFormData.subtotal,
        date: new Date(maintenanceFormData.startDate).toISOString(),
        status: 'pending',
        garageName: maintenanceFormData.garageName,
        phoneNumber: maintenanceFormData.phoneNumber,
        description: maintenanceFormData.notes || `Maintenance chez ${maintenanceFormData.garageName}`,
        maintenanceDetails: {
          startDate: new Date(maintenanceFormData.startDate).toISOString(),
          endDate: new Date(maintenanceFormData.endDate).toISOString(),
          partsReplaced: partsReplacedArray, // CORRECTION: Structure correcte
          laborHours: 0,
          laborRate: 0,
          laborTotal: 0
        },
        damageRepairs: damageRepairsArray, // CORRECTION: Structure correcte
        subtotal: maintenanceFormData.subtotal,
        tax: tax,
        discount: maintenanceFormData.discount,
        totalAmount: maintenanceFormData.totalAmount,
        paymentMethod: 'cash',
        notes: maintenanceFormData.notes,
        isSmartCar: selectedVehicle.isSmartCar || false,
        createdBy: user?.id || user?._id,
        // Informations de l'utilisateur
        inforUser: {
          userId: user?.id || user?._id,
          userName: user?.name || user?.username || '',
          userEmail: user?.email || '',
          userRole: user?.role || 'user',
          department: 'maintenance',
          entreprise: user?.entreprise || '',
          logoEntreprise: user?.logoEntreprise || '',
          country: user?.country || '',
          city: user?.city || '',
          phone: user?.phone || ''
        },
        agencyInfo: {
          entreprise: user?.entreprise || '',
          logoEntreprise: user?.logoEntreprise || '',
          country: user?.country || '',
          city: user?.city || '',
          phone: user?.phone || '',
          email: user?.email || ''
        },
        createdByInfo: {
          entreprise: user?.entreprise || '',
          logoEntreprise: user?.logoEntreprise || '',
          country: user?.country || '',
          city: user?.city || '',
          phone: user?.phone || '',
          email: user?.email || ''
        },
        // Informations de mise à jour
        updatedBy: [{
          userId: user?.id || user?._id,
          userName: user?.name || user?.username || '',
          action: 'created',
          date: new Date().toISOString(),
          changes: {
            factureNumber: "GÉNÉRÉ PAR LE SERVEUR",
            amount: maintenanceFormData.subtotal,
            status: 'pending',
            autoRemoveDamages: autoRemoveDamages,
            repairedPartsCount: repairedPartIds.length
          },
          entreprise: user?.entreprise || '',
          logoEntreprise: user?.logoEntreprise || ''
        }]
      };
      
      console.log('Envoi de la facture avec structure corrigée:', facturePayload);
      
      // Envoyer au serveur pour créer la facture
      const response = await api.post('/factures', facturePayload);
      
      if (response.data.success) {
        console.log('✅ Facture créée avec succès');
        
        // Supprimer les dommages réparés si la suppression automatique est activée
        if (autoRemoveDamages && repairedPartIds.length > 0) {
          console.log('Appel de removeRepairedDamages avec IDs:', repairedPartIds);
          await removeRepairedDamages(selectedVehicle.id, repairedPartIds);
        } else {
          console.log('Suppression automatique désactivée ou aucun dommage à supprimer');
        }
        
        setSuccessMessage(`Facture créée avec succès pour ${selectedVehicle.name} - Montant: ${maintenanceFormData.totalAmount.toLocaleString()} MAD`);
        setSnackbarOpen(true);
        onClose();
        
        // Réinitialiser le formulaire
        setMaintenanceFormData({
          garageName: '',
          phoneNumber: '',
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date().toISOString().split('T')[0],
          notes: '',
          subtotal: 0,
          tvaRate: 20,
          tvaAmount: 0,
          taxAmount: 0,
          discount: 0,
          discountType: 'fixed',
          totalAmount: 0
        });
        setSelectedParts([]);
        setSelectedDamageAreas([]);
        setManualSubtotal(0);
        
        // Actualiser la liste des véhicules en maintenance
        await fetchMaintenanceVehicles();
      } else {
        throw new Error(response.data.message || 'Échec de la création de la facture');
      }
      
    } catch (err) {
      console.error('Erreur lors de la création de la facture:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Échec de la création de la facture';
      setError(errorMsg);
    } finally {
      setMaintenanceLoading(false);
    }
  };

  // Obtenir les catégories uniques pour les pièces mécaniques
  const getCategories = () => {
    const categories = vehicleParts.reduce((acc, part) => {
      if (!acc.includes(part.category)) {
        acc.push(part.category);
      }
      return acc;
    }, []);
    return categories;
  };

  // Obtenir les catégories uniques pour les dommages
  const getDamageCategories = () => {
    const categories = carParts.reduce((acc, part) => {
      if (!acc.includes(part.category)) {
        acc.push(part.category);
      }
      return acc;
    }, []);
    return categories;
  };

  // Filtrer les pièces par catégorie
  const getFilteredParts = () => {
    if (selectedCategory === 'all') return vehicleParts;
    return vehicleParts.filter(part => part.category === selectedCategory);
  };

  // Filtrer les dommages par catégorie
  const getFilteredDamages = () => {
    if (selectedDamageCategory === 'all') return carParts;
    return carParts.filter(part => part.category === selectedDamageCategory);
  };

  // Rendu des pièces mécaniques
  const renderMechanicalParts = () => {
    const categories = getCategories();
    
    return (
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Build />
            Sélectionnez les pièces mécaniques pour la maintenance
          </Typography>
          
          {/* Filtres de catégories */}
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Filtrer par catégorie:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="Toutes les catégories"
                variant={selectedCategory === 'all' ? 'filled' : 'outlined'}
                color={selectedCategory === 'all' ? 'primary' : 'default'}
                onClick={() => setSelectedCategory('all')}
                sx={{ 
                  border: selectedCategory === 'all' ? '2px solid' : '1px solid',
                  fontWeight: selectedCategory === 'all' ? 'bold' : 'normal'
                }}
              />
              {categories.map(category => {
                const categoryParts = vehicleParts.filter(p => p.category === category);
                const selectedCount = categoryParts.filter(p => selectedParts.includes(p.id)).length;
                
                return (
                  <Badge key={category} badgeContent={selectedCount} color="primary" showZero>
                    <Chip
                      label={category}
                      variant={selectedCategory === category ? 'filled' : 'outlined'}
                      color={selectedCategory === category ? 'primary' : 'default'}
                      onClick={() => setSelectedCategory(category)}
                      sx={{ 
                        border: selectedCategory === category ? '2px solid' : '1px solid',
                        fontWeight: selectedCategory === category ? 'bold' : 'normal'
                      }}
                    />
                  </Badge>
                );
              })}
            </Box>
          </Paper>
          
          {/* Boutons de sélection rapide */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                if (selectedParts.length === getFilteredParts().length) {
                  setSelectedParts([]);
                } else {
                  const allIds = getFilteredParts().map(p => p.id);
                  setSelectedParts(prev => [...new Set([...prev, ...allIds])]);
                }
              }}
            >
              {selectedParts.length === getFilteredParts().length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setSelectedParts([])}
            >
              Effacer la sélection
            </Button>
          </Box>
        </Box>
        
        {/* Grille des pièces */}
        <Grid container spacing={2}>
          {getFilteredParts().map((part) => {
            const isSelected = selectedParts.includes(part.id);
            
            return (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={part.id}>
                <Card 
                  variant="outlined"
                  sx={{ 
                    cursor: 'pointer',
                    border: '3px solid',
                    borderColor: isSelected ? part.color : 'transparent',
                    backgroundColor: isSelected ? `${part.color}20` : 'background.paper',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      borderColor: isSelected ? part.color : 'primary.main',
                    },
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handlePartSelection(part.id)}
                >
                  {/* Indicateur de sélection */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: part.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 14, color: 'white' }} />
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    {/* Icône de catégorie */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: `${part.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        color: part.color
                      }}
                    >
                      <Category />
                    </Box>
                    
                    {/* Nom de la pièce */}
                    <Typography 
                      variant="body2" 
                      fontWeight={isSelected ? 'bold' : 'medium'}
                      sx={{ 
                        mb: 1,
                        color: isSelected ? part.color : 'text.primary',
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {part.name}
                    </Typography>
                    
                    {/* Catégorie */}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: 'text.secondary'
                      }}
                    >
                      {part.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        {/* Pièces sélectionnées */}
        {selectedParts.length > 0 && (
          <Paper sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 2,
            border: '2px solid',
            borderColor: 'primary.main',
            backgroundColor: 'primary.light'
          }}>
            <Typography variant="subtitle1" gutterBottom sx={{ 
              color: 'primary.dark', 
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <CheckCircle />
              Pièces mécaniques sélectionnées ({selectedParts.length})
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              maxHeight: 150,
              overflowY: 'auto',
              p: 1
            }}>
              {selectedParts.map(partId => {
                const part = vehicleParts.find(p => p.id === partId);
                if (!part) return null;
                
                return (
                  <Chip
                    key={partId}
                    label={part.name}
                    size="small"
                    onDelete={() => handlePartSelection(partId)}
                    sx={{ 
                      backgroundColor: `${part.color}30`,
                      color: part.color,
                      border: `1px solid ${part.color}`,
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: `${part.color}40`,
                      }
                    }}
                  />
                );
              })}
            </Box>
          </Paper>
        )}
      </Box>
    );
  };

  // Rendu des pièces de carrosserie
  const renderCarBodyParts = () => {
    const categories = getDamageCategories();
    
    return (
      <Box>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CarCrash />
            Sélectionnez les zones endommagées
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={autoRemoveDamages}
                  onChange={(e) => setAutoRemoveDamages(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AutoFixHigh fontSize="small" />
                  Supprimer automatiquement les dommages après réparation
                </Typography>
              }
            />
          </Box>
          
          <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="body2">
              <strong>Note :</strong> Lorsque la suppression automatique est activée, les zones endommagées sélectionnées seront automatiquement marquées comme réparées dans la base de données du véhicule.
            </Typography>
          </Alert>
          
          {vehicleDamages.length > 0 && (
            <Alert severity="warning" sx={{ mb: 3, borderRadius: 2 }}>
              <Typography variant="body2">
                <strong>{vehicleDamages.filter(d => !d.repaired).length} dommages non réparés</strong> trouvés dans la base de données du véhicule.
              </Typography>
            </Alert>
          )}
          
          {/* Filtres de catégories */}
          <Paper sx={{ p: 2, mb: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Filtrer par catégorie:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="Toutes les catégories"
                variant={selectedDamageCategory === 'all' ? 'filled' : 'outlined'}
                color={selectedDamageCategory === 'all' ? 'primary' : 'default'}
                onClick={() => setSelectedDamageCategory('all')}
                sx={{ 
                  border: selectedDamageCategory === 'all' ? '2px solid' : '1px solid',
                  fontWeight: selectedDamageCategory === 'all' ? 'bold' : 'normal'
                }}
              />
              {categories.map(category => {
                const categoryParts = carParts.filter(p => p.category === category);
                const selectedCount = categoryParts.filter(p => selectedDamageAreas.includes(p.id)).length;
                
                return (
                  <Badge key={category} badgeContent={selectedCount} color="primary" showZero>
                    <Chip
                      label={category}
                      variant={selectedDamageCategory === category ? 'filled' : 'outlined'}
                      color={selectedDamageCategory === category ? 'primary' : 'default'}
                      onClick={() => setSelectedDamageCategory(category)}
                      sx={{ 
                        border: selectedDamageCategory === category ? '2px solid' : '1px solid',
                        fontWeight: selectedDamageCategory === category ? 'bold' : 'normal'
                      }}
                    />
                  </Badge>
                );
              })}
            </Box>
          </Paper>
          
          {/* Boutons de sélection rapide */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                if (selectedDamageAreas.length === getFilteredDamages().length) {
                  setSelectedDamageAreas([]);
                } else {
                  const allIds = getFilteredDamages().map(p => p.id);
                  setSelectedDamageAreas(prev => [...new Set([...prev, ...allIds])]);
                }
              }}
            >
              {selectedDamageAreas.length === getFilteredDamages().length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setSelectedDamageAreas([])}
            >
              Effacer la sélection
            </Button>
          </Box>
        </Box>
        
        {/* Grille des dommages */}
        <Grid container spacing={2}>
          {getFilteredDamages().map((part) => {
            const isSelected = selectedDamageAreas.includes(part.id);
            const hasDamage = vehicleDamages.some(d => {
              if (!d || d.repaired) return false;
              if (typeof d === 'string') {
                return d.toLowerCase().includes(part.name.toLowerCase());
              }
              if (d.description) {
                return d.description.toLowerCase().includes(part.name.toLowerCase());
              }
              return false;
            });
            
            return (
              <Grid item xs={6} sm={4} md={3} lg={2.4} key={part.id}>
                <Card 
                  variant="outlined"
                  sx={{ 
                    cursor: 'pointer',
                    border: '3px solid',
                    borderColor: isSelected ? part.color : (hasDamage ? '#FF9800' : 'transparent'),
                    backgroundColor: isSelected ? `${part.color}20` : (hasDamage ? '#FFF3E0' : 'background.paper'),
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                      borderColor: isSelected ? part.color : (hasDamage ? '#FF9800' : 'primary.main'),
                    },
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onClick={() => handleCarPartSelection(part.id)}
                >
                  {/* Indicateur de sélection */}
                  {isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: part.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                      }}
                    >
                      <CheckCircle sx={{ fontSize: 14, color: 'white' }} />
                    </Box>
                  )}
                  
                  {/* Indicateur de dommage existant */}
                  {hasDamage && !isSelected && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        backgroundColor: '#FF9800',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1
                      }}
                    >
                      <Warning sx={{ fontSize: 14, color: 'white' }} />
                    </Box>
                  )}
                  
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    {/* Icône de catégorie */}
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        backgroundColor: `${part.color}30`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 12px',
                        color: part.color
                      }}
                    >
                      <Category />
                    </Box>
                    
                    {/* Nom de la pièce */}
                    <Typography 
                      variant="body2" 
                      fontWeight={isSelected ? 'bold' : 'medium'}
                      sx={{ 
                        mb: 1,
                        color: isSelected ? part.color : (hasDamage ? '#FF9800' : 'text.primary'),
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {part.name}
                    </Typography>
                    
                    {/* Catégorie */}
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        display: 'block',
                        color: 'text.secondary'
                      }}
                    >
                      {part.category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        
        {/* Dommages sélectionnés */}
        {selectedDamageAreas.length > 0 && (
          <Paper sx={{ 
            mt: 4, 
            p: 3, 
            borderRadius: 2,
            border: '2px solid',
            borderColor: autoRemoveDamages ? 'success.main' : 'warning.main',
            backgroundColor: autoRemoveDamages ? 'success.light' : 'warning.light'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="subtitle1" gutterBottom sx={{ 
                  color: autoRemoveDamages ? 'success.dark' : 'warning.dark', 
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}>
                  <TouchApp />
                  Zones endommagées sélectionnées ({selectedDamageAreas.length})
                </Typography>
              </Box>
              
              {autoRemoveDamages && (
                <Chip 
                  label="Suppression auto ✓" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'success.main', 
                    color: 'white',
                    fontWeight: 'bold'
                  }}
                />
              )}
            </Box>
            
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 1,
              maxHeight: 150,
              overflowY: 'auto',
              p: 1,
              bgcolor: 'rgba(255,255,255,0.5)',
              borderRadius: 1
            }}>
              {selectedDamageAreas.map(partId => {
                const part = carParts.find(p => p.id === partId);
                if (!part) return null;
                
                const hasDamage = vehicleDamages.some(d => {
                  if (!d || d.repaired) return false;
                  if (typeof d === 'string') {
                    return d.toLowerCase().includes(part.name?.toLowerCase() || '');
                  }
                  if (d.description) {
                    return d.description.toLowerCase().includes(part.name?.toLowerCase() || '');
                  }
                  return false;
                });
                
                return (
                  <Tooltip 
                    key={partId} 
                    title={hasDamage ? "Dommage existant dans la base de données" : "Nouveau dommage"}
                    arrow
                  >
                    <Chip
                      label={`${part.name}${hasDamage ? ' 🚨' : ''}`}
                      size="small"
                      onDelete={() => handleCarPartSelection(partId)}
                      sx={{ 
                        backgroundColor: `${part.color}30`,
                        color: part.color,
                        border: `1px solid ${part.color}`,
                        fontWeight: 'medium',
                        '&:hover': {
                          backgroundColor: `${part.color}40`,
                        }
                      }}
                    />
                  </Tooltip>
                );
              })}
            </Box>
          </Paper>
        )}
      </Box>
    );
  };

  if (!selectedVehicle) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      fullScreen={isMobile}
      sx={{ 
        '& .MuiDialog-paper': { 
          borderRadius: 3,
          overflow: 'hidden',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: 3,
        background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Receipt sx={{ fontSize: 32, color: 'white' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                Créer une facture de maintenance
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {selectedVehicle.name} • {selectedVehicle.matricule}
                </Typography>
                {selectedVehicle.isSmartCar && (
                  <Chip 
                    label="Voiture Smart" 
                    size="small" 
                    sx={{ 
                      backgroundColor: '#9C27B0', 
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
          <IconButton 
            onClick={onClose} 
            sx={{ 
              color: 'white',
              backgroundColor: 'rgba(255,255,255,0.1)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
            }}
          >
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 0 }}>
        <Tabs 
          value={activeTab} 
          onChange={(e, newValue) => setActiveTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            px: 3,
            pt: 2,
            '& .MuiTab-root': {
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '0.9rem',
              minHeight: 60,
              minWidth: 120
            }
          }}
        >
          <Tab label="Véhicule" icon={<DirectionsCar />} iconPosition="start" />
          <Tab label="Garage" icon={<Garage />} iconPosition="start" />
          <Tab label="Pièces Mécaniques" icon={<Build />} iconPosition="start" />
          <Tab label="Carrosserie" icon={<CarCrash />} iconPosition="start" />
          <Tab label="Finances" icon={<AttachMoney />} iconPosition="start" />
          <Tab label="Récapitulatif" icon={<AssignmentTurnedIn />} iconPosition="start" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <DirectionsCar />
                Informations du véhicule
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'primary.light',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
                  }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="primary" sx={{ mb: 2 }}>
                      Informations de base
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Nom du véhicule
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedVehicle.name}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Immatriculation
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedVehicle.matricule}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Type de véhicule
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedVehicle.isSmartCar ? 'Voiture Smart' : 'Véhicule Standard'}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Statut de maintenance
                          </Typography>
                          <Chip
                            label={selectedVehicle.maintenanceStatus === 'due' ? 'MAINTENANCE REQUISE' : 'OK'}
                            color={selectedVehicle.maintenanceStatus === 'due' ? 'error' : 'success'}
                            size="small"
                            sx={{ fontWeight: 'bold' }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'info.light',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                  }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="info.main" sx={{ mb: 2 }}>
                      Information Kilométrique
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Kilométrage actuel
                          </Typography>
                          <Typography variant="body1" fontWeight="medium" color="info.main">
                            {selectedVehicle.currentKilometer?.toLocaleString() || 0} km
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Dernière maintenance
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedVehicle.lastMaintenanceKm?.toLocaleString() || 'N/A'} km
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Prochaine maintenance
                          </Typography>
                          <Typography variant="body1" fontWeight="medium" color="warning.main">
                            {selectedVehicle.nextMaintenanceDue?.toLocaleString() || 'N/A'} km
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box>
                          <Typography variant="caption" color="textSecondary" display="block">
                            Distance parcourue
                          </Typography>
                          <Typography variant="body1" fontWeight="medium">
                            {selectedVehicle.distanceTraveled?.toLocaleString() || 0} km
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                {vehicleDamages.length > 0 && (
                  <Grid item xs={12}>
                    <Paper sx={{ 
                      p: 3, 
                      borderRadius: 2,
                      border: '2px solid',
                      borderColor: 'warning.light',
                      backgroundColor: '#FFF8E1'
                    }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="warning.dark" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Warning />
                        Dommages existants
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="body2" color="textSecondary">
                            {vehicleDamages.filter(d => !d.repaired).length} dommages non réparés trouvés dans la base de données
                          </Typography>
                        </Grid>
                        {vehicleDamages.slice(0, 3).map((damage, index) => {
                          let description = '';
                          let date = null;
                          let repaired = false;
                          
                          if (typeof damage === 'string') {
                            description = damage;
                          } else if (damage && typeof damage === 'object') {
                            description = damage.description || '';
                            date = damage.date;
                            repaired = damage.repaired || damage.isRepaired || false;
                          }
                          
                          return (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                              <Paper sx={{ 
                                p: 2, 
                                backgroundColor: repaired ? '#E8F5E9' : 'white',
                                border: '1px solid',
                                borderColor: repaired ? '#4CAF50' : '#FF9800',
                                borderRadius: 1,
                                height: '100%'
                              }}>
                                <Typography variant="body2" fontWeight="medium">
                                  {description}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                  {date ? new Date(date).toLocaleDateString() : 'Date inconnue'}
                                  {repaired && ' • RÉPARÉ'}
                                </Typography>
                              </Paper>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Paper>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
          
          {activeTab === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Garage />
                Information du garage
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'primary.light',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
                  }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Nom du garage"
                          value={maintenanceFormData.garageName}
                          onChange={(e) => handleFormInputChange('garageName', e.target.value)}
                          required
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            startAdornment: <Garage sx={{ mr: 1.5, color: 'primary.main' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Numéro de téléphone"
                          value={maintenanceFormData.phoneNumber}
                          onChange={(e) => handleFormInputChange('phoneNumber', e.target.value)}
                          required
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            startAdornment: <Phone sx={{ mr: 1.5, color: 'primary.main' }} />,
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Date de début"
                          type="date"
                          value={maintenanceFormData.startDate}
                          onChange={(e) => handleFormInputChange('startDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Date de fin"
                          type="date"
                          value={maintenanceFormData.endDate}
                          onChange={(e) => handleFormInputChange('endDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          required
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeTab === 2 && renderMechanicalParts()}
          
          {activeTab === 3 && renderCarBodyParts()}
          
          {activeTab === 4 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <AttachMoney />
                Calculs financiers
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'info.light',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                  }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="info.main" sx={{ mb: 2 }}>
                      Détails financiers
                    </Typography>
                    
                    <Grid container spacing={3}>
                      {/* Subtotal HT */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Sous-total HT (MAD)"
                          value={manualSubtotal || maintenanceFormData.subtotal}
                          onChange={(e) => setManualSubtotal(parseFloat(e.target.value) || 0)}
                          required
                          type="number"
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoney />
                              </InputAdornment>
                            )
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      
                      {/* Taux de TVA */}
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Taux de TVA</InputLabel>
                          <Select
                            value={maintenanceFormData.tvaRate}
                            onChange={(e) => handleFormInputChange('tvaRate', e.target.value)}
                            label="Taux de TVA"
                            startAdornment={
                              <InputAdornment position="start">
                                <Percent />
                              </InputAdornment>
                            }
                          >
                            {tvaOptions.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {/* Montant TVA (calculé automatiquement) */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Montant TVA (MAD)"
                          value={maintenanceFormData.tvaAmount.toFixed(2)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoney />
                              </InputAdornment>
                            ),
                            readOnly: true
                          }}
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: '#f0f0f0'
                            }
                          }}
                        />
                      </Grid>
                      
                      {/* Autres taxes */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Autres taxes (MAD)"
                          value={maintenanceFormData.taxAmount}
                          onChange={(e) => handleFormInputChange('taxAmount', e.target.value)}
                          type="number"
                          variant="outlined"
                          size="medium"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoney />
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: 'white'
                            }
                          }}
                        />
                      </Grid>
                      
                      {/* Remise */}
                      <Grid item xs={12} md={6}>
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <TextField
                              fullWidth
                              label="Remise"
                              value={maintenanceFormData.discount}
                              onChange={(e) => handleFormInputChange('discount', e.target.value)}
                              type="number"
                              variant="outlined"
                              size="medium"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocalOffer />
                                  </InputAdornment>
                                ),
                              }}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: 1.5,
                                  backgroundColor: 'white'
                                }
                              }}
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <FormControl fullWidth>
                              <Select
                                value={maintenanceFormData.discountType}
                                onChange={(e) => handleFormInputChange('discountType', e.target.value)}
                                size="medium"
                                sx={{
                                  height: '56px',
                                  '& .MuiOutlinedInput-root': {
                                    borderRadius: 1.5,
                                    backgroundColor: 'white'
                                  }
                                }}
                              >
                                <MenuItem value="fixed">MAD</MenuItem>
                                <MenuItem value="percentage">%</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      {/* Total TTC */}
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Total TTC (MAD)"
                          value={maintenanceFormData.totalAmount.toFixed(2)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Calculate />
                              </InputAdornment>
                            ),
                            readOnly: true
                          }}
                          variant="outlined"
                          size="medium"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 1.5,
                              backgroundColor: '#e8f5e9',
                              fontWeight: 'bold'
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                    
                    {/* Récapitulatif des calculs */}
                    <Paper sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                        Détail des calculs:
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">Sous-total HT:</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {maintenanceFormData.subtotal.toLocaleString()} MAD
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2">
                            TVA ({maintenanceFormData.tvaRate}%):
                          </Typography>
                          <Typography variant="body2" fontWeight="bold" color="primary">
                            {maintenanceFormData.tvaAmount.toFixed(2)} MAD
                          </Typography>
                        </Box>
                        {maintenanceFormData.taxAmount > 0 && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">Autres taxes:</Typography>
                            <Typography variant="body2" fontWeight="bold">
                              {maintenanceFormData.taxAmount.toLocaleString()} MAD
                            </Typography>
                          </Box>
                        )}
                        {maintenanceFormData.discount > 0 && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="body2">
                              Remise ({maintenanceFormData.discountType === 'percentage' ? `${maintenanceFormData.discount}%` : 'fixe'}):
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color="error">
                              -{maintenanceFormData.discountType === 'percentage' 
                                ? (maintenanceFormData.subtotal * (maintenanceFormData.discount / 100)).toFixed(2)
                                : maintenanceFormData.discount} MAD
                            </Typography>
                          </Box>
                        )}
                        <Divider />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body1" fontWeight="bold">Total TTC:</Typography>
                          <Typography variant="h6" fontWeight="bold" color="success.main">
                            {maintenanceFormData.totalAmount.toFixed(2)} MAD
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} lg={4}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'warning.light',
                    height: '100%',
                    background: 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%)'
                  }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="warning.main" sx={{ mb: 3 }}>
                      Récapitulatif des pièces
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" fontWeight="medium" gutterBottom>
                        Pièces mécaniques:
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Nombre: {selectedParts.length}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" fontWeight="medium" gutterBottom>
                        Réparations carrosserie:
                      </Typography>
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Nombre: {selectedDamageAreas.length}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={autoRemoveDamages}
                            onChange={(e) => setAutoRemoveDamages(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Typography variant="body2">
                            Suppression automatique des dommages
                          </Typography>
                        }
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
          
          {activeTab === 5 && (
            <Box>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <AssignmentTurnedIn />
                Récapitulatif de la maintenance
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} lg={8}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'success.light',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)'
                  }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="success.main" sx={{ mb: 3 }}>
                      Détails du récapitulatif
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, backgroundColor: '#E3F2FD', borderRadius: 2, height: '100%' }}>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Information du véhicule
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <DirectionsCar color="primary" />
                            <Typography variant="body1" fontWeight="bold">
                              {selectedVehicle.name}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            Immatriculation: {selectedVehicle.matricule}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Type: {selectedVehicle.isSmartCar ? 'Voiture Smart' : 'Véhicule Standard'}
                          </Typography>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, backgroundColor: '#FFF3E0', borderRadius: 2, height: '100%' }}>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Information du garage
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Garage color="warning" />
                            <Typography variant="body1" fontWeight="bold">
                              {maintenanceFormData.garageName || 'Non spécifié'}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="textSecondary">
                            Téléphone: {maintenanceFormData.phoneNumber || 'Pas de numéro'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Période: {maintenanceFormData.startDate} au {maintenanceFormData.endDate}
                          </Typography>
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 2, backgroundColor: '#E8F5E9', borderRadius: 2, height: '100%' }}>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Pièces mécaniques
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Build color="success" />
                            <Typography variant="h6" fontWeight="bold" color="success.main">
                              {selectedParts.length} pièces
                            </Typography>
                          </Box>
                          {selectedParts.length > 0 && (
                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1 }}>
                              {selectedParts.slice(0, 3).map(partId => {
                                const part = vehicleParts.find(p => p.id === partId);
                                return part?.name;
                              }).join(', ')}
                              {selectedParts.length > 3 && ` et ${selectedParts.length - 3} autres...`}
                            </Typography>
                          )}
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Paper sx={{ 
                          p: 2, 
                          backgroundColor: autoRemoveDamages ? '#E8F5E9' : '#FFF3E0', 
                          borderRadius: 2, 
                          height: '100%' 
                        }}>
                          <Typography variant="body2" color="textSecondary" gutterBottom>
                            Zones endommagées
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <CarCrash color={selectedDamageAreas.length > 0 ? 'warning' : 'disabled'} />
                            <Typography variant="h6" fontWeight="bold" color={selectedDamageAreas.length > 0 ? 'warning.main' : 'text.secondary'}>
                              {selectedDamageAreas.length} zones
                            </Typography>
                          </Box>
                          {selectedDamageAreas.length > 0 && autoRemoveDamages && (
                            <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 1 }}>
                              <AutoFixHigh fontSize="small" />
                              Seront marquées comme réparées
                            </Typography>
                          )}
                        </Paper>
                      </Grid>
                      
                      <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                      </Grid>
                      
                      {/* Détails financiers */}
                      <Grid item xs={12}>
                        <Paper sx={{ 
                          p: 3, 
                          backgroundColor: '#E8F5E9',
                          border: '2px solid',
                          borderColor: 'success.main',
                          borderRadius: 2
                        }}>
                          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                            Détails financiers
                          </Typography>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <Typography variant="body2" color="textSecondary">
                                Sous-total HT:
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                              <Typography variant="body2" fontWeight="medium">
                                {maintenanceFormData.subtotal.toFixed(2)} MAD
                              </Typography>
                            </Grid>
                            
                            <Grid item xs={6}>
                              <Typography variant="body2" color="textSecondary">
                                TVA ({maintenanceFormData.tvaRate}%):
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                              <Typography variant="body2" fontWeight="medium" color="primary">
                                {maintenanceFormData.tvaAmount.toFixed(2)} MAD
                              </Typography>
                            </Grid>
                            
                            {maintenanceFormData.taxAmount > 0 && (
                              <>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="textSecondary">
                                    Autres taxes:
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" fontWeight="medium">
                                    {maintenanceFormData.taxAmount.toFixed(2)} MAD
                                  </Typography>
                                </Grid>
                              </>
                            )}
                            
                            {maintenanceFormData.discount > 0 && (
                              <>
                                <Grid item xs={6}>
                                  <Typography variant="body2" color="textSecondary">
                                    Remise:
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                  <Typography variant="body2" fontWeight="medium" color="error">
                                    -{maintenanceFormData.discountType === 'percentage' 
                                      ? (maintenanceFormData.subtotal * (maintenanceFormData.discount / 100)).toFixed(2)
                                      : maintenanceFormData.discount} MAD
                                  </Typography>
                                </Grid>
                              </>
                            )}
                            
                            <Grid item xs={12}>
                              <Divider sx={{ my: 1 }} />
                            </Grid>
                            
                            <Grid item xs={6}>
                              <Typography variant="h6" fontWeight="bold">
                                Total TTC:
                              </Typography>
                            </Grid>
                            <Grid item xs={6} sx={{ textAlign: 'right' }}>
                              <Typography variant="h4" fontWeight="bold" color="success.main">
                                {maintenanceFormData.totalAmount.toFixed(2)} MAD
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} lg={4}>
                  <Paper sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'info.light',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
                  }}>
                    <Typography variant="subtitle1" gutterBottom fontWeight="bold" color="info.main" sx={{ mb: 3 }}>
                      Paramètres & Notes
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={autoRemoveDamages}
                            onChange={(e) => setAutoRemoveDamages(e.target.checked)}
                            color="primary"
                          />
                        }
                        label={
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              Suppression automatique des dommages
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Marquer les dommages comme réparés dans la base de données
                            </Typography>
                          </Box>
                        }
                      />
                    </Box>
                    
                    <Box>
                      <Typography variant="body2" color="textSecondary" gutterBottom>
                        Notes supplémentaires
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={8}
                        value={maintenanceFormData.notes}
                        onChange={(e) => handleFormInputChange('notes', e.target.value)}
                        placeholder="Ajoutez des instructions spéciales, observations ou informations supplémentaires..."
                        variant="outlined"
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 1.5,
                            backgroundColor: 'white'
                          }
                        }}
                      />
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ 
        p: 3, 
        bgcolor: 'grey.50', 
        borderTop: '1px solid', 
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Étape {activeTab + 1} sur 6
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
            <Button 
              variant="outlined"
              onClick={() => setActiveTab(prev => Math.max(0, prev - 1))}
              disabled={activeTab === 0}
              startIcon={<Close />}
              sx={{ borderRadius: 1.5 }}
            >
              Précédent
            </Button>
            <Button 
              variant="contained"
              onClick={() => setActiveTab(prev => Math.min(5, prev + 1))}
              disabled={activeTab === 5}
              sx={{ borderRadius: 1.5 }}
            >
              Suivant
            </Button>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 1.5,
              px: 3,
              py: 1
            }}
          >
            <Cancel sx={{ mr: 1 }} />
            Annuler
          </Button>
          <Button
            variant="contained"
            onClick={submitMaintenanceForm}
            disabled={maintenanceLoading || 
                     !maintenanceFormData.garageName || 
                     !maintenanceFormData.phoneNumber ||
                     maintenanceFormData.totalAmount <= 0}
            sx={{ 
              borderRadius: 1.5,
              px: 4,
              py: 1,
              fontWeight: 'bold',
              boxShadow: 3,
              background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #0a3d91 100%)',
                boxShadow: 6
              },
              '&.Mui-disabled': {
                background: 'linear-gradient(135deg, #cccccc 0%, #999999 100%)',
              }
            }}
            startIcon={maintenanceLoading ? <CircularProgress size={20} color="inherit" /> : <Receipt />}
          >
            {maintenanceLoading ? 'Création en cours...' : 'Créer la facture'}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default MaintenanceFormDialog;