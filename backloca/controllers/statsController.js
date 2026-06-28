const mongoose = require('mongoose');
const Contract = require('../models/Contract');
const SmartContract = require('../models/SmartContract');
const SmartCar = require('../models/SmartCar');
const Vehicle = require('../models/Vehicle');

/**
 * Get all rental stats in a single optimized query
 */
const getPartnerMonthlyStats = async (partnerId, year, month, vehicleType = 'all') => {
  try {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // End of month
    const results = { regular: [], smart: [] };

    console.log(`Fetching stats for partner: ${partnerId}, year: ${year}, month: ${month}, vehicleType: ${vehicleType}`);
    console.log(`Date range: ${startDate} to ${endDate}`);

    // Get regular vehicle stats
    if (vehicleType === 'all' || vehicleType === 'regular') {
      console.log('Fetching regular vehicle stats...');
      
      const regularStats = await Contract.aggregate([
        {
          $match: {
            'partnerInfo.partnerId': new mongoose.Types.ObjectId(partnerId),
            status: { $in: ['active', 'completed'] }
          }
        },
        {
          $addFields: {
            startDateTime: {
              $cond: {
                if: { $eq: [{ $type: "$rentalInfo.startDateTime" }, "date"] },
                then: "$rentalInfo.startDateTime",
                else: { $toDate: "$rentalInfo.startDateTime" }
              }
            },
            endDateTime: {
              $cond: {
                if: { $eq: [{ $type: "$rentalInfo.endDateTime" }, "date"] },
                then: "$rentalInfo.endDateTime",
                else: { $toDate: "$rentalInfo.endDateTime" }
              }
            }
          }
        },
        {
          $match: {
            $expr: {
              $and: [
                { $lt: ["$startDateTime", endDate] },
                { $gt: ["$endDateTime", startDate] }
              ]
            }
          }
        },
        {
          $project: {
            vehicleId: '$vehicleInfo.vehicleId',
            vehicleName: '$vehicleInfo.name',
            vehicleImage: '$vehicleInfo.image',
            vehicleType: '$vehicleInfo.type',
            startDateTime: '$startDateTime',
            endDateTime: '$endDateTime',
            prixTotal: '$rentalInfo.prixTotal',
            rentalDays: '$rentalInfo.rentalDays',
            overlapDays: {
              $ceil: {
                $divide: [
                  {
                    $subtract: [
                      { $min: ['$endDateTime', endDate] },
                      { $max: ['$startDateTime', startDate] }
                    ]
                  },
                  1000 * 60 * 60 * 24
                ]
              }
            }
          }
        },
        {
          $group: {
            _id: '$vehicleId',
            name: { $first: '$vehicleName' },
            imagePath: { $first: '$vehicleImage' },
            type: { $first: '$vehicleType' },
            totalRentalDays: { $sum: '$overlapDays' },
            totalRevenue: { $sum: '$prixTotal' },
            contractCount: { $sum: 1 },
            maxSingleRentalDays: { $max: '$overlapDays' }
          }
        },
        { $sort: { totalRentalDays: -1 } }
      ]);

      console.log(`Found ${regularStats.length} regular vehicles with rentals`);
      results.regular = regularStats.map(stat => ({
        ...stat,
        vehicleType: 'regular',
        vehicleId: stat._id
      }));
    }

    // Get smart car stats - FIXED VERSION
    if (vehicleType === 'all' || vehicleType === 'smart') {
      console.log('Fetching smart car stats...');
      
      // First get all smart cars owned by the partner
      const partnerSmartCars = await SmartCar.find({
        userId: new mongoose.Types.ObjectId(partnerId)
      }).lean();

      console.log(`Partner has ${partnerSmartCars.length} smart cars`);
      
      // Get user's entreprise name to filter smart contracts
      const user = await mongoose.model('User').findById(partnerId).lean();
      const entrepriseName = user?.entreprise || '';

      if (partnerSmartCars.length > 0 && entrepriseName) {
        const smartCarIds = partnerSmartCars.map(car => car._id);
        const smartCarMap = partnerSmartCars.reduce((map, car) => {
          map[car._id.toString()] = car;
          return map;
        }, {});

        console.log(`Smart car IDs: ${smartCarIds.map(id => id.toString())}`);
        console.log(`Entreprise for filtering: ${entrepriseName}`);

        // Get smart contracts with proper filtering
        const smartStats = await SmartContract.aggregate([
          {
            $match: {
              $or: [
                { createdBy: new mongoose.Types.ObjectId(partnerId) },
                { entreprise: entrepriseName }
              ],
              status: { $in: ['active', 'completed'] }
            }
          },
          {
            $addFields: {
              // Ensure dates are proper Date objects
              contractStartDate: {
                $cond: {
                  if: { $eq: [{ $type: "$startDate" }, "date"] },
                  then: "$startDate",
                  else: { $toDate: "$startDate" }
                }
              },
              contractEndDate: {
                $cond: {
                  if: { $eq: [{ $type: "$endDate" }, "date"] },
                  then: "$endDate",
                  else: { $toDate: "$endDate" }
                }
              }
            }
          },
          {
            $match: {
              smartCarId: { $in: smartCarIds },
              $expr: {
                $and: [
                  { $lt: ["$contractStartDate", endDate] },
                  { $gt: ["$contractEndDate", startDate] }
                ]
              }
            }
          },
          {
            $project: {
              smartCarId: '$smartCarId',
              vehicleName: { $ifNull: ['$vehicleInfo.nomVehicule', null] },
              vehicleImage: { $ifNull: ['$vehicleInfo.imageVehicule.url', null] },
              vehicleType: { $ifNull: ['$vehicleInfo.typeVehicule', null] },
              startDate: '$contractStartDate',
              endDate: '$contractEndDate',
              prixTotal: '$prixTotal',
              days: '$days',
              overlapDays: {
                $ceil: {
                  $divide: [
                    {
                      $subtract: [
                        { $min: ['$contractEndDate', endDate] },
                        { $max: ['$contractStartDate', startDate] }
                      ]
                    },
                    1000 * 60 * 60 * 24
                  ]
                }
              }
            }
          },
          {
            $group: {
              _id: '$smartCarId',
              name: { $first: '$vehicleName' },
              imagePath: { $first: '$vehicleImage' },
              type: { $first: '$vehicleType' },
              totalRentalDays: { $sum: '$overlapDays' },
              totalRevenue: { $sum: '$prixTotal' },
              contractCount: { $sum: 1 },
              maxSingleRentalDays: { $max: '$overlapDays' }
            }
          },
          { $sort: { totalRentalDays: -1 } }
        ]);

        console.log(`Found ${smartStats.length} smart cars with rentals`);

        results.smart = smartStats.map(stat => {
          const smartCar = smartCarMap[stat._id.toString()];
          return {
            ...stat,
            vehicleType: 'smart',
            vehicleId: stat._id,
            name: stat.name || smartCar?.nomVehicule || 'Smart Car',
            imagePath: stat.imagePath || smartCar?.imageVehicule?.url,
            type: stat.type || smartCar?.typeVehicule
          };
        });
      } else {
        console.log('No smart cars found for partner or missing entreprise');
      }
    }

    // Combine and process results
    let combinedVehicles = [];
    let vehicleTypeLabel = '';

    if (vehicleType === 'all') {
      combinedVehicles = [
        ...results.regular.map(v => ({ ...v, vehicleType: 'regular' })),
        ...results.smart.map(v => ({ ...v, vehicleType: 'smart' }))
      ];
      vehicleTypeLabel = 'combined';
    } else if (vehicleType === 'regular') {
      combinedVehicles = results.regular;
      vehicleTypeLabel = 'regular';
    } else if (vehicleType === 'smart') {
      combinedVehicles = results.smart;
      vehicleTypeLabel = 'smart';
    }

    combinedVehicles.sort((a, b) => b.totalRentalDays - a.totalRentalDays);

    // Calculate totals
    const totalRentalDays = combinedVehicles.reduce((sum, v) => sum + v.totalRentalDays, 0);
    const totalRevenue = combinedVehicles.reduce((sum, v) => sum + v.totalRevenue, 0);
    const totalContracts = combinedVehicles.reduce((sum, v) => sum + v.contractCount, 0);

    console.log(`Final results: ${combinedVehicles.length} vehicles, ${totalRentalDays} rental days, ${totalRevenue} revenue`);

    return {
      partnerId,
      year,
      month,
      monthName: new Date(year, month - 1).toLocaleString('fr-FR', { month: 'long' }),
      vehicleType: vehicleTypeLabel,
      totalVehiclesRented: combinedVehicles.length,
      totalRentalDays,
      totalRevenue,
      totalContracts,
      averageRentalDays: combinedVehicles.length > 0 ? totalRentalDays / combinedVehicles.length : 0,
      vehicles: combinedVehicles.map(v => ({
        vehicleId: v.vehicleId,
        name: v.name,
        imagePath: v.imagePath,
        type: v.type,
        rentalDays: v.totalRentalDays,
        revenue: v.totalRevenue,
        contractCount: v.contractCount,
        maxSingleRentalDays: v.maxSingleRentalDays,
        vehicleType: v.vehicleType
      })),
      maxRentalVehicle: combinedVehicles.length > 0 ? {
        vehicleId: combinedVehicles[0].vehicleId,
        name: combinedVehicles[0].name,
        imagePath: combinedVehicles[0].imagePath,
        rentalDays: combinedVehicles[0].totalRentalDays,
        revenue: combinedVehicles[0].totalRevenue,
        vehicleType: combinedVehicles[0].vehicleType
      } : null,
      breakdown: {
        regular: {
          totalVehicles: results.regular.length,
          totalRentalDays: results.regular.reduce((sum, v) => sum + v.totalRentalDays, 0),
          totalRevenue: results.regular.reduce((sum, v) => sum + v.totalRevenue, 0),
          totalContracts: results.regular.reduce((sum, v) => sum + v.contractCount, 0)
        },
        smart: {
          totalVehicles: results.smart.length,
          totalRentalDays: results.smart.reduce((sum, v) => sum + v.totalRentalDays, 0),
          totalRevenue: results.smart.reduce((sum, v) => sum + v.totalRevenue, 0),
          totalContracts: results.smart.reduce((sum, v) => sum + v.contractCount, 0)
        }
      }
    };
  } catch (error) {
    console.error('Error getting partner monthly stats:', error);
    throw error;
  }
};

