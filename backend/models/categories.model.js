const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true }, // Antes 'nombre', corregido 'rquired'
  slug: { type: String, trim: true, lowercase: true },              // Clave para URL (ej: 'cpu')
  description: { type: String, default: "" },                       // Antes 'desripcion'
  image: { type: String, default: "" }                              // (Opcional) Por si quieres poner iconos al menú
}, { timestamps: true });                                           // CORREGIDO: es 'timestamps' (plural)

module.exports = mongoose.model("Category", categorySchema);