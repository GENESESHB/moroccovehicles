const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const SmartCar = require('../models/SmartCar');
const auth = require('../middleware/auth');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dcwba68qp',
  api_key: process.env.CLOUDINARY_API_KEY || '235775971192878',
  api_secret: process.env.CLOUDINARY_API_SECRET || '1bkYfm2_X9wgUeYB8CVPrOhHlkk',
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'smart_car_uploads',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf', 'svg'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
    public_id: (req, file) => {
      const timestamp = Date.now();
      const originalName = file.originalname.split('.')[0];
      return `${timestamp}_${originalName}`;
    }
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('File type not supported. Please upload images or PDFs only.'), false);
    }
  }
});

const uploadSmartCarFiles = upload.fields([
  { name: 'imageVehicule', maxCount: 1 },
  { name: 'carteGriseRecto', maxCount: 1 },
  { name: 'carteGriseVerso', maxCount: 1 }
]);

// GET all smart cars for authenticated user
router.get('/', auth, async (req, res) => {
  try {
    console.log('📋 Récupération des voitures connectées pour user ID:', req.user.id);
    
    // FIX: Get cars where user is either userId OR partnerId
    const smartCars = await SmartCar.find({
      $or: [{ userId: req.user.id }, { partnerId: req.user.id }]
    }).sort({ dateCreation: -1 });

    console.log(`✅ ${smartCars.length} voitures connectées trouvées`);

    res.json({
      success: true,
      smartCars: smartCars
    });
  } catch (error) {
    console.error('❌ Erreur fetching smart cars:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des voitures connectées'
    });
  }
});

// POST create new smart car
router.post('/', auth, uploadSmartCarFiles, async (req, res) => {
  try {
    console.log('🚗 Création nouvelle voiture connectée pour user:', req.user.id);
    console.log('Received files:', req.files);
    console.log('Received body:', req.body);

    const {
      nomVehicule,
      typeVehicule,
      boiteVitesse,
      prixJour,
      typeCarburant,
      equipementsAudio,
      nombreClesSecurite,
      intervalleVidange,
      numeroMatricule
    } = req.body;

    // Check if vehicle with same matricule already exists
    const existingCar = await SmartCar.findOne({ 
      numeroMatricule: numeroMatricule.toUpperCase() 
    });
    
    if (existingCar) {
      // Delete uploaded files from Cloudinary if validation fails
      if (req.files) {
        Object.values(req.files).forEach(fileArray => {
          if (fileArray && fileArray[0]) {
            cloudinary.uploader.destroy(fileArray[0].filename, (error) => {
              if (error) console.error('Error deleting file from Cloudinary:', error);
            });
          }
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Une voiture avec ce numéro matricule existe déjà'
      });
    }

    // Parse JSON fields
    let audioEquipment = [];
    if (equipementsAudio) {
      try {
        audioEquipment = JSON.parse(equipementsAudio);
      } catch (e) {
        audioEquipment = [];
      }
    }

    // Prepare file data - Cloudinary provides URL directly
    const fileData = {};
    
    const fileFields = ['imageVehicule', 'carteGriseRecto', 'carteGriseVerso'];
    fileFields.forEach(field => {
      if (req.files && req.files[field]) {
        const file = req.files[field][0];
        fileData[field] = {
          filename: file.originalname,
          cloudinaryId: file.filename, // This is the public_id in Cloudinary
          mimetype: file.mimetype,
          url: file.path, // Cloudinary provides full URL in path
          secureUrl: file.path, // Cloudinary URL
          size: file.size,
          format: file.mimetype.split('/')[1]
        };
      }
    });

    // Create new smart car with both userId AND partnerId
    const newCar = new SmartCar({
      userId: req.user.id,
      partnerId: req.user.id, // Set partnerId to the same as userId
      nomVehicule,
      typeVehicule,
      boiteVitesse,
      prixJour: parseFloat(prixJour),
      typeCarburant,
      equipementsAudio: audioEquipment,
      nombreClesSecurite: parseInt(nombreClesSecurite),
      intervalleVidange,
      numeroMatricule: numeroMatricule.toUpperCase(),
      ...fileData,
      status: 'active'
    });

    const savedCar = await newCar.save();
    console.log('✅ Voiture connectée sauvegardée en base de données:', savedCar._id);

    res.status(201).json({
      success: true,
      message: 'Voiture connectée créée avec succès!',
      car: savedCar
    });

  } catch (error) {
    console.error('❌ Erreur creating smart car:', error);
    
    // Clean up uploaded files in case of error
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        if (fileArray && fileArray[0]) {
          cloudinary.uploader.destroy(fileArray[0].filename, (error) => {
            if (error) console.error('Error deleting file from Cloudinary:', error);
          });
        }
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ce numéro matricule est déjà utilisé'
      });
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur serveur: ' + error.message
    });
  }
});

// GET single smart car
router.get('/:id', auth, async (req, res) => {
  try {
    // FIX: Check both userId and partnerId
    const car = await SmartCar.findOne({
      _id: req.params.id,
      $or: [{ userId: req.user.id }, { partnerId: req.user.id }]
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Voiture connectée non trouvée'
      });
    }

    res.json({
      success: true,
      car: car
    });
  } catch (error) {
    console.error('Error fetching car:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération de la voiture'
    });
  }
});

