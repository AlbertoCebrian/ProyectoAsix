const mongoose = require("mongoose");

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  contacto: { type: String, default: "" },
  telefono: { type: String, default: "" },
  email: { type: String, default: "" },
  direccion: { type: String, default: "" },
  productosSuministrados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Producto" }]
}, { timestamps: true });

module.exports = mongoose.model("Proveedor", proveedorSchema);
