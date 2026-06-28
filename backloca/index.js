// index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/authRoutes');
const blacklistVerifyRoutes = require('./routes/blacklistVerify'); 
const smartCarsRoutes = require('./routes/smartCars');
const calendarRoutes = require('./routes/calendarRoutes');
const maintenanceRoutes = require('./routes/maintenance');
const factureRoutes = require('./routes/factures');
const accidentRoutes = require('./routes/accident');
const insuranceRoutes = require('./routes/insurance');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(express.json()); // Parse JSON in POST requests
app.set('trust proxy', true); // Important if behind a proxy

// --------------------
// MongoDB Connection
// --------------------
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wegorent', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// --------------------
// Helper Functions
// --------------------
function getRequestIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  if (req.headers['x-real-ip']) return req.headers['x-real-ip'];

  let ip = req.ip || req.socket?.remoteAddress || null;
  if (!ip) return null;
  if (ip.startsWith('::ffff:')) ip = ip.split(':').pop();
  if (ip === '::1') ip = '127.0.0.1';
  return ip;
}

async function fetchPublicIp() {
  const res = await axios.get('https://api.ipify.org?format=json', { timeout: 5000 });
  return res.data.ip;
}

async function ipGeolocate(ip) {
  const url = ip && ip !== '127.0.0.1' ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/';
  const res = await axios.get(url, { timeout: 5000 });
  return res.data;
}

async function reverseGeocode(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&addressdetails=1`;
  const res = await axios.get(url, {
    timeout: 5000,
    headers: { 'User-Agent': 'locaconnector/1.0 (your-email@example.com)' }
  });
  return res.data;
}

// --------------------
// Routes
// --------------------

// 🌍 Get user location info
app.get('/whoami/place', async (req, res) => {
  try {
    let ip = getRequestIp(req);
    if (!ip || ip === '127.0.0.1' || ip === '::1') {
      ip = await fetchPublicIp();
    }

    const geo = await ipGeolocate(ip);
    const lat = geo.latitude ?? geo.lat ?? null;
    const lon = geo.longitude ?? geo.lon ?? null;

    let place = null;
    if (lat && lon) {
      try {
        const rev = await reverseGeocode(lat, lon);
        place = {
          display_name: rev.display_name,
          address: rev.address || null
        };
      } catch (e) {
        place = { error: 'Reverse geocoding failed', details: e.message };
      }
    }

    res.json({
      ip,
      geolocation: geo,
      place
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', details: err.message });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 👤 User routes
app.use('/users', usersRoutes); // For registration etc.
app.use('/api/user', userRoutes); // For user controller routes
app.use('/api/auth', authRoutes);
// In your index.js file, add this line with the other route imports:
app.use('/api/clients', require('./routes/clients'));
app.use('/api/vehicles', require('./routes/vehicles'));
app.use('/api/contracts', require('./routes/contracts'));
app.use('/api/blacklist', require('./routes/blacklist'));
app.use('/api/blacklist-verify', blacklistVerifyRoutes); 
app.use('/api/smart-cars', smartCarsRoutes);
app.use('/api/contrasmart', require('./routes/contrasmart'));
app.use('/api/stats', require('./routes/statsRoutes'));
app.use('/api/calendar', calendarRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/factures', factureRoutes);
app.use('/api/accidents', accidentRoutes);
app.use('/api/insurance', insuranceRoutes);

// Route de test pour vérifier que l'API fonctionne
app.get('/api', (req, res) => {
  res.json({
    message: '🚀 API Location Véhicules démarrée avec succès',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      vehicles: {
        add: 'POST /api/vehicles',
        list: 'GET /api/vehicles/my-vehicles',
        get: 'GET /api/vehicles/:id',
        update: 'PUT /api/vehicles/:id',
        delete: 'DELETE /api/vehicles/:id'
      },
      contracts: {
        create: 'POST /api/contracts',
        list: 'GET /api/contracts/my-contracts',
        get: 'GET /api/contracts/:id',
        update: 'PUT /api/contracts/:id',
        delete: 'DELETE /api/contracts/:id'
      },
      blacklist: {
        add: 'POST /api/blacklist',
        list: 'GET /api/blacklist/my-blacklist',
        check: 'GET /api/blacklist/check',
        remove: 'DELETE /api/blacklist/:id'
      }
    }
  });
});

// Route pour servir les fichiers uploads
app.get('/uploads/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

// Gestion des routes non trouvées
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route non trouvée: ${req.originalUrl}`
  });
});

// Gestion globale des erreurs
app.use((error, req, res, next) => {
  console.error('🔥 Erreur serveur:', error);

  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      message: 'Données invalides',
      errors
    });
  }

  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'ID invalide'
    });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} existe déjà`
    });
  }

  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

if (process.env.NODE_ENV !== 'test') {
  require('./jobs/maintenanceCheck');
}
// --------------------
// Start Server
// --------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
