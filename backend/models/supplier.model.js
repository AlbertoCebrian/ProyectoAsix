const mongoose = require("mongoose");

// Convención: variable en inglés
const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, default: "" },
  phone_number: { type: String, default: "" },
  email: { type: String, default: "" },
  address: { type: String, default: "" }, // FIX: Corregido 'addres'
  
  // FIX: Nombre de campo y 'ref' corregidos
  suppliedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] 
}, { timestamps: true });

// CRÍTICO: Corregido 'supplier' a "Supplier" (Mayúscula)
module.exports = mongoose.model("Supplier", supplierSchema);