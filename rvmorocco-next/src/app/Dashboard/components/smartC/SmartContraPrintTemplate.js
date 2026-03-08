// SmartContraPrintTemplate.js
// This file contains the HTML template generation logic for printing contracts

/**
 * Helper to check if a value exists and is not empty
 */
const hasValue = (val) => {
  if (val === null || val === undefined) return false;
  if (typeof val === 'string' && val.trim() === '') return false;
  if (typeof val === 'number' && val === 0) return false;
  if (Array.isArray(val) && val.length === 0) return false;
  if (typeof val === 'object' && !Array.isArray(val) && Object.keys(val).length === 0) return false;
  return true;
};

/**
 * Helper to safely access nested object properties
 */
const get = (obj, path, defaultValue = '') => {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result?.[key];
    if (result === undefined || result === null) return defaultValue;
  }
  return result;
};

/**
 * Format date to French locale (DD/MM/YYYY)
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

/**
 * Format date and time to French locale
 */
const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleString('fr-FR', { 
    year: 'numeric', month: 'short', day: 'numeric', 
    hour: '2-digit', minute: '2-digit' 
  });
};

/**
 * Calculate days between two dates
 */
const calculateDays = (start, end) => {
  if (!start || !end) return 0;
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffTime = Math.abs(endDate - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
};

/**
 * Generate SVG Car Diagram with damages
 */
const generateCarSVG = (damages = [], carPartsData) => {
  const isDamaged = (partId) => damages.some(d => d.id === partId || d.emplacement === partId);
  
  const colors = {
    damagedFill: '#fca5a5',
    damagedStroke: '#dc2626',
    normalGlassFill: '#dbeafe',
    normalGlassStroke: '#475569',
    roofFill: '#f1f5f9',
    roofStroke: '#64748b',
    hoodTrunkFill: '#f8fafc',
    hoodTrunkStroke: '#64748b',
    bumpersFill: '#e2e8f0',
    bumpersStroke: '#475569',
    doorsFill: '#f8fafc',
    doorsStroke: '#64748b',
    wheelsFill: '#334155',
    wheelsStroke: '#1e293b',
    wheelCenters: '#94a3b8',
    mirrorsFill: '#e2e8f0',
    mirrorsStroke: '#475569',
    headlightsFill: '#fef08a',
    headlightsStroke: '#ca8a04',
    taillightsFill: '#ef4444',
    taillightsStroke: '#991b1b'
  };

  return `
    <svg viewBox="0 0 320 480" style="width:100%;max-width:180px;height:auto;">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-opacity="0.2"/>
        </filter>
      </defs>
      
      <g transform="translate(160, 240)">
        <!-- Carrosserie principale -->
        <path d="M -70 -180 C -90 -180, -100 -160, -100 -140 L -100 140 C -100 160, -90 180, -70 180 L 70 180 C 90 180, 100 160, 100 140 L 100 -140 C 100 -160, 90 -180, 70 -180 Z" 
              fill="white" stroke="#1e293b" stroke-width="2" />
        
        <!-- Vitre avant -->
        <path d="M -60 -120 L 60 -120 L 50 -80 L -50 -80 Z" 
              fill="${isDamaged('vitre-avant') ? colors.damagedFill : colors.normalGlassFill}" 
              stroke="${isDamaged('vitre-avant') ? colors.damagedStroke : colors.normalGlassStroke}" stroke-width="1.5"/>
        
        <!-- Vitre arriere -->
        <path d="M -60 120 L 60 120 L 50 80 L -50 80 Z" 
              fill="${isDamaged('vitre-arriere') ? colors.damagedFill : colors.normalGlassFill}" 
              stroke="${isDamaged('vitre-arriere') ? colors.damagedStroke : colors.normalGlassStroke}" stroke-width="1.5"/>
        
        <!-- Toit -->
        <rect x="-55" y="-80" width="110" height="160" rx="3"
              fill="${isDamaged('toit') ? colors.damagedFill : colors.roofFill}" 
              stroke="${isDamaged('toit') ? colors.damagedStroke : colors.roofStroke}" stroke-width="1.5"/>
        
        <!-- Capot -->
        <path d="M -65 -180 L 65 -180 L 60 -120 L -60 -120 Z" 
              fill="${isDamaged('capot') ? colors.damagedFill : colors.hoodTrunkFill}" 
              stroke="${isDamaged('capot') ? colors.damagedStroke : colors.hoodTrunkStroke}" stroke-width="1.5"/>
        
        <!-- Coffre -->
        <path d="M -65 180 L 65 180 L 60 120 L -60 120 Z" 
              fill="${isDamaged('coffre') ? colors.damagedFill : colors.hoodTrunkFill}" 
              stroke="${isDamaged('coffre') ? colors.damagedStroke : colors.hoodTrunkStroke}" stroke-width="1.5"/>
        
        <!-- Pare-chocs avant -->
        <path d="M -75 -190 Q 0 -200 75 -190 L 70 -180 L -70 -180 Z" 
              fill="${isDamaged('pare-chocs-avant') ? colors.damagedFill : colors.bumpersFill}" 
              stroke="${isDamaged('pare-chocs-avant') ? colors.damagedStroke : colors.bumpersStroke}" stroke-width="1.5"/>
        
        <!-- Pare-chocs arriere -->
        <path d="M -75 190 Q 0 200 75 190 L 70 180 L -70 180 Z" 
              fill="${isDamaged('pare-chocs-arriere') ? colors.damagedFill : colors.bumpersFill}" 
              stroke="${isDamaged('pare-chocs-arriere') ? colors.damagedStroke : colors.bumpersStroke}" stroke-width="1.5"/>
        
        <!-- Portes gauche -->
        <rect x="-100" y="-60" width="45" height="80" rx="2"
              fill="${isDamaged('porte-avant-gauche') ? colors.damagedFill : colors.doorsFill}" 
              stroke="${isDamaged('porte-avant-gauche') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
        <rect x="-100" y="20" width="45" height="80" rx="2"
              fill="${isDamaged('porte-arriere-gauche') ? colors.damagedFill : colors.doorsFill}" 
              stroke="${isDamaged('porte-arriere-gauche') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
        
        <!-- Portes droite -->
        <rect x="55" y="-60" width="45" height="80" rx="2"
              fill="${isDamaged('porte-avant-droite') ? colors.damagedFill : colors.doorsFill}" 
              stroke="${isDamaged('porte-avant-droite') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
        <rect x="55" y="20" width="45" height="80" rx="2"
              fill="${isDamaged('porte-arriere-droite') ? colors.damagedFill : colors.doorsFill}" 
              stroke="${isDamaged('porte-arriere-droite') ? colors.damagedStroke : colors.doorsStroke}" stroke-width="1.5"/>
        
        <!-- Ailes -->
        <path d="M -100 -140 L -65 -140 L -65 -60 L -100 -60 Z" 
              fill="${isDamaged('aile-avant-gauche') ? colors.damagedFill : '#ffffff'}" 
              stroke="${isDamaged('aile-avant-gauche') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
        <path d="M -100 100 L -65 100 L -65 20 L -100 20 Z" 
              fill="${isDamaged('aile-arriere-gauche') ? colors.damagedFill : '#ffffff'}" 
              stroke="${isDamaged('aile-arriere-gauche') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
        <path d="M 100 -140 L 65 -140 L 65 -60 L 100 -60 Z" 
              fill="${isDamaged('aile-avant-droite') ? colors.damagedFill : '#ffffff'}" 
              stroke="${isDamaged('aile-avant-droite') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
        <path d="M 100 100 L 65 100 L 65 20 L 100 20 Z" 
              fill="${isDamaged('aile-arriere-droite') ? colors.damagedFill : '#ffffff'}" 
              stroke="${isDamaged('aile-arriere-droite') ? colors.damagedStroke : '#64748b'}" stroke-width="1"/>
        
        <!-- Roues -->
        <circle cx="-85" cy="-100" r="18" 
                fill="${isDamaged('jante-avant-gauche') ? colors.damagedFill : colors.wheelsFill}" 
                stroke="${isDamaged('jante-avant-gauche') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
        <circle cx="-85" cy="-100" r="10" fill="${colors.wheelCenters}"/>
        <circle cx="85" cy="-100" r="18" 
                fill="${isDamaged('jante-avant-droite') ? colors.damagedFill : colors.wheelsFill}" 
                stroke="${isDamaged('jante-avant-droite') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
        <circle cx="85" cy="-100" r="10" fill="${colors.wheelCenters}"/>
        <circle cx="-85" cy="100" r="18" 
                fill="${isDamaged('jante-arriere-gauche') ? colors.damagedFill : colors.wheelsFill}" 
                stroke="${isDamaged('jante-arriere-gauche') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
        <circle cx="-85" cy="100" r="10" fill="${colors.wheelCenters}"/>
        <circle cx="85" cy="100" r="18" 
                fill="${isDamaged('jante-arriere-droite') ? colors.damagedFill : colors.wheelsFill}" 
                stroke="${isDamaged('jante-arriere-droite') ? colors.damagedStroke : colors.wheelsStroke}" stroke-width="2"/>
        <circle cx="85" cy="100" r="10" fill="${colors.wheelCenters}"/>
        
        <!-- Retrovisseurs -->
        <ellipse cx="-110" cy="-40" rx="6" ry="10" 
                 fill="${isDamaged('retroviseur-gauche') ? colors.damagedFill : colors.mirrorsFill}" 
                 stroke="${isDamaged('retroviseur-gauche') ? colors.damagedStroke : colors.mirrorsStroke}" stroke-width="1.5"/>
        <ellipse cx="110" cy="-40" rx="6" ry="10" 
                 fill="${isDamaged('retroviseur-droit') ? colors.damagedFill : colors.mirrorsFill}" 
                 stroke="${isDamaged('retroviseur-droit') ? colors.damagedStroke : colors.mirrorsStroke}" stroke-width="1.5"/>
        
        <!-- Phares avant -->
        <path d="M -60 -175 L -40 -175 L -35 -165 L -60 -165 Z" 
              fill="${isDamaged('phare-avant-gauche') ? colors.damagedFill : colors.headlightsFill}" 
              stroke="${isDamaged('phare-avant-gauche') ? colors.damagedStroke : colors.headlightsStroke}" stroke-width="1"/>
        <path d="M 60 -175 L 40 -175 L 35 -165 L 60 -165 Z" 
              fill="${isDamaged('phare-avant-droit') ? colors.damagedFill : colors.headlightsFill}" 
              stroke="${isDamaged('phare-avant-droit') ? colors.damagedStroke : colors.headlightsStroke}" stroke-width="1"/>
        
        <!-- Feux arriere -->
        <path d="M -60 175 L -40 175 L -35 165 L -60 165 Z" 
              fill="${isDamaged('feu-arriere-gauche') ? colors.damagedFill : colors.taillightsFill}" 
              stroke="${isDamaged('feu-arriere-gauche') ? colors.damagedStroke : colors.taillightsStroke}" stroke-width="1"/>
        <path d="M 60 175 L 40 175 L 35 165 L 60 165 Z" 
              fill="${isDamaged('feu-arriere-droit') ? colors.damagedFill : colors.taillightsFill}" 
              stroke="${isDamaged('feu-arriere-droit') ? colors.damagedStroke : colors.taillightsStroke}" stroke-width="1"/>
      </g>
      
      <text x="160" y="15" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="bold">AVANT</text>
      <text x="160" y="465" text-anchor="middle" font-size="10" fill="#1e293b" font-weight="bold">ARRIERE</text>
    </svg>
  `;
};

/**
 * Generate small fuel gauge with percentage only
 */
const generateSmallFuelGauge = (level) => {
  const percentage = Math.min(100, Math.max(0, Math.round(level)));
  
  let color = '#ef4444';
  if (percentage > 25) color = '#f59e0b';
  if (percentage > 50) color = '#eab308';
  if (percentage > 75) color = '#22c55e';
  
  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
      <div style="font-size:10px;font-weight:800;color:${color};">${percentage}%</div>
      <div style="width:50px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;border:1px solid #d1d5db;">
        <div style="width:${percentage}%;height:100%;background:${color};"></div>
      </div>
    </div>
  `;
};

/**
 * Generate equipment checkboxes HTML
 */
const generateEquipmentCheckboxes = (equipements) => {
  const equipmentList = ['Radio', 'GPS', 'CD', 'MP3'];
  const userEquipements = Array.isArray(equipements) ? equipements : [];
  
  return equipmentList.map(item => {
    const isChecked = userEquipements.some(e => 
      e.toLowerCase() === item.toLowerCase() || 
      e.toLowerCase().includes(item.toLowerCase())
    );
    
    return `
      <div style="display:flex;align-items:center;gap:3px;font-size:8px;">
        <div style="width:10px;height:10px;border:1px solid #475569;display:flex;align-items:center;justify-content:center;background:white;border-radius:1px;">
          ${isChecked ? '<span style="color:#16a34a;font-weight:bold;font-size:8px;">✓</span>' : ''}
        </div>
        <span style="${isChecked ? 'font-weight:600;color:#166534;' : 'color:#6b7280;'}">${item}</span>
      </div>
    `;
  }).join('');
};

/**
 * Generate checkbox item for conditions
 */
const generateConditionCheckbox = (text, checked = false) => `
  <div style="display:flex;align-items:flex-start;gap:4px;margin-bottom:3px;font-size:7.5px;line-height:1.3;color:#374151;">
    <div style="width:10px;height:10px;border:1px solid #6b7280;flex-shrink:0;margin-top:1px;background:white;display:flex;align-items:center;justify-content:center;border-radius:1px;">
      ${checked ? '<span style="color:#16a34a;font-size:8px;font-weight:bold;">✓</span>' : ''}
    </div>
    <span style="flex:1;">${text}</span>
  </div>
`;

/**
 * Main function to generate the complete HTML content for printing
 */
export const generateContractPrintContent = (contract, user, carPartsData) => {
  const clientData = contract.clientSnapshot || {};
  const vehicleData = contract.vehicleSnapshot || {};
  const enterpriseData = contract.entrepriseSnapshot || user || {};
  const insuranceData = contract.insuranceSnapshot || {};
  
  const days = calculateDays(contract.startDate, contract.endDate);
  const dommages = contract.dommages || [];
  const partnerName = enterpriseData.entreprise || enterpriseData.name || 'Agence';
  const paymentMethods = contract.paymentMethods || contract.paymentInfo?.methods || [];
  const equipements = vehicleData.equipements || [];
  
  const reservoirEtat = contract.reservoirEtat || {};
  const departNiveau = reservoirEtat.depart?.niveau ?? contract.niveauReservoir ?? 0;
  const retourNiveau = reservoirEtat.retour?.niveau ?? 0;
  const hasFuelData = hasValue(departNiveau) || hasValue(retourNiveau);

  const prixVoiture = parseFloat(contract.prixVoiture) || 0;
  const rentalCost = days * prixVoiture;
  const deliveryCost = parseFloat(contract.deliveryCost) || 0;
  const dropOffCost = parseFloat(contract.dropOffCost) || 0;
  const insuranceCost = parseFloat(contract.insuranceCost) || 0;
  const babySeatCost = parseFloat(contract.babySeatCost) || 0;
  const surveillanceCost = parseFloat(contract.surveillanceCost) || 0;
  const autresFrais = parseFloat(contract.autresFrais) || 0;
  
  const sommeDesFrais = parseFloat(contract.sommeDesFrais) || (
    rentalCost + deliveryCost + dropOffCost + insuranceCost + babySeatCost + surveillanceCost + autresFrais
  );
  
  const tva = parseFloat(get(contract, 'impot.tva', 0));
  const tvaRate = parseFloat(get(contract, 'impot.tvaRate', 0));
  const deposit = parseFloat(contract.deposit) || 0;
  const total = parseFloat(contract.prixTotal) || (sommeDesFrais + tva);
  
  const totalPaid = parseFloat(contract.paymentInfo?.totalPaid) || 
    paymentMethods
      .filter(m => m.status === 'completed')
      .reduce((sum, m) => sum + (parseFloat(m.amount) || 0), 0);
  
  const resteAPayer = Math.max(0, total - totalPaid);

  const generatePaymentMethodsList = () => {
    const completedPayments = paymentMethods.filter(m => m.status === 'completed' && hasValue(m.amount));
    
    const paymentsHTML = completedPayments.length > 0 ? `
      <div style="margin-bottom:6px;">
        <div style="font-size:9px;font-weight:700;color:#374151;margin-bottom:4px;border-bottom:1px solid #e2e8f0;padding-bottom:2px;">
          PAIEMENTS EFFECTUÉS
        </div>
        <div style="display:flex;flex-direction:column;gap:3px;">
          ${completedPayments.map((m) => {
            const typeLabels = {
              'espece': 'Espèces',
              'carte': 'Carte Bancaire',
              'cheque': 'Chèque',
              'virement': 'Virement'
            };
            return `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 8px;background:#f0fdf4;border-radius:4px;border:1px solid #86efac;">
                <span style="font-size:9px;font-weight:600;color:#166534;">
                  ${typeLabels[m.type] || m.type}
                  ${m.reference ? `<span style="color:#16a34a;font-weight:400;font-size:8px;"> (${m.reference})</span>` : ''}
                </span>
                <span style="font-size:10px;font-weight:700;color:#16a34a;">
                  ${parseFloat(m.amount).toFixed(2)} MAD
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : '';
    
    const totalPaidHTML = totalPaid > 0 ? `
      <div style="margin-top:4px;padding:4px;background:#f0fdf4;border:1px solid #86efac;border-radius:3px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:9px;font-weight:700;color:#166534;">TOTAL PAYÉ</span>
        <span style="font-size:11px;font-weight:800;color:#16a34a;">${totalPaid.toFixed(2)} MAD</span>
      </div>
    ` : '';
    
    const resteHTML = resteAPayer > 0 ? `
      <div style="margin-top:4px;padding:4px;background:#fef2f2;border:2px solid #dc2626;border-radius:3px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:9px;font-weight:700;color:#991b1b;">RESTE À PAYER</span>
        <span style="font-size:12px;font-weight:900;color:#dc2626;">${resteAPayer.toFixed(2)} MAD</span>
      </div>
    ` : totalPaid > 0 ? `
      <div style="margin-top:4px;padding:4px;background:#f0fdf4;border:2px solid #16a34a;border-radius:3px;display:flex;justify-content:space-between;align-items:center;">
        <span style="font-size:9px;font-weight:700;color:#166534;">SOLDE</span>
        <span style="font-size:11px;font-weight:800;color:#16a34a;">PAYÉ EN TOTALITÉ ✓</span>
      </div>
    ` : '';
    
    return paymentsHTML + totalPaidHTML + resteHTML;
  };

  const generateDamagesList = () => {
    if (dommages.length === 0) return '<div style="color:#9ca3af;text-align:center;padding:8px;font-size:9px;">Aucun dommage signalé</div>';
    
    return `
      <div style="margin-bottom:8px;">
        <div style="font-size:9px;font-weight:700;color:#dc2626;margin-bottom:4px;border-bottom:1px solid #fecaca;padding-bottom:2px;">
          DOMMAGES CONSTATÉS (${dommages.length})
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          ${dommages.map(d => {
            const part = carPartsData?.find(p => p.id === d.id || p.name === d.emplacement);
            return `
              <div style="padding:4px 8px;border-radius:4px;font-size:8px;font-weight:600;border:1px solid #dc2626;background:#fef2f2;color:#dc2626;">
                ${part ? part.name : d.emplacement}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  };

  const generateReservoirSmall = () => {
    if (!hasFuelData) return '';
    
    return `
      <div style="margin-top:6px;padding:4px;background:#f0fdf4;border:1px solid #86efac;border-radius:4px;">
        <div style="font-size:8px;font-weight:700;color:#166534;margin-bottom:3px;text-align:center;border-bottom:1px solid #86efac;padding-bottom:2px;">
          ÉTAT RÉSERVOIR
        </div>
        <div style="display:flex;justify-content:space-around;align-items:center;">
          ${hasValue(departNiveau) ? `
          <div style="text-align:center;">
            <div style="font-size:7px;color:#6b7280;margin-bottom:1px;">DÉPART</div>
            ${generateSmallFuelGauge(departNiveau)}
          </div>
          ` : ''}
          ${hasValue(retourNiveau) ? `
          <div style="text-align:center;">
            <div style="font-size:7px;color:#6b7280;margin-bottom:1px;">RETOUR</div>
            ${generateSmallFuelGauge(retourNiveau)}
          </div>
          ` : ''}
        </div>
      </div>
    `;
  };

  const hasInsurance = hasValue(insuranceData.company) || hasValue(insuranceData.policyNumber) || 
                       hasValue(insuranceData.compagnie) || hasValue(insuranceData.numeroContrat);
  
  const generateAssuranceCompact = () => {
    if (!hasInsurance) return '';
    
    return `
      <div style="margin-top:6px;padding:4px;background:#eff6ff;border:1px solid #3b82f6;border-radius:4px;">
        <div style="font-size:8px;font-weight:700;color:#1e40af;margin-bottom:3px;text-align:center;border-bottom:1px solid #bfdbfe;padding-bottom:2px;">
          ASSURANCE
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:3px;font-size:7px;">
          ${hasValue(insuranceData.company) || hasValue(insuranceData.compagnie) ? `
          <div style="display:flex;flex-direction:column;">
            <span style="color:#6b7280;font-size:6px;">Compagnie</span>
            <span style="color:#1e40af;font-weight:600;">${insuranceData.company || insuranceData.compagnie}</span>
          </div>
          ` : ''}
          ${hasValue(insuranceData.policyNumber) || hasValue(insuranceData.numeroContrat) || hasValue(insuranceData.numero) ? `
          <div style="display:flex;flex-direction:column;">
            <span style="color:#6b7280;font-size:6px;">N° Police</span>
            <span style="color:#1e40af;font-weight:600;">${insuranceData.policyNumber || insuranceData.numeroContrat || insuranceData.numero}</span>
          </div>
          ` : ''}
          ${hasValue(insuranceData.startDate) || hasValue(insuranceData.dateDebut) ? `
          <div style="display:flex;flex-direction:column;">
            <span style="color:#6b7280;font-size:6px;">Du</span>
            <span style="color:#1e40af;font-weight:600;">${formatDate(insuranceData.startDate || insuranceData.dateDebut)}</span>
          </div>
          ` : ''}
          ${hasValue(insuranceData.endDate) || hasValue(insuranceData.dateFin) ? `
          <div style="display:flex;flex-direction:column;">
            <span style="color:#6b7280;font-size:6px;">Au</span>
            <span style="color:#1e40af;font-weight:600;">${formatDate(insuranceData.endDate || insuranceData.dateFin)}</span>
          </div>
          ` : ''}
        </div>
      </div>
    `;
  };

  const secondDriver = contract.conducteur || {};
  const hasSecondDriver = hasValue(secondDriver.nom) || hasValue(secondDriver.prenom);
  
  const secondDriverDisplay = hasSecondDriver ? `
    <div class="section" style="margin-bottom:6px;">
      <div class="section-title" style="background:#8b5cf6 !important;">Deuxième Conducteur</div>
      <div class="section-body" style="padding:4px;">
        <div class="grid-2">
          <div>
            <div class="field-row">
              <span class="field-label">Nom:</span>
              <span class="field-value">${secondDriver.prenom || ''} ${secondDriver.nom || ''}</span>
            </div>
            ${hasValue(secondDriver.cin) ? `
            <div class="field-row">
              <span class="field-label">CIN:</span>
              <span class="field-value">${secondDriver.cin}</span>
            </div>
            ` : ''}
            ${hasValue(secondDriver.telephone) ? `
            <div class="field-row">
              <span class="field-label">Tél:</span>
              <span class="field-value">${secondDriver.telephone}</span>
            </div>
            ` : ''}
          </div>
          <div>
            ${hasValue(secondDriver.permis) || hasValue(secondDriver.numeroPermis) ? `
            <div class="field-row">
              <span class="field-label">N° Permis:</span>
              <span class="field-value">${secondDriver.permis || secondDriver.numeroPermis}</span>
            </div>
            ` : ''}
            ${hasValue(secondDriver.dateDelivre) || hasValue(secondDriver.dateDelivrancePermis) ? `
            <div class="field-row">
              <span class="field-label">Délivré:</span>
              <span class="field-value">${formatDate(secondDriver.dateDelivre || secondDriver.dateDelivrancePermis)}</span>
            </div>
            ` : ''}
            ${hasValue(secondDriver.dateExpirationPermis) ? `
            <div class="field-row">
              <span class="field-label">Expire:</span>
              <span class="field-value">${formatDate(secondDriver.dateExpirationPermis)}</span>
            </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  ` : '';

  const costRows = [];
  if (rentalCost > 0) {
    costRows.push(`<tr><td>Location (${days}j × ${prixVoiture.toFixed(2)} MAD)</td><td>${rentalCost.toFixed(2)} MAD</td></tr>`);
  }
  if (deliveryCost > 0) {
    costRows.push(`<tr><td>Livraison</td><td>${deliveryCost.toFixed(2)} MAD</td></tr>`);
  }
  if (dropOffCost > 0) {
    costRows.push(`<tr><td>Dépose</td><td>${dropOffCost.toFixed(2)} MAD</td></tr>`);
  }
  if (insuranceCost > 0) {
    costRows.push(`<tr><td>Assurance location</td><td>${insuranceCost.toFixed(2)} MAD</td></tr>`);
  }
  if (babySeatCost > 0) {
    costRows.push(`<tr><td>Siège bébé</td><td>${babySeatCost.toFixed(2)} MAD</td></tr>`);
  }
  if (surveillanceCost > 0) {
    costRows.push(`<tr><td>Surveillance</td><td>${surveillanceCost.toFixed(2)} MAD</td></tr>`);
  }
  if (autresFrais > 0) {
    costRows.push(`<tr><td>Autres frais</td><td>${autresFrais.toFixed(2)} MAD</td></tr>`);
  }

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Contrat ${contract.contractNumber || ''}</title>
    <style>
        @page { size: A4; margin: 0; }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Helvetica Neue', Arial, sans-serif; 
            font-size: 8px; 
            line-height: 1.1; 
            color: #374151;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .a4-container {
            width: 210mm;
            height: 297mm;
            padding: 8mm;
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
            padding: 6px;
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 6px;
            border-radius: 3px;
            border: 1px solid #475569;
        }
        .two-cols {
            display: flex;
            gap: 6px;
            margin-bottom: 4px;
        }
        .col {
            flex: 1;
        }
        .section {
            border: 1px solid #9ca3af;
            margin-bottom: 3px;
            page-break-inside: avoid;
            border-radius: 2px;
            overflow: hidden;
            background: white;
        }
        .section-title {
            background: #f59e0b !important;
            color: white !important;
            padding: 2px 5px;
            font-weight: bold;
            font-size: 8px;
            border-bottom: 1px solid #9ca3af;
            text-transform: uppercase;
        }
        .section-body {
            padding: 4px;
        }
        .field-row {
            display: flex;
            margin-bottom: 1px;
            align-items: baseline;
        }
        .field-label {
            font-weight: 700;
            color: #4b5563;
            min-width: 70px;
            font-size: 7px;
            text-transform: uppercase;
        }
        .field-value {
            border-bottom: 1px dotted #9ca3af;
            flex: 1;
            padding-left: 2px;
            font-size: 8px;
            min-height: 10px;
            font-weight: 600;
            color: #1f2937;
        }
        .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px;
        }
        .vehicle-info-row {
            margin-bottom: 4px;
            padding: 3px;
            background: #f9fafb;
            border-radius: 3px;
            border: 1px solid #e5e7eb;
        }
        .vehicle-info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3px;
        }
        .vehicle-visual-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            align-items: start;
            min-height: 160px;
        }
        .damages-column {
            background: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 3px;
            padding: 4px;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .damages-header {
            font-size: 8px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 3px;
            text-align: center;
            padding-bottom: 2px;
            border-bottom: 1px solid #d1d5db;
            background: #e5e7eb;
            padding: 3px;
            border-radius: 2px;
        }
        .svg-column {
            background: #f9fafb;
            border: 1px solid #d1d5db;
            border-radius: 3px;
            padding: 4px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
        }
        .svg-header {
            font-size: 8px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 3px;
            text-transform: uppercase;
        }
        .costs-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8px;
        }
        .costs-table td {
            padding: 1px 3px;
            border-bottom: 1px solid #e5e7eb;
        }
        .costs-table td:first-child {
            color: #4b5563;
        }
        .costs-table td:last-child {
            text-align: right;
            font-weight: 700;
            color: #1f2937;
        }
        .total-row {
            background: #fbbf24 !important;
            font-weight: bold;
            font-size: 9px;
            border-top: 1px solid #9ca3af;
            border-bottom: 1px solid #9ca3af;
            color: #1f2937;
        }
        .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            padding-top: 6px;
            border-top: 1px solid #374151;
        }
        .signature-box {
            text-align: center;
            width: 45%;
        }
        .signature-line {
            border-top: 1px solid #374151;
            margin-top: 20px;
            padding-top: 2px;
            font-size: 7px;
            color: #1f2937;
            font-weight: 600;
        }
        .notice {
            background: #eff6ff;
            border: 1px solid #3b82f6;
            padding: 3px;
            font-size: 6px;
            margin-top: 4px;
            text-align: center;
            border-radius: 2px;
            color: #1e40af;
        }
        /* Conditions 3 columns layout */
        .conditions-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
        }
        .condition-section {
            border: 1px solid #d1d5db;
            border-radius: 3px;
            padding: 4px;
            background: #f9fafb;
        }
        .condition-section-title {
            font-size: 8px;
            font-weight: 700;
            color: #1f2937;
            text-transform: uppercase;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 2px;
            margin-bottom: 3px;
            text-align: center;
            background: #e5e7eb;
            padding: 2px;
            border-radius: 2px;
        }
        @media print {
            .a4-container { width: 100%; height: 100%; }
            body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="a4-container">
        <!-- Header -->
        <div class="header">
            CONTRAT DE LOCATION VÉHICULE - ${contract.contractNumber || 'N/A'}
        </div>

        <!-- Agence / Partenaire & Client -->
        <div class="two-cols">
            <div class="col">
                <div class="section">
                    <div class="section-title">Agence / Partenaire</div>
                    <div class="section-body">
                        <div class="field-row">
                            <span class="field-label">Nom:</span>
                            <span class="field-value">${partnerName}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Email:</span>
                            <span class="field-value">${enterpriseData.email || user?.email || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Téléphone:</span>
                            <span class="field-value">${enterpriseData.number || enterpriseData.telephone || user?.number || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Adresse:</span>
                            <span class="field-value">${enterpriseData.address || enterpriseData.city || ''}, ${enterpriseData.country || ''}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="section">
                    <div class="section-title">Client / Locataire</div>
                    <div class="section-body">
                        <div class="field-row">
                            <span class="field-label">Nom:</span>
                            <span class="field-value">${clientData.lastName || ''} ${clientData.firstName || ''}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Né(e) le:</span>
                            <span class="field-value">${formatDate(clientData.birthDate)}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Tél:</span>
                            <span class="field-value">${clientData.phone || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Adresse:</span>
                            <span class="field-value">${clientData.address || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Permis de Conduire -->
        <div class="section">
            <div class="section-title">Permis de Conduire</div>
            <div class="section-body">
                <div class="grid-2">
                    <div>
                        <div class="field-row">
                            <span class="field-label">N° Permis:</span>
                            <span class="field-value">${clientData.licenseNumber || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Délivré le:</span>
                            <span class="field-value">${formatDate(clientData.licenseIssueDate)}</span>
                        </div>
                    </div>
                    <div>
                        <div class="field-row">
                            <span class="field-label">CIN:</span>
                            <span class="field-value">${clientData.cin || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Passeport:</span>
                            <span class="field-value">${clientData.passport || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        ${secondDriverDisplay}

        <!-- Véhicule & État des lieux -->
        <div class="section">
            <div class="section-title">Véhicule Loué & État des Lieux</div>
            <div class="section-body">
                
                <!-- Vehicle Info -->
                <div class="vehicle-info-row">
                    <div class="vehicle-info-grid">
                        <div class="field-row">
                            <span class="field-label">Marque:</span>
                            <span class="field-value" style="font-size:9px;font-weight:bold;">${vehicleData.nomVehicule || vehicleData.name || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Immat:</span>
                            <span class="field-value">${vehicleData.numeroMatricule || vehicleData.matricule || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Type:</span>
                            <span class="field-value">${vehicleData.typeVehicule || vehicleData.type || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Carb:</span>
                            <span class="field-value">${vehicleData.typeCarburant || vehicleData.carburant || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Boîte:</span>
                            <span class="field-value">${vehicleData.boiteVitesse || vehicleData.boite || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Équipements:</span>
                            <span class="field-value" style="display:flex;gap:6px;align-items:center;border-bottom:none;padding-left:0;">
                                ${generateEquipmentCheckboxes(equipements)}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Visual Grid -->
                <div class="vehicle-visual-grid">
                    <div class="damages-column">
                        <div class="damages-header">
                            PIÈCES ENDOMMAGÉES (${dommages.length})
                        </div>
                        <div style="flex:1;">
                            ${generateDamagesList()}
                        </div>
                        ${generateReservoirSmall()}
                    </div>
                    <div class="svg-column">
                        <div class="svg-header">Schéma du Véhicule</div>
                        ${generateCarSVG(dommages, carPartsData)}
                    </div>
                </div>
            </div>
        </div>

        <!-- Détails Location & Détails Financiers (grid) -->
        <div class="two-cols">
            <div class="col">
                <div class="section">
                    <div class="section-title">Détails Location</div>
                    <div class="section-body">
                        <div class="field-row">
                            <span class="field-label">Départ:</span>
                            <span class="field-value">${formatDateTime(contract.startDate)}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Retour:</span>
                            <span class="field-value">${formatDateTime(contract.endDate)}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Lieu dép:</span>
                            <span class="field-value">${contract.startLocation || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Lieu ret:</span>
                            <span class="field-value">${contract.endLocation || 'N/A'}</span>
                        </div>
                        <div class="field-row">
                            <span class="field-label">Durée:</span>
                            <span class="field-value">${days} jour(s)</span>
                        </div>
                        ${hasValue(contract.notes) ? `
                        <div style="margin-top:4px;padding:3px;background:#fefce8;border:1px solid #fde047;border-radius:3px;font-size:7px;">
                          <strong>Notes:</strong> ${contract.notes}
                        </div>
                        ` : ''}
                        ${generateAssuranceCompact()}
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="section">
                    <div class="section-title">Détails Financiers</div>
                    <div class="section-body">
                        <table class="costs-table">
                            ${costRows.join('')}
                            ${sommeDesFrais > 0 ? `
                            <tr style="background:#dbeafe;border-top:1px solid #3b82f6;">
                                <td><strong>SOMME DES FRAIS</strong></td>
                                <td><strong>${sommeDesFrais.toFixed(2)} MAD</strong></td>
                            </tr>
                            ` : ''}
                            ${tva > 0 ? `
                            <tr>
                                <td>TVA ${tvaRate > 0 ? `(${tvaRate}%)` : ''}</td>
                                <td>${tva.toFixed(2)} MAD</td>
                            </tr>
                            ` : ''}
                            <tr class="total-row">
                                <td>TOTAL À PAYER</td>
                                <td>${total.toFixed(2)} MAD</td>
                            </tr>
                            <tr style="font-weight:bold;color:#dc2626;">
                                <td>CAUTION</td>
                                <td>${deposit.toFixed(2)} MAD</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Paiements -->
        ${(paymentMethods.length > 0 || totalPaid > 0) ? `
        <div class="section">
            <div class="section-title" style="background:#10b981 !important;">Paiements</div>
            <div class="section-body">
                ${generatePaymentMethodsList()}
            </div>
        </div>
        ` : ''}

        <!-- Conditions Générales - 3 Sections with Checkboxes -->
        <div class="section">
            <div class="section-title">Conditions Générales</div>
            <div class="section-body">
                <div class="conditions-grid">
                    <!-- Section 1: Restitution & État -->
                    <div class="condition-section">
                        <div class="condition-section-title">Restitution & État</div>
                        ${generateConditionCheckbox('Rendre véhicule même état départ')}
                        ${generateConditionCheckbox('Dommages non déclarés = charge client')}
                        ${generateConditionCheckbox('Même niveau carburant au retour')}
                        ${generateConditionCheckbox('Perte clé/document = facturation')}
                        ${generateConditionCheckbox('Vérifier huile et eau régulièrement')}
                        ${generateConditionCheckbox('Réparation non autorisée interdite')}
                    </div>
                    
                    <!-- Section 2: Utilisation & Conduite -->
                    <div class="condition-section">
                        <div class="condition-section-title">Utilisation & Conduite</div>
                        ${generateConditionCheckbox('Carburant à charge client')}
                        ${generateConditionCheckbox('Interdiction de fumer')}
                        ${generateConditionCheckbox('Permis valide + ID obligatoires')}
                        ${generateConditionCheckbox('Respect Code route marocain')}
                        ${generateConditionCheckbox('Usage normal et légal uniquement')}
                        ${generateConditionCheckbox('Sous-location et prêt interdits')}
                    </div>
                    
                    <!-- Section 3: Assurance & Responsabilité -->
                    <div class="condition-section">
                        <div class="condition-section-title">Assurance & Responsabilité</div>
                        ${generateConditionCheckbox('Caution obligatoire restituée après vérif')}
                        ${generateConditionCheckbox('Client responsable amendes/infractions')}
                        ${generateConditionCheckbox('Pneus/jantes/vitres = charge client sauf assurance')}
                        ${generateConditionCheckbox('Sortie Maroc = autorisation écrite')}
                        ${generateConditionCheckbox('Accident = prévenir police + loueur immédiatement')}
                        ${generateConditionCheckbox('Pénalité retard selon tarifs loueur')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Signatures -->
        <div class="signatures">
            <div class="signature-box">
                <div style="font-weight:bold;font-size:9px;margin-bottom:1px;color:#1f2937;">LE LOCATAIRE</div>
                <div style="font-size:7px;color:#4b5563;">${clientData.firstName || ''} ${clientData.lastName || ''}</div>
                <div class="signature-line">Signature + Date</div>
            </div>
            <div class="signature-box">
                <div style="font-weight:bold;font-size:9px;margin-bottom:1px;color:#1f2937;">LE LOUEUR</div>
                <div style="font-size:7px;color:#4b5563;">${partnerName}</div>
                <div class="signature-line">Signature + Cachet</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="notice">
            ATTENTION: Le conducteur doit conserver ce contrat pendant toute la durée du prêt. Document contractuel à présenter sur réquisition des forces de l'ordre. | Contrat généré le ${new Date().toLocaleDateString('fr-FR')} - WegoRent System
        </div>
    </div>
</body>
</html>
  `;
};