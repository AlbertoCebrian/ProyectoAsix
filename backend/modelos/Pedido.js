const mongoose = require("mongoose");

const pedidoSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },
  productos: [
    {
      productoId: { type: mongoose.Schema.Types.ObjectId, ref: "Producto", required: true },
      cantidad: { type: Number, required: true, min: 1 },
      precioUnitario: { type: Number, required: true, min: 0 }
    }
  ],
  total: { type: Number, required: true, min: 0 },
  fecha: { type: Date, default: Date.now },
  estado: {
    type: String,
    enum: ["pendiente", "pagado", "enviado", "entregado", "cancelado"],
    default: "pendiente"
  },
  tiendaId: { type: mongoose.Schema.Types.ObjectId, ref: "Tienda" }, // si fue en tienda física
  metodoEnvio: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Pedido", pedidoSchema);
