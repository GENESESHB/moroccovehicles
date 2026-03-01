'use client';

import React, { useState, useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line,
  PieChart, Pie, ComposedChart
} from 'recharts';
import styles from './overview.module.css';
import { 
  EXAMPLE_STATS, BREAKDOWN_DATA, MONTHLY_COMPARISON_DATA, 
  VEHICLE_VARIATION_DATA, COLORS, Icons 
} from './constants';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

const FinanceCards = ({ stats }) => (
  <div className={styles.financeCardsGrid}>
    <div className={`${styles.financeCard} ${styles.blue}`}>
      <div className={styles.icon}><Icons.Money /></div>
      <div className={styles.data}>
        <span className={styles.label}>Revenu Total Annuel</span>
        <span className={styles.value}>{stats.totalYearRevenue.toLocaleString()} MAD</span>
        <span className={styles.subValue}>Moyenne: {stats.averageMonthlyRevenue.toLocaleString()} MAD/mois</span>
      </div>
    </div>
    <div className={`${styles.financeCard} ${styles.green}`}>
      <div className={styles.icon}><Icons.Calendar /></div>
      <div className={styles.data}>
        <span className={styles.label}>Jours de Location</span>
        <span className={styles.value}>{stats.totalYearRentalDays.toLocaleString()} Jours</span>
        <span className={styles.subValue}>Moyenne: {Math.round(stats.averageMonthlyRentalDays)} jours/mois</span>
      </div>
    </div>
    <div className={`${styles.financeCard} ${styles.purple}`}>
      <div className={styles.icon}><Icons.Car /></div>
      <div className={styles.data}>
        <span className={styles.label}>Véhicules Actifs</span>
        <span className={styles.value}>156</span>
        <span className={styles.subValue}>45 Luxury • 111 Regular</span>
      </div>
    </div>
    <div className={`${styles.financeCard} ${styles.orange}`}>
      <div className={styles.icon}><Icons.Speedometer /></div>
      <div className={styles.data}>
        <span className={styles.label}>Top Performeur</span>
        <span className={styles.value}>{stats.topVehicleOfYear.totalRentalDays} Jours</span>
        <span className={styles.subValue}>{stats.topVehicleOfYear.vehicleName}</span>
      </div>
    </div>
  </div>
);

const RevenuePieChart = ({ data }) => (
  <div className={styles.breakdownCard}>
    <h5><Icons.Money /> Répartition des Revenus</h5>
    <div className={styles.breakdownChart}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={[
              { name: 'Luxury', value: data.luxury.totalRevenue },
              { name: 'Regular', value: data.regular.totalRevenue }
            ]}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
          >
            <Cell fill={COLORS.luxury[0]} />
            <Cell fill={COLORS.regular[0]} />
          </Pie>
          <Tooltip formatter={(value) => [`${value.toLocaleString()} MAD`, 'Revenu']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.breakdownStats}>
      <div className={styles.breakdownStat}>
        <span className={`${styles.statLabel} ${styles.luxury}`}>Luxury:</span>
        <span className={styles.statValue}>{data.luxury.totalRevenue.toLocaleString()} MAD</span>
        <span className={styles.statPercentage}>{data.luxury.revenuePercentage}%</span>
      </div>
      <div className={styles.breakdownStat}>
        <span className={`${styles.statLabel} ${styles.regular}`}>Regular:</span>
        <span className={styles.statValue}>{data.regular.totalRevenue.toLocaleString()} MAD</span>
        <span className={styles.statPercentage}>{data.regular.revenuePercentage}%</span>
      </div>
    </div>
  </div>
);