/**
 * Get yearly statistics with optimized queries
 */
const getPartnerYearlyStats = async (partnerId, year, vehicleType = 'all') => {
  try {
    const monthlyStatsPromises = [];
    const monthNames = [];

    for (let month = 1; month <= 12; month++) {
      monthlyStatsPromises.push(getPartnerMonthlyStats(partnerId, year, month, vehicleType));
      monthNames.push(new Date(year, month - 1).toLocaleString('fr-FR', { month: 'long' }));
    }

    const monthlyStats = await Promise.all(monthlyStatsPromises);

    // Aggregate yearly totals
    const vehicleYearlyTotals = {};
    let totalYearRentalDays = 0;
    let totalYearRevenue = 0;
    let totalYearContracts = 0;

    monthlyStats.forEach((monthStat, monthIndex) => {
      monthStat.vehicles.forEach(vehicle => {
        const vehicleKey = `${vehicle.vehicleType}-${vehicle.vehicleId.toString()}`;
        
        if (!vehicleYearlyTotals[vehicleKey]) {
          vehicleYearlyTotals[vehicleKey] = {
            vehicleId: vehicle.vehicleId,
            name: vehicle.name,
            imagePath: vehicle.imagePath,
            type: vehicle.type,
            vehicleType: vehicle.vehicleType,
            totalRentalDays: 0,
            totalRevenue: 0,
            totalContracts: 0,
            monthsActive: new Set(),
            monthlyStats: {}
          };
        }

        const vehicleData = vehicleYearlyTotals[vehicleKey];
        vehicleData.totalRentalDays += vehicle.rentalDays;
        vehicleData.totalRevenue += vehicle.revenue;
        vehicleData.totalContracts += vehicle.contractCount;
        vehicleData.monthsActive.add(monthIndex + 1);
        
        // Store monthly breakdown
        vehicleData.monthlyStats[monthIndex + 1] = {
          rentalDays: vehicle.rentalDays,
          revenue: vehicle.revenue,
          contracts: vehicle.contractCount
        };
      });

      totalYearRentalDays += monthStat.totalRentalDays;
      totalYearRevenue += monthStat.totalRevenue;
      totalYearContracts += monthStat.totalContracts;
    });

    const vehiclesArray = Object.values(vehicleYearlyTotals);
    vehiclesArray.sort((a, b) => b.totalRentalDays - a.totalRentalDays);

    // Get total unique vehicles count
    const regularVehicles = vehiclesArray.filter(v => v.vehicleType === 'regular').length;
    const smartVehicles = vehiclesArray.filter(v => v.vehicleType === 'smart').length;

    return {
      partnerId,
      year,
      vehicleType: vehicleType === 'all' ? 'combined' : vehicleType,
      totalYearRentalDays,
      totalYearRevenue,
      totalYearContracts,
      averageMonthlyRentalDays: totalYearRentalDays / 12,
      averageMonthlyRevenue: totalYearRevenue / 12,
      monthlyStats: monthlyStats.map((month, index) => ({
        monthNumber: index + 1,
        monthName: monthNames[index],
        totalRentalDays: month.totalRentalDays,
        totalRevenue: month.totalRevenue,
        totalVehicles: month.totalVehiclesRented,
        topVehicle: month.maxRentalVehicle
      })),
      yearlyVehicleStats: vehiclesArray.map(v => ({
        ...v,
        monthsActive: Array.from(v.monthsActive).sort((a, b) => a - b),
        monthsActiveCount: v.monthsActive.size,
        averageMonthlyRentalDays: v.monthsActive.size > 0 ? v.totalRentalDays / v.monthsActive.size : 0
      })),
      topVehicleOfYear: vehiclesArray.length > 0 ? vehiclesArray[0] : null,
      summary: {
        regularVehicles,
        smartVehicles,
        totalUniqueVehicles: vehiclesArray.length
      }
    };
  } catch (error) {
    console.error('Error getting partner yearly stats:', error);
    throw error;
  }
};

