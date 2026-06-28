// calendarController.js
const mongoose = require('mongoose');
const Contract = require('../models/Contract');
const SmartContract = require('../models/SmartContract');
const SmartCar = require('../models/SmartCar');
const Vehicle = require('../models/Vehicle');

/**
 * Get all calendar events for user's vehicles (regular and smart)
 */
const getUserCalendarEvents = async (userId, filters = {}) => {
  try {
    const { 
      startDate, 
      endDate, 
      vehicleType = 'all',
      vehicleId,
      status = 'active'
    } = filters;

    // FIXED: Extended default date range to 6 months (current month + 5 months ahead)
    const now = new Date();
    const defaultStartDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const defaultEndDate = new Date(now.getFullYear(), now.getMonth() + 6, 0, 23, 59, 59, 999);

    const queryStartDate = startDate ? new Date(startDate) : defaultStartDate;
    const queryEndDate = endDate ? new Date(endDate) : defaultEndDate;

    console.log(`Fetching calendar events for user: ${userId}`);
    console.log(`Date range: ${queryStartDate} to ${queryEndDate}`);

    const results = {
      events: [],
      vehicles: [],
      summary: {}
    };

    // Get user details for smart contract filtering
    const user = await mongoose.model('User').findById(userId).lean();
    const entrepriseName = user?.entreprise || '';

    // Get regular vehicle events
    if (vehicleType === 'all' || vehicleType === 'regular') {
      console.log('Fetching regular vehicle calendar events...');

      const matchConditions = {
        'partnerInfo.partnerId': new mongoose.Types.ObjectId(userId),
        'rentalInfo.startDateTime': { $lte: queryEndDate },
        'rentalInfo.endDateTime': { $gte: queryStartDate }
      };

      if (vehicleId) {
        matchConditions['vehicleInfo.vehicleId'] = new mongoose.Types.ObjectId(vehicleId);
      }

      if (status) {
        matchConditions.status = status;
      } else {
        matchConditions.status = { $in: ['pending', 'active', 'completed'] };
      }

      const regularEvents = await Contract.aggregate([
        {
          $match: matchConditions
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
          $addFields: {
            // Calculate rental progress for active rentals
            progress: {
              $cond: {
                if: { $eq: ["$status", "active"] },
                then: {
                  $let: {
                    vars: {
                      totalDuration: { $subtract: ["$endDateTime", "$startDateTime"] },
                      elapsedDuration: { $subtract: [new Date(), "$startDateTime"] },
                      progressPercent: {
                        $multiply: [
                          { $divide: [{ $subtract: [new Date(), "$startDateTime"] }, { $subtract: ["$endDateTime", "$startDateTime"] }] },
                          100
                        ]
                      }
                    },
                    in: {
                      $min: [
                        { $max: [{ $round: ["$$progressPercent", 0] }, 0] },
                        100
                      ]
                    }
                  }
                },
                else: {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$status", "completed"] }, then: 100 },
                      { case: { $eq: ["$status", "pending"] }, then: 0 },
                      { case: { $eq: ["$status", "cancelled"] }, then: 0 }
                    ],
                    default: 0
                  }
                }
              }
            },
            // Calculate time remaining for active rentals
            timeRemaining: {
              $cond: {
                if: { $eq: ["$status", "active"] },
                then: {
                  $let: {
                    vars: {
                      remainingMs: { $subtract: ["$endDateTime", new Date()] },
                      hoursRemaining: { $divide: [{ $subtract: ["$endDateTime", new Date()] }, 1000 * 60 * 60] }
                    },
                    in: {
                      hours: { $max: [{ $round: ["$$hoursRemaining", 1] }, 0] },
                      days: { $max: [{ $floor: { $divide: ["$$hoursRemaining", 24] } }, 0] },
                      totalHours: { $max: [{ $round: ["$$hoursRemaining", 1] }, 0] }
                    }
                  }
                },
                else: null
              }
            },
            // Boarding tasks and progression
            boardingTasks: {
              $cond: {
                if: { $eq: ["$status", "active"] },
                then: {
                  progress: {
                    $let: {
                      vars: {
                        currentTime: new Date(),
                        totalDuration: { $subtract: ["$endDateTime", "$startDateTime"] },
                        elapsed: { $subtract: [new Date(), "$startDateTime"] },
                        progressPercent: {
                          $multiply: [
                            { $divide: ["$elapsed", "$totalDuration"] },
                            100
                          ]
                        }
                      },
                      in: {
                        $min: [
                          { $max: [{ $round: ["$$progressPercent", 0] }, 0] },
                          100
                        ]
                      }
                    }
                  },
                  currentLocation: {
                    // Simulate location based on progress (in real app, this would come from GPS)
                    $switch: {
                      branches: [
                        {
                          case: { $lt: [{ $subtract: [new Date(), "$startDateTime"] }, { $multiply: [{ $subtract: ["$endDateTime", "$startDateTime"] }, 0.5] }] },
                          then: "en route to end location"
                        },
                        {
                          case: { $gte: [{ $subtract: [new Date(), "$startDateTime"] }, { $multiply: [{ $subtract: ["$endDateTime", "$startDateTime"] }, 0.5] }] },
                          then: "returning to start location"
                        }
                      ],
                      default: "at start location"
                    }
                  },
                  nextAction: {
                    $cond: {
                      if: { $lt: [new Date(), { $add: ["$startDateTime", { $multiply: [{ $subtract: ["$endDateTime", "$startDateTime"] }, 0.5] }] }] },
                      then: "heading to drop-off",
                      else: "returning to pickup"
                    }
                  },
                  estimatedReturnTime: "$endDateTime",
                  routeInfo: {
                    startPlace: "$rentalInfo.startLocation",
                    returnPlace: "$rentalInfo.endLocation",
                    startTime: "$startDateTime",
                    endTime: "$endDateTime"
                  }
                },
                else: null
              }
            }
          }
        },
        {
          $project: {
            eventId: '$_id',
            contractNumber: '$contractNumber',
            title: '$vehicleInfo.name',
            vehicleId: '$vehicleInfo.vehicleId',
            vehicleType: 'regular',
            vehicleName: '$vehicleInfo.name',
            vehicleImage: '$vehicleInfo.image',
            vehicleMatricule: '$vehicleInfo.numeroMatricule',
            vehicleBrand: '$vehicleInfo.brand',
            vehicleModel: '$vehicleInfo.model',
            start: '$startDateTime',
            end: '$endDateTime',
            startLocation: '$rentalInfo.startLocation',
            endLocation: '$rentalInfo.endLocation',
            clientName: { $concat: ['$clientInfo.firstName', ' ', '$clientInfo.lastName'] },
            clientPhone: '$clientInfo.phone',
            rentalDays: '$rentalInfo.rentalDays',
            prixTotal: '$rentalInfo.prixTotal',
            status: '$status',
            progress: 1,
            timeRemaining: 1,
            boardingTasks: 1,
            color: {
              $switch: {
                branches: [
                  { case: { $eq: ['$status', 'pending'] }, then: '#FFA500' }, // Orange
                  { case: { $eq: ['$status', 'active'] }, then: '#4CAF50' },   // Green
                  { case: { $eq: ['$status', 'completed'] }, then: '#2196F3' }, // Blue
                  { case: { $eq: ['$status', 'cancelled'] }, then: '#F44336' }  // Red
                ],
                default: '#757575' // Grey
              }
            },
            extendedProps: {
              contractType: 'regular',
              partnerInfo: '$partnerInfo',
              clientInfo: '$clientInfo',
              vehicleInfo: '$vehicleInfo',
              rentalInfo: '$rentalInfo',
              notes: '$notes',
              progress: '$progress',
              timeRemaining: '$timeRemaining',
              boardingTasks: '$boardingTasks'
            }
          }
        },
        {
          $sort: { start: 1 }
        }
      ]);

      console.log(`Found ${regularEvents.length} regular vehicle events`);
      results.events.push(...regularEvents);
    }

    // Get smart car events
    if (vehicleType === 'all' || vehicleType === 'smart') {
      console.log('Fetching smart car calendar events...');

      const matchConditions = {
        $or: [
          { createdBy: new mongoose.Types.ObjectId(userId) },
          { entreprise: entrepriseName }
        ],
        startDate: { $lte: queryEndDate },
        endDate: { $gte: queryStartDate }
      };

      if (vehicleId) {
        matchConditions.smartCarId = new mongoose.Types.ObjectId(vehicleId);
      }

      if (status) {
        matchConditions.status = status;
      } else {
        matchConditions.status = { $in: ['pending', 'active', 'completed'] };
      }

      const smartEvents = await SmartContract.aggregate([
        {
          $match: matchConditions
        },
        {
          $addFields: {
            startDateTime: {
              $cond: {
                if: { $eq: [{ $type: "$startDate" }, "date"] },
                then: "$startDate",
                else: { $toDate: "$startDate" }
              }
            },
            endDateTime: {
              $cond: {
                if: { $eq: [{ $type: "$endDate" }, "date"] },
                then: "$endDate",
                else: { $toDate: "$endDate" }
              }
            }
          }
        },
        {
          $lookup: {
            from: 'smartcars',
            localField: 'smartCarId',
            foreignField: '_id',
            as: 'smartCarDetails'
          }
        },
        {
          $unwind: {
            path: '$smartCarDetails',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            // Calculate rental progress for active rentals
            progress: {
              $cond: {
                if: { $eq: ["$status", "active"] },
                then: {
                  $let: {
                    vars: {
                      totalDuration: { $subtract: ["$endDateTime", "$startDateTime"] },
                      elapsedDuration: { $subtract: [new Date(), "$startDateTime"] },
                      progressPercent: {
                        $multiply: [
                          { $divide: [{ $subtract: [new Date(), "$startDateTime"] }, { $subtract: ["$endDateTime", "$startDateTime"] }] },
                          100
                        ]
                      }
                    },
                    in: {
                      $min: [
                        { $max: [{ $round: ["$$progressPercent", 0] }, 0] },
                        100
                      ]
                    }
                  }
                },
                else: {
                  $switch: {
                    branches: [
                      { case: { $eq: ["$status", "completed"] }, then: 100 },
                      { case: { $eq: ["$status", "pending"] }, then: 0 },
                      { case: { $eq: ["$status", "cancelled"] }, then: 0 }
                    ],
                    default: 0
                  }
                }
              }
            },
            // Calculate time remaining for active rentals
            timeRemaining: {
              $cond: {
                if: { $eq: ["$status", "active"] },
                then: {
                  $let: {
                    vars: {
                      remainingMs: { $subtract: ["$endDateTime", new Date()] },
                      hoursRemaining: { $divide: [{ $subtract: ["$endDateTime", new Date()] }, 1000 * 60 * 60] }
                    },
                    in: {
                      hours: { $max: [{ $round: ["$$hoursRemaining", 1] }, 0] },
                      days: { $max: [{ $floor: { $divide: ["$$hoursRemaining", 24] } }, 0] },
                      totalHours: { $max: [{ $round: ["$$hoursRemaining", 1] }, 0] }
                    }
                  }
                },
                else: null
              }
            },
            // Boarding tasks and progression for smart cars
            boardingTasks: {
              $cond: {
                if: { $eq: ["$status", "active"] },
                then: {
                  progress: {
                    $let: {
                      vars: {
                        currentTime: new Date(),
                        totalDuration: { $subtract: ["$endDateTime", "$startDateTime"] },
                        elapsed: { $subtract: [new Date(), "$startDateTime"] },
                        progressPercent: {
                          $multiply: [
                            { $divide: ["$elapsed", "$totalDuration"] },
                            100
                          ]
                        }
                      },
                      in: {
                        $min: [
                          { $max: [{ $round: ["$$progressPercent", 0] }, 0] },
                          100
                        ]
                      }
                    }
                  },
                  currentLocation: {
                    // For smart cars, we could get real GPS data if available
                    $switch: {
                      branches: [
                        {
                          case: { $lt: [{ $subtract: [new Date(), "$startDateTime"] }, { $multiply: [{ $subtract: ["$endDateTime", "$startDateTime"] }, 0.5] }] },
                          then: "en route to destination"
                        },
                        {
                          case: { $gte: [{ $subtract: [new Date(), "$startDateTime"] }, { $multiply: [{ $subtract: ["$endDateTime", "$startDateTime"] }, 0.5] }] },
                          then: "return journey"
                        }
                      ],
                      default: "at pickup location"
                    }
                  },
                  nextAction: {
                    $cond: {
                      if: { $lt: [new Date(), { $add: ["$startDateTime", { $multiply: [{ $subtract: ["$endDateTime", "$startDateTime"] }, 0.5] }] }] },
                      then: "heading to destination",
                      else: "returning to start"
                    }
                  },
                  estimatedReturnTime: "$endDateTime",
                  routeInfo: {
                    startPlace: "$startLocation",
                    returnPlace: "$endLocation",
                    startTime: "$startDateTime",
                    endTime: "$endDateTime"
                  }
                },
                else: null
              }
            }
          }
        },
        {
          $project: {
            eventId: '$_id',
            contractNumber: '$contractNumber',
            title: { $ifNull: ['$vehicleInfo.nomVehicule', '$smartCarDetails.nomVehicule', 'Smart Car'] },
            vehicleId: '$smartCarId',
            vehicleType: 'smart',
            vehicleName: { $ifNull: ['$vehicleInfo.nomVehicule', '$smartCarDetails.nomVehicule', 'Smart Car'] },
            vehicleImage: { $ifNull: ['$vehicleInfo.imageVehicule.url', '$smartCarDetails.imageVehicule.url', null] },
            vehicleMatricule: { $ifNull: ['$vehicleInfo.numeroMatricule', '$smartCarDetails.numeroMatricule', 'N/A'] },
            vehicleBrand: { $ifNull: ['$smartCarDetails.marque', 'N/A'] },
            vehicleModel: { $ifNull: ['$smartCarDetails.modele', 'N/A'] },
            start: '$startDateTime',
            end: '$endDateTime',
            startLocation: '$startLocation',
            endLocation: '$endLocation',
            clientName: {
              $ifNull: [
                { $concat: ['$clientInfo.firstName', ' ', '$clientInfo.lastName'] },
                { $concat: ['$conducteur.prenom', ' ', '$conducteur.nom'] },
                'N/A'
              ]
            },
            clientPhone: {
              $ifNull: ['$clientInfo.phone', '$conducteur.telephone', 'N/A']
            },
            rentalDays: '$days',
            prixTotal: '$prixTotal',
            status: '$status',
            progress: 1,
            timeRemaining: 1,
            boardingTasks: 1,
            color: {
              $switch: {
                branches: [
                  { case: { $eq: ['$status', 'pending'] }, then: '#FFA500' },
                  { case: { $eq: ['$status', 'active'] }, then: '#4CAF50' },
                  { case: { $eq: ['$status', 'completed'] }, then: '#2196F3' },
                  { case: { $eq: ['$status', 'cancelled'] }, then: '#F44336' }
                ],
                default: '#757575'
              }
            },
            extendedProps: {
              contractType: 'smart',
              entrepriseInfo: '$entrepriseInfo',
              clientInfo: '$clientInfo',
              vehicleInfo: '$vehicleInfo',
              startLocation: '$startLocation',
              endLocation: '$endLocation',
              days: '$days',
              prixTotal: '$prixTotal',
              notes: '$notes',
              conducteur: '$conducteur',
              progress: '$progress',
              timeRemaining: '$timeRemaining',
              boardingTasks: '$boardingTasks'
            }
          }
        },
        {
          $sort: { start: 1 }
        }
      ]);

      console.log(`Found ${smartEvents.length} smart car events`);
      results.events.push(...smartEvents);
    }

    // Get user's vehicle list for filter dropdown
    await getUserVehiclesList(userId, results);

    // Calculate summary statistics
    results.summary = calculateCalendarSummary(results.events);

    // Add boarding tasks summary
    results.summary.boardingTasks = {
      activeTrips: results.events.filter(e => e.status === 'active' && e.boardingTasks).length,
      inProgress: results.events.filter(e => e.status === 'active' && e.boardingTasks && e.boardingTasks.progress < 50).length,
      returning: results.events.filter(e => e.status === 'active' && e.boardingTasks && e.boardingTasks.progress >= 50).length
    };

    return {
      success: true,
      userId,
      dateRange: {
        start: queryStartDate,
        end: queryEndDate,
        days: Math.ceil((queryEndDate - queryStartDate) / (1000 * 60 * 60 * 24))
      },
      totalEvents: results.events.length,
      events: results.events,
      vehicles: results.vehicles,
      summary: results.summary
    };
  } catch (error) {
    console.error('Error getting user calendar events:', error);
    throw error;
  }
};

