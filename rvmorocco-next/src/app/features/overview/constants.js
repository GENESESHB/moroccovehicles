import React from 'react';

export const EXAMPLE_STATS = {
    totalYearRevenue: 2940000,
    totalYearRentalDays: 4380,
    totalYearContracts: 3739,
    averageMonthlyRevenue: 245000,
    averageMonthlyRentalDays: 365,
    topVehicleOfYear: {
        vehicleName: "Mercedes Classe E",
        totalRentalDays: 312
    },
    monthlyStats: [
        { monthName: "Jan", totalRentalDays: 320, totalRevenue: 245000 },
        { monthName: "Fév", totalRentalDays: 298, totalRevenue: 238500 },
        { monthName: "Mar", totalRentalDays: 340, totalRevenue: 262000 },
        { monthName: "Avr", totalRentalDays: 355, totalRevenue: 268000 },
        { monthName: "Mai", totalRentalDays: 380, totalRevenue: 285000 },
        { monthName: "Juin", totalRentalDays: 410, totalRevenue: 310000 },
        { monthName: "Juil", totalRentalDays: 450, totalRevenue: 335000 },
        { monthName: "Août", totalRentalDays: 465, totalRevenue: 342000 },
        { monthName: "Sep", totalRentalDays: 380, totalRevenue: 298000 },
        { monthName: "Oct", totalRentalDays: 350, totalRevenue: 275000 },
        { monthName: "Nov", totalRentalDays: 310, totalRevenue: 255000 },
        { monthName: "Déc", totalRentalDays: 282, totalRevenue: 236500 }
    ]
};

export const BREAKDOWN_DATA = {
    luxury: {
        totalRevenue: 1323000,
        totalRentalDays: 1314,
        totalContracts: 892,
        vehicleCount: 45,
        revenuePercentage: "45.0",
        daysPercentage: "30.0"
    },
    regular: {
        totalRevenue: 1617000,
        totalRentalDays: 3066,
        totalContracts: 2847,
        vehicleCount: 111,
        revenuePercentage: "55.0",
        daysPercentage: "70.0"
    }
};

export const MONTHLY_COMPARISON_DATA = [
    { month: 1, monthName: "Jan", luxuryDays: 96, regularDays: 224, luxuryRevenue: 110250, regularRevenue: 134750, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 2, monthName: "Fév", luxuryDays: 89, regularDays: 209, luxuryRevenue: 102555, regularRevenue: 135945, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 3, monthName: "Mar", luxuryDays: 102, regularDays: 238, luxuryRevenue: 123140, regularRevenue: 138860, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 4, monthName: "Avr", luxuryDays: 106, regularDays: 249, luxuryRevenue: 120600, regularRevenue: 147400, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 5, monthName: "Mai", luxuryDays: 114, regularDays: 266, luxuryRevenue: 128250, regularRevenue: 156750, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 6, monthName: "Juin", luxuryDays: 123, regularDays: 287, luxuryRevenue: 139500, regularRevenue: 170500, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 7, monthName: "Juil", luxuryDays: 135, regularDays: 315, luxuryRevenue: 150750, regularRevenue: 184250, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 8, monthName: "Août", luxuryDays: 140, regularDays: 325, luxuryRevenue: 153900, regularRevenue: 188100, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 9, monthName: "Sep", luxuryDays: 114, regularDays: 266, luxuryRevenue: 134100, regularRevenue: 163900, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 10, monthName: "Oct", luxuryDays: 105, regularDays: 245, luxuryRevenue: 123750, regularRevenue: 151250, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 11, monthName: "Nov", luxuryDays: 93, regularDays: 217, luxuryRevenue: 114750, regularRevenue: 140250, luxuryPercentage: 30, regularPercentage: 70 },
    { month: 12, monthName: "Déc", luxuryDays: 85, regularDays: 197, luxuryRevenue: 106200, regularRevenue: 130300, luxuryPercentage: 30, regularPercentage: 70 }
];