const DaysBarChart = ({ data }) => (
  <div className={styles.breakdownCard}>
    <h5><Icons.Calendar /> Jours de Location</h5>
    <div className={styles.breakdownChart}>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={[
            { name: 'Luxury', days: data.luxury.totalRentalDays },
            { name: 'Regular', days: data.regular.totalRentalDays }
          ]}
          layout="vertical"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={80} />
          <Tooltip formatter={(value) => [`${value} jours`, 'Jours']} />
          <Bar dataKey="days" radius={[0, 4, 4, 0]}>
            <Cell fill={COLORS.luxury[0]} />
            <Cell fill={COLORS.regular[0]} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.breakdownStats}>
      <div className={styles.breakdownStat}>
        <span className={`${styles.statLabel} ${styles.luxury}`}>Luxury:</span>
        <span className={styles.statValue}>{data.luxury.totalRentalDays} jours</span>
        <span className={styles.statPercentage}>{data.luxury.daysPercentage}%</span>
      </div>
      <div className={styles.breakdownStat}>
        <span className={`${styles.statLabel} ${styles.regular}`}>Regular:</span>
        <span className={styles.statValue}>{data.regular.totalRentalDays} jours</span>
        <span className={styles.statPercentage}>{data.regular.daysPercentage}%</span>
      </div>
    </div>
  </div>
);

const MonthlyComposedChart = ({ data }) => (
  <div className={styles.comparisonChartCard}>
    <h5>Jours de Location par Mois (Luxury vs Regular)</h5>
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="luxuryDays" name="Jours Luxury" fill={COLORS.luxury[0]} opacity={0.8} />
        <Bar dataKey="regularDays" name="Jours Regular" fill={COLORS.regular[0]} opacity={0.8} />
        <Line type="monotone" dataKey="totalDays" name="Total Jours" stroke={COLORS.secondary} strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

const RevenueAreaChart = ({ data }) => (
  <div className={styles.comparisonChartCard}>
    <h5>Évolution des Revenus Mensuels</h5>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorLuxury" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.luxury[0]} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.luxury[0]} stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorRegular" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.regular[0]} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.regular[0]} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthName" />
        <YAxis />
        <Tooltip formatter={(value) => [`${value.toLocaleString()} MAD`, 'Revenu']} />
        <Legend />
        <Area type="monotone" dataKey="luxuryRevenue" name="Revenu Luxury" stroke={COLORS.luxury[0]} fillOpacity={1} fill="url(#colorLuxury)" />
        <Area type="monotone" dataKey="regularRevenue" name="Revenu Regular" stroke={COLORS.regular[0]} fillOpacity={1} fill="url(#colorRegular)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const VehicleVariationChart = ({ vehicle }) => (
  <div className={styles.variationChartCard}>
    <h5>Variations Mensuelles - {vehicle.vehicleName}</h5>
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={vehicle.monthlyVariation}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthName" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar 
          yAxisId="left"
          dataKey="rentalDays" 
          name="Jours de Location"
          fill={vehicle.vehicleType === 'smart' ? COLORS.luxury[0] : COLORS.regular[0]}
          opacity={0.8}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="revenue" 
          name="Revenu (MAD)"
          stroke={vehicle.vehicleType === 'smart' ? COLORS.luxury[1] : COLORS.regular[1]}
          strokeWidth={2}
        />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

const GlobalTrendChart = ({ data }) => (
  <div className={styles.chartBox}>
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="monthName" tick={{fontSize: 12}} />
        <YAxis label={{ value: 'Jours', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="totalRentalDays" 
          name="Jours de Location"
          stroke={COLORS.accent} 
          fillOpacity={1} 
          fill="url(#colorDays)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

const structuredData = {
  '@context': 'https://schema.org ',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'MoroccoVehicles – Système de Gestion de Flotte',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'MAD' },
      featureList: [
        'Architecture React 18 avec Hooks (useState, useEffect, useMemo)',
        'Visualisations interactives Recharts (AreaChart, PieChart, ComposedChart)',
        'Context API pour authentification JWT',
        'API RESTful avec axios et interceptors',
        'Filtrage dynamique Luxury vs Regular',
        'Calculs métriques avancés (growth rate, consistency score)',
        'Responsive design avec CSS Modules'
      ],
    },
    {
      '@type': 'TechArticle',
      name: 'Architecture des Composants Vue d\'ensemble',
      description: 'Explication détaillée de la structure logicielle: fetchYearlyStats, fetchVehicleVariationData, calculateBreakdown',
      dependencies: 'React, Next.js, Recharts, Axios, JWT',
    }
  ],
};

