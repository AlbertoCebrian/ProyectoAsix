const mongoose = require("mongoose");

const facturaSchema = new mongoose.Schema({
  pedidoId: { type: mongoose.Schema.Types.ObjectId, ref: "Pedido", required: true },
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  fecha: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  metodoPago: { type: String, default: "" },
  lineas: [
    {
      nombreProducto: { type: String },
      cantidad: { type: Number },
      precioUnitario: { type: Number }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Factura", facturaSchema);
