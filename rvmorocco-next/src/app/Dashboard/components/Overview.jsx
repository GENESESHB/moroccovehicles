import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, LineChart, Line,
  PieChart, Pie, ComposedChart, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar, ScatterChart, ZAxis, Scatter
} from 'recharts';
// FontAwesome imports (assumes you have the library installed)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faCalendarAlt,
  faCar,
  faChartBar,
  faRobot,
  faChartPie,
  faChartLine,
  faTachometerAlt,
  faStar,
  faCheckCircle,
  faTimesCircle,
  faArrowUp,
  faArrowDown,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const Overview = () => {
  const { user } = useAuth();
  
  // State
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [vehicleVariationData, setVehicleVariationData] = useState(null);
  const [selectedVehicleType, setSelectedVehicleType] = useState('all'); // 'all', 'luxury', 'regular'
  const [breakdownData, setBreakdownData] = useState(null);
  const [monthlyComparison, setMonthlyComparison] = useState(null);

  // Color Palette
  const COLORS = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', 
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#C9CBCF', '#4BC0C0', '#FF6384', '#36A2EB'
  ];

  // Distinct Colors for Vehicle Types
  const LUXURY_COLORS = ['#00BCD4', '#0097A7', '#00838F', '#006064', '#4DD0E1'];
  const REGULAR_COLORS = ['#FF9800', '#F57C00', '#EF6C00', '#E65100', '#FFB74D'];

  // Generate Years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 3 + i);

  // --- API FUNCTIONS ---

  // 1. Fetch Combined Yearly Stats
  const fetchYearlyStats = async (year) => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      
      // Fetching 'all' to match backend logic
      const response = await api.get(`/stats/yearly`, {
        params: { year, type: 'all' } 
      });
      
      const yearlyData = response.data.data;
      setStats(yearlyData);
      
      await fetchVehicleVariationData(year);
      calculateBreakdown(year);
      
    } catch (err) {
      console.error('Error fetching yearly stats:', err);
      setError(err.response?.data?.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Detailed Vehicle Data (Loop through months)
  const fetchVehicleVariationData = async (year) => {
    try {
      const monthlyPromises = [];
      for (let month = 1; month <= 12; month++) {
        monthlyPromises.push(
          api.get('/stats/monthly', {
            params: { year, month, type: 'all' } // 'all' is required for backend
          })
        );
      }
      
      const monthlyResults = await Promise.all(monthlyPromises);
      
      const vehicleDataMap = {};
      const monthlyTotals = new Array(12).fill().map(() => ({
        totalDays: 0,
        totalRevenue: 0,
        totalContracts: 0,
        luxuryDays: 0,
        regularDays: 0,
        luxuryRevenue: 0,
        regularRevenue: 0
      }));
      
      monthlyResults.forEach((result, monthIndex) => {
        const monthData = result.data.data;
        if (monthData && monthData.vehicles) {
          monthData.vehicles.forEach(vehicle => {
            const vehicleId = vehicle.vehicleId ? vehicle.vehicleId.toString() : null;
            const vehicleType = vehicle.vehicleType || 'regular';
            
            if (!vehicleId) return;

            if (!vehicleDataMap[vehicleId]) {
              vehicleDataMap[vehicleId] = {
                vehicleId: vehicleId,
                vehicleName: vehicle.name,
                vehicleImage: vehicle.imagePath,
                vehicleType: vehicleType,
                monthlyData: new Array(12).fill(0),
                monthlyRevenue: new Array(12).fill(0),
                monthlyContracts: new Array(12).fill(0),
                vehicleDetails: vehicle
              };
            }
            
            // Update vehicle specific data
            vehicleDataMap[vehicleId].monthlyData[monthIndex] = vehicle.rentalDays || 0;
            vehicleDataMap[vehicleId].monthlyRevenue[monthIndex] = vehicle.revenue || 0;
            vehicleDataMap[vehicleId].monthlyContracts[monthIndex] = vehicle.contractCount || 0;
            
            // Update monthly totals
            monthlyTotals[monthIndex].totalDays += (vehicle.rentalDays || 0);
            monthlyTotals[monthIndex].totalRevenue += (vehicle.revenue || 0);
            monthlyTotals[monthIndex].totalContracts += (vehicle.contractCount || 0);
            
            if (vehicleType === 'smart') { // backend returns 'smart', we keep that for logic
              monthlyTotals[monthIndex].luxuryDays += (vehicle.rentalDays || 0);
              monthlyTotals[monthIndex].luxuryRevenue += (vehicle.revenue || 0);
            } else {
              monthlyTotals[monthIndex].regularDays += (vehicle.rentalDays || 0);
              monthlyTotals[monthIndex].regularRevenue += (vehicle.revenue || 0);
            }
          });
        }
      });
      
      // Create monthly comparison data for charts
      const monthlyComparisonData = monthlyTotals.map((month, index) => ({
        month: index + 1,
        monthName: new Date(year, index).toLocaleString('default', { month: 'short' }),
        totalDays: month.totalDays,
        totalRevenue: month.totalRevenue,
        luxuryDays: month.luxuryDays,
        regularDays: month.regularDays,
        luxuryRevenue: month.luxuryRevenue,
        regularRevenue: month.regularRevenue,
        luxuryPercentage: month.totalDays > 0 ? (month.luxuryDays / month.totalDays * 100).toFixed(1) : 0,
        regularPercentage: month.totalDays > 0 ? (month.regularDays / month.totalDays * 100).toFixed(1) : 0
      }));
      
      setMonthlyComparison(monthlyComparisonData);
      
      // Convert vehicle map to array and calculate advanced metrics
      const vehicleVariationArray = Object.values(vehicleDataMap).map(vehicle => {
        const monthlyVariation = vehicle.monthlyData.map((days, index) => ({
          month: index + 1,
          monthName: new Date(year, index).toLocaleString('default', { month: 'short' }),
          rentalDays: days,
          revenue: vehicle.monthlyRevenue[index],
          contracts: vehicle.monthlyContracts[index],
          vehicleType: vehicle.vehicleType
        }));
        
        const nonZeroMonths = vehicle.monthlyData.filter(days => days > 0);
        const growthRate = nonZeroMonths.length > 1 
          ? ((nonZeroMonths[nonZeroMonths.length - 1] - nonZeroMonths[0]) / nonZeroMonths[0] * 100).toFixed(1)
          : nonZeroMonths.length === 1 ? 100 : 0;
        
        const avgMonthlyDays = vehicle.monthlyData.reduce((a, b) => a + b, 0) / 
                              Math.max(nonZeroMonths.length, 1);
        
        const consistencyScore = (nonZeroMonths.length / 12 * 100).toFixed(1);
        
        // Luxury specific efficiency
        let efficiencyScore = 0;
        let utilizationRate = 0;
        if (vehicle.vehicleType === 'smart') { // backend type is 'smart'
          const totalDaysUsed = vehicle.monthlyData.reduce((a, b) => a + b, 0);
          const totalRevenue = vehicle.monthlyRevenue.reduce((a, b) => a + b, 0);
          
          const avgRevenuePerDay = totalDaysUsed > 0 ? totalRevenue / totalDaysUsed : 0;
          efficiencyScore = Math.min(avgRevenuePerDay / 100, 10).toFixed(1); 
          utilizationRate = (totalDaysUsed / 365 * 100).toFixed(1);
        }
        
        return {
          ...vehicle,
          monthlyVariation,
          totalRentalDays: vehicle.monthlyData.reduce((a, b) => a + b, 0),
          totalRevenue: vehicle.monthlyRevenue.reduce((a, b) => a + b, 0),
          totalContracts: vehicle.monthlyContracts.reduce((a, b) => a + b, 0),
          growthRate: parseFloat(growthRate) || 0,
          avgMonthlyDays: parseFloat(avgMonthlyDays.toFixed(1)),
          consistencyScore: parseFloat(consistencyScore),
          peakMonth: vehicle.monthlyData.indexOf(Math.max(...vehicle.monthlyData)) + 1,
          peakPerformance: Math.max(...vehicle.monthlyData),
          efficiencyScore: parseFloat(efficiencyScore),
          utilizationRate: parseFloat(utilizationRate)
        };
      });
      
      // Sort by total rental days
      vehicleVariationArray.sort((a, b) => b.totalRentalDays - a.totalRentalDays);
      
      setVehicleVariationData(vehicleVariationArray);
      
      if (vehicleVariationArray.length > 0) {
        setSelectedVehicleId(vehicleVariationArray[0].vehicleId);
      }
    } catch (err) {
      console.error('Error fetching vehicle variation data:', err);
      setVehicleVariationData([]);
    }
  };

  // 3. Calculate Breakdown (Luxury vs Regular)
  const calculateBreakdown = async (year) => {
    try {
      const [regularResponse, luxuryResponse] = await Promise.all([
        api.get('/stats/yearly', { params: { year, type: 'regular' } }),
        api.get('/stats/yearly', { params: { year, type: 'smart' } }) // backend type 'smart'
      ]);
      
      const regularData = regularResponse.data.data;
      const luxuryData = luxuryResponse.data.data;
      
      const breakdown = {
        regular: {
          totalRevenue: regularData.totalYearRevenue || 0,
          totalRentalDays: regularData.totalYearRentalDays || 0,
          totalContracts: regularData.totalYearContracts || 0,
          vehicleCount: regularData.summary?.regularVehicles || regularData.yearlyVehicleStats?.length || 0
        },
        luxury: {
          totalRevenue: luxuryData.totalYearRevenue || 0,
          totalRentalDays: luxuryData.totalYearRentalDays || 0,
          totalContracts: luxuryData.totalYearContracts || 0,
          vehicleCount: luxuryData.summary?.smartVehicles || luxuryData.yearlyVehicleStats?.length || 0
        }
      };
      
      const totalRevenue = breakdown.regular.totalRevenue + breakdown.luxury.totalRevenue;
      const totalDays = breakdown.regular.totalRentalDays + breakdown.luxury.totalRentalDays;
      
      breakdown.regular.revenuePercentage = totalRevenue > 0 ? 
        (breakdown.regular.totalRevenue / totalRevenue * 100).toFixed(1) : 0;
      breakdown.luxury.revenuePercentage = totalRevenue > 0 ? 
        (breakdown.luxury.totalRevenue / totalRevenue * 100).toFixed(1) : 0;
      
      breakdown.regular.daysPercentage = totalDays > 0 ? 
        (breakdown.regular.totalRentalDays / totalDays * 100).toFixed(1) : 0;
      breakdown.luxury.daysPercentage = totalDays > 0 ? 
        (breakdown.luxury.totalRentalDays / totalDays * 100).toFixed(1) : 0;
      
      setBreakdownData(breakdown);
    } catch (err) {
      console.error('Error calculating breakdown:', err);
    }
  };

  // Filter logic
  const filteredVehicles = vehicleVariationData ? 
    vehicleVariationData.filter(vehicle => {
      if (selectedVehicleType === 'all') return true;
      // Map 'luxury' frontend filter to backend 'smart' type
      const typeFilter = selectedVehicleType === 'luxury' ? 'smart' : selectedVehicleType;
      return vehicle.vehicleType === typeFilter;
    }) : [];

  useEffect(() => {
    if (user) fetchYearlyStats(selectedYear);
  }, [user, selectedYear]);

  // Data Helpers
  const selectedVehicle = selectedVehicleId && vehicleVariationData 
    ? vehicleVariationData.find(v => v.vehicleId === selectedVehicleId)
    : null;

  const calculateLuxuryMetrics = (vehicle) => {
    if (!vehicle || vehicle.vehicleType !== 'smart') return null;
    
    return {
      revenuePerDay: vehicle.totalRentalDays > 0 ? 
        (vehicle.totalRevenue / vehicle.totalRentalDays).toFixed(2) : 0,
      contractFrequency: vehicle.totalContracts > 0 ? 
        (vehicle.totalRentalDays / vehicle.totalContracts).toFixed(1) : 0,
      peakEfficiency: vehicle.peakPerformance > 0 ? 
        (vehicle.monthlyRevenue[vehicle.peakMonth - 1] / vehicle.peakPerformance).toFixed(2) : 0
    };
  };

  const luxuryMetrics = selectedVehicle ? calculateLuxuryMetrics(selectedVehicle) : null;

  // --- TOOLTIPS ---

  const VehicleVariationTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip-variation">
          <div className="tooltip-header">
            <h4>{label}</h4>
          </div>
          <div className="tooltip-body">
            {payload.map((entry, index) => (
              <div key={index} className="stat-row">
                <div className="stat-label">
                  <div className="color-dot" style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}:</span>
                </div>
                <div className="stat-value">
                  <strong>{entry.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const BreakdownTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip-breakdown">
          <div className="tooltip-header">
            <h4>{label}</h4>
          </div>
          <div className="tooltip-body">
            {payload.map((entry, index) => (
              <div key={index} className="stat-row">
                <div className="stat-label">
                  <div className="color-dot" style={{ backgroundColor: entry.color }}></div>
                  <span>{entry.name}:</span>
                </div>
                <div className="stat-value">
                  <strong>{entry.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // --- RENDER ---

  if (loading && !stats) {
    return (
      <div className="finance-tracker">
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Analyse financière annuelle...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="finance-tracker">
      {/* Header */}
      <div className="tracker-header-finance">
        <div>
          <h1><FontAwesomeIcon icon={faChartLine} /> Évaluation Financière Annuelle</h1>
          <p className="sub-text">Suivi complet des variations Luxury & Regular pour {selectedYear}</p>
        </div>
        <div className="year-selector-wrapper">
          <label>Année :</label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-select"
          >
            {years.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>

      {error ? (
        <div className="error-box">{error}</div>
      ) : stats ? (
        <>
          {/* Finance Cards */}
          <div className="finance-cards-grid">
            <div className="finance-card blue">
              <div className="icon"><FontAwesomeIcon icon={faMoneyBillWave} /></div>
              <div className="data">
                <span className="label">Revenu Total</span>
                <span className="value">{stats.totalYearRevenue?.toLocaleString()} MAD</span>
                <span className="sub-value">
                  Moyenne: {Math.round(stats.averageMonthlyRevenue || 0)} MAD/mois
                </span>
              </div>
            </div>
            <div className="finance-card green">
              <div className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></div>
              <div className="data">
                <span className="label">Jours de Location</span>
                <span className="value">{stats.totalYearRentalDays} Jours</span>
                <span className="sub-value">
                  Moyenne: {Math.round(stats.averageMonthlyRentalDays || 0)} jours/mois
                </span>
              </div>
            </div>
            <div className="finance-card purple">
              <div className="icon"><FontAwesomeIcon icon={faCar} /></div>
              <div className="data">
                <span className="label">Véhicules Actifs</span>
                <span className="value">
                  {stats.yearlyVehicleStats ? stats.yearlyVehicleStats.length : 0}
                </span>
                <span className="sub-value">
                  {vehicleVariationData ? `${vehicleVariationData.filter(v => v.vehicleType === 'smart').length} Luxury` : 'Calcul...'}
                </span>
              </div>
            </div>
            <div className="finance-card orange">
              <div className="icon"><FontAwesomeIcon icon={faChartBar} /></div>
              <div className="data">
                <span className="label">Top Performance</span>
                <span className="value">
                  {stats.topVehicleOfYear ? stats.topVehicleOfYear.totalRentalDays : 0} Jours
                </span>
                <span className="sub-value">
                  {stats.topVehicleOfYear ? stats.topVehicleOfYear.vehicleName : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Section */}
          {breakdownData && (
            <div className="breakdown-section">
              <div className="section-header">
                <h3><FontAwesomeIcon icon={faChartPie} /> Répartition Luxury vs Regular</h3>
                <p>Comparaison des performances globales</p>
              </div>
              
              <div className="breakdown-grid">
                {/* Revenue Pie Chart */}
                <div className="breakdown-card">
                  <h5><FontAwesomeIcon icon={faMoneyBillWave} /> Répartition des Revenus</h5>
                  <div className="breakdown-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Luxury', value: breakdownData.luxury.totalRevenue },
                            { name: 'Regular', value: breakdownData.regular.totalRevenue }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          <Cell fill={LUXURY_COLORS[0]} />
                          <Cell fill={REGULAR_COLORS[0]} />
                        </Pie>
                        <Tooltip formatter={(value) => [`${value.toLocaleString()} MAD`, 'Revenue']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="breakdown-stats">
                    <div className="breakdown-stat">
                      <span className="stat-label luxury">Luxury:</span>
                      <span className="stat-value">{breakdownData.luxury.totalRevenue.toLocaleString()} MAD</span>
                      <span className="stat-percentage">{breakdownData.luxury.revenuePercentage}%</span>
                    </div>
                    <div className="breakdown-stat">
                      <span className="stat-label regular">Regular:</span>
                      <span className="stat-value">{breakdownData.regular.totalRevenue.toLocaleString()} MAD</span>
                      <span className="stat-percentage">{breakdownData.regular.revenuePercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Days Bar Chart */}
                <div className="breakdown-card">
                  <h5><FontAwesomeIcon icon={faCalendarAlt} /> Jours de Location</h5>
                  <div className="breakdown-chart">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { name: 'Luxury', days: breakdownData.luxury.totalRentalDays },
                          { name: 'Regular', days: breakdownData.regular.totalRentalDays }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} jours`, 'Days']} />
                        <Bar dataKey="days" radius={[4, 4, 0, 0]}>
                          <Cell fill={LUXURY_COLORS[1]} />
                          <Cell fill={REGULAR_COLORS[1]} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="breakdown-stats">
                    <div className="breakdown-stat">
                      <span className="stat-label luxury">Luxury:</span>
                      <span className="stat-value">{breakdownData.luxury.totalRentalDays} jours</span>
                      <span className="stat-percentage">{breakdownData.luxury.daysPercentage}%</span>
                    </div>
                    <div className="breakdown-stat">
                      <span className="stat-label regular">Regular:</span>
                      <span className="stat-value">{breakdownData.regular.totalRentalDays} jours</span>
                      <span className="stat-percentage">{breakdownData.regular.daysPercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle Counts */}
                <div className="breakdown-card">
                  <h5><FontAwesomeIcon icon={faCar} /> Flotte & Contrats</h5>
                  <div className="vehicle-count-grid">
                    <div className="vehicle-count-item luxury">
                      <div className="count-icon"><FontAwesomeIcon icon={faRobot} /></div>
                      <div className="count-data">
                        <div className="count-value">{breakdownData.luxury.vehicleCount}</div>
                        <div className="count-label">Véhicules Luxury</div>
                      </div>
                    </div>
                    <div className="vehicle-count-item regular">
                      <div className="count-icon"><FontAwesomeIcon icon={faCar} /></div>
                      <div className="count-data">
                        <div className="count-value">{breakdownData.regular.vehicleCount}</div>
                        <div className="count-label">Véhicules Regular</div>
                      </div>
                    </div>
                  </div>
                  <div className="breakdown-summary">
                    <div className="summary-item">
                      <span className="summary-label">Total Contrats:</span>
                      <span className="summary-value">
                        {(breakdownData.luxury.totalContracts + breakdownData.regular.totalContracts).toLocaleString()}
                      </span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Luxury:</span>
                      <span className="summary-value luxury">{breakdownData.luxury.totalContracts}</span>
                    </div>
                    <div className="summary-item">
                      <span className="summary-label">Regular:</span>
                      <span className="summary-value regular">{breakdownData.regular.totalContracts}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Monthly Comparison Charts */}
          {monthlyComparison && (
            <div className="comparison-section">
              <div className="section-header">
                <h3><FontAwesomeIcon icon={faChartLine} /> Comparaison Mensuelle</h3>
                <p>Évolution mensuelle par type de véhicule</p>
              </div>
              
              <div className="comparison-tabs">
                {['all', 'luxury', 'regular'].map(type => (
                  <button 
                    key={type}
                    className={`tab-btn ${selectedVehicleType === type ? 'active' : ''}`}
                    onClick={() => setSelectedVehicleType(type)}
                  >
                    {type === 'all' ? 'Tous' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="comparison-charts">
                <div className="comparison-chart-card">
                  <h5>Jours de Location par Mois</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="monthName" />
                      <YAxis />
                      <Tooltip content={<BreakdownTooltip />} />
                      <Legend />
                      <Bar dataKey="luxuryDays" name="Jours Luxury" fill={LUXURY_COLORS[0]} opacity={0.8} />
                      <Bar dataKey="regularDays" name="Jours Regular" fill={REGULAR_COLORS[0]} opacity={0.8} />
                      <Line type="monotone" dataKey="totalDays" name="Total Jours" stroke="#2c3e50" strokeWidth={2} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="comparison-chart-card">
                  <h5>Revenus par Mois</h5>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyComparison}>
                      <defs>
                        <linearGradient id="colorLuxury" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={LUXURY_COLORS[0]} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={LUXURY_COLORS[0]} stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorRegular" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={REGULAR_COLORS[0]} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={REGULAR_COLORS[0]} stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="monthName" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value.toLocaleString()} MAD`, 'Revenue']} />
                      <Legend />
                      <Area type="monotone" dataKey="luxuryRevenue" name="Revenue Luxury" stroke={LUXURY_COLORS[0]} fillOpacity={1} fill="url(#colorLuxury)" />
                      <Area type="monotone" dataKey="regularRevenue" name="Revenue Regular" stroke={REGULAR_COLORS[0]} fillOpacity={1} fill="url(#colorRegular)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Vehicle Variation Analysis */}
          <div className="vehicle-variation-section">
            <div className="section-header">
              <h3><FontAwesomeIcon icon={faChartBar} /> Analyse des Variations par Véhicule</h3>
            </div>
            
            {/* Vehicle Selector Grid */}
            {filteredVehicles.length > 0 && (
              <div className="vehicle-selection-grid">
                <div className="selection-header">
                  <div className="header-left">
                    <h4>Véhicules:</h4>
                    <div className="filter-count">
                      {filteredVehicles.length} trouvé{filteredVehicles.length > 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <div className="vehicle-grid">
                  {filteredVehicles.map((vehicle) => {
                    const vehicleColor = vehicle.vehicleType === 'smart' ? LUXURY_COLORS[0] : REGULAR_COLORS[0];
                    const isSelected = vehicle.vehicleId === selectedVehicleId;
                    
                    return (
                      <div 
                        key={vehicle.vehicleId}
                        className={`vehicle-selector-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => setSelectedVehicleId(vehicle.vehicleId)}
                        style={{
                          borderColor: vehicleColor,
                          boxShadow: isSelected ? `0 0 0 2px ${vehicleColor}` : 'none'
                        }}
                      >
                        <div className="vehicle-selector-header">
                          <div className="vehicle-color-indicator" style={{ backgroundColor: vehicleColor }}></div>
                          <div className={`vehicle-type-badge ${vehicle.vehicleType === 'smart' ? 'luxury' : 'regular'}`}>
                            {vehicle.vehicleType === 'smart' ? <><FontAwesomeIcon icon={faRobot} /> Luxury</> : <><FontAwesomeIcon icon={faCar} /> Standard</>}
                          </div>
                        </div>
                        <div className="vehicle-selector-body">
                          <div className="vehicle-image-container">
                            {vehicle.vehicleImage ? (
                              <img src={vehicle.vehicleImage} alt={vehicle.vehicleName} />
                            ) : (
                              <div className="vehicle-image-placeholder">
                                {vehicle.vehicleType === 'smart' ? <FontAwesomeIcon icon={faRobot} /> : <FontAwesomeIcon icon={faCar} />}
                              </div>
                            )}
                          </div>
                          <div className="vehicle-info">
                            <h5>{vehicle.vehicleName}</h5>
                            <div className="vehicle-metrics">
                              <div className="metric">
                                <span className="metric-label">Jours:</span>
                                <span className="metric-value">{vehicle.totalRentalDays}</span>
                              </div>
                              <div className="metric">
                                <span className="metric-label">Rev:</span>
                                <span className="metric-value">{vehicle.totalRevenue?.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Detailed Analysis */}
            {selectedVehicle && (
              <div className="vehicle-detail-analysis">
                <div className="analysis-header">
                  <h4>
                    Analyse: {selectedVehicle.vehicleName}
                    <span className="vehicle-id"> ({selectedVehicle.vehicleId?.slice(-6)})</span>
                  </h4>
                  <div className={`vehicle-type-tag ${selectedVehicle.vehicleType === 'smart' ? 'luxury' : 'regular'}`}>
                    {selectedVehicle.vehicleType === 'smart' ? <><FontAwesomeIcon icon={faRobot} /> Luxury</> : <><FontAwesomeIcon icon={faCar} /> Standard</>}
                  </div>
                </div>
                
                {/* Luxury Metrics */}
                {selectedVehicle.vehicleType === 'smart' && luxuryMetrics && (
                  <div className="luxury-metrics-section">
                    <h5><FontAwesomeIcon icon={faTachometerAlt} /> Métriques Spécifiques Luxury Car</h5>
                    <div className="luxury-metrics-grid">
                      <div className="luxury-metric">
                        <div className="luxury-metric-icon"><FontAwesomeIcon icon={faMoneyBillWave} /></div>
                        <div className="luxury-metric-data">
                          <div className="luxury-metric-label">Revenue/Jour</div>
                          <div className="luxury-metric-value">{luxuryMetrics.revenuePerDay} MAD</div>
                        </div>
                      </div>
                      <div className="luxury-metric">
                        <div className="luxury-metric-icon"><FontAwesomeIcon icon={faChartBar} /></div>
                        <div className="luxury-metric-data">
                          <div className="luxury-metric-label">Efficacité</div>
                          <div className="luxury-metric-value">{selectedVehicle.efficiencyScore}/10</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="analysis-grid">
                  {/* Metrics */}
                  <div className="metrics-card">
                    <h5>Performance</h5>
                    <div className="metrics-grid">
                      <div className="metric-item">
                        <span className="metric-label">Total Jours</span>
                        <span className="metric-value-large">{selectedVehicle.totalRentalDays}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Revenue</span>
                        <span className="metric-value-large">{selectedVehicle.totalRevenue?.toLocaleString()}</span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Croissance</span>
                        <span className={`metric-value-large ${selectedVehicle.growthRate >= 0 ? 'positive' : 'negative'}`}>
                          {selectedVehicle.growthRate}% {selectedVehicle.growthRate >= 0 ? <FontAwesomeIcon icon={faArrowUp} /> : <FontAwesomeIcon icon={faArrowDown} />}
                        </span>
                      </div>
                      <div className="metric-item">
                        <span className="metric-label">Régularité</span>
                        <span className="metric-value-large">{selectedVehicle.consistencyScore}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="variation-chart-card">
                    <h5>Variations Mensuelles</h5>
                    <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={selectedVehicle.monthlyVariation}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="monthName" />
                        <YAxis />
                        <Tooltip content={<VehicleVariationTooltip />} />
                        <Bar 
                          dataKey="rentalDays" 
                          name="Jours"
                          fill={selectedVehicle.vehicleType === 'smart' ? LUXURY_COLORS[0] : REGULAR_COLORS[0]}
                          opacity={0.8}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="rentalDays" 
                          stroke={selectedVehicle.vehicleType === 'smart' ? LUXURY_COLORS[1] : REGULAR_COLORS[1]}
                          strokeWidth={2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Existing Global Chart */}
          <div className="chart-container-finance">
            <div className="chart-header">
              <h3><FontAwesomeIcon icon={faChartLine} /> Évolution Mensuelle Globale</h3>
            </div>
            <div className="chart-box">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={stats.monthlyStats}>
                  <defs>
                    <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4facfe" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="monthName" tick={{fontSize: 12}} />
                  <YAxis label={{ value: 'Jours', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="totalRentalDays" 
                    stroke="#4facfe" 
                    fillOpacity={1} 
                    fill="url(#colorDays)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

// ================= CSS STYLES =================
const styles = `
.finance-tracker {
  padding: 20px;
  background: none;
  min-height: 100vh;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
}

.tracker-header-finance {
  background: white;
  padding: 25px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.tracker-header-finance h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 26px;
}

.sub-text {
  margin: 5px 0 0 0;
  color: #7f8c8d;
}

.year-selector-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.year-select {
  padding: 10px 20px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: #fff;
  color: #2c3e50;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

.finance-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.finance-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.04);
  border-left: 5px solid transparent;
}

.finance-card.blue { border-left-color: #3498db; }
.finance-card.green { border-left-color: #2ecc71; }
.finance-card.purple { border-left-color: #9b59b6; }
.finance-card.orange { border-left-color: #f39c12; }

.finance-card .icon {
  font-size: 32px;
  background: #f8f9fa;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.finance-card .data {
  display: flex;
  flex-direction: column;
}

.finance-card .label {
  font-size: 12px;
  color: #95a5a6;
  text-transform: uppercase;
}

.finance-card .value {
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
}

.finance-card .sub-value {
  font-size: 12px;
  color: #7f8c8d;
  margin-top: 4px;
}

/* Sections */
.breakdown-section, .comparison-section, .vehicle-variation-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.04);
}

.section-header {
  margin-bottom: 20px;
}

.section-header h3 {
  margin: 0;
  color: #34495e;
}

.section-header p {
  margin: 5px 0 0 0;
  color: #7f8c8d;
  font-size: 14px;
}

/* Breakdown */
.breakdown-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  COLOR: black;
}

.breakdown-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.breakdown-chart {
  height: 200px;
  margin-bottom: 15px;
}

.breakdown-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.breakdown-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
}

.stat-label.luxury { color: #00BCD4; font-weight: bold; }
.stat-label.regular { color: #FF9800; font-weight: bold; }
.stat-value { font-size: 16px; font-weight: bold; color: #2c3e50; }
.stat-percentage { font-size: 14px; color: #7f8c8d; }

.vehicle-count-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin: 20px 0;
}

.vehicle-count-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
}

.vehicle-count-item.luxury {
  background: rgba(0, 188, 212, 0.1);
  border: 1px solid rgba(0, 188, 212, 0.2);
}

.vehicle-count-item.regular {
  background: rgba(255, 152, 0, 0.1);
  border: 1px solid rgba(255, 152, 0, 0.2);
}

.count-icon { font-size: 24px; }
.count-data { display: flex; flex-direction: column; }
.count-value { font-size: 24px; font-weight: bold; color: #2c3e50; }
.count-label { font-size: 12px; color: #7f8c8d; }

.breakdown-summary {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.summary-label { font-size: 13px; color: #7f8c8d; }
.summary-value { font-size: 13px; font-weight: bold; color: #2c3e50; }
.summary-value.luxury { color: #00BCD4; }
.summary-value.regular { color: #FF9800; }

/* Comparison Tabs */
.comparison-tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 8px 20px;
  border: none;
  background: #f8f9fa;
  color: #7f8c8d;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.tab-btn.active {
  background: #3498db;
  color: white;
}

.comparison-charts {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}
@media(min-width: 1000px) {
  .comparison-charts { grid-template-columns: 1fr 1fr; }
}

.comparison-chart-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
}

.comparison-chart-card h5 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

/* Vehicle Variation */
.vehicle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.vehicle-selector-card {
  background: #f8f9fa;
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.2s;
}

.vehicle-selector-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.vehicle-selector-card.selected {
  background: white;
}

.vehicle-selector-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.vehicle-color-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.vehicle-type-badge {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  text-transform: uppercase;
  font-weight: bold;
}

.vehicle-type-badge.luxury { background: #e0f7fa; color: #0097a7; }
.vehicle-type-badge.regular { background: #fff3e0; color: #ef6c00; }

.vehicle-image-container {
  width: 50px;
  height: 50px;
  margin: 0 auto 10px;
  border-radius: 6px;
  overflow: hidden;
}

.vehicle-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.vehicle-image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e0e0e0;
  font-size: 20px;
}

.vehicle-info h5 {
  margin: 0 0 5px 0;
  font-size: 13px;
  color: #20364b;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.vehicle-metrics {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}

.metric-label { color: #7f8c8d; }
.metric-value { color: #2c3e50; font-weight: bold; }

/* Detail Analysis */
.vehicle-detail-analysis {
  margin-top: 25px;
  padding-top: 25px;
  border-top: 1px solid #eee;
}

.analysis-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.analysis-header h4 { margin: 0; color: #2c3e50; }
.vehicle-id { font-size: 12px; color: #95a5a6; }
.vehicle-type-tag { font-size: 12px; padding: 4px 12px; border-radius: 12px; font-weight: bold; }
.vehicle-type-tag.luxury { background: #00BCD4; color: white; }
.vehicle-type-tag.regular { background: #FF9800; color: white; }

.luxury-metrics-section {
  background: rgba(0, 188, 212, 0.05);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 188, 212, 0.2);
}

.luxury-metrics-section h5 { margin: 0 0 15px 0; color: #2c3e50; }
.luxury-metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px; }

.luxury-metric {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.luxury-metric-icon { font-size: 24px; color: #00BCD4; }
.luxury-metric-label { font-size: 12px; color: #7f8c8d; }
.luxury-metric-value { font-size: 18px; font-weight: bold; color: #2c3e50; }

.analysis-grid { display: grid; grid-template-columns: 1fr; gap: 20px; }
@media(min-width: 900px) { .analysis-grid { grid-template-columns: 1fr 2fr; } }

.metrics-card, .variation-chart-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
}

.metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 15px; }
.metric-item { display: flex; flex-direction: column; gap: 5px; }
.metric-value-large { font-size: 18px; font-weight: bold; color: #2c3e50; }
.metric-value-large.positive { color: #27ae60; }
.metric-value-large.negative { color: #e74c3c; }

/* Chart Container */
.chart-container-finance {
  background: white;
  padding: 25px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.04);
}

.chart-header h3 {
  margin: 0 0 20px 0;
  color: #34495e;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.chart-box { width: 100%; }

/* Tooltips */
.custom-tooltip-variation, .custom-tooltip-breakdown {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.tooltip-header h4 { margin: 0 0 5px 0; font-size: 12px; color: #2c3e50; }
.stat-row { display: flex; justify-content: space-between; gap: 10px; font-size: 11px; }
.color-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }

/* Loading */
.loading-box { text-align: center; padding: 50px; color: #7f8c8d; }
.spinner {
  border: 4px solid #f3f3f3; border-top: 4px solid #3498db;
  border-radius: 50%; width: 40px; height: 40px;
  animation: spin 1s linear infinite; margin: 0 auto 15px;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.error-box {
  background: #ffeaea; color: #c0392b; padding: 15px;
  border-radius: 8px; text-align: center; margin-bottom: 20px;
}
`;

// Add styles
if (typeof document !== 'undefined') {
  const styleId = 'finance-tracker-styles';
  let styleSheet = document.getElementById(styleId);
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = styleId;
    document.head.appendChild(styleSheet);
  }
  styleSheet.textContent = styles;
}

export default Overview;