/**
 * Get user's vehicle list for calendar filters
 */
const getUserVehiclesList = async (userId, results) => {
  try {
    // Get regular vehicles
    const regularVehicles = await Vehicle.find({ partnerId: userId })
      .select('_id name image type brand model year numeroMatricule status')
      .lean();

    // Get smart cars
    const smartCars = await SmartCar.find({ userId: userId })
      .select('_id nomVehicule imageVehicule typeVehicule marque modele annee numeroMatricule status')
      .lean();

    results.vehicles = [
      ...regularVehicles.map(v => ({
        id: v._id,
        name: v.name,
        type: 'regular',
        vehicleType: v.type,
        image: v.image,
        brand: v.brand,
        model: v.model,
        year: v.year,
        matricule: v.numeroMatricule,
        status: v.status
      })),
      ...smartCars.map(v => ({
        id: v._id,
        name: v.nomVehicule,
        type: 'smart',
        vehicleType: v.typeVehicule,
        image: v.imageVehicule?.url,
        brand: v.marque,
        model: v.modele,
        year: v.annee,
        matricule: v.numeroMatricule,
        status: v.status
      }))
    ];

    console.log(`Found ${results.vehicles.length} vehicles for user`);
  } catch (error) {
    console.error('Error getting user vehicles list:', error);
  }
};

