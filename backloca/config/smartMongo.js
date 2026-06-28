// config/smartMongo.js
const mongoose = require("mongoose");

const REMOTE_DB = process.env.MONGODB_URI;
const LOCAL_DB = "mongodb://localhost:27017/wegorent";

async function connectToMongo() {
  console.log("🔍 Vérification de la base MongoDB distante...");

  try {
    // Test rapide connexion Atlas
    await mongoose.connect(REMOTE_DB, {
      serverSelectionTimeoutMS: 3000
    });

    console.log("☁️ MongoDB Atlas connecté !");
    return REMOTE_DB;

  } catch (err) {
    console.log("⚠️ Impossible de se connecter à MongoDB Atlas.");
    console.log("➡️ Fallback vers MongoDB local...");

    try {
      await mongoose.connect(LOCAL_DB, {
        serverSelectionTimeoutMS: 3000
      });

      console.log("💾 MongoDB LOCAL connecté !");
      return LOCAL_DB;

    } catch (localErr) {
      console.error("❌ Aucune base MongoDB n’est disponible !");
      console.error(localErr);
      process.exit(1); // Stop proprement
    }
  }
}

module.exports = connectToMongo;