export const VEHICLE_VARIATION_DATA = [
    {
        vehicleId: "VEH001",
        vehicleName: "Mercedes Classe E",
        vehicleType: "smart",
        totalRentalDays: 312,
        totalRevenue: 245000,
        growthRate: 23.5,
        consistencyScore: 91.7,
        monthlyVariation: [
            { monthName: "Jan", rentalDays: 25, revenue: 19500 },
            { monthName: "Fév", rentalDays: 22, revenue: 17200 },
            { monthName: "Mar", rentalDays: 28, revenue: 22000 },
            { monthName: "Avr", rentalDays: 26, revenue: 20500 },
            { monthName: "Mai", rentalDays: 29, revenue: 22800 },
            { monthName: "Juin", rentalDays: 30, revenue: 23600 },
            { monthName: "Juil", rentalDays: 32, revenue: 25200 },
            { monthName: "Août", rentalDays: 30, revenue: 23600 },
            { monthName: "Sep", rentalDays: 28, revenue: 22000 },
            { monthName: "Oct", rentalDays: 26, revenue: 20500 },
            { monthName: "Nov", rentalDays: 24, revenue: 18900 },
            { monthName: "Déc", rentalDays: 22, revenue: 17200 }
        ]
    },
    {
        vehicleId: "VEH002",
        vehicleName: "Dacia Logan",
        vehicleType: "regular",
        totalRentalDays: 298,
        totalRevenue: 156000,
        growthRate: 15.2,
        consistencyScore: 83.3,
        monthlyVariation: [
            { monthName: "Jan", rentalDays: 24, revenue: 12500 },
            { monthName: "Fév", rentalDays: 22, revenue: 11500 },
            { monthName: "Mar", rentalDays: 26, revenue: 13600 },
            { monthName: "Avr", rentalDays: 25, revenue: 13100 },
            { monthName: "Mai", rentalDays: 28, revenue: 14700 },
            { monthName: "Juin", rentalDays: 27, revenue: 14100 },
            { monthName: "Juil", rentalDays: 26, revenue: 13600 },
            { monthName: "Août", rentalDays: 28, revenue: 14700 },
            { monthName: "Sep", rentalDays: 25, revenue: 13100 },
            { monthName: "Oct", rentalDays: 24, revenue: 12500 },
            { monthName: "Nov", rentalDays: 23, revenue: 12000 },
            { monthName: "Déc", rentalDays: 20, revenue: 10500 }
        ]
    },
    {
        vehicleId: "VEH003",
        vehicleName: "BMW Série 5",
        vehicleType: "smart",
        totalRentalDays: 285,
        totalRevenue: 298000,
        growthRate: 18.7,
        consistencyScore: 88.9,
        monthlyVariation: [
            { monthName: "Jan", rentalDays: 22, revenue: 23000 },
            { monthName: "Fév", rentalDays: 20, revenue: 21000 },
            { monthName: "Mar", rentalDays: 24, revenue: 25200 },
            { monthName: "Avr", rentalDays: 23, revenue: 24100 },
            { monthName: "Mai", rentalDays: 26, revenue: 27200 },
            { monthName: "Juin", rentalDays: 27, revenue: 28300 },
            { monthName: "Juil", rentalDays: 28, revenue: 29400 },
            { monthName: "Août", rentalDays: 30, revenue: 31500 },
            { monthName: "Sep", rentalDays: 26, revenue: 27300 },
            { monthName: "Oct", rentalDays: 24, revenue: 25200 },
            { monthName: "Nov", rentalDays: 22, revenue: 23000 },
            { monthName: "Déc", rentalDays: 19, revenue: 19900 }
        ]
    }
];

export const COLORS = {
    luxury: ['#00BCD4', '#0097A7', '#00838F', '#006064', '#4DD0E1'],
    regular: ['#FF9800', '#F57C00', '#EF6C00', '#E65100', '#FFB74D'],
    primary: '#36c275',
    secondary: '#2c3e50',
    accent: '#4facfe'
};

export const Icons = {
    Dashboard: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
    ),
    Money: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
    ),
    Calendar: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
    ),
    Car: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"></path>
            <circle cx="6.5" cy="16.5" r="2.5"></circle>
            <circle cx="16.5" cy="16.5" r="2.5"></circle>
        </svg>
    ),
    Chart: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
    ),
    ChartPie: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
            <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
        </svg>
    ),
    ChartLine: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
    ),
    Robot: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="10" rx="2"></rect>
            <circle cx="12" cy="5" r="2"></circle>
            <path d="M12 7v4"></path>
            <line x1="8" y1="16" x2="8" y2="16"></line>
            <line x1="16" y1="16" x2="16" y2="16"></line>
        </svg>
    ),
    Speedometer: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
        </svg>
    ),
    Check: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    ),
    ArrowUp: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
    ),
    ArrowDown: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
    ),
    Info: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
    ),
    Code: () => (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
    ),
    Database: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
    ),
    Server: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
            <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
            <line x1="6" y1="6" x2="6.01" y2="6"></line>
            <line x1="6" y1="18" x2="6.01" y2="18"></line>
        </svg>
    ),
    Layers: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
    ),
    Zap: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
    ),
    Shield: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
    ),
    Cpu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
            <line x1="9" y1="1" x2="9" y2="4"></line>
            <line x1="15" y1="1" x2="15" y2="4"></line>
            <line x1="9" y1="20" x2="9" y2="23"></line>
            <line x1="15" y1="20" x2="15" y2="23"></line>
            <line x1="20" y1="9" x2="23" y2="9"></line>
            <line x1="20" y1="14" x2="23" y2="14"></line>
            <line x1="1" y1="9" x2="4" y2="9"></line>
            <line x1="1" y1="14" x2="4" y2="14"></line>
        </svg>
    ),
    Globe: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
    ),
    TrendingUp: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
    ),
    Users: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
    )
};