/**
 * Calculate calendar summary statistics
 */
const calculateCalendarSummary = (events) => {
  const summary = {
    totalEvents: events.length,
    activeRentals: 0,
    pendingRentals: 0,
    completedRentals: 0,
    totalRevenue: 0,
    totalRentalDays: 0,
    byVehicleType: {
      regular: 0,
      smart: 0
    },
    byStatus: {
      pending: 0,
      active: 0,
      completed: 0,
      cancelled: 0
    }
  };

  events.forEach(event => {
    summary.totalRevenue += event.prixTotal || 0;
    summary.totalRentalDays += event.rentalDays || 0;
    summary.byVehicleType[event.vehicleType] = (summary.byVehicleType[event.vehicleType] || 0) + 1;
    summary.byStatus[event.status] = (summary.byStatus[event.status] || 0) + 1;

    if (event.status === 'active') summary.activeRentals++;
    if (event.status === 'pending') summary.pendingRentals++;
    if (event.status === 'completed') summary.completedRentals++;
  });

  return summary;
};

/**
 * Get calendar events (Controller)
 */
const getCalendarEvents = async (req, res) => {
  try {
    const userId = req.user._id;
    const { start, end, vehicleType, vehicleId, status } = req.query;

    console.log(`Calendar request from user: ${userId}`);

    const filters = {
      startDate: start,
      endDate: end,
      vehicleType,
      vehicleId,
      status
    };

    const calendarData = await getUserCalendarEvents(userId, filters);

    res.json({
      success: true,
      data: calendarData
    });
  } catch (error) {
    console.error('Error getting calendar events:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching calendar events',
      error: error.message
    });
  }
};

