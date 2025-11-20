const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, // Antes 'pedidoId'
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },                   // Antes 'usuarioId'
  date: { type: Date, default: Date.now },                                         // Antes 'fecha'
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: "" },                                    // Antes 'metodoPago'
  items: [                                                                         // Antes 'lineas'
    {
      productName: { type: String },                                               // Antes 'nombreProducto'
      quantity: { type: Number },                                                  // Antes 'cantidad'
      unitPrice: { type: Number }                                                  // Antes 'precioUnitario'
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);