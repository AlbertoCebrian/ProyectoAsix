const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },      // Antes 'nombre'
  lastName: { type: String, default: "" },          // Antes 'apellido'
  email: { type: String, trim: true },
  phone: { type: String, default: "" },             // Antes 'telefono'
  position: { type: String, default: "Staff" },     // Antes 'puesto'
  
  // Referencias actualizadas a los modelos en Inglés
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }, // Antes 'tiendaId'
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }    // Antes 'usuarioId'
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);