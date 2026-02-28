'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie,
  ComposedChart
} from 'recharts';
import styles from './vehicles.module.css';
import {
  VEHICLE_STATS, VEHICLES_LIST, COLORS, Icons
} from './constants';
import { faqs } from './faqs';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

// Ce composant ne rend que les éléments interactifs qui remplacent les versions statiques
export default function VehiclesClient() {
  const [isMounted, setIsMounted] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeFeature, setActiveFeature] = useState('add');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const filteredVehicles = useMemo(() => {
    return VEHICLES_LIST.filter(vehicle => {
      const matchesSearch =
        vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || vehicle.status === filterStatus;
      const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [searchQuery, filterStatus, filterCategory]);

  // Ne rend rien pendant le SSR pour éviter l'hydratation mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.clientLayer}>
      {/* CONTROLS INTERACTIFS - S'affichent par-dessus le contenu statique */}
      
      {/* Barre de recherche et filtres */}
      <div className={styles.interactiveControls}>
        <div className={styles.searchBox}>
          <Icons.Search />
          <input
            type="text"
            placeholder="Rechercher par marque, modèle ou immatriculation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Tous les statuts</option>
            <option value="available">Disponible</option>
            <option value="rented">En Location</option>
            <option value="maintenance">Maintenance</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">Toutes les catégories</option>
            <option value="regular">Standard</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Icons.Grid />
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
          >
            <Icons.List />
          </button>
        </div>
      </div>

      {/* GRAPHIQUES INTERACTIFS - Remplacent les versions textuelles */}
      <div className={styles.chartsContainer}>
        <div className={styles.chartCard}>
          <h5><Icons.PieChart /> Répartition par Catégorie (Interactif)</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Citadine', value: VEHICLE_STATS.categories.citadine },
                  { name: 'Berline', value: VEHICLE_STATS.categories.berline },
                  { name: 'SUV', value: VEHICLE_STATS.categories.suv },
                  { name: 'Luxury', value: VEHICLE_STATS.categories.luxury },
                  { name: 'Van', value: VEHICLE_STATS.categories.van }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {COLORS.categories.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h5><Icons.Activity /> Évolution de la Flotte (Interactif)</h5>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={VEHICLE_STATS.monthlyAdditions}>
              <defs>
                <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#36c275" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#36c275" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRemoved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="added" name="Ajouts" stroke="#36c275" fillOpacity={1} fill="url(#colorAdded)" />
              <Area type="monotone" dataKey="removed" name="Retraits" stroke="#ef4444" fillOpacity={1} fill="url(#colorRemoved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className={styles.chartCard}>
          <h5><Icons.Wrench /> Coûts de Maintenance (Interactif)</h5>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={VEHICLE_STATS.maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="preventive" name="Préventif" fill="#36c275" />
              <Bar yAxisId="left" dataKey="corrective" name="Correctif" fill="#f59e0b" />
              <Line yAxisId="right" type="monotone" dataKey="cost" name="Coût (MAD)" stroke="#3b82f6" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LISTE FILTRÉE - Remplace la liste statique */}
      <div className={`${styles.vehiclesContainer} ${styles[viewMode]}`}>
        {filteredVehicles.length === 0 ? (
          <div className={styles.emptyState}>
            <Icons.Car />
            <h3>Aucun véhicule trouvé</h3>
            <p>Modifiez vos critères de recherche pour voir plus de résultats.</p>
          </div>
        ) : (
          filteredVehicles.map(vehicle => (
            <div key={vehicle.id} className={styles.vehicleCard}>
              {/* Contenu identique mais interactif */}
              <div className={styles.vehicleContent}>
                <div className={styles.vehicleHeader}>
                  <h4>{vehicle.brand} {vehicle.model}</h4>
                  <span className={styles.vehicleYear}>{vehicle.year}</span>
                </div>
                <div className={styles.vehicleMeta}>
                  <span className={styles.vehicleType}>{vehicle.type}</span>
                  <span className={styles.vehiclePlate}>{vehicle.licensePlate}</span>
                </div>
                <div className={styles.vehicleSpecs}>
                  <div className={styles.spec}>
                    <Icons.Gauge />
                    <span>{vehicle.mileage.toLocaleString()} km</span>
                  </div>
                  <div className={styles.spec}>
                    <Icons.Fuel />
                    <span>{vehicle.fuelType}</span>
                  </div>
                  <div className={styles.spec}>
                    <Icons.Users />
                    <span>{vehicle.seats} places</span>
                  </div>
                </div>
                <div className={styles.vehiclePricing}>
                  <div className={styles.price}>
                    <span className={styles.priceValue}>{vehicle.dailyRate} MAD</span>
                    <span className={styles.priceLabel}>/jour</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* FAQ INTERACTIVE - Remplace les details/summary statiques */}
      <div className={styles.faqInteractive}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faqItem ${openFaq === index ? 'active' : ''}`}
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className={styles.faqButton}
            >
              {faq.question}
              <ChevronDown
                size={20}
                style={{
                  transform: openFaq === index ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s'
                }}
              />
            </button>
            <div
              className={styles.faqAnswer}
              style={{
                maxHeight: openFaq === index ? '500px' : '0',
                opacity: openFaq === index ? 1 : 0,
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out'
              }}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>

      {/* FEATURES INTERACTIVES - Tabs */}
      <div className={styles.featureExplorer}>
        <div className={styles.featureNav}>
          {[
            { id: 'add', icon: Icons.Plus, label: 'Ajout Véhicule' },
            { id: 'edit', icon: Icons.Edit, label: 'Modification' },
            { id: 'damage', icon: Icons.Alert, label: 'Gestion Dommages' },
            { id: 'maintenance', icon: Icons.Wrench, label: 'Maintenance' },
            { id: 'documents', icon: Icons.FileText, label: 'Documents' },
            { id: 'api', icon: Icons.Code, label: 'Architecture API' }
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`${styles.featureNavBtn} ${activeFeature === id ? styles.active : ''}`}
              onClick={() => setActiveFeature(id)}
            >
              <Icon /> {label}
            </button>
          ))}
        </div>
        
        <div className={styles.featureContent}>
          {/* Contenu des features (simplifié pour l'exemple) */}
          <p>Feature sélectionnée: {activeFeature}</p>
        </div>
      </div>
    </div>
  );
}