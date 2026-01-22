// backend/models/product.model.js
const mongoose = require("mongoose");

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
    enum: ["cpu", "gpu", "ram", "ssd", "hdd", "motherboard", "psu", "case", "cooling", "display", "mouse", "keyboard", "others"]
  },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  images: [{ type: String }], // Array de strings para las URLs de las fotos
  attributes: { type: Object, default: {} }
}, { timestamps: true });

// IMPORTANTE: El tercer parámetro fuerza a buscar en la colección "products" (o como se llame en tu Atlas)
module.exports = mongoose.model("Product", productSchema, "products");