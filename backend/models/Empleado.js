const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, default: "" },
  email: { type: String, trim: true },
  telefono: { type: String, default: "" },
  puesto: { type: String, default: "" }, // p.ej. "Vendedor", "Stock"
  tiendaId: { type: mongoose.Schema.Types.ObjectId, ref: "Tienda" }, // tienda asignada
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" } // opcional: link al user si compartes login
}, { timestamps: true });

module.exports = mongoose.model("Empleado", empleadoSchema);