/**
 * Get vehicle boarding tasks and progression
 */
const getVehicleBoardingTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contractId, contractType } = req.params;

    if (!contractId || !contractType) {
      return res.status(400).json({
        success: false,
        message: 'Contract ID and type are required'
      });
    }

    console.log(`Getting boarding tasks for contract: ${contractId}, type: ${contractType}`);

    let boardingTasks = null;
    let contractDetails = null;

    if (contractType === 'regular') {
      const contract = await Contract.findOne({
        _id: contractId,
        'partnerInfo.partnerId': userId
      }).lean();

      if (contract) {
        contractDetails = contract;
        
        // Calculate progress for active contracts
        const now = new Date();
        const startDate = new Date(contract.rentalInfo.startDateTime);
        const endDate = new Date(contract.rentalInfo.endDateTime);
        
        let progress = 0;
        let timeRemaining = null;
        
        if (contract.status === 'active') {
          const totalDuration = endDate - startDate;
          const elapsed = now - startDate;
          progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
          
          const hoursRemaining = (endDate - now) / (1000 * 60 * 60);
          timeRemaining = {
            hours: Math.max(0, Math.round(hoursRemaining * 10) / 10),
            days: Math.max(0, Math.floor(hoursRemaining / 24)),
            totalHours: Math.max(0, Math.round(hoursRemaining * 10) / 10)
          };
        } else if (contract.status === 'completed') {
          progress = 100;
        }

        boardingTasks = {
          contractId: contract._id,
          contractNumber: contract.contractNumber,
          contractType: 'regular',
          status: contract.status,
          progress: Math.round(progress),
          timeRemaining,
          currentLocation: contract.status === 'active' ? 
            (progress < 50 ? 'en route to drop-off' : 'returning to pickup') : 
            null,
          nextAction: contract.status === 'active' ?
            (progress < 50 ? 'heading to drop-off' : 'returning to pickup') :
            null,
          estimatedReturnTime: contract.rentalInfo.endDateTime,
          routeInfo: {
            startPlace: contract.rentalInfo.startLocation,
            returnPlace: contract.rentalInfo.endLocation,
            startTime: contract.rentalInfo.startDateTime,
            endTime: contract.rentalInfo.endDateTime
          },
          vehicleInfo: {
            id: contract.vehicleInfo.vehicleId,
            name: contract.vehicleInfo.name,
            image: contract.vehicleInfo.image,
            matricule: contract.vehicleInfo.numeroMatricule
          },
          clientInfo: {
            name: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
            phone: contract.clientInfo.phone
          },
          timeline: [
            {
              step: 1,
              name: 'Pickup',
              location: contract.rentalInfo.startLocation,
              time: contract.rentalInfo.startDateTime,
              completed: contract.status !== 'pending'
            },
            {
              step: 2,
              name: 'In Transit',
              location: 'On the road',
              time: null,
              completed: contract.status === 'active' && progress > 0,
              inProgress: contract.status === 'active'
            },
            {
              step: 3,
              name: 'Drop-off',
              location: contract.rentalInfo.endLocation,
              time: null,
              completed: contract.status === 'active' && progress >= 50
            },
            {
              step: 4,
              name: 'Return',
              location: contract.rentalInfo.startLocation,
              time: contract.rentalInfo.endDateTime,
              completed: contract.status === 'completed'
            }
          ]
        };
      }
    } else if (contractType === 'smart') {
      // Get user details for smart contract filtering
      const user = await mongoose.model('User').findById(userId).lean();
      const entrepriseName = user?.entreprise || '';

      const contract = await SmartContract.findOne({
        _id: contractId,
        $or: [
          { createdBy: userId },
          { entreprise: entrepriseName }
        ]
      }).lean();

      if (contract) {
        contractDetails = contract;
        
        // Calculate progress for active contracts
        const now = new Date();
        const startDate = new Date(contract.startDate);
        const endDate = new Date(contract.endDate);
        
        let progress = 0;
        let timeRemaining = null;
        
        if (contract.status === 'active') {
          const totalDuration = endDate - startDate;
          const elapsed = now - startDate;
          progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
          
          const hoursRemaining = (endDate - now) / (1000 * 60 * 60);
          timeRemaining = {
            hours: Math.max(0, Math.round(hoursRemaining * 10) / 10),
            days: Math.max(0, Math.floor(hoursRemaining / 24)),
            totalHours: Math.max(0, Math.round(hoursRemaining * 10) / 10)
          };
        } else if (contract.status === 'completed') {
          progress = 100;
        }

        boardingTasks = {
          contractId: contract._id,
          contractNumber: contract.contractNumber,
          contractType: 'smart',
          status: contract.status,
          progress: Math.round(progress),
          timeRemaining,
          currentLocation: contract.status === 'active' ? 
            (progress < 50 ? 'en route to destination' : 'return journey') : 
            null,
          nextAction: contract.status === 'active' ?
            (progress < 50 ? 'heading to destination' : 'returning to start') :
            null,
          estimatedReturnTime: contract.endDate,
          routeInfo: {
            startPlace: contract.startLocation,
            returnPlace: contract.endLocation,
            startTime: contract.startDate,
            endTime: contract.endDate
          },
          vehicleInfo: {
            id: contract.smartCarId,
            name: contract.vehicleInfo?.nomVehicule || 'Smart Car',
            image: contract.vehicleInfo?.imageVehicule?.url,
            matricule: contract.vehicleInfo?.numeroMatricule
          },
          clientInfo: contract.clientInfo ? {
            name: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
            phone: contract.clientInfo.phone
          } : contract.conducteur ? {
            name: `${contract.conducteur.prenom} ${contract.conducteur.nom}`,
            phone: contract.conducteur.telephone
          } : null,
          timeline: [
            {
              step: 1,
              name: 'Pickup',
              location: contract.startLocation,
              time: contract.startDate,
              completed: contract.status !== 'pending'
            },
            {
              step: 2,
              name: 'In Transit',
              location: 'On the road',
              time: null,
              completed: contract.status === 'active' && progress > 0,
              inProgress: contract.status === 'active'
            },
            {
              step: 3,
              name: 'Destination',
              location: contract.endLocation,
              time: null,
              completed: contract.status === 'active' && progress >= 50
            },
            {
              step: 4,
              name: 'Return',
              location: contract.startLocation,
              time: contract.endDate,
              completed: contract.status === 'completed'
            }
          ]
        };
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid contract type'
      });
    }

    if (!boardingTasks) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found or not authorized'
      });
    }

    res.json({
      success: true,
      data: boardingTasks
    });
  } catch (error) {
    console.error('Error getting vehicle boarding tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching boarding tasks',
      error: error.message
    });
  }
};

