// jobs/maintenanceCheck.js
const cron = require('node-cron');
const Vehicle = require('../models/Vehicle');

class MaintenanceCheckJob {
  
  static async checkAllVehicles() {
    try {
      console.log('🔧 Début de la vérification de maintenance pour tous les véhicules...');
      
      const vehicles = await Vehicle.find({
        currentKilometer: { $gt: 0 }
      });
      
      let totalNotifications = 0;
      
      for (const vehicle of vehicles) {
        const beforeCheck = vehicle.maintenanceNotifications.filter(n => !n.resolved).length;
        
        // Check maintenance thresholds
        vehicle.checkMaintenanceThresholds();
        
        const afterCheck = vehicle.maintenanceNotifications.filter(n => !n.resolved).length;
        const newNotifications = afterCheck - beforeCheck;
        
        if (newNotifications > 0) {
          totalNotifications += newNotifications;
          await vehicle.save();
          
          // Log the notification
          console.log(`🚗 ${vehicle.name}: ${newNotifications} nouvelle(s) notification(s) de maintenance`);
        }
      }
      
      console.log(`✅ Vérification terminée. ${totalNotifications} nouvelle(s) notification(s) générée(s).`);
      return totalNotifications;
      
    } catch (error) {
      console.error('❌ Erreur lors de la vérification de maintenance:', error);
      return 0;
    }
  }
  
  static async checkVehiclesForPartner(partnerId) {
    try {
      const vehicles = await Vehicle.find({
        partnerId: partnerId,
        currentKilometer: { $gt: 0 }
      });
      
      let totalNotifications = 0;
      
      for (const vehicle of vehicles) {
        const beforeCheck = vehicle.maintenanceNotifications.filter(n => !n.resolved).length;
        
        vehicle.checkMaintenanceThresholds();
        
        const afterCheck = vehicle.maintenanceNotifications.filter(n => !n.resolved).length;
        const newNotifications = afterCheck - beforeCheck;
        
        if (newNotifications > 0) {
          totalNotifications += newNotifications;
          await vehicle.save();
        }
      }
      
      return totalNotifications;
      
    } catch (error) {
      console.error('Erreur vérification maintenance partenaire:', error);
      return 0;
    }
  }
  
  static async sendDailyNotifications() {
    try {
      console.log('📅 Envoi des notifications de maintenance quotidiennes...');
      
      const vehiclesDue = await Vehicle.find({
        currentKilometer: { $gt: 0 },
        $or: [
          { maintenanceStatus: 'overdue' },
          { maintenanceStatus: 'due_soon' }
        ]
      });
      
      if (vehiclesDue.length === 0) {
        console.log('✅ Aucun véhicule nécessite de maintenance aujourd\'hui.');
        return [];
      }
      
      // Group vehicles by partner
      const vehiclesByPartner = {};
      vehiclesDue.forEach(vehicle => {
        const partnerId = vehicle.partnerId.toString();
        if (!vehiclesByPartner[partnerId]) {
          vehiclesByPartner[partnerId] = [];
        }
        vehiclesByPartner[partnerId].push(vehicle);
      });
      
      // Here you would send notifications to each partner
      // For now, we'll just log them
      Object.keys(vehiclesByPartner).forEach(partnerId => {
        const vehicles = vehiclesByPartner[partnerId];
        console.log(`📨 Partenaire ${partnerId}: ${vehicles.length} véhicule(s) nécessite(nt) une maintenance`);
        
        vehicles.forEach(vehicle => {
          console.log(`   - ${vehicle.name}: ${vehicle.currentKilometer} km, Prochaine maintenance: ${vehicle.nextMaintenanceKm} km`);
        });
      });
      
      console.log(`✅ ${vehiclesDue.length} véhicule(s) notifié(s) pour maintenance.`);
      return vehiclesDue;
      
    } catch (error) {
      console.error('❌ Erreur envoi notifications quotidiennes:', error);
      return [];
    }
  }
}

// Schedule daily check at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('⏰ Déclenchement du job de maintenance quotidien...');
  await MaintenanceCheckJob.checkAllVehicles();
  await MaintenanceCheckJob.sendDailyNotifications();
});

// Schedule hourly check for overdue vehicles
cron.schedule('0 * * * *', async () => {
  const overdueVehicles = await Vehicle.find({
    maintenanceStatus: 'overdue',
    'maintenanceNotifications.resolved': false
  }).limit(10); // Limit to 10 to avoid overload
  
  if (overdueVehicles.length > 0) {
    console.log(`⚠️  ALERTE: ${overdueVehicles.length} véhicule(s) en retard de maintenance!`);
    // Here you could send urgent alerts (SMS, push notifications, etc.)
  }
});

console.log('⏰ Service de vérification de maintenance démarré');

module.exports = MaintenanceCheckJob;