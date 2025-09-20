const mongoose = require("mongoose");

const uri = "mongodb+srv://albertocebriangil_db_user:Alberto2929@ClusterAlberto.nwawgqa.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAlberto";
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB conectado ✅");
  } catch (error) {
    console.error("Error al conectar MongoDB:", error);
  }
};

module.exports = connectDB;
