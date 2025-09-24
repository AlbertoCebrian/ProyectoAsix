const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  marca: { type: String, trim: true },
  modelo: { type: String, trim: true },
  descripcion: { type: String, default: "" },
  precio: { type: Number, required: true, min: 0 },
  stockTotal: { type: Number, default: 0, min: 0 }, // stock global/almacén
  categoria: { 
    type: String, 
    required: true, 
    enum: ["Procesador", "Tarjeta gráfica", "RAM", "Almacenamiento", "Periférico"] 
  },
  proveedorId: { type: mongoose.Schema.Types.ObjectId, ref: "Proveedor" },
  imagenes: [{ type: String }],
  atributos: { type: Object, default: {} } // por si quieres specs (RAM, socket, etc.)
}, { timestamps: true });

// Índice de texto para búsquedas por nombre/marca/modelo
productoSchema.index({ nombre: "text", marca: "text", modelo: "text" });

module.exports = mongoose.model("Producto", productoSchema);
