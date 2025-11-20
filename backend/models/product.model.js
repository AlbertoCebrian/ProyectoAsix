const mongoose = require("mongoose");

// Convención: variable en inglés
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, trim: true },
  model: { type: String, trim: true },
  description: { type: String, default: "" },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  category: { 
    type: String, 
    required: true, 
    // Asegúrate de que el frontend usa estos mismos strings exactos
    enum: ["cpu", "gpu", "ram", "ssd", "hdd", "motherboard", "psu", "case", "cooling", "display", "mouse", "keyboard", "others"]
  },
  // CRÍTICO: Corregido 'suplierId' a 'supplierId' y 'ref' a "Supplier" (Mayúscula)
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  images: [{ type: String }],
  attributes: { type: Object, default: {} }
}, { timestamps: true });

productSchema.index({ name: "text", brand: "text", model: "text" });

module.exports = mongoose.model("Product", productSchema);