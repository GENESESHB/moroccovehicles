import React, { useState, useEffect, useMemo, useCallback } from 'react';
import InsuranceVehicleList from './asuR/InsuranceVehicleList';
import InsuranceFormModal from './asuR/InsuranceFormModal';
import { insuranceAPI } from '../utils/api';

const InsuranceManagement = ({
  user,
  vehicles = [],
  smartCars = [],
  setMessage
}) => {
  const [filter, setFilter] = useState('all');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingInsurance, setEditingInsurance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [insurances, setInsurances] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  // ----------------------------------------------------------------
  // 1. Fetch insurances on mount
  // ----------------------------------------------------------------
  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    try {
      setDataLoading(true);
      const response = await insuranceAPI.getAll();
      if (response.data.success) {
        setInsurances(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching insurances:', error);
      if (setMessage) setMessage('Erreur lors du chargement des assurances');
    } finally {
      setDataLoading(false);
    }
  };

  // ----------------------------------------------------------------
  // 2. Normalize vehicles and smartCars into a common structure
  // ----------------------------------------------------------------
  const normalizeVehicle = (v) => ({
    _id: v._id,
    name: v.name || v.nomVehicule || 'Sans nom',
    type: v.type || v.typeVehicule || 'Inconnu',
    matricule: v.matricule || v.numeroMatricule || v.plateNumber || 'N/A',
    boiteVitesse: v.boiteVitesse || 'N/A',
    carburant: v.carburant || v.typeCarburant || 'N/A',
    prixJour: v.prixJour || v.pricePerDay || 0,
    ...v
  });

  const normalizeSmartCar = (sc) => ({
    _id: sc._id,
    name: sc.nomVehicule || sc.name || 'Smart Car',
    type: sc.typeVehicule || sc.type || 'Smart',
    matricule: sc.numeroMatricule || sc.matricule || sc.plateNumber || 'N/A',
    boiteVitesse: sc.boiteVitesse || 'N/A',
    carburant: sc.typeCarburant || sc.carburant || 'N/A',
    prixJour: sc.prixJour || 0,
    ...sc
  });

  // ----------------------------------------------------------------
  // 3. Merge both lists, deduplicate by _id
  // ----------------------------------------------------------------
  const allVehicles = useMemo(() => {
    const normalizedRegular = vehicles.map(normalizeVehicle);
    const normalizedSmart = smartCars.map(normalizeSmartCar);
    const vehicleMap = new Map();
    normalizedRegular.forEach(v => vehicleMap.set(v._id, v));
    normalizedSmart.forEach(v => vehicleMap.set(v._id, v));
    return Array.from(vehicleMap.values());
  }, [vehicles, smartCars]);

  // ----------------------------------------------------------------
  // 4. Smart car detection
  // ----------------------------------------------------------------
  const isSmartCar = useCallback((vehicle) => {
    if (!vehicle) return false;
    if (smartCars.some(sc => sc._id === vehicle._id)) return true;
    return vehicle.type === 'smart' ||
      vehicle.vehicleType === 'smart' ||
      vehicle.isSmartCar === true ||
      vehicle.category === 'smart' ||
      vehicle.model?.toLowerCase().includes('smart') ||
      vehicle.name?.toLowerCase().includes('smart');
  }, [smartCars]);

  // ----------------------------------------------------------------
  // 5. Build vehiclesWithInsurance (merge insurance data)
  // ----------------------------------------------------------------
  const vehiclesWithInsurance = useMemo(() => {
    return allVehicles.map(vehicle => {
      const insurance = insurances.find(i => 
        i.vehicleId === vehicle._id || i.vehicleId?.toString() === vehicle._id
      );
      
      const smartCar = isSmartCar(vehicle);

      return {
        ...vehicle,
        isSmartCar: smartCar,
        insuranceInfo: {
          startDate: insurance?.startDate || vehicle.assuranceStartDate,
          endDate: insurance?.endDate || vehicle.assuranceEndDate,
          company: insurance?.company || vehicle.assuranceCompany,
          policyNumber: insurance?.policyNumber || vehicle.assurancePolicyNumber,
          cost: insurance?.cost || vehicle.assuranceCost,
          status: getInsuranceStatus(
            insurance?.startDate || vehicle.assuranceStartDate,
            insurance?.endDate || vehicle.assuranceEndDate
          ),
          insuranceId: insurance?._id,
          coverage: insurance?.coverage || 'Tous risques',
          notes: insurance?.notes || '',
          createdAt: insurance?.createdAt,
          updatedAt: insurance?.updatedAt
        }
      };
    });
  }, [allVehicles, insurances, isSmartCar]);

  // ----------------------------------------------------------------
  // 6. Insurance status helper
  // ----------------------------------------------------------------
  function getInsuranceStatus(startDate, endDate) {
    if (!startDate || !endDate) return 'no-insurance';
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return 'pending';
    if (now >= start && now <= end) return 'active';
    return 'expired';
  }

  // ----------------------------------------------------------------
  // 7. Filtered vehicles (based on search, filter, vehicle type)
  // ----------------------------------------------------------------
  const filteredVehicles = useMemo(() => {
    return vehiclesWithInsurance.filter(vehicle => {
      const matchesFilter = filter === 'all' || vehicle.insuranceInfo.status === filter;
      const matchesVehicleType = vehicleTypeFilter === 'all' ||
        (vehicleTypeFilter === 'smart' && vehicle.isSmartCar) ||
        (vehicleTypeFilter === 'regular' && !vehicle.isSmartCar);
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        vehicle.name?.toLowerCase().includes(searchLower) ||
        vehicle.type?.toLowerCase().includes(searchLower) ||
        vehicle.matricule?.toLowerCase().includes(searchLower) ||
        vehicle.insuranceInfo.company?.toLowerCase().includes(searchLower) ||
        vehicle.insuranceInfo.policyNumber?.toLowerCase().includes(searchLower) ||
        (vehicle.isSmartCar && 'smart'.includes(searchLower));
      return matchesFilter && matchesVehicleType && matchesSearch;
    });
  }, [vehiclesWithInsurance, filter, vehicleTypeFilter, searchTerm]);

  // ----------------------------------------------------------------
  // 8. Statistics
  // ----------------------------------------------------------------
  const stats = useMemo(() => {
    const smartCarsList = vehiclesWithInsurance.filter(v => v.isSmartCar);
    const regularVehicles = vehiclesWithInsurance.filter(v => !v.isSmartCar);
    
    return {
      total: vehiclesWithInsurance.length,
      smartCars: smartCarsList.length,
      regularVehicles: regularVehicles.length,
      active: vehiclesWithInsurance.filter(v => v.insuranceInfo.status === 'active').length,
      pending: vehiclesWithInsurance.filter(v => v.insuranceInfo.status === 'pending').length,
      expired: vehiclesWithInsurance.filter(v => v.insuranceInfo.status === 'expired').length,
      noInsurance: vehiclesWithInsurance.filter(v => v.insuranceInfo.status === 'no-insurance').length,
      activeSmartCars: smartCarsList.filter(v => v.insuranceInfo.status === 'active').length,
    };
  }, [vehiclesWithInsurance]);

  // ----------------------------------------------------------------
  // 9. Form state and handlers - SIMPLIFIED (no telematics)
  // ----------------------------------------------------------------
  const [formData, setFormData] = useState({
    vehicleId: '',
    company: '',
    policyNumber: '',
    startDate: '',
    endDate: '',
    cost: '',
    coverage: 'Tous risques',
    notes: '',
    status: 'pending'
  });

  const resetForm = () => {
    setFormData({
      vehicleId: '',
      company: '',
      policyNumber: '',
      startDate: '',
      endDate: '',
      cost: '',
      coverage: 'Tous risques',
      notes: '',
      status: 'pending'
    });
    setEditingInsurance(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEdit = (vehicle) => {
    setEditingInsurance(vehicle);
    const info = vehicle.insuranceInfo || {};
    
    setFormData({
      vehicleId: vehicle._id,
      company: info.company || '',
      policyNumber: info.policyNumber || '',
      startDate: info.startDate ? new Date(info.startDate).toISOString().split('T')[0] : '',
      endDate: info.endDate ? new Date(info.endDate).toISOString().split('T')[0] : '',
      cost: info.cost || '',
      coverage: info.coverage || 'Tous risques',
      notes: info.notes || '',
      status: info.status || 'pending'
    });
    setShowForm(true);
  };

  // ----------------------------------------------------------------
  // 10. Form Submission Handler - SIMPLIFIED
  // ----------------------------------------------------------------
  const handleFormSubmit = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    setLoading(true);
    
    try {
      const vehicle = allVehicles.find(v => v._id === formData.vehicleId);
      if (!vehicle) {
        throw new Error('Véhicule non trouvé');
      }
      
      const isSmart = isSmartCar(vehicle);
      
      const payload = {
        vehicleId: formData.vehicleId,
        vehicleType: isSmart ? 'smart' : 'regular',
        smartCar: isSmart,
        company: formData.company,
        policyNumber: formData.policyNumber,
        startDate: formData.startDate,
        endDate: formData.endDate,
        cost: Number(formData.cost) || 0,
        coverage: formData.coverage || 'Tous risques',
        notes: formData.notes || '',
        status: formData.status || 'pending'
      };

      let response;
      
      if (editingInsurance?.insuranceInfo?.insuranceId) {
        response = await insuranceAPI.update(
          editingInsurance.insuranceInfo.insuranceId, 
          payload
        );
        if (response.data.success) {
          setInsurances(prev => prev.map(i => 
            i._id === editingInsurance.insuranceInfo.insuranceId ? response.data.data : i
          ));
          if (setMessage) setMessage('Assurance mise à jour avec succès');
        }
      } else {
        response = await insuranceAPI.create(payload);
        if (response.data.success) {
          setInsurances(prev => [...prev, response.data.data]);
          if (setMessage) setMessage('Assurance créée avec succès');
        }
      }
      
      setShowForm(false);
      resetForm();
      await fetchInsurances();
      
    } catch (error) {
      console.error('Error saving insurance:', error);
      const errorMsg = error.response?.data?.message || error.message || 'Erreur lors de la sauvegarde';
      if (setMessage) setMessage(`Erreur: ${errorMsg}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleView = (vehicle) => {
    console.log('View vehicle:', vehicle);
  };

  const handleSmartCarDetails = (vehicle) => {
    if (setMessage) {
      setMessage(`${vehicle.name} - Smart Car`);
    }
  };

  // ----------------------------------------------------------------
  // 11. PRINT / ATTESTATION FUNCTION - UPDATED VERSION
  // ----------------------------------------------------------------
  const handlePrint = async (vehicle) => {
    if (!vehicle.insuranceInfo?.insuranceId) {
      if (setMessage) setMessage('Aucune assurance à imprimer pour ce véhicule');
      return;
    }

    try {
      setLoading(true);
      const response = await insuranceAPI.getAttestation(vehicle.insuranceInfo.insuranceId);
      
      if (!response.data.success) {
        throw new Error('Failed to fetch attestation data');
      }

      const { insurance, user: userData, vehicle: vehicleData } = response.data.data;
      
      const printWindow = window.open('', '_blank');

      const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Attestation Assurance - ${vehicleData.name}</title>
    <style>
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Helvetica Neue', Arial, sans-serif; 
            font-size: 10px; 
            line-height: 1.4; 
            color: #334155;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .a4-container {
            width: 210mm;
            height: 297mm;
            padding: 15mm;
            margin: 0 auto;
            background: white;
            position: relative;
            display: flex;
            flex-direction: column;
        }
        .header {
            background: #1e293b !important;
            color: white !important;
            text-align: center;
            padding: 15px;
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 15px;
            border-radius: 6px;
            letter-spacing: 1px;
        }
        .attestation-ref {
            text-align: right;
            font-size: 9px;
            color: #64748b;
            margin-bottom: 10px;
            font-family: monospace;
        }
        .sub-header {
            background: #f1f5f9;
            border: 2px solid #cbd5e1;
            border-radius: 6px;
            padding: 10px 15px;
            margin-bottom: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .policy-number {
            font-family: 'Courier New', monospace;
            font-size: 14px;
            font-weight: bold;
            color: #1e293b;
        }
        .status-badge {
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
        }
        .status-active { background: #dcfce7; color: #166534; border: 2px solid #86efac; }
        .status-pending { background: #fef3c7; color: #92400e; border: 2px solid #fcd34d; }
        .status-expired { background: #fee2e2; color: #991b1b; border: 2px solid #fca5a5; }
        
        .section {
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            margin-bottom: 12px;
            overflow: hidden;
            background: white;
        }
        .section-title {
            background: #f59e0b !important;
            color: #fdfdfd !important;
            padding: 8px 12px;
            font-weight: bold;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .section-body {
            padding: 12px;
        }
        .two-cols {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-bottom: 12px;
        }
        .field-row {
            display: flex;
            margin-bottom: 8px;
            align-items: baseline;
        }
        .field-label {
            font-weight: 700;
            color: #475569;
            min-width: 100px;
            font-size: 9px;
            text-transform: uppercase;
        }
        .field-value {
            flex: 1;
            padding-left: 8px;
            font-size: 11px;
            font-weight: 600;
            color: #0f172a;
            border-bottom: 1px dotted #cbd5e1;
            min-height: 14px;
        }
        .highlight {
            color: #059669;
            font-weight: 700;
        }
        
        .vehicle-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
        }
        
        .cost-box {
            background: #f0fdf4;
            border: 2px solid #86efac;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            margin-top: 10px;
        }
        .cost-label {
            font-size: 10px;
            color: #166534;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .cost-value {
            font-size: 24px;
            font-weight: 800;
            color: #059669;
        }
        
        .period-box {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            text-align: center;
        }
        .period-label {
            font-size: 9px;
            color: #64748b;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 4px;
        }
        .period-value {
            font-size: 13px;
            color: #1e293b;
            font-weight: 700;
        }

        /* Declaration and signature */
        .declaration {
            margin: 20px 0;
            padding: 15px;
            background: #f8fafc;
            border-left: 4px solid #f59e0b;
            font-style: italic;
            font-size: 11px;
            color: #1e293b;
            border-radius: 0 8px 8px 0;
        }
        .signature-box {
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }
        .signature-title {
            font-size: 12px;
            font-weight: bold;
            color: #1e293b;
            margin-bottom: 5px;
            text-transform: uppercase;
        }
        .agency-name {
            font-size: 14px;
            font-weight: 700;
            color: #059669;
            margin-bottom: 20px;
        }
        .signature-line {
            border-top: 2px solid #334155;
            width: 300px;
            padding-top: 8px;
            text-align: center;
            font-size: 10px;
            color: #64748b;
        }
        .footer {
            margin-top: 20px;
            padding: 10px;
            background: #eff6ff;
            border: 1px solid #3b82f6;
            border-radius: 6px;
            text-align: center;
            font-size: 9px;
            color: #1e40af;
            font-weight: 600;
        }
        
        @media print {
            .a4-container { width: 100%; height: 100%; padding: 10mm; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="a4-container">
        <!-- Attestation reference number -->
        <div class="attestation-ref">
            Attestation N°: ${insurance._id}
        </div>

        <!-- Header -->
        <div class="header">
            ATTESTATION D'ASSURANCE
        </div>

        <!-- Policy Info -->
        <div class="sub-header">
            <div class="policy-number">POLICE N°: ${insurance.policyNumber}</div>
            <div class="status-badge status-${insurance.status}">
                ${insurance.status === 'active' ? 'ACTIF' : insurance.status === 'pending' ? 'EN ATTENTE' : 'EXPIRE'}
            </div>
        </div>

        <!-- Agency Info (User) -->
        <div class="two-cols">
            <div class="section">
                <div class="section-title">Agence de Location</div>
                <div class="section-body">
                    <div class="field-row">
                        <span class="field-label">Entreprise:</span>
                        <span class="field-value highlight">${userData.entreprise || userData.companyName || 'N/A'}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Contact:</span>
                        <span class="field-value">${userData.name || 'N/A'}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Email:</span>
                        <span class="field-value">${userData.email || 'N/A'}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Téléphone:</span>
                        <span class="field-value">${userData.number || userData.phone || 'N/A'}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Adresse:</span>
                        <span class="field-value">${userData.city || ''}${userData.country ? ', ' + userData.country : ''}</span>
                    </div>
                </div>
            </div>

            <!-- Insurance Company Info -->
            <div class="section">
                <div class="section-title">Compagnie d'Assurance</div>
                <div class="section-body">
                    <div class="field-row">
                        <span class="field-label">Assureur:</span>
                        <span class="field-value highlight">${insurance.company}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Police N°:</span>
                        <span class="field-value">${insurance.policyNumber}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Couverture:</span>
                        <span class="field-value">${insurance.coverage || 'Tous risques'}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">ID ATTESTATION:</span>
                        <span class="field-value" style="font-family: monospace; font-size: 9px;">${insurance._id}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Vehicle Info -->
        <div class="section">
            <div class="section-title">Véhicule Assuré</div>
            <div class="section-body">
                <div class="vehicle-grid">
                    <div class="field-row">
                        <span class="field-label">Marque:</span>
                        <span class="field-value highlight">${vehicleData.name}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Immatriculation:</span>
                        <span class="field-value highlight">${vehicleData.matricule}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Type:</span>
                        <span class="field-value">${vehicleData.type}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Carburant:</span>
                        <span class="field-value">${vehicleData.carburant}</span>
                    </div>
                    <div class="field-row">
                        <span class="field-label">Boîte:</span>
                        <span class="field-value">${vehicleData.boiteVitesse}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Period & Cost -->
        <div class="two-cols">
            <div class="section">
                <div class="section-title">Période de Validité</div>
                <div class="section-body">
                    <div style="display: flex; gap: 15px; align-items: center; justify-content: center;">
                        <div class="period-box" style="flex: 1;">
                            <div class="period-label">Date Début</div>
                            <div class="period-value">${new Date(insurance.startDate).toLocaleDateString('fr-FR')}</div>
                        </div>
                        <div style="font-size: 20px; color: #3b82f6;">→</div>
                        <div class="period-box" style="flex: 1; border-color: #ef4444;">
                            <div class="period-label">Date Expiration</div>
                            <div class="period-value" style="color: #dc2626;">${new Date(insurance.endDate).toLocaleDateString('fr-FR')}</div>
                        </div>
                    </div>
                    <div class="field-row" style="margin-top: 10px; justify-content: center;">
                        <span class="field-label" style="min-width: auto;">Durée:</span>
                        <span class="field-value" style="border: none; font-size: 12px;">
                            ${Math.ceil((new Date(insurance.endDate) - new Date(insurance.startDate)) / (1000 * 60 * 60 * 24))} jours
                        </span>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">Prime d'Assurance</div>
                <div class="section-body">
                    <div class="cost-box">
                        <div class="cost-label">Prime Annuelle</div>
                        <div class="cost-value">${insurance.cost ? insurance.cost.toLocaleString('fr-FR') : '0'} MAD</div>
                    </div>
                </div>
            </div>
        </div>

        ${insurance.notes ? `
        <!-- Notes -->
        <div class="section">
            <div class="section-title">Notes et Conditions</div>
            <div class="section-body">
                <div style="background: #f8fafc; padding: 10px; border-radius: 4px; font-size: 10px; color: #475569; line-height: 1.5;">
                    ${insurance.notes}
                </div>
            </div>
        </div>
        ` : ''}

        <!-- Declaration -->
        <div class="declaration">
            <p>Je soussigné, <strong>${userData.entreprise || userData.companyName || userData.name || 'l\'agence'}</strong>, certifie que les informations ci-dessus sont exactes et que le véhicule désigné est bien assuré conformément à la police mentionnée. La présente attestation est délivrée pour servir et valoir ce que de droit, notamment pour justifier de l'existence d'une assurance valide auprès des autorités compétentes.</p>
        </div>

        <!-- Signature (Agency only) -->
        <div class="signature-box">
            <div class="signature-title">L'AGENCE DE LOCATION</div>
            <div class="agency-name">${userData.entreprise || userData.companyName || userData.name || 'Agence'}</div>
            <div class="signature-line">Signature + Cachet</div>
        </div>

        <!-- Footer -->
        <div class="footer">
            Fait à ${userData.city || '________'}, le ${new Date().toLocaleDateString('fr-FR')}<br>
            Cette attestation doit être conservée dans le véhicule en permanence. | WegoRent System
        </div>
    </div>
</body>
</html>
      `;
      
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      
    } catch (error) {
      console.error('Error generating attestation:', error);
      if (setMessage) setMessage('Erreur lors de la génération de l\'attestation: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (vehicle) => {
    if (!vehicle.insuranceInfo.insuranceId) {
      if (setMessage) setMessage('Aucune assurance à supprimer pour ce véhicule');
      return;
    }
    
    if (window.confirm(`Supprimer l'assurance pour ${vehicle.name} ?`)) {
      try {
        setLoading(true);
        await insuranceAPI.delete(vehicle.insuranceInfo.insuranceId);
        setInsurances(prev => prev.filter(i => i._id !== vehicle.insuranceInfo.insuranceId));
        if (setMessage) setMessage('Assurance supprimée avec succès');
        await fetchInsurances();
      } catch (error) {
        console.error('Error deleting insurance:', error);
        if (setMessage) setMessage('Erreur lors de la suppression');
      } finally {
        setLoading(false);
      }
    }
  };

  const selectedVehicle = formData.vehicleId
    ? allVehicles.find(v => v._id === formData.vehicleId)
    : null;
  const isSmartCarSelected = selectedVehicle ? isSmartCar(selectedVehicle) : false;

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#333333'
    }}>
      <InsuranceVehicleList
        vehiclesWithInsurance={vehiclesWithInsurance}
        filteredVehicles={filteredVehicles}
        stats={stats}
        filter={filter}
        setFilter={setFilter}
        vehicleTypeFilter={vehicleTypeFilter}
        setVehicleTypeFilter={setVehicleTypeFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        loading={loading || dataLoading}
        onAddClick={() => setShowForm(true)}
        onView={handleView}
        onEdit={handleEdit}
        onSmartCarDetails={handleSmartCarDetails}
        onPrint={handlePrint}
        onDelete={handleDelete}
      />

      {showForm && (
        <InsuranceFormModal
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onClose={() => { setShowForm(false); resetForm(); }}
          loading={loading}
          isEditing={!!editingInsurance}
          isSmartCarSelected={isSmartCarSelected}
          allVehicles={allVehicles}
          isSmartCar={isSmartCar}
        />
      )}
    </div>
  );
};

export default InsuranceManagement;