/**
 * Update vehicle boarding status (for real-time updates)
 */
const updateBoardingStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contractId, contractType } = req.params;
    const { currentLocation, progress, status } = req.body;

    if (!contractId || !contractType) {
      return res.status(400).json({
        success: false,
        message: 'Contract ID and type are required'
      });
    }

    console.log(`Updating boarding status for contract: ${contractId}`);

    // In a real application, this would update the vehicle's current location in real-time
    // For now, we'll just acknowledge the update
    
    // Get the contract to verify ownership
    let contract = null;
    
    if (contractType === 'regular') {
      contract = await Contract.findOne({
        _id: contractId,
        'partnerInfo.partnerId': userId
      });
    } else if (contractType === 'smart') {
      const user = await mongoose.model('User').findById(userId).lean();
      const entrepriseName = user?.entreprise || '';
      
      contract = await SmartContract.findOne({
        _id: contractId,
        $or: [
          { createdBy: userId },
          { entreprise: entrepriseName }
        ]
      });
    }

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found or not authorized'
      });
    }

    // Here you would typically update the vehicle's real-time location in your database
    // For example, if you have a real-time tracking system:
    // await VehicleLocation.updateOne(
    //   { contractId, vehicleId: contract.vehicleId },
    //   { currentLocation, updatedAt: new Date() },
    //   { upsert: true }
    // );

    res.json({
      success: true,
      message: 'Boarding status updated successfully',
      data: {
        contractId,
        contractType,
        updatedAt: new Date(),
        receivedData: {
          currentLocation,
          progress,
          status
        }
      }
    });
  } catch (error) {
    console.error('Error updating boarding status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating boarding status',
      error: error.message
    });
  }
};

/**
 * Get all active boarding tasks for dashboard
 */
const getActiveBoardingTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 10 } = req.query;

    console.log(`Getting active boarding tasks for user: ${userId}`);

    // Get user details for smart contract filtering
    const user = await mongoose.model('User').findById(userId).lean();
    const entrepriseName = user?.entreprise || '';

    // Get active regular contracts
    const activeRegular = await Contract.find({
      'partnerInfo.partnerId': userId,
      status: 'active'
    })
    .select('contractNumber vehicleInfo.name vehicleInfo.image rentalInfo.startDateTime rentalInfo.endDateTime rentalInfo.startLocation rentalInfo.endLocation clientInfo')
    .sort({ 'rentalInfo.endDateTime': 1 })
    .limit(parseInt(limit))
    .lean();

    // Get active smart contracts
    const activeSmart = await SmartContract.find({
      $or: [
        { createdBy: userId },
        { entreprise: entrepriseName }
      ],
      status: 'active'
    })
    .select('contractNumber vehicleInfo.nomVehicule vehicleInfo.imageVehicule startDate endDate startLocation endLocation clientInfo conducteur')
    .sort({ endDate: 1 })
    .limit(parseInt(limit))
    .lean();

    // Process and calculate progress for each active contract
    const activeTasks = [
      ...activeRegular.map(contract => {
        const now = new Date();
        const start = new Date(contract.rentalInfo.startDateTime);
        const end = new Date(contract.rentalInfo.endDateTime);
        const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
        const hoursRemaining = (end - now) / (1000 * 60 * 60);
        
        return {
          id: contract._id,
          contractNumber: contract.contractNumber,
          type: 'regular',
          vehicleName: contract.vehicleInfo.name,
          vehicleImage: contract.vehicleInfo.image,
          progress: Math.round(progress),
          timeRemaining: {
            hours: Math.max(0, Math.round(hoursRemaining * 10) / 10),
            days: Math.max(0, Math.floor(hoursRemaining / 24))
          },
          currentLocation: progress < 50 ? 'Heading to drop-off' : 'Returning to pickup',
          route: {
            from: contract.rentalInfo.startLocation,
            to: contract.rentalInfo.endLocation
          },
          clientName: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
          endTime: contract.rentalInfo.endDateTime
        };
      }),
      ...activeSmart.map(contract => {
        const now = new Date();
        const start = new Date(contract.startDate);
        const end = new Date(contract.endDate);
        const progress = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
        const hoursRemaining = (end - now) / (1000 * 60 * 60);
        
        return {
          id: contract._id,
          contractNumber: contract.contractNumber,
          type: 'smart',
          vehicleName: contract.vehicleInfo?.nomVehicule || 'Smart Car',
          vehicleImage: contract.vehicleInfo?.imageVehicule?.url,
          progress: Math.round(progress),
          timeRemaining: {
            hours: Math.max(0, Math.round(hoursRemaining * 10) / 10),
            days: Math.max(0, Math.floor(hoursRemaining / 24))
          },
          currentLocation: progress < 50 ? 'Heading to destination' : 'Return journey',
          route: {
            from: contract.startLocation,
            to: contract.endLocation
          },
          clientName: contract.clientInfo ? 
            `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}` :
            contract.conducteur ? 
            `${contract.conducteur.prenom} ${contract.conducteur.nom}` : 'N/A',
          endTime: contract.endDate
        };
      })
    ].sort((a, b) => a.timeRemaining.hours - b.timeRemaining.hours)
     .slice(0, parseInt(limit));

    // Calculate summary
    const summary = {
      totalActive: activeTasks.length,
      inTransit: activeTasks.filter(t => t.progress < 50).length,
      returning: activeTasks.filter(t => t.progress >= 50).length,
      endingToday: activeTasks.filter(t => {
        const endDate = new Date(t.endTime);
        const today = new Date();
        return endDate.toDateString() === today.toDateString();
      }).length,
      endingTomorrow: activeTasks.filter(t => {
        const endDate = new Date(t.endTime);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return endDate.toDateString() === tomorrow.toDateString();
      }).length
    };

    res.json({
      success: true,
      data: {
        summary,
        activeTasks,
        total: activeTasks.length
      }
    });
  } catch (error) {
    console.error('Error getting active boarding tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active boarding tasks',
      error: error.message
    });
  }
};

/**
 * Get vehicle availability for specific date range
 */
const getVehicleAvailability = async (req, res) => {
  try {
    const userId = req.user._id;
    const { startDate, endDate, vehicleId, vehicleType } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: 'Start date and end date are required'
      });
    }

    const queryStartDate = new Date(startDate);
    const queryEndDate = new Date(endDate);

    console.log(`Checking vehicle availability for user: ${userId}`);
    console.log(`Date range: ${queryStartDate} to ${queryEndDate}`);

    const availability = {
      isAvailable: true,
      conflictingEvents: [],
      vehicleInfo: null
    };

    // Get user details for smart contract filtering
    const user = await mongoose.model('User').findById(userId).lean();
    const entrepriseName = user?.entreprise || '';

    let vehicleInfo = null;

    // Check regular vehicle availability
    if (vehicleType === 'regular' || !vehicleType) {
      vehicleInfo = await Vehicle.findOne({
        _id: vehicleId,
        partnerId: userId
      }).lean();

      if (vehicleInfo) {
        const conflictingContracts = await Contract.find({
          'partnerInfo.partnerId': userId,
          'vehicleInfo.vehicleId': vehicleId,
          status: { $in: ['pending', 'active'] },
          $or: [
            {
              'rentalInfo.startDateTime': { $lte: queryEndDate },
              'rentalInfo.endDateTime': { $gte: queryStartDate }
            }
          ]
        })
        .select('contractNumber rentalInfo.startDateTime rentalInfo.endDateTime clientInfo status')
        .lean();

        availability.vehicleInfo = {
          id: vehicleInfo._id,
          name: vehicleInfo.name,
          type: 'regular',
          image: vehicleInfo.image,
          matricule: vehicleInfo.numeroMatricule
        };

        if (conflictingContracts.length > 0) {
          availability.isAvailable = false;
          availability.conflictingEvents = conflictingContracts.map(contract => ({
            contractNumber: contract.contractNumber,
            startDate: contract.rentalInfo.startDateTime,
            endDate: contract.rentalInfo.endDateTime,
            clientName: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
            status: contract.status
          }));
        }
      }
    }

    // Check smart car availability
    if ((vehicleType === 'smart' || !vehicleType) && !vehicleInfo) {
      vehicleInfo = await SmartCar.findOne({
        _id: vehicleId,
        userId: userId
      }).lean();

      if (vehicleInfo) {
        const conflictingContracts = await SmartContract.find({
          $or: [
            { createdBy: userId },
            { entreprise: entrepriseName }
          ],
          smartCarId: vehicleId,
          status: { $in: ['pending', 'active'] },
          $or: [
            {
              startDate: { $lte: queryEndDate },
              endDate: { $gte: queryStartDate }
            }
          ]
        })
        .select('contractNumber startDate endDate clientInfo status')
        .lean();

        availability.vehicleInfo = {
          id: vehicleInfo._id,
          name: vehicleInfo.nomVehicule,
          type: 'smart',
          image: vehicleInfo.imageVehicule?.url,
          matricule: vehicleInfo.numeroMatricule
        };

        if (conflictingContracts.length > 0) {
          availability.isAvailable = false;
          availability.conflictingEvents = conflictingContracts.map(contract => ({
            contractNumber: contract.contractNumber,
            startDate: contract.startDate,
            endDate: contract.endDate,
            clientName: contract.clientInfo ? 
              `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}` : 'N/A',
            status: contract.status
          }));
        }
      }
    }

    if (!availability.vehicleInfo) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found or not owned by user'
      });
    }

    res.json({
      success: true,
      data: availability
    });
  } catch (error) {
    console.error('Error checking vehicle availability:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking vehicle availability',
      error: error.message
    });
  }
};

