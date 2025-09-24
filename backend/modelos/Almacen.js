const mongoose = require("mongoose");

const almacenSchema = new mongoose.Schema({
  nombre: { type: String, default: "Almacén Central" },
  ubicacion: { type: String, default: "" },
  stock: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, default: 0, min: 0 }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Almacen", almacenSchema);
