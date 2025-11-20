const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Antes 'usuarioId'
  items: [ // Antes 'productos' (convención estándar: 'items' para líneas de pedido)
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },     // Antes 'cantidad'
      price: { type: Number, required: true, min: 0 }         // Antes 'precioUnitario'
    }
  ],
  total: { type: Number, required: true, min: 0 },
  date: { type: Date, default: Date.now },                    // Antes 'fecha'
  status: {                                                   // Antes 'estado'
    type: String,
    // IMPORTANTE: Valores en inglés para que coincidan con el código
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"], 
    default: "pending"
  },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" }, // Antes 'tiendaId'
  shippingMethod: { type: String, default: "" }               // Antes 'metodoEnvio'
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);