const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, trim: true }, // Opcional
  model: { type: String, trim: true }, // Opcional
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  
  category: { 
    type: String, 
    required: true,
    // Asegúrate de que estos coinciden con los del <select> de tu HTML
    enum: ["cpu", "gpu", "ram", "ssd", "hdd", "motherboard", "psu", "case", "cooling", "display", "mouse", "keyboard", "others"]
  },
  
  // Array de strings (Tu frontend convierte el texto separado por comas a esto)
  images: [{ type: String }], 
  
  // ¡LA CLAVE! Esto permite guardar el objeto de especificaciones técnicas
  attributes: { type: Object }, 

  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" } // Opcional por ahora

}, { timestamps: true });

// Forzamos colección 'products'
module.exports = mongoose.model("Product", productSchema, "products");