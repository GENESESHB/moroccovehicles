require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Vehicle = require('./models/Vehicle');
const Client = require('./models/Client');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/test';

async function seedDatabase() {
  try {
    console.log('🔄 Connecting to MongoDB:', MONGODB_URI);
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ Connected to database "${mongoose.connection.name}"`);

    const defaultPassword = await bcrypt.hash('Password123!', 10);

    // 1. Define Seed Users
    const seedUsers = [
      {
        name: 'Administrateur MoroccoVehicles',
        entreprise: 'Morocco Vehicles Admin',
        number: '+212661000001',
        email: 'admin@moroccovehicles.ma',
        password: defaultPassword,
        logoEntreprise: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&auto=format&fit=crop&q=80',
        country: 'Morocco',
        city: 'Casablanca',
        status: 'approved',
        role: 'admin'
      },
      {
        name: 'Youssef El Amrani',
        entreprise: 'Atlas Car Rental',
        number: '+212661123456',
        email: 'atlascar@moroccovehicles.ma',
        password: defaultPassword,
        logoEntreprise: 'https://images.unsplash.com/photo-1572945550744-570424e6670b?w=300&auto=format&fit=crop&q=80',
        country: 'Morocco',
        city: 'Casablanca',
        status: 'approved',
        role: 'agence'
      },
      {
        name: 'Karim Tazi',
        entreprise: 'Marrakech Luxury Cars',
        number: '+212662234567',
        email: 'marrakechcars@moroccovehicles.ma',
        password: defaultPassword,
        logoEntreprise: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=300&auto=format&fit=crop&q=80',
        country: 'Morocco',
        city: 'Marrakech',
        status: 'approved',
        role: 'agence'
      },
      {
        name: 'Amina Berrada',
        entreprise: 'Tanger Auto Location',
        number: '+212663345678',
        email: 'tangerauto@moroccovehicles.ma',
        password: defaultPassword,
        logoEntreprise: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=300&auto=format&fit=crop&q=80',
        country: 'Morocco',
        city: 'Tanger',
        status: 'approved',
        role: 'agence'
      },
      {
        name: 'Omar Bennani',
        entreprise: 'Particulier',
        number: '+212664456789',
        email: 'omar.bennani@gmail.com',
        password: defaultPassword,
        logoEntreprise: '',
        country: 'Morocco',
        city: 'Rabat',
        status: 'approved',
        role: 'user'
      }
    ];

    const insertedUsers = {};

    for (const userData of seedUsers) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        user = await User.create(userData);
        console.log(`👤 Created user: ${user.email} (${user.role})`);
      } else {
        user.status = 'approved';
        user.password = defaultPassword;
        user.name = userData.name;
        user.entreprise = userData.entreprise;
        user.city = userData.city;
        await user.save();
        console.log(`🔄 Updated user: ${user.email} (${user.role})`);
      }
      insertedUsers[userData.email] = user;
    }

    // Also ensure existing test user is approved and usable
    const existingUser = await User.findOne({ email: 'hassan.hbmama@gmail.com' });
    if (existingUser) {
      existingUser.status = 'approved';
      existingUser.password = defaultPassword;
      await existingUser.save();
      console.log(`✅ Approved and updated existing user: hassan.hbmama@gmail.com`);
      insertedUsers['hassan.hbmama@gmail.com'] = existingUser;
    }

    const agenceCasa = insertedUsers['atlascar@moroccovehicles.ma'];
    const agenceKech = insertedUsers['marrakechcars@moroccovehicles.ma'];
    const agenceTanger = insertedUsers['tangerauto@moroccovehicles.ma'];
    const agenceHassan = insertedUsers['hassan.hbmama@gmail.com'] || agenceCasa;

    // 2. Define Seed Vehicles
    const futureDate1 = new Date();
    futureDate1.setMonth(futureDate1.getMonth() + 8);

    const futureDate2 = new Date();
    futureDate2.setMonth(futureDate2.getMonth() + 5);

    const pastDate = new Date();
    pastDate.setMonth(pastDate.getMonth() - 4);

    const seedVehicles = [
      {
        name: 'Dacia Logan 1.5 dCi',
        type: 'Citadine',
        boiteVitesse: 'Manuelle',
        description: 'Voiture économique, fiable et spacieuse, idéale pour la conduite urbaine et les trajets interurbains au Maroc.',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 250,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: false,
        matricule: '24189-A-26',
        kmDepart: 45200,
        kmRetour: 45200,
        currentKilometer: 45200,
        totalDistance: 45200,
        lastMaintenanceKm: 40000,
        nextMaintenanceKm: 50000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceHassan._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Entretien à jour, climatisation révisée'
      },
      {
        name: 'Renault Clio 5',
        type: 'Citadine',
        boiteVitesse: 'Manuelle',
        description: 'Design moderne, grand écran tactile, confort optimal pour vos déplacements professionnels et personnels.',
        image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 280,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: true,
        matricule: '76124-B-6',
        kmDepart: 32100,
        kmRetour: 32100,
        currentKilometer: 32100,
        totalDistance: 32100,
        lastMaintenanceKm: 30000,
        nextMaintenanceKm: 40000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceCasa._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Pneus neufs, état impeccable'
      },
      {
        name: 'Peugeot 208 Allure',
        type: 'Citadine',
        boiteVitesse: 'Automatique',
        description: 'Cockpit 3D moderne, boîte automatique fluide et consommation réduite. Parfait pour la ville.',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 320,
        carburant: 'Essence',
        niveauReservoir: '3/4',
        radio: true,
        gps: true,
        mp3: true,
        cd: false,
        matricule: '18934-D-1',
        kmDepart: 21500,
        kmRetour: 21500,
        currentKilometer: 21500,
        totalDistance: 21500,
        lastMaintenanceKm: 20000,
        nextMaintenanceKm: 30000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate2,
        partnerId: agenceCasa._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Apple CarPlay & Android Auto inclus'
      },
      {
        name: 'Dacia Duster 4x4 Prestige',
        type: 'SUV',
        boiteVitesse: 'Manuelle',
        description: 'SUV polyvalent 4 roues motrices prêt pour les routes marocaines, les pistes de l Atlas et les grands voyages.',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 420,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: false,
        matricule: '53198-A-33',
        kmDepart: 58900,
        kmRetour: 58900,
        currentKilometer: 58900,
        totalDistance: 58900,
        lastMaintenanceKm: 50000,
        nextMaintenanceKm: 60000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceKech._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Équipé barres de toit, idéal excursions'
      },
      {
        name: 'Hyundai Tucson N-Line',
        type: 'SUV',
        boiteVitesse: 'Automatique',
        description: 'SUV moderne et spacieux avec finitions haut de gamme, assistance à la conduite et coffre volumineux.',
        image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 650,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: true,
        matricule: '91240-B-7',
        kmDepart: 18400,
        kmRetour: 18400,
        currentKilometer: 18400,
        totalDistance: 18400,
        lastMaintenanceKm: 15000,
        nextMaintenanceKm: 25000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceKech._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Toit panoramique, caméra 360'
      },
      {
        name: 'Volkswagen Golf 8 R-Line',
        type: 'Compacte',
        boiteVitesse: 'Automatique',
        description: 'Performance, élégance et technologie allemande de pointe. Confort exceptionnel sur autoroute.',
        image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 550,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: true,
        matricule: '43019-A-1',
        kmDepart: 26700,
        kmRetour: 26700,
        currentKilometer: 26700,
        totalDistance: 26700,
        lastMaintenanceKm: 20000,
        nextMaintenanceKm: 30000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate2,
        partnerId: agenceCasa._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Finition R-Line, jantes 18 pouces'
      },
      {
        name: 'Mercedes-Benz Classe C 220d',
        type: 'Berline premium',
        boiteVitesse: 'Automatique',
        description: 'Berline de luxe par excellence. Raffinement, sellerie cuir, insonorisation parfaite et prestige.',
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 1100,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: true,
        matricule: '88432-A-7',
        kmDepart: 14200,
        kmRetour: 14200,
        currentKilometer: 14200,
        totalDistance: 14200,
        lastMaintenanceKm: 10000,
        nextMaintenanceKm: 20000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceKech._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Pack AMG Line, sièges chauffants'
      },
      {
        name: 'Range Rover Evoque',
        type: 'SUV premium',
        boiteVitesse: 'Automatique',
        description: 'Luxe britannique, style avant-gardiste et capacité tout-terrain. Idéal pour séjours VIP à Marrakech.',
        image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 1350,
        carburant: 'Gasoil',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: true,
        matricule: '62741-A-6',
        kmDepart: 29800,
        kmRetour: 29800,
        currentKilometer: 29800,
        totalDistance: 29800,
        lastMaintenanceKm: 20000,
        nextMaintenanceKm: 30000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceKech._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Véhicule de prestige avec chauffeur sur demande'
      },
      {
        name: 'Toyota Yaris Hybride',
        type: 'Citadine',
        boiteVitesse: 'Automatique',
        description: 'Motorisation hybride ultra-sobre, boîte automatique fluide, très facile à garer dans les ruelles de Tanger.',
        image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 310,
        carburant: 'Hybride',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: true,
        mp3: true,
        cd: false,
        matricule: '31579-A-16',
        kmDepart: 17300,
        kmRetour: 17300,
        currentKilometer: 17300,
        totalDistance: 17300,
        lastMaintenanceKm: 15000,
        nextMaintenanceKm: 25000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate1,
        partnerId: agenceTanger._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Hybride auto-rechargeable très silencieuse'
      },
      {
        name: 'Fiat 500 Dolcevita',
        type: 'Citadine',
        boiteVitesse: 'Manuelle',
        description: 'Icône italienne chic et agile, idéale pour les escapades côtières et les balades en ville.',
        image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
        pricePerDay: 260,
        carburant: 'Hybride',
        niveauReservoir: 'PLEIN',
        radio: true,
        gps: false,
        mp3: true,
        cd: false,
        matricule: '74120-B-16',
        kmDepart: 11400,
        kmRetour: 11400,
        currentKilometer: 11400,
        totalDistance: 11400,
        lastMaintenanceKm: 10000,
        nextMaintenanceKm: 20000,
        vidangeInterval: '10000',
        impot2026: true,
        assuranceStartDate: pastDate,
        assuranceEndDate: futureDate2,
        partnerId: agenceTanger._id,
        available: true,
        maintenanceStatus: 'ok',
        remarques: 'Toit vitré panoramique, Bluetooth'
      }
    ];

    let insertedVehiclesCount = 0;
    for (const veh of seedVehicles) {
      const existing = await Vehicle.findOne({ matricule: veh.matricule });
      if (!existing) {
        await Vehicle.create(veh);
        insertedVehiclesCount++;
        console.log(`🚗 Inserted vehicle: ${veh.name} (${veh.matricule})`);
      } else {
        await Vehicle.updateOne({ matricule: veh.matricule }, veh);
        console.log(`🔄 Updated vehicle: ${veh.name} (${veh.matricule})`);
      }
    }

    // 3. Add clients for agencies if needed
    const seedClients = [
      {
        firstName: 'Mehdi',
        lastName: 'Chraibi',
        birthDate: new Date('1990-05-15'),
        phone: '+212661889900',
        address: 'Boulevard d Anfa, Casablanca',
        cin: 'BE876543',
        licenseNumber: 'PERM-2012-7890',
        licenseIssueDate: new Date('2012-06-20'),
        entreprise: agenceHassan._id
      },
      {
        firstName: 'Salma',
        lastName: 'Fassi',
        birthDate: new Date('1995-11-22'),
        phone: '+212662998877',
        address: 'Hivernage, Marrakech',
        cin: 'EE543210',
        licenseNumber: 'PERM-2016-1234',
        licenseIssueDate: new Date('2016-03-10'),
        entreprise: agenceKech._id
      }
    ];

    for (const clientData of seedClients) {
      const existingClient = await Client.findOne({ cin: clientData.cin, entreprise: clientData.entreprise });
      if (!existingClient) {
        await Client.create(clientData);
        console.log(`📋 Inserted client: ${clientData.firstName} ${clientData.lastName}`);
      }
    }

    console.log('\n=========================================');
    console.log('🎉 SEED COMPLETED SUCCESSFULLY!');
    console.log('=========================================');
    console.log('Credentials for testing:');
    console.log('🔑 Password for all seeded accounts: Password123!');
    console.log('1. Admin: admin@moroccovehicles.ma');
    console.log('2. Agence Casa: atlascar@moroccovehicles.ma');
    console.log('3. Agence Marrakech: marrakechcars@moroccovehicles.ma');
    console.log('4. Agence Tanger: tangerauto@moroccovehicles.ma');
    console.log('5. Existing user: hassan.hbmama@gmail.com (approved)');
    console.log('6. User: omar.bennani@gmail.com');
    console.log('=========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error during database seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