// ========== 🚀 FIXED PUT ROUTE – ACCEPTE JSON ET MULTIPART/FORM-DATA ==========
router.put('/:id', auth, (req, res, next) => {
  // ✅ Condition : si c'est du multipart, on utilise multer, sinon on passe directement
  if (req.is('multipart/form-data')) {
    return uploadSmartCarFiles(req, res, next);
  }
  next();
}, async (req, res) => {
  try {
    // Vérifier que la voiture appartient bien à l'utilisateur
    const car = await SmartCar.findOne({
      _id: req.params.id,
      $or: [{ userId: req.user.id }, { partnerId: req.user.id }]
    });

    if (!car) {
      // Nettoyer les fichiers si jamais ils ont été uploadés
      if (req.files) {
        Object.values(req.files).forEach(fileArray => {
          if (fileArray && fileArray[0]) {
            cloudinary.uploader.destroy(fileArray[0].filename, (error) => {
              if (error) console.error('Error deleting file from Cloudinary:', error);
            });
          }
        });
      }
      return res.status(404).json({
        success: false,
        message: 'Voiture connectée non trouvée'
      });
    }

    // Conserver les anciens IDs de fichiers pour suppression
    const oldFiles = {
      imageVehicule: car.imageVehicule?.cloudinaryId,
      carteGriseRecto: car.carteGriseRecto?.cloudinaryId,
      carteGriseVerso: car.carteGriseVerso?.cloudinaryId
    };

    // ---------- Mise à jour des champs texte ----------
    const updatableFields = [
      'nomVehicule', 'typeVehicule', 'boiteVitesse', 'prixJour', 
      'typeCarburant', 'nombreClesSecurite', 'intervalleVidange', 
      'numeroMatricule', 'status'
    ];

    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        car[field] = req.body[field];
      }
    });

    // ---------- ✅ Gestion CORRECTE de equipementsAudio ----------
    if (req.body.equipementsAudio !== undefined) {
      try {
        // Si c'est une string (JSON stringifié), on parse
        // Si c'est déjà un tableau (JSON pur), on garde tel quel
        car.equipementsAudio = typeof req.body.equipementsAudio === 'string'
          ? JSON.parse(req.body.equipementsAudio)
          : req.body.equipementsAudio;
      } catch (e) {
        // En cas d'erreur de parsing, on met un tableau vide
        car.equipementsAudio = [];
      }
    }

    // ---------- Mise à jour des fichiers (uniquement si présents) ----------
    const fileFields = ['imageVehicule', 'carteGriseRecto', 'carteGriseVerso'];
    if (req.files) {
      fileFields.forEach(field => {
        if (req.files[field]) {
          const file = req.files[field][0];
          car[field] = {
            filename: file.originalname,
            cloudinaryId: file.filename,
            mimetype: file.mimetype,
            url: file.path,
            secureUrl: file.path,
            size: file.size,
            format: file.mimetype.split('/')[1]
          };

          // Supprimer l'ancien fichier
          if (oldFiles[field]) {
            cloudinary.uploader.destroy(oldFiles[field], (error) => {
              if (error) console.error(`Error deleting old ${field} from Cloudinary:`, error);
            });
          }
        }
      });
    }

    const updatedCar = await car.save();

    res.json({
      success: true,
      message: 'Voiture connectée mise à jour avec succès',
      car: updatedCar
    });

  } catch (error) {
    console.error('❌ Error updating smart car:', error);

    // Nettoyer les fichiers éventuellement uploadés
    if (req.files) {
      Object.values(req.files).forEach(fileArray => {
        if (fileArray && fileArray[0]) {
          cloudinary.uploader.destroy(fileArray[0].filename, (error) => {
            if (error) console.error('Error deleting file from Cloudinary:', error);
          });
        }
      });
    }

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Ce numéro matricule est déjà utilisé'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Erreur lors de la mise à jour de la voiture'
    });
  }
});
// ============================================================================

// DELETE smart car
router.delete('/:id', auth, async (req, res) => {
  try {
    // FIX: Check both userId and partnerId
    const car = await SmartCar.findOne({
      _id: req.params.id,
      $or: [{ userId: req.user.id }, { partnerId: req.user.id }]
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: 'Voiture connectée non trouvée'
      });
    }

    // Delete files from Cloudinary
    const filesToDelete = [
      car.imageVehicule?.cloudinaryId,
      car.carteGriseRecto?.cloudinaryId,
      car.carteGriseVerso?.cloudinaryId
    ];

    // Delete each file from Cloudinary
    filesToDelete.forEach(cloudinaryId => {
      if (cloudinaryId) {
        cloudinary.uploader.destroy(cloudinaryId, (error) => {
          if (error) console.error('Error deleting file from Cloudinary:', error);
        });
      }
    });

    await SmartCar.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Voiture connectée supprimée avec succès'
    });

  } catch (error) {
    console.error('Error deleting smart car:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la suppression de la voiture'
    });
  }
});

module.exports = router;