/**
 * Get detailed vehicle statistics (works for both regular and smart cars)
 */
const getVehicleStats = async (req, res) => {
  try {
    const { vehicleId, year, month, vehicleType } = req.query;
    const partnerId = req.user._id;

    if (!vehicleId) {
      return res.status(400).json({
        success: false,
        message: 'Vehicle ID is required'
      });
    }

    const yearToUse = year ? parseInt(year) : new Date().getFullYear();
    const monthToUse = month ? parseInt(month) : new Date().getMonth() + 1;
    const startDate = new Date(yearToUse, monthToUse - 1, 1);
    const endDate = new Date(yearToUse, monthToUse, 0, 23, 59, 59, 999);

    // Determine vehicle type automatically if not specified
    let type = vehicleType;
    if (!type) {
      // Check if it's a regular vehicle
      const regularVehicle = await Vehicle.findOne({
        _id: vehicleId,
        partnerId: partnerId
      });

      if (regularVehicle) {
        type = 'regular';
      } else {
        // Check if it's a smart car
        const smartCar = await SmartCar.findOne({
          _id: vehicleId,
          userId: partnerId
        });

        if (smartCar) {
          type = 'smart';
        } else {
          return res.status(404).json({
            success: false,
            message: 'Vehicle not found or not owned by partner'
          });
        }
      }
    }

    let stats, vehicleDetails;

    if (type === 'regular') {
      // Get vehicle details
      vehicleDetails = await Vehicle.findOne({
        _id: vehicleId,
        partnerId: partnerId
      });

      if (!vehicleDetails) {
        return res.status(404).json({
          success: false,
          message: 'Regular vehicle not found'
        });
      }

      // Get rental stats
      stats = await Contract.aggregate([
        {
          $match: {
            'partnerInfo.partnerId': new mongoose.Types.ObjectId(partnerId),
            'vehicleInfo.vehicleId': new mongoose.Types.ObjectId(vehicleId),
            status: { $in: ['active', 'completed'] }
          }
        },
        {
          $addFields: {
            startDateTime: {
              $cond: {
                if: { $eq: [{ $type: "$rentalInfo.startDateTime" }, "date"] },
                then: "$rentalInfo.startDateTime",
                else: { $toDate: "$rentalInfo.startDateTime" }
              }
            },
            endDateTime: {
              $cond: {
                if: { $eq: [{ $type: "$rentalInfo.endDateTime" }, "date"] },
                then: "$rentalInfo.endDateTime",
                else: { $toDate: "$rentalInfo.endDateTime" }
              }
            }
          }
        },
        {
          $match: {
            $expr: {
              $and: [
                { $lt: ["$startDateTime", endDate] },
                { $gt: ["$endDateTime", startDate] }
              ]
            }
          }
        },
        {
          $project: {
            contractId: '$_id',
            clientName: '$clientInfo.name',
            startDateTime: '$startDateTime',
            endDateTime: '$endDateTime',
            rentalDays: '$rentalInfo.rentalDays',
            prixTotal: '$rentalInfo.prixTotal',
            status: '$status',
            overlapDays: {
              $ceil: {
                $divide: [
                  {
                    $subtract: [
                      { $min: ['$endDateTime', endDate] },
                      { $max: ['$startDateTime', startDate] }
                    ]
                  },
                  1000 * 60 * 60 * 24
                ]
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            totalRentalDays: { $sum: '$overlapDays' },
            totalRevenue: { $sum: '$prixTotal' },
            contractCount: { $sum: 1 },
            averageRentalDays: { $avg: '$overlapDays' },
            contracts: { $push: '$$ROOT' }
          }
        }
      ]);

    } else if (type === 'smart') {
      // Get smart car details
      vehicleDetails = await SmartCar.findOne({
        _id: vehicleId,
        userId: partnerId
      });

      if (!vehicleDetails) {
        return res.status(404).json({
          success: false,
          message: 'Smart car not found or not owned by partner'
        });
      }

      // Get user's entreprise name
      const user = await mongoose.model('User').findById(partnerId).lean();
      const entrepriseName = user?.entreprise || '';

      // Get smart contract stats
      stats = await SmartContract.aggregate([
        {
          $match: {
            $or: [
              { createdBy: new mongoose.Types.ObjectId(partnerId) },
              { entreprise: entrepriseName }
            ],
            smartCarId: new mongoose.Types.ObjectId(vehicleId),
            status: { $in: ['active', 'completed'] }
          }
        },
        {
          $addFields: {
            contractStartDate: {
              $cond: {
                if: { $eq: [{ $type: "$startDate" }, "date"] },
                then: "$startDate",
                else: { $toDate: "$startDate" }
              }
            },
            contractEndDate: {
              $cond: {
                if: { $eq: [{ $type: "$endDate" }, "date"] },
                then: "$endDate",
                else: { $toDate: "$endDate" }
              }
            }
          }
        },
        {
          $match: {
            $expr: {
              $and: [
                { $lt: ["$contractStartDate", endDate] },
                { $gt: ["$contractEndDate", startDate] }
              ]
            }
          }
        },
        {
          $project: {
            contractId: '$_id',
            clientName: {
              $ifNull: [
                { $concat: ['$clientInfo.firstName', ' ', '$clientInfo.lastName'] },
                { $concat: ['$conducteur.prenom', ' ', '$conducteur.nom'] },
                'N/A'
              ]
            },
            startDate: '$contractStartDate',
            endDate: '$contractEndDate',
            days: '$days',
            prixTotal: '$prixTotal',
            status: '$status',
            overlapDays: {
              $ceil: {
                $divide: [
                  {
                    $subtract: [
                      { $min: ['$contractEndDate', endDate] },
                      { $max: ['$contractStartDate', startDate] }
                    ]
                  },
                  1000 * 60 * 60 * 24
                ]
              }
            }
          }
        },
        {
          $group: {
            _id: null,
            totalRentalDays: { $sum: '$overlapDays' },
            totalRevenue: { $sum: '$prixTotal' },
            contractCount: { $sum: 1 },
            averageRentalDays: { $avg: '$overlapDays' },
            contracts: { $push: '$$ROOT' }
          }
        }
      ]);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid vehicle type'
      });
    }

    const result = stats[0] || {
      totalRentalDays: 0,
      totalRevenue: 0,
      contractCount: 0,
      averageRentalDays: 0,
      contracts: []
    };

    res.json({
      success: true,
      data: {
        vehicleId,
        vehicleDetails: {
          name: vehicleDetails.name || vehicleDetails.nomVehicule,
          image: vehicleDetails.image || vehicleDetails.imageVehicule?.url,
          type: vehicleDetails.type || vehicleDetails.typeVehicule,
          brand: vehicleDetails.brand || vehicleDetails.marque,
          model: vehicleDetails.model || vehicleDetails.modele,
          year: vehicleDetails.year || vehicleDetails.annee,
          status: vehicleDetails.status,
          dailyRate: vehicleDetails.dailyRate || vehicleDetails.prixJour
        },
        stats: {
          month: monthToUse,
          year: yearToUse,
          totalRentalDays: result.totalRentalDays,
          totalRevenue: result.totalRevenue,
          contractCount: result.contractCount,
          averageRentalDays: result.averageRentalDays,
          utilizationRate: monthToUse ? 
            (result.totalRentalDays / (new Date(yearToUse, monthToUse, 0).getDate())) * 100 : 0
        },
        contracts: result.contracts.map(contract => ({
          contractId: contract.contractId,
          clientName: contract.clientName,
          startDate: contract.startDate || contract.startDateTime,
          endDate: contract.endDate || contract.endDateTime,
          rentalDays: contract.overlapDays,
          revenue: contract.prixTotal,
          status: contract.status
        })),
        vehicleType: type
      }
    });
  } catch (error) {
    console.error('Error getting vehicle stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle statistics',
      error: error.message
    });
  }
};