export default function OverviewClient() {
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLE_VARIATION_DATA[0].vehicleId);
  const [selectedVehicleType, setSelectedVehicleType] = useState('all');
  
  const selectedVehicle = useMemo(() => 
    VEHICLE_VARIATION_DATA.find(v => v.vehicleId === selectedVehicleId),
    [selectedVehicleId]
  );

  const filteredVehicles = useMemo(() => 
    selectedVehicleType === 'all' 
      ? VEHICLE_VARIATION_DATA 
      : VEHICLE_VARIATION_DATA.filter(v => 
          selectedVehicleType === 'luxury' ? v.vehicleType === 'smart' : v.vehicleType === 'regular'
        ),
    [selectedVehicleType]
  );

  return (
    <>
      
      
      <div className={styles.landingPage}>
        
        <section className={styles.heroSection}>
          <div className={styles.heroOverlay}>
            <div className={styles.containerContent}>
              <div className={styles.heroContent}>
                <span className={styles.badge}>
                  <Icons.Dashboard /> Tableau de Bord Analytique
                </span>
                <h1>Vue d'ensemble de la Flotte</h1>
                <p className={styles.heroSubtitle}>
                  Analyse complète des performances de votre flotte de 156 véhicules. 
                  Visualisez les revenus, les jours de location et les tendances mensuelles 
                  avec des graphiques interactifs en temps réel.
                </p>
                <div className={styles.heroCta}>
                  <button type="button" className={`${styles.btn} ${styles.btnPrimary}`}>
                    <Icons.Chart /> Voir les Statistiques
                  </button>
                  <button type="button" className={`${styles.btn} ${styles.btnOutline}`}>
                    <Icons.Database /> Exporter les Données
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.moduleSection} ${styles.bgLight}`}>
          <div className={styles.containerContent}>
            <div className={styles.moduleGrid}>
              <div className={styles.moduleContent}>
                <div className={styles.moduleHeader}>
                  <div className={styles.moduleIcon} style={{ background: '#36c275' }}>
                    <Icons.TrendingUp />
                  </div>
                  <h2>Performance Globale</h2>
                </div>
                
                <p>
                  Suivez les indicateurs clés de performance de votre flotte en temps réel. 
                  Accédez aux revenus totaux, aux jours de location et aux véhicules les plus performants 
                  pour optimiser votre gestion opérationnelle.
                </p>

                <div className={styles.detailedStats}>
                  <h4>Statistiques Annuelles</h4>
                  <div className={styles.statsRow}>
                    <div className={styles.statDetail}>
                      <span className={styles.statLabel}>Revenu Total</span>
                      <span className={styles.statValueLarge}>2,940,000 MAD</span>
                      <span className={`${styles.statTrend} ${styles.positive}`}>
                        <Icons.ArrowUp /> +12.5% vs 2024
                      </span>
                    </div>
                    <div className={styles.statDetail}>
                      <span className={styles.statLabel}>Jours de Location</span>
                      <span className={styles.statValueLarge}>4,380 Jours</span>
                      <span className={styles.statContext}>Moyenne de 365 jours/mois</span>
                    </div>
                  </div>
                  <div className={styles.statsRow}>
                    <div className={styles.statDetail}>
                      <span className={styles.statLabel}>Contrats Actifs</span>
                      <span className={styles.statValueLarge}>3,739</span>
                      <span className={styles.statContext}>Sur l'ensemble de la flotte</span>
                    </div>
                    <div className={styles.statDetail}>
                      <span className={styles.statLabel}>Taux d'Occupation</span>
                      <span className={styles.statValueLarge}>87.3%</span>
                      <span className={`${styles.statTrend} ${styles.positive}`}>
                        <Icons.ArrowUp /> +5.2% ce mois
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.moduleStats}>
                  <div className={styles.moduleStat}>
                    <span className={styles.statValue}>156</span>
                    <span className={styles.statLabel}>Véhicules Total</span>
                  </div>
                  <div className={styles.moduleStat}>
                    <span className={styles.statValue}>45</span>
                    <span className={styles.statLabel}>Luxury</span>
                  </div>
                  <div className={styles.moduleStat}>
                    <span className={styles.statValue}>111</span>
                    <span className={styles.statLabel}>Regular</span>
                  </div>
                </div>
              </div>

              <div className={styles.moduleChartContainer}>
                <div className={styles.liveDemoBadge}>
                  <span className={styles.pulse}></span>
                  Données en Temps Réel
                </div>
                <FinanceCards stats={EXAMPLE_STATS} />
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
          <div className={styles.containerContent}>
            <div className={styles.sectionHeader}>
              <h2><Icons.ChartPie /> Analyse Comparative: Luxury vs Regular</h2>
              <p>
                Comparez les performances entre les véhicules de luxe et standard. 
                Identifiez les segments les plus rentables et optimisez votre stratégie de tarification.
              </p>
            </div>

            <div className={styles.comparisonGrid}>
              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader} style={{ background: COLORS.luxury[0] }}>
                  <Icons.Robot />
                  <h3>Segment Luxury</h3>
                  <span className={styles.vehicleCount}>{BREAKDOWN_DATA.luxury.vehicleCount} véhicules</span>
                </div>
                <div className={styles.comparisonBody}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Revenu Total</span>
                    <span className={`${styles.metricValue} ${styles.highlight}`}>{BREAKDOWN_DATA.luxury.totalRevenue.toLocaleString()} MAD</span>
                    <span className={styles.metricPercent}>{BREAKDOWN_DATA.luxury.revenuePercentage}%</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Jours de Location</span>
                    <span className={styles.metricValue}>{BREAKDOWN_DATA.luxury.totalRentalDays} jours</span>
                    <span className={styles.metricPercent}>{BREAKDOWN_DATA.luxury.daysPercentage}%</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Revenu Moyen/Jour</span>
                    <span className={`${styles.metricValue} ${styles.highlight}`}>1,007 MAD</span>
                    <span className={`${styles.metricTrend} ${styles.positive}`}>+91% vs Regular</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Contrats Signés</span>
                    <span className={styles.metricValue}>{BREAKDOWN_DATA.luxury.totalContracts}</span>
                    <span className={styles.metricContext}>23.8% du total</span>
                  </div>
                </div>
              </div>

              <div className={styles.comparisonCard}>
                <div className={styles.comparisonHeader} style={{ background: COLORS.regular[0] }}>
                  <Icons.Car />
                  <h3>Segment Regular</h3>
                  <span className={styles.vehicleCount}>{BREAKDOWN_DATA.regular.vehicleCount} véhicules</span>
                </div>
                <div className={styles.comparisonBody}>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Revenu Total</span>
                    <span className={styles.metricValue}>{BREAKDOWN_DATA.regular.totalRevenue.toLocaleString()} MAD</span>
                    <span className={styles.metricPercent}>{BREAKDOWN_DATA.regular.revenuePercentage}%</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Jours de Location</span>
                    <span className={styles.metricValue}>{BREAKDOWN_DATA.regular.totalRentalDays} jours</span>
                    <span className={styles.metricPercent}>{BREAKDOWN_DATA.regular.daysPercentage}%</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Revenu Moyen/Jour</span>
                    <span className={styles.metricValue}>527 MAD</span>
                    <span className={styles.metricTrend}>Standard</span>
                  </div>
                  <div className={styles.metricRow}>
                    <span className={styles.metricName}>Contrats Signés</span>
                    <span className={styles.metricValue}>{BREAKDOWN_DATA.regular.totalContracts}</span>
                    <span className={styles.metricContext}>76.2% du total</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.insightBox}>
              <h4><Icons.Info /> Insight Clé</h4>
              <p>
                Les véhicules Luxury représentent seulement 29% de la flotte mais génèrent 45% du revenu total 
                avec un rendement par jour 91% supérieur. Cependant, les véhicules Regular assurent 
                une occupation plus constante tout au long de l'année.
              </p>
            </div>

            <div className={styles.breakdownGrid}>
              <RevenuePieChart data={BREAKDOWN_DATA} />
              <DaysBarChart data={BREAKDOWN_DATA} />
              
              <div className={styles.breakdownCard}>
                <h5><Icons.Zap /> Efficacité Opérationnelle</h5>
                <div className={styles.vehicleCountGrid}>
                  <div className={`${styles.vehicleCountItem} ${styles.luxury}`}>
                    <div className={styles.countIcon}><Icons.Robot /></div>
                    <div className={styles.countData}>
                      <div className={styles.countValue}>{BREAKDOWN_DATA.luxury.vehicleCount}</div>
                      <div className={styles.countLabel}>Véhicules Luxury</div>
                      <div className={styles.countSub}>Rendement élevé</div>
                    </div>
                  </div>
                  <div className={`${styles.vehicleCountItem} ${styles.regular}`}>
                    <div className={styles.countIcon}><Icons.Car /></div>
                    <div className={styles.countData}>
                      <div className={styles.countValue}>{BREAKDOWN_DATA.regular.vehicleCount}</div>
                      <div className={styles.countLabel}>Véhicules Regular</div>
                      <div className={styles.countSub}>Volume important</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.moduleSection} ${styles.bgLight}`}>
          <div className={styles.containerContent}>
            <div className={styles.sectionHeader}>
              <h2><Icons.ChartLine /> Évolution Mensuelle Détaillée</h2>
              <p>
                Analysez les tendances mensuelles pour identifier les périodes de forte demande 
                et ajuster votre stratégie de pricing et de disponibilité.
              </p>
            </div>

            <div className={styles.monthlyGrid}>
              <div className={styles.monthlyCard}>
                <h5>Janvier - Mars</h5>
                <div className={styles.monthlyStats}>
                  <div className={styles.monthStat}>
                    <span className={styles.monthLabel}>Revenu Total</span>
                    <span className={styles.monthValue}>745,500 MAD</span>
                  </div>
                  <div className={styles.monthBar}>
                    <div className={styles.barSegment} style={{ width: '33%', background: COLORS.luxury[0] }}></div>
                    <div className={styles.barSegment} style={{ width: '67%', background: COLORS.regular[0] }}></div>
                  </div>
                  <div className={styles.monthLegend}>
                    <span style={{ color: COLORS.luxury[0] }}>Luxury 33%</span>
                    <span style={{ color: COLORS.regular[0] }}>Regular 67%</span>
                  </div>
                </div>
              </div>

              <div className={styles.monthlyCard}>
                <h5>Avril - Juin</h5>
                <div className={styles.monthlyStats}>
                  <div className={styles.monthStat}>
                    <span className={styles.monthLabel}>Revenu Total</span>
                    <span className={styles.monthValue}>863,000 MAD</span>
                  </div>
                  <div className={styles.monthBar}>
                    <div className={styles.barSegment} style={{ width: '35%', background: COLORS.luxury[0] }}></div>
                    <div className={styles.barSegment} style={{ width: '65%', background: COLORS.regular[0] }}></div>
                  </div>
                  <div className={styles.monthLegend}>
                    <span style={{ color: COLORS.luxury[0] }}>Luxury 35%</span>
                    <span style={{ color: COLORS.regular[0] }}>Regular 65%</span>
                  </div>
                </div>
              </div>

              <div className={styles.monthlyCard}>
                <span className={styles.projectionBadge}>Peak Season</span>
                <h5>Juillet - Septembre</h5>
                <div className={styles.monthlyStats}>
                  <div className={styles.monthStat}>
                    <span className={styles.monthLabel}>Revenu Total</span>
                    <span className={styles.monthValue}>975,000 MAD</span>
                  </div>
                  <div className={styles.monthBar}>
                    <div className={styles.barSegment} style={{ width: '38%', background: COLORS.luxury[0] }}></div>
                    <div className={styles.barSegment} style={{ width: '62%', background: COLORS.regular[0] }}></div>
                  </div>
                  <div className={styles.monthLegend}>
                    <span style={{ color: COLORS.luxury[0] }}>Luxury 38%</span>
                    <span style={{ color: COLORS.regular[0] }}>Regular 62%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.comparisonTabs}>
              {['all', 'luxury', 'regular'].map(type => (
                <button 
                  key={type}
                  className={`${styles.tabBtn} ${selectedVehicleType === type ? styles.active : ''}`}
                  onClick={() => setSelectedVehicleType(type)}
                >
                  {type === 'all' ? 'Vue Globale' : type === 'luxury' ? 'Segment Luxury' : 'Segment Regular'}
                </button>
              ))}
            </div>

            <div className={styles.comparisonCharts}>
              <MonthlyComposedChart data={MONTHLY_COMPARISON_DATA} />
              <RevenueAreaChart data={MONTHLY_COMPARISON_DATA} />
            </div>

            <div className={styles.chartFeatures}>
              <h4>Fonctionnalités des Graphiques</h4>
              <ul className={styles.featureList}>
                <li><Icons.Check /> <strong>ComposedChart</strong>: Combinaison Barres et Lignes pour analyse multi-dimensions</li>
                <li><Icons.Check /> <strong>AreaChart</strong>: Visualisation fluide avec dégradés dynamiques</li>
                <li><Icons.Check /> <strong>Tooltip Interactif</strong>: Données détaillées au survol de la souris</li>
                <li><Icons.Check /> <strong>ResponsiveContainer</strong>: Adaptation automatique à tous les écrans</li>
                <li><Icons.Check /> <strong>Légende Interactive</strong>: Affichage/Masquage des séries de données</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={`${styles.moduleSection} ${styles.bgWhite}`}>
          <div className={styles.containerContent}>
            <div className={styles.sectionHeader}>
              <h2><Icons.Chart /> Analyse Individuelle des Véhicules</h2>
              <p>
                Examinez les performances de chaque véhicule avec des métriques avancées : 
                taux de croissance, score de régularité et revenus mensuels détaillés.
              </p>
            </div>

            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <h5>Taux de Croissance</h5>
                <p>Mesure de l'évolution entre le premier et dernier mois</p>
                <span className={styles.example}>Ex: Mercedes Classe E +23.5%</span>
              </div>
              <div className={styles.metricCard}>
                <h5>Score de Régularité</h5>
                <p>Pourcentage de mois avec activité de location</p>
                <span className={styles.example}>Ex: Dacia Logan 83.3% (10/12 mois)</span>
              </div>
              <div className={styles.metricCard}>
                <h5>Revenu Moyen Journalier</h5>
                <p>Ratio revenu total sur jours de location</p>
                <span className={styles.example}>Ex: BMW Série 5: 1,045 MAD/jour</span>
              </div>
              <div className={styles.metricCard}>
                <h5>Mois Peak</h5>
                <p>Identification automatique du meilleur mois de performance</p>
                <span className={styles.example}>Détection basée sur les données mensuelles</span>
              </div>
            </div>

            <div className={styles.vehicleSelectionSection}>
              <h4>Sélectionnez un véhicule pour l'analyse détaillée:</h4>
              <div className={styles.vehicleGrid}>
                {VEHICLE_VARIATION_DATA.map((vehicle) => {
                  const isSelected = vehicle.vehicleId === selectedVehicleId;
                  const isLuxury = vehicle.vehicleType === 'smart';
                  
                  return (
                    <div 
                      key={vehicle.vehicleId}
                      className={`${styles.vehicleSelectorCard} ${isSelected ? styles.selected : ''}`}
                      onClick={() => setSelectedVehicleId(vehicle.vehicleId)}
                      style={{
                        borderColor: isLuxury ? COLORS.luxury[0] : COLORS.regular[0],
                        boxShadow: isSelected ? `0 0 0 2px ${isLuxury ? COLORS.luxury[0] : COLORS.regular[0]}` : 'none'
                      }}
                    >
                      <div className={styles.vehicleSelectorHeader}>
                        <div 
                          className={styles.vehicleColorIndicator} 
                          style={{ backgroundColor: isLuxury ? COLORS.luxury[0] : COLORS.regular[0] }}
                        ></div>
                        <div className={`${styles.vehicleTypeBadge} ${isLuxury ? styles.luxury : styles.regular}`}>
                          {isLuxury ? <><Icons.Robot /> Luxury</> : <><Icons.Car /> Standard</>}
                        </div>
                      </div>
                      <div className={styles.vehicleSelectorBody}>
                        <h5>{vehicle.vehicleName}</h5>
                        <div className={styles.vehicleMetrics}>
                          <div className={styles.metric}>
                            <span className={styles.metricLabel}>Jours:</span>
                            <span className={styles.metricValue}>{vehicle.totalRentalDays}</span>
                          </div>
                          <div className={styles.metric}>
                            <span className={styles.metricLabel}>Croissance:</span>
                            <span className={`${styles.metricValue} ${vehicle.growthRate >= 0 ? styles.positive : styles.negative}`}>
                              {vehicle.growthRate}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {selectedVehicle && (
              <div className={styles.vehicleDetailAnalysis}>
                <div className={styles.analysisHeader}>
                  <h4>Analyse Détaillée: {selectedVehicle.vehicleName}</h4>
                  <div className={`${styles.vehicleTypeTag} ${selectedVehicle.vehicleType === 'smart' ? styles.luxury : styles.regular}`}>
                    {selectedVehicle.vehicleType === 'smart' ? 'Luxury' : 'Regular'}
                  </div>
                </div>

                <div className={styles.analysisGrid}>
                  <div className={styles.metricsCard}>
                    <h5>Performance Globale</h5>
                    <div className={styles.metricsGrid}>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>Total Jours</span>
                        <span className={styles.metricValueLarge}>{selectedVehicle.totalRentalDays}</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>Revenu Total</span>
                        <span className={styles.metricValueLarge}>{selectedVehicle.totalRevenue.toLocaleString()} MAD</span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>Taux de Croissance</span>
                        <span className={`${styles.metricValueLarge} ${selectedVehicle.growthRate >= 0 ? styles.positive : styles.negative}`}>
                          {selectedVehicle.growthRate >= 0 ? <Icons.ArrowUp /> : <Icons.ArrowDown />}
                          {selectedVehicle.growthRate}%
                        </span>
                      </div>
                      <div className={styles.metricItem}>
                        <span className={styles.metricLabel}>Régularité</span>
                        <span className={styles.metricValueLarge}>{selectedVehicle.consistencyScore}%</span>
                      </div>
                    </div>
                  </div>

                  <VehicleVariationChart vehicle={selectedVehicle} />
                </div>
              </div>
            )}
          </div>
        </section>

        <section className={`${styles.moduleSection} ${styles.bgLight}`}>
          <div className={styles.containerContent}>
            <div className={styles.sectionHeader}>
              <h2><Icons.ChartLine /> Tendance Annuelle Globale</h2>
              <p>
                Visualisation complète de l'activité sur 12 mois avec identification 
                des pics saisonniers et des périodes d'optimisation.
              </p>
            </div>

            <div className={styles.chartContainerFinance}>
              <div className={styles.chartHeader}>
                <h3>Évolution Mensuelle des Jours de Location</h3>
              </div>
              <GlobalTrendChart data={EXAMPLE_STATS.monthlyStats} />
            </div>

            <div className={styles.dataTable}>
              <h5>Données Mensuelles Détaillées</h5>
              <table>
                <thead>
                  <tr>
                    <th>Mois</th>
                    <th>Jours de Location</th>
                    <th>Revenu (MAD)</th>
                    <th>Revenu/Jour Moyen</th>
                    <th>Variation MoM</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLE_STATS.monthlyStats.map((month, index) => {
                    const prevMonth = index > 0 ? EXAMPLE_STATS.monthlyStats[index - 1] : null;
                    const variation = prevMonth 
                      ? ((month.totalRevenue - prevMonth.totalRevenue) / prevMonth.totalRevenue * 100).toFixed(1)
                      : 0;
                    
                    return (
                      <tr key={month.monthName}>
                        <td>{month.monthName}</td>
                        <td>{month.totalRentalDays}</td>
                        <td>{month.totalRevenue.toLocaleString()}</td>
                        <td>{Math.round(month.totalRevenue / month.totalRentalDays)}</td>
                        <td className={variation >= 0 ? styles.positive : styles.negative}>
                          {index === 0 ? '-' : `${variation > 0 ? '+' : ''}${variation}%`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={styles.whySection}>
          <div className={styles.containerContent}>
            <div className={styles.whyGrid}>
              <div className={styles.whyContent}>
                <h2>Pourquoi Choisir Notre Solution ?</h2>
                <p>
                  Une plateforme complète de gestion de flotte conçue pour les entreprises 
                  de location de véhicules au Maroc, avec des fonctionnalités avancées 
                  d'analyse et de reporting.
                </p>
                
                <div className={styles.advantageBlock}>
                  <h4><Icons.Zap /> Performance Optimale</h4>
                  <p>
                    Architecture React moderne avec rendu côté client pour des 
                    interactions fluides et une expérience utilisateur réactive.
                  </p>
                </div>

                <div className={styles.advantageBlock}>
                  <h4><Icons.Shield /> Sécurité Renforcée</h4>
                  <p>
                    Authentification JWT, intercepteurs Axios et gestion sécurisée 
                    des tokens pour protéger vos données sensibles.
                  </p>
                </div>

                <div className={styles.advantageBlock}>
                  <h4><Icons.Globe /> Accessibilité Totale</h4>
                  <p>
                    Design responsive adapté à tous les appareils : desktop, tablette 
                    et mobile pour une gestion de flotte en déplacement.
                  </p>
                </div>

                <ul className={styles.whyList}>
                  <li><Icons.Check /> Intégration API RESTful complète</li>
                  <li><Icons.Check /> Visualisations de données interactives</li>
                  <li><Icons.Check /> Filtrage dynamique multi-critères</li>
                  <li><Icons.Check /> Export des rapports en multiple formats</li>
                  <li><Icons.Check /> Support technique dédié 24/7</li>
                </ul>
              </div>
              
              <div className={styles.whyImage}>
                <div className={styles.techGrid}>
                  <div className={styles.techCard}>
                    <h5><Icons.Code /> React 18</h5>
                    <p>Hooks modernes et gestion d'état optimisée</p>
                  </div>
                  <div className={styles.techCard}>
                    <h5><Icons.Chart /> Recharts</h5>
                    <p>Bibliothèque de graphiques composables</p>
                  </div>
                  <div className={styles.techCard}>
                    <h5><Icons.Cpu /> Next.js 14</h5>
                    <p>App Router et optimisation SEO</p>
                  </div>
                  <div className={styles.techCard}>
                    <h5><Icons.Database /> PostgreSQL</h5>
                    <p>Base de données relationnelle robuste</p>
                  </div>
                  <div className={styles.techCard}>
                    <h5><Icons.Server /> Node.js</h5>
                    <p>Backend scalable et performant</p>
                  </div>
                  <div className={styles.techCard}>
                    <h5><Icons.Layers /> CSS Modules</h5>
                    <p>Styling scoped sans conflits</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className={styles.containerContent}>
            <div className={styles.ctaBox}>
              <h2>Optimisez Votre Flotte Dès Maintenant</h2>
              <p>
                Rejoignez les entreprises de location qui transforment leurs données 
                en décisions stratégiques grâce à notre tableau de bord analytique complet.
              </p>
              <div className={styles.ctaStats}>
                <span><Icons.Car /> 156 véhicules gérés</span>
                <span>•</span>
                <span><Icons.Calendar /> 12 mois d'historique</span>
                <span>•</span>
                <span><Icons.Chart /> 5 types de graphiques</span>
                <span>•</span>
                <span><Icons.Zap /> Filtrage temps réel</span>
              </div>
              <button type="button" className={`${styles.btn} ${styles.btnWhite}`}>
                <Icons.TrendingUp /> Démarrer l'Analyse
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}