/**
 * Get upcoming rentals for dashboard
 */
const getUpcomingRentals = async (req, res) => {
  try {
    const userId = req.user._id;
    const { limit = 10 } = req.query;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log(`Getting upcoming rentals for user: ${userId}`);

    // Get user details for smart contract filtering
    const user = await mongoose.model('User').findById(userId).lean();
    const entrepriseName = user?.entreprise || '';

    // Get upcoming regular contracts
    const upcomingRegular = await Contract.find({
      'partnerInfo.partnerId': userId,
      status: { $in: ['pending', 'active'] },
      'rentalInfo.startDateTime': { $gte: today }
    })
    .select('contractNumber vehicleInfo.name vehicleInfo.image rentalInfo.startDateTime rentalInfo.endDateTime rentalInfo.startLocation clientInfo status')
    .sort({ 'rentalInfo.startDateTime': 1 })
    .limit(parseInt(limit))
    .lean();

    // Get upcoming smart contracts
    const upcomingSmart = await SmartContract.find({
      $or: [
        { createdBy: userId },
        { entreprise: entrepriseName }
      ],
      status: { $in: ['pending', 'active'] },
      startDate: { $gte: today }
    })
    .select('contractNumber vehicleInfo.nomVehicule vehicleInfo.imageVehicule startDate endDate startLocation clientInfo status')
    .sort({ startDate: 1 })
    .limit(parseInt(limit))
    .lean();

    // Combine and format results
    const upcomingRentals = [
      ...upcomingRegular.map(contract => ({
        id: contract._id,
        contractNumber: contract.contractNumber,
        type: 'regular',
        vehicleName: contract.vehicleInfo.name,
        vehicleImage: contract.vehicleInfo.image,
        startDate: contract.rentalInfo.startDateTime,
        endDate: contract.rentalInfo.endDateTime,
        startLocation: contract.rentalInfo.startLocation,
        clientName: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
        status: contract.status,
        daysUntil: Math.ceil((new Date(contract.rentalInfo.startDateTime) - today) / (1000 * 60 * 60 * 24))
      })),
      ...upcomingSmart.map(contract => ({
        id: contract._id,
        contractNumber: contract.contractNumber,
        type: 'smart',
        vehicleName: contract.vehicleInfo?.nomVehicule || 'Smart Car',
        vehicleImage: contract.vehicleInfo?.imageVehicule?.url,
        startDate: contract.startDate,
        endDate: contract.endDate,
        startLocation: contract.startLocation,
        clientName: contract.clientInfo ? 
          `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}` : 'N/A',
        status: contract.status,
        daysUntil: Math.ceil((new Date(contract.startDate) - today) / (1000 * 60 * 60 * 24))
      }))
    ].sort((a, b) => a.daysUntil - b.daysUntil)
     .slice(0, parseInt(limit));

    res.json({
      success: true,
      data: {
        total: upcomingRentals.length,
        upcomingRentals,
        summary: {
          today: upcomingRentals.filter(r => r.daysUntil === 0).length,
          tomorrow: upcomingRentals.filter(r => r.daysUntil === 1).length,
          thisWeek: upcomingRentals.filter(r => r.daysUntil <= 7).length
        }
      }
    });
  } catch (error) {
    console.error('Error getting upcoming rentals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching upcoming rentals',
      error: error.message
    });
  }
};

/**
 * Get rental details for specific contract
 */
const getRentalDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { contractId, contractType } = req.params;

    if (!contractId || !contractType) {
      return res.status(400).json({
        success: false,
        message: 'Contract ID and type are required'
      });
    }

    console.log(`Getting rental details for contract: ${contractId}, type: ${contractType}`);

    let rentalDetails = null;

    if (contractType === 'regular') {
      const contract = await Contract.findOne({
        _id: contractId,
        'partnerInfo.partnerId': userId
      }).lean();

      if (contract) {
        rentalDetails = {
          contractId: contract._id,
          contractNumber: contract.contractNumber,
          type: 'regular',
          status: contract.status,
          dates: {
            start: contract.rentalInfo.startDateTime,
            end: contract.rentalInfo.endDateTime,
            rentalDays: contract.rentalInfo.rentalDays
          },
          locations: {
            pickup: contract.rentalInfo.startLocation,
            dropoff: contract.rentalInfo.endLocation
          },
          vehicle: {
            id: contract.vehicleInfo.vehicleId,
            name: contract.vehicleInfo.name,
            image: contract.vehicleInfo.image,
            type: contract.vehicleInfo.type,
            brand: contract.vehicleInfo.brand,
            model: contract.vehicleInfo.model,
            matricule: contract.vehicleInfo.numeroMatricule
          },
          client: {
            name: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
            phone: contract.clientInfo.phone,
            cin: contract.clientInfo.cin,
            license: contract.clientInfo.licenseNumber
          },
          pricing: {
            dailyRate: contract.rentalInfo.prixParJour,
            total: contract.rentalInfo.prixTotal
          },
          documents: contract.documents || [],
          notes: contract.notes || ''
        };
      }
    } else if (contractType === 'smart') {
      // Get user details for smart contract filtering
      const user = await mongoose.model('User').findById(userId).lean();
      const entrepriseName = user?.entreprise || '';

      const contract = await SmartContract.findOne({
        _id: contractId,
        $or: [
          { createdBy: userId },
          { entreprise: entrepriseName }
        ]
      }).lean();

      if (contract) {
        rentalDetails = {
          contractId: contract._id,
          contractNumber: contract.contractNumber,
          type: 'smart',
          status: contract.status,
          dates: {
            start: contract.startDate,
            end: contract.endDate,
            rentalDays: contract.days
          },
          locations: {
            pickup: contract.startLocation,
            dropoff: contract.endLocation
          },
          vehicle: {
            id: contract.smartCarId,
            name: contract.vehicleInfo?.nomVehicule,
            image: contract.vehicleInfo?.imageVehicule?.url,
            type: contract.vehicleInfo?.typeVehicule,
            matricule: contract.vehicleInfo?.numeroMatricule
          },
          client: contract.clientInfo ? {
            name: `${contract.clientInfo.firstName} ${contract.clientInfo.lastName}`,
            phone: contract.clientInfo.phone,
            cin: contract.clientInfo.cin,
            license: contract.clientInfo.licenseNumber
          } : {
            name: `${contract.conducteur?.prenom} ${contract.conducteur?.nom}`,
            phone: contract.conducteur?.telephone,
            cin: contract.conducteur?.cin,
            license: contract.conducteur?.permis
          },
          pricing: {
            total: contract.prixTotal
          },
          notes: contract.notes || ''
        };
      }
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid contract type'
      });
    }

    if (!rentalDetails) {
      return res.status(404).json({
        success: false,
        message: 'Contract not found or not authorized'
      });
    }

    res.json({
      success: true,
      data: rentalDetails
    });
  } catch (error) {
    console.error('Error getting rental details:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rental details',
      error: error.message
    });
  }
};

/**
 * Export calendar data
 */
const exportCalendarData = async (req, res) => {
  try {
    const userId = req.user._id;
    const { format = 'json', start, end } = req.query;

    const filters = {
      startDate: start,
      endDate: end,
      vehicleType: 'all'
    };

    const calendarData = await getUserCalendarEvents(userId, filters);

    if (format === 'csv') {
      const csvData = convertCalendarToCSV(calendarData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=calendar-data-${Date.now()}.csv`);
      return res.send(csvData);
    }

    if (format === 'ics') {
      const icsData = generateICSCalendar(calendarData);
      res.setHeader('Content-Type', 'text/calendar');
      res.setHeader('Content-Disposition', `attachment; filename=calendar-${Date.now()}.ics`);
      return res.send(icsData);
    }

    // Default JSON response
    res.json({
      success: true,
      data: calendarData,
      exportInfo: {
        exportedAt: new Date(),
        events: calendarData.totalEvents,
        format: 'json'
      }
    });
  } catch (error) {
    console.error('Error exporting calendar data:', error);
    res.status(500).json({
      success: false,
      message: 'Error exporting calendar data',
      error: error.message
    });
  }
};

/**
 * Convert calendar data to CSV format
 */
const convertCalendarToCSV = (calendarData) => {
  const headers = [
    'Contract Type', 'Contract Number', 'Vehicle Name', 'Vehicle Type',
    'Matricule', 'Start Date', 'End Date', 'Start Location', 'End Location',
    'Client Name', 'Client Phone', 'Rental Days', 'Total Price', 'Status',
    'Progress %', 'Time Remaining (hours)'
  ];

  const rows = calendarData.events.map(event => [
    event.vehicleType === 'regular' ? 'Regular' : 'Smart',
    event.contractNumber || 'N/A',
    event.vehicleName,
    event.vehicleType,
    event.vehicleMatricule || 'N/A',
    event.start,
    event.end,
    event.startLocation,
    event.endLocation,
    event.clientName,
    event.clientPhone,
    event.rentalDays,
    event.prixTotal,
    event.status,
    event.progress || 0,
    event.timeRemaining?.hours || 0
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => 
      typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell
    ).join(','))
  ].join('\n');

  return csvContent;
};

/**
 * Generate ICS calendar file
 */
const generateICSCalendar = (calendarData) => {
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vehicle Rental Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH'
  ].join('\r\n') + '\r\n';

  calendarData.events.forEach((event, index) => {
    const eventId = `event_${index}_${Date.now()}`;
    const startDate = formatDateForICS(event.start);
    const endDate = formatDateForICS(event.end);
    
    icsContent += [
      'BEGIN:VEVENT',
      `UID:${eventId}`,
      `DTSTAMP:${formatDateForICS(new Date())}`,
      `DTSTART:${startDate}`,
      `DTEND:${endDate}`,
      `SUMMARY:${event.vehicleName} - ${event.clientName}`,
      `DESCRIPTION:Location départ: ${event.startLocation}\\nLocation retour: ${event.endLocation}\\nContrat: ${event.contractNumber}\\nProgress: ${event.progress || 0}%`,
      `LOCATION:${event.startLocation}`,
      `STATUS:${event.status.toUpperCase()}`,
      `CATEGORIES:${event.vehicleType.toUpperCase()}`,
      'END:VEVENT'
    ].join('\r\n') + '\r\n';
  });

  icsContent += 'END:VCALENDAR';

  return icsContent;
};

/**
 * Format date for ICS
 */
const formatDateForICS = (date) => {
  const d = new Date(date);
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};

module.exports = {
  getCalendarEvents,
  getVehicleAvailability,
  getUpcomingRentals,
  getRentalDetails,
  exportCalendarData,
  getVehicleBoardingTasks,
  updateBoardingStatus,
  getActiveBoardingTasks
};