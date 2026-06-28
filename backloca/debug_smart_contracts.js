// debug_smart_contracts.js
const mongoose = require('mongoose');
const SmartContract = require('./models/SmartContract');
const SmartCar = require('./models/SmartCar');

async function debugSmartContracts() {
  await mongoose.connect('mongodb://localhost:27017/yourdb');
  
  const startDate = new Date('2026-01-01');
  const endDate = new Date('2026-01-31');
  
  console.log('=== DEBUG SMART CONTRACTS ===');
  
  // 1. Check all smart cars
  const smartCars = await SmartCar.find({});
  console.log(`Total Smart Cars: ${smartCars.length}`);
  console.log('Smart Cars:', smartCars.map(c => ({
    id: c._id,
    nomVehicule: c.nomVehicule,
    userId: c.userId
  })));
  
  // 2. Check all smart contracts
  const allContracts = await SmartContract.find({});
  console.log(`\nTotal Smart Contracts: ${allContracts.length}`);
  
  // 3. Check contracts in date range
  const contractsInRange = await SmartContract.find({
    status: { $in: ['active', 'completed'] },
    startDate: { $lte: endDate },
    endDate: { $gte: startDate }
  });
  
  console.log(`\nContracts in Jan 2026: ${contractsInRange.length}`);
  console.log('Contracts Details:', contractsInRange.map(c => ({
    contractNumber: c.contractNumber,
    startDate: c.startDate,
    endDate: c.endDate,
    prixTotal: c.prixTotal,
    entreprise: c.entreprise,
    smartCarId: c.smartCarId
  })));
  
  // 4. Test aggregation
  const stats = await SmartContract.aggregate([
    {
      $match: {
        status: { $in: ['active', 'completed'] },
        startDate: { $lte: endDate },
        endDate: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: null,
        totalRentalDays: {
          $sum: {
            $ceil: {
              $divide: [
                { $subtract: ['$endDate', '$startDate'] },
                1000 * 60 * 60 * 24
              ]
            }
          }
        },
        totalRevenue: { $sum: '$prixTotal' },
        totalContracts: { $sum: 1 },
        uniqueVehicles: { $addToSet: '$smartCarId' }
      }
    },
    {
      $project: {
        totalRentalDays: 1,
        totalRevenue: 1,
        totalContracts: 1,
        uniqueVehiclesCount: { $size: '$uniqueVehicles' }
      }
    }
  ]);
  
  console.log('\nAggregation Results:', stats);
  
  mongoose.disconnect();
}

debugSmartContracts().catch(console.error);