/**
 * Get dashboard overview stats
 */
const getDashboardStats = async (req, res) => {
  try {
    const partnerId = req.user._id;
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    console.log(`Dashboard stats for partner: ${partnerId}, ${currentYear}-${currentMonth}`);

    // Get user's entreprise name
    const user = await mongoose.model('User').findById(partnerId).lean();
    const entrepriseName = user?.entreprise || '';

    // Get current month stats
    const currentMonthStats = await getPartnerMonthlyStats(partnerId, currentYear, currentMonth, 'all');
    
    // Get previous month stats
    const prevMonthDate = new Date(currentYear, currentMonth - 2, 1);
    const prevMonthStats = await getPartnerMonthlyStats(
      partnerId, 
      prevMonthDate.getFullYear(), 
      prevMonthDate.getMonth() + 1, 
      'all'
    );

    // Get active contracts count
    const activeRegularContracts = await Contract.countDocuments({
      'partnerInfo.partnerId': partnerId,
      status: 'active'
    });

    // Get active smart contracts count
    const activeSmartContracts = await SmartContract.countDocuments({
      $or: [
        { createdBy: partnerId },
        { entreprise: entrepriseName }
      ],
      status: 'active'
    });

    // Get vehicle counts
    const regularVehicleCount = await Vehicle.countDocuments({ partnerId });
    const smartVehicleCount = await SmartCar.countDocuments({ userId: partnerId });

    // Calculate growth percentages
    const revenueGrowth = prevMonthStats.totalRevenue > 0 ?
      ((currentMonthStats.totalRevenue - prevMonthStats.totalRevenue) / prevMonthStats.totalRevenue) * 100 : 0;
    
    const rentalDaysGrowth = prevMonthStats.totalRentalDays > 0 ?
      ((currentMonthStats.totalRentalDays - prevMonthStats.totalRentalDays) / prevMonthStats.totalRentalDays) * 100 : 0;

    res.json({
      success: true,
      data: {
        overview: {
          totalRevenue: currentMonthStats.totalRevenue,
          totalRentalDays: currentMonthStats.totalRentalDays,
          totalVehicles: currentMonthStats.totalVehiclesRented,
          activeContracts: activeRegularContracts + activeSmartContracts,
          revenueGrowth: parseFloat(revenueGrowth.toFixed(2)),
          rentalDaysGrowth: parseFloat(rentalDaysGrowth.toFixed(2))
        },
        breakdown: {
          regular: {
            vehicles: regularVehicleCount,
            revenue: currentMonthStats.breakdown.regular.totalRevenue,
            rentalDays: currentMonthStats.breakdown.regular.totalRentalDays,
            activeContracts: activeRegularContracts
          },
          smart: {
            vehicles: smartVehicleCount,
            revenue: currentMonthStats.breakdown.smart.totalRevenue,
            rentalDays: currentMonthStats.breakdown.smart.totalRentalDays,
            activeContracts: activeSmartContracts
          }
        },
        topVehicle: currentMonthStats.maxRentalVehicle,
        monthlyTrend: {
          current: currentMonthStats,
          previous: prevMonthStats
        }
      }
    });
  } catch (error) {
    console.error('Error getting dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

/**
 * Controller functions (simplified)
 */
const getMonthlyStats = async (req, res) => {
  try {
    const { year, month, type } = req.query;
    const partnerId = req.user._id;

    const yearToUse = year ? parseInt(year) : new Date().getFullYear();
    const monthToUse = month ? parseInt(month) : new Date().getMonth() + 1;
    const vehicleType = type || 'all';

    console.log(`Monthly stats request: partner=${partnerId}, year=${yearToUse}, month=${monthToUse}, type=${vehicleType}`);

    const stats = await getPartnerMonthlyStats(partnerId, yearToUse, monthToUse, vehicleType);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting monthly stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching monthly statistics',
      error: error.message
    });
  }
};

const getYearlyStats = async (req, res) => {
  try {
    const { year, type } = req.query;
    const partnerId = req.user._id;

    const yearToUse = year ? parseInt(year) : new Date().getFullYear();
    const vehicleType = type || 'all';

    console.log(`Yearly stats request: partner=${partnerId}, year=${yearToUse}, type=${vehicleType}`);

    const stats = await getPartnerYearlyStats(partnerId, yearToUse, vehicleType);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting yearly stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching yearly statistics',
      error: error.message
    });
  }
};

const getMaxRentalVehicle = async (req, res) => {
  try {
    const { year, month, type } = req.query;
    const partnerId = req.user._id;

    const yearToUse = year ? parseInt(year) : new Date().getFullYear();
    const monthToUse = month ? parseInt(month) : new Date().getMonth() + 1;
    const vehicleType = type || 'all';

    const stats = await getPartnerMonthlyStats(partnerId, yearToUse, monthToUse, vehicleType);

    if (!stats.maxRentalVehicle) {
      return res.status(404).json({
        success: false,
        message: 'No rental data found for the specified period',
        data: null
      });
    }

    res.json({
      success: true,
      data: stats.maxRentalVehicle
    });
  } catch (error) {
    console.error('Error getting max rental vehicle:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching vehicle statistics',
      error: error.message
    });
  }
};

module.exports = {
  getMonthlyStats,
  getYearlyStats,
  getMaxRentalVehicle,
  getVehicleStats,
  getDashboardStats
};