const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', // Vinculamos la reseña a un producto
    required: true 
  },
  userName: { type: String, required: true }, // Por ahora escriben su nombre, luego lo cogeremos del login
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);