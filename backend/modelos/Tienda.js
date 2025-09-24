const mongoose = require("mongoose");

const tiendaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  direccion: {
    calle: { type: String, default: "" },
    ciudad: { type: String, default: "" },
    codigoPostal: { type: String, default: "" }
  },
  telefono: { type: String, default: "" },
  empleados: [{ type: mongoose.Schema.Types.ObjectId, ref: "Empleado" }],
  // stock local: array de { productoId, cantidad }
  stock: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, default: 0, min: 0 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Tienda", tiendaSchema);
