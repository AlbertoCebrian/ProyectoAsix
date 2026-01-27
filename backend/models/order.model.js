const mongoose = require('mongoose');

// Sub-esquema para los items (para que quede ordenado)
const OrderItemSchema = new mongoose.Schema({
    product: { type: Object, required: true }, // Guardamos el producto entero
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ¿Quién compró?
    name: { type: String, required: true },
    address: { type: String, required: true },
    paymentId: { type: String }, // Aquí iría el ID de PayPal (pondremos uno falso)
    totalPrice: { type: Number, required: true },
    items: [OrderItemSchema],
    status: { type: String, default: 'NEW' } // NEW, PAYED, SHIPPED, CANCELED
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;