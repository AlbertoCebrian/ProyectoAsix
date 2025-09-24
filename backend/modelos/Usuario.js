const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true},
  apellido : { type: String, default: " "},
  email: { type: String, equired : true, unique: true, lowcase: true, trim: true },
  passwordHash: { type: String, required: true},
  telefono: { type: String, default: "" },
  direccion: {
    calle: { type: String, default: "" },
    ciudad: { type: String, default: "" },
    codigoPostal: { type: String, default: "" },
  },
  rol: {type: String, enum: ["cliente", "admin"], default: "cliente" },
  fechaRegistro: { type: Date, default: Date.now },
}, {timestamps: true});

  

module.exports = mongoose.model("Usuario", usuarioSchema);
