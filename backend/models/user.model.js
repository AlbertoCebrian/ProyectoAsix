const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },       // Antes: nombre
  lastName: { type: String, default: "" },           // Antes: apellido
  email: { 
    type: String, 
    required: true,    // CORREGIDO (estaba 'equired')
    unique: true, 
    lowercase: true,   // CORREGIDO (estaba 'lowcase')
    trim: true 
  },
  passwordHash: { type: String, required: true },
  phone: { type: String, default: "" },              // Antes: telefono
  address: {                                         // Antes: direccion
    street: { type: String, default: "" },           // Antes: calle
    city: { type: String, default: "" },             // Antes: ciudad
    zipCode: { type: String, default: "" },          // Antes: codigoPostal
  },
  role: { 
    type: String, 
    enum: ["customer", "admin"], // Antes: cliente, admin (¡OJO CON ESTO EN EL FRONTEND!)
    default: "customer" 
  },
  registeredAt: { type: Date, default: Date.now },   // Antes: fechaRegistro
}, { timestamps: true }); // Esto añade createdAt y updatedAt automáticamente

module.exports = mongoose.model("User", userSchema);